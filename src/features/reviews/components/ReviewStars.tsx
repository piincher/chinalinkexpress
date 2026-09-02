'use client';

/**
 * Five stars in the site's own vocabulary — accent fill, rule-coloured empties,
 * no gradient and no amber. The older `StarRating` in this folder is kept for
 * the video testimonials, which still run on the legacy palette classes.
 */

import React from 'react';
import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  size?: number;
  /** Accessible label; omit inside a figure that already names the rating. */
  label?: string;
}

export function ReviewStars({ rating, size = 15, label }: ReviewStarsProps) {
  const rounded = Math.round(rating);

  return (
    <span
      role="img"
      aria-label={label ?? `${rating} / 5`}
      style={{ display: 'inline-flex', gap: '0.125rem', flexShrink: 0 }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          aria-hidden
          style={{
            color: star <= rounded ? 'var(--color-accent)' : 'var(--color-rule)',
            fill: star <= rounded ? 'var(--color-accent)' : 'transparent',
          }}
        />
      ))}
    </span>
  );
}

export default ReviewStars;
