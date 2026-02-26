/**
 * Why Us Section Component
 * 
 * Clean value proposition with static feature cards.
 * Part of the landing page feature.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { SECTION_IDS } from '../constants';

const WHY_US_KEYS = ['speed', 'reliability', 'price', 'expertise'] as const;

const WHY_US_ICONS = ['⚡', '🛡️', '💎', '🎯'];
const WHY_US_COLORS = [
  'from-orange-400 to-red-500',
  'from-green-400 to-emerald-500',
  'from-blue-400 to-cyan-500',
  'from-purple-400 to-pink-500',
];

interface WhyUsCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
}

function WhyUsCard({ title, description, icon, color }: WhyUsCardProps) {
  return (
    <div className="group relative">
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
        {/* Gradient border top */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`} />
        
        {/* Subtle hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Icon container */}
        <div className="relative w-20 h-20 mb-6 group-hover:scale-105 transition-transform duration-300">
          {/* Background circle */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-20`} />
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WhyUsSection() {
  const t = useTranslations('whyUs');

  return (
    <section id={SECTION_IDS.WHY_US} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 dark:from-slate-900 via-white dark:via-slate-950 to-gray-50 dark:to-slate-900" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 dark:from-blue-900/30 to-cyan-100 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            {t('sectionLabel') || 'Pourquoi Nous Choisir'}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_US_KEYS.map((key, index) => (
            <WhyUsCard
              key={key}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
              icon={WHY_US_ICONS[index]}
              color={WHY_US_COLORS[index]}
            />
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            { icon: '🔒', text: 'Paiement Sécurisé' },
            { icon: '📞', text: 'Support 24/7' },
            { icon: '📋', text: 'Documentation Complète' },
            { icon: '🤝', text: 'Partenaires Certifiés' },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>{badge.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
