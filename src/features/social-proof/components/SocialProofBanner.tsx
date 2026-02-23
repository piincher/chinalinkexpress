/**
 * Social Proof Banner
 * 
 * Fixed banner component showing real-time social proof messages.
 * Auto-rotating, dismissible, and clickable for more details.
 * Part of the social-proof feature.
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Package, CheckCircle, FileText, UserPlus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocialProof } from '../hooks/useSocialProof';
import type { SocialProofEvent } from '@/features/live-features/types';

interface SocialProofBannerProps {
  position?: 'top' | 'bottom';
  className?: string;
  onDismiss?: () => void;
  onClick?: (event: SocialProofEvent) => void;
}

const iconMap = {
  viewing: Eye,
  shipped: Package,
  delivered: CheckCircle,
  quote: FileText,
  signup: UserPlus,
};

const typeColors = {
  viewing: 'text-amber-700 dark:text-amber-300',
  shipped: 'text-blue-700 dark:text-blue-300',
  delivered: 'text-green-700 dark:text-green-300',
  quote: 'text-purple-700 dark:text-purple-300',
  signup: 'text-pink-700 dark:text-pink-300',
};

export function SocialProofBanner({
  position = 'bottom',
  className,
  onDismiss,
  onClick,
}: SocialProofBannerProps) {
  const { currentEvents, activeViewers, dismissEvent, hideBanner } = useSocialProof();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter to most relevant events
  const displayEvents = currentEvents.slice(0, 5);

  // Auto-rotate messages
  useEffect(() => {
    if (displayEvents.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayEvents.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [displayEvents.length]);

  // Handle dismiss
  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    hideBanner();
    onDismiss?.();
  }, [hideBanner, onDismiss]);

  // Handle click
  const handleClick = useCallback(() => {
    const currentEvent = displayEvents[currentIndex];
    if (currentEvent && onClick) {
      onClick(currentEvent);
    }
  }, [displayEvents, currentIndex, onClick]);

  // Handle dismiss current event
  const handleDismissEvent = useCallback((e: React.MouseEvent, eventId: string) => {
    e.stopPropagation();
    dismissEvent(eventId);
  }, [dismissEvent]);

  if (!isVisible || displayEvents.length === 0) {
    return null;
  }

  const currentEvent = displayEvents[currentIndex];
  const Icon = iconMap[currentEvent.type];
  const iconColorClass = typeColors[currentEvent.type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: position === 'top' ? -100 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === 'top' ? -100 : 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'fixed left-0 right-0 z-50 px-4 py-3',
            position === 'top' ? 'top-0' : 'bottom-0',
            className
          )}
        >
          <div
            onClick={handleClick}
            className={cn(
              'mx-auto max-w-4xl rounded-lg shadow-lg cursor-pointer',
              'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500',
              'dark:from-amber-600 dark:via-yellow-600 dark:to-amber-700',
              'border border-amber-500/20 dark:border-amber-400/20',
              'transition-transform duration-200 hover:scale-[1.02]',
              'flex items-center justify-between px-4 py-3'
            )}
          >
            {/* Content */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Icon */}
              <div className={cn(
                'flex-shrink-0 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90',
                'flex items-center justify-center shadow-sm'
              )}>
                <Icon className={cn('w-5 h-5', iconColorClass)} />
              </div>

              {/* Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {currentEvent.message}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {activeViewers} people currently browsing
                    {currentEvent.location && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{currentEvent.location}</span>
                      </>
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <div className="hidden sm:flex items-center text-slate-900 dark:text-slate-100 text-sm font-medium">
                <span>View</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-3">
              {/* Dismiss event button (mobile) */}
              <button
                onClick={(e) => handleDismissEvent(e, currentEvent.id)}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  'text-slate-700 dark:text-slate-300',
                  'hover:bg-slate-900/10 dark:hover:bg-slate-100/10',
                  'sm:hidden'
                )}
                aria-label="Dismiss this notification"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Close banner button */}
              <button
                onClick={handleDismiss}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  'text-slate-700 dark:text-slate-300',
                  'hover:bg-slate-900/10 dark:hover:bg-slate-100/10'
                )}
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress dots */}
          {displayEvents.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-2">
              {displayEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-amber-500 dark:bg-amber-400 w-4'
                      : 'bg-slate-400/50 dark:bg-slate-500/50 hover:bg-slate-500 dark:hover:bg-slate-400'
                  )}
                  aria-label={`Go to message ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Inline variant for embedding in sections
interface InlineSocialProofProps {
  className?: string;
}

export function InlineSocialProof({ className }: InlineSocialProofProps) {
  const { currentEvents, activeViewers } = useSocialProof();
  const latestEvent = currentEvents[0];

  if (!latestEvent) return null;

  const Icon = iconMap[latestEvent.type];
  const iconColorClass = typeColors[latestEvent.type];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-gradient-to-r from-amber-100 to-yellow-100',
        'dark:from-amber-900/30 dark:to-yellow-900/30',
        'border border-amber-200 dark:border-amber-700',
        className
      )}
    >
      <div className={cn('flex items-center justify-center', iconColorClass)}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {latestEvent.message}
      </span>
      <span className="text-xs text-slate-600 dark:text-slate-400">
        • {activeViewers} viewing now
      </span>
    </div>
  );
}

export default SocialProofBanner;
