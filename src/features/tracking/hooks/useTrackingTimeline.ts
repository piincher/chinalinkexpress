/**
 * useTrackingTimeline Hook
 * 
 * Hook to fetch and manage tracking timeline data.
 * Part of the tracking feature.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TrackingTimeline, TrackingEvent } from '@/features/live-features/types';

interface UseTrackingTimelineReturn {
  timeline: TrackingTimeline | null;
  events: TrackingEvent[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
  progress: number;
  currentStatus: TrackingEvent | null;
}

// Icon mapping for different statuses
const STATUS_ICONS: Record<string, string> = {
  pending: 'Clipboard',
  picked_up: 'Package',
  in_transit: 'Plane',
  customs: 'FileCheck',
  out_for_delivery: 'Truck',
  delivered: 'CheckCircle',
  exception: 'AlertCircle',
};

// Mock timeline data generator
function generateMockTimeline(trackingNumber: string): TrackingTimeline {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  // Determine how many events are completed based on tracking number
  const completedCount = trackingNumber.endsWith('001') ? 2 : 
                         trackingNumber.endsWith('002') ? 3 :
                         trackingNumber.endsWith('003') ? 4 :
                         trackingNumber.endsWith('DEL') ? 5 : 2;

  const events: TrackingEvent[] = [
    {
      id: '1',
      status: 'pending',
      title: 'Order Received',
      description: 'Your shipment has been registered in our system',
      location: 'Shanghai, China',
      timestamp: threeDaysAgo.toISOString(),
      completed: completedCount >= 1,
      icon: STATUS_ICONS.pending,
    },
    {
      id: '2',
      status: 'picked_up',
      title: 'Package Picked Up',
      description: 'Collected from sender facility',
      location: 'Shanghai Pudong, China',
      timestamp: twoDaysAgo.toISOString(),
      completed: completedCount >= 2,
      icon: STATUS_ICONS.picked_up,
    },
    {
      id: '3',
      status: 'in_transit',
      title: 'In Transit',
      description: 'Departed from origin facility, in transit to destination',
      location: 'Addis Ababa, Ethiopia',
      timestamp: completedCount >= 3 ? yesterday.toISOString() : null,
      completed: completedCount >= 3,
      icon: STATUS_ICONS.in_transit,
    },
    {
      id: '4',
      status: 'customs',
      title: 'Customs Clearance',
      description: 'Package being processed by customs',
      location: 'Bamako, Mali',
      timestamp: completedCount >= 4 ? now.toISOString() : null,
      completed: completedCount >= 4,
      icon: STATUS_ICONS.customs,
    },
    {
      id: '5',
      status: 'delivered',
      title: 'Delivered',
      description: 'Package delivered to recipient',
      location: 'Bamako, Mali',
      timestamp: completedCount >= 5 ? now.toISOString() : null,
      completed: completedCount >= 5,
      icon: STATUS_ICONS.delivered,
    },
  ];

  // Add delay for certain tracking numbers
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

export function useTrackingTimeline(trackingNumber: string): UseTrackingTimelineReturn {
  const [timeline, setTimeline] = useState<TrackingTimeline | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimeline = useCallback(async () => {
    if (!trackingNumber.trim()) {
      setTimeline(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock data
      const mockData = generateMockTimeline(trackingNumber);
      setTimeline(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tracking data'));
      setTimeline(null);
    } finally {
      setIsLoading(false);
    }
  }, [trackingNumber]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  // Calculate progress percentage
  const progress = timeline 
    ? Math.round((timeline.events.filter(e => e.completed).length / timeline.events.length) * 100)
    : 0;

  // Find current status (first non-completed or last completed)
  const currentStatus = timeline
    ? timeline.events.find(e => !e.completed) || timeline.events[timeline.events.length - 1] || null
    : null;

  return {
    timeline,
    events: timeline?.events || [],
    isLoading,
    error,
    refresh: fetchTimeline,
    progress,
    currentStatus,
  };
}

export default useTrackingTimeline;
