/**
 * Trust Flow Section Component
 *
 * 6-step process highlighting ChinaLink's full-service advantage.
 * Steps 1-3 = what competitors DON'T do. Steps 4-6 = where competitors start.
 * Key message: "Their process starts at step 4. Ours starts at step 1."
 *
 * Features:
 * - Staggered fade-in animation on scroll (framer-motion)
 * - Responsive: horizontal on desktop, vertical on mobile
 * - Dark mode support
 * - Visual distinction between ChinaLink-only steps (1-3) and shared steps (4-6)
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  MessageSquare,
  Search,
  Camera,
  Zap,
  MapPin,
  PackageCheck,
  ChevronRight,
  ArrowDown,
  Sparkles,
  X,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/animation';

const STEPS_CONFIG = [
  {
    icon: MessageSquare,
    gradient: 'from-blue-500 to-blue-700',
    lightBg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    ringColor: 'ring-blue-500/30',
    advantage: true,
  },
  {
    icon: Search,
    gradient: 'from-indigo-500 to-indigo-700',
    lightBg: 'bg-indigo-50',
    darkBg: 'dark:bg-indigo-900/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    ringColor: 'ring-indigo-500/30',
    advantage: true,
  },
  {
    icon: Camera,
    gradient: 'from-violet-500 to-violet-700',
    lightBg: 'bg-violet-50',
    darkBg: 'dark:bg-violet-900/20',
    textColor: 'text-violet-600 dark:text-violet-400',
    ringColor: 'ring-violet-500/30',
    advantage: true,
  },
  {
    icon: Zap,
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    darkBg: 'dark:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    ringColor: 'ring-amber-500/30',
    advantage: false,
  },
  {
    icon: MapPin,
    gradient: 'from-sky-500 to-cyan-600',
    lightBg: 'bg-sky-50',
    darkBg: 'dark:bg-sky-900/20',
    textColor: 'text-sky-600 dark:text-sky-400',
    ringColor: 'ring-sky-500/30',
    advantage: false,
  },
  {
    icon: PackageCheck,
    gradient: 'from-emerald-500 to-emerald-700',
    lightBg: 'bg-emerald-50',
    darkBg: 'dark:bg-emerald-900/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    ringColor: 'ring-emerald-500/30',
    advantage: false,
  },
] as const;

interface StepConfig {
  icon: LucideIcon;
  gradient: string;
  lightBg: string;
  darkBg: string;
  textColor: string;
  ringColor: string;
  advantage: boolean;
}

interface TrustStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  config: StepConfig;
  isActive: boolean;
}

function TrustStep({
  icon: Icon,
  title,
  description,
  index,
  config,
  isActive,
}: TrustStepProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center text-center flex-1"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.12 * index, ease: 'easeOut' }}
    >
      {/* Advantage badge for steps 1-3 */}
      {config.advantage && (
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.12 * index + 0.15 }}
        >
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            ChinaLink
          </span>
        </motion.div>
      )}

      {/* Card */}
      <div className="relative w-full">
        <div
          className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border h-full ${
            config.advantage
              ? 'border-blue-200 dark:border-blue-800 ring-2 ring-transparent hover:ring-blue-500/20'
              : 'border-gray-100 dark:border-gray-700'
          }`}
        >
          {/* Top gradient border */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} rounded-t-2xl`}
          />

          {/* Icon container */}
          <div
            className={`w-14 h-14 mx-auto mb-3 rounded-xl ${config.lightBg} ${config.darkBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
          >
            <Icon className={`w-7 h-7 ${config.textColor}`} strokeWidth={2} />
          </div>

          {/* Step number */}
          <span
            className={`inline-block text-xs font-bold uppercase tracking-wider mb-1 ${config.textColor}`}
          >
            {index + 1}
          </span>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StepConnector({ isActive, index }: { isActive: boolean; index: number }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center flex-shrink-0 w-6 -mt-6"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.12 * index + 0.08 }}
    >
      <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
    </motion.div>
  );
}

function MobileConnector({ isActive, index }: { isActive: boolean; index: number }) {
  return (
    <motion.div
      className="flex md:hidden items-center justify-center py-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.12 * index + 0.08 }}
    >
      <ArrowDown className="w-4 h-4 text-gray-300 dark:text-gray-600" />
    </motion.div>
  );
}

export function TrustFlowSection() {
  const t = useTranslations('trustFlow');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.15,
    delay: 100,
  });

  const steps = [
    { title: t('steps.0.title'), description: t('steps.0.description') },
    { title: t('steps.1.title'), description: t('steps.1.description') },
    { title: t('steps.2.title'), description: t('steps.2.description') },
    { title: t('steps.3.title'), description: t('steps.3.description') },
    { title: t('steps.4.title'), description: t('steps.4.description') },
    { title: t('steps.5.title'), description: t('steps.5.description') },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 dark:from-slate-900 via-white dark:via-slate-950 to-gray-50 dark:to-slate-900"
    >
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-100 dark:from-blue-900/30 to-emerald-100 dark:to-emerald-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            {t('badge', { defaultValue: 'Service complet' })}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('headline', { defaultValue: 'De la commande à la livraison, on gère tout' })}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subheadline', { defaultValue: 'Un seul partenaire pour les 6 étapes. Pas 4 fournisseurs différents.' })}
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Steps Flow */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-0 md:gap-1">
          {STEPS_CONFIG.map((config, index) => (
            <React.Fragment key={index}>
              <TrustStep
                icon={config.icon}
                title={steps[index].title}
                description={steps[index].description}
                index={index}
                config={config}
                isActive={isActive}
              />
              {index < STEPS_CONFIG.length - 1 && (
                <>
                  <StepConnector isActive={isActive} index={index} />
                  <MobileConnector isActive={isActive} index={index} />
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Comparison Strip */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-750 border-b border-gray-100 dark:border-gray-700">
              <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('comparison.label', { defaultValue: 'Qui fait quoi ?' })}
              </p>
            </div>

            {/* Comparison rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
              {/* ChinaLink */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {t('comparison.us.label', { defaultValue: 'ChinaLink' })}
                  </h4>
                  <span className="ml-auto text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                    {t('comparison.us.badge', { defaultValue: '6 étapes' })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold"
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {t('comparison.us.description', { defaultValue: 'Du sourcing à la livraison. Un seul contact.' })}
                </p>
              </div>

              {/* Competitors */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {t('comparison.them.label', { defaultValue: 'Les autres' })}
                  </h4>
                  <span className="ml-auto text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    {t('comparison.them.badge', { defaultValue: '3 étapes' })}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 text-sm font-bold"
                    >
                      <X className="w-4 h-4" />
                    </span>
                  ))}
                  {[4, 5, 6].map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold"
                    >
                      {n}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {t('comparison.them.description', { defaultValue: 'Expédition uniquement. Vous gérez le reste seul.' })}
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-emerald-50 dark:to-emerald-900/20 border-t border-gray-100 dark:border-gray-700">
              <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t('comparison.cta', { defaultValue: 'Leur processus commence à l\'étape 4. Le nôtre commence à l\'étape 1.' })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TrustFlowSection;
