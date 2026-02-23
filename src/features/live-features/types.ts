/**
 * Live Features Types
 * 
 * Shared TypeScript definitions for all live, interactive, and social features.
 */

import type { Shipment, ShipmentStatus } from '@/types';

// ============================================================================
// Live Shipment Feed Types
// ============================================================================

export interface LiveShipment {
  id: string;
  trackingNumber: string;
  origin: {
    city: string;
    country: string;
    code: string;
  };
  destination: {
    city: string;
    country: string;
    code: string;
  };
  service: 'air' | 'sea' | 'express';
  status: ShipmentStatus;
  timestamp: string;
  customerName?: string;
  weight?: number;
  packageType?: string;
}

export interface ShipmentFeedStats {
  totalToday: number;
  deliveredToday: number;
  inTransit: number;
  lastUpdated: string;
}

// ============================================================================
// Delivery Countdown Types
// ============================================================================

export interface DeliveryEstimate {
  trackingNumber: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  service: 'air' | 'sea' | 'express';
  progress: number; // 0-100
  currentStatus: ShipmentStatus;
  checkpoints: CountdownCheckpoint[];
}

export interface CountdownCheckpoint {
  id: string;
  label: string;
  completed: boolean;
  timestamp?: string;
  location?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  isUrgent: boolean; // < 24 hours
}

// ============================================================================
// Social Proof Types
// ============================================================================

export interface SocialProofEvent {
  id: string;
  type: 'viewing' | 'shipped' | 'delivered' | 'quote' | 'signup';
  message: string;
  location?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface TrustSignal {
  id: string;
  type: 'verified' | 'secure' | 'support' | 'rating' | 'experience';
  label: string;
  value?: string;
  icon: string;
}

export interface ActivityMetrics {
  currentViewers: number;
  todayShipments: number;
  todayDeliveries: number;
  averageRating: number;
  totalCustomers: number;
}

// ============================================================================
// Tracking History Types
// ============================================================================

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string | null;
  completed: boolean;
  icon?: string;
}

export interface TrackingTimeline {
  trackingNumber: string;
  events: TrackingEvent[];
  estimatedDelivery: string;
  actualDelivery?: string;
  isDelayed: boolean;
  delayReason?: string;
}

// ============================================================================
// Trending Routes Types
// ============================================================================

export interface RoutePoint {
  id: string;
  city: string;
  country: string;
  coordinates: {
    x: number; // Normalized 0-1 for responsive positioning
    y: number;
  };
  volume: number; // Relative shipment volume
}

export interface TrendingRoute {
  id: string;
  origin: RoutePoint;
  destination: RoutePoint;
  service: 'air' | 'sea';
  popularity: number; // 0-100
  averageDays: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface VolumeDataPoint {
  month: string;
  volume: number;
}

// ============================================================================
// Client Spotlight Types
// ============================================================================

export interface ClientStory {
  id: string;
  clientName: string;
  company: string;
  industry: string;
  location: string;
  image?: string;
  logo?: string;
  quote: string;
  metrics: {
    label: string;
    before?: string;
    after: string;
    improvement?: string;
  }[];
  since: string;
  shipmentsPerMonth: number;
}

// ============================================================================
// Quick Quote Types
// ============================================================================

export interface QuickQuoteForm {
  origin: string;
  destination: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  service: 'air' | 'sea' | 'express';
  email: string;
  phone?: string;
}

export interface QuoteEstimate {
  id: string;
  service: 'air' | 'sea' | 'express';
  price: {
    amount: number;
    currency: string;
  };
  estimatedDays: number;
  validUntil: string;
  breakdown: {
    freight: number;
    handling: number;
    insurance: number;
    customs: number;
  };
}

// ============================================================================
// Loyalty Program Types
// ============================================================================

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints?: number;
  benefits: string[];
  color: string;
  icon: string;
}

export interface LoyaltyPoints {
  current: number;
  lifetime: number;
  pending: number;
  nextTier: {
    name: string;
    pointsNeeded: number;
  };
  currentTier: LoyaltyTier;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  points: number;
  progress: number;
  maxProgress: number;
}

// ============================================================================
// Weekly Tips Types
// ============================================================================

export interface LogisticsTip {
  id: string;
  title: string;
  content: string;
  category: 'packaging' | 'documentation' | 'customs' | 'tracking' | 'general';
  icon: string;
  readTime: number; // minutes
  publishDate: string;
}

// ============================================================================
// Real-time Connection Types
// ============================================================================

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface RealtimeMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: string;
  id: string;
}

export interface RealtimeConfig {
  url: string;
  fallbackToPolling?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

// ============================================================================
// Feature State Types
// ============================================================================

export interface FeatureState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: string | null;
}

export interface LiveFeaturesUIState {
  // Visibility states
  showLiveFeed: boolean;
  showSocialProof: boolean;
  minimizedWidgets: string[];
  
  // Animation preferences
  reduceMotion: boolean;
  compactMode: boolean;
  
  // Actions
  toggleWidget: (widgetId: string) => void;
  setReduceMotion: (value: boolean) => void;
  setCompactMode: (value: boolean) => void;
}
