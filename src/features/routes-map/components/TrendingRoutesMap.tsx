/**
 * TrendingRoutesMap Component
 * 
 * Main interactive map component showing popular shipping routes
 * from China to Africa with animated visualizations.
 * Features responsive design for mobile and desktop.
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Ship, TrendingUp, MapPin, X, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useTrendingRoutes } from '../hooks/useTrendingRoutes';
import { RouteLine } from './RouteLine';
import { RoutePoint } from './RoutePoint';
import { HeatmapOverlay, MobileHeatmapOverlay } from './HeatmapOverlay';
import { RouteDetails } from './RouteDetails';
import type { TrendingRoute, RoutePoint as RoutePointType } from '@/features/live-features/types';

// Simplified map background component
function MapBackground({ className }: { className?: string }) {
  return (
    <svg
      className={cn('absolute inset-0 w-full h-full', className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="0.5" cy="0.5" r="0.3" className="fill-slate-200 dark:fill-slate-700" />
        </pattern>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-slate-50 dark:text-slate-900" stopColor="currentColor" />
          <stop offset="100%" className="text-blue-50 dark:text-slate-800" stopColor="currentColor" />
        </linearGradient>
      </defs>
      
      {/* Background gradient */}
      <rect width="100" height="100" fill="url(#mapGradient)" />
      
      {/* Dot grid */}
      <rect width="100" height="100" fill="url(#grid)" opacity="0.5" />

      {/* Simplified continent shapes (China and Africa regions) */}
      {/* China region - simplified blob */}
      <path
        d="M55 15 Q75 10 85 25 Q90 35 85 50 Q80 60 70 55 Q60 50 55 40 Q50 25 55 15"
        className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.5"
        opacity="0.6"
      />

      {/* Africa region - simplified blob */}
      <path
        d="M35 30 Q45 25 50 35 Q55 45 50 60 Q45 75 40 70 Q30 65 28 50 Q25 35 35 30"
        className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
        strokeWidth="0.5"
        opacity="0.6"
      />

      {/* Decorative connection lines in background */}
      <g opacity="0.1" className="stroke-slate-400 dark:stroke-slate-500">
        <line x1="75" y1="35" x2="42" y2="45" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="73" y1="42" x2="45" y2="50" strokeWidth="0.3" strokeDasharray="2 2" />
        <line x1="72" y1="43" x2="38" y2="44" strokeWidth="0.3" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

// Legend component
function MapLegend() {
  const t = useTranslations('routesMap');
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-6 h-0.5 bg-cyan-500 border-dashed border-t border-cyan-500" style={{ borderStyle: 'dashed' }} />
        <span className="text-slate-600 dark:text-slate-400">{t('airRoute')}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-0.5 bg-blue-600" />
        <span className="text-slate-600 dark:text-slate-400">{t('seaRoute')}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-cyan-500/30 border-2 border-cyan-500" />
        <span className="text-slate-600 dark:text-slate-400">{t('popularity')}</span>
      </div>
    </div>
  );
}

// Stats panel component
function StatsPanel({ stats }: { stats: ReturnType<typeof useTrendingRoutes>['stats'] }) {
  const t = useTranslations('routesMap');

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <motion.div
        className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
          <MapPin className="w-4 h-4" />
          <span className="text-xs">Routes</span>
        </div>
        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {stats.totalRoutes}
        </p>
      </motion.div>

      <motion.div
        className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
          <Plane className="w-4 h-4" />
          <span className="text-xs">Aérien</span>
        </div>
        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {stats.airRoutes}
        </p>
      </motion.div>

      <motion.div
        className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <Ship className="w-4 h-4" />
          <span className="text-xs">Maritime</span>
        </div>
        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {stats.seaRoutes}
        </p>
      </motion.div>

      <motion.div
        className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs">{t('shipments')}</span>
        </div>
        <p className="text-xl md:text-2xl font-bold text-amber-700 dark:text-amber-300">
          {stats.totalShipmentsThisMonth.toLocaleString('fr-FR')}
        </p>
      </motion.div>
    </div>
  );
}

