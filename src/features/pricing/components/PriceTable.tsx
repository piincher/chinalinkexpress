/**
 * Price Table
 * 
 * Displays freight rates in a clear tabular format.
 * Part of the pricing feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plane, Ship, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIR_RATES, SEA_RATES, ITEM_CATEGORIES } from '../constants';
import { formatPriceFCFA } from '../lib/pricingEngine';

export function PriceTable() {
  const t = useTranslations('pricing');

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
                {AIR_RATES.map((rate, index) => (
                  <motion.div
                    key={rate.category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-xl',
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-lg">{rate.emoji}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {t(`categories.${rate.category}.name`)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {rate.deliveryTime}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPriceFCFA(rate.rateFCFA)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        /{t(`categories.${rate.category}.unit`)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

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
                className="text-center p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl"
              >
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
      </div>
    </section>
  );
}
