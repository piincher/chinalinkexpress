/**
 * "Suivre mon colis" — POST /api/v2/public/track { code, phoneLast4 }.
 *
 * Parcel codes run in sequence, so the API wants the last 4 digits of the
 * phone on the parcel as well, and only ever answers with the stage, the mode
 * and the client ETA. Called from the browser for the same reason as
 * photoVerifyApi: the API rate limits per visitor IP.
 */

import { API_CONFIG } from '@/config/api';

export interface TrackedParcel {
  code: string;
  status: string;
  mode: 'AIR' | 'SEA' | null;
  estimatedArrival: string | null;
}

export type ParcelTrackOutcome =
  | { status: 'found'; parcel: TrackedParcel }
  | { status: 'invalid' }
  | { status: 'not-found' }
  | { status: 'rate-limited' }
  | { status: 'error' };

const TIMEOUT_MS = 10000;
const CODE = /^[A-Z0-9][A-Z0-9-]{3,39}$/;

/** "g 2609 0069" → "G-2609-0069"-style input cleaned of spaces, or null. */
export function normalizeParcelCode(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const code = input.trim().toUpperCase().replace(/\s+/g, '');
  return CODE.test(code) ? code : null;
}

export function normalizeLast4(input: unknown): string | null {
  const digits = typeof input === 'string' ? input.replace(/\D/g, '') : '';
  return digits.length === 4 ? digits : null;
}

const parse = (data: unknown): TrackedParcel | null => {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (typeof d.code !== 'string' || typeof d.status !== 'string') return null;
  return {
    code: d.code,
    status: d.status,
    mode: d.mode === 'AIR' || d.mode === 'SEA' ? d.mode : null,
    estimatedArrival: typeof d.estimatedArrival === 'string' ? d.estimatedArrival : null,
  };
};

export async function trackParcel(codeInput: string, last4Input: string, signal?: AbortSignal): Promise<ParcelTrackOutcome> {
  const code = normalizeParcelCode(codeInput);
  const phoneLast4 = normalizeLast4(last4Input);
  if (!code || !phoneLast4) return { status: 'invalid' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort);

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, phoneLast4 }),
      signal: controller.signal,
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    });
    if (res.status === 400) return { status: 'invalid' };
    if (res.status === 404) return { status: 'not-found' };
    if (res.status === 429) return { status: 'rate-limited' };
    if (!res.ok) return { status: 'error' };
    const parcel = parse(((await res.json()) as { data?: unknown } | null)?.data);
    return parcel ? { status: 'found', parcel } : { status: 'error' };
  } catch {
    return { status: 'error' };
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
