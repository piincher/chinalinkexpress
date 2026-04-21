/**
 * Calculator Card
 *
 * Main calculator container with view selector (deadline-first vs classic mode).
 * Part of the pricing feature.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePricingStore } from '../store/usePricingStore';
import { ModeSelector } from './ModeSelector';
import { AirCalculator } from './AirCalculator';
import { SeaCalculator } from './SeaCalculator';
import { DeadlineCalculator } from './DeadlineCalculator';

export function CalculatorCard() {
  const t = useTranslations('pricing');
  const { view, setView, mode } = usePricingStore();

  const views = [
    { id: 'deadline' as const, label: t('calculator.deadlineView', { defaultValue: 'Par Deadline' }), icon: <Clock className="w-4 h-4" /> },
    { id: 'classic' as const, label: t('calculator.classicView', { defaultValue: 'Par Mode' }), icon: <SlidersHorizontal className="w-4 h-4" /> },
  ];

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

          {/* View Selector */}
          <div className="pt-6 px-6 md:px-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                {views.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className={cn(
                      'relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm',
                      view === v.id
                        ? 'text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    )}
                  >
                    {view === v.id && (
                      <motion.div
                        layoutId="viewBackground"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {v.icon}
                      {v.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Content */}
          <div className="p-6 md:p-8 pt-2">
            <AnimatePresence mode="wait">
              {view === 'deadline' ? (
                <motion.div
                  key="deadline"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DeadlineCalculator />
                </motion.div>
              ) : (
                <motion.div
                  key="classic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ModeSelector />
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
