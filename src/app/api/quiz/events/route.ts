import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import type { QuizEventName, QuizLocale } from '@/features/import-quiz/types';
import { getClientIp, checkRateLimit } from '@/features/import-quiz/lib/rate-limit';

const VALID_EVENTS = new Set<QuizEventName>([
  'quiz_viewed',
  'quiz_started',
  'question_answered',
  'question_previous',
  'whatsapp_step_viewed',
  'quiz_submitted',
  'quiz_submit_failed',
  'guide_opened',
  'guide_cta_clicked',
]);

const VALID_LOCALES = new Set<QuizLocale>(['fr', 'en', 'zh', 'ar']);

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export async function POST(request: NextRequest) {
  const ipAddress = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`quiz-event:${ipAddress}`, 120, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const eventName = asString(body.eventName) as QuizEventName | undefined;
    const sessionId = asString(body.sessionId);
    const locale = asString(body.locale) as QuizLocale | undefined;

    if (!eventName || !VALID_EVENTS.has(eventName) || !sessionId) {
      return NextResponse.json({ success: false, error: 'Invalid analytics event' }, { status: 400 });
    }

    const safeLocale = locale && VALID_LOCALES.has(locale) ? locale : 'fr';
    const metadata =
      body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? body.metadata
        : {};
    const attribution =
      body.attribution && typeof body.attribution === 'object' && !Array.isArray(body.attribution)
        ? body.attribution
        : {};

    try {
      const supabase = createServerClient();
      await (supabase as any).from('quiz_events').insert({
        session_id: sessionId,
        event_name: eventName,
        locale: safeLocale,
        question_id: typeof body.questionId === 'number' ? body.questionId : null,
        answer_value: asString(body.answerValue) || null,
        metadata,
        attribution,
        ip_address: ipAddress === 'unknown' ? null : ipAddress,
        user_agent: request.headers.get('user-agent'),
      });
    } catch (error) {
      console.warn('[QuizEvents] Event logging skipped:', error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid analytics event' }, { status: 400 });
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
