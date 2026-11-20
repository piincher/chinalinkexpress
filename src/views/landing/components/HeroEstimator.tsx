'use client';

/**
 * Instant price on the first screen, from the published rates. No competitor
 * shows one, and it answers the first question an importer has. The result links
 * to WhatsApp with the estimate already written, so the visitor does not retype it.
 */

import React, { useEffect, useId, useRef, useState } from 'react';
import { trackOnce } from '@/lib/analytics';
import { MessageCircle, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Cta } from '@/components/site/Cta';
import { WHATSAPP_SALES, whatsappUrl } from '@/constants/contact';
import {
  ESTIMATE_MODES,
  estimatePrice,
  getEstimateRate,
  type EstimateMode,
} from '@/features/pricing/lib/estimate';
import { usePricing } from '@/features/pricing/lib/usePricing';
import { minCbmCoversKg } from '@/features/pricing/lib/livePricing';

const START: Record<EstimateMode, number> = { standard: 10, electronics: 5, phones: 5, sea: 1 };

const formatFcfa = (value: number) => value.toLocaleString('fr-FR').replace(/\s/g, '\u00A0');

export function HeroEstimator() {
  const t = useTranslations('estimator');
  const inputId = useId();
  const pricing = usePricing();
  const [mode, setMode] = useState<EstimateMode>('standard');
  const [raw, setRaw] = useState(String(START.standard));

  const { rate, unit, days } = getEstimateRate(mode, pricing);
  const quantity = Number(raw.replace(',', '.'));
  const price = estimatePrice(mode, quantity, pricing);

  // Counted once the visitor changes something: the default 10 kg shows a price on load.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (price > 0) trackOnce('calc-hero', 'calculator_used', { tool: 'hero', mode });
  }, [mode, raw]); // eslint-disable-line react-hooks/exhaustive-deps
  const step = unit === 'cbm' ? 0.1 : 1;

  const nudge = (direction: 1 | -1) => {
    const base = Number.isFinite(quantity) ? quantity : 0;
    setRaw(String(Math.max(0, +(base + direction * step).toFixed(1))));
  };

  const message = t('whatsapp', {
    mode: t(`modes.${mode}`),
    quantity: raw,
    unit: t(`units.${unit}`),
    price: formatFcfa(price),
  });

  return (
    <form className="est" onSubmit={(e) => e.preventDefault()} aria-label={t('title')}>
      <div className="est-head">
        <span className="est-label">{t('title')}</span>
        <span className="est-live">
          <i aria-hidden />
          {t('publicRates')}
        </span>
      </div>

      <div className="est-modes" role="radiogroup" aria-label={t('modeLabel')}>
        {ESTIMATE_MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={m === mode}
            onClick={() => {
              setMode(m);
              setRaw(String(START[m]));
            }}
          >
            {t(`modes.${m}`)}
          </button>
        ))}
      </div>

      <label className="est-qty" htmlFor={inputId}>
        {t(`quantity.${unit}`)}
      </label>
      <div className="est-box">
        <button type="button" onClick={() => nudge(-1)} aria-label={t('decrease')}>
          <Minus size={16} aria-hidden />
        </button>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
        />
        <button type="button" onClick={() => nudge(1)} aria-label={t('increase')}>
          <Plus size={16} aria-hidden />
        </button>
      </div>

      <div className="est-price" aria-live="polite">
        <output htmlFor={inputId}>{formatFcfa(price)}</output>
        <span>F CFA</span>
      </div>

      <dl className="est-meta">
        <div>
          <dt>{t('announcedDelay')}</dt>
          <dd>{t('days', { days })}</dd>
        </div>
        <div>
          <dt>{t('rate')}</dt>
          <dd>
            {formatFcfa(rate)} F CFA / {t(`units.${unit}`)}
          </dd>
        </div>
      </dl>

      <Cta
        href={whatsappUrl(WHATSAPP_SALES, message)}
        external
        arrow={false}
        icon={<MessageCircle size={17} aria-hidden />}
        data-cta="hero-estimate"
        style={{ width: '100%', whiteSpace: 'normal' }}
      >
        {t('cta')}
      </Cta>

      <small>{t(`notes.${mode}`, { kg: pricing.sea.kgPerCbm, min: pricing.sea.minCbm, minKg: minCbmCoversKg(pricing.sea) })} {t('scope')}</small>
    </form>
  );
}

export default HeroEstimator;
