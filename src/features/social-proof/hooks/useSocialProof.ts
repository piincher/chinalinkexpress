/**
 * useSocialProof Hook
 * 
 * Custom hook for accessing and managing social proof data.
 * Provides real-time event simulation and metrics updates.
 * Part of the social-proof feature.
 */

'use client';

import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useSocialProofStore, generateRandomEvent, simulateMetricsUpdate } from '../store/useSocialProofStore';
import type { SocialProofEvent, ActivityMetrics } from '@/features/live-features/types';

interface UseSocialProofReturn {
  // Data
  currentEvents: SocialProofEvent[];
  activityMetrics: ActivityMetrics;
  recentActivity: SocialProofEvent[];
  isLoading: boolean;
  
  // Computed
  activeViewers: number;
  todayStats: {
    shipments: number;
    deliveries: number;
  };
  
  // Actions
  dismissEvent: (eventId: string) => void;
  refreshEvents: () => void;
  hideBanner: () => void;
  showBanner: () => void;
}

export function useSocialProof(): UseSocialProofReturn {
  // Use individual selectors to prevent unnecessary re-renders
  const events = useSocialProofStore((state) => state.events);
  const dismissedEventIds = useSocialProofStore((state) => state.dismissedEventIds);
  const metrics = useSocialProofStore((state) => state.metrics);
  const isLoading = useSocialProofStore((state) => state.isLoading);
  
  // Get stable action references
  const setLoading = useSocialProofStore((state) => state.setLoading);
  const addEvent = useSocialProofStore((state) => state.addEvent);
  const updateMetrics = useSocialProofStore((state) => state.updateMetrics);
  const setBannerVisible = useSocialProofStore((state) => state.setBannerVisible);
  const dismissEventAction = useSocialProofStore((state) => state.dismissEvent);
  const clearOldEvents = useSocialProofStore((state) => state.clearOldEvents);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);

  // Filter out dismissed events
  const currentEvents = useMemo(() => {
    return events.filter(
      (event) => !dismissedEventIds.includes(event.id)
    );
  }, [events, dismissedEventIds]);

  // Get recent activity (last 10 events)
  const recentActivity = useMemo(() => {
    return currentEvents.slice(0, 10);
  }, [currentEvents]);

  // Compute active viewers
  const activeViewers = useMemo(() => {
    const viewingEvents = currentEvents.filter((e) => e.type === 'viewing');
    if (viewingEvents.length === 0) return metrics.currentViewers;
    
    // Extract number from message (e.g., "12 people viewing..." -> 12)
    const latest = viewingEvents[0];
    const match = latest.message.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : metrics.currentViewers;
  }, [currentEvents, metrics.currentViewers]);

  // Computed stats
  const todayStats = useMemo(() => ({
    shipments: metrics.todayShipments,
    deliveries: metrics.todayDeliveries,
  }), [metrics.todayShipments, metrics.todayDeliveries]);

  // Refresh events manually
  const refreshEvents = useCallback(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add a new random event
      const newEvent = generateRandomEvent();
      addEvent(newEvent);
      
      // Update metrics
      const metricUpdates = simulateMetricsUpdate(metrics);
      updateMetrics(metricUpdates);
      
      setLoading(false);
    }, 500);
  }, [setLoading, addEvent, updateMetrics, metrics]);

  // Hide/show banner
  const hideBanner = useCallback(() => {
    setBannerVisible(false);
  }, [setBannerVisible]);

  const showBanner = useCallback(() => {
    setBannerVisible(true);
  }, [setBannerVisible]);

  // Dismiss event
  const dismissEvent = useCallback((eventId: string) => {
    dismissEventAction(eventId);
  }, [dismissEventAction]);

  // Set up simulated real-time updates
  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    // Initial load
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Event simulation interval (every 30-60 seconds)
    const setupEventInterval = () => {
      const randomDelay = Math.floor(Math.random() * 30000) + 30000; // 30-60s
      
      intervalRef.current = setTimeout(() => {
        // 60% chance to add a new event
        if (Math.random() > 0.4) {
          const newEvent = generateRandomEvent();
          addEvent(newEvent);
        }
        
        // Continue the cycle
        setupEventInterval();
      }, randomDelay);
    };

    // Metrics update interval (every 45 seconds)
    metricsIntervalRef.current = setInterval(() => {
      // Get current metrics from store to avoid stale closure
      const currentMetrics = useSocialProofStore.getState().metrics;
      const updates = simulateMetricsUpdate(currentMetrics);
      updateMetrics(updates);
    }, 45000);

    setupEventInterval();

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, [setLoading, addEvent, updateMetrics]); // Stable dependencies

  // Clear old events periodically (every 10 minutes)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      clearOldEvents(120); // Clear events older than 2 hours
    }, 10 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, [clearOldEvents]);

  return {
    currentEvents,
    activityMetrics: metrics,
    recentActivity,
    isLoading,
    activeViewers,
    todayStats,
    dismissEvent,
    refreshEvents,
    hideBanner,
    showBanner,
  };
}

export default useSocialProof;
