/**
 * Shipping Comparison Data
 *
 * Realistic shipping rate data for ChinaLink Express vs competitors.
 * Rates are tailored for the West African market.
 */

import { ShippingDestination, ShippingRate } from './types';

export const DESTINATIONS: ShippingDestination[] = [
  { code: 'ML', name: 'Mali', nameFr: 'Mali', nameZh: '马里', nameAr: 'مالي', region: 'West Africa' },
  { code: 'SN', name: 'Senegal', nameFr: 'Sénégal', nameZh: '塞内加尔', nameAr: 'السنغال', region: 'West Africa' },
  { code: 'CI', name: 'Ivory Coast', nameFr: "Côte d'Ivoire", nameZh: '科特迪瓦', nameAr: 'ساحل العاج', region: 'West Africa' },
  { code: 'GH', name: 'Ghana', nameFr: 'Ghana', nameZh: '加纳', nameAr: 'غانا', region: 'West Africa' },
  { code: 'NG', name: 'Nigeria', nameFr: 'Nigeria', nameZh: '尼日利亚', nameAr: 'نيجيريا', region: 'West Africa' },
  { code: 'BF', name: 'Burkina Faso', nameFr: 'Burkina Faso', nameZh: '布基纳法索', nameAr: 'بوركينا فاسو', region: 'West Africa' },
  { code: 'NE', name: 'Niger', nameFr: 'Niger', nameZh: '尼日尔', nameAr: 'النيجر', region: 'West Africa' },
  { code: 'BJ', name: 'Benin', nameFr: 'Bénin', nameZh: '贝宁', nameAr: 'بنين', region: 'West Africa' },
  { code: 'TG', name: 'Togo', nameFr: 'Togo', nameZh: '多哥', nameAr: 'توغو', region: 'West Africa' },
  { code: 'GN', name: 'Guinea', nameFr: 'Guinée', nameZh: '几内亚', nameAr: 'غينيا', region: 'West Africa' },
];

/**
 * Volume-based discount tiers (USD per kg)
 * Higher weight = lower per-kg rate
 */
export const WEIGHT_TIERS = [
  { min: 0, max: 10, multiplier: 1.0 },
  { min: 10, max: 50, multiplier: 0.92 },
  { min: 50, max: 100, multiplier: 0.85 },
  { min: 100, max: 300, multiplier: 0.78 },
  { min: 300, max: 500, multiplier: 0.72 },
  { min: 500, max: 1000, multiplier: 0.65 },
  { min: 1000, max: Infinity, multiplier: 0.58 },
];

/**
 * Destination multipliers (some destinations cost more due to logistics)
 */
export const DESTINATION_MULTIPLIERS: Record<string, number> = {
  ML: 1.0,
  SN: 0.95,
  CI: 0.95,
  GH: 1.0,
  NG: 0.9,
  BF: 1.05,
  NE: 1.1,
  BJ: 1.0,
  TG: 1.0,
  GN: 1.05,
};

/**
 * Sea freight CBM rates (USD per CBM) with volume discounts
 */
export const SEA_CBM_RATES = [
  { min: 0, max: 1, rate: 150 },
  { min: 1, max: 3, rate: 130 },
  { min: 3, max: 5, rate: 115 },
  { min: 5, max: 10, rate: 100 },
  { min: 10, max: Infinity, rate: 85 },
];

/**
 * Sea freight minimum charges by destination (USD)
 */
export const SEA_MINIMUM_CHARGES: Record<string, number> = {
  ML: 80,
  SN: 75,
  CI: 75,
  GH: 80,
  NG: 70,
  BF: 85,
  NE: 90,
  BJ: 80,
  TG: 80,
  GN: 85,
};

