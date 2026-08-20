'use client';

/**
 * LiveFeedCounters — the network's vital signs, above the feed that proves
 * them.
 *
 * Same typographic move as StatsSection (display-face figure, mono uppercase
 * label, hairline separators drawn on the leading edge) because the two
 * strips state the same kind of thing at different altitudes: StatsSection is
 * the company's record, this is the network right now. Keeping the pattern
 * identical is what lets a reader compare them without re-learning how to
 * read.
 *
 * The figures are live values from the feed endpoint, refreshed every minute;
 * Counter animates them on first view only, so a poll updating a number does
 * not replay the count-up.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Counter, RevealGroup } from '@/components/motion';
import type { LiveFeedCounters as LiveFeedCountersData } from '@/lib/liveFeedApi';

export function LiveFeedCounters({ counters }: { counters: LiveFeedCountersData }) {
  const t = useTranslations('liveFeed.counters');
  const locale = useLocale();

  const figures = [
    {
      value: counters.onTheWay,
      label: t('onTheWay'),
      sub: t('airSeaSplit', { air: counters.onTheWayAir, sea: counters.onTheWaySea }),
    },
    { value: counters.containersInTransit, label: t('containersAtSea') },
    { value: counters.receivedLast30d, label: t('receivedLast30d') },
    { value: counters.deliveredTotal, label: t('delivered') },
  ];

  return (
    <RevealGroup
      stagger={0.09}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
        gap: 'var(--space-xl)',
        marginBottom: 'var(--space-2xl)',
      }}
    >
      {figures.map((figure, i) => (
        <div
          key={figure.label}
          style={{
            minWidth: 0,
            paddingInlineStart: i > 0 ? 'var(--space-xl)' : 0,
            borderInlineStart: i > 0 ? '1px solid var(--color-rule)' : undefined,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              lineHeight: 1,
              color: 'var(--color-ink)',
            }}
          >
            <Counter value={figure.value} locale={locale} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-neutral)',
              marginTop: 'var(--space-sm)',
            }}
          >
            {figure.label}
          </div>
          {figure.sub && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-neutral)',
                marginTop: 'var(--space-2xs)',
              }}
            >
              {figure.sub}
            </div>
          )}
        </div>
      ))}
    </RevealGroup>
  );
}

export default LiveFeedCounters;
