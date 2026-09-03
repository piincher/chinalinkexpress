'use client';

/**
 * One occasion: the date, and the last day to ship for it.
 *
 * The card exists to answer a single question a buyer actually has — "can I
 * still get this there in time?" — so the lane state, not the occasion name,
 * is what carries the visual weight. An open lane is quiet; a lane inside its
 * last week is amber; a closed lane says so plainly instead of leaving someone
 * to work out that a cutoff in the past means no.
 *
 * Every date and every day-count is rendered exactly as the API sent it. The
 * cutoffs are the promise this business is held to, and a promise recomputed in
 * a browser is a promise with a different clock behind it.
 */

import React from 'react';
import { Plane, Ship } from 'lucide-react';
import type { CustomerOccasion, OccasionLane, OccasionLaneState } from '@/lib/publicOccasionsApi';

/** Semantic, not decorative: the colour IS the answer to "am I too late?". */
const LANE_TONE: Record<OccasionLaneState, { color: string; background: string }> = {
  open: { color: 'var(--color-ink)', background: 'var(--color-paper-2)' },
  urgency: { color: 'var(--color-warning, #b45309)', background: 'rgba(180, 83, 9, 0.10)' },
  risky: { color: 'var(--color-warning, #b45309)', background: 'rgba(180, 83, 9, 0.10)' },
  closed: { color: 'var(--color-neutral)', background: 'transparent' },
};

interface LaneRowProps {
  lane: OccasionLane;
  labels: {
    air: string;
    sea: string;
    shipBy: (date: string) => string;
    daysLeft: (days: number) => string;
    closed: string;
  };
}

function LaneRow({ lane, labels }: LaneRowProps) {
  const tone = LANE_TONE[lane.state];
  const isClosed = lane.state === 'closed';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        borderRadius: 'var(--radius-sm, 0.5rem)',
        backgroundColor: tone.background,
        opacity: isClosed ? 0.65 : 1,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-neutral)',
        }}
      >
        {lane.mode === 'AIR' ? <Plane size={13} aria-hidden /> : <Ship size={13} aria-hidden />}
        {lane.mode === 'AIR' ? labels.air : labels.sea}
      </span>

      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: tone.color,
          fontWeight: lane.state === 'urgency' ? 'var(--weight-heading)' : undefined,
        }}
      >
        {isClosed
          ? labels.closed
          : lane.recommendedCutoffLabel
            ? labels.shipBy(lane.recommendedCutoffLabel)
            : ''}
      </span>

      {!isClosed && typeof lane.daysRemaining === 'number' ? (
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: tone.color,
          }}
        >
          {labels.daysLeft(lane.daysRemaining)}
        </span>
      ) : null}
    </div>
  );
}

export interface OccasionCardProps {
  occasion: CustomerOccasion;
  labels: {
    air: string;
    sea: string;
    shipBy: (date: string) => string;
    daysLeft: (days: number) => string;
    closed: string;
    estimated: string;
    allClosed: string;
    inDays: (days: number) => string;
  };
}

export function OccasionCard({ occasion, labels }: OccasionCardProps) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        paddingTop: 'var(--space-lg)',
        borderTop: '2px solid var(--color-ink)',
        minWidth: 0,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <span aria-hidden style={{ fontSize: '1.75rem', lineHeight: 1 }}>
          {occasion.emoji}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--weight-heading)',
              color: 'var(--color-ink)',
            }}
          >
            {occasion.name}
          </h3>
          <p
            style={{
              margin: '0.15rem 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-neutral)',
            }}
          >
            {occasion.targetDateLabel}
            {/* Islamic and school dates are projections until confirmed, and
                saying so is the difference between a date and a guess. */}
            {occasion.dateConfidence === 'estimated' ? ` · ${labels.estimated}` : ''}
          </p>
        </div>
        {typeof occasion.daysUntilTarget === 'number' ? (
          <span
            style={{
              flexShrink: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.04em',
              color: 'var(--color-neutral)',
            }}
          >
            {labels.inDays(occasion.daysUntilTarget)}
          </span>
        ) : null}
      </header>

      {occasion.allDeadlinesPassed ? (
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-neutral)',
          }}
        >
          {labels.allClosed}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {occasion.lanes.map((lane) => (
            <LaneRow key={`${occasion.id}-${lane.mode}`} lane={lane} labels={labels} />
          ))}
        </div>
      )}

      {occasion.goodsSuggestions?.length ? (
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.5,
            color: 'var(--color-ink-2)',
          }}
        >
          {occasion.goodsSuggestions.slice(0, 4).join(' · ')}
        </p>
      ) : null}
    </article>
  );
}

export default OccasionCard;
