'use client';

/**
 * Comparison — an actual table.
 *
 * What was here: fourteen cards. Each of the seven rows became two side-by-side
 * boxes, the left one tinted green with a tick and the right one grey with a
 * cross, and the label repeated in both. Then a green gradient pill underneath.
 * Comparing two things by drawing fourteen boxes is the long way round — the
 * reader has to re-find the row on every line, and the tinting does the arguing
 * instead of the content.
 *
 * A comparison table is one of the oldest pieces of information design there
 * is, and it works because the eye tracks a row. Two columns, seven rows,
 * hairline rules. The only colour is a tick in the accent and a muted cross;
 * the "us good / them bad" tinting is gone because the words already say it,
 * and shouting it in green makes it read like an advert rather than a fact.
 *
 * Below 720px a table cannot hold two readable columns, so each row restacks
 * into a labelled pair. Same content, same order, no horizontal scroll.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, Minus } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { SECTION_IDS } from '../constants';

const FEATURES = [
  'sourcing',
  'qualityControl',
  'payment',
  'multiCountry',
  'consolidation',
  'customs',
  'doorToDoor',
] as const;

export function ComparisonSection() {
  const t = useTranslations('comparison');

  return (
    <Band id={SECTION_IDS.COMPARISON} tone="paper-2">
      <Shell>
        <SectionHead
          label={t('sectionLabel')}
          title={t('title')}
          lede={t('subtitle')}
        />

        <RevealGroup stagger={0.05} selector="[data-cmp-row]">
          <div className="cmp" role="table" aria-label={t('title')}>
            {/* Column heads. Hidden on mobile, where each cell is labelled. */}
            <div className="cmp-head" role="row">
              <span role="columnheader" />
              <span role="columnheader" className="cmp-head-us">
                {t('chinaLinkColumn')}
              </span>
              <span role="columnheader" className="cmp-head-them">
                {t('othersColumn')}
              </span>
            </div>

            {FEATURES.map((key) => (
              <div className="cmp-row" role="row" key={key} data-cmp-row>
                <span className="cmp-label" role="rowheader">
                  {t(`features.${key}.label`)}
                </span>

                <span className="cmp-cell cmp-cell--us" role="cell">
                  <Check size={16} aria-hidden className="cmp-icon cmp-icon--yes" />
                  <span>
                    <span className="cmp-cell-key">{t('chinaLinkColumn')}</span>
                    {t(`features.${key}.us`)}
                  </span>
                </span>

                <span className="cmp-cell cmp-cell--them" role="cell">
                  <Minus size={16} aria-hidden className="cmp-icon cmp-icon--no" />
                  <span>
                    <span className="cmp-cell-key">{t('othersColumn')}</span>
                    {t(`features.${key}.them`)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </RevealGroup>
      </Shell>
    </Band>
  );
}

export default ComparisonSection;
