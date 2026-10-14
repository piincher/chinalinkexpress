'use client';

/**
 * CartonCube — the sea calculator's three dimensions as a box you can see.
 *
 * Most first-time importers do not know what a CBM is; watching a carton grow
 * as they type 1.2 × 0.8 × 0.9 shows it. The cube is a fixed 60px CSS box,
 * reshaped with scale3d relative to its longest side — a transform, so typing
 * never triggers layout. Dimensions are in metres, as the calculator's inputs.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import './moments.css';

const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

export function CartonCube({ length, width, height }: { length: string; width: string; height: string }) {
  const t = useTranslations('moments.carton');
  const l = num(length);
  const w = num(width);
  const h = num(height);
  const longest = Math.max(l, w, h);
  const s = (v: number) => (longest ? Math.max(0.12, v / longest) : 1);
  const cbm = l * w * h;
  const shown = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 3 }).format(cbm);

  const style = { '--sx': s(l), '--sy': s(h), '--sz': s(w) } as React.CSSProperties;

  return (
    <div className="mo-carton" role="img" aria-label={t('aria', { cbm: shown })}>
      <div className="mo-carton-view" aria-hidden>
        <div className="mo-cube" style={style}>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gap: '.3rem', minWidth: 0 }}>
        <span className="mo-figure">{longest ? `${shown} CBM` : '— CBM'}</span>
        <span className="mo-mono">{longest ? `${length || 0} × ${width || 0} × ${height || 0} m` : t('hint')}</span>
        <span className="mo-mono">{t('note')}</span>
      </div>
    </div>
  );
}
