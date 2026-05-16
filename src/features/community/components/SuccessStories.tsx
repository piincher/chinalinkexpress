/**
 * Success Stories Section
 *
 * Community member quotes highlighting real benefits from the group.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, TrendingUp, PiggyBank, ShieldAlert } from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';
import { successStories } from '../data';

const metricConfig = [
  {
    icon: TrendingUp,
    value: '-25%',
    label: 'Coûts',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: PiggyBank,
    value: '$800',
    label: 'Économisés',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: ShieldAlert,
    value: '1 arnaque',
    label: 'Évitée',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
];

export function SuccessStories() {
  const { ref, isActive } = useAnimationActivation({ threshold: 0.15, delay: 100 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ils ont transformé leur business
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Des histoires réelles d&apos;importateurs africains qui ont bénéficié
            de la communauté ChinaLink.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Stories grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {successStories.map((story, index) => {
            const metric = metricConfig[index];
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Gradient border on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-amber-500/0 group-hover:from-amber-500/30 group-hover:via-orange-500/30 group-hover:to-amber-500/30 rounded-2xl transition-all duration-500" />

                <div className="relative h-full bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5 group-hover:border-white/10 transition-all duration-300">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-slate-700 mb-4" />

                  {/* Quote text */}
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 min-h-[80px]">
                    {story.quoteFr}
                  </p>

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-lg">
                        {story.countryFlag}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{story.author}</p>
                        <p className="text-xs text-slate-500">{story.location}</p>
                      </div>
                    </div>

                    {/* Metric badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${metric.bg} ${metric.border} border`}
                    >
                      <metric.icon className={`w-3.5 h-3.5 ${metric.color}`} />
                      <span className={`text-sm font-bold ${metric.color}`}>
                        {metric.value}
                      </span>
                    </div>
                  </div>

                  {/* Metric label */}
                  <p className={`text-xs mt-2 text-right ${metric.color}`}>
                    {metric.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
