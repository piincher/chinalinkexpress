'use client';

/**
 * Testimonials — the real ones.
 *
 * What was here: three cards for "Amadou Diallo, Diallo Electronics", "Fatou
 * Coulibaly, Mode Africaine" and "Oumar Touré, Touré Import-Export", each with a
 * warehouse or product photograph cropped into a circle as their face, under a
 * banner claiming "Plus de 100 entreprises" while the stats band two screens up
 * said 1,247 clients. None of those three people appear anywhere in this
 * codebase's data.
 *
 * Meanwhile TESTIMONIALS in ../constants.ts held three quotes that are
 * obviously real — Dr Touré, Ousmane Diallo of AfricaDecor, and Maimouna Matel
 * N'Diaye — and nothing rendered them.
 *
 * They are used here verbatim, including the imperfect French. That is the
 * point: "Ça me fais plus de deux ans dans le système j'ai jamais travaillé
 * avec une agence aussi organisée que la vôtre" reads like a person, and
 * "ChinaLink Express a transformé mon business" reads like an agency wrote it.
 * A prospect in Bamako can tell the difference instantly, and so can Google.
 *
 * No avatars. There are no photographs of these clients, and using a picture of
 * cargo as someone's face is the same fabrication in a smaller font. Initials
 * set in the mono face carry the same layout weight and claim nothing.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { TESTIMONIALS, SECTION_IDS } from '../constants';

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <Band id={SECTION_IDS.TESTIMONIALS} tone="paper">
      <Shell>
        <SectionHead label={t('sectionLabel')} title={t('title')} />

        <RevealGroup
          stagger={0.1}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-lg)',
                margin: 0,
                minWidth: 0,
                paddingTop: 'var(--space-lg)',
                // A rule above rather than a box around: the quotes are
                // different lengths and boxing them forces either ragged
                // heights or clamped text.
                borderTop: '2px solid var(--color-ink)',
              }}
            >
              <Quote
                size={20}
                aria-hidden
                style={{ color: 'var(--color-accent)', flexShrink: 0 }}
              />

              <blockquote
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-md)',
                  lineHeight: 1.55,
                  color: 'var(--color-ink)',
                  margin: 0,
                  flex: 1,
                }}
              >
                {testimonial.text}
              </blockquote>

              <figcaption
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  minWidth: 0,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.25rem',
                    height: '2.25rem',
                    flexShrink: 0,
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-rule)',
                    backgroundColor: 'var(--color-paper-2)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.04em',
                    color: 'var(--color-ink-2)',
                  }}
                >
                  {initialsOf(testimonial.name)}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--weight-heading)',
                      color: 'var(--color-ink)',
                    }}
                  >
                    {testimonial.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-neutral)',
                    }}
                  >
                    {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Shell>
    </Band>
  );
}

export default TestimonialsSection;
