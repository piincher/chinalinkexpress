/**
 * Guide Data API Route
 * 
 * Fetches guide data for a given token.
 * - Validates guide token
 * - Fetches from Supabase quiz_submissions
 * - Checks if expired
 * - Logs access (ip, user-agent)
 * - Returns guide data with masked phone number
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

// Response types
interface GuideData {
  whatsappNumber: string;
  score: number;
  category: 'hot' | 'warm' | 'cold';
  answers: Record<string, unknown>;
  generatedAt: string;
  expiresAt: string;
}

interface GuideSuccessResponse {
  valid: true;
  data: GuideData;
}

interface GuideErrorResponse {
  valid: false;
  error: string;
}

type GuideResponse = GuideSuccessResponse | GuideErrorResponse;

/**
 * Masks a WhatsApp number for privacy
 * Shows only first 3 and last 3 digits
 * Example: "22312345678" -> "223****678"
 */
function maskWhatsAppNumber(phone: string): string {
  if (phone.length < 6) {
    return phone;
  }
  const firstThree = phone.slice(0, 3);
  const lastThree = phone.slice(-3);
  const masked = '*'.repeat(phone.length - 6);
  return `${firstThree}${masked}${lastThree}`;
}

/**
 * GET handler for fetching guide data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
): Promise<NextResponse<GuideResponse>> {
  try {
    const { token } = await params;

    // Validate token format
    if (!token || typeof token !== 'string' || token.length < 10) {
      return NextResponse.json(
        { valid: false, error: 'Token invalide' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createServerClient();

    // Fetch submission by guide token
    console.log('Fetching guide with token:', token);
    
    const { data: submission, error: fetchError } = await (supabase as any)
      .from('quiz_submissions')
      .select('*')
      .eq('guide_token', token)
      .single();

    if (fetchError || !submission) {
      console.error('Error fetching guide:', fetchError, 'Submission:', submission);
      return NextResponse.json(
        { valid: false, error: 'Guide non trouvé ou expiré' },
        { status: 404 }
      );
    }
    
    console.log('Guide found:', submission.id, 'Created at:', submission.created_at);

    // Check if guide has expired (30 days from creation)
    const now = new Date();
    const createdAt = new Date(submission.created_at);
    const expiresAt = new Date(createdAt);
    expiresAt.setDate(expiresAt.getDate() + 30);

    if (now > expiresAt) {
      return NextResponse.json(
        { valid: false, error: 'Guide non trouvé ou expiré' },
        { status: 404 }
      );
    }

    // Log access
    try {
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      const userAgent = request.headers.get('user-agent') || null;

      // Insert access log
      await (supabase as any)
        .from('guide_access_logs')
        .insert({
          guide_token: token,
          ip_address: ip === 'unknown' ? null : ip.split(',')[0].trim(),
          user_agent: userAgent,
        });

      // Mark guide as opened using update
      await (supabase as any)
        .from('quiz_submissions')
        .update({
          guide_opened: true,
          guide_opened_at: new Date().toISOString(),
        })
        .eq('guide_token', token);
    } catch (logError) {
      // Log error but don't fail the request
      console.error('Error logging guide access:', logError);
    }

    // Prepare response data with masked phone number
    const responseData: GuideData = {
      whatsappNumber: maskWhatsAppNumber(submission.whatsapp_number),
      score: submission.score,
      category: submission.category,
      answers: submission.answers as Record<number, string>,
      generatedAt: submission.created_at,
      expiresAt: expiresAt.toISOString(),
    };

    return NextResponse.json({
      valid: true,
      data: responseData,
    });

  } catch (error) {
    console.error('Unexpected error fetching guide:', error);
    return NextResponse.json(
      { valid: false, error: 'Une erreur inattendue est survenue' },
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
