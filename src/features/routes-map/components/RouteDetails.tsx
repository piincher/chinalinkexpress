/**
 * RouteDetails Component
 * 
 * Slide-in panel showing detailed information about a selected route.
 * Includes origin/destination info, stats, and volume chart.
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Ship, Clock, TrendingUp, DollarSign, Package, MapPin } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import type { TrendingRoute, VolumeDataPoint } from '@/features/live-features/types';

interface RouteDetailsProps {
  route: TrendingRoute | null;
  volumeHistory: VolumeDataPoint[];
  onClose: () => void;
  className?: string;
}

// Mini bar chart component
function VolumeChart({ data }: { data: VolumeDataPoint[] }) {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.volume)), [data]);
  
  if (data.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
        Volume sur 6 mois
      </p>
      <div className="flex items-end gap-1 h-16">
        {data.map((item, index) => (
          <motion.div
            key={item.month}
            className="flex-1 flex flex-col items-center gap-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${(item.volume / maxValue) * 100}%` }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {item.month}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RouteDetails({
  route,
  volumeHistory,
  onClose,
  className,
}: RouteDetailsProps) {
  if (!route) return null;

  const isAir = route.service === 'air';
  const ServiceIcon = isAir ? Plane : Ship;
  const serviceColor = isAir ? 'text-cyan-500 bg-cyan-50' : 'text-blue-600 bg-blue-50';
  const serviceDarkColor = isAir ? 'dark:text-cyan-400 dark:bg-cyan-900/20' : 'dark:text-blue-400 dark:bg-blue-900/20';

  // Mock recent shipments
  const recentShipments = useMemo(() => [
    { id: 'SH001', date: 'Il y a 2h', status: 'En transit' },
    { id: 'SH002', date: 'Il y a 5h', status: 'Expédié' },
    { id: 'SH003', date: 'Hier', status: 'Livré' },
  ], []);

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-slate-900',
          'shadow-2xl border-l border-slate-200 dark:border-slate-700',
          'z-50 overflow-hidden',
          className
        )}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className={cn(
          'relative p-6',
          isAir 
            ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' 
            : 'bg-gradient-to-br from-blue-600 to-blue-700'
        )}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-white/20">
              <ServiceIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/90">
              {isAir ? 'Fret Aérien' : 'Fret Maritime'}
            </span>
          </div>

          {/* Route title */}
          <h2 className="text-2xl font-bold text-white mb-1">
            {route.origin.city} → {route.destination.city}
          </h2>
          <p className="text-white/80 text-sm">
            {route.origin.country} → {route.destination.country}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-140px)]">
          {/* Key stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Popularity */}
            <div className={cn(
              'p-4 rounded-xl',
              serviceColor,
              serviceDarkColor
            )}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium opacity-80">Popularité</span>
              </div>
              <p className="text-2xl font-bold">{route.popularity}%</p>
            </div>

            {/* Average days */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="flex items-center gap-2 mb-1 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Délai moyen</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {route.averageDays} j
              </p>
            </div>

            {/* Price range */}
            <div className="col-span-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20">
              <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs font-medium">Fourchette de prix</span>
              </div>
              <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
                {formatCurrency(route.priceRange.min)} - {formatCurrency(route.priceRange.max)}
              </p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                par m³ pour le fret maritime, par kg pour l'aérien
              </p>
            </div>
          </div>

          {/* Volume chart */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Tendance du volume
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
              <VolumeChart data={volumeHistory} />
            </div>
          </div>

          {/* Locations detail */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Itinéraire
            </h3>
            <div className="space-y-3">
              {/* Origin */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {route.origin.city}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {route.origin.country} • Volume: {route.origin.volume}%
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {route.destination.city}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {route.destination.country} • Volume: {route.destination.volume}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent shipments */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Expéditions récentes
            </h3>
            <div className="space-y-2">
              {recentShipments.map((shipment) => (
                <motion.div
                  key={shipment.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                      <Package className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {shipment.id}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {shipment.date}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    'text-xs px-2 py-1 rounded-full',
                    shipment.status === 'Livré' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : shipment.status === 'En transit'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  )}>
                    {shipment.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RouteDetails;
