/**
 * Prohibited Items Section
 * 
 * Displays items that are prohibited or restricted for shipping.
 * Part of the pricing feature.
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Ban, XCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProhibitedItem {
  id: string;
  icon: React.ReactNode;
  borderColor: string;
  bgColor: string;
}

export function ProhibitedItems() {
  const t = useTranslations('pricing');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const items: ProhibitedItem[] = [
    {
      id: 'prohibited',
      icon: <Ban className="w-5 h-5 text-red-500" />,
      borderColor: 'border-red-200 dark:border-red-900/30',
      bgColor: 'bg-red-50 dark:bg-red-900/10',
    },
    {
      id: 'restricted',
      icon: <XCircle className="w-5 h-5 text-amber-500" />,
      borderColor: 'border-amber-200 dark:border-amber-900/30',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    },
    {
      id: 'fragile',
      icon: <AlertTriangle className="w-5 h-5 text-blue-500" />,
      borderColor: 'border-blue-200 dark:border-blue-900/30',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">
              {t('prohibitedItems.badge')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('prohibitedItems.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('prohibitedItems.subtitle')}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  'rounded-xl border overflow-hidden transition-all duration-300',
                  item.borderColor,
                  item.bgColor,
                  expandedId === item.id && 'shadow-lg'
                )}
              >
                {/* Header */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      'bg-white dark:bg-gray-800 shadow-sm'
                    )}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {t(`prohibitedItems.categories.${item.id}.title`)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t(`prohibitedItems.categories.${item.id}.description`)}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2">
                        <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {/* Get items from translation and render as list */}
                            {['item1', 'item2', 'item3', 'item4', 'item5', 'item6'].map((key) => {
                              const text = t(`prohibitedItems.categories.${item.id}.items.${key}`);
                              // Only render if translation exists
                              if (text === `prohibitedItems.categories.${item.id}.items.${key}`) {
                                return null;
                              }
                              return (
                                <li
                                  key={key}
                                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                                  {text}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                {t('prohibitedItems.note.title')}
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {t('prohibitedItems.note.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
