/**
 * Mode Selector
 * 
 * Tabbed interface for switching between Air and Sea freight calculators.
 * Part of the pricing feature.
 */

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plane, Ship } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePricingStore } from '../store/usePricingStore';
import type { ShippingMode } from '../constants';

interface ModeOption {
  id: ShippingMode;
  icon: React.ReactNode;
}

export function ModeSelector() {
  const t = useTranslations('pricing');
  const { mode, setMode } = usePricingStore();

  const modes: ModeOption[] = [
    {
      id: 'air',
      icon: <Plane className="w-5 h-5" />,
    },
    {
      id: 'sea',
      icon: <Ship className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
              mode === m.id
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            )}
          >
            {mode === m.id && (
              <motion.div
                layoutId="modeBackground"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {m.icon}
              {t(`modes.${m.id}`)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
