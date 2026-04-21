/**
 * Damage Guarantee Section
 *
 * Prominent trust-building section with shield/badge aesthetic.
 * Highlights ChinaLink's damage coverage guarantee.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Shield,
  ClipboardCheck,
  Package,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';

const TRUST_POINTS = [
  {
    key: 'handling',
    icon: Shield,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    key: 'quality',
    icon: ClipboardCheck,
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
  },
  {
    key: 'packaging',
    icon: Package,
    iconColor: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
  },
  {
    key: 'refund',
    icon: RefreshCw,
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function DamageGuaranteeSection() {
  const t = useTranslations('damageGuarantee');

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-semibold text-white/90">
              {t('badge')}
            </span>
          </motion.div>

          {/* Large shield icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150" />
              <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Shield className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto leading-tight">
            {t('headline')}
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t('subheadline')}
          </p>
        </motion.div>

        {/* Trust points cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TRUST_POINTS.map(({ key, icon: Icon, iconColor, bgColor }) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bgColor} mb-4`}
                >
                  <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(`points.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  {t(`points.${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://wa.me/8618851725957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('cta')}</span>
          </a>
          <p className="mt-3 text-sm text-blue-200/80">
            {t('ctaSubtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default DamageGuaranteeSection;
