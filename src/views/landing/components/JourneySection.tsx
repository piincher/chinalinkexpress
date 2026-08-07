'use client';

/**
 * JourneySection — the page's one large interactive moment.
 *
 * A pinned dark band. As the reader scrolls through it the section holds
 * still and its *contents* advance: four real photographs cross-fade
 * (warehouse → customs → packed → loaded), the stage list highlights in step,
 * and a vertical rail fills. Scrolling back runs it backwards.
 *
 * Why one big scroll piece instead of many small effects: a page earns the word
 * "premium" by having something in it that clearly could not have been thrown
 * together, and by having only one of them. Twelve hover tricks read as a demo;
 * one choreographed sequence reads as a production.
 *
 * Three things keep it from feeling like a gimmick:
 *
 *   · `scrub: 1` — position follows scroll offset with a one-second catch-up,
 *     so the sequence tracks the reader's thumb instead of playing on a timer.
 *     Time-based scroll animation is what makes a page feel like it is fighting
 *     you.
 *   · pinning is desktop-only, via `gsap.matchMedia`. Pinned sections on mobile
 *     fight the browser's own URL-bar resize and hijack a short scroll — below
 *     900px this degrades to a plain vertical list, which is also the better
 *     reading experience on a phone.
 *   · every stage's text is in the DOM at all times and only opacity changes,
 *     so the content is fully present for crawlers and for reduced-motion.
 *
 * Under `prefers-reduced-motion` nothing pins and nothing fades: the four
 * stages render as a static list. That is a first-class layout, not a fallback.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, Figure, PHOTOS } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { withGsap, prefersReducedMotion } from '@/lib/animation/gsapContext';

interface Step {
  key: string;
  title: string;
  description: string;
}

/** Each stage is illustrated by a real photograph of that stage. */
const STAGE_PHOTOS = [
  { src: PHOTOS.warehouseAisle, alt: 'Marchandises reçues et entreposées dans notre entrepôt en Chine' },
  { src: PHOTOS.depot, alt: 'Colis consolidés et palettisés avant expédition' },
  { src: PHOTOS.customs, alt: 'Formalités de dédouanement des marchandises' },
  { src: PHOTOS.readyToLoad, alt: 'Envoi emballé et étiqueté, prêt pour la livraison à Bamako' },
];

export function JourneySection() {
  const t = useTranslations('journey');
  const steps = (t.raw('steps') as Step[]) ?? [];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !steps.length || prefersReducedMotion()) return;

    return withGsap(section, ({ gsap, ScrollTrigger }) => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px)', () => {
        const stage = section.querySelector('[data-journey-stage]');
        const photos = gsap.utils.toArray<HTMLElement>('[data-journey-photo]');
        const rail = section.querySelector('[data-journey-rail-fill]');
        if (!stage || photos.length !== steps.length) return;

        // The section is given (steps × 90vh) of scroll travel. Fewer and the
        // stages flick past; more and it feels like the page has stalled.
        const travel = window.innerHeight * 0.9 * steps.length;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${travel}`,
            pin: stage,
            // Prevents a 1px layout shift when the pin engages, which otherwise
            // shows up as a visible jump at the top of the section.
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            onUpdate: (self) => {
              const index = Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length)
              );
              setActive(index);
            },
          },
        });

        gsap.set(photos, { autoAlpha: 0 });
        gsap.set(photos[0], { autoAlpha: 1 });

        photos.forEach((photo, i) => {
          if (i === 0) return;
          timeline.to(photo, { autoAlpha: 1, duration: 1, ease: 'none' }, i - 1);
          // The outgoing photo is faded on the same beat rather than after it,
          // so the two never both sit at full opacity and flash bright.
          timeline.to(photos[i - 1], { autoAlpha: 0, duration: 1, ease: 'none' }, i - 1);
        });

        if (rail) {
          timeline.fromTo(
            rail,
            { scaleY: 0 },
            { scaleY: 1, ease: 'none', duration: steps.length - 1 },
            0
          );
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      // A pinned section changes the document height; recalculating once the
      // photographs have decoded avoids the trigger being measured against a
      // shorter page than the one that finally renders.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
        mm.revert();
      };
    });
  }, [steps.length]);

  if (!steps.length) return null;

  return (
    <Band tone="void" id="parcours">
      <div ref={sectionRef}>
        <div data-journey-stage>
          <Shell>
            <SectionHead
              tone="void"
              label={t('label')}
              title={t('title')}
              lede={t('lede')}
            />

            <div
              style={{
                display: 'grid',
                // Photo left, stages right on desktop; stacked below 900px,
                // where the pin is also disabled.
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))',
                gap: 'clamp(2rem, 5vw, 4.5rem)',
                alignItems: 'center',
              }}
            >
              {/* ── the photographs ──────────────────────────────────────── */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  maxHeight: '58vh',
                  minWidth: 0,
                  borderRadius: 'var(--radius-panel)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-void-2)',
                }}
              >
                {STAGE_PHOTOS.map((photo, i) => (
                  <div
                    key={photo.src}
                    data-journey-photo
                    style={{
                      position: 'absolute',
                      inset: 0,
                      // Only the first is visible before GSAP runs, so a
                      // no-JS or reduced-motion reader sees one clean image
                      // rather than four stacked at full opacity.
                      opacity: i === 0 ? 1 : 0,
                    }}
                  >
                    <Figure
                      src={photo.src}
                      alt={photo.alt}
                      focal="42%"
                      scrim={0.45}
                      tint
                      sizes="(max-width: 900px) 100vw, 40vw"
                      style={{ position: 'absolute', inset: 0 }}
                    />
                  </div>
                ))}
              </div>

              {/* ── the stages ───────────────────────────────────────────── */}
              <ol
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  position: 'relative',
                  minWidth: 0,
                }}
              >
                {/* Rail: a hairline track with a fill that grows as you scroll. */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.6rem',
                    bottom: '0.6rem',
                    width: 1,
                    backgroundColor: 'var(--color-void-rule)',
                  }}
                >
                  <div
                    data-journey-rail-fill
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--color-accent-bright)',
                      transformOrigin: 'top',
                    }}
                  />
                </div>

                {steps.map((step, i) => {
                  const isActive = i === active;
                  return (
                    <li
                      key={step.key}
                      style={{
                        paddingInlineStart: 'var(--space-xl)',
                        paddingBlock: 'var(--space-lg)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 'var(--space-sm)',
                          marginBottom: 'var(--space-2xs)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            letterSpacing: 'var(--tracking-label)',
                            color: isActive
                              ? 'var(--color-accent-bright)'
                              : 'var(--color-void-ink-2)',
                            transition: 'color var(--dur-short) var(--ease-out)',
                          }}
                        >
                          {step.key}
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-xl)',
                            fontWeight: 'var(--weight-heading)',
                            letterSpacing: 'var(--tracking-heading)',
                            color: 'var(--color-void-ink)',
                            margin: 0,
                            // Inactive stages recede rather than disappear —
                            // the reader can still see where they are in the
                            // sequence and what is coming.
                            opacity: isActive ? 1 : 0.42,
                            transition: 'opacity var(--dur-mid) var(--ease-out)',
                          }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-base)',
                          lineHeight: 'var(--leading-body)',
                          color: 'var(--color-void-ink-2)',
                          margin: 0,
                          maxWidth: '44ch',
                          opacity: isActive ? 1 : 0.42,
                          transition: 'opacity var(--dur-mid) var(--ease-out)',
                        }}
                      >
                        {step.description}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Shell>
        </div>
      </div>
    </Band>
  );
}

export default JourneySection;
