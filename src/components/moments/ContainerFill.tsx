'use client';

/**
 * ContainerFill — groupage, shown: cartons from several clients fill one box.
 *
 * Illustrative, and captioned as such. A 40-foot container: 100 slots, 80
 * filled (80 %), 8 of them the reader's. The gauge reads the same ratio
 * against a 40-foot container's nominal 67 CBM. Cartons drop bottom row first,
 * the way a container is loaded.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MomentPanel } from './MomentPanel';
import { useMomentInView, momentClass } from './useMomentInView';

const COLS = 20;
const ROWS = 5;
const FILLED = 80;
const MINE = new Set([6, 7, 26, 27, 46, 47, 66, 67]);
const CAPACITY_CBM = 67;

/** Load order index for each grid slot: bottom row first, left to right. */
function loadIndex(slot: number): number {
  const row = Math.floor(slot / COLS);
  const col = slot % COLS;
  return (ROWS - 1 - row) * COLS + col;
}

export function ContainerFill() {
  const t = useTranslations('moments.container');
  const [ref, state] = useMomentInView<HTMLDivElement>();
  const pct = Math.round((FILLED / (COLS * ROWS)) * 100);
  const cbm = ((FILLED / (COLS * ROWS)) * CAPACITY_CBM).toFixed(1).replace('.', ',');

  return (
    <MomentPanel eyebrow={t('eyebrow')} title={t('title')} body={t('body')} stageLabel={t('stage')} caption={t('caption')}>
      <div ref={ref} className={`mo-pad ${momentClass('mo-cont', state)}`}>
        <div className="mo-cont-box" role="img" aria-label={t('aria', { pct })}>
          {Array.from({ length: COLS * ROWS }, (_, slot) => {
            const order = loadIndex(slot);
            const filled = order < FILLED;
            const cls = !filled ? 'mo-crate is-empty' : MINE.has(order) ? 'mo-crate is-mine' : 'mo-crate';
            return <span key={slot} className={cls} style={{ '--i': order } as React.CSSProperties} />;
          })}
        </div>
        <div className="mo-gauge">
          <span className="mo-figure">{pct} %</span>
          <span className="mo-mono">{t('filled')}</span>
          <span className="mo-mono">
            {cbm} / {CAPACITY_CBM} CBM
          </span>
        </div>
      </div>
      <div className="mo-pad mo-legend mo-mono" style={{ paddingTop: 0 }}>
        <span>
          <i className="mo-swatch" style={{ background: 'var(--color-accent-bright)' }} />
          {t('yours')}
        </span>
        <span>
          <i className="mo-swatch" style={{ background: 'var(--color-warning)' }} />
          {t('others')}
        </span>
      </div>
    </MomentPanel>
  );
}
