/**
 * EmptyTracking Component
 * 
 * Empty state displayed when no tracking data is available.
 * Includes CTA to track a shipment with input field.
 * Part of the tracking feature.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, ArrowRight, Truck, MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface EmptyTrackingProps {
  className?: string;
  onTrack?: (trackingNumber: string) => void;
  featuredTrackingNumbers?: string[];
}

const FEATURED_EXAMPLES = [
  { number: 'CLE-AIR-2026-001', label: 'In Transit', icon: Truck },
  { number: 'CLE-SEA-2026-002', label: 'At Customs', icon: MapPin },
  { number: 'CLE-EXP-2026-DEL', label: 'Delivered', icon: Clock },
];

export function EmptyTracking({
  className,
  onTrack,
  featuredTrackingNumbers,
}: EmptyTrackingProps) {
  const t = useTranslations('tracking');
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onTrack?.(inputValue.trim());
    }
  };

  const examples = featuredTrackingNumbers
    ? FEATURED_EXAMPLES.filter((ex) => featuredTrackingNumbers.includes(ex.number))
    : FEATURED_EXAMPLES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'w-full max-w-2xl mx-auto p-6',
        className
      )}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Package className="w-10 h-10 text-blue-500" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
          {t('trackYourShipment') || 'Track Your Shipment'}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {t('trackDescription') ||
            'Enter your tracking number to see real-time updates on your shipment status and estimated delivery date.'}
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-10">
          <div
            className={cn(
              'relative flex items-center gap-2 p-2 rounded-xl border-2 transition-all duration-200',
              isFocused
                ? 'border-blue-500 ring-4 ring-blue-500/10 bg-white dark:bg-gray-800'
                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
            )}
          >
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t('enterNumber') || 'Enter tracking number...'}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 py-2"
            />
            <motion.button
              type="submit"
              disabled={!inputValue.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors',
                inputValue.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              )}
            >
              <span className="hidden sm:inline">{t('track') || 'Track'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t('tryExamples') || 'Try these examples'}
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Example Tracking Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <motion.button
              key={example.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => onTrack?.(example.number)}
              className="group p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <example.icon className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {example.label}
                </span>
              </div>
              <p className="font-mono text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {example.number}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8">
          {t('trackingHelp') ||
            'Tracking numbers usually start with CLE- followed by service type and year'}
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { icon: Clock, label: t('realTime') || 'Real-time Updates' },
          { icon: MapPin, label: t('liveLocation') || 'Live Location' },
          { icon: Truck, label: t('deliveryEst') || 'Delivery Estimate' },
        ].map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-center"
          >
            <feature.icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{feature.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default EmptyTracking;
