/**
 * useTrendingRoutes Hook
 * 
 * Hook to fetch and manage trending shipping routes data.
 * Provides mock data for popular routes from China to Africa.
 */

'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { TrendingRoute, RoutePoint } from '@/features/live-features/types';

// City coordinates (0-100% for responsive positioning)
const CITIES: Record<string, RoutePoint> = {
  shanghai: {
    id: 'shanghai',
    city: 'Shanghai',
    country: 'Chine',
    coordinates: { x: 0.75, y: 0.35 },
    volume: 95,
  },
  shenzhen: {
    id: 'shenzhen',
    city: 'Shenzhen',
    country: 'Chine',
    coordinates: { x: 0.73, y: 0.42 },
    volume: 88,
  },
  guangzhou: {
    id: 'guangzhou',
    city: 'Guangzhou',
    country: 'Chine',
    coordinates: { x: 0.72, y: 0.43 },
    volume: 72,
  },
  beijing: {
    id: 'beijing',
    city: 'Beijing',
    country: 'Chine',
    coordinates: { x: 0.76, y: 0.30 },
    volume: 65,
  },
  yiwu: {
    id: 'yiwu',
    city: 'Yiwu',
    country: 'Chine',
    coordinates: { x: 0.76, y: 0.38 },
    volume: 45,
  },
  bamako: {
    id: 'bamako',
    city: 'Bamako',
    country: 'Mali',
    coordinates: { x: 0.42, y: 0.45 },
    volume: 80,
  },
  lagos: {
    id: 'lagos',
    city: 'Lagos',
    country: 'Nigeria',
    coordinates: { x: 0.45, y: 0.50 },
    volume: 92,
  },
  dakar: {
    id: 'dakar',
    city: 'Dakar',
    country: 'Sénégal',
    coordinates: { x: 0.38, y: 0.44 },
    volume: 58,
  },
  abidjan: {
    id: 'abidjan',
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    coordinates: { x: 0.43, y: 0.52 },
    volume: 62,
  },
  nairobi: {
    id: 'nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    coordinates: { x: 0.58, y: 0.60 },
    volume: 38,
  },
  accra: {
    id: 'accra',
    city: 'Accra',
    country: 'Ghana',
    coordinates: { x: 0.44, y: 0.51 },
    volume: 70,
  },
};

// Mock trending routes data
const MOCK_ROUTES: TrendingRoute[] = [
  {
    id: 'shanghai-bamako-air',
    origin: CITIES.shanghai,
    destination: CITIES.bamako,
    service: 'air',
    popularity: 92,
    averageDays: 5,
    priceRange: { min: 85000, max: 150000, currency: 'XOF' },
  },
  {
    id: 'shenzhen-lagos-sea',
    origin: CITIES.shenzhen,
    destination: CITIES.lagos,
    service: 'sea',
    popularity: 98,
    averageDays: 28,
    priceRange: { min: 45000, max: 85000, currency: 'XOF' },
  },
  {
    id: 'guangzhou-dakar-air',
    origin: CITIES.guangzhou,
    destination: CITIES.dakar,
    service: 'air',
    popularity: 65,
    averageDays: 7,
    priceRange: { min: 75000, max: 140000, currency: 'XOF' },
  },
  {
    id: 'beijing-abidjan-sea',
    origin: CITIES.beijing,
    destination: CITIES.abidjan,
    service: 'sea',
    popularity: 58,
    averageDays: 35,
    priceRange: { min: 55000, max: 95000, currency: 'XOF' },
  },
  {
    id: 'yiwu-nairobi-air',
    origin: CITIES.yiwu,
    destination: CITIES.nairobi,
    service: 'air',
    popularity: 42,
    averageDays: 6,
    priceRange: { min: 90000, max: 160000, currency: 'XOF' },
  },
  {
    id: 'shanghai-accra-sea',
    origin: CITIES.shanghai,
    destination: CITIES.accra,
    service: 'sea',
    popularity: 78,
    averageDays: 32,
    priceRange: { min: 48000, max: 88000, currency: 'XOF' },
  },
];

// Mock volume data over time (for charts)
interface VolumeDataPoint {
  month: string;
  volume: number;
}

const generateVolumeHistory = (popularity: number): VolumeDataPoint[] => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
  const baseVolume = popularity * 10;
  
  return months.map((month, index) => ({
    month,
    volume: Math.round(baseVolume + Math.random() * 200 - 100 + index * 15),
  }));
};

interface RouteStats {
  totalRoutes: number;
  airRoutes: number;
  seaRoutes: number;
  topDestination: string;
  totalShipmentsThisMonth: number;
}

interface UseTrendingRoutesReturn {
  routes: TrendingRoute[];
  isLoading: boolean;
  selectedRoute: TrendingRoute | null;
  setSelectedRoute: (route: TrendingRoute | null) => void;
  stats: RouteStats;
  volumeHistory: VolumeDataPoint[];
  getCityRoutes: (cityId: string) => TrendingRoute[];
  getConnectedCities: (cityId: string) => RoutePoint[];
}

export function useTrendingRoutes(): UseTrendingRoutesReturn {
  const [isLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TrendingRoute | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mark as mounted to avoid hydration mismatch with random data
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate statistics
  const stats = useMemo<RouteStats>(() => {
    const airRoutes = MOCK_ROUTES.filter(r => r.service === 'air').length;
    const seaRoutes = MOCK_ROUTES.filter(r => r.service === 'sea').length;
    
    // Find top destination by volume
    const destinationVolumes: Record<string, number> = {};
    MOCK_ROUTES.forEach(route => {
      const destId = route.destination.id;
      destinationVolumes[destId] = (destinationVolumes[destId] || 0) + route.popularity;
    });
    
    const topDestinationId = Object.entries(destinationVolumes)
      .sort((a, b) => b[1] - a[1])[0]?.[0];
    const topDestination = topDestinationId 
      ? CITIES[topDestinationId]?.city || ''
      : '';

    // Calculate total shipments (mock calculation)
    const totalShipmentsThisMonth = MOCK_ROUTES.reduce(
      (sum, route) => sum + Math.round(route.popularity * 12.5), 
      0
    );

    return {
      totalRoutes: MOCK_ROUTES.length,
      airRoutes,
      seaRoutes,
      topDestination,
      totalShipmentsThisMonth,
    };
  }, []);

  // Get volume history for selected route - only generate on client
  const volumeHistory = useMemo(() => {
    if (!selectedRoute || !isMounted) return [];
    return generateVolumeHistory(selectedRoute.popularity);
  }, [selectedRoute, isMounted]);

  // Get all routes connected to a specific city
  const getCityRoutes = useCallback((cityId: string): TrendingRoute[] => {
    return MOCK_ROUTES.filter(
      route => route.origin.id === cityId || route.destination.id === cityId
    );
  }, []);

  // Get all cities connected to a specific city
  const getConnectedCities = useCallback((cityId: string): RoutePoint[] => {
    const connected = new Set<string>();
    MOCK_ROUTES.forEach(route => {
      if (route.origin.id === cityId) {
        connected.add(route.destination.id);
      } else if (route.destination.id === cityId) {
        connected.add(route.origin.id);
      }
    });
    return Array.from(connected).map(id => CITIES[id]).filter(Boolean);
  }, []);

  return {
    routes: MOCK_ROUTES,
    isLoading,
    selectedRoute,
    setSelectedRoute,
    stats,
    volumeHistory,
    getCityRoutes,
    getConnectedCities,
  };
}

export default useTrendingRoutes;
