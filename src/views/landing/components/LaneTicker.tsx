'use client';

/**
 * The lanes and the two searches clients make, scrolling. Every language shows the
 * same list, translated. Pauses on hover, becomes a plain list under reduced motion,
 * and the loop's duplicate is aria-hidden so screen readers hear each item once.
 */

import React from 'react';
import { useTranslations } from 'next-intl';

export function LaneTicker() {
  const t = useTranslations('landing');
  const items = t.raw('lanes') as string[];
  const lanes = [...items, ...items];

  return (
    <div className="lane-ticker" aria-label={t('lanesLabel')}>
      <div className="lane-ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="lane-ticker-list" aria-hidden={copy === 1 || undefined}>
            {lanes.map((label, i) => (
              <li key={`${label}-${i}`}>{label}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default LaneTicker;
