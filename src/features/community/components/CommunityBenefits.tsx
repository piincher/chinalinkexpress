/**
 * Community Benefits Section
 *
 * 6 benefit cards in a responsive grid with framer-motion hover effects.
 * Warm amber/orange color accents for community feel.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Lightbulb,
  ShieldCheck,
  Bell,
  Users,
  MessageCircle,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

interface BenefitConfig {
  icon: LucideIcon;
  key: string;
  gradient: string;
  bgLight: string;
  bgDark: string;
  iconColor: string;
}

const BENEFITS: BenefitConfig[] = [
  {
    icon: Lightbulb,
    key: 'importTips',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: ShieldCheck,
    key: 'verifiedSuppliers',
    gradient: 'from-orange-500 to-red-500',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: Bell,
    key: 'productAlerts',
    gradient: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-900/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: Users,
    key: 'groupBuying',
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: MessageCircle,
    key: 'support247',
    gradient: 'from-teal-500 to-cyan-500',
    bgLight: 'bg-teal-50',
    bgDark: 'dark:bg-teal-900/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    icon: Globe,
    key: 'localNetwork',
    gradient: 'from-cyan-500 to-blue-500',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-900/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
];

function BenefitCard({
  config,
  index,
  isActive,
}: {
  config: BenefitConfig;
  index: number;
  isActive: boolean;
}) {
  const t = useTranslations('community');
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Top gradient border */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`}
        />

        {/* Hover glow effect */}
        <div
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}
        />

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl ${config.bgLight} ${config.bgDark} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-7 h-7 ${config.iconColor}`} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {t(`benefits.items.${config.key}.title`, {
            defaultValue: config.key,
          })}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t(`benefits.items.${config.key}.description`, {
            defaultValue: '',
          })}
        </p>
      </div>
    </motion.div>
  );
}

export function CommunityBenefits() {
  const t = useTranslations('community');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.15,
    delay: 100,
  });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-b from-gray-50 dark:from-slate-900 via-white dark:via-slate-950 to-gray-50 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
            <Lightbulb className="w-4 h-4" />
            {t('benefits.badge', { defaultValue: 'Avantages exclusifs' })}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('benefits.title', {
              defaultValue: 'Ce que vous gagnez en rejoignant',
            })}
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((config, index) => (
            <BenefitCard
              key={config.key}
              config={config}
              index={index}
              isActive={isActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
