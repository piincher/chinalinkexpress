'use client';

/**
 * Reveal / RevealGroup — the page's single entrance gesture.
 *
 * One gesture, used everywhere: a short rise plus a fade, on a decelerating
 * curve, played once. Sites feel generated when every section arrives
 * differently — blur here, scale there, a flip somewhere else. Sites feel made
 * when the same physical rule applies throughout and only its timing varies.
 *
 * `RevealGroup` staggers its direct children so a row of cards deals out like
 * cards rather than snapping in as a block.
 *
 * Elements start visible in the DOM and are hidden by GSAP on the client. That
 * ordering matters: opacity:0 in CSS would leave the content invisible for
 * anyone who gets the HTML but not the JS, including crawlers that do not run
 * scripts — and this is an SEO-critical marketing site.
 */

import React, { useEffect, useRef } from 'react';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Distance in px the element rises from. Keep small — 40 reads as a jump. */
  distance?: number;
  delay?: number;
  as?: React.ElementType;
}

export function Reveal({
  children,
  className,
  style,
  distance = 18,
  delay = 0,
  as: TagProp = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // A polymorphic `as` widens the JSX props union to `never`; narrowing to one
  // concrete element keeps props and ref typed, runtime tag unchanged.
  const Tag = TagProp as unknown as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return withGsap(el, ({ gsap }) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, [distance, delay]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  distance?: number;
  /** CSS selector for the items to stagger. Defaults to direct children. */
  selector?: string;
  as?: React.ElementType;
}

export function RevealGroup({
  children,
  className,
  style,
  stagger = 0.08,
  distance = 20,
  selector,
  as: TagProp = 'div',
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  // A polymorphic `as` widens the JSX props union to `never`; narrowing to one
  // concrete element keeps props and ref typed, runtime tag unchanged.
  const Tag = TagProp as unknown as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return withGsap(el, ({ gsap }) => {
      const items = selector
        ? Array.from(el.querySelectorAll(selector))
        : Array.from(el.children);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });
  }, [stagger, distance, selector]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export default Reveal;
