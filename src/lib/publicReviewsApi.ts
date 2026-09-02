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
 *   reviews   every ACTIVE review, newest first, anonymised server-side to
 *             "Sira T." — no goods reference, no phone number, no client id.
 *             A rating left without words arrives with `comment: null`; those
 *             used to be dropped, which is what made "sur 4 avis" sit beside
 *             two cards. They are rendered as what they are instead.
 *   stats     computed over every ACTIVE review, the silent ones included.
 *             Never recompute the average from the cards: that inflates it,
 *             and an inflated rating is the one number on this site that would
 *             be both false and load-bearing.
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
  /** Null when the client rated without writing anything. */
  comment: string | null;
  adminResponse: string | null;
  /** First name plus a surname initial, built server-side. */
  author: string;
  /**
   * Opaque address of the author's public profile, or null when they have none
   * (a staff account, a closed one). Never a user id — see the API's
   * `publicProfileService` for why that distinction matters.
   */
  authorHandle: string | null;
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
  /** Everything returned, silent ratings included. */
  displayed: number;
  /** The subset carrying text, for a surface that wants to lead with those. */
  withComment: number;
  stats: PublicReviewStats;
}

const TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 3600;

/** Empty, not fabricated: every surface degrades to showing nothing. */
export const EMPTY_REVIEWS: PublicReviewsPayload = {
  reviews: [],
  displayed: 0,
  withComment: 0,
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

    const kept = reviews.filter(Boolean);
    return {
      // No comment filter: a five-star rating with no words is still one of
      // the reviews `stats` counts, and hiding it is what made the two
      // numbers disagree on screen.
      reviews: kept,
      displayed: typeof data.displayed === 'number' ? data.displayed : kept.length,
      withComment:
        typeof data.withComment === 'number'
          ? data.withComment
          : kept.filter((review) => review.comment).length,
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
