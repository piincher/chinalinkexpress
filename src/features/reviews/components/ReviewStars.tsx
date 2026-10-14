'use client';

/**
 * Five stars in the site's own vocabulary — accent fill, rule-coloured empties,
 * no gradient and no amber. The older `StarRating` in this folder is kept for
 * the video testimonials, which still run on the legacy palette classes.
 */

import React from 'react';
import { Star } from 'lucide-react';
import { useMomentInView, momentClass } from '@/components/moments/useMomentInView';
import '@/components/moments/moments.css';

interface ReviewStarsProps {
  rating: number;
  size?: number;
  /** Accessible label; omit inside a figure that already names the rating. */
  label?: string;
}

export function ReviewStars({ rating, size = 15, label }: ReviewStarsProps) {
  const rounded = Math.round(rating);
  // The stars pop in one after another the first time the row is seen.
  const [ref, motion] = useMomentInView<HTMLSpanElement>(0.6);

  return (
    <span
      ref={ref}
      className={momentClass('mo-stars', motion)}
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
            '--i': star - 1,
            color: star <= rounded ? 'var(--color-accent)' : 'var(--color-rule)',
            fill: star <= rounded ? 'var(--color-accent)' : 'transparent',
          } as React.CSSProperties}
        />
      ))}
    </span>
  );
}

export default ReviewStars;
