/**
 * useComparison Hook
 *
 * Calculates shipping prices for all providers and returns sorted results
 * with savings percentages and best-value recommendations.
 */

'use client';

import { useMemo } from 'react';
import {
  DESTINATIONS,
  SHIPPING_RATES,
  calculateSeaPrice,
  calculateAirPrice,
} from '../data';
import { ComparisonResult, ShippingDestination } from '../types';

interface UseComparisonParams {
  weight: number;
  destinationCode: string;
  dimensions?: { length: number; width: number; height: number };
}

interface UseComparisonReturn {
  result: ComparisonResult | null;
  bestValue: ComparisonResult['rates'][number] | null;
  fastest: ComparisonResult['rates'][number] | null;
  cheapest: ComparisonResult['rates'][number] | null;
  savingsVsExpress: number;
  savingsPercentage: number;
  destination: ShippingDestination | undefined;
  isValid: boolean;
}

export function useComparison({
  weight,
  destinationCode,
  dimensions,
}: UseComparisonParams): UseComparisonReturn {
  const destination = useMemo(
    () => DESTINATIONS.find((d) => d.code === destinationCode),
    [destinationCode]
  );

  const result = useMemo<ComparisonResult | null>(() => {
    if (!destination || weight <= 0) return null;

    const rates = SHIPPING_RATES.map((rate) => {
      let price: number;
      let pricePerKg: number;
      let extraInfo: { cbm?: number; calculationMethod?: string } = {};

      if (rate.mode === 'sea') {
        const seaResult = calculateSeaPrice(weight, destination.code, dimensions);
        price = seaResult.price;
        pricePerKg = seaResult.pricePerKg;
        extraInfo = {
          cbm: seaResult.cbm,
          calculationMethod: seaResult.calculationMethod,
        };
      } else {
        const airResult = calculateAirPrice(
          weight,
          rate.basePricePerKg,
          rate.minPrice,
          destination.code
        );
        price = airResult.price;
        pricePerKg = airResult.pricePerKg;
      }

      return {
        ...rate,
        calculatedPrice: Math.min(price, rate.maxPrice),
        pricePerKg,
        ...extraInfo,
      };
    });

    // Sort by price ascending
    rates.sort((a, b) => a.calculatedPrice - b.calculatedPrice);

    return {
      weight,
      destination,
      rates,
    };
  }, [weight, destination, dimensions]);

  const bestValue = useMemo(() => {
    if (!result) return null;
    // Best value = non-competitor with best price-to-speed ratio
    // We score each non-competitor by: (normalized price * 0.6) + (normalized duration * 0.4)
    // Lower score = better value
    const nonCompetitors = result.rates.filter((r) => !r.isCompetitor);
    if (nonCompetitors.length === 0) return null;

    const maxPrice = Math.max(...result.rates.map((r) => r.calculatedPrice));
    const maxDuration = Math.max(...result.rates.map((r) => r.durationDays.max));

    let best = nonCompetitors[0];
    let bestScore = Infinity;

    for (const rate of nonCompetitors) {
      const priceScore = rate.calculatedPrice / maxPrice;
      const durationScore = rate.durationDays.max / maxDuration;
      const score = priceScore * 0.6 + durationScore * 0.4;
      if (score < bestScore) {
        bestScore = score;
        best = rate;
      }
    }

    return best;
  }, [result]);

  const fastest = useMemo(() => {
    if (!result) return null;
    return result.rates.reduce((fastest, current) =>
      current.durationDays.max < fastest.durationDays.max ? current : fastest
    );
  }, [result]);

  const cheapest = useMemo(() => {
    if (!result) return null;
    return result.rates[0];
  }, [result]);

  const { savingsVsExpress, savingsPercentage } = useMemo(() => {
    if (!result) return { savingsVsExpress: 0, savingsPercentage: 0 };

    const expressOption =
      result.rates.find((r) => r.provider === 'DHL Express') ||
      result.rates.find((r) => r.isCompetitor && r.durationDays.max <= 7);

    const bestChinaLink = result.rates.find((r) => !r.isCompetitor);

    if (!expressOption || !bestChinaLink) {
      return { savingsVsExpress: 0, savingsPercentage: 0 };
    }

    const savings = expressOption.calculatedPrice - bestChinaLink.calculatedPrice;
    const percentage =
      expressOption.calculatedPrice > 0
        ? Math.round((savings / expressOption.calculatedPrice) * 100)
        : 0;

    return {
      savingsVsExpress: Math.max(0, Math.round(savings * 100) / 100),
      savingsPercentage: Math.max(0, percentage),
    };
  }, [result]);

  return {
    result,
    bestValue,
    fastest,
    cheapest,
    savingsVsExpress,
    savingsPercentage,
    destination,
    isValid: !!destination && weight > 0,
  };
}
