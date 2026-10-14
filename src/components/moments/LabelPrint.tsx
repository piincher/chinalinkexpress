'use client';

/**
 * LabelPrint — a shipping mark feeding out of a thermal printer.
 *
 * Explains what the mark is for: the client's name and code on every carton,
 * so nothing is lost when shipments are grouped. The client is fictitious and
 * the label says "exemple". The label never carries the company name.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MomentPanel } from './MomentPanel';
import { useMomentInView, momentClass } from './useMomentInView';

export function LabelPrint() {
  const t = useTranslations('moments.label');
  const [ref, state] = useMomentInView<HTMLDivElement>();

  return (
    <MomentPanel eyebrow={t('eyebrow')} title={t('title')} body={t('body')} stageLabel={t('stage')} caption={t('caption')} flip>
      <div ref={ref} className={`mo-pad ${momentClass('mo-print', state)}`}>
        <div className="mo-printer">
          <div className="mo-printer-head" aria-hidden />
          <div className="mo-printer-slot">
            <div className="mo-label">
              <div className="mo-label-row">
                <span>BAMAKO</span>
                <span>{t('mode')}</span>
              </div>
              <b>A. TRAORÉ</b>
              <div className="mo-label-row">
                <span>{t('carton', { n: 3, of: 8 })}</span>
                <span>0,42 CBM</span>
              </div>
              <div className="mo-label-bars" aria-hidden />
              <div className="mo-label-row">
                <span>CLX-2610-4821</span>
                <span>{t('caption')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MomentPanel>
  );
}
