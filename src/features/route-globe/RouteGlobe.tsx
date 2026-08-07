'use client';

/**
 * RouteGlobe — the loading boundary around the WebGL scene.
 *
 * Three.js and react-three-fiber are ~600 KB of JavaScript. Shipping that in
 * the initial bundle for the LCP screen would undo every performance point this
 * redesign has made, so the scene is dynamically imported, client-only, and
 * only mounted once the hero is actually in view.
 *
 * Everything degrades in a defined way:
 *   · no WebGL          → the static SVG fallback, which still shows the lanes
 *   · reduced motion    → the scene renders one frame and stops
 *   · not yet in view   → nothing loads at all
 *   · scene fails       → the fallback stays, no blank rectangle
 *
 * That last one matters here specifically: this codebase has a documented
 * history of lazily-loaded canvases failing behind a bare Suspense and blanking
 * whole sections. The fallback is rendered underneath rather than swapped out,
 * so a failed import leaves the map visible instead of a hole.
 */

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { LANES, getPlace } from './lanes';

const Scene = dynamic(() => import('./RouteGlobeScene'), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Static fallback: a flat projection of the same lanes.
 * Not a spinner — if the globe never arrives, this is a legitimate map.
 */
function LaneFallback() {
  const project = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{ width: '100%', height: '100%', opacity: 0.5 }}
    >
      {LANES.map((l, i) => {
        const a = getPlace(l.from);
        const b = getPlace(l.to);
        if (!a || !b) return null;
        const p1 = project(a.lat, a.lng);
        const p2 = project(b.lat, b.lng);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - Math.abs(p2.x - p1.x) * 0.22;
        return (
          <path
            key={i}
            d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
            fill="none"
            stroke="var(--color-accent-bright)"
            strokeWidth={0.25}
            opacity={l.primary ? 0.7 : 0.35}
          />
        );
      })}
      {[...new Set(LANES.flatMap((l) => [l.from, l.to]))].map((id) => {
        const p = getPlace(id);
        if (!p) return null;
        const { x, y } = project(p.lat, p.lng);
        return <circle key={id} cx={x} cy={y} r={0.55} fill="var(--color-accent-bright)" />;
      })}
    </svg>
  );
}

export function RouteGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Start loading slightly before it scrolls in, so it is ready on arrival.
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* Always present, always underneath. If the scene loads it simply covers
          this; if it fails there is still a map. */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <LaneFallback />
      </div>

      {visible && webgl && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Scene reduced={reduced} />
        </div>
      )}
    </div>
  );
}

export default RouteGlobe;