export const SHIPPING_RATES: ShippingRate[] = [
  {
    provider: 'ChinaLink Sea',
    providerFr: 'ChinaLink Maritime', providerZh: 'ChinaLink 海运', providerAr: 'ChinaLink البحري',
    mode: 'sea',
    basePricePerKg: 4.0,
    minPrice: 80,
    maxPrice: 3500,
    durationDays: { min: 60, max: 75 },
    durationDisplay: '60-75 days',
    durationDisplayFr: '60-75 jours', durationDisplayZh: '60-75 天', durationDisplayAr: '60-75 يومًا',
    features: [
      'Consolidation warehouse in Yiwu',
      'Customs clearance included',
      'Door-to-door delivery',
      'Real-time WhatsApp tracking',
      'Insurance available',
      'No weight limit',
    ],
    featuresFr: [
      'Entrepôt de consolidation à Yiwu',
      'Dédouanement inclus',
      'Livraison porte-à-porte',
      'Suivi WhatsApp en temps réel',
      'Assurance disponible',
      'Pas de limite de poids',
    ],
    featuresZh: [
      '义乌集运仓库',
      '含清关',
      '门到门交付',
      'WhatsApp 实时跟踪',
      '可选保险',
      '无重量限制',
    ],
    featuresAr: [
      'مستودع تجميع في ييوو',
      'التخليص الجمركي مشمول',
      'تسليم من الباب إلى الباب',
      'متابعة فورية عبر WhatsApp',
      'التأمين متاح',
      'لا حد للوزن',
    ],
    color: 'blue',
    isCompetitor: false,
  },
  {
    provider: 'ChinaLink Air',
    providerFr: 'ChinaLink Aérien', providerZh: 'ChinaLink 空运', providerAr: 'ChinaLink الجوي',
    mode: 'air',
    basePricePerKg: 11.0,
    minPrice: 45,
    maxPrice: 4500,
    durationDays: { min: 14, max: 21 },
    durationDisplay: '14-21 days',
    durationDisplayFr: '14-21 jours', durationDisplayZh: '14-21 天', durationDisplayAr: '14-21 يومًا',
    features: [
      'Express air cargo',
      'Airport-to-airport or door-to-door',
      'Customs clearance included',
      'Real-time WhatsApp tracking',
      'Insurance available',
      'Ideal for urgent shipments',
    ],
    featuresFr: [
      'Cargo aérien express',
      'Aéroport-à-aéroport ou porte-à-porte',
      'Dédouanement inclus',
      'Suivi WhatsApp en temps réel',
      'Assurance disponible',
      'Idéal pour expéditions urgentes',
    ],
    featuresZh: [
      '快速空运',
      '机场到机场或门到门',
      '含清关',
      'WhatsApp 实时跟踪',
      '可选保险',
      '适合紧急货物',
    ],
    featuresAr: [
      'شحن جوي سريع',
      'من مطار إلى مطار أو من الباب إلى الباب',
      'التخليص الجمركي مشمول',
      'متابعة فورية عبر WhatsApp',
      'التأمين متاح',
      'مثالي للشحنات العاجلة',
    ],
    color: 'cyan',
    isCompetitor: false,
  },
  {
    provider: 'DHL Express',
    providerFr: 'DHL Express', providerZh: 'DHL Express', providerAr: 'DHL Express',
    mode: 'express',
    basePricePerKg: 35.0,
    minPrice: 55,
    maxPrice: 8000,
    durationDays: { min: 5, max: 7 },
    durationDisplay: '5-7 days',
    durationDisplayFr: '5-7 jours', durationDisplayZh: '5-7 天', durationDisplayAr: '5-7 أيام',
    features: [
      'Global express network',
      'Online tracking portal',
      'Customs brokerage',
      'Signature on delivery',
      'Insurance available',
      'Premium pricing',
    ],
    featuresFr: [
      'Réseau express mondial',
      'Portail de suivi en ligne',
      'Courtage en douane',
      'Signature à la livraison',
      'Assurance disponible',
      'Tarification premium',
    ],
    featuresZh: [
      '全球快递网络',
      '在线跟踪门户',
      '报关代理',
      '签收交付',
      '可选保险',
      '高端定价',
    ],
    featuresAr: [
      'شبكة شحن سريع عالمية',
      'بوابة تتبع عبر الإنترنت',
      'وساطة جمركية',
      'التوقيع عند التسليم',
      'التأمين متاح',
      'أسعار مرتفعة',
    ],
    color: 'red',
    isCompetitor: true,
  },
  {
    provider: 'Aramex',
    providerFr: 'Aramex', providerZh: 'Aramex', providerAr: 'Aramex',
    mode: 'express',
    basePricePerKg: 28.0,
    minPrice: 45,
    maxPrice: 6500,
    durationDays: { min: 7, max: 10 },
    durationDisplay: '7-10 days',
    durationDisplayFr: '7-10 jours', durationDisplayZh: '7-10 天', durationDisplayAr: '7-10 أيام',
    features: [
      'Middle East & Africa specialist',
      'Online tracking',
      'Customs clearance',
      'Cash on delivery option',
      'Limited remote coverage',
      'Higher rates for Africa',
    ],
    featuresFr: [
      'Spécialiste Moyen-Orient & Afrique',
      'Suivi en ligne',
      'Dédouanement',
      'Option paiement à la livraison',
      'Couverture limitée des zones reculées',
      'Tarifs élevés pour l\'Afrique',
    ],
    featuresZh: [
      '中东和非洲专家',
      '在线跟踪',
      '清关',
      '可选货到付款',
      '偏远地区覆盖有限',
      '非洲价格较高',
    ],
    featuresAr: [
      'متخصص في الشرق الأوسط وأفريقيا',
      'تتبع عبر الإنترنت',
      'التخليص الجمركي',
      'خيار الدفع عند الاستلام',
      'تغطية محدودة للمناطق النائية',
      'أسعار مرتفعة لأفريقيا',
    ],
    color: 'orange',
    isCompetitor: true,
  },
];

