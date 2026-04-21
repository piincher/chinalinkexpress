import type { QuizAttribution, QuizLocale } from '../types';
import { QUIZ_CONFIG, QUIZ_QUESTIONS } from './constants';
import { validateWhatsAppNumber } from './whatsapp';

export interface ValidatedQuizSubmission {
  whatsappNumber: string;
  formattedPhone: string;
  answers: Record<number, string>;
  locale: QuizLocale;
  sessionId: string;
  attribution: QuizAttribution;
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; status: number };

const VALID_LOCALES = new Set<QuizLocale>(['fr', 'en', 'zh', 'ar']);

const allowedAnswersByQuestion = new Map(
  QUIZ_QUESTIONS.map((question) => [
    question.id,
    new Set(question.options.map((option) => option.value)),
  ])
);

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function normalizeLocale(value: unknown): QuizLocale {
  const locale = asString(value);
  return locale && VALID_LOCALES.has(locale as QuizLocale) ? (locale as QuizLocale) : 'fr';
}

function sanitizeAttribution(value: unknown): QuizAttribution {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const source = value as Record<string, unknown>;
  return {
    source: asString(source.source)?.slice(0, 120),
    medium: asString(source.medium)?.slice(0, 120),
    campaign: asString(source.campaign)?.slice(0, 160),
    term: asString(source.term)?.slice(0, 160),
    content: asString(source.content)?.slice(0, 160),
    referrer: asString(source.referrer)?.slice(0, 500),
    landingPath: asString(source.landingPath)?.slice(0, 500),
  };
}

function normalizeAnswers(value: unknown): ValidationResult<Record<number, string>> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { success: false, error: 'Answers are required', status: 400 };
  }

  const raw = value as Record<string, unknown>;
  const normalized: Record<number, string> = {};
  const missingQuestions: number[] = [];

  for (const question of QUIZ_QUESTIONS) {
    const rawAnswer = raw[String(question.id)] ?? raw[question.id];
    const answerValue = asString(rawAnswer);
    const allowedAnswers = allowedAnswersByQuestion.get(question.id);

    if (!answerValue) {
      missingQuestions.push(question.id);
      continue;
    }

    if (!allowedAnswers?.has(answerValue)) {
      return {
        success: false,
        error: `Invalid answer for question ${question.id}`,
        status: 400,
      };
    }

    normalized[question.id] = answerValue;
  }

  if (missingQuestions.length > 0) {
    return {
      success: false,
      error: `Missing answers for questions: ${missingQuestions.join(', ')}`,
      status: 400,
    };
  }

  if (Object.keys(normalized).length !== QUIZ_CONFIG.totalQuestions) {
    return {
      success: false,
      error: 'Incomplete quiz submission',
      status: 400,
    };
  }

  return { success: true, data: normalized };
}

export function validateQuizSubmissionPayload(body: unknown): ValidationResult<ValidatedQuizSubmission> {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { success: false, error: 'Invalid request body', status: 400 };
  }

  const payload = body as Record<string, unknown>;
  const whatsappNumber = asString(payload.whatsappNumber);

  if (!whatsappNumber) {
    return { success: false, error: 'WhatsApp number is required', status: 400 };
  }

  const phoneValidation = validateWhatsAppNumber(whatsappNumber);
  if (!phoneValidation.isValid) {
    return {
      success: false,
      error: phoneValidation.error || 'Invalid WhatsApp number',
      status: 400,
    };
  }

  const answers = normalizeAnswers(payload.answers);
  if (!answers.success) {
    return answers;
  }

  const sessionId = asString(payload.sessionId) || crypto.randomUUID();

  return {
    success: true,
    data: {
      whatsappNumber,
      formattedPhone: phoneValidation.formattedNumber,
      answers: answers.data,
      locale: normalizeLocale(payload.locale),
      sessionId,
      attribution: sanitizeAttribution(payload.attribution),
    },
  };
}
