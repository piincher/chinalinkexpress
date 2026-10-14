'use client';

/**
 * RouteProgress — China to Bamako as one line, drawn by the Journey scroll.
 *
 * It owns no animation. The Journey's pinned ScrollTrigger writes its progress
 * to `--journey-p` on the section; the fill scales and the container slides from
 * that variable, so a scroll frame costs one custom-property write and two
 * composited transforms — no React render.
 *
 * Without the pin (mobile, reduced motion, no JS) the variable is unset, the
 * line is drawn in full and every stop is lit.
 */

import React from 'react';
import './moments.css';

interface RouteProgressProps {
  stops: string[];
  /** Index of the current stage while the pin is driving; null when static. */
  active: number | null;
}

export function RouteProgress({ stops, active }: RouteProgressProps) {
  return (
    <div className="mo-route" aria-hidden>
      <div className="mo-route-track">
        <div className="mo-route-fill" />
        <div className="mo-route-runner">
          <span className="mo-route-box" />
        </div>
      </div>
      <div className="mo-route-stops">
        {stops.map((label, i) => (
          <span key={label} className={active === null || i <= active ? 'mo-route-stop is-lit' : 'mo-route-stop'}>
            <span className="mo-route-label">{label}</span>
            <span className="mo-route-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
