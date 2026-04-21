/**
 * Success Stories Section Component
 *
 * Client success stories showing Problem → Solution → Result flow.
 * Uses card-based design with scroll-triggered animations.
 * Part of the landing page feature.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SECTION_IDS } from '../constants';
import { SpotlightCard } from '@/components/animations';
import { ScrollReveal } from '@/components/scroll-animations';

interface StoryConfig {
  id: string;
  initials: string;
  avatarBg: string;
  metricIcon: string;
}

const STORY_CONFIGS: StoryConfig[] = [
  {
    id: 'toure',
    initials: 'IT',
    avatarBg: 'from-blue-500 to-cyan-500',
    metricIcon: '💰',
  },
  {
    id: 'aminata',
    initials: 'AK',
    avatarBg: 'from-purple-500 to-pink-500',
    metricIcon: '📈',
  },
  {
    id: 'ousmane',
    initials: 'ON',
    avatarBg: 'from-emerald-500 to-teal-500',
    metricIcon: '⚡',
  },
];

function ArrowIcon() {
  return (
    <div className="flex items-center justify-center py-2">
      <svg
        className="w-5 h-5 text-[var(--text-muted)] rotate-90 md:rotate-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  );
}

function StoryCard({ config, index }: { config: StoryConfig; index: number }) {
  const t = useTranslations('successStories');
  const storyKey = config.id as 'toure' | 'aminata' | 'ousmane';

  return (
    <ScrollReveal animation="fade-in-up" delay={index * 150}>
      <SpotlightCard
        className="h-full rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-lg"
        spotlightColor="rgba(59, 130, 246, 0.1)"
        spotlightSize={300}
        borderGlow={true}
      >
        <div className="relative p-6 md:p-8 h-full flex flex-col">
          {/* Top accent line */}
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-success)] rounded-full" />

          {/* Client Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
            >
              {config.initials}
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">
                {t(`stories.${storyKey}.name`)}
              </h3>
              <p className="text-sm text-[var(--text-tertiary)]">
                {t(`stories.${storyKey}.business`)}
              </p>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                <span>📍</span> {t(`stories.${storyKey}.location`)}
              </p>
            </div>
          </div>

          {/* Problem → Solution → Result Flow */}
          <div className="flex-1 flex flex-col md:flex-row md:items-stretch gap-2">
            {/* Problem */}
            <div className="flex-1 bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 border border-red-100 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  {t('problem')}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {t(`stories.${storyKey}.problem`)}
              </p>
            </div>

            {/* Arrow */}
            <ArrowIcon />

            {/* Solution */}
            <div className="flex-1 bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {t('solution')}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {t(`stories.${storyKey}.solution`)}
              </p>
            </div>

            {/* Arrow */}
            <ArrowIcon />

            {/* Result */}
            <div className="flex-1 bg-green-50 dark:bg-green-950/20 rounded-2xl p-4 border border-green-100 dark:border-green-900/30 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                  {t('result')}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {t(`stories.${storyKey}.result`)}
              </p>

              {/* Metric Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span>{config.metricIcon}</span>
                <span>{t(`stories.${storyKey}.metricValue`)}</span>
                <span className="text-xs font-medium opacity-90">{t(`stories.${storyKey}.metricLabel`)}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}

export function SuccessStoriesSection() {
  const t = useTranslations('successStories');

  return (
    <section
      id={SECTION_IDS.SUCCESS_STORIES}
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface-elevated)]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-in-up">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-700)]/20 dark:text-[var(--color-primary-light)] rounded-full text-sm font-semibold mb-4">
              {t('sectionLabel')}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              {t('title')}
            </h2>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-success)] mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 gap-8">
          {STORY_CONFIGS.map((config, index) => (
            <StoryCard key={config.id} config={config} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal animation="fade-in" delay={300}>
          <div className="mt-16 text-center">
            <motion.a
              href={`#${SECTION_IDS.CONTACT}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('ctaText')}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default SuccessStoriesSection;
