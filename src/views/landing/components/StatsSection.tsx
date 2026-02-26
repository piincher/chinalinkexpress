/**
 * Stats Section Component
 *
 * Animated statistics display with Counter animations and premium visual effects.
 * Shows key business metrics with scroll-triggered counting effects.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Counter } from '@/components/animations/Counter';
import { ScrollReveal } from '@/components/scroll-animations/ScrollReveal';
import { GridPattern } from '@/components/animations/GridPattern';
import { GradientText } from '@/components/animations/TextAnimations';
import { SpotlightCard } from '@/components/animations/SpotlightCard';
import { motion } from 'framer-motion';
import { STATS } from '@/constants/appConstants';
import { SECTION_IDS } from '../constants';

interface StatItemProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  labelKey: string;
  index: number;
  duration?: number;
}

function StatItem({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  labelKey,
  index,
  duration = 2,
}: StatItemProps) {
  const t = useTranslations('stats');

  const gradients = [
    'from-blue-600 to-cyan-500',
    'from-purple-600 to-pink-500',
    'from-green-600 to-emerald-500',
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <ScrollReveal
      animation="fade-in-up"
      delay={index * 0.1}
      className="relative group"
    >
      <SpotlightCard
        className="h-full rounded-2xl"
        spotlightColor="rgba(59, 130, 246, 0.15)"
        spotlightSize={180}
        borderGlow={true}
      >
        <div className="relative p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden h-full text-center">
          {/* Subtle hover gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />

          {/* Value with Counter animation */}
          <div
            className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-3`}
          >
            <Counter
              end={value}
              suffix={suffix}
              prefix={prefix}
              decimals={decimals}
              duration={duration}
            />
          </div>

          {/* Label with proper contrast */}
          <div className="text-[var(--text-secondary)] font-medium text-lg">
            {t(labelKey)}
          </div>

          {/* Decorative line */}
          <div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient}`}
            style={{ width: '100%' }}
          />
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}

export function StatsSection() {
  const t = useTranslations('stats');

  const stats: Array<{
    value: number;
    suffix: string;
    prefix?: string;
    decimals?: number;
    labelKey: string;
    duration: number;
  }> = [
    {
      value: STATS.SHIPMENTS.value,
      suffix: STATS.SHIPMENTS.suffix,
      labelKey: 'shipments',
      duration: 2,
    },
    {
      value: STATS.COUNTRIES.value,
      suffix: STATS.COUNTRIES.suffix,
      labelKey: 'countries',
      duration: 1.5,
    },
    {
      value: STATS.RATING.value,
      suffix: STATS.RATING.suffix,
      decimals: STATS.RATING.decimals,
      labelKey: 'rating',
      duration: 1.5,
    },
  ];

  return (
    <section
      id={SECTION_IDS.STATS}
      className="relative py-16 md:py-24 overflow-hidden bg-[var(--background)]"
    >
      {/* Grid Pattern Background - creates precision/tech feeling */}
      <GridPattern
        type="dots"
        size={32}
        opacity={0.05}
        className="absolute inset-0 w-full h-full"
        color="var(--color-primary-500)"
      />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-in-up" className="text-center mb-12">
          <motion.span 
            className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('sectionLabel') || 'Nos Chiffres'}
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            <GradientText gradient="from-blue-400 via-purple-500 to-pink-500">
              {t('title') || 'Des Résultats qui Parlent'}
            </GradientText>
          </h2>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '96px' }}
          />
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.labelKey}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals}
              labelKey={stat.labelKey}
              index={index}
              duration={stat.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
