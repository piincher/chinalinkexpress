'use client';

/**
 * The rating, stated once, from the collection.
 *
 * The count is `stats.totalReviews` — every ACTIVE review, including the ones
 * left as a bare rating with no words. That is why the number here can exceed
 * the number of cards below it, and why it must not be recomputed from the
 * cards: the average is the average of what clients actually gave.
 *
 * Renders nothing at zero. A site with no reviews yet says nothing about its
 * rating; it does not say "0 / 5", and it certainly does not say 4.8.
 */

import React from 'react';
import { ReviewStars } from './ReviewStars';

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
  /** e.g. "sur 4 avis clients" — already localised by the caller. */
  countLabel: string;
  align?: 'start' | 'end';
}

export function RatingSummary({
  averageRating,
  totalReviews,
  countLabel,
  align = 'start',
}: RatingSummaryProps) {
  if (!totalReviews || !averageRating) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        alignItems: align === 'end' ? 'flex-end' : 'flex-start',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-sm)' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-heading)',
            lineHeight: 1,
            color: 'var(--color-ink)',
          }}
        >
          {averageRating.toFixed(1).replace('.', ',')}
        </span>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' }}>/ 5</span>
        <ReviewStars rating={averageRating} label={`${averageRating} / 5`} />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-neutral)',
        }}
      >
        {countLabel}
      </span>
    </div>
  );
}

export default RatingSummary;
