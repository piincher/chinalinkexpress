'use client';

/**
 * Services — an index, not a card grid.
 *
 * What was here before: five equal cards, each with a rounded icon chip, each
 * tracking the pointer with a 3D tilt and a radial glare that followed the
 * cursor. The tilt is the reason this section read as cheap. Pointer-tilt on a
 * text card was a 2020 CodePen trick; it shimmers the type edges, it fights the
 * reader's aim, and it signals "effects were available" rather than "this was
 * designed". It is gone.
 *
 * What replaces it borrows from a printed index: full-width rows separated by
 * hairlines, the service number set in mono at the left margin, the name large
 * in the display face, and the description held to a readable measure. Hovering
 * a row shifts the whole row 6px toward the reader and reveals the arrow. One
 * property, one direction, no shimmer.
 *
 * Rows beat cards here for a second reason: five items do not divide into a
 * three-column grid, so the old layout always ended with two orphans and a gap.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Search, Plane, Ship, CreditCard, Smartphone, ArrowRight } from 'lucide-react';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { SECTION_IDS } from '../constants';

const SERVICES = [
  { key: 'sourcing', href: '/services/sourcing', Icon: Search },
  { key: 'airFreight', href: '/services/air-freight', Icon: Plane },
  { key: 'seaFreight', href: '/services/sea-freight', Icon: Ship },
  { key: 'payment', href: '/services/paiement-fournisseur-chine', Icon: CreditCard },
  { key: 'recharge', href: '/tarifs', Icon: Smartphone },
] as const;

export function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <Band id={SECTION_IDS.SERVICES} tone="paper">
      <Shell>
        <SectionHead title={t('title')} lede={t('subtitle')} />

        <RevealGroup stagger={0.07} selector="[data-service-row]">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {SERVICES.map(({ key, href, Icon }, index) => (
              <li key={key} data-service-row>
                <Link
                  href={`/${locale}${href}`}
                  className="service-row"
                  style={{
                    display: 'grid',
                    // Number · icon · name · description · arrow. Collapses to
                    // a single column below 860px via the stylesheet below.
                    gridTemplateColumns: 'auto auto minmax(0, 15rem) minmax(0, 1fr) auto',
                    alignItems: 'center',
                    gap: 'clamp(1rem, 2.5vw, 2.25rem)',
                    padding: 'var(--space-xl) 0',
                    borderTop: index === 0 ? '1px solid var(--color-rule)' : undefined,
                    borderBottom: '1px solid var(--color-rule)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: 'var(--tracking-label)',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <Icon
                    size={20}
                    aria-hidden
                    className="service-icon"
                    style={{ color: 'var(--color-accent)', flexShrink: 0 }}
                  />

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      // Titles are stored uppercase ("EXPÉDITION AÉRIENNE").
                      // Rendered as small-caps-weight sentence text they read
                      // as a name rather than as shouting.
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--weight-heading)',
                      letterSpacing: 'var(--tracking-heading)',
                      textTransform: 'none',
                      color: 'var(--color-ink)',
                      margin: 0,
                      minWidth: 0,
                    }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>

                  <p
                    className="service-desc"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--color-ink-2)',
                      margin: 0,
                      minWidth: 0,
                      maxWidth: '52ch',
                    }}
                  >
                    {t(`items.${key}.description`)}
                  </p>

                  <ArrowRight
                    size={18}
                    aria-hidden
                    className="service-arrow"
                    style={{ color: 'var(--color-accent)', flexShrink: 0 }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </RevealGroup>
      </Shell>
    </Band>
  );
}

export default ServicesSection;
