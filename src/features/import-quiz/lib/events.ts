import type { QuizEventPayload } from '../types';

export function trackQuizEvent(payload: QuizEventPayload): void {
  if (typeof window === 'undefined') {
    return;
  }

  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      const queued = navigator.sendBeacon('/api/quiz/events', blob);
      if (queued) return;
    }
  } catch {
    // Fall through to fetch.
  }

  fetch('/api/quiz/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics must never block the quiz flow.
  });
}
