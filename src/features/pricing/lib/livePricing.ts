/**
 * Published prices, read live from the backend (GET /api/v2/public/pricing).
 *
 * The owner edits them in the app ("Tarifs publics"); every page reads them on
 * each visit (owner decision 2026-11-20: changes show instantly). If the API
 * cannot be reached the site still quotes, from the constants below.
 *
 * Sea rule: billed CBM = max(minCbm, CBM, kg ÷ kgPerCbm) — 1 CBM = 200 kg,
 * minimum 0,1 CBM, so the minimum covers up to 20 kg.
 */

import { API_CONFIG } from '@/config/api';
import {
  AIR_RATES,
  DELIVERY_TIERS,
  DENSITY_THRESHOLDS,
  ITEM_CATEGORIES,
  SEA_RATES,
  type AirRate,
  type DeliveryTier,
  type ItemCategoryInfo,
} from '../constants';

export interface SeaPricing {
  ratePerCbm: number;
  kgPerCbm: number;
  minCbm: number;
}

export interface LivePricing {
  sea: SeaPricing;
  /** Per kg (standard, electronics) and per piece (phones). Express is not set from the app. */
  air: { standard: number; electronics: number; phones: number };
  live: boolean;
}

const airRate = (category: string) => AIR_RATES.find((r) => r.category === category)!.rateFCFA;

export const FALLBACK_PRICING: LivePricing = {
  sea: {
    ratePerCbm: SEA_RATES.rateFCFA,
    kgPerCbm: DENSITY_THRESHOLDS.kgPerCBM,
    minCbm: DENSITY_THRESHOLDS.minCBM,
  },
  air: { standard: airRate('standard'), electronics: airRate('electronics'), phones: airRate('phones') },
  live: false,
};

const positive = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;

/** Backend payload → LivePricing; all or nothing, so one page never mixes two price lists. */
export function parseBackendPricing(data: unknown): LivePricing | null {
  const d = data as {
    sea?: Partial<SeaPricing>;
    air?: { code?: string; rate?: unknown }[];
  } | null;
  const rate = (code: string) => positive(d?.air?.find((row) => row?.code === code)?.rate);
  const sea = {
    ratePerCbm: positive(d?.sea?.ratePerCbm),
    kgPerCbm: positive(d?.sea?.kgPerCbm),
    minCbm: typeof d?.sea?.minCbm === 'number' && d.sea.minCbm >= 0 ? d.sea.minCbm : null,
  };
  const air = { standard: rate('NORMAL'), electronics: rate('SENSITIVE'), phones: rate('PHONE') };
  if (Object.values(sea).some((v) => v === null) || Object.values(air).some((v) => v === null)) return null;
  return { sea: sea as SeaPricing, air: air as LivePricing['air'], live: true };
}

/** Server side only (route handler): one uncached read of the backend. */
export async function fetchBackendPricing(): Promise<LivePricing> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/pricing`, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) return FALLBACK_PRICING;
    return parseBackendPricing((await res.json())?.data) ?? FALLBACK_PRICING;
  } catch {
    return FALLBACK_PRICING;
  } finally {
    clearTimeout(timeout);
  }
}

const liveRateFor = (category: string, p: LivePricing): number | null =>
  category === 'standard'
    ? p.air.standard
    : category === 'electronics'
      ? p.air.electronics
      : category === 'phones'
        ? p.air.phones
        : null;

export const liveAirRates = (p: LivePricing): AirRate[] =>
  AIR_RATES.map((r) => ({ ...r, rateFCFA: liveRateFor(r.category, p) ?? r.rateFCFA }));

export const liveItemCategories = (p: LivePricing): ItemCategoryInfo[] =>
  ITEM_CATEGORIES.map((c) => ({
    ...c,
    rate: c.id === 'containers' ? p.sea.ratePerCbm : liveRateFor(c.id, p) ?? c.rate,
  }));

export const liveDeliveryTiers = (p: LivePricing): DeliveryTier[] =>
  DELIVERY_TIERS.map((t) => ({
    ...t,
    rateFCFA: t.id === 'sea_economy' ? p.sea.ratePerCbm : t.id === 'air_standard' ? p.air.standard : t.rateFCFA,
  }));

/** Weight the minimum volume covers: 0,1 CBM × 200 kg = 20 kg. */
export const minCbmCoversKg = (sea: SeaPricing) => Math.round(sea.minCbm * sea.kgPerCbm * 100) / 100;
