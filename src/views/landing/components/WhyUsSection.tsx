'use client';

/**
 * Why us — a sticky argument.
 *
 * Deliberately a different shape from every neighbour: Services is an index of
 * rows, Journey is a pinned photo sequence, and this is a two-column editorial
 * spread. The heading sits in a sticky left column and stays put while the four
 * arguments scroll past it on the right. That is the section's whole interaction
 * — no cards, no borders, no hover lift.
 *
 * Structural variety is the point. A page whose sections differ only in their
 * copy is the definition of a template, and it is what the reader is actually
 * detecting when they say a site "feels generic". Four bordered cards in a row
 * was this section's third appearance of that exact shape.
 *
 * The icon chips are gone too. A rounded square holding a Lucide glyph next to
 * every heading is decoration standing in for hierarchy; a number and a rule do
 * the same job without the visual noise.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Band, Shell } from '@/components/site';
import { Reveal, RevealGroup } from '@/components/motion';
import { SECTION_IDS } from '../constants';

/*
 * These four keys replace `speed / reliability / price / expertise`.
 *
 * The old set was four adjectives — Rapidité, Fiabilité, Prix Compétitifs,
 * Expertise — under sentences claiming "les délais les plus courts du marché"
 * and "les meilleurs tarifs du marché". Nothing in either is checkable, both
 * appear verbatim on competitors' sites, and a reader who has been let down
 * before reads them as the noise they are.
 *
 * Each replacement is a specific operational fact: which warehouse takes which
 * mode, who deals with the supplier, what consolidation actually saves, and
 * what the client is told and when. Apply the test the whole page is built
 * around — swap "ChinaLink" for any other forwarder's name and see whether the
 * paragraph still makes sense. It does not, and that is the point.
 */
const WHY_US_KEYS = ['warehouses', 'oneContact', 'consolidation', 'updates'] as const;

export function WhyUsSection() {
  const t = useTranslations('whyUs');
  const locale = useLocale();

  return (
    <Band id={SECTION_IDS.WHY_US} tone="paper-2">
      <Shell>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
            gap: 'clamp(2.5rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >
          {/* ── the claim, held in place ──────────────────────────────────── */}
          <Reveal
            style={{
              // Sticky only where there is room to scroll past it. On a single
              // column the heading would otherwise pin over its own list.
              position: 'sticky',
              top: 'calc(var(--space-4xl) + 1rem)',
              minWidth: 0,
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                lineHeight: 'var(--leading-heading)',
                color: 'var(--color-ink)',
                margin: 0,
                maxWidth: '16ch',
              }}
            >
              {t('title')}
            </h2>
            <div
              aria-hidden
              style={{
                width: '3.5rem',
                height: 2,
                backgroundColor: 'var(--color-accent)',
                marginTop: 'var(--space-lg)',
              }}
            />
          </Reveal>

          {/* ── the arguments ────────────────────────────────────────────── */}
          <RevealGroup stagger={0.1} style={{ minWidth: 0 }}>
            {WHY_US_KEYS.map((key, index) => (
              <div
                key={key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr)',
                  gap: 'var(--space-lg)',
                  paddingBlock: 'var(--space-xl)',
                  borderTop: '1px solid var(--color-rule)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-label)',
                    color: 'var(--color-accent)',
                    paddingTop: '0.35em',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--weight-heading)',
                      letterSpacing: 'var(--tracking-heading)',
                      color: 'var(--color-ink)',
                      margin: '0 0 var(--space-xs)',
                    }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-ink-2)',
                      margin: 0,
                      maxWidth: 'var(--measure)',
                    }}
                  >
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}

            {/*
              The full "complete partner vs plain forwarder" argument lives at
              /pourquoi-nous, which had no inbound link from anywhere on the
              site — a complete page with its own metadata and Service schema
              that no reader and no crawler could reach. The home page carried a
              condensed copy of the same argument instead. The copy is gone; the
              link is here, where a reader who wants the long version is.
            */}
            <Reveal>
              <Link
                href={`/${locale}/pourquoi-nous`}
                className="cta cta--quiet"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  marginTop: 'var(--space-xl)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
              >
                {t('moreLink')}
                <ArrowRight className="cta-arrow" size={16} aria-hidden />
              </Link>
            </Reveal>
          </RevealGroup>
        </div>
      </Shell>
    </Band>
  );
}

export default WhyUsSection;
