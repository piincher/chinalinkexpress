export interface ShippingDestination {
  code: string;
  name: string;
  nameFr: string;
  region: string;
}

export interface ShippingRate {
  provider: string;
  providerFr: string;
  mode: 'sea' | 'air' | 'express';
  basePricePerKg: number;
  minPrice: number;
  maxPrice: number;
  durationDays: { min: number; max: number };
  durationDisplay: string;
  durationDisplayFr: string;
  features: string[];
  featuresFr: string[];
  logo?: string;
  color: string;
  isCompetitor: boolean;
}

export interface ComparisonResult {
  weight: number;
  destination: ShippingDestination;
  rates: (ShippingRate & { calculatedPrice: number; pricePerKg: number })[];
}
