/**
 * Tracking Store
 * 
 * Global state management for tracking feature using Zustand.
 * Part of the tracking feature.
 */

'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TrackingTimeline } from '@/features/live-features/types';

interface TrackingState {
  // Current tracking
  currentTrackingNumber: string;
  timelines: Record<string, TrackingTimeline>;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: string | null;

  // UI State
  expandedEvents: string[];
  selectedEventId: string | null;

  // Actions
  setTrackingNumber: (trackingNumber: string) => void;
  setTimeline: (trackingNumber: string, timeline: TrackingTimeline) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  refreshTimeline: (trackingNumber: string) => Promise<void>;
  toggleEventExpanded: (eventId: string) => void;
  setSelectedEvent: (eventId: string | null) => void;
  clearTracking: () => void;
}

// Mock API call for fetching timeline
async function fetchTimelineData(trackingNumber: string): Promise<TrackingTimeline> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  // Determine progress based on tracking number suffix
  const completedCount = trackingNumber.endsWith('001') ? 2 : 
                         trackingNumber.endsWith('002') ? 3 :
                         trackingNumber.endsWith('003') ? 4 :
                         trackingNumber.endsWith('DEL') ? 5 : 2;

  const STATUS_ICONS: Record<string, string> = {
    pending: 'Clipboard',
    picked_up: 'Package',
    in_transit: 'Plane',
    customs: 'FileCheck',
    out_for_delivery: 'Truck',
    delivered: 'CheckCircle',
    exception: 'AlertCircle',
  };

  const events = [
    {
      id: '1',
      status: 'pending' as const,
      title: 'Order Received',
      description: 'Your shipment has been registered in our system',
      location: 'Shanghai, China',
      timestamp: threeDaysAgo.toISOString(),
      completed: completedCount >= 1,
      icon: STATUS_ICONS.pending,
    },
    {
      id: '2',
      status: 'picked_up' as const,
      title: 'Package Picked Up',
      description: 'Collected from sender facility',
      location: 'Shanghai Pudong, China',
      timestamp: twoDaysAgo.toISOString(),
      completed: completedCount >= 2,
      icon: STATUS_ICONS.picked_up,
    },
    {
      id: '3',
      status: 'in_transit' as const,
      title: 'In Transit',
      description: 'Departed from origin facility, in transit to destination',
      location: 'Addis Ababa, Ethiopia',
      timestamp: completedCount >= 3 ? yesterday.toISOString() : null,
      completed: completedCount >= 3,
      icon: STATUS_ICONS.in_transit,
    },
    {
      id: '4',
      status: 'customs' as const,
      title: 'Customs Clearance',
      description: 'Package being processed by customs',
      location: 'Bamako, Mali',
      timestamp: completedCount >= 4 ? now.toISOString() : null,
      completed: completedCount >= 4,
      icon: STATUS_ICONS.customs,
    },
    {
      id: '5',
      status: 'delivered' as const,
      title: 'Delivered',
      description: 'Package delivered to recipient',
      location: 'Bamako, Mali',
      timestamp: completedCount >= 5 ? now.toISOString() : null,
      completed: completedCount >= 5,
      icon: STATUS_ICONS.delivered,
    },
  ];

  const isDelayed = trackingNumber.includes('DELAY');

  return {
    trackingNumber,
    events,
    estimatedDelivery: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    actualDelivery: completedCount >= 5 ? now.toISOString() : undefined,
    isDelayed,
    delayReason: isDelayed ? 'Customs inspection causing delays' : undefined,
  };
}

export const useTrackingStore = create<TrackingState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentTrackingNumber: '',
      timelines: {},
      isLoading: false,
      error: null,
      lastUpdated: null,
      expandedEvents: [],
      selectedEventId: null,

      // Actions
      setTrackingNumber: (trackingNumber) => {
        set({ currentTrackingNumber: trackingNumber });
      },

      setTimeline: (trackingNumber, timeline) => {
        set((state) => ({
          timelines: {
            ...state.timelines,
            [trackingNumber]: timeline,
          },
          lastUpdated: new Date().toISOString(),
        }));
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      setError: (error) => {
        set({ error });
      },

      refreshTimeline: async (trackingNumber) => {
        if (!trackingNumber.trim()) return;

        set({ isLoading: true, error: null });

        try {
          const timeline = await fetchTimelineData(trackingNumber);
          set((state) => ({
            timelines: {
              ...state.timelines,
              [trackingNumber]: timeline,
            },
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          }));
        } catch (err) {
          set({
            error: err instanceof Error ? err : new Error('Failed to fetch tracking data'),
            isLoading: false,
          });
        }
      },

      toggleEventExpanded: (eventId) => {
        set((state) => ({
          expandedEvents: state.expandedEvents.includes(eventId)
            ? state.expandedEvents.filter((id) => id !== eventId)
            : [...state.expandedEvents, eventId],
        }));
      },

      setSelectedEvent: (eventId) => {
        set({ selectedEventId: eventId });
      },

      clearTracking: () => {
        set({
          currentTrackingNumber: '',
          timelines: {},
          error: null,
          expandedEvents: [],
          selectedEventId: null,
        });
      },
    }),
    { name: 'tracking-store' }
  )
);

// Selector hooks for better performance
export const useCurrentTrackingNumber = () => 
  useTrackingStore((state) => state.currentTrackingNumber);
export const useTrackingLoading = () => 
  useTrackingStore((state) => state.isLoading);
export const useTrackingError = () => 
  useTrackingStore((state) => state.error);
export const useTimeline = (trackingNumber: string) => 
  useTrackingStore((state) => state.timelines[trackingNumber]);

export default useTrackingStore;
