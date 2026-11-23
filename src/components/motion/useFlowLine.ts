'use client';

/**
 * Scroll-linked timeline line (owner 2026-11-23, KMS-style): a container with
 * the `flow-line` class draws one vertical line through its `.flow-node`
 * elements; the line fills as you scroll and each node's row gets `data-on`
 * once it passes 60% of the screen. Styles live in globals.css (.flow-line).
 */

import { useEffect, type RefObject } from 'react';

export function useFlowLine(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = el.querySelectorAll<HTMLElement>('.flow-node');
      if (!nodes.length) return;
      const mark = window.innerHeight * 0.6;
      const top = el.getBoundingClientRect().top;
      const mid = (n: HTMLElement) => { const r = n.getBoundingClientRect(); return r.top + r.height / 2; };
      // The line runs from the first node's centre to the last one's.
      const start = mid(nodes[0]) - top;
      const len = mid(nodes[nodes.length - 1]) - top - start;
      el.style.setProperty('--start', `${start}px`);
      el.style.setProperty('--len', `${len}px`);
      el.style.setProperty('--p', String(len > 0 ? Math.min(1, Math.max(0, (mark - top - start) / len)) : 1));
      nodes.forEach((n) => n.closest('li')?.toggleAttribute('data-on', mid(n) < mark));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, enabled]);
}
