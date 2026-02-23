/**
 * TrackingTimeline Component
 * 
 * Main timeline component displaying the complete shipment journey.
 * Features vertical layout with connecting lines, expandable details,
 * and mobile-optimized compact view.
 * Part of the tracking feature.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Calendar,
  MapPin,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn, formatDate } from '@/lib/utils';
import { useTrackingTimeline } from '../hooks/useTrackingTimeline';
import { StatusNode } from './StatusNode';
import { ProgressBar } from './ProgressBar';

interface TrackingTimelineProps {
  trackingNumber: string;
  className?: string;
}

export function TrackingTimeline({ trackingNumber, className }: TrackingTimelineProps) {
  const t = useTranslations('tracking');
  const { timeline, events, isLoading, error, refresh, progress, currentStatus } =
    useTrackingTimeline(trackingNumber);

  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

  const toggleEventExpanded = useCallback((eventId: string) => {
    setExpandedEvents((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('w-full max-w-3xl mx-auto p-6', className)}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
          <div className="animate-pulse space-y-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            </div>

            {/* Progress skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full" />

            {/* Timeline skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cn('w-full max-w-3xl mx-auto p-6', className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 p-8 text-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
            Error Loading Tracking Data
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error.message}</p>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  // Empty state
  if (!timeline || events.length === 0) {
    return (
      <div className={cn('w-full max-w-3xl mx-auto p-6', className)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center"
        >
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Tracking Data Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a valid tracking number to view shipment details.
          </p>
        </motion.div>
      </div>
    );
  }

  const milestones = [
    { position: 0, label: 'Origin', completed: true },
    { position: 50, label: 'Transit', completed: progress >= 50 },
    { position: 100, label: 'Destination', completed: progress === 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full max-w-3xl mx-auto p-4 md:p-6', className)}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
                <Package className="w-4 h-4" />
                <span>{t('timeline') || 'Tracking Timeline'}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {timeline.trackingNumber}
              </h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1">
              {timeline.isDelayed ? (
                <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-full">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('delayed') || 'Delayed'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('onTime') || 'On Time'}</span>
                </div>
              )}

              {/* Estimated Delivery */}
              <div className="flex items-center gap-2 text-blue-100 text-sm mt-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {t('estimatedDelivery') || 'Est. Delivery'}:{' '}
                  {formatDate(timeline.estimatedDelivery, {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <ProgressBar
            progress={progress}
            milestones={milestones}
            isDelayed={timeline.isDelayed}
            size="lg"
            variant="gradient"
          />
        </div>

        {/* Current Status Banner */}
        {currentStatus && (
          <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/10 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('currentStatus') || 'Current Status'}:
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {currentStatus.title}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentStatus.location}
              </span>
            </div>
          </div>
        )}

        {/* Timeline Events */}
        <div className="p-6">
          <div className="space-y-0">
            {events.map((event, index) => (
              <StatusNode
                key={event.id}
                event={event}
                index={index}
                totalEvents={events.length}
                isExpanded={expandedEvents.includes(event.id)}
                onToggleExpand={() => toggleEventExpanded(event.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>
                {events[0]?.location}
                <ArrowRight className="w-3 h-3 inline mx-2" />
                {events[events.length - 1]?.location}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {timeline.delayReason && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {timeline.delayReason}
                </p>
              )}

              <button
                onClick={refresh}
                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                {t('trackAnother') || 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TrackingTimeline;
