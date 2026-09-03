'use client';

/**
 * "À préparer" on the home page — the same band the app shows its clients.
 *
 * This is the one section on the site that tells a visitor something they
 * cannot get from a competitor's brochure: not "we ship fast", but "for
 * Ramadan you have until 12 November by sea". It is a marketing argument made
 * entirely of operational fact, which is why it is worth carrying from the app
 * to the site rather than writing marketing copy about seasons.
 *
 * Renders nothing out of season. An empty "what to prepare for" heading is
 * worse than no heading, and the API returning an empty list is the normal
 * answer for part of the year, not a failure.
 */

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { OccasionCard } from './components/OccasionCard';
import { useOccasionLabels } from './useOccasionLabels';
import type { CustomerOccasion } from '@/lib/publicOccasionsApi';
import type { BandTone } from '@/components/site';

const GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};

interface OccasionsBandProps {
  occasions: CustomerOccasion[];
  /** How many to show here; the rest live on /calendrier. */
  max?: number;
  tone?: BandTone;
}

export function OccasionsBand({ occasions, max = 3, tone = 'paper-2' }: OccasionsBandProps) {
  const t = useTranslations('occasions');
  const locale = useLocale();
  const labels = useOccasionLabels();

  if (occasions.length === 0) return null;

  return (
    <Band tone={tone}>
      <Shell>
        <SectionHead label={t('sectionLabel')} title={t('title')} lede={t('lede')} />

        <RevealGroup stagger={0.08} style={GRID}>
          {occasions.slice(0, max).map((occasion) => (
            <OccasionCard key={occasion.id} occasion={occasion} labels={labels} />
          ))}
        </RevealGroup>

        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <Link
            href={`/${locale}/calendrier`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '0.15rem',
            }}
          >
            {t('seeAll')}
          </Link>
        </div>
      </Shell>
    </Band>
  );
}

export default OccasionsBand;
