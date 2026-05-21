/**
 * Stats Section — Minimal Stat Strip
 *
 * Clean horizontal strip of key metrics.
 * No gradients, no counters, no spotlight cards.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { SECTION_IDS } from '../constants';

export function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    {
      value: t('activeClientsCount', { defaultValue: '1,247' }),
      label: t('satisfiedClients', { defaultValue: 'Clients satisfaits' }),
    },
    {
      value: '7+',
      label: t('experienceYears', { defaultValue: "Années d'expérience" }),
    },
    {
      value: t('ratingValue', { defaultValue: '4.8' }),
      label: t('rating', { defaultValue: 'Note moyenne' }),
      icon: Star,
    },
  ];

  return (
    <section
      id={SECTION_IDS.STATS}
      className="relative py-12 md:py-16"
      style={{
        backgroundColor: 'var(--color-paper)',
        borderTop: '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col ${index > 0 ? 'md:pl-12 md:border-l' : ''}`}
              style={index > 0 ? { borderColor: 'var(--color-rule)' } : undefined}
            >
              <div
                className="font-bold tracking-tight inline-flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--color-ink)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.value}
                {stat.icon && (
                  <stat.icon
                    className="w-6 h-6"
                    style={{ color: 'var(--color-accent)' }}
                    fill="currentColor"
                  />
                )}
              </div>
              <div
                className="text-sm font-medium uppercase tracking-wider mt-1"
                style={{ color: 'var(--color-neutral)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
