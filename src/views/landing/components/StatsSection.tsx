'use client';

/**
 * Stats — a measured strip, and now a true one.
 *
 * The layout is unchanged and was never the problem: four figures separated by
 * hairline rules, set large in the display face rather than in mono, so they
 * read as a statement rather than as a dashboard.
 *
 * The numbers were the problem. This band rendered `1,247` satisfied clients,
 * `12,847` shipments, `7+` years and a `4.8` rating, under the line "Basé sur
 * 312 avis clients vérifiés". None of those four came from anywhere. The
 * production database holds 890 shipments, 253 clients who have actually
 * shipped, and **two** reviews. The site's own LocalBusiness markup meanwhile
 * declared the same 4.8 from 127 reviews — two different invented denominators
 * for one invented average, on one page.
 *
 * Every figure now comes from `constants/companyFacts.ts`, where each carries
 * the query that produced it and the date it was last recomputed. The rating is
 * gone entirely and the line underneath says why: a company that explains where
 * its numbers come from is making a claim its competitors cannot copy, which is
 * worth more than a fifth digit nobody believes.
 *
 * The fourth column is the two Chinese warehouses rather than a years count.
 * "7+ ans d'expérience" is the single most replaceable line in freight
 * marketing; "2 entrepôts en Chine" is a fact about this company specifically,
 * and it sets up the sections below it.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';
import { Counter, Reveal, RevealGroup } from '@/components/motion';
import {
  SHIPMENTS_HANDLED,
  CLIENTS_SERVED,
  CLIENTS_ACTIVE_12M,
  WAREHOUSES,
  REVIEWS_COLLECTED,
  VERIFIED_ON,
} from '@/constants/companyFacts';
import { SECTION_IDS } from '../constants';

/** dd/mm/yyyy — the form a Bamako reader expects. */
function formatVerifiedOn(iso: string, locale: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function StatsSection() {
  const t = useTranslations('stats');
  const locale = useLocale();

  const figures = [
    { value: SHIPMENTS_HANDLED, label: t('shipments') },
    { value: CLIENTS_SERVED, label: t('clientsServed') },
    { value: CLIENTS_ACTIVE_12M, label: t('clientsActive') },
    { value: WAREHOUSES.length, label: t('warehouses') },
  ];

  return (
    <Band
      id={SECTION_IDS.STATS}
      tone="paper-2"
      ruled
      style={{ paddingBlock: 'clamp(2.75rem, 5vw, 4.5rem)' }}
    >
      <Shell>
        {/*
          This band had no heading at all — four numbers floating between two
          headed sections. That left a gap in the document outline, gave the
          figures no subject, and wasted the one line on the page that says
          plainly these are real: "Ce que nous avons réellement expédié".
          Compact rather than the full SectionHead, because the strip is short
          and a full heading block would outweigh what it introduces.
        */}
        <Reveal style={{ marginBottom: 'var(--space-xl)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: '0 0 var(--space-sm)',
            }}
          >
            {t('sectionLabel')}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--weight-heading)',
              letterSpacing: 'var(--tracking-heading)',
              color: 'var(--color-ink)',
              margin: 0,
              maxWidth: '22ch',
            }}
          >
            {t('title')}
          </h2>
        </Reveal>

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
                {/*
                  No "+" suffix on any of these. A plus sign is how a rounded
                  number hides that it was rounded; 890 is 890.
                */}
                <Counter value={figure.value} decimals={0} />
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

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-body)',
            color: 'var(--color-neutral)',
            marginTop: 'var(--space-xl)',
            marginBottom: 0,
            maxWidth: 'var(--measure)',
          }}
        >
          {t('provenance', {
            date: formatVerifiedOn(VERIFIED_ON, locale),
            reviews: REVIEWS_COLLECTED,
          })}
        </p>
      </Shell>
    </Band>
  );
}

export default StatsSection;
