/**
 * Community Topics Section
 *
 * 4 topic preview cards showing discussion categories.
 * Glassmorphism cards with gradient borders.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  TrendingUp,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

interface TopicConfig {
  icon: LucideIcon;
  key: string;
  gradient: string;
  borderGradient: string;
  iconBg: string;
  iconColor: string;
  tags: string[];
  discussionCount: number;
}

const TOPICS: TopicConfig[] = [
  {
    icon: TrendingUp,
    key: 'trendingProducts',
    gradient: 'from-violet-500/10 to-purple-500/10',
    borderGradient: 'from-violet-500 via-purple-500 to-violet-500',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    tags: ['Électronique', 'Textiles', 'Cosmétiques'],
    discussionCount: 127,
  },
  {
    icon: ShieldCheck,
    key: 'reliableSuppliers',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    borderGradient: 'from-emerald-500 via-teal-500 to-emerald-500',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    tags: ['Alibaba', 'Visites usines', 'Vérification'],
    discussionCount: 94,
  },
  {
    icon: Truck,
    key: 'logisticsCustoms',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    borderGradient: 'from-blue-500 via-cyan-500 to-blue-500',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    tags: ['Tarifs fret', 'Dédouanement', 'Assurance'],
    discussionCount: 83,
  },
  {
    icon: CreditCard,
    key: 'financePayment',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderGradient: 'from-amber-500 via-orange-500 to-amber-500',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    tags: ['Taux de change', 'Moyens de paiement', 'Sécurité'],
    discussionCount: 56,
  },
];

function TopicCard({
  config,
  index,
  isActive,
}: {
  config: TopicConfig;
  index: number;
  isActive: boolean;
}) {
  const t = useTranslations('community');
  const Icon = config.icon;

  const tags = [
    t(`topics.${config.key}.tags.0`, { defaultValue: config.tags[0] }),
    t(`topics.${config.key}.tags.1`, { defaultValue: config.tags[1] }),
    t(`topics.${config.key}.tags.2`, { defaultValue: config.tags[2] }),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.12 * index, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative"
    >
      {/* Gradient border container */}
      <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 group-hover:bg-gradient-to-br group-hover:from-amber-400/50 group-hover:via-orange-400/50 group-hover:to-amber-400/50 transition-all duration-500">
        <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 overflow-hidden">
          {/* Background gradient glow */}
          <div
            className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <div className="relative">
            {/* Icon & Title row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center`}
              >
                <Icon className={`w-6 h-6 ${config.iconColor}`} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t(`topics.${config.key}.title`, {
                  defaultValue: config.key,
                })}
              </h3>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Discussion count */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-4 h-4" />
              <span>
                {config.discussionCount}{' '}
                {t('topics.discussions', {
                  defaultValue: 'discussions actives',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CommunityTopics() {
  const t = useTranslations('community');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.15,
    delay: 100,
  });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-b from-white dark:from-slate-950 via-gray-50 dark:via-slate-900 to-white dark:to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            <MessageSquare className="w-4 h-4" />
            {t('topics.badge', { defaultValue: 'Discussions en cours' })}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('topics.title', {
              defaultValue: 'De quoi parle-t-on ?',
            })}
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOPICS.map((config, index) => (
            <TopicCard
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
