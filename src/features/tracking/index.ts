/**
 * Tracking Feature
 * 
 * Complete tracking history timeline feature for shipment visualization.
 * Includes timeline components, hooks, and store for managing tracking state.
 * 
 * @example
 * ```tsx
 * import { TrackingTimeline, TrackingCard, useTrackingTimeline } from './tracking';
 * 
 * // Full timeline view
 * <TrackingTimeline trackingNumber="CLE-AIR-2026-001" />
 * 
 * // Compact card view
 * <TrackingCard trackingNumber="CLE-AIR-2026-001" />
 * 
 * // Custom implementation with hook
 * const { timeline, isLoading } = useTrackingTimeline(trackingNumber);
 * ```
 */

// Components
export { TrackingTimeline } from './components/TrackingTimeline';
export { TrackingCard } from './components/TrackingCard';
export { EmptyTracking } from './components/EmptyTracking';
export { StatusNode } from './components/StatusNode';
export { ProgressBar } from './components/ProgressBar';

// Hooks
export { useTrackingTimeline } from './hooks/useTrackingTimeline';

// Store
export { 
  useTrackingStore, 
  useCurrentTrackingNumber, 
  useTrackingLoading, 
  useTrackingError, 
  useTimeline 
} from './store/useTrackingStore';

// Re-export types from live-features with type-only export
export type { TrackingTimeline as TrackingTimelineData, TrackingEvent } from '@/features/live-features/types';
