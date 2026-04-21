/**
 * Pricing Hero
 * 
 * Hero section for the pricing page with gradient background.
 * Leads with speed — Flash Express 2-5 days is the anchor.
 * Part of the pricing feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Zap, Clock, TrendingUp, Star } from 'lucide-react';

export function PricingHero() {
  const t = useTranslations('pricing');

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Speed Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-amber-950 rounded-full text-sm font-bold mb-6 shadow-lg shadow-amber-400/20"
          >
            <Zap className="w-4 h-4 fill-current" />
            {t('hero.speedBadge')}
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>

          {/* Speed Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
              <Zap className="w-5 h-5 text-amber-300" />
              <span className="font-semibold">{t('hero.stats.express')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
              <Clock className="w-5 h-5 text-blue-300" />
              <span className="font-semibold">{t('hero.stats.standard')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="font-semibold">{t('hero.stats.sea')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-xl text-amber-100 border border-amber-400/30">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-semibold">
                {t('hero.stats.reviews', { defaultValue: '4.8 ★ — 312 avis' })}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
