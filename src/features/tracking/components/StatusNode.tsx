/**
 * StatusNode Component
 * 
 * Individual status checkpoint component for the tracking timeline.
 * Shows icon, title, description, location, and timestamp.
 * Part of the tracking feature.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clipboard,
  Package,
  Plane,
  Ship,
  FileCheck,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { TrackingEvent } from '@/features/live-features/types';

interface StatusNodeProps {
  event: TrackingEvent;
  index: number;
  totalEvents: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Clipboard,
  Package,
  Plane,
  Ship,
  FileCheck,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
};

export function StatusNode({
  event,
  index,
  totalEvents,
  isExpanded,
  onToggleExpand,
}: StatusNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isLast = index === totalEvents - 1;
  const IconComponent = ICON_MAP[event.icon || 'Clock'] || Clock;

  // Determine state styles
  const getStateStyles = () => {
    if (event.completed) {
      return {
        circle: 'bg-green-500 border-green-500 text-white',
        line: 'bg-green-500',
        glow: 'shadow-green-500/50',
      };
    }
    if (!event.completed && event.timestamp) {
      return {
        circle: 'bg-blue-500 border-blue-500 text-white',
        line: 'bg-gray-200 dark:bg-gray-700',
        glow: 'shadow-blue-500/50 animate-pulse',
      };
    }
    return {
      circle: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400',
      line: 'bg-gray-200 dark:bg-gray-700',
      glow: '',
    };
  };

  const styles = getStateStyles();
  const isCurrent = !event.completed && event.timestamp;
  const isPending = !event.completed && !event.timestamp;

  return (
    <div
      className="relative flex gap-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connecting line */}
      {!isLast && (
        <motion.div
          className={cn(
            'absolute left-[19px] top-10 w-0.5 h-[calc(100%-2.5rem)]',
            styles.line
          )}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          style={{ originY: 0 }}
        />
      )}

      {/* Node circle with icon */}
      <div className="relative flex-shrink-0">
        <motion.div
          className={cn(
            'w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative',
            'transition-all duration-300',
            styles.circle,
            isCurrent && 'shadow-lg ring-4 ring-blue-500/20',
            isHovered && !isPending && 'scale-110'
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
        >
          <IconComponent className="w-5 h-5" />

          {/* Pulse animation for current status */}
          {isCurrent && (
            <>
              <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
              <span className="absolute -inset-2 rounded-full bg-blue-500/10 animate-pulse" />
            </>
          )}
        </motion.div>

        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && !isPending && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              className="absolute left-full ml-3 top-0 z-50 hidden md:block"
            >
              <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                <p className="font-semibold">{event.title}</p>
                {event.timestamp && (
                  <p className="text-gray-400">
                    {formatDate(event.timestamp, {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
                <div className="absolute left-0 top-4 -translate-x-full w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900 dark:border-r-gray-800" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div
        className={cn(
          'flex-1 pb-8 cursor-pointer',
          isPending && 'opacity-60'
        )}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.1 }}
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4
              className={cn(
                'font-semibold text-base',
                event.completed
                  ? 'text-gray-900 dark:text-white'
                  : isCurrent
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {event.title}
            </h4>

            {/* Mobile timestamp */}
            {event.timestamp && (
              <p className="md:hidden text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(event.timestamp, {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}

            {/* Location */}
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Expand button */}
          <motion.button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>

        {/* Description with expand animation */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>

              {/* Full timestamp for desktop */}
              {event.timestamp && (
                <div className="hidden md:flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {formatDate(event.timestamp, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed description preview */}
        {!isExpanded && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500 line-clamp-1">
            {event.description}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default StatusNode;
