/**
 * The public profile behind a review's author.
 *
 * Same contract as the app's screen of the same name, and the same rules
 * (`publicProfileService` in the API): only clients who have published a review
 * have one, the address is an opaque handle rather than a user id, and nothing
 * identifying or financial is in the payload.
 *
 * Requests from this site are always anonymous — there is no session to send —
 * so `shipments.total` comes back null and `shipments.band` carries the answer:
 * "5+ expéditions", not "7". That is deliberate. A page that a search engine
 * could reach must not publish a client's exact volume, which is why the pages
 * built on this are `noindex` as well.
 *
 * Like `publicReviewsApi`, this returns null rather than throwing: an API
 * outage turns into a 404 page, never a 500.
 */

import { API_CONFIG } from '@/config/api';

export interface PublicProfileReview {
  id: string;
  rating: number;
  /** Null for a rating left without words. */
  comment: string | null;
  adminResponse: string | null;
  mode: 'AIR' | 'SEA';
  createdAt: string;
}

export interface PublicClientProfile {
  handle: string;
  /** "Sira T." — the same anonymisation the review cards use. */
  displayName: string;
  initials: string;
  memberSince: string | null;
  shipments: {
    /** Null for anonymous readers, which is every reader of this site. */
    total: number | null;
    /** "5+", "10+"… — the coarse figure the site is allowed to show. */
    band: string;
    air: number | null;
    sea: number | null;
    modes: Array<'AIR' | 'SEA'>;
    firstAt: string | null;
  };
  rating: { average: number | null; count: number };
  tier: { key: string; label: string } | null;
  reviews: PublicProfileReview[];
}

const TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 3600;

/** Handles are 16 hex characters; anything else never reaches the API. */
const HANDLE_PATTERN = /^[a-f0-9]{16}$/;

export async function fetchPublicClientProfile(
  handle: string
): Promise<PublicClientProfile | null> {
  if (!HANDLE_PATTERN.test(handle)) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/clients/${handle}`, {
      method: 'GET',
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data;
    return data && typeof data.handle === 'string' ? (data as PublicClientProfile) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Where a reviewer's name points, in the reader's locale. */
export function publicProfilePath(locale: string, handle: string): string {
  return `/${locale}/client/${handle}`;
}
