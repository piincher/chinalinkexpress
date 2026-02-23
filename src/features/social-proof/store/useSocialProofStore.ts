/**
 * Social Proof Store
 * 
 * Zustand store for managing social proof state including events,
 * activity metrics, and real-time updates.
 * Part of the social-proof feature.
 */

'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SocialProofEvent, ActivityMetrics } from '@/features/live-features/types';

interface SocialProofState {
  // Events
  events: SocialProofEvent[];
  dismissedEventIds: string[];
  
  // Metrics
  metrics: ActivityMetrics;
  
  // Loading state
  isLoading: boolean;
  lastUpdated: string | null;
  
  // Visibility
  isBannerVisible: boolean;
  isTickerPaused: boolean;
  
  // Actions
  addEvent: (event: SocialProofEvent) => void;
  removeEvent: (eventId: string) => void;
  dismissEvent: (eventId: string) => void;
  updateMetrics: (metrics: Partial<ActivityMetrics>) => void;
  setLoading: (isLoading: boolean) => void;
  setBannerVisible: (visible: boolean) => void;
  setTickerPaused: (paused: boolean) => void;
  clearOldEvents: (maxAgeMinutes?: number) => void;
  resetDismissed: () => void;
}

// Default metrics
const defaultMetrics: ActivityMetrics = {
  currentViewers: 1,
  todayShipments: 47,
  todayDeliveries: 23,
  averageRating: 4.8,
  totalCustomers: 5000,
};

// Mock events data for simulation - use fixed timestamps to avoid hydration mismatch
// These will be replaced with dynamic data on client-side after mount
const mockEvents: SocialProofEvent[] = [
  {
    id: '1',
    type: 'viewing',
    message: '12 people viewing China-Mali route',
    location: 'Bamako',
    timestamp: '2026-02-23T06:25:00.000Z',
  },
  {
    id: '2',
    type: 'shipped',
    message: 'Package shipped from Shanghai to Lagos',
    location: 'Lagos',
    timestamp: '2026-02-23T06:20:00.000Z',
  },
  {
    id: '3',
    type: 'delivered',
    message: 'Package delivered to Dr. Touré',
    location: 'Bamako',
    timestamp: '2026-02-23T06:15:00.000Z',
  },
  {
    id: '4',
    type: 'quote',
    message: 'New quote request from Abidjan',
    location: 'Abidjan',
    timestamp: '2026-02-23T06:10:00.000Z',
  },
  {
    id: '5',
    type: 'shipped',
    message: 'Container shipped to Dakar',
    location: 'Dakar',
    timestamp: '2026-02-23T06:05:00.000Z',
  },
  {
    id: '6',
    type: 'delivered',
    message: 'Express delivery completed in Accra',
    location: 'Accra',
    timestamp: '2026-02-23T06:00:00.000Z',
  },
];

// Event generators for simulation
const eventTemplates: Omit<SocialProofEvent, 'id' | 'timestamp'>[] = [
  { type: 'viewing', message: '8 people viewing China-Mali route', location: 'Bamako' },
  { type: 'viewing', message: '15 people viewing air freight rates', location: 'Multiple' },
  { type: 'shipped', message: 'Package shipped from Guangzhou to Lagos', location: 'Lagos' },
  { type: 'shipped', message: 'Container departed Shanghai to Dakar', location: 'Dakar' },
  { type: 'delivered', message: 'Package delivered to M. Keita', location: 'Bamako' },
  { type: 'delivered', message: 'Express delivery to Dr. Diallo', location: 'Conakry' },
  { type: 'quote', message: 'New quote request from Ouagadougou', location: 'Ouagadougou' },
  { type: 'quote', message: 'Quote requested for Abidjan shipment', location: 'Abidjan' },
  { type: 'signup', message: 'New customer registered from Lomé', location: 'Lomé' },
];

export const useSocialProofStore = create<SocialProofState>()(
  devtools(
    (set, get) => ({
      // Initial state
      events: mockEvents,
      dismissedEventIds: [],
      metrics: defaultMetrics,
      isLoading: false,
      lastUpdated: new Date().toISOString(),
      isBannerVisible: true,
      isTickerPaused: false,

      // Actions
      addEvent: (event) => {
        set((state) => ({
          events: [event, ...state.events].slice(0, 50), // Keep last 50 events
          lastUpdated: new Date().toISOString(),
        }));
      },

      removeEvent: (eventId) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== eventId),
        }));
      },

      dismissEvent: (eventId) => {
        set((state) => ({
          dismissedEventIds: [...state.dismissedEventIds, eventId],
        }));
      },

      updateMetrics: (metrics) => {
        set((state) => ({
          metrics: { ...state.metrics, ...metrics },
          lastUpdated: new Date().toISOString(),
        }));
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setBannerVisible: (visible) => {
        set({ isBannerVisible: visible });
      },

      setTickerPaused: (paused) => {
        set({ isTickerPaused: paused });
      },

      clearOldEvents: (maxAgeMinutes = 60) => {
        const cutoff = new Date(Date.now() - maxAgeMinutes * 60 * 1000);
        set((state) => ({
          events: state.events.filter(
            (e) => new Date(e.timestamp) > cutoff
          ),
        }));
      },

      resetDismissed: () => {
        set({ dismissedEventIds: [] });
      },
    }),
    { name: 'social-proof-store' }
  )
);

// Selector hooks for better performance
export const useSocialProofEvents = () => 
  useSocialProofStore((state) => state.events);

export const useSocialProofMetrics = () => 
  useSocialProofStore((state) => state.metrics);

export const useSocialProofLoading = () => 
  useSocialProofStore((state) => state.isLoading);

export const useBannerVisibility = () => 
  useSocialProofStore((state) => state.isBannerVisible);

// Event simulation helper
export function generateRandomEvent(): SocialProofEvent {
  const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
  return {
    ...template,
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
}

export function simulateMetricsUpdate(current: ActivityMetrics): Partial<ActivityMetrics> {
  const updates: Partial<ActivityMetrics> = {};
  
  // Randomly update viewers (fluctuate between -5 and +8)
  if (Math.random() > 0.3) {
    const change = Math.floor(Math.random() * 14) - 5;
    updates.currentViewers = Math.max(1, current.currentViewers + change);
  }
  
  // Occasionally increment shipments
  if (Math.random() > 0.7) {
    updates.todayShipments = current.todayShipments + 1;
  }
  
  // Occasionally increment deliveries
  if (Math.random() > 0.8) {
    updates.todayDeliveries = current.todayDeliveries + 1;
  }
  
  return updates;
}
