'use client';

/**
 * Magnetic — the primary CTA leans toward the cursor.
 *
 * Deliberately small: the button travels at most `pull` px, and the label
 * travels a little further than the button so the two separate very slightly
 * under the cursor. That parallax between shell and label is what sells it as a
 * physical object; without it the whole thing just slides.
 *
 * `gsap.quickTo` is used rather than a tween per pointermove — it reuses one
 * tween and writes straight to the transform, which is the difference between
 * a smooth follow and a stutter on a mid-range Android.
 *
 * Bound to a pointer-fine media query: on touch there is no cursor to lean
 * toward, and the handlers would only add latency to the tap.
 */

import React, { useEffect, useRef } from 'react';
import { loadGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Maximum displacement of the shell, in px. */
  pull?: number;
}

export function Magnetic({ children, className, style, pull = 7 }: MagneticProps) {
  const shellRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const label = labelRef.current;
    if (!shell || !label || prefersReducedMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let dispose = () => {};
    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      const opts = { duration: 0.5, ease: 'power3.out' };
      const shellX = gsap.quickTo(shell, 'x', opts);
      const shellY = gsap.quickTo(shell, 'y', opts);
      const labelX = gsap.quickTo(label, 'x', opts);
      const labelY = gsap.quickTo(label, 'y', opts);

      const onMove = (event: PointerEvent) => {
        const rect = shell.getBoundingClientRect();
        // -1..1 from the centre of the button.
        const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        shellX(dx * pull);
        shellY(dy * pull);
        labelX(dx * pull * 0.45);
        labelY(dy * pull * 0.45);
      };

      const onLeave = () => {
        shellX(0);
        shellY(0);
        labelX(0);
        labelY(0);
      };

      shell.addEventListener('pointermove', onMove);
      shell.addEventListener('pointerleave', onLeave);
      dispose = () => {
        shell.removeEventListener('pointermove', onMove);
        shell.removeEventListener('pointerleave', onLeave);
        gsap.set([shell, label], { clearProps: 'transform' });
      };
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, [pull]);

  /*
   * Both spans take `gap: inherit`, and the outer one is the fix.
   *
   * The inner span already asked to inherit the gap, but `gap` is not an
   * inherited property, so `inherit` copies the *parent element's computed
   * value* — and the parent was this outer shell, which set no gap at all. The
   * chain broke on the first link and resolved to 0.
   *
   * The visible consequence: any `<Cta magnetic>` lost the space between its
   * icon and its label, so the primary button in the hero — the single most
   * important control on the site — rendered as "⬤Expédier avec ChinaLink".
   * Non-magnetic CTAs were fine, which is what kept it from being noticed.
   *
   * With `gap: inherit` on the shell too, the outer span copies `.cta`'s
   * resolved gap and the inner one copies the outer's. No token is hardcoded
   * here, so this stays a generic motion primitive.
   */
  return (
    <span
      ref={shellRef}
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit', ...style }}
    >
      <span ref={labelRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
        {children}
      </span>
    </span>
  );
}

export default Magnetic;
