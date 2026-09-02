'use client';

/**
 * One review, in the house figure treatment: a rule above, the words, then who
 * said them — the same shape the WhatsApp testimonials use on the home page, so
 * the two sources sit in one grid without either looking bolted on.
 *
 * What distinguishes an app review from a quote is a single mono tag: where it
 * came from and, for app reviews, the shipping mode it was written about. No
 * "verified" checkmark badge and no invented country flag. The provenance line
 * is the claim, and it is one this codebase can substantiate — these rows exist
 * in the `reviews` collection, written by clients who had a delivery.
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { ReviewStars } from './ReviewStars';

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export interface ReviewFigureProps {
  author: string;
  text: string;
  /** Shown under the name: mode + date, or the person's company. */
  meta?: string;
  rating?: number;
  /** Small mono line above the quote: where this came from. */
  provenance?: string;
  /** The team's published answer, when there is one. */
  response?: string | null;
  responseLabel?: string;
}

export function ReviewFigure({
  author,
  text,
  meta,
  rating,
  provenance,
  response,
  responseLabel,
}: ReviewFigureProps) {
  return (
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        margin: 0,
        minWidth: 0,
        paddingTop: 'var(--space-lg)',
        borderTop: '2px solid var(--color-ink)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
        }}
      >
        {rating ? <ReviewStars rating={rating} /> : <Quote size={20} aria-hidden style={{ color: 'var(--color-accent)' }} />}
        {provenance && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-neutral)',
            }}
          >
            {provenance}
          </span>
        )}
      </div>

      <blockquote
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-md)',
          lineHeight: 1.55,
          color: 'var(--color-ink)',
          margin: 0,
          flex: 1,
        }}
      >
        {text}
      </blockquote>

      {response && (
        <div
          style={{
            borderLeft: '2px solid var(--color-rule)',
            paddingLeft: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {responseLabel && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-neutral)',
              }}
            >
              {responseLabel}
            </span>
          )}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.5,
              color: 'var(--color-ink-2)',
            }}
          >
            {response}
          </p>
        </div>
      )}

      <figcaption
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          minWidth: 0,
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            flexShrink: 0,
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-rule)',
            backgroundColor: 'var(--color-paper-2)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.04em',
            color: 'var(--color-ink-2)',
          }}
        >
          {initialsOf(author)}
        </span>
        <span style={{ minWidth: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--weight-heading)',
              color: 'var(--color-ink)',
            }}
          >
            {author}
          </span>
          {meta && (
            <span
              style={{
                display: 'block',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral)',
              }}
            >
              {meta}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export default ReviewFigure;
