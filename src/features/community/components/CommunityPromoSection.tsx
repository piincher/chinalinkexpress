/**
 * Community Promo Section
 *
 * Compact homepage promo driving users to the community page.
 * Warm amber/orange gradient with pattern overlay.
 * Framer Motion animations. Dark mode support.
 */

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const PILL_KEYS = ['freeTips', 'verifiedSuppliers', 'productAlerts'] as const;

export function CommunityPromoSection() {
  const t = useTranslations('community');

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Warm amber/orange gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/30" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-300/20 dark:bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className={cn(
            'relative rounded-3xl overflow-hidden border shadow-xl',
            'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm',
            'border-amber-200 dark:border-amber-900/30',
            'shadow-amber-100/50 dark:shadow-amber-900/20'
          )}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Inner gradient accent strip at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

          <div className="p-8 md:p-12 lg:p-14">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left: Text content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 mb-4">
                  <Users className="w-3.5 h-3.5" />
                  {t('promo.badge', { defaultValue: 'Communauté' })}
                </div>

                {/* Headline */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-3 leading-tight">
                  {t('promo.title', { defaultValue: 'Rejoignez +500 importateurs' })}
                </h3>

                {/* Subheadline */}
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-6">
                  {t('promo.subtitle', {
                    defaultValue:
                      'Conseils, fournisseurs vérifiés et alertes produits — chaque jour sur WhatsApp.',
                  })}
                </p>

                {/* Benefit pills */}
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {PILL_KEYS.map((key, index) => (
                    <motion.span
                      key={key}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                        'bg-amber-50 dark:bg-amber-950/30',
                        'text-amber-700 dark:text-amber-400',
                        'border border-amber-100 dark:border-amber-900/30'
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                      {t(`promo.pills.${key}`, {
                        defaultValue:
                          key === 'freeTips'
                            ? 'Conseils gratuits'
                            : key === 'verifiedSuppliers'
                            ? 'Fournisseurs vérifiés'
                            : 'Alertes produits',
                      })}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 flex-shrink-0"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Primary CTA — green WhatsApp-style */}
                <a
                  href="/communaute"
                  className={cn(
                    'group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105 shadow-lg',
                    'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
                    'hover:shadow-green-500/25'
                  )}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {t('promo.ctaPrimary', { defaultValue: 'Rejoindre la communauté' })}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                {/* Secondary CTA — outline */}
                <a
                  href="/communaute"
                  className={cn(
                    'inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105',
                    'border-2 border-amber-300 dark:border-amber-700',
                    'text-amber-700 dark:text-amber-400',
                    'hover:bg-amber-50 dark:hover:bg-amber-950/30'
                  )}
                >
                  <span>
                    {t('promo.ctaSecondary', { defaultValue: 'En savoir plus' })}
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CommunityPromoSection;