/**
 * Get the weight tier multiplier for a given weight
 */
export function getWeightTierMultiplier(weight: number): number {
  const tier = WEIGHT_TIERS.find((t) => weight >= t.min && weight < t.max);
  return tier ? tier.multiplier : 1.0;
}

/**
 * Get the destination multiplier for a given destination code
 */
export function getDestinationMultiplier(code: string): number {
  return DESTINATION_MULTIPLIERS[code] ?? 1.0;
}

/**
 * Get the sea CBM rate for a given CBM volume
 */
export function getSeaCBMRate(cbm: number): number {
  const tier = SEA_CBM_RATES.find((t) => cbm >= t.min && cbm < t.max);
  return tier ? tier.rate : SEA_CBM_RATES[SEA_CBM_RATES.length - 1].rate;
}

/**
 * Calculate sea freight price based on weight or volume
 * Uses whichever is higher: weight-based or CBM-based calculation
 */
export function calculateSeaPrice(
  weight: number,
  destinationCode: string,
  dimensions?: { length: number; width: number; height: number }
): { price: number; pricePerKg: number; cbm?: number; calculationMethod: string } {
  const destMultiplier = getDestinationMultiplier(destinationCode);
  const minCharge = SEA_MINIMUM_CHARGES[destinationCode] ?? 80;

  // Weight-based calculation
  const weightTierMultiplier = getWeightTierMultiplier(weight);
  const weightBasedPrice = Math.max(
    weight * 4.0 * weightTierMultiplier * destMultiplier,
    minCharge
  );

  // Volume-based calculation (if dimensions provided)
  let cbmBasedPrice = 0;
  let cbm: number | undefined;

  if (dimensions && dimensions.length > 0 && dimensions.width > 0 && dimensions.height > 0) {
    cbm = (dimensions.length * dimensions.width * dimensions.height) / 1_000_000;
    const cbmRate = getSeaCBMRate(cbm);
    cbmBasedPrice = Math.max(cbm * cbmRate * destMultiplier, minCharge);
  }

  // Use the higher of the two
  const price =
    cbmBasedPrice > 0 && cbmBasedPrice > weightBasedPrice
      ? cbmBasedPrice
      : weightBasedPrice;

  const calculationMethod =
    cbmBasedPrice > 0 && cbmBasedPrice > weightBasedPrice
      ? 'CBM (volume)'
      : 'Weight-based';

  return {
    price: Math.round(price * 100) / 100,
    pricePerKg: Math.round((price / weight) * 100) / 100,
    cbm,
    calculationMethod,
  };
}

/**
 * Calculate air/express price based on weight
 */
export function calculateAirPrice(
  weight: number,
  basePricePerKg: number,
  minPrice: number,
  destinationCode: string
): { price: number; pricePerKg: number } {
  const destMultiplier = getDestinationMultiplier(destinationCode);
  const weightTierMultiplier = getWeightTierMultiplier(weight);
  const rawPrice = weight * basePricePerKg * weightTierMultiplier * destMultiplier;
  const price = Math.max(rawPrice, minPrice);

  return {
    price: Math.round(price * 100) / 100,
    pricePerKg: Math.round((price / weight) * 100) / 100,
  };
}
