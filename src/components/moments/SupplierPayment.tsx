'use client';

/**
 * SupplierPayment — the two halves of "we pay your supplier in China".
 *
 * Left: a supplier quote in yuan turns over into "you pay in FCFA, in Bamako".
 * No exchange rate is shown; the quote is captioned as an example.
 * Right: the money's path, client → ChinaLink → supplier, each node turning
 * green as the coin reaches it, then the receipt line.
 *
 * Both are CSS keyframes started by one in-view class.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MomentPanel } from './MomentPanel';
import { useMomentInView, momentClass } from './useMomentInView';

export function SupplierPayment() {
  const t = useTranslations('moments.payment');
  const [ref, state] = useMomentInView<HTMLDivElement>();
  const at = (s: number) => ({ '--at': `${s}s` }) as React.CSSProperties;

  return (
    <MomentPanel eyebrow={t('eyebrow')} title={t('title')} body={t('body')} stageLabel={t('stage')} caption={t('caption')}>
      <div ref={ref} className="mo-pad">
        <div className={momentClass('mo-flip', state)}>
          <div className="mo-flip-in">
            <div className="mo-face">
              <span className="mo-mono">{t('quote')}</span>
              <span className="mo-figure">¥ 4 800</span>
            </div>
            <div className="mo-face mo-face--back">
              <span className="mo-mono">{t('youPay')}</span>
              <span className="mo-figure">FCFA</span>
              <span className="mo-mono">{t('wePay')}</span>
            </div>
          </div>
        </div>

        <div className={momentClass('mo-pay', state)} style={{ display: 'grid', gap: '1rem' }}>
          <div className="mo-flow">
            <div className="mo-node">
              <b>{t('you')}</b>Bamako
            </div>
            <div className="mo-wire">
              <span className="mo-coin" style={at(0.2)} />
            </div>
            <div className="mo-node" style={at(1.4)}>
              <b>ChinaLink</b>Guangzhou
            </div>
            <div className="mo-wire">
              <span className="mo-coin" style={at(1.5)} />
            </div>
            <div className="mo-node" style={at(2.7)}>
              <b>{t('supplier')}</b>
              {t('china')}
            </div>
          </div>
          <p className="mo-pay-done" style={{ margin: 0 }}>
            ✓ {t('done')}
          </p>
        </div>
      </div>
    </MomentPanel>
  );
}
