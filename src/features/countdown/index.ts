/**
 * Countdown Feature
 * 
 * Delivery countdown feature for visual countdown to estimated delivery.
 * Includes hooks, components, and store for managing countdowns.
 * 
 * @example
 * ```tsx
 * import { DeliveryCountdown, useDeliveryCountdown } from '@/features/countdown';
 * 
 * function MyComponent() {
 *   return <DeliveryCountdown trackingNumber="CLE-2024-001" />;
 * }
 * ```
 */

// Hooks
export {
  useCountdown,
  useMultiCountdown,
  useDeliveryCountdown,
} from './hooks';

// Components
export {
  CountdownDisplay,
  CompactCountdownDisplay,
  CountdownCircle,
  CompactCountdownCircle,
  DeliveryCountdown,
} from './components';

// Store
export {
  useCountdownStore,
  useActiveCountdowns,
  useSelectedCountdown,
  useCountdownCount,
  useIsCompactMode,
  useReduceMotionPreference,
} from './store';

// Default export for convenience
export { DeliveryCountdown as default } from './components';
