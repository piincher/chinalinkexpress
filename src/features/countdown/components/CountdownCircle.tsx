/**
 * CountdownCircle Component
 * 
 * SVG circular progress indicator with countdown in center.
 * Features animated stroke-dashoffset and responsive sizing.
 * Part of the countdown feature.
 */

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountdownCircleProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Days remaining */
  days: number;
  /** Hours remaining */
  hours: number;
  /** Minutes remaining */
  minutes: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Whether in urgent state */
  isUrgent?: boolean;
  /** Whether delivery is completed */
  isDelivered?: boolean;
  /** Custom label to display */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

export function CountdownCircle({
  progress,
  days,
  hours,
  minutes,
  size = 200,
  strokeWidth = 8,
  isUrgent = false,
  isDelivered = false,
  label,
  className,
}: CountdownCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate stroke dashoffset based on progress
  const strokeDashoffset = useMemo(() => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    return circumference - (clampedProgress / 100) * circumference;
  }, [progress, circumference]);

  // Determine colors based on state
  const colors = useMemo(() => {
    if (isDelivered) {
      return {
        primary: 'text-green-500',
        secondary: 'text-green-200 dark:text-green-900',
        glow: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))',
      };
    }
    if (isUrgent) {
      return {
        primary: 'text-amber-500',
        secondary: 'text-amber-200 dark:text-amber-900',
        glow: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
      };
    }
    return {
      primary: 'text-blue-500',
      secondary: 'text-blue-200 dark:text-blue-900',
      glow: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
    };
  }, [isUrgent, isDelivered]);

  // Format display time
  const displayTime = useMemo(() => {
    if (isDelivered) return '✓';
    if (days > 0) return `${days}j`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }, [days, hours, minutes, isDelivered]);

  const displayLabel = useMemo(() => {
    if (label) return label;
    if (isDelivered) return 'Livré';
    if (days > 0) return days === 1 ? 'jour restant' : 'jours restants';
    if (hours > 0) return hours === 1 ? 'heure restante' : 'heures restantes';
    return minutes === 1 ? 'minute restante' : 'minutes restantes';
  }, [days, hours, minutes, isDelivered, label]);

  return (
    <div 
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ filter: colors.glow }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={colors.secondary}
          stroke="currentColor"
          opacity={0.3}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colors.primary}
          stroke="currentColor"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        />
        
        {/* Glow effect for urgent state */}
        {isUrgent && !isDelivered && (
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            className="text-amber-400/30"
            stroke="currentColor"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              strokeDashoffset: { duration: 1, ease: 'easeOut' },
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        )}
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={displayTime}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            'font-bold tabular-nums',
            isDelivered ? 'text-4xl text-green-500' : 'text-3xl text-slate-800 dark:text-slate-100'
          )}
        >
          {displayTime}
        </motion.span>
        <span className={cn(
          'text-xs mt-1 text-center px-2',
          isDelivered ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'
        )}>
          {displayLabel}
        </span>
      </div>
    </div>
  );
}

/**
 * Small circular indicator for compact displays
 */
export function CompactCountdownCircle({
  progress,
  isUrgent = false,
  isDelivered = false,
  size = 48,
  strokeWidth = 4,
  className,
}: Pick<CountdownCircleProps, 'progress' | 'isUrgent' | 'isDelivered' | 'className'> & {
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClass = isDelivered 
    ? 'text-green-500' 
    : isUrgent 
      ? 'text-amber-500' 
      : 'text-blue-500';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
          stroke="currentColor"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={colorClass}
          stroke="currentColor"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isDelivered ? (
          <span className="text-green-500 text-sm">✓</span>
        ) : (
          <div className={cn(
            'w-2 h-2 rounded-full',
            isUrgent ? 'bg-amber-500' : 'bg-blue-500'
          )} />
        )}
      </div>
    </div>
  );
}

export default CountdownCircle;
