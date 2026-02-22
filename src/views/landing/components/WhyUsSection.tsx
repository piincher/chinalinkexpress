/**
 * Why Us Section Component
 * 
 * Animated value proposition with feature cards that reveal on scroll,
 * hover effects, and animated icons.
 * Part of the landing page feature.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AnimatedSection, SplitText } from '@/components/animations';
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
  index: number;
}

function WhyUsCard({ title, description, icon, color, index }: WhyUsCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg overflow-hidden h-full"
        whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient border top */}
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
        />
        
        {/* Hover gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />
        
        {/* Icon container */}
        <motion.div
          className="relative w-20 h-20 mb-6"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background circle */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-20`}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          />
          
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {icon}
          </div>
          
          {/* Decorative ring */}
          <motion.div
            className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-r ${color} opacity-30`}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ borderStyle: 'dashed' }}
          />
        </motion.div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
        
        {/* Animated arrow */}
        <motion.div
          className="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="mr-2">En savoir plus</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
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
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 dark:from-blue-900/30 to-cyan-100 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              {t('whyUs.sectionLabel') || 'Pourquoi Nous Choisir'}
            </span>
          </AnimatedSection>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <SplitText animation="fadeUp">
              {t('title')}
            </SplitText>
          </h2>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
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
              index={index}
            />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: '🔒', text: 'Paiement Sécurisé' },
            { icon: '📞', text: 'Support 24/7' },
            { icon: '📋', text: 'Documentation Complète' },
            { icon: '🤝', text: 'Partenaires Certifiés' },
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span>{badge.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUsSection;
