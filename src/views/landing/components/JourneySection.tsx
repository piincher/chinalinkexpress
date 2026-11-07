'use client';

/**
 * Journey: the goods travel sideways, so the page does too. Desktop pins the
 * band and moves it horizontally through four full-screen photographs. Below
 * 900px and under reduced motion it stays a vertical stack, which is the base
 * layout, so the content is complete before any script runs.
 */

import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Figure, PHOTOS } from '@/components/site';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface Step {
  key: string;
  title: string;
  description: string;
}

/** Each stage is illustrated by a real photograph of that stage. */
const STAGE_PHOTOS = [PHOTOS.warehouseAisle, PHOTOS.depot, PHOTOS.customs, PHOTOS.readyToLoad];

export function JourneySection() {
  const t = useTranslations('journey');
  const steps = (t.raw('steps') as Step[]) ?? [];
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el || !steps.length || prefersReducedMotion()) return;

    return withGsap(el, ({ gsap, ScrollTrigger }) => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        el.dataset.sideways = 'true';
        const track = el.querySelector<HTMLElement>('[data-jr-track]');
        const strip = el.querySelector<HTMLElement>('[data-jr-strip]');
        if (!track || !strip) return;
        const labels = strip.querySelectorAll<HTMLElement>('span');
        const distance = () => track.scrollWidth - window.innerWidth;
        const leadShare = () => (track.firstElementChild as HTMLElement).offsetWidth / distance();

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              const lead = leadShare();
              strip.style.opacity = progress > lead * 0.45 ? '1' : '0';
              const p = Math.max(0, (progress - lead * 0.6) / (1 - lead * 0.6));
              labels.forEach((label, i) => {
                label.style.setProperty('--f', String(Math.min(1, Math.max(0, p * labels.length - i))));
              });
            },
          },
        });
        strip.style.opacity = '0';
        ScrollTrigger.refresh();

        return () => {
          delete el.dataset.sideways;
        };
      });
      return () => mm.revert();
    });
  }, [steps.length]);

  if (!steps.length) return null;

  return (
    <section ref={section} id="parcours" className="jr band-void" dir="ltr">
      <div className="jr-strip" data-jr-strip aria-hidden>
        {steps.map((step) => (
          <span key={step.key}>{step.title}</span>
        ))}
      </div>
      <div className="jr-track" data-jr-track>
        <div className="jr-intro" dir="auto">
          <span className="jr-label">{t('label')}</span>
          <h2>{t('title')}</h2>
          <p>{t('lede')}</p>
        </div>
        {steps.map((step, i) => (
          <article key={step.key} className="jr-panel">
            <div className="jr-photo">
              <Figure
                src={STAGE_PHOTOS[i % STAGE_PHOTOS.length]}
                alt={step.title}
                focal="42%"
                scrim={0.75}
                rounded={false}
                sizes="100vw"
                style={{ position: 'absolute', inset: 0 }}
              />
            </div>
            <span className="jr-num">{step.key}</span>
            <div className="jr-body" dir="auto">
              <h3>{step.title}</h3>
              <div className="jr-card">
                <span>{step.key} / {String(steps.length).padStart(2, '0')}</span>
                <p>{step.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default JourneySection;
