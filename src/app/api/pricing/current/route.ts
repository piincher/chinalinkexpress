/**
 * Current published prices, read live from the backend on every request
 * (owner decision 2026-11-20: a price change shows instantly). Falls back to
 * the constants in features/pricing if the backend cannot be reached.
 *
 * `pricing` is the full shape (usePricing); the flat fields are kept for the
 * guide's PricingSection.
 */

import { NextResponse } from 'next/server';
import { AIR_RATES } from '@/features/pricing/constants';
import { fetchBackendPricing } from '@/features/pricing/lib/livePricing';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const pricing = await fetchBackendPricing();
  return NextResponse.json(
    {
      pricing,
      express: AIR_RATES.find((r) => r.category === 'express')!.rateFCFA,
      standard: pricing.air.standard,
      electronics: pricing.air.electronics,
      phones: pricing.air.phones,
      sea: pricing.sea.ratePerCbm,
      seaUnit: 'CBM',
      lastUpdated: new Date().toISOString(),
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  );
}
