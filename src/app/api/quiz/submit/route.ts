/**
 * Quiz Submission API Route
 * 
 * Handles quiz submissions for the Import Readiness Quiz.
 * - Validates input data
 * - Calculates score and determines lead category
 * - Saves submission to Supabase
 * - Sends WhatsApp message via WasenderAPI
 * - Returns guide URL for the user
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import { sendWhatsAppMessage } from '@/lib/wasender/client';
import { generateGuideToken } from '@/features/import-quiz/lib/scoring';
import { validateQuizSubmissionPayload } from '@/features/import-quiz/lib/validation';
import { getClientIp, checkRateLimit } from '@/features/import-quiz/lib/rate-limit';
import { generateDiagnostic } from '@/features/import-quiz/lib/diagnostics';
import { RESULT_MESSAGES } from '@/features/import-quiz/lib/constants';
import { LeadCategory } from '@/features/import-quiz/types';

// Request body type
interface QuizSubmitRequest {
  whatsappNumber: string;
  answers: Record<number, string>;
  locale?: string;
  sessionId?: string;
  attribution?: Record<string, unknown>;
}

// Success response type
interface QuizSubmitSuccessResponse {
  success: true;
  guideUrl: string;
  score: number;
  category: string;
  diagnostic: ReturnType<typeof generateDiagnostic>;
}

// Error response type
interface QuizSubmitErrorResponse {
  success: false;
  error: string;
}

type QuizSubmitResponse = QuizSubmitSuccessResponse | QuizSubmitErrorResponse;

const SUBMIT_RATE_LIMIT = {
  maxAttempts: 8,
  windowMs: 10 * 60 * 1000,
};

async function insertQuizSubmission(
  supabase: ReturnType<typeof createServerClient>,
  payload: Record<string, unknown>
) {
  const { data, error } = await (supabase as any)
    .from('quiz_submissions')
    .insert(payload)
    .select('id')
    .single();

  if (!error) {
    return { data, error: null };
  }

  const message = String(error.message || '');
  const migrationMissing =
    message.includes('session_id') ||
    message.includes('quiz_version') ||
    message.includes('attribution') ||
    message.includes('dimensions') ||
    message.includes('recommendation') ||
    message.includes('lead_priority') ||
    message.includes('lead_stage') ||
    message.includes('locale');

  if (!migrationMissing) {
    return { data: null, error };
  }

  console.warn('[QuizSubmit] Falling back to legacy quiz_submissions insert:', message);

  const legacyPayload = {
    whatsapp_number: payload.whatsapp_number,
    answers: payload.answers,
    score: payload.score,
    category: payload.category,
    guide_token: payload.guide_token,
  };

  return (supabase as any)
    .from('quiz_submissions')
    .insert(legacyPayload)
    .select('id')
    .single();
}

async function insertLeadProfile(
  supabase: ReturnType<typeof createServerClient>,
  params: {
    submissionId?: string;
    whatsappNumber: string;
    score: number;
    category: LeadCategory;
    recommendation: ReturnType<typeof generateDiagnostic>['recommendation'];
  }
) {
  if (!params.submissionId) return;

  try {
    await (supabase as any).from('lead_profiles').insert({
      submission_id: params.submissionId,
      whatsapp_number: params.whatsappNumber,
      score: params.score,
      category: params.category,
      lead_priority: params.recommendation.leadPriority,
      primary_service: params.recommendation.primaryService,
      shipping_mode: params.recommendation.shippingMode,
      next_action: params.recommendation.nextAction,
      priority_reason: params.recommendation.priorityReason,
      status: 'new',
    });
  } catch (error) {
    console.warn('[QuizSubmit] Lead profile creation skipped:', error);
  }
}

async function logMessageEvent(
  supabase: ReturnType<typeof createServerClient>,
  params: {
    submissionToken: string;
    messageType: string;
    provider: string;
    status: string;
    recipient: string;
    providerMessageId?: string;
    errorMessage?: string;
  }
) {
  try {
    await (supabase as any).from('message_events').insert({
      submission_token: params.submissionToken,
      message_type: params.messageType,
      provider: params.provider,
      status: params.status,
      recipient: params.recipient,
      provider_message_id: params.providerMessageId || null,
      error_message: params.errorMessage || null,
    });
  } catch (error) {
    console.warn('[QuizSubmit] Message event logging skipped:', error);
  }
}

/**
 * POST handler for quiz submissions
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<QuizSubmitResponse>> {
  try {
    const ipAddress = getClientIp(request.headers);
    const rateLimit = checkRateLimit(`quiz-submit:${ipAddress}`, SUBMIT_RATE_LIMIT.maxAttempts, SUBMIT_RATE_LIMIT.windowMs);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many quiz submissions. Please try again shortly.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds || 60),
          },
        }
      );
    }

    // 1. Parse request body
    let body: QuizSubmitRequest | unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const validation = validateQuizSubmissionPayload(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: validation.status }
      );
    }

    const {
      formattedPhone,
      answers,
      locale,
      sessionId,
      attribution,
    } = validation.data;

    // 2. Calculate production diagnostic
    const diagnostic = generateDiagnostic(answers);
    const { score, category, dimensions, recommendation } = diagnostic;

    // 3. Generate guide token
    const guideToken = generateGuideToken(formattedPhone);

    // 4. Construct guide URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}`;
    const guideUrl = `${baseUrl}/${locale}/guide/${guideToken}`;

    // 5. Save to Supabase
    const supabase = createServerClient();
    
    console.log('[QuizSubmit] Saving quiz submission with token:', guideToken);
    
    const { data: savedSubmission, error: dbError } = await insertQuizSubmission(supabase, {
      whatsapp_number: formattedPhone,
      answers,
      score,
      category,
      guide_token: guideToken,
      locale,
      session_id: sessionId,
      quiz_version: 'import-readiness-v2',
      attribution,
      dimensions,
      recommendation,
      lead_priority: recommendation.leadPriority,
      lead_stage: 'new',
      ip_address: ipAddress === 'unknown' ? null : ipAddress,
      user_agent: request.headers.get('user-agent'),
    });

    if (dbError) {
      console.error('Database error saving quiz submission:', dbError);

      const errorMessage = String(dbError.message || '');
      const isConnectionError =
        errorMessage.includes('fetch failed') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('network') ||
        errorMessage.includes('ECONNREFUSED') ||
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('ETIMEDOUT');

      const userFacingError = isConnectionError
        ? 'Database temporarily unavailable. Please try again in a moment.'
        : 'Failed to save quiz submission: ' + errorMessage;

      return NextResponse.json(
        { success: false, error: userFacingError },
        { status: isConnectionError ? 503 : 500 }
      );
    }
    
    console.log('[QuizSubmit] Quiz submission saved successfully');

    await insertLeadProfile(supabase, {
      submissionId: savedSubmission?.id,
      whatsappNumber: formattedPhone,
      score,
      category: category as LeadCategory,
      recommendation,
    });

    // 6. Send WhatsApp message via WasenderAPI
    // Don't fail the request if WhatsApp sending fails
    try {
      const message = RESULT_MESSAGES[category as LeadCategory](score, guideUrl);

      console.log('[QuizSubmit] Sending WhatsApp message to:', formattedPhone, 'via URL:', process.env.WASENDER_API_URL || 'https://www.wasenderapi.com/api');

      const sendResult = await sendWhatsAppMessage({
        to: formattedPhone,
        text: message,
        sessionId,
      });

      if (!sendResult.success) {
        console.error('[QuizSubmit] WhatsApp send failed:', sendResult.error);
      } else {
        console.log('[QuizSubmit] WhatsApp sent successfully. MessageId:', sendResult.messageId);
      }

      await logMessageEvent(supabase, {
        submissionToken: guideToken,
        messageType: 'quiz_result',
        provider: 'wasender',
        status: sendResult.success ? 'sent' : 'failed',
        recipient: formattedPhone,
        providerMessageId: sendResult.messageId,
        errorMessage: sendResult.error,
      });
    } catch (waError) {
      // Log the error for monitoring but don't fail the request
      // The user still gets their guide URL
      console.error('[QuizSubmit] WhatsApp exception:', waError instanceof Error ? waError.message : waError);
      await logMessageEvent(supabase, {
        submissionToken: guideToken,
        messageType: 'quiz_result',
        provider: 'wasender',
        status: 'failed',
        recipient: formattedPhone,
        errorMessage: waError instanceof Error ? waError.message : 'Unknown WhatsApp error',
      });
    }

    // 7. Return success response
    return NextResponse.json({
      success: true,
      guideUrl,
      score,
      category,
      diagnostic,
    });

  } catch (error) {
    console.error('Unexpected error in quiz submission:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
