/**
 * Shipping Comparison Feature
 *
 * Public exports for the shipping cost comparison tool.
 */

export { ComparisonForm } from './components/ComparisonForm';
export { ComparisonResults } from './components/ComparisonResults';
export { ProviderCard } from './components/ProviderCard';
export { useComparison } from './hooks/useComparison';
export { DESTINATIONS, SHIPPING_RATES } from './data';
export type {
  ShippingDestination,
  ShippingRate,
  ComparisonResult,
} from './types';
