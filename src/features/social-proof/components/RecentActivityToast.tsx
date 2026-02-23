/**
 * Recent Activity Toast
 * 
 * Toast notifications for new social proof events.
 * Slides in from bottom (mobile) or side (desktop).
 * Auto-dismisses after 5 seconds with stacking support.
 * Part of the social-proof feature.
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Package, 
  CheckCircle, 
  FileText, 
  UserPlus, 
  MapPin,
  X,
  type LucideIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocialProofStore } from '../store/useSocialProofStore';
import type { SocialProofEvent } from '@/features/live-features/types';

interface Toast {
  id: string;
  event: SocialProofEvent;
  createdAt: number;
}

interface RecentActivityToastProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
  maxToasts?: number;
  autoDismissDelay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  viewing: Eye,
  shipped: Package,
  delivered: CheckCircle,
  quote: FileText,
  signup: UserPlus,
};

const typeConfig: Record<string, { color: string; label: string }> = {
  viewing: { 
    color: 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20', 
    label: 'Now Viewing' 
  },
  shipped: { 
    color: 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/20', 
    label: 'Just Shipped' 
  },
  delivered: { 
    color: 'border-l-green-500 bg-green-50 dark:bg-green-900/20', 
    label: 'Delivered' 
  },
  quote: { 
    color: 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20', 
    label: 'New Quote' 
  },
  signup: { 
    color: 'border-l-pink-500 bg-pink-50 dark:bg-pink-900/20', 
    label: 'New Customer' 
  },
};

const positionClasses = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
};

export function RecentActivityToast({
  className,
  position = 'bottom-right',
  maxToasts = 3,
  autoDismissDelay = 5000,
}: RecentActivityToastProps) {
  const events = useSocialProofStore((state) => state.events);
  const dismissedIds = useSocialProofStore((state) => state.dismissedEventIds);
  const addEvent = useSocialProofStore((state) => state.addEvent);
  const dismissEvent = useSocialProofStore((state) => state.dismissEvent);
  
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const processedEventIds = React.useRef<Set<string>>(new Set());

  // Listen for new events and convert to toasts
  useEffect(() => {
    const newEvents = events.filter(
      (event) => 
        !processedEventIds.current.has(event.id) && 
        !dismissedIds.includes(event.id)
    );

    newEvents.forEach((event) => {
      processedEventIds.current.add(event.id);
      
      // Don't show toasts for older events (older than 2 minutes)
      const eventTime = new Date(event.timestamp).getTime();
      if (Date.now() - eventTime > 2 * 60 * 1000) return;

      setToasts((prev) => {
        const newToast: Toast = {
          id: `toast_${event.id}`,
          event,
          createdAt: Date.now(),
        };
        
        // Keep only maxToasts, remove oldest
        const updated = [newToast, ...prev].slice(0, maxToasts);
        return updated;
      });
    });
  }, [events, dismissedIds, maxToasts]);

  // Remove toast
  const removeToast = useCallback((toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  // Dismiss and remove toast
  const handleDismiss = useCallback((toast: Toast) => {
    dismissEvent(toast.event.id);
    removeToast(toast.id);
  }, [dismissEvent, removeToast]);

  // Auto-dismiss toasts
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setToasts((prev) => 
        prev.filter((toast) => now - toast.createdAt < autoDismissDelay)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [autoDismissDelay]);

  if (toasts.length === 0) {
    return null;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2',
        positionClasses[position],
        isMobile && position.startsWith('bottom') && 'left-4 right-4',
        isMobile && !position.startsWith('bottom') && 'left-4 right-4',
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            index={index}
            onDismiss={() => handleDismiss(toast)}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  index: number;
  onDismiss: () => void;
  position: string;
}

function ToastItem({ toast, index, onDismiss, position }: ToastItemProps) {
  const { event } = toast;
  const Icon = iconMap[event.type] || Package;
  const config = typeConfig[event.type] || typeConfig.shipped;
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  // Animation variants based on position
  const getInitialPosition = () => {
    if (isMobile) return { y: 100, opacity: 0 };
    
    if (position.includes('right')) return { x: 100, opacity: 0 };
    if (position.includes('left')) return { x: -100, opacity: 0 };
    return { y: 100, opacity: 0 };
  };

  return (
    <motion.div
      layout
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ 
        x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
        y: !position.includes('right') && !position.includes('left') ? 100 : 0,
        opacity: 0,
        scale: 0.9 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        delay: index * 0.05 
      }}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg shadow-lg',
        'bg-white dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
        'border-l-4',
        config.color,
        'min-w-[280px] max-w-[400px]',
        isMobile && 'w-full max-w-none'
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={cn('w-5 h-5', config.color.split(' ')[0].replace('border-l-', 'text-'))} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            'text-xs font-semibold uppercase tracking-wide',
            config.color.split(' ')[0].replace('border-l-', 'text-')
          )}>
            {config.label}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
          {event.message}
        </p>
        {event.location && (
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3 h-3" />
            {event.location}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className={cn(
          'flex-shrink-0 p-1 rounded-md transition-colors',
          'text-slate-400 hover:text-slate-600',
          'dark:text-slate-500 dark:hover:text-slate-300',
          'hover:bg-slate-100 dark:hover:bg-slate-700'
        )}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 origin-left',
          config.color.split(' ')[0].replace('border-l-', 'bg-')
        )}
      />
    </motion.div>
  );
}

// Simple toast trigger hook for manual toasts
export function useActivityToast() {
  const addEvent = useSocialProofStore((state) => state.addEvent);

  const showToast = useCallback((event: Omit<SocialProofEvent, 'id' | 'timestamp'>) => {
    const newEvent: SocialProofEvent = {
      ...event,
      id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    addEvent(newEvent);
  }, [addEvent]);

  return { showToast };
}

export default RecentActivityToast;
