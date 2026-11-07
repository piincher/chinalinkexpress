'use client';

/**
 * Sourcing: where you buy, what we do, where it lands, set over the real
 * footage. On desktop the footage opens out as the section pins. Below 900px and
 * under reduced motion it simply starts open, because a pin fights the mobile
 * URL bar. All text is in the DOM from the start.
 */

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { LazyVideo } from '@/components/site/LazyVideo';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';
import { WAREHOUSES } from '@/constants/companyFacts';

/** Marketplaces ChinaLink already receives orders from. */
const MARKETPLACES = ['1688', 'Taobao', 'Alibaba', 'Pinduoduo'];

// The two real receiving points, with the mode a supplier must get right. The
// bare AIR / SEA code matches the warehouse instructions clients already receive.
const WAREHOUSE_CITIES = WAREHOUSES.map((w) => `${w.city} ${w.mode}`);

export function SourcingSection() {
  const t = useTranslations('sourcing');
  const section = useRef<HTMLElement>(null);

  const steps = [
    { label: t('steps.buy'), items: MARKETPLACES },
    { label: t('steps.consolidate'), items: WAREHOUSE_CITIES },
    { label: t('steps.receive'), items: [t('destination')] },
  ];

  useEffect(() => {
    const el = section.current;
    if (!el || prefersReducedMotion()) return;

    return withGsap(el, ({ gsap }) => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 },
        });
        gsap.set('[data-win-frame]', { clipPath: 'inset(22% 26% 22% 26% round 32px)' });
        gsap.set('[data-win-veil]', { opacity: 0 });
        gsap.set('[data-win-text]', { opacity: 0 });
        timeline
          .to('[data-win-frame]', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 1 })
          .to('[data-win-veil]', { opacity: 0.58, duration: 0.3 }, 0.72)
          .to('[data-win-text]', { opacity: 1, duration: 0.3 }, 0.76)
          .to({}, { duration: 0.35 });
      });
      return () => mm.revert();
    });
  }, []);

  return (
    <section ref={section} className="win">
      <div className="win-frame" data-win-frame>
        <LazyVideo src="/media/team-loop.mp4" poster="/media/team-poster.webp" />
        <div className="win-veil" data-win-veil />
      </div>
      <div className="win-text" data-win-text>
        <h2>{t('title')}</h2>
        <p>{t('subtitle')}</p>
        <div className="win-steps">
          {steps.map(({ label, items }) => (
            <div key={label}>
              <h3>{label}</h3>
              <p>{items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SourcingSection;
