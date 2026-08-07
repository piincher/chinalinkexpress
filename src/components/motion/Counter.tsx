'use client';

/**
 * Counter — a figure that counts up once, when it is first seen.
 *
 * The final value is what renders on the server and what sits in the DOM before
 * any script runs; the animation only replaces the text content afterwards. So
 * crawlers, no-JS visitors and reduced-motion users all see the real number,
 * and nobody ever sees a permanent "0" if GSAP fails to load.
 *
 * Digits are set in the mono face with tabular figures so the width does not
 * twitch as it counts — proportional digits make a counter jiggle, which is the
 * detail that separates this from a jQuery plugin.
 */

import React, { useEffect, useRef } from 'react';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface CounterProps {
  value: number;
  /** Rendered before the number, e.g. "+". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "+". */
  suffix?: string;
  decimals?: number;
  /** BCP-47 tag for digit grouping. FR uses a narrow space as the separator. */
  locale?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  locale = 'fr-FR',
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = React.useCallback(
    (n: number) =>
      n.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, decimals]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return withGsap(el, ({ gsap }) => {
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = format(state.n);
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });
  }, [value, format]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  );
}

export default Counter;
