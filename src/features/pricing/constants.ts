/**
 * Pricing Constants
 * 
 * Rates, rules, and configuration for pricing and calculator.
 * Part of the pricing feature.
 */

export type ShippingMode = 'air' | 'sea';
export type ItemCategory = 'standard' | 'electronics' | 'phones' | 'liquids';

export interface AirRate {
  category: ItemCategory;
  rateFCFA: number;
  unit: 'kg' | 'piece';
  deliveryTime: string;
  description: string;
  emoji: string;
}

export interface SeaRate {
  rateFCFA: number;
  minCBM: number;
  deliveryTime: string;
  description: string;
}

export interface PurchaseService {
  commissionRate: number;
  description: string;
}

// Standard items for air freight display
export const STANDARD_ITEMS = [
  'Vêtements',
  'Chaussures',
  'Articles quotidiens',
  'Accessoires',
  'Textiles',
];

// Standard items for sea freight display
export const SEA_STANDARD_ITEMS = [
  'Meubles',
  'Électroménagers',
  'Matériel de construction',
  'Marchandises en vrac',
  'Gros volumes',
];

// Air Freight Rates (FCFA)
export const AIR_RATES: AirRate[] = [
  {
    category: 'standard',
    rateFCFA: 10000,
    unit: 'kg',
    deliveryTime: '2-3 semaines',
    description: 'Vêtements, Chaussures, Articles quotidiens',
    emoji: '📦',
  },
  {
    category: 'electronics',
    rateFCFA: 12000,
    unit: 'kg',
    deliveryTime: '2-3 semaines',
    description: 'Électronique, Batteries, Liquides',
    emoji: '💻',
  },
  {
    category: 'phones',
    rateFCFA: 12000,
    unit: 'piece',
    deliveryTime: '2-3 semaines',
    description: 'Téléphones mobiles (tarif à la pièce)',
    emoji: '📱',
  },
];

// Item Categories for UI
export interface ItemCategoryInfo {
  id: ItemCategory | 'containers';
  rate: number;
  unit: 'kg' | 'piece' | 'm³';
}

export const ITEM_CATEGORIES: ItemCategoryInfo[] = [
  { id: 'phones', rate: 12000, unit: 'piece' },
  { id: 'electronics', rate: 12000, unit: 'kg' },
  { id: 'standard', rate: 10000, unit: 'kg' },
  { id: 'containers', rate: 300000, unit: 'm³' },
];

// Sea Freight Rates
export const SEA_RATES: SeaRate = {
  rateFCFA: 300000,
  minCBM: 0.1,
  deliveryTime: '~3 mois',
  description: 'Fret maritime par CBM',
};

// Purchase Service
export const PURCHASE_SERVICE: PurchaseService = {
  commissionRate: 0.15,
  description: 'Commission de 15% sur le total',
};

// Density Thresholds
// Standard rule: 1:200 (density ≤ 200 kg/CBM - use actual CBM)
// COSCO/MAERSK rule: 1:250 (density > 250 kg/CBM - use weight × 0.004)
export const DENSITY_THRESHOLDS = {
  standard: 200, // kg/CBM - threshold for sea recommendation
  coscoMaersk: 250, // kg/CBM - adjustment threshold for COSCO/MAERSK
  adjustmentFactor: 0.004, // 1/250 = 0.004 for COSCO/MAERSK rule
};

// Volumetric Weight Divisor (industry standard for air freight)
// Formula: (L × W × H in cm) / 5000 = volumetric weight in kg
export const VOLUMETRIC_DIVISOR = 5000; // cm³/kg

// Prohibited Items
export interface ProhibitedItem {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  severity: 'forbidden' | 'restricted' | 'caution';
  airAllowed: boolean;
  seaAllowed: boolean;
  category: 'electronics' | 'batteries' | 'drones' | 'liquids' | 'medical' | 'chemicals' | 'weapons' | 'spray' | 'illegal';
}

