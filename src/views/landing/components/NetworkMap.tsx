/**
 * The route, drawn on a real map. Land dots are a lazy image so they cost nothing
 * above the fold; the arcs are inline so their colours follow the tokens. Paths are
 * illustrative and say so. SMIL dots stop with the rest of motion via CSS below.
 */

import React from 'react';
import { useTranslations } from 'next-intl';

const AIR = 'M1373 329Q770 -40 160 434';
const SEA = 'M1371 332Q800 780 160 434';

export function NetworkMap() {
  const t = useTranslations('network');
  return (
    <figure className="net-map">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/network-dots.svg" alt={t('alt')} width={1600} height={700} loading="lazy" decoding="async" />
      <svg viewBox="0 0 1600 700" aria-hidden>
        <path d={AIR} fill="none" stroke="var(--color-signal)" strokeWidth={3} />
        <path d={SEA} fill="none" stroke="var(--color-accent-bright)" strokeWidth={3} />
        <circle r={9} fill="var(--color-signal)">
          <animateMotion dur="7s" repeatCount="indefinite" path={AIR} />
        </circle>
        <circle r={9} fill="var(--color-accent-bright)">
          <animateMotion dur="16s" repeatCount="indefinite" path={SEA} />
        </circle>
        <circle cx={1372} cy={330} r={12} fill="#fff" />
        <circle cx={160} cy={434} r={12} fill="#fff" />
        <text x={1345} y={300} textAnchor="end">Guangzhou · Foshan</text>
        <text x={190} y={478}>Bamako</text>
        <text x={770} y={110} textAnchor="middle">{t('air')}</text>
        <text x={770} y={600} textAnchor="middle">{t('sea')}</text>
      </svg>
      <figcaption>{t('note')}</figcaption>
    </figure>
  );
}

export default NetworkMap;
