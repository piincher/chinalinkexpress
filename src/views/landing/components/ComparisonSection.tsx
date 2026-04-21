/**
 * Comparison Section Component
 *
 * "What We Do That Others Don't" - Visual comparison showing
 * ChinaLink's full-service offering vs typical freight forwarders.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-animations';
import { SpotlightCard, GradientTextEnhanced as GradientText } from '@/components/animations';
import { useAnimationActivation } from '@/hooks/animation';
import { SECTION_IDS } from '../constants';

interface ComparisonFeature {
  key: string;
}

const FEATURES: ComparisonFeature[] = [
  { key: 'sourcing' },
  { key: 'qualityControl' },
  { key: 'payment' },
  { key: 'multiCountry' },
  { key: 'consolidation' },
  { key: 'customs' },
  { key: 'doorToDoor' },
];

function CheckIcon() {
  return (
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function XIcon() {
  return (
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
      <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

export function ComparisonSection() {
  const t = useTranslations('comparison');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.1,
    delay: 200,
  });

  return (
    <section
      id={SECTION_IDS.COMPARISON}
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface)]"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary-500) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.06,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-in-up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            <GradientText colors={['#059669', '#10b981', '#059669']} duration={4}>
              {t('title')}
            </GradientText>
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          <div
            className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto mt-6 rounded-full"
            style={{ width: '96px' }}
          />
        </ScrollReveal>

        {/* Column Headers - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
              <span className="text-2xl">🚀</span>
              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                {t('chinaLinkColumn')}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl">
              <span className="text-2xl">📦</span>
              <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                {t('othersColumn')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-4">
          {FEATURES.map((feature, index) => (
            <ScrollReveal
              key={feature.key}
              animation="fade-in-up"
              delay={index * 80}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* ChinaLink Card */}
                <SpotlightCard
                  className="relative rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/10 backdrop-blur-sm"
                  spotlightColor="rgba(16, 185, 129, 0.15)"
                  spotlightSize={200}
                  borderGlow={false}
                >
                  <div className="p-5 md:p-6 flex items-start gap-4">
                    <CheckIcon />
                    <div className="flex-1 min-w-0">
                      {/* Mobile: show column label */}
                      <div className="md:hidden flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {t('chinaLinkColumn')}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                        {t(`features.${feature.key}.label`)}
                      </h3>
                      <p className="text-sm md:text-base text-emerald-700/80 dark:text-emerald-400/80">
                        {t(`features.${feature.key}.us`)}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                {/* Others Card */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/20 backdrop-blur-sm">
                  <div className="p-5 md:p-6 flex items-start gap-4">
                    <XIcon />
                    <div className="flex-1 min-w-0">
                      {/* Mobile: show column label */}
                      <div className="md:hidden flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {t('othersColumn')}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-gray-700 dark:text-gray-300 mb-1 line-through decoration-red-400/60">
                        {t(`features.${feature.key}.label`)}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                        {t(`features.${feature.key}.them`)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal animation="fade-in-up" delay={200} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/20">
            <span className="text-2xl">✨</span>
            <span className="text-white font-bold text-lg">
              {t('ctaText')}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ComparisonSection;
