/**
 * Guide Token Validation API Route
 * 
 * Validates a guide token without returning full data.
 * - Checks if token exists
 * - Checks if token has expired
 * - Returns validation status and expiration date
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

// Request body type
interface ValidateTokenRequest {
  token: string;
}

// Response types
interface ValidateSuccessResponse {
  valid: true;
  expiresAt: string;
}

interface ValidateErrorResponse {
  valid: false;
  error: string;
}

type ValidateTokenResponse = ValidateSuccessResponse | ValidateErrorResponse;

/**
 * POST handler for validating guide token
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ValidateTokenResponse>> {
  try {
    // Parse request body
    let body: ValidateTokenRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { valid: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { token } = body;

    // Validate token format
    if (!token || typeof token !== 'string' || token.length < 10) {
      return NextResponse.json(
        { valid: false, error: 'Token invalide' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createServerClient();

    // Fetch submission by guide token (only select necessary fields)
    const { data: submission, error: fetchError } = await (supabase as any)
      .from('quiz_submissions')
      .select('guide_token, created_at')
      .eq('guide_token', token)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json(
        { valid: false, error: 'Guide non trouvé ou expiré' },
        { status: 404 }
      );
    }

    // Calculate expiration (30 days from creation)
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

    // Return success with expiration date
    return NextResponse.json({
      valid: true,
      expiresAt: expiresAt.toISOString(),
    });

  } catch (error) {
    console.error('Unexpected error validating guide token:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
