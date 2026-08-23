/* Hallmark · component: webgl backdrop · genre: editorial · theme: project tokens (custom, cool accent)
 * decorative layer — non-interactive, pointer-events: none, aria-hidden
 * reduced-motion: never rendered · no-WebGL: never rendered · off-screen: never mounted
 */

'use client';

/**
 * LiveFeedBackdrop — the loading boundary around the WebGL scene behind the
 * live-feed board.
 *
 * Three.js is ~600 KB of JavaScript; none of it may sit in front of the
 * landing page's content, so the scene is dynamically imported, client-only,
 * and mounted the first time the board is actually on screen and running.
 * After that first mount only the frameloop toggles — the chunk is never
 * re-fetched.
 *
 * Defined degradation:
 *   · reduced motion / no WebGL → renders nothing (the board stands alone)
 *   · off-screen or hidden tab  → frameloop stops, zero GPU cost
 *   · scene fails               → loading fallback is null; no hole, the
 *                                 backdrop is decoration, not content
 */

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(() => import('./LiveFeedSceneCanvas'), {
  ssr: false,
  loading: () => null,
});

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

interface LiveFeedBackdropProps {
  /** True only while the board is on screen, the tab is visible, and the
   *  visitor has not asked for reduced motion. */
  active: boolean;
}

export function LiveFeedBackdrop({ active }: LiveFeedBackdropProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!active || mounted || !hasWebGL()) return;
    setMounted(true);
  }, [active, mounted]);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        // Fade the edges so the arcs never hard-clip against the board's box.
        maskImage: 'radial-gradient(120% 110% at 50% 50%, black 55%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(120% 110% at 50% 50%, black 55%, transparent 100%)',
      }}
    >
      {mounted && <SceneCanvas active={active} />}
    </div>
  );
}

export default LiveFeedBackdrop;
