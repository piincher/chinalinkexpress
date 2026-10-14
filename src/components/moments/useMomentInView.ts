'use client';

/**
 * useMomentInView — when a moment should arm, play and pause.
 *
 * Three states, all driven by IntersectionObserver (no scroll listeners):
 *
 *   armed    the element is about to scroll in, so its from-state is applied
 *            off screen and the reader never sees content vanish and reappear.
 *   played   it is far enough in to start its one-shot sequence. Never resets.
 *   visible  live; ambient loops (a pulse, a ripple) run only while true.
 *
 * Until the hook runs — no JS, a crawler, reduced motion — none of the classes
 * are set and every moment renders in its finished state. That resting frame is
 * the design, not a fallback.
 */

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/animation/gsapContext';

export interface MomentState {
  armed: boolean;
  played: boolean;
  visible: boolean;
}

export function useMomentInView<T extends Element>(playThreshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<MomentState>({ armed: false, played: false, visible: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    // Arm a quarter-screen early so the from-state is applied before it shows.
    const arm = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState((s) => (s.armed ? s : { ...s, armed: true }));
          arm.disconnect();
        }
      },
      { rootMargin: '0px 0px 25% 0px' }
    );

    const play = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setState((s) => ({
          armed: true,
          played: s.played || entry.intersectionRatio >= playThreshold,
          visible,
        }));
      },
      { threshold: [0, playThreshold] }
    );

    arm.observe(el);
    play.observe(el);
    return () => {
      arm.disconnect();
      play.disconnect();
    };
  }, [playThreshold]);

  return [ref, state] as const;
}

/** The class string a moment's root carries for its state. */
export function momentClass(base: string, s: MomentState): string {
  return [base, s.armed && 'is-armed', s.played && 'is-played', s.visible && 'is-visible']
    .filter(Boolean)
    .join(' ');
}
