/**
 * Live Feed Store
 * 
 * Zustand store for managing live shipment feed state.
 * Handles shipments, stats, loading states, and connection status.
 * Part of the live-feed feature.
 */

'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LiveShipment, ShipmentFeedStats } from '@/features/live-features/types';
import type { ConnectionStatus } from '@/features/live-features/types';

interface LiveFeedState {
  // Data
  shipments: LiveShipment[];
  stats: ShipmentFeedStats;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  connectionStatus: ConnectionStatus;
  filter: 'all' | 'air' | 'sea';
  
  // Actions
  addShipment: (shipment: LiveShipment) => void;
  updateShipment: (id: string, updates: Partial<LiveShipment>) => void;
  removeShipment: (id: string) => void;
  setShipments: (shipments: LiveShipment[]) => void;
  fetchStats: () => Promise<void>;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: 'all' | 'air' | 'sea') => void;
  clearOldShipments: (maxAgeMs: number) => void;
}

// Use a fixed initial date to avoid hydration mismatch
// The actual date will be set on first client-side update
const initialStats: ShipmentFeedStats = {
  totalToday: 0,
  deliveredToday: 0,
  inTransit: 0,
  lastUpdated: '',
};

const MAX_STORED_SHIPMENTS = 50;

export const useLiveFeedStore = create<LiveFeedState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        shipments: [],
        stats: initialStats,
        isLoading: false,
        error: null,
        connectionStatus: 'disconnected',
        filter: 'all',

        // Actions
        addShipment: (shipment) => {
          set((state) => {
            // Prevent duplicates
            if (state.shipments.some((s) => s.id === shipment.id)) {
              return state;
            }
            
            // Add new shipment at the beginning and limit total count
            const newShipments = [shipment, ...state.shipments].slice(0, MAX_STORED_SHIPMENTS);
            
            // Update stats
            const newStats = {
              ...state.stats,
              totalToday: state.stats.totalToday + 1,
              inTransit: shipment.status === 'in_transit' 
                ? state.stats.inTransit + 1 
                : state.stats.inTransit,
              deliveredToday: shipment.status === 'delivered'
                ? state.stats.deliveredToday + 1
                : state.stats.deliveredToday,
              lastUpdated: new Date().toISOString(),
            };
            
            return {
              shipments: newShipments,
              stats: newStats,
            };
          });
        },

        updateShipment: (id, updates) => {
          set((state) => ({
            shipments: state.shipments.map((shipment) =>
              shipment.id === id ? { ...shipment, ...updates } : shipment
            ),
          }));
        },

        removeShipment: (id) => {
          set((state) => ({
            shipments: state.shipments.filter((shipment) => shipment.id !== id),
          }));
        },

        setShipments: (shipments) => {
          set({ shipments: shipments.slice(0, MAX_STORED_SHIPMENTS) });
        },

        fetchStats: async () => {
          set({ isLoading: true, error: null });
          
          try {
            // Simulate API call - in production, this would fetch from backend
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            const { shipments } = get();
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            
            // Calculate stats from current shipments
            const todayShipments = shipments.filter(
              (s) => s.timestamp.startsWith(today)
            );
            
            const stats: ShipmentFeedStats = {
              totalToday: todayShipments.length,
              deliveredToday: todayShipments.filter((s) => s.status === 'delivered').length,
              inTransit: shipments.filter((s) => s.status === 'in_transit').length,
              lastUpdated: now.toISOString(),
            };
            
            set({ stats, isLoading: false });
          } catch (err) {
            set({
              error: err instanceof Error ? err.message : 'Failed to fetch stats',
              isLoading: false,
            });
          }
        },

        setConnectionStatus: (status) => {
          set({ connectionStatus: status });
        },

        setLoading: (loading) => {
          set({ isLoading: loading });
        },

        setError: (error) => {
          set({ error });
        },

        setFilter: (filter) => {
          set({ filter });
        },

        clearOldShipments: (maxAgeMs) => {
          set((state) => {
            const cutoff = Date.now() - maxAgeMs;
            const filtered = state.shipments.filter(
              (s) => new Date(s.timestamp).getTime() > cutoff
            );
            return { shipments: filtered };
          });
        },
      }),
      {
        name: 'live-feed-store',
        partialize: (state) => ({
          shipments: state.shipments.slice(0, 20), // Only persist recent 20
          stats: state.stats,
        }),
      }
    ),
    { name: 'live-feed-store' }
  )
);

// Selector hooks for better performance
export const useShipments = () => useLiveFeedStore((state) => state.shipments);
export const useFilteredShipments = () =>
  useLiveFeedStore((state) => {
    if (state.filter === 'all') return state.shipments;
    return state.shipments.filter((s) => s.service === state.filter);
  });
export const useFeedStats = () => useLiveFeedStore((state) => state.stats);
export const useConnectionStatus = () => useLiveFeedStore((state) => state.connectionStatus);
export const useFeedFilter = () => useLiveFeedStore((state) => state.filter);
export const useFeedLoading = () => useLiveFeedStore((state) => state.isLoading);
