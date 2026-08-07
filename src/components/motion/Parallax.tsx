'use client';

/**
 * Parallax — scroll-scrubbed depth for the photographic bands.
 *
 * The child moves slower than the page, so the photograph reads as sitting
 * behind the window rather than taped to it.
 *
 * Two rules keep it from looking cheap:
 *   · `strength` is a fraction of the container height, not a pixel value, so
 *     the effect is identical on a 390px phone and a 1440px desktop;
 *   · the child is scaled up by that same fraction, because translating an
 *     exactly-fitting image drags its edge into frame. This is the single most
 *     common parallax bug and the reason so many of them show a white sliver.
 *
 * `scrub: true` ties position to scroll offset rather than to time, so dragging
 * the scrollbar backwards runs it backwards. Time-based parallax is what makes
 * a page feel like it is fighting the user.
 */

import React, { useEffect, useRef } from 'react';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Travel as a fraction of container height. 0.12 = 12%. Above ~0.2 it reads as a glitch. */
  strength?: number;
}

export function Parallax({
  children,
  className,
  style,
  strength = 0.14,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner || prefersReducedMotion()) return;

    return withGsap(container, ({ gsap }) => {
      gsap.fromTo(
        inner,
        { yPercent: -strength * 50 },
        {
          yPercent: strength * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: 'hidden', ...style }}
    >
      <div
        ref={innerRef}
        style={{
          height: '100%',
          width: '100%',
          // Compensate for the travel so no edge is ever exposed.
          scale: String(1 + strength),
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Parallax;
