'use client';

/**
 * ScrollProgress — a 2px accent hairline along the navbar's bottom edge.
 *
 * Where the browser supports scroll-driven animations the CSS does all the work
 * (`animation-timeline: scroll(root)`) and this component's effect returns
 * early. Elsewhere one passive scroll listener writes `--scroll-p`, coalesced to
 * one write per frame. Either way the bar only ever changes a transform.
 */

import React, { useEffect, useRef } from 'react';
import './moments.css';

export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || CSS.supports('animation-timeline: scroll()')) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty('--scroll-p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} className="mo-scroll-progress" aria-hidden />;
}