export const PROHIBITED_ITEMS: ProhibitedItem[] = [
  {
    id: 'phones-sea',
    icon: '📱',
    titleKey: 'prohibited.phonesSea.title',
    descriptionKey: 'prohibited.phonesSea.description',
    severity: 'forbidden',
    airAllowed: true,
    seaAllowed: false,
    category: 'electronics',
  },
  {
    id: 'computers-sea',
    icon: '💻',
    titleKey: 'prohibited.computersSea.title',
    descriptionKey: 'prohibited.computersSea.description',
    severity: 'forbidden',
    airAllowed: true,
    seaAllowed: false,
    category: 'electronics',
  },
  {
    id: 'batteries',
    icon: '🔋',
    titleKey: 'prohibited.batteries.title',
    descriptionKey: 'prohibited.batteries.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'batteries',
  },
  {
    id: 'drones',
    icon: '🚁',
    titleKey: 'prohibited.drones.title',
    descriptionKey: 'prohibited.drones.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'drones',
  },
  {
    id: 'liquids-sea',
    icon: '🧴',
    titleKey: 'prohibited.liquidsSea.title',
    descriptionKey: 'prohibited.liquidsSea.description',
    severity: 'forbidden',
    airAllowed: true,
    seaAllowed: false,
    category: 'liquids',
  },
  {
    id: 'flammable',
    icon: '🔥',
    titleKey: 'prohibited.flammable.title',
    descriptionKey: 'prohibited.flammable.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'chemicals',
  },
  {
    id: 'supplements',
    icon: '💊',
    titleKey: 'prohibited.supplements.title',
    descriptionKey: 'prohibited.supplements.description',
    severity: 'restricted',
    airAllowed: true,
    seaAllowed: true,
    category: 'medical',
  },
  {
    id: 'chemicals',
    icon: '⚗️',
    titleKey: 'prohibited.chemicals.title',
    descriptionKey: 'prohibited.chemicals.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'chemicals',
  },
  {
    id: 'weapons',
    icon: '🔫',
    titleKey: 'prohibited.weapons.title',
    descriptionKey: 'prohibited.weapons.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'weapons',
  },
  {
    id: 'spray',
    icon: '📦',
    titleKey: 'prohibited.spray.title',
    descriptionKey: 'prohibited.spray.description',
    severity: 'forbidden',
    airAllowed: false,
    seaAllowed: false,
    category: 'spray',
  },
];

// FAQ Items
export const PRICING_FAQ = [
  {
    id: 'tariff-decrease',
    questionKey: 'faq.tariffDecrease.question',
    answerKey: 'faq.tariffDecrease.answer',
  },
  {
    id: 'tariff-increase',
    questionKey: 'faq.tariffIncrease.question',
    answerKey: 'faq.tariffIncrease.answer',
  },
  {
    id: 'prepayment',
    questionKey: 'faq.prepayment.question',
    answerKey: 'faq.prepayment.answer',
  },
  {
    id: 'customs',
    questionKey: 'faq.customs.question',
    answerKey: 'faq.customs.answer',
  },
  {
    id: 'guarantee',
    questionKey: 'faq.guarantee.question',
    answerKey: 'faq.guarantee.answer',
  },
  {
    id: 'prohibited',
    questionKey: 'faq.prohibited.question',
    answerKey: 'faq.prohibited.answer',
  },
];

// Country destinations for pricing
export const DESTINATIONS = [
  { code: 'ML', nameKey: 'destinations.mali', flag: '🇲🇱' },
  { code: 'SN', nameKey: 'destinations.senegal', flag: '🇸🇳' },
  { code: 'CI', nameKey: 'destinations.ivoryCoast', flag: '🇨🇮' },
  { code: 'BJ', nameKey: 'destinations.benin', flag: '🇧🇯' },
  { code: 'TG', nameKey: 'destinations.togo', flag: '🇹🇬' },
  { code: 'BF', nameKey: 'destinations.burkina', flag: '🇧🇫' },
  { code: 'NE', nameKey: 'destinations.niger', flag: '🇳🇪' },
  { code: 'GN', nameKey: 'destinations.guinea', flag: '🇬🇳' },
  { code: 'GH', nameKey: 'destinations.ghana', flag: '🇬🇭' },
];