// Mobile simplified list view
function MobileRouteList({
  routes,
  onSelectRoute,
}: {
  routes: TrendingRoute[];
  onSelectRoute: (route: TrendingRoute) => void;
}) {
  const t = useTranslations('routesMap');

  return (
    <div className="space-y-3">
      {routes.map((route, index) => (
        <motion.button
          key={route.id}
          className={cn(
            'w-full p-4 rounded-xl text-left transition-colors',
            'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
            'hover:border-cyan-300 dark:hover:border-cyan-700',
            'active:scale-[0.98]'
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectRoute(route)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-lg',
                route.service === 'air'
                  ? 'bg-cyan-100 dark:bg-cyan-900/30'
                  : 'bg-blue-100 dark:bg-blue-900/30'
              )}>
                {route.service === 'air' ? (
                  <Plane className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <Ship className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {route.origin.city} → {route.destination.city}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {route.averageDays} jours • {route.popularity}% popularité
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export function TrendingRoutesMap() {
  const t = useTranslations('routesMap');
  const [isMobile, setIsMobile] = React.useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const {
    routes,
    isLoading,
    selectedRoute,
    setSelectedRoute,
    stats,
    volumeHistory,
    getCityRoutes,
  } = useTrendingRoutes();

  // Check mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get unique cities from routes
  const cities = useMemo(() => {
    const cityMap = new Map<string, RoutePointType>();
    routes.forEach(route => {
      cityMap.set(route.origin.id, route.origin);
      cityMap.set(route.destination.id, route.destination);
    });
    return Array.from(cityMap.values());
  }, [routes]);

  // Get connected routes info for a city
  const getConnectedRoutesInfo = useCallback((cityId: string) => {
    const cityRoutes = getCityRoutes(cityId);
    const airCount = cityRoutes.filter(r => r.service === 'air').length;
    const seaCount = cityRoutes.filter(r => r.service === 'sea').length;
    const connected: { service: 'air' | 'sea'; count: number }[] = [];
    if (airCount) connected.push({ service: 'air', count: airCount });
    if (seaCount) connected.push({ service: 'sea', count: seaCount });
    return connected;
  }, [getCityRoutes]);

  // Check if city is connected to hovered route
  const isCityConnectedToHoveredRoute = useCallback((cityId: string) => {
    if (!hoveredRoute) return false;
    const route = routes.find(r => r.id === hoveredRoute);
    if (!route) return false;
    return route.origin.id === cityId || route.destination.id === cityId;
  }, [hoveredRoute, routes]);

  // Check if route is connected to hovered city
  const isRouteConnectedToHoveredCity = useCallback((route: TrendingRoute) => {
    if (!hoveredCity) return false;
    return route.origin.id === hoveredCity || route.destination.id === hoveredCity;
  }, [hoveredCity]);

  const handleRouteClick = useCallback((route: TrendingRoute) => {
    setSelectedRoute(route);
  }, [setSelectedRoute]);

  const handleCloseDetails = useCallback(() => {
    setSelectedRoute(null);
  }, [setSelectedRoute]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl bg-slate-50 dark:bg-slate-900 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-blue-50/30 dark:via-blue-950/10 to-white dark:to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Live Routes
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Panel */}
        <div className="mb-6 md:mb-8">
          <StatsPanel stats={stats} />
        </div>

        {/* Map Container */}
        <motion.div
          className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Mobile View: Simplified List */}
          {isMobile ? (
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Routes populaires
              </h3>
              <MobileRouteList routes={routes} onSelectRoute={handleRouteClick} />
            </div>
          ) : (
            /* Desktop View: Full Interactive Map */
            <div className="relative aspect-[16/10] md:aspect-[16/9]">
              {/* Map Background */}
              <MapBackground />

              {/* Heatmap Overlay */}
              <HeatmapOverlay points={cities} />

              {/* SVG Map */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Route Lines */}
                {routes.map((route, index) => (
                  <RouteLine
                    key={route.id}
                    route={route}
                    isActive={selectedRoute?.id === route.id}
                    isHighlighted={hoveredRoute === route.id || isRouteConnectedToHoveredCity(route)}
                    onClick={() => handleRouteClick(route)}
                    onHover={() => setHoveredRoute(route.id)}
                    onLeave={() => setHoveredRoute(null)}
                    animationDelay={index * 0.15}
                  />
                ))}

                {/* City Points */}
                {cities.map((city, index) => (
                  <RoutePoint
                    key={city.id}
                    point={city}
                    isActive={selectedRoute?.origin.id === city.id || selectedRoute?.destination.id === city.id}
                    isHighlighted={hoveredCity === city.id || isCityConnectedToHoveredRoute(city.id)}
                    connectedRoutes={getConnectedRoutesInfo(city.id)}
                    onHover={() => setHoveredCity(city.id)}
                    onLeave={() => setHoveredCity(null)}
                    animationDelay={0.5 + index * 0.08}
                  />
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto">
                <div className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                  <MapLegend />
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Top Routes List (Desktop only) */}
        {!isMobile && (
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {routes.slice(0, 3).map((route, index) => (
              <motion.button
                key={route.id}
                className={cn(
                  'p-4 rounded-xl text-left transition-all',
                  'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
                  'hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-md',
                  selectedRoute?.id === route.id && 'border-cyan-500 dark:border-cyan-500 ring-2 ring-cyan-500/20'
                )}
                onClick={() => handleRouteClick(route)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {route.service === 'air' ? (
                      <Plane className="w-4 h-4 text-cyan-500" />
                    ) : (
                      <Ship className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      #{index + 1} Popularité {route.popularity}%
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {route.origin.city} → {route.destination.city}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {route.averageDays} jours en moyenne
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Route Details Panel */}
      <AnimatePresence>
        {selectedRoute && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
            />
            {/* Panel */}
            <RouteDetails
              route={selectedRoute}
              volumeHistory={volumeHistory}
              onClose={handleCloseDetails}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default TrendingRoutesMap;
