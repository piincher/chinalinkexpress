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
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell, Figure } from '@/components/site';
import { Reveal } from '@/components/motion';
import { FOUNDING_YEAR } from '@/constants/companyFacts';
import { SECTION_IDS } from '../constants';

export function AboutSection() {
  const t = useTranslations('about');
  const tHome = useTranslations('home');
  const locale = useLocale();

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
          {/* Owner 2026-11-23: a real face beats warehouse photos. Unnamed on purpose. */}
          <Reveal style={{ minWidth: 0 }}>
            <Figure
              src="/media/team/china-warehouse.webp"
              alt={tHome('aboutPhotoAlt')}
              focal="40%"
              scrim={0.35}
              sizes="(max-width: 760px) 100vw, 40vw"
              style={{ aspectRatio: '4 / 3' }}
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

            {/* Owner 2026-11-23: minimum text — one line. Full story on /pourquoi-nous. */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-ink-2)',
                margin: 0,
              }}
            >
              {tHome('aboutLine')}
            </p>
            <Link
              href={`/${locale}/qui-sommes-nous`}
              className="inline-flex items-center gap-2"
              style={{ marginTop: 'var(--space-md)', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
            >
              {tHome('aboutMore')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </Shell>
    </Band>
  );
}

export default AboutSection;
