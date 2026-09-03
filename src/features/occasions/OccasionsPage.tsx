'use client';

/**
 * /calendrier — every date worth preparing for, with its shipping cutoffs.
 *
 * Unlike the profile pages, this one is meant to be found: "quand expédier de
 * Chine pour la rentrée" is a question people type, and the honest answer —
 * built from our own transit times rather than an industry average — is the
 * kind of page worth ranking for. It is indexed.
 *
 * No `Event` structured data. Schema.org's Event describes something people
 * attend; these are commercial dates with our shipping deadlines attached, and
 * marking them up as events would be the same class of overclaim this site has
 * already paid for once with a fabricated `aggregateRating`.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, PageHero } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { OccasionCard } from './components/OccasionCard';
import { useOccasionLabels } from './useOccasionLabels';
import type { CustomerOccasion } from '@/lib/publicOccasionsApi';

const GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};

interface OccasionsPageProps {
  occasions: CustomerOccasion[];
}

export function OccasionsPage({ occasions }: OccasionsPageProps) {
  const t = useTranslations('occasions');
  const labels = useOccasionLabels();

  return (
    <>
      <PageHero eyebrow={t('pageEyebrow')} title={t('pageTitle')} lede={t('pageLede')} />

      <Band tone="paper">
        <Shell>
          {occasions.length === 0 ? (
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--color-ink-2)',
              }}
            >
              {t('pageEmpty')}
            </p>
          ) : (
            <RevealGroup stagger={0.08} style={GRID}>
              {occasions.map((occasion) => (
                <OccasionCard key={occasion.id} occasion={occasion} labels={labels} />
              ))}
            </RevealGroup>
          )}
        </Shell>
      </Band>

      <Band tone="paper-2">
        <Shell>
          <SectionHead title={t('howTitle')} lede={t('howLede')} />
        </Shell>
      </Band>
    </>
  );
}

export default OccasionsPage;
