/**
 * Activity Ticker
 * 
 * Scrolling ticker showing recent activities.
 * Pauses on hover, mobile-optimized with vertical or compact horizontal.
 * Part of the social-proof feature.
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { 
  Eye, 
  Package, 
  CheckCircle, 
  FileText, 
  UserPlus, 
  MapPin,
  Clock,
  type LucideIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocialProof } from '../hooks/useSocialProof';
import type { SocialProofEvent } from '@/features/live-features/types';

interface ActivityTickerProps {
  className?: string;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'horizontal' | 'vertical' | 'compact';
  maxItems?: number;
}

const iconMap: Record<string, LucideIcon> = {
  viewing: Eye,
  shipped: Package,
  delivered: CheckCircle,
  quote: FileText,
  signup: UserPlus,
};

const typeColors: Record<string, string> = {
  viewing: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  shipped: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  delivered: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  quote: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  signup: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20',
};

const speedMap = {
  slow: 40,
  normal: 25,
  fast: 15,
};

export function ActivityTicker({
  className,
  direction = 'left',
  speed = 'normal',
  variant = 'horizontal',
  maxItems = 10,
}: ActivityTickerProps) {
  const { recentActivity, isLoading } = useSocialProof();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter and limit items
  const displayItems = recentActivity.slice(0, maxItems);

  if (isLoading || displayItems.length === 0) {
    return null;
  }

  // Vertical variant for mobile
  if (variant === 'vertical') {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden',
          'h-48 sm:h-64',
          className
        )}
      >
        <motion.div
          className="flex flex-col gap-3"
          animate={{
            y: [0, -displayItems.length * 60],
          }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: displayItems.length * 3,
              ease: 'linear',
            },
          }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {[...displayItems, ...displayItems].map((event, index) => (
            <ActivityCard
              key={`${event.id}-${index}`}
              event={event}
              variant="vertical"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Compact variant for small spaces
  if (variant === 'compact') {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden py-2',
          'bg-slate-50 dark:bg-slate-900/50',
          'border-y border-slate-200 dark:border-slate-800',
          className
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-center">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 px-3 whitespace-nowrap">
            Live Activity:
          </span>
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: direction === 'left' ? [0, -1000] : [-1000, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: speedMap[speed] * 2,
                  ease: 'linear',
                },
              }}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {[...displayItems, ...displayItems, ...displayItems].map((event, index) => (
                <CompactActivityItem
                  key={`${event.id}-${index}`}
                  event={event}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-r from-slate-50 via-white to-slate-50',
        'dark:from-slate-900 dark:via-slate-950 dark:to-slate-900',
        'border-y border-slate-200 dark:border-slate-800',
        'py-4',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? [0, -1500] : [-1500, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speedMap[speed] * 3,
            ease: 'linear',
          },
        }}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {/* Duplicate items for seamless loop */}
        {[...displayItems, ...displayItems, ...displayItems].map((event, index) => (
          <ActivityCard
            key={`${event.id}-${index}`}
            event={event}
            variant="horizontal"
          />
        ))}
      </motion.div>
    </div>
  );
}

interface ActivityCardProps {
  event: SocialProofEvent;
  variant: 'horizontal' | 'vertical';
}

function ActivityCard({ event, variant }: ActivityCardProps) {
  const Icon = iconMap[event.type] || Package;
  const colorClass = typeColors[event.type] || typeColors.shipped;
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const updateTimeAgo = () => {
      setTimeAgo(getTimeAgo(event.timestamp));
    };
    
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [event.timestamp]);

  if (variant === 'vertical') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        className={cn(
          'flex items-center gap-3 p-3 rounded-xl',
          'bg-white dark:bg-slate-800',
          'border border-slate-200 dark:border-slate-700',
          'shadow-sm'
        )}
      >
        <div className={cn('p-2 rounded-lg', colorClass)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
            {event.message}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            {event.location && (
              <>
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </>
            )}
            <Clock className="w-3 h-3" />
            <span>{isMounted ? timeAgo : '...'}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Horizontal card
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl',
        'bg-white dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
        'shadow-sm hover:shadow-md transition-shadow',
        'min-w-max'
      )}
    >
      <div className={cn('p-2 rounded-lg', colorClass)}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
          {event.message}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isMounted ? timeAgo : '...'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface CompactActivityItemProps {
  event: SocialProofEvent;
}

function CompactActivityItem({ event }: CompactActivityItemProps) {
  const Icon = iconMap[event.type] || Package;
  const colorClass = typeColors[event.type] || typeColors.shipped;

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Icon className={cn('w-3.5 h-3.5', colorClass.split(' ')[0])} />
      <span className="text-xs text-slate-600 dark:text-slate-400">
        {event.message}
      </span>
      {event.location && (
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({event.location})
        </span>
      )}
    </div>
  );
}

// Helper function to format time ago
function getTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default ActivityTicker;
