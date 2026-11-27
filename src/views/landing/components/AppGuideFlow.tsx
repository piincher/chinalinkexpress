'use client';

/**
 * Motion for the /application guide (owner 2026-11-28, "calm and premium").
 * The steps stay server-rendered; this wrapper only adds behaviour:
 *   - the house flow line fills as you scroll and each number lights up (useFlowLine),
 *   - each step's text rises in, then its phone slides in with a slight tilt that settles,
 *   - once settled, the phone scrolls its own screen (tall captures) and plays one tap
 *     ripple on the button the step names, then returns to the top.
 * Everything is visible without JS and under prefers-reduced-motion (withGsap no-ops).
 */

import { useEffect, useRef, type ReactNode } from 'react';
import { useFlowLine } from '@/components/motion/useFlowLine';
import { withGsap, type Gsap } from '@/lib/animation/gsapContext';

function playPhone(gsap: Gsap, phone: HTMLElement) {
  const img = phone.querySelector<HTMLElement>('img');
  if (!img) return;
  const frameH = phone.clientHeight;
  const imgH = img.offsetHeight;
  const extra = Math.max(0, imgH - frameH);
  const hx = Number(phone.dataset.hintX);
  const hy = Number(phone.dataset.hintY);
  const tap = phone.querySelector<HTMLElement>('.app-guide-tap');
  const hasHint = Boolean(tap) && Number.isFinite(hx) && Number.isFinite(hy);

  // Bring the tapped button to ~45% of the screen before tapping it.
  const toTarget = hasHint ? Math.min(extra, Math.max(0, hy * imgH - frameH * 0.45)) : 0;
  // Percentages, not px: a resize or rotation mid-play keeps scroll and tap aligned.
  const pct = (px: number) => (px / imgH) * -100;
  const tl = gsap.timeline({ delay: 0.35 });
  if (toTarget > 0) tl.to(img, { yPercent: pct(toTarget), duration: Math.min(2.4, 0.8 + toTarget / 450), ease: 'power2.inOut' });
  if (hasHint && tap) {
    tl.set(tap, { left: `${hx * 100}%`, top: `${((hy * imgH - toTarget) / frameH) * 100}%` })
      .fromTo(tap, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power2.out' })
      .to(tap, { scale: 0.82, duration: 0.14, ease: 'power1.inOut' })
      .to(tap, { scale: 2.1, autoAlpha: 0, duration: 0.75, ease: 'power2.out' });
  }
  // Then show the rest of a tall screen, slowly, and come back to the top.
  if (extra > toTarget + 8) tl.to(img, { yPercent: pct(extra), duration: Math.min(6, 1.2 + (extra - toTarget) / 220), ease: 'sine.inOut' }, '+=0.5');
  if (extra > 0) tl.to(img, { yPercent: 0, duration: Math.min(2.6, 1 + extra / 700), ease: 'power2.inOut' }, '+=1.4');
}

export function AppGuideFlow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  useFlowLine(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return withGsap(el, ({ gsap }) => {
      // Phones crop to one screen only while motion plays them; otherwise they scroll by hand (CSS).
      el.classList.add('is-animated');
      const rtl = getComputedStyle(el).direction === 'rtl';
      el.querySelectorAll<HTMLElement>('.app-guide-step').forEach((step) => {
        const phone = step.querySelector<HTMLElement>('.app-guide-phone, .app-guide-paper');
        const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: 'top 80%', once: true } });
        tl.from(step.querySelectorAll('.app-guide-copy > *'), { autoAlpha: 0, y: 18, duration: 0.72, ease: 'expo.out', stagger: 0.08 });
        if (!phone) return;
        tl.from(phone, { autoAlpha: 0, y: 36, x: rtl ? -24 : 24, rotate: rtl ? -3 : 3, duration: 1.1, ease: 'expo.out' }, 0.12);
        if (phone.classList.contains('app-guide-phone')) tl.add(() => playPhone(gsap, phone));
      });
    });
  }, []);

  return (
    <ol ref={ref} className="app-guide flow-line">
      {children}
    </ol>
  );
}
