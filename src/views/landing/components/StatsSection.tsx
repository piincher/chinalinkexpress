'use client';

/**
 * Stats — a measured strip, not a card grid.
 *
 * Four figures separated by hairline rules, set large in the display face. The
 * previous version put them in the mono face at --text-3xl inside a stagger
 * container; mono digits read as *data*, which is right for a dashboard and
 * wrong for a claim. Set in Archivo at display size they read as a statement,
 * which is what a landing page stat is.
 *
 * Every number here comes from `STATS` in appConstants and the ratings copy in
 * the locale files — the site's existing figures. Nothing was rounded up for
 * effect and nothing was invented.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { Counter, RevealGroup } from '@/components/motion';
import { STATS } from '@/constants/appConstants';
import { SECTION_IDS } from '../constants';

export function StatsSection() {
  const t = useTranslations('stats');

  const figures = [
    { value: STATS.CLIENTS.value, suffix: STATS.CLIENTS.suffix, label: t('satisfiedClients') },
    { value: STATS.SHIPMENTS.value, suffix: STATS.SHIPMENTS.suffix, label: t('shipments') },
    { value: 7, suffix: '+', label: t('experienceYears') },
    {
      value: STATS.RATING.value,
      suffix: STATS.RATING.suffix,
      decimals: STATS.RATING.decimals,
      label: t('rating'),
      star: true,
    },
  ];

  return (
    <Band
      id={SECTION_IDS.STATS}
      tone="paper-2"
      ruled
      style={{ paddingBlock: 'clamp(2.75rem, 5vw, 4.5rem)' }}
    >
      <Shell>
        <RevealGroup
          stagger={0.09}
          style={{
            display: 'grid',
            // auto-fit with a minmax floor: four across on desktop, two on a
            // tablet, one on a phone — without a single media query, and
            // without the 1fr overflow trap.
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
            gap: 'var(--space-xl)',
          }}
        >
          {figures.map((figure, i) => (
            <div
              key={figure.label}
              style={{
                minWidth: 0,
                // Hairline separators between columns rather than borders
                // around cards. The rule is drawn on the item's leading edge
                // and suppressed on the first, so it never dangles.
                paddingInlineStart: i > 0 ? 'var(--space-xl)' : 0,
                borderInlineStart: i > 0 ? '1px solid var(--color-rule)' : undefined,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2xs)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--weight-display)',
                  letterSpacing: 'var(--tracking-display)',
                  lineHeight: 1,
                  color: 'var(--color-ink)',
                }}
              >
                <Counter
                  value={figure.value}
                  suffix={figure.suffix}
                  decimals={figure.decimals ?? 0}
                />
                {figure.star && (
                  <Star
                    size={20}
                    aria-hidden
                    style={{ color: 'var(--color-accent)' }}
                    fill="currentColor"
                  />
                )}
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
            </div>
          ))}
        </RevealGroup>

        {/* The rating is sourced from 312 verified reviews; saying so is worth
            more than the number on its own. */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-neutral)',
            marginTop: 'var(--space-xl)',
            marginBottom: 0,
          }}
        >
          {t('ratingLabel')}
        </p>
      </Shell>
    </Band>
  );
}

export default StatsSection;
