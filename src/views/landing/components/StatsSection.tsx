/**
 * Stats Section — Minimal Stat Strip with Counter Reveal
 *
 * Numbers tick up from zero on viewport entry.
 * No gradients, no spotlight cards.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Counter } from '@/components/animations/Counter';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { STATS } from '@/constants/appConstants';
import { SECTION_IDS } from '../constants';

export function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    {
      value: STATS.CLIENTS.value,
      suffix: STATS.CLIENTS.suffix,
      label: t('satisfiedClients', { defaultValue: 'Clients satisfaits' }),
    },
    {
      value: STATS.SHIPMENTS.value,
      suffix: STATS.SHIPMENTS.suffix,
      label: t('shipments', { defaultValue: 'Expéditions' }),
    },
    {
      value: STATS.RATING.value,
      suffix: STATS.RATING.suffix,
      decimals: STATS.RATING.decimals,
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
        {/* The columns arrive one after another so the eye is led across the
            strip, and each number then ticks up from zero in place. */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
          staggerDelay={0.12}
        >
          {stats.map((stat, index) => (
            <StaggerItem
              key={index}
              animation="blurIn"
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
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={1.6}
                />
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default StatsSection;
