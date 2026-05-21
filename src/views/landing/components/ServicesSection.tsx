/**
 * Services Section — Clean Redesign
 *
 * No bento grid, no spotlight borders, no gradient text.
 * Clean typographic cards with a single Lucide icon each.
 */

'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Search,
  Plane,
  Ship,
  CreditCard,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { SECTION_IDS } from '../constants';

const SERVICE_HREFS: Record<string, string> = {
  sourcing: '/services/sourcing',
  airFreight: '/services/air-freight',
  seaFreight: '/services/sea-freight',
  payment: '/services/paiement-fournisseur-chine',
  recharge: '/tarifs',
};

const SERVICE_ICONS = [
  Search,
  Plane,
  Ship,
  CreditCard,
  Smartphone,
];

const SERVICE_KEYS = ['sourcing', 'airFreight', 'seaFreight', 'payment', 'recharge'] as const;

function ServiceCard({
  serviceKey,
  index,
}: {
  serviceKey: string;
  index: number;
}) {
  const t = useTranslations('services');
  const ctaT = useTranslations('cta');
  const locale = useLocale();

  const title = t(`items.${serviceKey}.title`);
  const description = t(`items.${serviceKey}.description`);
  const href = SERVICE_HREFS[serviceKey] || '/services/sourcing';
  const targetLocale = serviceKey === 'payment' ? 'fr' : locale;
  const Icon = SERVICE_ICONS[index];

  return (
    <div
      className="group relative flex flex-col h-full rounded-lg p-6 transition-colors"
      style={{
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-rule)',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: 'var(--color-paper-2)' }}
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
      </div>

      {/* Content */}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-6 flex-1"
        style={{ color: 'var(--color-ink-2)' }}
      >
        {description}
      </p>

      {/* CTA */}
      <Link
        href={`/${targetLocale}${href}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2"
        style={{ color: 'var(--color-accent)' }}
      >
        {ctaT('learnMore')}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section
      id={SECTION_IDS.SERVICES}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-paper-2)' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: 'var(--color-ink-2)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Cards — asymmetric grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {SERVICE_KEYS.map((key, index) => (
            <ServiceCard key={key} serviceKey={key} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
