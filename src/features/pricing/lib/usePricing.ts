'use client';

import { useEffect, useState } from 'react';
import { FALLBACK_PRICING, type LivePricing } from './livePricing';

// One read per page load, shared by every price on the page.
let inflight: Promise<LivePricing> | null = null;
let latest: LivePricing | null = null;

const load = () =>
  (inflight ??= fetch('/api/pricing/current', { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => (json?.pricing?.live ? (json.pricing as LivePricing) : FALLBACK_PRICING))
    .catch(() => FALLBACK_PRICING)
    .then((pricing) => (latest = pricing)));

/** Live published prices; the fallback constants until the first read lands. */
export function usePricing(): LivePricing {
  const [pricing, setPricing] = useState<LivePricing>(latest ?? FALLBACK_PRICING);
  useEffect(() => {
    let mounted = true;
    load().then((p) => mounted && setPricing(p));
    return () => {
      mounted = false;
    };
  }, []);
  return pricing;
}
