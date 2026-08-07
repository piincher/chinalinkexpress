'use client';

/**
 * Lane ticker — the routes, scrolling.
 *
 * Pairs the globe with the thing the globe cannot state precisely: the actual
 * city-to-city lanes, in words. The list is derived from LANE_LABELS, which is
 * derived from the same LANES array the globe draws, so the ticker and the map
 * can never disagree about which routes the company runs.
 *
 * A marquee is a cliché when it scrolls adjectives ("Fast · Reliable · Trusted")
 * and useful when it scrolls facts. These are facts.
 *
 * It pauses on hover, stops entirely under reduced motion (where it becomes a
 * plain wrapped list — the routes are information, so they stay readable), and
 * is duplicated once so the loop is seamless. The duplicate is aria-hidden so
 * screen readers hear each lane once.
 */

import React from 'react';
import { LANE_LABELS } from '@/features/route-globe';

export function LaneTicker() {
  return (
    <div className="lane-ticker" aria-label="Lignes desservies">
      <div className="lane-ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="lane-ticker-list" aria-hidden={copy === 1 || undefined}>
            {LANE_LABELS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default LaneTicker;
