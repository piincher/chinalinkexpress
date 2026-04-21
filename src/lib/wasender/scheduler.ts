/**
 * Follow-Up Message Scheduler
 *
 * Scheduled task system for sending follow-up WhatsApp messages
c * to quiz participants who haven't opened their guide after 24 hours.
 */

import { createServerClient } from '@/lib/supabase/client';
import { QuizSubmission } from '@/lib/supabase/database.types';

// Configuration
const BATCH_SIZE = 50; // Process in batches to avoid rate limits
const HOURS_BEFORE_FOLLOW_UP = 24;

// Result types
export interface FollowUpResult {
  submissionId: string;
  success: boolean;
  error?: string;
}

export interface ProcessStats {
  total: number;
  sent: number;
  failed: number;
  results: FollowUpResult[];
}

/**
 * Get WhatsApp number from submission
 * Formats the number for WasenderAPI
 */
function getWhatsAppNumber(submission: QuizSubmission): string {
  return submission.whatsapp_number;
}

/**
 * Build the follow-up message
 */
function buildFollowUpMessage(guideToken: string, locale: string = 'fr'): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chinalink.com';
  const guideUrl = `${baseUrl}/${locale}/guide/${guideToken}`;

  return [
    '📋 *Votre guide d\'importation vous attend !*',
    '',
    'Bonjour,',
    '',
    'Vous avez récemment complété notre quiz d\'importation et nous avons remarqué que vous n\'avez pas encore consulté votre guide personnalisé.',
    '',
    '👉 *Accédez à votre guide ici :*',
    guideUrl,
    '',
    'Ce guide contient des informations essentielles pour réussir vos importations depuis la Chine vers le Mali.',
    '',
    '_Ce lien expire dans 48 heures._',
    '',
    '📞 *Besoin d\'aide ?*',
    'Contactez-nous sur WhatsApp ou appelez-nous directement.',
    '',
    '— L\'équipe ChinaLink Express',
  ].join('\n');
}

/**
 * Query Supabase for submissions needing follow-up
 *
 * Criteria:
 * - created_at > 24 hours ago
 * - guide_opened = false
 * - follow_up_sent = false
 *
 * @returns Array of submissions needing follow-up
 */
export async function getPendingFollowUps(): Promise<QuizSubmission[]> {
  const supabase = createServerClient();

  // Calculate the cutoff time (24 hours ago)
  const cutoffTime = new Date();
  cutoffTime.setHours(cutoffTime.getHours() - HOURS_BEFORE_FOLLOW_UP);
  const cutoffIsoString = cutoffTime.toISOString();

  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .eq('guide_opened', false)
    .eq('follow_up_sent', false)
    .lt('created_at', cutoffIsoString)
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (error) {
    console.error('Error fetching pending follow-ups:', error);
    throw new Error(`Failed to fetch pending follow-ups: ${error.message}`);
  }

  return data || [];
}

/**
 * Send WhatsApp message using WasenderAPI
 *
 * @param submission - The quiz submission to send follow-up to
 * @returns Result of the send operation
 */
export async function sendFollowUpMessage(
  submission: QuizSubmission
): Promise<FollowUpResult> {
  const wasenderApiKey = process.env.WASENDER_API_KEY;

  if (!wasenderApiKey) {
    console.error('WASENDER_API_KEY not configured');
    return {
      submissionId: submission.id,
      success: false,
      error: 'WASENDER_API_KEY not configured',
    };
  }

  const phoneNumber = getWhatsAppNumber(submission);
  // Default to 'fr' - will use stored locale once migration is applied
  const locale = 'fr';
  const message = buildFollowUpMessage(submission.guide_token, locale);

  try {
    // Send message via WasenderAPI
    const response = await fetch('https://api.wasender.com/v1/messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${wasenderApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: phoneNumber,
        body: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WasenderAPI error:', errorText);

      // Log failure
      await logFollowUpAttempt(submission.id, false, errorText);

      return {
        submissionId: submission.id,
        success: false,
        error: `WasenderAPI error: ${response.status} ${errorText}`,
      };
    }

    // Update database: mark follow-up as sent
    await markFollowUpSent(submission.id);

    // Log success
    await logFollowUpAttempt(submission.id, true);

    console.log(`Follow-up sent successfully to ${phoneNumber}`);

    return {
      submissionId: submission.id,
      success: true,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending follow-up message:', error);

    // Log failure
    await logFollowUpAttempt(submission.id, false, errorMessage);

    return {
      submissionId: submission.id,
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Mark follow-up as sent in the database
 */
async function markFollowUpSent(submissionId: string): Promise<void> {
  const supabase = createServerClient();

  const { error } = await (supabase as any)
    .from('quiz_submissions')
    .update({
      follow_up_sent: true,
      follow_up_sent_at: new Date().toISOString(),
    })
    .eq('id', submissionId);

  if (error) {
    console.error('Error marking follow-up as sent:', error);
    throw new Error(`Failed to update submission: ${error.message}`);
  }
}

/**
 * Log follow-up attempt (for auditing)
 */
async function logFollowUpAttempt(
  submissionId: string,
  success: boolean,
  errorMessage?: string
): Promise<void> {
  // This could be expanded to write to a separate log table
  // For now, we just log to console
  if (success) {
    console.log(`[FollowUp] Success for submission ${submissionId}`);
  } else {
    console.error(`[FollowUp] Failed for submission ${submissionId}: ${errorMessage}`);
  }
}

/**
 * Process all pending follow-ups
 *
 * - Gets pending follow-ups
 * - Sends message to each
 * - Handles batch processing
 * - Returns stats (sent, failed, total)
 *
 * @returns Statistics about the processing
 */
export async function processFollowUps(): Promise<ProcessStats> {
  console.log('[FollowUp] Starting follow-up processing...');

  try {
    // Get pending follow-ups
    const pendingSubmissions = await getPendingFollowUps();
    console.log(`[FollowUp] Found ${pendingSubmissions.length} pending follow-ups`);

    if (pendingSubmissions.length === 0) {
      return {
        total: 0,
        sent: 0,
        failed: 0,
        results: [],
      };
    }

    const results: FollowUpResult[] = [];
    let sent = 0;
    let failed = 0;

    // Process each submission
    for (const submission of pendingSubmissions) {
      // Add small delay between messages to avoid rate limiting
      if (results.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const result = await sendFollowUpMessage(submission);
      results.push(result);

      if (result.success) {
        sent++;
      } else {
        failed++;
      }
    }

    console.log(`[FollowUp] Processing complete. Sent: ${sent}, Failed: ${failed}`);

    return {
      total: pendingSubmissions.length,
      sent,
      failed,
      results,
    };
  } catch (error) {
    console.error('[FollowUp] Unexpected error during processing:', error);
    throw error;
  }
}
