'use client';

/**
 * WeighScale — the air calculator's weight on a dial.
 *
 * Air is billed by the kilo; the needle swings (with a scale's small overshoot)
 * to whatever the reader typed. The dial's range steps up so any weight sits on
 * the face: 50, 100, 200, 500, 1000 kg. Only a CSS rotate and a dash offset
 * change; both transition on the compositor.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import './moments.css';

const RANGES = [50, 100, 200, 500, 1000];

export function WeighScale({ kg }: { kg: number }) {
  const t = useTranslations('moments.scale');
  const safe = Number.isFinite(kg) && kg > 0 ? kg : 0;
  const max = RANGES.find((r) => safe <= r) ?? RANGES[RANGES.length - 1];
  const ratio = Math.min(1, safe / max);
  const shown = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(safe);

  return (
    <div className="mo-scale" role="img" aria-label={t('aria', { kg: shown })}>
      <svg viewBox="0 0 200 118" aria-hidden>
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--color-void-rule)" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--color-accent-bright)"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          style={{ strokeDashoffset: 100 - ratio * 100, transition: 'stroke-dashoffset 1.2s var(--ease-out)' }}
        />
        <text x="14" y="116" fill="var(--color-void-ink-2)" fontSize="10" fontFamily="var(--font-mono)">0</text>
        <text x="100" y="12" textAnchor="middle" fill="var(--color-void-ink-2)" fontSize="10" fontFamily="var(--font-mono)">{max / 2}</text>
        <text x="186" y="116" textAnchor="end" fill="var(--color-void-ink-2)" fontSize="10" fontFamily="var(--font-mono)">{max} kg</text>
        <line
          className="mo-needle"
          x1="100" y1="100" x2="100" y2="34"
          stroke="var(--color-void-ink)" strokeWidth="3" strokeLinecap="round"
          style={{ transform: `rotate(${-90 + ratio * 180}deg)` }}
        />
        <circle cx="100" cy="100" r="6" fill="var(--color-void-ink)" />
      </svg>
      <span className="mo-figure">{shown} kg</span>
      <span className="mo-mono">{t('note')}</span>
    </div>
  );
}
