/**
 * CountdownDisplay Component
 * 
 * Displays countdown time with days, hours, minutes, seconds.
 * Supports urgent state (pulse animation, red/amber color) and delivered state.
 * Mobile-optimized with compact variant.
 * Part of the countdown feature.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountdownUnitProps {
  value: number;
  label: string;
  isUrgent: boolean;
  isDelivered: boolean;
  compact?: boolean;
}

function CountdownUnit({ value, label, isUrgent, isDelivered, compact }: CountdownUnitProps) {
  const displayValue = value.toString().padStart(2, '0');
  
  return (
    <div className={cn(
      'flex flex-col items-center',
      compact && 'scale-90'
    )}>
      <motion.div
        key={displayValue}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative font-mono font-bold tabular-nums',
          'bg-gradient-to-br from-white to-blue-50',
          'dark:from-slate-800 dark:to-slate-900',
          'rounded-xl shadow-lg border border-blue-100 dark:border-slate-700',
          compact ? 'text-2xl sm:text-3xl px-3 py-2' : 'text-3xl sm:text-4xl md:text-5xl px-4 py-3',
          isDelivered && 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
          isUrgent && !isDelivered && 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800'
        )}
      >
        {displayValue}
        
        {/* Urgent pulse effect */}
        {isUrgent && !isDelivered && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-amber-400/20 dark:bg-amber-500/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
      
      <span className={cn(
        'mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider',
        'text-slate-500 dark:text-slate-400',
        isDelivered && 'text-green-600 dark:text-green-400',
        isUrgent && !isDelivered && 'text-amber-600 dark:text-amber-400'
      )}>
        {label}
      </span>
    </div>
  );
}

interface CountdownDisplayProps {
  /** Days remaining */
  days: number;
  /** Hours remaining */
  hours: number;
  /** Minutes remaining */
  minutes: number;
  /** Seconds remaining */
  seconds: number;
  /** Whether countdown is in urgent state (< 24h) */
  isUrgent?: boolean;
  /** Whether delivery is completed */
  isDelivered?: boolean;
  /** Whether to show compact variant */
  compact?: boolean;
  /** Custom labels */
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  /** Additional CSS classes */
  className?: string;
}

export function CountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
  isUrgent = false,
  isDelivered = false,
  compact = false,
  labels = {},
  className,
}: CountdownDisplayProps) {
  const {
    days: daysLabel = 'days',
    hours: hoursLabel = 'hours',
    minutes: minutesLabel = 'minutes',
    seconds: secondsLabel = 'seconds',
  } = labels;

  // Hide days if 0 and not delivered
  const showDays = days > 0 || isDelivered;

  return (
    <div className={cn(
      'flex items-center justify-center gap-2 sm:gap-3 md:gap-4',
      className
    )}>
      {showDays && (
        <>
          <CountdownUnit
            value={days}
            label={daysLabel}
            isUrgent={isUrgent}
            isDelivered={isDelivered}
            compact={compact}
          />
          <span className={cn(
            'text-2xl sm:text-3xl md:text-4xl font-bold',
            'text-slate-300 dark:text-slate-600',
            isUrgent && !isDelivered && 'text-amber-400 dark:text-amber-600'
          )}>
            :
          </span>
        </>
      )}
      
      <CountdownUnit
        value={hours}
        label={hoursLabel}
        isUrgent={isUrgent}
        isDelivered={isDelivered}
        compact={compact}
      />
      
      <span className={cn(
        'text-2xl sm:text-3xl md:text-4xl font-bold',
        'text-slate-300 dark:text-slate-600',
        isUrgent && !isDelivered && 'text-amber-400 dark:text-amber-600'
      )}>
        :
      </span>
      
      <CountdownUnit
        value={minutes}
        label={minutesLabel}
        isUrgent={isUrgent}
        isDelivered={isDelivered}
        compact={compact}
      />
      
      <span className={cn(
        'text-2xl sm:text-3xl md:text-4xl font-bold',
        'text-slate-300 dark:text-slate-600',
        isUrgent && !isDelivered && 'text-amber-400 dark:text-amber-600'
      )}>
        :
      </span>
      
      <CountdownUnit
        value={seconds}
        label={secondsLabel}
        isUrgent={isUrgent}
        isDelivered={isDelivered}
        compact={compact}
      />
    </div>
  );
}

/**
 * Compact countdown display for small spaces
 */
export function CompactCountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
  isUrgent = false,
  isDelivered = false,
  className,
}: Omit<CountdownDisplayProps, 'compact' | 'labels'>) {
  const displayValue = days > 0 
    ? `${days}j ${hours.toString().padStart(2, '0')}h`
    : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg',
        'bg-white dark:bg-slate-800 shadow-sm border',
        'border-slate-200 dark:border-slate-700',
        isDelivered && 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
        isUrgent && !isDelivered && 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
        className
      )}
    >
      {isDelivered ? (
        <span className="text-green-500 text-lg">✓</span>
      ) : (
        <motion.div
          className={cn(
            'w-2 h-2 rounded-full',
            isUrgent ? 'bg-amber-500' : 'bg-blue-500'
          )}
          animate={isUrgent ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      <span className={cn(
        'font-mono font-semibold text-sm',
        isDelivered && 'text-green-700 dark:text-green-400',
        isUrgent && !isDelivered && 'text-amber-700 dark:text-amber-400'
      )}>
        {isDelivered ? 'Livré' : displayValue}
      </span>
    </motion.div>
  );
}

export default CountdownDisplay;
