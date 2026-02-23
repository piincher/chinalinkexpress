/**
 * ProgressBar Component
 * 
 * Animated progress bar showing journey completion percentage.
 * Features color gradient from origin to destination.
 * Part of the tracking feature.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  milestones?: Array<{
    position: number;
    label: string;
    completed: boolean;
  }>;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'striped';
  isDelayed?: boolean;
}

export function ProgressBar({
  progress,
  milestones = [],
  showPercentage = true,
  size = 'md',
  variant = 'gradient',
  isDelayed = false,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const getGradientColors = () => {
    if (isDelayed) {
      return 'from-amber-500 via-orange-500 to-red-500';
    }
    if (clampedProgress === 100) {
      return 'from-green-500 via-green-500 to-green-600';
    }
    return 'from-blue-500 via-cyan-500 to-emerald-500';
  };

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="relative">
        {/* Background track */}
        <div
          className={cn(
            'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
            sizeStyles[size]
          )}
        >
          {/* Animated fill */}
          <motion.div
            className={cn(
              'h-full rounded-full relative',
              variant === 'gradient' && `bg-gradient-to-r ${getGradientColors()}`,
              variant === 'default' && (isDelayed ? 'bg-amber-500' : 'bg-blue-500'),
              variant === 'striped' && `
                bg-gradient-to-r ${getGradientColors()}
                bg-[length:1rem_1rem]
              `
            )}
            style={{
              backgroundImage: variant === 'striped'
                ? 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'
                : undefined,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Shimmer effect */}
            {variant !== 'default' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Milestone markers */}
        {milestones.length > 0 && (
          <div className="absolute inset-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${milestone.position}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div
                  className={cn(
                    'w-3 h-3 rounded-full border-2 -translate-x-1/2',
                    milestone.completed
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                  )}
                />
                {/* Milestone label */}
                <span
                  className={cn(
                    'absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap',
                    milestone.completed
                      ? 'text-green-600 dark:text-green-400 font-medium'
                      : 'text-gray-400 dark:text-gray-500'
                  )}
                >
                  {milestone.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Percentage and status */}
      {showPercentage && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Progress
            </span>
            <motion.span
              className={cn(
                'text-sm font-semibold',
                isDelayed
                  ? 'text-amber-600 dark:text-amber-400'
                  : clampedProgress === 100
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-blue-600 dark:text-blue-400'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(clampedProgress)}%
            </motion.span>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {isDelayed && (
              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Delayed
              </span>
            )}
            {clampedProgress === 100 && (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Completed
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
