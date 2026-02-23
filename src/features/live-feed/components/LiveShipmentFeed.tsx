/**
 * Live Shipment Feed Component
 * 
 * Main feed component displaying real-time shipment activity.
 * Features horizontal scroll on mobile, grid on desktop, filter controls,
 * connection status indicator, and auto-scroll to newest.
 * Part of the live-feed feature.
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Package,
  Plane,
  Ship,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLiveFeedStore } from '../store/useLiveFeedStore';
import { useLiveShipments } from '../hooks/useLiveShipments';
import { ShipmentCard } from './ShipmentCard';
import type { ConnectionStatus } from '@/features/live-features/types';

/**
 * Connection status indicator component
 */
function ConnectionIndicator({ status }: { status: ConnectionStatus }) {
  const t = useTranslations('liveFeed');
  
  const config = {
    connected: {
      icon: Wifi,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      label: 'En direct',
      pulse: true,
    },
    connecting: {
      icon: RefreshCw,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800',
      label: 'Connexion...',
      pulse: false,
    },
    disconnected: {
      icon: WifiOff,
      color: 'text-gray-400',
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-700',
      label: 'Hors ligne',
      pulse: false,
    },
    error: {
      icon: WifiOff,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950/30',
      border: 'border-red-200 dark:border-red-800',
      label: 'Erreur',
      pulse: false,
    },
  };

  const { icon: Icon, color, bg, border, label, pulse } = config[status];

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
        'border transition-colors duration-200',
        bg,
        border,
        color
      )}
    >
      <Icon 
        className={cn(
          'w-3.5 h-3.5',
          pulse && 'animate-pulse',
          status === 'connecting' && 'animate-spin'
        )} 
      />
      <span>{label}</span>
    </div>
  );
}

/**
 * Filter button component
 */
function FilterButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
        'transition-all duration-200',
        active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  const t = useTranslations('liveFeed');
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Aucune expédition pour le moment
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
        Les nouvelles expéditions apparaîtront ici
      </p>
    </div>
  );
}

/**
 * Main Live Shipment Feed component
 */
export function LiveShipmentFeed() {
  const t = useTranslations('liveFeed');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const { 
    shipments, 
    stats, 
    isConnected, 
    isLoading, 
    connectionStatus, 
    error 
  } = useLiveShipments();
  
  const { filter, setFilter } = useLiveFeedStore();

  // Filter shipments
  const filteredShipments = React.useMemo(() => {
    if (filter === 'all') return shipments;
    return shipments.filter((s) => s.service === filter);
  }, [shipments, filter]);

  // Auto-scroll to newest on mobile
  useEffect(() => {
    if (!scrollContainerRef.current || window.innerWidth >= 768) return;
    
    // Scroll to start (newest) when new shipments arrive
    scrollContainerRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }, [filteredShipments.length]);

  // Check scroll position for arrow buttons
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {t('title') || 'Expéditions en Direct'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stats.deliveredToday > 0 
                  ? `${stats.deliveredToday} ${t('packagesToday') || 'colis livrés aujourd\'hui'}`
                  : t('liveUpdates') || 'Mises à jour en temps réel'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ConnectionIndicator status={connectionStatus} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <Filter
            className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0"
          />
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            icon={Package}
            label={t('filterAll') || 'Tous'}
          />
          <FilterButton
            active={filter === 'air'}
            onClick={() => setFilter('air')}
            icon={Plane}
            label={t('filterAir') || 'Aérien'}
          />
          <FilterButton
            active={filter === 'sea'}
            onClick={() => setFilter('sea')}
            icon={Ship}
            label={t('filterSea') || 'Maritime'}
          />
        </div>

        {/* Mobile: Horizontal scroll with navigation arrows */}
        <div className="relative md:hidden">
          {/* Scroll left button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {/* Scroll right button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          
          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredShipments.length === 0 ? (
                <div className="w-full min-w-[280px]">
                  <EmptyState />
                </div>
              ) : (
                filteredShipments.map((shipment, index) => (
                  <div key={shipment.id} className="snap-start">
                    <ShipmentCard shipment={shipment} index={index} />
                  </div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block">
          <AnimatePresence mode="popLayout">
            {filteredShipments.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShipments.slice(0, 9).map((shipment, index) => (
                  <ShipmentCard 
                    key={shipment.id} 
                    shipment={shipment} 
                    index={index}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats footer */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>
              {t('totalToday') || 'Total aujourd\'hui'}: <strong className="text-gray-900 dark:text-white">{stats.totalToday}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            <span>
              {t('inTransit') || 'En transit'}: <strong className="text-gray-900 dark:text-white">{stats.inTransit}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>
              {t('lastUpdated') || 'Dernière mise à jour'}: {' '}
              <strong className="text-gray-900 dark:text-white">
                {stats.lastUpdated 
                  ? new Date(stats.lastUpdated).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                  : '--:--'
                }
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LiveShipmentFeed;
