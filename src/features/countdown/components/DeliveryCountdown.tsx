/**
 * DeliveryCountdown Component
 * 
 * Main countdown component showing delivery information with progress bar,
 * status checkpoints, and countdown timer. Features animated transitions.
 * Part of the countdown feature.
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useDeliveryCountdown } from '../hooks/useDeliveryCountdown';
import { CountdownDisplay } from './CountdownDisplay';
import { CountdownCircle } from './CountdownCircle';
import type { CountdownCheckpoint } from '@/features/live-features/types';

// Service icon mapping
const serviceIcons: Record<string, string> = {
  air: '✈️',
  sea: '🚢',
  express: '🚀',
};

interface CheckpointProps {
  checkpoint: CountdownCheckpoint;
  index: number;
  total: number;
  isActive: boolean;
}

function Checkpoint({ checkpoint, index, total, isActive }: CheckpointProps) {
  const t = useTranslations('countdown');
  const isLast = index === total - 1;
  const showLine = !isLast;

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        {/* Checkpoint circle */}
        <motion.div
          initial={false}
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
            backgroundColor: checkpoint.completed 
              ? isActive ? '#10b981' : '#3b82f6'
              : '#e2e8f0',
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
            'border-2 transition-colors duration-300',
            checkpoint.completed
              ? 'border-transparent text-white'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800',
            isActive && checkpoint.completed && 'ring-4 ring-green-200 dark:ring-green-900'
          )}
        >
          {checkpoint.completed ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-sm sm:text-base"
            >
              ✓
            </motion.span>
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          )}
        </motion.div>
        
        {/* Label */}
        <span className={cn(
          'mt-2 text-xs sm:text-sm font-medium text-center max-w-[80px] sm:max-w-[100px]',
          checkpoint.completed 
            ? 'text-slate-700 dark:text-slate-300'
            : 'text-slate-400 dark:text-slate-500'
        )}>
          {t(checkpoint.label)}
        </span>
      </div>
      
      {/* Connecting line */}
      {showLine && (
        <div className="w-8 sm:w-16 md:w-24 h-0.5 mx-1 sm:mx-2 bg-slate-200 dark:bg-slate-700 relative">
          <motion.div
            className="absolute inset-0 bg-blue-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: checkpoint.completed ? 1 : 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        </div>
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  isUrgent: boolean;
  isDelivered: boolean;
}

function ProgressBar({ progress, isUrgent, isDelivered }: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  const barColor = useMemo(() => {
    if (isDelivered) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (isUrgent) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    return 'bg-gradient-to-r from-blue-500 to-cyan-500';
  }, [isUrgent, isDelivered]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Progression
        </span>
        <span className={cn(
          'text-sm font-bold',
          isDelivered && 'text-green-600 dark:text-green-400',
          isUrgent && !isDelivered && 'text-amber-600 dark:text-amber-400',
          !isDelivered && !isUrgent && 'text-blue-600 dark:text-blue-400'
        )}>
          {Math.round(clampedProgress)}%
        </span>
      </div>
      
      <div className={cn(
        'w-full rounded-full overflow-hidden',
        'h-2 sm:h-3',
        'bg-slate-200 dark:bg-slate-700'
      )}>
        <motion.div
          className={cn('h-full rounded-full', barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

interface DeliveryHeaderProps {
  delivery: {
    origin: string;
    destination: string;
    service: 'air' | 'sea' | 'express';
    trackingNumber: string;
  };
}

function DeliveryHeader({ delivery }: DeliveryHeaderProps) {
  const t = useTranslations('countdown');
  const serviceIcon = serviceIcons[delivery.service] || '📦';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Route info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
          {serviceIcon}
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            <span className="truncate max-w-[120px] sm:max-w-[150px]">{delivery.origin}</span>
            <span className="text-slate-300">→</span>
            <span className="truncate max-w-[120px] sm:max-w-[150px]">{delivery.destination}</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {delivery.trackingNumber}
          </div>
        </div>
      </div>
      
      {/* Service badge */}
      <div className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      )}>
        {delivery.service}
      </div>
    </div>
  );
}

interface DeliveryCountdownProps {
  /** Tracking number (optional - uses mock if not provided) */
  trackingNumber?: string;
  /** Variant of the display */
  variant?: 'full' | 'compact' | 'minimal';
  /** Additional CSS classes */
  className?: string;
  /** Callback when countdown expires */
  onExpire?: () => void;
}

export function DeliveryCountdown({
  trackingNumber,
  variant = 'full',
  className,
  onExpire,
}: DeliveryCountdownProps) {
  const t = useTranslations('countdown');
  const {
    countdown,
    delivery,
    progress,
    isLoading,
    error,
    statusLabel,
    isDelivered,
    isArrivingToday,
  } = useDeliveryCountdown({ trackingNumber, useMockData: true });

  // Determine active checkpoint index
  const activeCheckpointIndex = useMemo(() => {
    if (!delivery) return 0;
    const completedCount = delivery.checkpoints.filter(cp => cp.completed).length;
    return Math.min(completedCount, delivery.checkpoints.length - 1);
  }, [delivery]);

  if (isLoading) {
    return (
      <div className={cn(
        'bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl',
        'border border-slate-200 dark:border-slate-800',
        className
      )}>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !delivery) {
    return (
      <div className={cn(
        'bg-red-50 dark:bg-red-900/20 rounded-2xl p-6',
        'border border-red-200 dark:border-red-800',
        className
      )}>
        <p className="text-red-600 dark:text-red-400 text-center">
          {error?.message || 'Failed to load delivery data'}
        </p>
      </div>
    );
  }

  // Minimal variant - just the circle
  if (variant === 'minimal') {
    return (
      <div className={cn('inline-block', className)}>
        <CountdownCircle
          progress={progress}
          days={countdown.days}
          hours={countdown.hours}
          minutes={countdown.minutes}
          isUrgent={countdown.isUrgent}
          isDelivered={isDelivered}
          size={150}
        />
      </div>
    );
  }

  // Compact variant - countdown + mini progress
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6',
          'border border-slate-200 dark:border-slate-800',
          'shadow-lg',
          className
        )}
      >
        <DeliveryHeader delivery={delivery} />
        
        <div className="mt-4 flex items-center gap-4">
          <CountdownCircle
            progress={progress}
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            isUrgent={countdown.isUrgent}
            isDelivered={isDelivered}
            size={100}
            strokeWidth={6}
          />
          
          <div className="flex-1">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              {isDelivered 
                ? t('delivered')
                : isArrivingToday 
                  ? t('arrivingToday')
                  : t('estimatedDelivery')
              }
            </div>
            <CountdownDisplay
              days={countdown.days}
              hours={countdown.hours}
              minutes={countdown.minutes}
              seconds={countdown.seconds}
              isUrgent={countdown.isUrgent}
              isDelivered={isDelivered}
              compact
              labels={{
                days: t('days'),
                hours: t('hours'),
                minutes: t('minutes'),
                seconds: t('seconds'),
              }}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <ProgressBar 
            progress={progress} 
            isUrgent={countdown.isUrgent} 
            isDelivered={isDelivered} 
          />
        </div>
      </motion.div>
    );
  }

  // Full variant - everything
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700',
        'dark:from-blue-900 dark:via-slate-900 dark:to-cyan-900',
        'p-6 sm:p-8',
        'shadow-2xl shadow-blue-500/20',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              {serviceIcons[delivery.service] || '📦'}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                {delivery.origin} → {delivery.destination}
              </h3>
              <p className="text-blue-200 text-sm">
                {delivery.trackingNumber}
              </p>
            </div>
          </div>
          
          <div className={cn(
            'px-4 py-2 rounded-full text-sm font-semibold',
            'bg-white/20 backdrop-blur-sm text-white',
            isDelivered && 'bg-green-500/30',
            countdown.isUrgent && !isDelivered && 'bg-amber-500/30 animate-pulse'
          )}>
            {t(statusLabel)}
          </div>
        </div>

        {/* Countdown Display */}
        <div className="mb-8">
          <p className="text-blue-200 text-sm mb-4 text-center">
            {isDelivered 
              ? t('delivered')
              : isArrivingToday 
                ? t('arrivingToday')
                : t('estimatedDelivery')
            }
          </p>
          <CountdownDisplay
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            isUrgent={countdown.isUrgent}
            isDelivered={isDelivered}
            labels={{
              days: t('days'),
              hours: t('hours'),
              minutes: t('minutes'),
              seconds: t('seconds'),
            }}
            className="justify-center"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-200 text-sm">Progression</span>
            <span className={cn(
              'text-white font-bold',
              isDelivered && 'text-green-300',
              countdown.isUrgent && !isDelivered && 'text-amber-300'
            )}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-black/20 rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                isDelivered 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                  : countdown.isUrgent
                    ? 'bg-gradient-to-r from-amber-400 to-orange-400'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-400'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Checkpoints */}
        <div className="flex justify-center">
          <div className="flex items-start">
            {delivery.checkpoints.map((checkpoint, index) => (
              <Checkpoint
                key={checkpoint.id}
                checkpoint={checkpoint}
                index={index}
                total={delivery.checkpoints.length}
                isActive={index === activeCheckpointIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DeliveryCountdown;
