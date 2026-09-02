/**
 * Public reviews — the real ones, from the app's `reviews` collection.
 *
 * This is the data source `features/reviews/data/reviews.ts` was waiting for.
 * That file held twelve invented reviews and an `AGGREGATE_RATING` of 4.8 from
 * 312, which is why it carried a warning header and why nothing rendered it.
 * It is gone; this endpoint replaces it.
 *
 * The contract, from `GET /api/v2/public/reviews`:
 *
 *   reviews   only the ACTIVE reviews carrying written text, newest first,
 *             anonymised server-side to "Sira T." — no goods reference, no
 *             phone number, no client id.
 *   stats     computed over *every* ACTIVE review, including those left as a
 *             bare rating with no comment. So the average can legitimately be
 *             "sur 4 avis" beside two cards. Never recompute the average from
 *             the cards to make those numbers agree: that inflates it, and an
 *             inflated rating is the one number on this site that would be
 *             both false and load-bearing.
 *
 * Same shape as liveFeedApi: a plain fetch, an abort timeout, and a result
 * union so callers never catch. Cached for an hour — reviews arrive a few
 * times a month, and a marketing page should not wait on the API on every
 * request.
 */

import { API_CONFIG } from '@/config/api';

export interface PublicReview {
  id: string;
  rating: number;
  comment: string;
  adminResponse: string | null;
  /** First name plus a surname initial, built server-side. */
  author: string;
  mode: 'AIR' | 'SEA';
  createdAt: string;
}

export interface PublicReviewStats {
  averageRating: number;
  /** Every ACTIVE review — including ratings left without a comment. */
  totalReviews: number;
  distribution: Record<string, number>;
}

export interface PublicReviewsPayload {
  reviews: PublicReview[];
  /** How many carry text, i.e. how many can be shown as cards. */
  displayed: number;
  stats: PublicReviewStats;
}

const TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 3600;

/** Empty, not fabricated: every surface degrades to showing nothing. */
export const EMPTY_REVIEWS: PublicReviewsPayload = {
  reviews: [],
  displayed: 0,
  stats: { averageRating: 0, totalReviews: 0, distribution: {} },
};

export async function fetchPublicReviews(limit = 24): Promise<PublicReviewsPayload> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `${API_CONFIG.BASE_URL}/api/v2/public/reviews?limit=${limit}`,
      { method: 'GET', signal: controller.signal, next: { revalidate: REVALIDATE_SECONDS } }
    );
    if (!res.ok) return EMPTY_REVIEWS;

    const json = await res.json();
    const data = json?.data ?? {};
    const reviews = Array.isArray(data.reviews) ? (data.reviews as PublicReview[]) : [];
    const stats = (data.stats ?? EMPTY_REVIEWS.stats) as PublicReviewStats;

    return {
      reviews: reviews.filter((review) => review && review.comment),
      displayed: typeof data.displayed === 'number' ? data.displayed : reviews.length,
      stats: {
        averageRating: Number(stats.averageRating) || 0,
        totalReviews: Number(stats.totalReviews) || 0,
        distribution: stats.distribution ?? {},
      },
    };
  } catch {
    // A marketing page renders without reviews rather than not at all.
    return EMPTY_REVIEWS;
  } finally {
    clearTimeout(timeout);
  }
}

/** French month + year, e.g. "août 2026" — the day is noise on a testimonial. */
export function formatReviewDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, {
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return '';
  }
}
