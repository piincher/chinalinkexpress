'use client';

/**
 * LineReveal — masked line-by-line headline reveal.
 *
 * The headline is split into lines, each line is given `overflow: hidden`, and
 * the text inside slides up from below its own baseline. The effect is that the
 * words appear to be uncovered rather than to fly in — the difference between a
 * title sequence and a PowerPoint transition.
 *
 * Three details do most of the work:
 *   · the split runs after `document.fonts.ready`, because splitting before the
 *     display face loads measures Geist's line breaks and then re-renders with
 *     Archivo's, leaving lines clipped mid-word;
 *   · lines are re-split on resize (debounced), since a 1440px break is not a
 *     390px break;
 *   · under reduced motion nothing is split at all — the DOM stays the original
 *     single text node, which also keeps it clean for screen readers.
 */

import React, { useEffect, useRef } from 'react';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

type AsTag = 'h1' | 'h2' | 'h3' | 'p' | 'div';

interface LineRevealProps {
  children: React.ReactNode;
  as?: AsTag;
  className?: string;
  style?: React.CSSProperties;
  /** Seconds between consecutive lines. */
  stagger?: number;
  /** Seconds to wait after the trigger before the first line moves. */
  delay?: number;
  /** Play as soon as it mounts (hero) rather than on scroll into view. */
  immediate?: boolean;
}

export function LineReveal({
  children,
  as = 'div',
  className,
  style,
  stagger = 0.075,
  delay = 0,
  immediate = false,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // A polymorphic `as` widens the JSX props union to `never`. Narrowing the tag
  // to a single concrete element keeps the props and ref typed while the runtime
  // still renders whichever tag was passed.
  const Tag = as as unknown as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let disposeGsap: (() => void) | null = null;
    let splitInstance: { revert: () => void } | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const build = async () => {
      const { default: SplitType } = await import('split-type');
      if (cancelled || !ref.current) return;

      splitInstance?.revert();
      disposeGsap?.();

      const split = new SplitType(el as HTMLElement, {
        types: 'lines',
        tagName: 'span',
      });
      splitInstance = split;

      // SplitType gives one element per line; the mask needs a second element
      // inside it to translate independently of the clipping box.
      const inners: HTMLElement[] = [];
      (split.lines ?? []).forEach((line) => {
        line.style.display = 'block';
        line.style.overflow = 'hidden';
        // Descenders (g, j, p) sit below the baseline and get sliced by the
        // clip box unless the line is given room to spill downward.
        line.style.paddingBottom = '0.12em';
        line.style.marginBottom = '-0.12em';

        const inner = document.createElement('span');
        inner.style.display = 'block';
        inner.style.willChange = 'transform';
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
        inners.push(inner);
      });

      if (!inners.length) return;

      disposeGsap = withGsap(el, ({ gsap }) => {
        gsap.set(inners, { yPercent: 115 });
        gsap.to(inners, {
          yPercent: 0,
          duration: 1.05,
          delay,
          stagger,
          ease: 'expo.out',
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  once: true,
                },
              }),
        });
      });
    };

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    };

    // Fonts must be settled before measuring line breaks.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(build);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      disposeGsap?.();
      splitInstance?.revert();
    };
  }, [stagger, delay, immediate]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export default LineReveal;
