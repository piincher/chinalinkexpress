/**
 * Instant estimate for the homepage: published rate × billable quantity.
 *
 * Rates come from the same tables as /tarifs so the two can never disagree.
 * Billable rules are the published ones: kilos round up to the next 0.1 kg
 * (CGV article 3.1), phones bill per whole piece, sea has a 0.1 CBM minimum.
 * Volumetric weight and the density adjustment need dimensions, so they stay on
 * /calculateur and the page says the figure precedes weighing at the warehouse.
 */

import { AIR_RATES, SEA_RATES, type ItemCategory } from '../constants';

export type EstimateMode = Exclude<ItemCategory, 'liquids'> | 'sea';

export const ESTIMATE_MODES: EstimateMode[] = ['standard', 'express', 'electronics', 'phones', 'sea'];

export interface EstimateRate {
  rate: number;
  unit: 'kg' | 'piece' | 'cbm';
  /** Published transit range in days, as "14-21". */
  days: string;
}

export function getEstimateRate(mode: EstimateMode): EstimateRate {
  if (mode === 'sea') {
    return { rate: SEA_RATES.rateFCFA, unit: 'cbm', days: '60-75' };
  }
  const air = AIR_RATES.find((r) => r.category === mode);
  if (!air) throw new Error(`No published rate for ${mode}`);
  return { rate: air.rateFCFA, unit: air.unit, days: air.deliveryTime.replace(/\s*jours?$/, '') };
}

export function estimatePrice(mode: EstimateMode, quantity: number): number {
  const { rate, unit } = getEstimateRate(mode);
  const q = Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  if (q === 0) return 0;
  if (unit === 'kg') return Math.round((Math.ceil(q * 10 - 1e-9) / 10) * rate);
  if (unit === 'piece') return Math.ceil(q) * rate;
  return Math.round(Math.max(q, SEA_RATES.minCBM) * rate);
}
