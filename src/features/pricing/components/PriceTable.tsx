/**
 * Price Table
 * 
 * Displays freight rates in a clear tabular format.
 * Part of the pricing feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plane, Ship, Clock, Info, Lightbulb, TrendingDown, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIR_RATES, SEA_RATES, DELIVERY_PERFORMANCE } from '../constants';
import { formatPriceFCFA } from '../lib/pricingEngine';

export function PriceTable() {
  const t = useTranslations('pricing');

  const expressRate = AIR_RATES.find((r) => r.category === 'express');
  const standardRate = AIR_RATES.find((r) => r.category === 'standard');
  const savingsPercent = expressRate && standardRate
    ? Math.floor(((expressRate.rateFCFA - standardRate.rateFCFA) / expressRate.rateFCFA) * 100)
    : 37;

  const getPerformanceKey = (category: string) => {
    switch (category) {
      case 'express': return 'flashExpress';
      case 'standard': return 'airStandard';
      default: return null;
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('priceTable.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('priceTable.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Air Freight Rates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('modes.air')}</h3>
                  <p className="text-blue-100 text-sm">{t('priceTable.air.description')}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {AIR_RATES.map((rate, index) => {
                  const perfKey = getPerformanceKey(rate.category);
                  const perf = perfKey ? DELIVERY_PERFORMANCE[perfKey] : null;
                  const isStandard = rate.category === 'standard';

                  return (
                    <motion.div
                      key={rate.category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl relative',
                        rate.category === 'express' 
                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800' 
                          : isStandard
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800'
                            : index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-transparent'
                      )}
                    >
                      {rate.category === 'express' && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                          EXPRESS
                        </div>
                      )}
                      {isStandard && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          {t('smartChoice.badge')}
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          rate.category === 'express'
                            ? 'bg-amber-100 dark:bg-amber-900/50'
                            : isStandard
                              ? 'bg-blue-100 dark:bg-blue-900/50'
                              : 'bg-blue-100 dark:bg-blue-900/30'
                        )}>
                          <span className="text-lg">{rate.emoji}</span>
                        </div>
                        <div>
                          <div className={cn(
                            "font-semibold",
                            rate.category === 'express'
                              ? 'text-amber-900 dark:text-amber-100'
                              : isStandard
                                ? 'text-blue-900 dark:text-blue-100'
                                : 'text-gray-900 dark:text-white'
                          )}>
                            {t(`categories.${rate.category}.name`)}
                          </div>
                          <div className={cn(
                            "flex items-center gap-2 text-xs",
                            rate.category === 'express'
                              ? 'text-amber-700 dark:text-amber-400'
                              : isStandard
                                ? 'text-blue-700 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400'
                          )}>
                            <Clock className="w-3 h-3" />
                            {rate.deliveryTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "text-xl font-bold",
                          rate.category === 'express'
                            ? 'text-amber-600 dark:text-amber-400'
                            : isStandard
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-blue-600 dark:text-blue-400'
                        )}>
                          {formatPriceFCFA(rate.rateFCFA)}
                        </div>
                        <div className={cn(
                          "text-xs",
                          rate.category === 'express'
                            ? 'text-amber-600 dark:text-amber-500'
                            : isStandard
                              ? 'text-blue-600 dark:text-blue-500'
                              : 'text-gray-500 dark:text-gray-400'
                        )}>
                          /{t(`categories.${rate.category}.unit`)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Speed Comparison Hint */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span>{t('priceTable.comparisonHint')}</span>
                </div>
              </motion.div>

              {/* Smart Choice Note for Standard */}
              {standardRate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <p className="font-medium">{t('smartChoice.description')}</p>
                      <p className="mt-1 text-xs">
                        {t('savings.vsExpress', { percent: savingsPercent })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Delivery Performance Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {t('deliveryPerformance.title')}
                  </span>
                </div>
                <div className="space-y-2">
                  {(['flashExpress', 'airStandard'] as const).map((key) => {
                    const perf = DELIVERY_PERFORMANCE[key];
                    const isExpress = key === 'flashExpress';
                    return (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className={cn(
                          "font-medium",
                          isExpress ? 'text-amber-700 dark:text-amber-400' : 'text-blue-700 dark:text-blue-400'
                        )}>
                          {isExpress ? 'Flash Express' : 'Air Standard'}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 dark:text-gray-400">
                            {t('deliveryPerformance.quoted')}: {perf.quoted}
                          </span>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {t('deliveryPerformance.actualAverage')}: {perf.actualAverage}j
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Air Note */}
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    {t('priceTable.air.note')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sea Freight Rates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Ship className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('modes.sea')}</h3>
                  <p className="text-indigo-100 text-sm">{t('priceTable.sea.description')}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Sea Rate Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl relative"
              >
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  {t('result.patientImporter')}
                </div>
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {formatPriceFCFA(SEA_RATES.rateFCFA)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">/ CBM</div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  {SEA_RATES.deliveryTime}
                </div>
              </motion.div>

              {/* Sea Details */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t('priceTable.sea.minCBM')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{SEA_RATES.minCBM} CBM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t('priceTable.sea.densityThreshold')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">250 kg/m³</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">{t('priceTable.sea.adjustment')}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Weight × 0.005</span>
                </div>
              </div>

              {/* Sea Delivery Performance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {t('deliveryPerformance.title')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-indigo-700 dark:text-indigo-400">
                    Sea Economy
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      {t('deliveryPerformance.quoted')}: {DELIVERY_PERFORMANCE.seaEconomy.quoted}
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {t('deliveryPerformance.actualAverage')}: {DELIVERY_PERFORMANCE.seaEconomy.actualAverage}j
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Sea Note */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t('priceTable.sea.note')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Delivery Performance Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5" />
            <h3 className="text-lg font-bold">{t('deliveryPerformance.subtitle')}</h3>
          </div>
          <p className="text-white/90 text-sm max-w-xl mx-auto">
            {t('deliveryPerformance.earlyDeliveryStat')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            {(['flashExpress', 'airStandard', 'seaEconomy'] as const).map((key) => {
              const perf = DELIVERY_PERFORMANCE[key];
              return (
                <div key={key} className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="font-medium">{perf.onTimeRate}%</span>
                  <span className="ml-1 opacity-80">{t('deliveryPerformance.onTimeRate')}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
