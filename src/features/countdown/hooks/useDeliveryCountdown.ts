/**
 * useDeliveryCountdown Hook
 * 
 * Specialized hook for delivery countdown with mock data support.
 * Returns countdown data, delivery info, and progress percentage.
 * Part of the countdown feature.
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { DeliveryEstimate, CountdownCheckpoint } from '@/features/live-features/types';
import type { ShipmentStatus } from '@/types';
import { useCountdown } from './useCountdown';

// Mock delivery data generator for demo purposes
// Uses fixed dates to avoid hydration mismatch, adjusted on client
function generateMockDeliveryData(): Record<string, DeliveryEstimate> {
  return {
    'CLE-2024-001': {
      trackingNumber: 'CLE-2024-001',
      origin: 'Shanghai, China',
      destination: 'Bamako, Mali',
      service: 'air',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      progress: 65,
      currentStatus: 'in_transit',
      checkpoints: [
        { id: '1', label: 'ordered', completed: true, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', label: 'shipped', completed: true, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '3', label: 'inTransit', completed: false },
        { id: '4', label: 'delivered', completed: false },
      ],
    },
    'CLE-2024-002': {
      trackingNumber: 'CLE-2024-002',
      origin: 'Shenzhen, China',
      destination: 'Lagos, Nigeria',
      service: 'sea',
      estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      progress: 30,
      currentStatus: 'in_transit',
      checkpoints: [
        { id: '1', label: 'ordered', completed: true, timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', label: 'shipped', completed: true, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '3', label: 'inTransit', completed: false },
        { id: '4', label: 'delivered', completed: false },
      ],
    },
    'CLE-2024-003': {
      trackingNumber: 'CLE-2024-003',
      origin: 'Guangzhou, China',
      destination: 'Dakar, Senegal',
      service: 'express',
      estimatedDelivery: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now (urgent)
      progress: 85,
      currentStatus: 'out_for_delivery',
      checkpoints: [
        { id: '1', label: 'ordered', completed: true, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', label: 'shipped', completed: true, timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
        { id: '3', label: 'inTransit', completed: true, timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString() },
        { id: '4', label: 'delivered', completed: false },
      ],
    },
    'CLE-2024-004': {
      trackingNumber: 'CLE-2024-004',
      origin: 'Beijing, China',
      destination: 'Abidjan, Côte d\'Ivoire',
      service: 'air',
      estimatedDelivery: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Already delivered
      progress: 100,
      currentStatus: 'delivered',
      checkpoints: [
        { id: '1', label: 'ordered', completed: true, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '2', label: 'shipped', completed: true, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '3', label: 'inTransit', completed: true, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { id: '4', label: 'delivered', completed: true, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      ],
    },
  };
}

interface UseDeliveryCountdownOptions {
  /** Tracking number (optional - uses mock if not provided) */
  trackingNumber?: string;
  /** Whether to use mock data for demo */
  useMockData?: boolean;
}

interface DeliveryCountdownResult {
  /** Countdown time values */
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isExpired: boolean;
    isUrgent: boolean;
  };
  /** Delivery estimate data */
  delivery: DeliveryEstimate | null;
  /** Progress percentage (0-100) */
  progress: number;
  /** Whether data is loading */
  isLoading: boolean;
  /** Error if any */
  error: Error | null;
  /** Current status label */
  statusLabel: string;
  /** Whether delivery is delivered */
  isDelivered: boolean;
  /** Whether delivery is arriving today */
  isArrivingToday: boolean;
}

/**
 * Calculate progress based on checkpoints
 */
function calculateProgressFromCheckpoints(checkpoints: CountdownCheckpoint[]): number {
  if (!checkpoints.length) return 0;
  const completedCount = checkpoints.filter(cp => cp.completed).length;
  return Math.round((completedCount / checkpoints.length) * 100);
}

/**
 * Get status label from status code
 */
function getStatusLabel(status: ShipmentStatus): string {
  const labels: Record<ShipmentStatus, string> = {
    pending: 'ordered',
    picked_up: 'shipped',
    in_transit: 'inTransit',
    customs: 'inTransit',
    out_for_delivery: 'inTransit',
    delivered: 'delivered',
    exception: 'inTransit',
  };
  return labels[status] || 'inTransit';
}

/**
 * Check if delivery is arriving today
 */
function isArrivingToday(estimatedDelivery: string): boolean {
  const today = new Date();
  const delivery = new Date(estimatedDelivery);
  return (
    today.getDate() === delivery.getDate() &&
    today.getMonth() === delivery.getMonth() &&
    today.getFullYear() === delivery.getFullYear()
  );
}

/**
 * Specialized hook for delivery countdown
 * 
 * @example
 * ```tsx
 * const { countdown, delivery, progress, isDelivered } = useDeliveryCountdown({
 *   trackingNumber: 'CLE-2024-001',
 * });
 * ```
 */
export function useDeliveryCountdown({
  trackingNumber,
  useMockData = true,
}: UseDeliveryCountdownOptions = {}): DeliveryCountdownResult {
  const [delivery, setDelivery] = useState<DeliveryEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch delivery data
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        if (useMockData) {
          const mockNumber = trackingNumber || 'CLE-2024-001';
          const mockData = generateMockDeliveryData();
          const data = mockData[mockNumber];
          
          if (data) {
            // Update checkpoints based on current status
            const statusIndex = ['pending', 'picked_up', 'in_transit', 'customs', 'out_for_delivery', 'delivered'].indexOf(data.currentStatus);
            const updatedCheckpoints = data.checkpoints.map((cp, index) => ({
              ...cp,
              completed: index <= Math.max(0, statusIndex - 1) || (data.currentStatus === 'delivered' && index === 3),
            }));
            
            setDelivery({
              ...data,
              checkpoints: updatedCheckpoints,
            });
          } else {
            // Default mock data if tracking number not found
            setDelivery(mockData['CLE-2024-001']);
          }
        } else {
          // TODO: Implement real API call
          setError(new Error('Real API not implemented yet'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch delivery data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [trackingNumber, useMockData]);

  // Use generic countdown hook
  const countdown = useCountdown({
    targetDate: delivery?.estimatedDelivery || new Date().toISOString(),
    urgentThreshold: 24,
  });

  // Calculate progress (use API value or calculate from checkpoints)
  const progress = useMemo(() => {
    if (!delivery) return 0;
    if (delivery.progress) return delivery.progress;
    return calculateProgressFromCheckpoints(delivery.checkpoints);
  }, [delivery]);

  // Derived states
  const isDelivered = delivery?.currentStatus === 'delivered' || countdown.isExpired;
  const arrivingToday = delivery ? isArrivingToday(delivery.estimatedDelivery) : false;
  const statusLabel = delivery ? getStatusLabel(delivery.currentStatus) : 'ordered';

  return {
    countdown: {
      days: countdown.days,
      hours: countdown.hours,
      minutes: countdown.minutes,
      seconds: countdown.seconds,
      totalSeconds: countdown.totalSeconds,
      isExpired: countdown.isExpired,
      isUrgent: countdown.isUrgent,
    },
    delivery,
    progress,
    isLoading,
    error,
    statusLabel,
    isDelivered,
    isArrivingToday: arrivingToday && !isDelivered,
  };
}

export default useDeliveryCountdown;
