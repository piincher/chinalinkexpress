/**
 * Use Live Shipments Hook
 * 
 * Custom hook for managing live shipment data with simulated real-time updates.
 * Handles connection status, automatic updates, and cleanup.
 * Part of the live-feed feature.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLiveFeedStore } from '../store/useLiveFeedStore';
import type { LiveShipment, ShipmentFeedStats } from '@/features/live-features/types';
import type { ConnectionStatus } from '@/features/live-features/types';
import type { ShipmentStatus } from '@/types';

// Mock data generators
const ORIGINS = [
  { city: 'Shanghai', country: 'Chine', code: 'SHA' },
  { city: 'Shenzhen', country: 'Chine', code: 'SZX' },
  { city: 'Guangzhou', country: 'Chine', code: 'CAN' },
  { city: 'Beijing', country: 'Chine', code: 'PEK' },
  { city: 'Yiwu', country: 'Chine', code: 'YIW' },
];

const DESTINATIONS = [
  { city: 'Bamako', country: 'Mali', code: 'BKO' },
  { city: 'Lagos', country: 'Nigeria', code: 'LOS' },
  { city: 'Dakar', country: 'Sénégal', code: 'DKR' },
  { city: 'Abidjan', country: "Côte d'Ivoire", code: 'ABJ' },
  { city: 'Nairobi', country: 'Kenya', code: 'NBO' },
];

const SERVICE_TYPES: Array<'air' | 'sea'> = ['air', 'sea'];

const STATUSES: ShipmentStatus[] = ['pending', 'in_transit', 'delivered', 'customs', 'out_for_delivery'];

const STATUS_WEIGHTS: Record<ShipmentStatus, number> = {
  pending: 0.1,
  picked_up: 0.1,
  in_transit: 0.3,
  customs: 0.15,
  out_for_delivery: 0.15,
  delivered: 0.18,
  exception: 0.02,
};

/**
 * Generate a random tracking number
 */
function generateTrackingNumber(): string {
  const prefix = 'CLE';
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const suffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${random}-${suffix}`;
}

/**
 * Weighted random selection for status
 */
function getRandomStatus(): ShipmentStatus {
  const rand = Math.random();
  let cumulative = 0;
  
  for (const [status, weight] of Object.entries(STATUS_WEIGHTS)) {
    cumulative += weight;
    if (rand <= cumulative) return status as ShipmentStatus;
  }
  
  return 'in_transit';
}

/**
 * Generate a random mock shipment
 */
function generateMockShipment(): LiveShipment {
  const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
  const destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
  const service = SERVICE_TYPES[Math.floor(Math.random() * SERVICE_TYPES.length)];
  const status = getRandomStatus();
  
  // Random weight between 0.5 and 100 kg
  const weight = Number((Math.random() * 99.5 + 0.5).toFixed(1));
  
  return {
    id: `shipment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    trackingNumber: generateTrackingNumber(),
    origin,
    destination,
    service,
    status,
    timestamp: new Date().toISOString(),
    weight,
    packageType: 'Colis',
  };
}

interface UseLiveShipmentsReturn {
  shipments: LiveShipment[];
  stats: ShipmentFeedStats;
  isConnected: boolean;
  isLoading: boolean;
  connectionStatus: ConnectionStatus;
  error: string | null;
}

/**
 * Hook for managing live shipment data with simulated real-time updates
 */
export function useLiveShipments(): UseLiveShipmentsReturn {
  // Use individual selectors to prevent unnecessary re-renders
  const shipments = useLiveFeedStore((state) => state.shipments);
  const stats = useLiveFeedStore((state) => state.stats);
  const isLoading = useLiveFeedStore((state) => state.isLoading);
  const error = useLiveFeedStore((state) => state.error);
  const connectionStatus = useLiveFeedStore((state) => state.connectionStatus);
  
  // Get stable action references
  const addShipment = useLiveFeedStore((state) => state.addShipment);
  const setConnectionStatus = useLiveFeedStore((state) => state.setConnectionStatus);
  const fetchStats = useLiveFeedStore((state) => state.fetchStats);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasConnectedRef = useRef(false);

  // Simulate connecting to real-time feed
  const connect = useCallback(() => {
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    reconnectTimeoutRef.current = setTimeout(() => {
      setConnectionStatus('connected');
      
      // Start generating mock shipments
      intervalRef.current = setInterval(() => {
        // 70% chance to add a new shipment every interval
        if (Math.random() > 0.3) {
          const shipment = generateMockShipment();
          addShipment(shipment);
        }
      }, 5000); // New shipment every 5 seconds on average
      
      // Fetch initial stats
      fetchStats();
    }, 1000);
  }, [addShipment, fetchStats, setConnectionStatus]);

  // Disconnect from feed
  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setConnectionStatus('disconnected');
  }, [setConnectionStatus]);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    // Prevent multiple connections
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;
    
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Update stats periodically
  useEffect(() => {
    if (connectionStatus !== 'connected') return;
    
    const statsInterval = setInterval(() => {
      fetchStats();
    }, 30000); // Update stats every 30 seconds
    
    return () => clearInterval(statsInterval);
  }, [connectionStatus, fetchStats]);

  // Simulate occasional connection issues
  useEffect(() => {
    if (connectionStatus !== 'connected') return;
    
    const connectionIssuesInterval = setInterval(() => {
      // 5% chance of temporary disconnection
      if (Math.random() < 0.05) {
        setConnectionStatus('disconnected');
        
        // Reconnect after 2 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          setConnectionStatus('connected');
        }, 2000);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(connectionIssuesInterval);
  }, [connectionStatus, setConnectionStatus]);

  return {
    shipments,
    stats,
    isConnected: connectionStatus === 'connected',
    isLoading,
    connectionStatus,
    error,
  };
}

export default useLiveShipments;
