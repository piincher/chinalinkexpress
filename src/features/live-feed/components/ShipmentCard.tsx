/**
 * Shipment Card Component
 * 
 * Animated card displaying shipment information with origin, destination,
 * service type, status, and timestamp. Supports dark mode and mobile-first design.
 * Part of the live-feed feature.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plane, Ship, Package, ArrowRight, Clock } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { LiveShipment } from '@/features/live-features/types';

interface ShipmentCardProps {
  shipment: LiveShipment;
  index?: number;
  onExit?: () => void;
}

/**
 * Get status color classes based on shipment status
 */
function getStatusColor(status: LiveShipment['status']): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (status) {
    case 'delivered':
      return {
        bg: 'bg-green-50 dark:bg-green-950/30',
        text: 'text-green-700 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        dot: 'bg-green-500',
      };
    case 'in_transit':
    case 'out_for_delivery':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        dot: 'bg-blue-500',
      };
    case 'customs':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500',
      };
    case 'exception':
      return {
        bg: 'bg-red-50 dark:bg-red-950/30',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        dot: 'bg-red-500',
      };
    case 'pending':
    case 'picked_up':
    default:
      return {
        bg: 'bg-gray-50 dark:bg-gray-800/50',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700',
        dot: 'bg-gray-400',
      };
  }
}

/**
 * Get service icon based on service type
 */
function ServiceIcon({ service }: { service: LiveShipment['service'] }) {
  const iconClass = "w-4 h-4";
  
  switch (service) {
    case 'air':
      return <Plane className={cn(iconClass, "text-blue-500")} />;
    case 'sea':
      return <Ship className={cn(iconClass, "text-cyan-500")} />;
    case 'express':
      return <Package className={cn(iconClass, "text-purple-500")} />;
    default:
      return <Package className={iconClass} />;
  }
}

/**
 * Get service label
 */
function ServiceLabel({ service }: { service: LiveShipment['service'] }) {
  const labels = {
    air: 'Aérien',
    sea: 'Maritime',
    express: 'Express',
  };
  
  return (
    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
      {labels[service] || service}
    </span>
  );
}

/**
 * Format status for display
 */
function formatStatus(status: LiveShipment['status']): string {
  const statusMap: Record<string, string> = {
    pending: 'En attente',
    picked_up: 'Ramassé',
    in_transit: 'En transit',
    customs: 'En douane',
    out_for_delivery: 'En livraison',
    delivered: 'Livré',
    exception: 'Exception',
  };
  
  return statusMap[status] || status;
}

export function ShipmentCard({ shipment, index = 0 }: ShipmentCardProps) {
  const t = useTranslations('liveFeed');
  const statusColors = getStatusColor(shipment.status);
  const [relativeTime, setRelativeTime] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Format relative time - client only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    
    const getRelativeTime = (timestamp: string): string => {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      
      if (diffMins < 1) return 'À l\'instant';
      if (diffMins < 60) return `Il y a ${diffMins} min`;
      if (diffHours < 24) return `Il y a ${diffHours}h`;
      return formatDate(timestamp, { day: 'numeric', month: 'short' });
    };
    
    setRelativeTime(getRelativeTime(shipment.timestamp));
    
    // Update relative time every minute
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(shipment.timestamp));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [shipment.timestamp]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(
        'relative flex-shrink-0 w-[280px] p-4 rounded-xl',
        'bg-white dark:bg-slate-900',
        'border border-gray-100 dark:border-slate-800',
        'shadow-sm hover:shadow-md',
        'transition-shadow duration-200',
        'overflow-hidden'
      )}
    >
      {/* Status indicator bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1',
          statusColors.dot
        )}
      />
      
      {/* Header: Service type & Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-slate-800">
            <ServiceIcon service={shipment.service} />
          </div>
          <ServiceLabel service={shipment.service} />
        </div>
        
        <div
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
            statusColors.bg,
            statusColors.text,
            statusColors.border,
            'border'
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full', statusColors.dot)} />
          {formatStatus(shipment.status)}
        </div>
      </div>
      
      {/* Route: Origin → Destination */}
      <div className="mb-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-gray-900 dark:text-white truncate">
            {shipment.origin.city}
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white truncate">
            {shipment.destination.city}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          <span>{shipment.origin.country}</span>
          <span>→</span>
          <span>{shipment.destination.country}</span>
        </div>
      </div>
      
      {/* Footer: Tracking & Time */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Package className="w-3.5 h-3.5" />
          <span className="font-mono">{shipment.trackingNumber}</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{isMounted ? relativeTime : '...'}</span>
        </div>
      </div>
      
      {/* Weight badge (if available) */}
      {shipment.weight && (
        <div className="absolute top-3 right-3">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {shipment.weight} kg
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ShipmentCard;
