/**
 * Pricing Feature
 * 
 * Enterprise-grade freight pricing calculators and rate display.
 * Includes Air and Sea freight calculators with real-time calculations.
 */

// Page Components (main exports)
export { PricingPage } from './PricingPage';
export { CalculatorPage } from './CalculatorPage';

// Constants (used internally, exported for potential external use)
export {
  AIR_RATES,
  SEA_RATES,
} from './constants';

// Utility functions (used by components)
export { formatPriceFCFA, formatNumber } from './lib/pricingEngine';
