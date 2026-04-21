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
import { calculateScore, getLeadCategory, generateGuideToken } from '@/features/import-quiz/lib/scoring';
import { validateWhatsAppNumber } from '@/features/import-quiz/lib/whatsapp';
import { RESULT_MESSAGES, QUIZ_CONFIG } from '@/features/import-quiz/lib/constants';
import { LeadCategory } from '@/features/import-quiz/types';

// Request body type
interface QuizSubmitRequest {
  whatsappNumber: string;
  answers: Record<number, string>;
  locale?: string;
}

// Success response type
interface QuizSubmitSuccessResponse {
  success: true;
  guideUrl: string;
  score: number;
  category: string;
}

// Error response type
interface QuizSubmitErrorResponse {
  success: false;
  error: string;
}

type QuizSubmitResponse = QuizSubmitSuccessResponse | QuizSubmitErrorResponse;

/**
 * POST handler for quiz submissions
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<QuizSubmitResponse>> {
  try {
    // 1. Parse request body
    let body: QuizSubmitRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { whatsappNumber, answers, locale = 'fr' } = body;

    // 2. Validate required fields
    if (!whatsappNumber || typeof whatsappNumber !== 'string') {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Answers are required' },
        { status: 400 }
      );
    }

    // 3. Validate WhatsApp number
    const phoneValidation = validateWhatsAppNumber(whatsappNumber);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { success: false, error: phoneValidation.error || 'Invalid WhatsApp number' },
        { status: 400 }
      );
    }

    const formattedPhone = phoneValidation.formattedNumber;

    // 4. Calculate score
    const score = calculateScore(answers);

    // 5. Determine category
    const category = getLeadCategory(score);

    // 6. Generate guide token
    const guideToken = generateGuideToken(formattedPhone);

    // 7. Construct guide URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                    `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host')}`;
    const guideUrl = `${baseUrl}/${locale}/guide/${guideToken}`;

    // 8. Save to Supabase
    const supabase = createServerClient();
    
    console.log('Saving quiz submission with token:', guideToken);
    
    const { error: dbError } = await (supabase as any)
      .from('quiz_submissions')
      .insert({
        whatsapp_number: formattedPhone,
        answers: answers,
        score: score,
        category: category,
        guide_token: guideToken,
        // locale will use DB default 'fr' until migration is applied
      });

    if (dbError) {
      console.error('Database error saving quiz submission:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save quiz submission: ' + dbError.message },
        { status: 500 }
      );
    }
    
    console.log('Quiz submission saved successfully');

    // 9. Send WhatsApp message via WasenderAPI
    // Don't fail the request if WhatsApp sending fails
    try {
      const message = RESULT_MESSAGES[category as LeadCategory](score, guideUrl);
      
      await sendWhatsAppMessage({
        to: formattedPhone,
        text: message,
      });
    } catch (waError) {
      // Log the error for monitoring but don't fail the request
      // The user still gets their guide URL
      console.error('Failed to send WhatsApp message via WasenderAPI:', waError);
    }

    // 10. Return success response
    return NextResponse.json({
      success: true,
      guideUrl,
      score,
      category,
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
