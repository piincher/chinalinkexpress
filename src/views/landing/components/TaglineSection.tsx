'use client';

/**
 * The page's one large statement. Words darken one by one as it scrolls through;
 * under reduced motion, or before the script runs, it is simply full colour.
 */

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

export function TaglineSection() {
  const t = useTranslations();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = t('tagline').split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return withGsap(el, ({ gsap }) => {
      gsap.fromTo(
        el.querySelectorAll('span'),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.5,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: 0.4 },
        }
      );
    });
  }, []);

  return (
    <Band tone="paper">
      <Shell>
        <p ref={ref} className="tagline">
          {words.map((word, i) => (
            <React.Fragment key={i}>
              <span>{word}</span>{' '}
            </React.Fragment>
          ))}
        </p>
      </Shell>
    </Band>
  );
}

export default TaglineSection;
