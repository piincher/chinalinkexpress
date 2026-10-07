/**
 * "Vérifier une photo" — checks the code printed under a ChinaLink photo.
 *
 * Every photo our warehouse attests carries a banner with a code such as
 * 7F3A-92CD. Clients mostly look at those photos on their own phone, in
 * WhatsApp, where the QR next to it cannot be scanned; typing the code here is
 * the way they check it instead. The API (GET /api/v2/photos/verify) answers
 * with what is printed on the photo plus a short-lived link to our copy of it.
 *
 * Called from the browser on purpose, not from a Vercel function: the API rate
 * limits per visitor IP, and a server-side proxy would put every visitor behind
 * one IP and one shared budget. The API allows this site's origin (CORS).
 *
 * Nothing from the response is trusted blindly: the code is validated before it
 * leaves the page, the payload's shape is checked, and the image is only shown
 * from an https URL.
 */

import { API_CONFIG } from '@/config/api';

export interface VerifiedPhoto {
  code: string;
  reference: string | null;
  /** Attestation stage: RECEIVED_AT_WAREHOUSE, LABELED, ARRIVAL, HANDOVER… */
  stage: string | null;
  capturedAt: string | null;
  processedAt: string;
  /** Signed https link to the watermarked copy; expires in minutes. */
  imageUrl: string | null;
}

export type PhotoVerifyOutcome =
  | { status: 'valid'; photo: VerifiedPhoto }
  | { status: 'invalid' }
  | { status: 'not-found' }
  | { status: 'rate-limited' }
  | { status: 'error' };

const TIMEOUT_MS = 10000;
const HEX8 = /^[0-9A-F]{8}$/;
const MAX_INPUT_LENGTH = 32;

/**
 * What a person typed → "7F3A-92CD", or null. Accepts lower case, spaces, a
 * missing dash and the "IMG:" prefix; same rule as the API's parser.
 */
export function normalizePhotoCode(input: unknown): string | null {
  if (typeof input !== 'string' || input.length > MAX_INPUT_LENGTH) return null;
  const hex = input
    .trim()
    .toUpperCase()
    .replace(/^IMG:/, '')
    .replace(/[\s-]/g, '');
  return HEX8.test(hex) ? `${hex.slice(0, 4)}-${hex.slice(4)}` : null;
}

const isString = (v: unknown): v is string => typeof v === 'string';
const stringOrNull = (v: unknown): string | null => (isString(v) && v.length > 0 ? v : null);

const safeImageUrl = (v: unknown): string | null => {
  if (!isString(v)) return null;
  try {
    return new URL(v).protocol === 'https:' ? v : null;
  } catch {
    return null;
  }
};

const parsePhoto = (data: unknown): VerifiedPhoto | null => {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.isValid !== true || !isString(d.code) || !isString(d.processedAt)) return null;
  return {
    code: d.code,
    reference: stringOrNull(d.reference),
    stage: stringOrNull(d.stage),
    capturedAt: stringOrNull(d.capturedAt),
    processedAt: d.processedAt,
    imageUrl: safeImageUrl(d.imageUrl),
  };
};

export async function verifyPhotoCode(
  input: string,
  signal?: AbortSignal
): Promise<PhotoVerifyOutcome> {
  const code = normalizePhotoCode(input);
  if (!code) return { status: 'invalid' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort);

  try {
    const res = await fetch(
      `${API_CONFIG.BASE_URL}/api/v2/photos/verify?code=${encodeURIComponent(code)}`,
      {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      }
    );

    if (res.status === 400) return { status: 'invalid' };
    if (res.status === 404) return { status: 'not-found' };
    if (res.status === 429) return { status: 'rate-limited' };
    if (!res.ok) return { status: 'error' };

    const json: unknown = await res.json();
    const photo = parsePhoto((json as { data?: unknown } | null)?.data);
    return photo ? { status: 'valid', photo } : { status: 'error' };
  } catch {
    return { status: 'error' };
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
