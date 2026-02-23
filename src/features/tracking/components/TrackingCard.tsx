/**
 * TrackingCard Component
 * 
 * Compact card version of tracking timeline for embedding in other pages.
 * Shows mini timeline with last 3 events and quick status indicator.
 * Part of the tracking feature.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn, formatDate } from '@/lib/utils';
import { useTrackingTimeline } from '../hooks/useTrackingTimeline';
import type { TrackingEvent } from '@/features/live-features/types';

interface TrackingCardProps {
  trackingNumber: string;
  className?: string;
  onViewDetails?: (trackingNumber: string) => void;
}

// Get status color
const getStatusColor = (event: TrackingEvent) => {
  if (event.completed) return 'bg-green-500';
  if (event.timestamp) return 'bg-blue-500';
  return 'bg-gray-300 dark:bg-gray-600';
};

// Get status icon
const getStatusIcon = (completed: boolean, isDelayed: boolean) => {
  if (completed) return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (isDelayed) return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  return <Clock className="w-4 h-4 text-blue-500" />;
};

export function TrackingCard({
  trackingNumber,
  className,
  onViewDetails,
}: TrackingCardProps) {
  const t = useTranslations('tracking');
  const { timeline, events, isLoading, progress } = useTrackingTimeline(trackingNumber);

  if (isLoading) {
    return (
      <div
        className={cn(
          'bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-5',
          className
        )}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!timeline) {
    return (
      <div
        className={cn(
          'bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-5',
          className
        )}
      >
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No tracking data available</p>
        </div>
      </div>
    );
  }

  // Get last 3 events (or fewer if not available)
  const recentEvents = events.slice(-3).reverse();
  const isDelayed = timeline.isDelayed;
  const isDelivered = progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                isDelivered
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : isDelayed
                  ? 'bg-amber-100 dark:bg-amber-900/30'
                  : 'bg-blue-100 dark:bg-blue-900/30'
              )}
            >
              {getStatusIcon(isDelivered, isDelayed)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {trackingNumber}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isDelivered
                  ? t('status.delivered') || 'Delivered'
                  : isDelayed
                  ? t('delayed') || 'Delayed'
                  : t('inTransit') || 'In Transit'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onViewDetails?.(trackingNumber)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="px-4 pt-3">
        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={cn(
              'h-full rounded-full',
              isDelayed
                ? 'bg-amber-500'
                : isDelivered
                ? 'bg-green-500'
                : 'bg-blue-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{progress}%</span>
          <span>
            {t('estimatedDelivery') || 'Est.'}:{' '}
            {formatDate(timeline.estimatedDelivery, {
              day: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>

      {/* Recent Events */}
      <div className="p-4 space-y-3">
        {recentEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            {/* Status dot */}
            <div
              className={cn(
                'w-2 h-2 rounded-full flex-shrink-0',
                getStatusColor(event)
              )}
            />

            {/* Event info */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  'text-sm truncate',
                  event.completed
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {event.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                {event.location}
              </p>
            </div>

            {/* Timestamp */}
            {event.timestamp && (
              <span className="text-xs text-gray-400 dark:text-gray-600 flex-shrink-0">
                {formatDate(event.timestamp, {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            )}
          </motion.div>
        ))}

        {events.length > 3 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center pt-2">
            +{events.length - 3} more events
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => onViewDetails?.(trackingNumber)}
          className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>{t('viewDetails') || 'View Details'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default TrackingCard;
