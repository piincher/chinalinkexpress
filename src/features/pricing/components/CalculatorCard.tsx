/**
 * Calculator Card
 * 
 * Main calculator container with mode selector and calculators.
 * Part of the pricing feature.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePricingStore } from '../store/usePricingStore';
import { ModeSelector } from './ModeSelector';
import { AirCalculator } from './AirCalculator';
import { SeaCalculator } from './SeaCalculator';

export function CalculatorCard() {
  const t = useTranslations('pricing');
  const { mode } = usePricingStore();

  return (
    <section className="py-12 -mt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
              {t('calculator.title')}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
              {t('calculator.subtitle')}
            </p>
          </div>

          {/* Mode Selector */}
          <div className="pt-6">
            <ModeSelector />
          </div>

          {/* Calculator Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {mode === 'air' ? (
                <motion.div
                  key="air"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AirCalculator />
                </motion.div>
              ) : (
                <motion.div
                  key="sea"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SeaCalculator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
