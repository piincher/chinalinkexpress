import type { QuizAttribution } from '../types';

function readParam(params: URLSearchParams, name: string): string | undefined {
  const value = params.get(name);
  return value && value.trim() ? value.trim().slice(0, 180) : undefined;
}

export function createQuizSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `quiz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function captureQuizAttribution(): QuizAttribution {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return {
    source: readParam(params, 'utm_source') || readParam(params, 'source'),
    medium: readParam(params, 'utm_medium'),
    campaign: readParam(params, 'utm_campaign'),
    term: readParam(params, 'utm_term'),
    content: readParam(params, 'utm_content'),
    referrer: document.referrer || undefined,
    landingPath: `${window.location.pathname}${window.location.search}`,
  };
}
