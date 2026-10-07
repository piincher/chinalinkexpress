/**
 * The company figures the site shows, read live from production.
 *
 * GET /api/v2/public/stats computes them with the same definitions documented
 * in constants/companyFacts.ts, once every 24 hours (owner decision
 * 2026-10-08). Pages re-read it hourly, so a new daily reading reaches the site
 * within the hour; the caption under the figures shows the reading's date.
 *
 * If the API cannot be reached the page still renders, with the last figures
 * verified by hand (companyFacts) and *their* date — never a guess, and never
 * a live-looking date on old numbers.
 */

import { API_CONFIG } from '@/config/api';
import {
  CLIENTS_ACTIVE_12M,
  CLIENTS_SERVED,
  REVIEWS_COLLECTED,
  SHIPMENTS_HANDLED,
  VERIFIED_ON,
  WAREHOUSES,
} from '@/constants/companyFacts';

export interface CompanyStats {
  shipmentsHandled: number;
  clientsServed: number;
  clientsActive12m: number;
  warehousesInChina: number;
  reviewsCount: number;
  /** ISO timestamp of the reading. */
  asOf: string;
  /** False when these are the hand-verified fallback figures. */
  live: boolean;
}

const TIMEOUT_MS = 8000;
export const STATS_REVALIDATE_SECONDS = 3600;

export const FALLBACK_STATS: CompanyStats = {
  shipmentsHandled: SHIPMENTS_HANDLED,
  clientsServed: CLIENTS_SERVED,
  clientsActive12m: CLIENTS_ACTIVE_12M,
  warehousesInChina: WAREHOUSES.length,
  reviewsCount: REVIEWS_COLLECTED,
  asOf: `${VERIFIED_ON}T00:00:00.000Z`,
  live: false,
};

const count = (value: unknown): number | null =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;

export async function fetchCompanyStats(): Promise<CompanyStats> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/stats`, {
      method: 'GET',
      signal: controller.signal,
      next: { revalidate: STATS_REVALIDATE_SECONDS },
    });
    if (!res.ok) return FALLBACK_STATS;

    const json = await res.json();
    const d = json?.data ?? {};
    const shipments = count(d.shipmentsHandled);
    const served = count(d.clientsServed);
    const active = count(d.clientsActive12m);
    const warehouses = count(d.warehousesInChina);
    const reviews = count(d.reviews?.count);
    const asOf = typeof d.computedAt === 'string' && !Number.isNaN(Date.parse(d.computedAt)) ? d.computedAt : null;

    // All or nothing: a half-live strip would mix two dates under one caption.
    if (shipments === null || served === null || active === null || warehouses === null || reviews === null || !asOf) {
      return FALLBACK_STATS;
    }
    return {
      shipmentsHandled: shipments,
      clientsServed: served,
      clientsActive12m: active,
      warehousesInChina: warehouses,
      reviewsCount: reviews,
      asOf,
      live: true,
    };
  } catch {
    return FALLBACK_STATS;
  } finally {
    clearTimeout(timeout);
  }
}
