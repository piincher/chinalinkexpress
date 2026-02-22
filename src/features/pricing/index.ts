/**
 * Pricing Feature
 * 
 * Enterprise-grade freight pricing calculators and rate display.
 * Includes Air and Sea freight calculators with real-time calculations.
 */

// Components
export {
  PricingHero,
  PriceTable,
  NavigationButton,
  CalculatorCard,
  ModeSelector,
  AirCalculator,
  SeaCalculator,
  ProhibitedItems,
  PricingFAQ,
} from './components';

// Page Components
export { PricingPage } from './PricingPage';
export { CalculatorPage } from './CalculatorPage';

// Store
export { usePricingStore } from './store/usePricingStore';

// Constants
export {
  AIR_RATES,
  SEA_RATES,
  ITEM_CATEGORIES,
  PROHIBITED_ITEMS,
  VOLUMETRIC_DIVISOR,
  DENSITY_THRESHOLDS,
} from './constants';
export type { ShippingMode, ItemCategory, ItemCategoryInfo } from './constants';

// Engine
export {
  calculateAirFreight,
  calculateSeaFreight,
  calculateVolumetricWeight,
  calculateCBM,
  calculateDensity,
  formatPriceFCFA,
  formatNumber,
} from './lib/pricingEngine';
export type {
  AirCalculationInput,
  SeaCalculationInput,
  AirCalculationResult,
  SeaCalculationResult,
} from './lib/pricingEngine';
