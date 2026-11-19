/**
 * Pricing Engine
 * 
 * Core calculation logic for freight pricing.
 * Handles volumetric weight, density calculations, and price estimation.
 * Part of the pricing feature.
 */

import {
  AIR_RATES,
  SEA_RATES,
  DENSITY_THRESHOLDS,
  VOLUMETRIC_DIVISOR,
  type AirRate,
  type ItemCategory,
} from '../constants';
import type { SeaPricing } from './livePricing';

const FALLBACK_SEA: SeaPricing = {
  ratePerCbm: SEA_RATES.rateFCFA,
  kgPerCbm: DENSITY_THRESHOLDS.kgPerCBM,
  minCbm: DENSITY_THRESHOLDS.minCBM,
};

export interface AirCalculationInput {
  weight: number; // kg
  length?: number; // cm
  width?: number; // cm
  height?: number; // cm
  category: ItemCategory;
}

export interface SeaCalculationInput {
  length: number; // meters
  width: number; // meters
  height: number; // meters
  weight: number; // kg (for density check)
}

export interface AirCalculationResult {
  chargeableWeight: number;
  volumetricWeight: number | null;
  actualWeight: number;
  baseRate: number;
  totalPrice: number;
  deliveryTime: string;
  unit: 'kg' | 'piece';
  category: ItemCategory;
  densityRatio: number | null;
  seaRecommended: boolean;
}

export interface SeaCalculationResult {
  originalCBM: number;
  adjustedCBM: number;
  densityRatio: number;
  highDensity: boolean;
  baseRate: number;
  totalPrice: number;
  deliveryTime: string;
  adjustmentApplied: boolean;
}

/**
 * Calculate volumetric weight from dimensions
 */
export function calculateVolumetricWeight(
  length: number,
  width: number,
  height: number
): number {
  const volume = length * width * height; // cm³
  return volume / VOLUMETRIC_DIVISOR; // kg
}

/**
 * Calculate CBM from dimensions (meters)
 */
export function calculateCBM(
  length: number,
  width: number,
  height: number
): number {
  return length * width * height;
}

/**
 * Calculate density ratio (kg/CBM)
 */
export function calculateDensity(weight: number, cbm: number): number {
  if (cbm === 0) return 0;
  return weight / cbm;
}

/**
 * Check if density suggests sea freight
 */
export function shouldRecommendSea(density: number): boolean {
  return density > DENSITY_THRESHOLDS.standard;
}

/** Billed sea volume: the largest of the minimum, the volume and weight ÷ kg-per-CBM. */
export function calculateAdjustedCBM(weight: number, cbm: number, sea: SeaPricing = FALLBACK_SEA): number {
  return Math.max(sea.minCbm, cbm, weight / sea.kgPerCbm);
}

/**
 * Calculate air freight price
 */
export function calculateAirFreight(
  input: AirCalculationInput,
  rates: AirRate[] = AIR_RATES
): AirCalculationResult {
  const { weight, length, width, height, category } = input;
  
  // Get rate for category
  const rateInfo = rates.find((r) => r.category === category);
  if (!rateInfo) {
    throw new Error(`Unknown category: ${category}`);
  }
  
  // Special handling for phones (flat rate per piece)
  if (category === 'phones') {
    return {
      chargeableWeight: weight,
      volumetricWeight: null,
      actualWeight: weight,
      baseRate: rateInfo.rateFCFA,
      totalPrice: rateInfo.rateFCFA * weight,
      deliveryTime: rateInfo.deliveryTime,
      unit: 'piece',
      category,
      densityRatio: null,
      seaRecommended: false,
    };
  }
  
  // Calculate volumetric weight if dimensions provided
  let volumetricWeight: number | null = null;
  let chargeableWeight = weight;
  let densityRatio: number | null = null;
  let seaRecommended = false;
  
  if (length && width && height) {
    volumetricWeight = calculateVolumetricWeight(length, width, height);
    chargeableWeight = Math.max(weight, volumetricWeight);
    
    // Calculate density for recommendation
    const volumeCBM = (length * width * height) / 1000000; // Convert to m³
    densityRatio = calculateDensity(weight, volumeCBM);
    seaRecommended = shouldRecommendSea(densityRatio);
  }
  
  const totalPrice = chargeableWeight * rateInfo.rateFCFA;
  
  return {
    chargeableWeight: Math.round(chargeableWeight * 100) / 100,
    volumetricWeight: volumetricWeight ? Math.round(volumetricWeight * 100) / 100 : null,
    actualWeight: weight,
    baseRate: rateInfo.rateFCFA,
    totalPrice: Math.round(totalPrice),
    deliveryTime: rateInfo.deliveryTime,
    unit: 'kg',
    category,
    densityRatio: densityRatio ? Math.round(densityRatio * 100) / 100 : null,
    seaRecommended,
  };
}

/**
 * Calculate sea freight price
 */
export function calculateSeaFreight(
  input: SeaCalculationInput,
  sea: SeaPricing = FALLBACK_SEA
): SeaCalculationResult {
  const { length, width, height, weight } = input;
  
  // Calculate original CBM
  const originalCBM = calculateCBM(length, width, height);
  
  // Calculate density
  const densityRatio = calculateDensity(weight, originalCBM);
  
  // Heavier than kgPerCbm per m³: billed by weight; never below the minimum volume.
  const finalCBM = calculateAdjustedCBM(weight, originalCBM, sea);
  // Only weight counts as "high density"; the minimum volume alone is not.
  const highDensity = weight / sea.kgPerCbm > Math.max(originalCBM, sea.minCbm);
  const adjustmentApplied = highDensity;
  
  // Calculate price
  const totalPrice = finalCBM * sea.ratePerCbm;
  
  return {
    originalCBM: Math.round(originalCBM * 1000) / 1000,
    adjustedCBM: Math.round(finalCBM * 1000) / 1000,
    densityRatio: Math.round(densityRatio * 100) / 100,
    highDensity,
    baseRate: sea.ratePerCbm,
    totalPrice: Math.round(totalPrice),
    deliveryTime: SEA_RATES.deliveryTime,
    adjustmentApplied,
  };
}

/**
 * Format price in FCFA
 */
export function formatPriceFCFA(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format number with separators
 */
export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}
