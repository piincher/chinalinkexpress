'use client';

/**
 * About — the company, told through its warehouse.
 *
 * The previous version was close to right: two paragraphs beside a photo grid.
 * Two things held it back. The photographs were raw — the same overhead
 * fluorescent, the same washed grey concrete as everywhere else — so they read
 * as phone snaps sitting in a layout rather than as part of one. And the four
 * qualities ("Fiable · Rapide · Sécurisé · Compétitif") were rendered as ticked
 * pills, which is the weakest possible form for an adjective: it looks like a
 * feature checklist while promising nothing measurable.
 *
 * Now the images go through the house `Figure` treatment, so they are graded
 * like the hero and the journey, and the founding year is set as a real figure
 * rather than buried in prose. The adjectives are set as a plain rule-separated
 * line — still there, no longer pretending to be evidence.
 *
 * The photo grid is deliberately asymmetric: one tall frame carrying the
 * warehouse, two smaller ones under it. An even 2×2 of four equal photographs
 * is a gallery; an uneven set is a composition.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, Figure, PHOTOS } from '@/components/site';
import { Reveal } from '@/components/motion';
import { FOUNDING_YEAR } from '@/constants/companyFacts';
import { SECTION_IDS } from '../constants';

export function AboutSection() {
  const t = useTranslations('about');
  const tags = (t.raw('tags') as string[]) ?? [];

  return (
    <Band id={SECTION_IDS.ABOUT} tone="paper">
      <Shell>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* ── the photographs ──────────────────────────────────────────── */}
          <Reveal
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 'clamp(0.6rem, 1.4vw, 1rem)',
              minWidth: 0,
            }}
          >
            <Figure
              src={PHOTOS.warehouseWide}
              alt={`${t('gallery.warehouseLabel')} — ${t('gallery.warehouseLocation')}`}
              focal="42%"
              scrim={0.55}
              tint
              sizes="(max-width: 760px) 100vw, 34vw"
              style={{ gridColumn: '1 / -1', aspectRatio: '16 / 10' }}
            >
              <figcaption
                style={{
                  position: 'absolute',
                  left: 'var(--space-lg)',
                  bottom: 'var(--space-lg)',
                  right: 'var(--space-lg)',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-label)',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-bright)',
                  }}
                >
                  {t('gallery.warehouseLabel')}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-md)',
                    fontWeight: 'var(--weight-heading)',
                    color: 'var(--color-void-ink)',
                  }}
                >
                  {t('gallery.warehouseLocation')}
                </span>
              </figcaption>
            </Figure>

            <Figure
              src={PHOTOS.warehouseAisle}
              alt="Allée de stockage et marchandises consolidées"
              focal="45%"
              scrim={0.3}
              tint
              sizes="(max-width: 760px) 50vw, 17vw"
              style={{ aspectRatio: '1 / 1' }}
            />
            <Figure
              src={PHOTOS.readyToLoad}
              alt="Colis emballés et étiquetés, prêts au départ"
              focal="45%"
              scrim={0.3}
              tint
              sizes="(max-width: 760px) 50vw, 17vw"
              style={{ aspectRatio: '1 / 1' }}
            />
          </Reveal>

          {/* ── the company ──────────────────────────────────────────────── */}
          <Reveal delay={0.1} style={{ minWidth: 0 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                lineHeight: 'var(--leading-heading)',
                color: 'var(--color-ink)',
                margin: '0 0 var(--space-xl)',
                maxWidth: '16ch',
              }}
            >
              {t('title')}
            </h2>

            {/* Founded 2019 — a fact worth setting as one, not buried
                mid-sentence. Read from companyFacts so it cannot drift away
                from the same year stated in the Organization schema. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-md)',
                paddingBottom: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
                borderBottom: '1px solid var(--color-rule)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--weight-display)',
                  letterSpacing: 'var(--tracking-display)',
                  color: 'var(--color-ink)',
                  lineHeight: 1,
                }}
              >
                {FOUNDING_YEAR}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                }}
              >
                Chine · Mali
              </span>
            </div>

            {[t('description1'), t('description2')].map((para) => (
              <p
                key={para.slice(0, 24)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink-2)',
                  margin: '0 0 var(--space-md)',
                  maxWidth: 'var(--measure)',
                }}
              >
                {para}
              </p>
            ))}

            {tags.length > 0 && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                  marginTop: 'var(--space-xl)',
                  marginBottom: 0,
                }}
              >
                {tags.join('  ·  ')}
              </p>
            )}
          </Reveal>
        </div>
      </Shell>
    </Band>
  );
}

export default AboutSection;
