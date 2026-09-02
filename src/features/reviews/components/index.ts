/**
 * Reviews feature components.
 *
 * Gone from this barrel, and from the tree: `StarRating`, `ReviewCard` and
 * `VerifiedReviewsSection`, together with `data/reviews.ts`. That trio rendered
 * twelve invented reviews — invented names, invented dates, invented amounts
 * saved, every one flagged `verified: true` — under an `AGGREGATE_RATING` of
 * 4.8 from 312, beside "Google Reviews / Trustpilot" source badges the company
 * has never collected a review on. It was unmounted in 2026-08 and kept "until
 * there is a data source".
 *
 * There is now a data source: `GET /api/v2/public/reviews`, over the app's real
 * `reviews` collection. So the fabricated file is deleted rather than left one
 * import away from a Google manual action, and what replaces it renders in the
 * site's own vocabulary — tokens and Band/Shell, not the old palette classes.
 */

export { ReviewStars } from './ReviewStars';
export { ReviewFigure } from './ReviewFigure';
export { RatingSummary } from './RatingSummary';
export { ClientReviewsBand } from './ClientReviewsBand';
export { VideoTestimonialCard } from './VideoTestimonialCard';
export { VideoTestimonialsSection } from './VideoTestimonialsSection';
