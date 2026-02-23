/**
 * Countdown Store
 * 
 * Global state management for multiple countdowns using Zustand.
 * Part of the countdown feature.
 */

'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { DeliveryEstimate } from '@/features/live-features/types';

interface ActiveCountdown {
  /** Unique tracking number */
  trackingNumber: string;
  /** Delivery estimate data */
  delivery: DeliveryEstimate;
  /** When the countdown was added */
  addedAt: string;
  /** User-defined label (optional) */
  label?: string;
}

interface CountdownState {
  // State
  /** Active countdowns keyed by tracking number */
  activeCountdowns: Record<string, ActiveCountdown>;
  /** Currently selected tracking number */
  selectedTrackingNumber: string | null;
  /** Recent tracking numbers for quick access */
  recentTrackingNumbers: string[];
  /** Whether to show compact mode */
  compactMode: boolean;
  /** Whether to reduce motion */
  reduceMotion: boolean;

  // Actions
  /** Add a new countdown */
  addCountdown: (trackingNumber: string, delivery: DeliveryEstimate, label?: string) => void;
  /** Remove a countdown */
  removeCountdown: (trackingNumber: string) => void;
  /** Update an existing countdown */
  updateCountdown: (trackingNumber: string, delivery: DeliveryEstimate) => void;
  /** Select a countdown */
  selectCountdown: (trackingNumber: string | null) => void;
  /** Clear all countdowns */
  clearAllCountdowns: () => void;
  /** Toggle compact mode */
  setCompactMode: (compact: boolean) => void;
  /** Toggle reduced motion */
  setReduceMotion: (reduce: boolean) => void;
  /** Add to recent tracking numbers */
  addRecentTrackingNumber: (trackingNumber: string) => void;
  /** Clear recent tracking numbers */
  clearRecentTrackingNumbers: () => void;
}

const MAX_RECENT_TRACKING_NUMBERS = 5;

export const useCountdownStore = create<CountdownState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        activeCountdowns: {},
        selectedTrackingNumber: null,
        recentTrackingNumbers: [],
        compactMode: false,
        reduceMotion: false,

        // Actions
        addCountdown: (trackingNumber, delivery, label) => {
          set((state) => ({
            activeCountdowns: {
              ...state.activeCountdowns,
              [trackingNumber]: {
                trackingNumber,
                delivery,
                addedAt: new Date().toISOString(),
                label,
              },
            },
            selectedTrackingNumber: trackingNumber,
          }));
          get().addRecentTrackingNumber(trackingNumber);
        },

        removeCountdown: (trackingNumber) => {
          set((state) => {
            const { [trackingNumber]: _, ...rest } = state.activeCountdowns;
            return {
              activeCountdowns: rest,
              selectedTrackingNumber: 
                state.selectedTrackingNumber === trackingNumber 
                  ? null 
                  : state.selectedTrackingNumber,
            };
          });
        },

        updateCountdown: (trackingNumber, delivery) => {
          set((state) => {
            const existing = state.activeCountdowns[trackingNumber];
            if (!existing) return state;

            return {
              activeCountdowns: {
                ...state.activeCountdowns,
                [trackingNumber]: {
                  ...existing,
                  delivery,
                },
              },
            };
          });
        },

        selectCountdown: (trackingNumber) => {
          set({ selectedTrackingNumber: trackingNumber });
        },

        clearAllCountdowns: () => {
          set({
            activeCountdowns: {},
            selectedTrackingNumber: null,
          });
        },

        setCompactMode: (compact) => {
          set({ compactMode: compact });
        },

        setReduceMotion: (reduce) => {
          set({ reduceMotion: reduce });
        },

        addRecentTrackingNumber: (trackingNumber) => {
          set((state) => {
            const filtered = state.recentTrackingNumbers.filter(
              (tn) => tn !== trackingNumber
            );
            return {
              recentTrackingNumbers: [trackingNumber, ...filtered].slice(
                0,
                MAX_RECENT_TRACKING_NUMBERS
              ),
            };
          });
        },

        clearRecentTrackingNumbers: () => {
          set({ recentTrackingNumbers: [] });
        },
      }),
      {
        name: 'countdown-storage',
        partialize: (state) => ({
          // Only persist certain fields
          activeCountdowns: state.activeCountdowns,
          recentTrackingNumbers: state.recentTrackingNumbers,
          compactMode: state.compactMode,
          reduceMotion: state.reduceMotion,
        }),
      }
    ),
    { name: 'countdown-store' }
  )
);

// Selector hooks for better performance
export const useActiveCountdowns = () => 
  useCountdownStore((state) => state.activeCountdowns);

export const useSelectedCountdown = () => {
  const selected = useCountdownStore((state) => state.selectedTrackingNumber);
  const countdowns = useCountdownStore((state) => state.activeCountdowns);
  return selected ? countdowns[selected] : null;
};

export const useCountdownCount = () => 
  useCountdownStore((state) => Object.keys(state.activeCountdowns).length);

export const useIsCompactMode = () => 
  useCountdownStore((state) => state.compactMode);

export const useReduceMotionPreference = () => 
  useCountdownStore((state) => state.reduceMotion);

export default useCountdownStore;
