/**
 * Member Testimonials Section
 *
 * 3 community member testimonials with avatars, quotes, and metric badges.
 * Scroll-triggered entrance animations.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote, TrendingUp, PiggyBank, ShieldAlert, type LucideIcon } from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

interface TestimonialConfig {
  key: string;
  name: string;
  countryFlag: string;
  country: string;
  metricIcon: LucideIcon;
  metricValue: string;
  metricLabel: string;
  metricColor: string;
  metricBg: string;
  borderGradient: string;
}

const TESTIMONIALS: TestimonialConfig[] = [
  {
    key: 'amadou',
    name: 'Amadou',
    countryFlag: '🇲🇱',
    country: 'Mali',
    metricIcon: TrendingUp,
    metricValue: '2x',
    metricLabel: 'CA doublé',
    metricColor: 'text-emerald-700 dark:text-emerald-400',
    metricBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    borderGradient: 'from-emerald-500 to-teal-500',
  },
  {
    key: 'fatou',
    name: 'Fatou',
    countryFlag: '🇲🇱',
    country: 'Mali',
    metricIcon: PiggyBank,
    metricValue: '-30%',
    metricLabel: 'économie',
    metricColor: 'text-amber-700 dark:text-amber-400',
    metricBg: 'bg-amber-100 dark:bg-amber-900/30',
    borderGradient: 'from-amber-500 to-orange-500',
  },
  {
    key: 'kofi',
    name: 'Kofi',
    countryFlag: '🇲🇱',
    country: 'Mali',
    metricIcon: ShieldAlert,
    metricValue: '5000€',
    metricLabel: 'économisés',
    metricColor: 'text-rose-700 dark:text-rose-400',
    metricBg: 'bg-rose-100 dark:bg-rose-900/30',
    borderGradient: 'from-rose-500 to-pink-500',
  },
];

function TestimonialCard({
  config,
  index,
  isActive,
}: {
  config: TestimonialConfig;
  index: number;
  isActive: boolean;
}) {
  const t = useTranslations('community');
  const MetricIcon = config.metricIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Gradient border effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${config.borderGradient} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Quote icon */}
        <Quote className="w-8 h-8 text-gray-200 dark:text-gray-700 mb-4" />

        {/* Quote text */}
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6 min-h-[80px]">
          {t(`testimonials.${config.key}.quote`)}
        </p>

        {/* Author info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-lg">
              {config.countryFlag}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {config.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {config.country}
              </p>
            </div>
          </div>

          {/* Metric badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.metricBg}`}>
            <MetricIcon className={`w-3.5 h-3.5 ${config.metricColor}`} />
            <span className={`text-sm font-bold ${config.metricColor}`}>
              {config.metricValue}
            </span>
          </div>
        </div>

        {/* Metric label */}
        <p className={`text-xs mt-2 text-right ${config.metricColor}`}>
          {config.metricLabel}
        </p>
      </div>
    </motion.div>
  );
}

export function MemberTestimonials() {
  const { ref, isActive } = useAnimationActivation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ils ont transformé leur business
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Des importateurs maliens qui ont sécurisé leur approvisionnement avec ChinaLink
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.key}
              config={testimonial}
              index={index}
              isActive={isActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
