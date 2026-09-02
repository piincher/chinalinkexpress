/**
 * Advanced SEO Configuration
 * 
 * Enterprise-level SEO with comprehensive structured data,
 * hreflang management, and logistics-specific schema markup.
 * 
 * EXPANDED FOR #1 RANKINGS - Covers 200+ keywords across
 * shipping, sourcing, supplier payment, Alibaba, 1688, 
 * and all major African markets.
 */

import { Metadata } from 'next';
import { i18nConfig, type Locale, getSeoLocale } from '@/i18n/config';

// ============================================================================
// Type Definitions
// ============================================================================

interface ShippingRoute {
  origin: string;
  destination: string;
  durationDays: { min: number; max: number };
  methods: ('air' | 'sea')[];
}

interface ServiceOffer {
  name: string;
  description: string;
  price?: { min: number; max: number; unit: string };
}

// ============================================================================
// Business Information - EXPANDED with China Office
// ============================================================================

export const BUSINESS_INFO = {
  name: 'ChinaLink Express',
  alternateName: 'CLE Logistics',
  url: 'https://www.chinalinkexpress.com',
  logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
  founded: '2019',

  contact: {
    email: 'contact@chinalinkexpress.com',
    phones: {
      china: '+86 188 5172 5957',
      mali: '+223 7669 61 77',
      maliAlt: '+223 5100 50 42',
    },
    whatsapp: {
      china: '+8618851725957',
      mali: '+22376696177',
    },
  },
  
  // Mali Office
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Kalaban Coura, près du lycée Birgo',
    addressLocality: 'Bamako',
    addressRegion: 'Bamako District',
    postalCode: 'BPE',
    addressCountry: 'ML',
  },
  
  /*
   * China operation.
   *
   * This declared "Room 1805, Building 3, Yiwu International Trade City,
   * Zhejiang" — an address that appears nowhere in the business's own data. The
   * two warehouses clients' suppliers actually deliver to are both in
   * Guangdong: Guangzhou (Zengcheng) for air and Foshan (Nanhai) for sea,
   * per the `warehouseaddresses` collection, both flagged active.
   *
   * Telling Google the company sits in Zhejiang while it operates out of
   * Guangdong is an entity signal pointing at the wrong place, which is the
   * class of problem behind this brand being confused with similarly-named
   * companies in search results.
   *
   * The street lines stay out of the public schema: they are given to
   * registered clients with their warehouse code, and a warehouse address in
   * open markup invites deliveries the operation has not agreed to receive.
   */
  chinaAddress: {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Guangzhou',
    addressRegion: 'Guangdong',
    addressCountry: 'CN',
  },

  chinaSeaAddress: {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Foshan',
    addressRegion: 'Guangdong',
    addressCountry: 'CN',
  },


  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 12.6392,
    longitude: -8.0029,
  },
  
  /*
   * City-level coordinates only, matching the generalised addresses above.
   * These were 29.3063 / 120.0754 — Yiwu, Zhejiang, ~1,200 km from where the
   * warehouses are.
   */
  chinaGeo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 23.1291,
    longitude: 113.2644,
  },

  chinaSeaGeo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 23.0219,
    longitude: 113.1214,
  },
  
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
    { days: ['Saturday'], opens: '09:00', closes: '17:00' },
    { days: ['Sunday'], opens: '10:00', closes: '15:00' },
  ],
  
  social: [
    'https://facebook.com/chinalinkexpress',
    'https://instagram.com/chinalinkexpress',
    'https://linkedin.com/company/chinalinkexpress',
    'https://twitter.com/chinalinkexpress',
  ],
} as const;

// ============================================================================
// Shipping Routes Data - EXPANDED to all African markets
// ============================================================================

export const SHIPPING_ROUTES: ShippingRoute[] = [
  { origin: 'China', destination: 'Mali', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Senegal', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Ivory Coast', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Nigeria', durationDays: { min: 14, max: 65 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Ghana', durationDays: { min: 14, max: 65 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Burkina Faso', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Niger', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Benin', durationDays: { min: 14, max: 65 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Togo', durationDays: { min: 14, max: 65 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Guinea', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Cameroon', durationDays: { min: 14, max: 65 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Democratic Republic of the Congo', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
];

// ============================================================================
// Service Offers - EXPANDED with new services
// ============================================================================

export const SERVICE_OFFERS: Record<string, ServiceOffer> = {
  airFreight: {
    name: 'Air Freight China to Africa',
    description: 'Express air freight delivery from China to Bamako, Mali and across West Africa in 14-21 business days via trusted partner carriers',
    price: { min: 8, max: 15, unit: 'USD per kg' },
  },
  seaFreightFCL: {
    name: 'Sea Freight FCL to Africa',
    description: 'Full container load shipping from Foshan/Guangzhou port to Dakar/Lagos/Abidjan port, then land transit across West Africa in 60-75 days through partner network',
    price: { min: 2000, max: 4500, unit: 'USD per 20ft container' },
  },
  seaFreightLCL: {
    name: 'Sea Freight LCL to Africa',
    description: 'Less than container load consolidation shipping from China to West Africa via trusted partners',
    price: { min: 80, max: 150, unit: 'USD per CBM' },
  },
  sourcing: {
    name: 'China Sourcing & Procurement Service',
    description: 'Professional sourcing agent services from Alibaba, 1688, and Chinese factories with quality inspection and shipping to Africa',
    price: { min: 50, max: 500, unit: 'USD per order' },
  },
  supplierPayment: {
    name: 'Supplier Payment Service China',
    description: 'Secure payment processing for Chinese suppliers via Alibaba, WeChat Pay, Alipay, and bank transfer. Protect your payments with our escrow service.',
    price: { min: 25, max: 200, unit: 'USD per transaction' },
  },
  supplierVerification: {
    name: 'Chinese Supplier Verification Service',
    description: 'On-site factory audits, business license verification, and quality checks of Chinese suppliers before you pay. Avoid scams on Alibaba and 1688.',
    price: { min: 100, max: 500, unit: 'USD per supplier' },
  },
  alibabaAgent: {
    name: 'Alibaba Buying Agent for Africa',
    description: 'We buy from Alibaba on your behalf, negotiate prices, inspect quality, and ship to Mali, Senegal, Ivory Coast, and all of West Africa.',
    price: { min: 50, max: 300, unit: 'USD per order' },
  },
  consolidation: {
    name: 'Package Consolidation China',
    description: 'Combine multiple supplier orders into one shipment. Save up to 60% on shipping costs from China to Africa with our consolidation warehouse in Yiwu.',
    price: { min: 5, max: 50, unit: 'USD per package' },
  },
};

// ============================================================================
// Advanced Structured Data Generators
// ============================================================================

/**
 * Generate Organization schema with enhanced properties
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.url}/#organization`,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateName,
    url: BUSINESS_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS_INFO.logo,
      width: 512,
      height: 512,
      caption: `${BUSINESS_INFO.name} Logo`,
    },
    image: BUSINESS_INFO.logo,
    sameAs: BUSINESS_INFO.social,
    foundingDate: BUSINESS_INFO.founded,
    /*
     * `numberOfEmployees: 50–200` was declared here with nothing behind it. A
     * headcount is trivially checkable and being caught inflating one is a
     * worse outcome than not publishing it, so the property is omitted until
     * the real figure is known.
     */
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.contact.phones.china,
        contactType: 'customer service',
        areaServed: ['CN', 'ML', 'SN', 'CI', 'NG', 'GH', 'BF', 'NE', 'BJ', 'TG', 'GN', 'CM', 'CD'],
        availableLanguage: ['French', 'English', 'Chinese', 'Bambara'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.contact.phones.mali,
        contactType: 'technical support',
        areaServed: ['ML', 'SN', 'CI', 'NG', 'GH', 'BF', 'NE', 'BJ', 'TG', 'GN', 'CM', 'CD'],
        availableLanguage: ['French', 'Bambara', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'WhatsApp',
        url: `https://wa.me/${BUSINESS_INFO.contact.whatsapp.china}`,
        areaServed: ['CN', 'ML', 'SN', 'CI', 'NG', 'GH', 'BF', 'NE', 'BJ', 'TG', 'GN', 'CM', 'CD'],
        availableLanguage: ['French', 'English', 'Chinese', 'Bambara'],
      },
    ],
    address: [
      BUSINESS_INFO.address,
      BUSINESS_INFO.chinaAddress,
      BUSINESS_INFO.chinaSeaAddress,
    ],
    /*
     * Three real places: the Bamako office and the two Guangdong warehouses,
     * one per shipping mode. Naming both is the strongest entity signal this
     * company has — it is the specific, checkable fact that separates it from
     * every similarly-named forwarder.
     */
    location: [
      {
        '@type': 'Place',
        name: 'ChinaLink Express — Bamako',
        address: BUSINESS_INFO.address,
        geo: BUSINESS_INFO.geo,
      },
      {
        '@type': 'Place',
        name: 'ChinaLink Express — entrepôt fret aérien, Guangzhou',
        address: BUSINESS_INFO.chinaAddress,
        geo: BUSINESS_INFO.chinaGeo,
      },
      {
        '@type': 'Place',
        name: 'ChinaLink Express — entrepôt fret maritime, Foshan',
        address: BUSINESS_INFO.chinaSeaAddress,
        geo: BUSINESS_INFO.chinaSeaGeo,
      },
    ],
  };
}

/**
 * Generate LocalBusiness schema with full details - EXPANDED areaServed
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.url}/#localbusiness`,
    name: BUSINESS_INFO.name,
    image: BUSINESS_INFO.logo,
    url: BUSINESS_INFO.url,
    telephone: BUSINESS_INFO.contact.phones.mali,
    email: BUSINESS_INFO.contact.email,
    address: BUSINESS_INFO.address,
    geo: BUSINESS_INFO.geo,
    openingHoursSpecification: BUSINESS_INFO.hours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    priceRange: '$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Money', 'Alipay', 'WeChat Pay', 'PayPal'],
    currenciesAccepted: ['USD', 'EUR', 'CNY', 'XOF', 'XAF'],
    // EXPANDED: All West and Central African countries
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Senegal' },
      { '@type': 'Country', name: 'Ivory Coast' },
      { '@type': 'Country', name: 'Cote d\'Ivoire' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Burkina Faso' },
      { '@type': 'Country', name: 'Niger' },
      { '@type': 'Country', name: 'Benin' },
      { '@type': 'Country', name: 'Togo' },
      { '@type': 'Country', name: 'Guinea' },
      { '@type': 'Country', name: 'Cameroon' },
      { '@type': 'Country', name: 'Democratic Republic of the Congo' },
      { '@type': 'Country', name: 'China' },
      { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 12.0, longitude: -5.0 }, geoRadius: '2000 km', description: 'West Africa' },
    ],
    hasMap: 'https://www.google.com/maps/search/?api=1&query=12.6392,-8.0029',
    /*
     * No `aggregateRating`.
     *
     * This node used to declare 4.8 from 127 reviews, and the landing page's
     * stats band declared 4.8 from 312 — two different invented denominators
     * for the same invented average, on the same document. The reviews
     * collection holds two ratings.
     *
     * Google requires the rating to be derived from reviews the site has
     * actually collected and displays; a literal in a config file is exactly
     * the case its policy names. Reinstate this only as a computed value over
     * a real sample. See constants/companyFacts.ts.
     */
  };
}

/**
 * Generate Service schema for specific offerings - EXPANDED
 */
export function generateServiceSchema(
  serviceType: 'air' | 'sea' | 'sourcing' | 'payment' | 'verification' | 'alibaba',
  locale: Locale = 'fr'
) {
  const isEn = locale === 'en';
  
  const serviceConfig = {
    air: {
      name: isEn ? 'Air Freight China to Africa' : 'Fret Aérien Chine-Afrique',
      description: isEn 
        ? 'Fast and reliable air freight from China to Bamako, Mali, Dakar, Senegal, Abidjan, Ivory Coast and all West Africa. Delivery in 14-21 days with real-time tracking via our partner network.'
        : 'Fret aérien rapide et fiable de la Chine vers Bamako (Mali), Dakar (Sénégal), Abidjan (Côte d\'Ivoire) et toute l\'Afrique de l\'Ouest. Livraison en 14-21 jours avec suivi en temps réel.',
      provider: generateOrganizationSchema(),
      serviceType: 'FreightForwardingService',
      areaServed: SHIPPING_ROUTES.map(r => ({ '@type': 'Country', name: r.destination })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Air Freight Services' : 'Services de Fret Aérien',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Standard Air Freight' : 'Fret Aérien Standard',
              description: isEn ? '5-10kg packages, 21 days delivery to Bamako' : 'Colis 5-10kg, livraison 21 jours à Bamako',
            },
            price: '12.00',
            priceCurrency: 'USD',
            priceUnit: 'kilogram',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Express Air Freight' : 'Fret Aérien Express',
              description: isEn ? '10kg+ packages, 14 days delivery to Bamako' : 'Colis 10kg+, livraison 14 jours à Bamako',
            },
            price: '10.00',
            priceCurrency: 'USD',
            priceUnit: 'kilogram',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Bulk Air Cargo' : 'Cargo Aérien en Vrac',
              description: isEn ? '100kg+ commercial shipments, 14-18 days' : 'Expéditions commerciales 100kg+, 14-18 jours',
            },
            price: '8.00',
            priceCurrency: 'USD',
            priceUnit: 'kilogram',
          },
        ],
      },
    },
    sea: {
      name: isEn ? 'Sea Freight China to Africa' : 'Fret Maritime Chine-Afrique',
      description: isEn
        ? 'Economical sea freight from Foshan/Guangzhou port to Dakar, Lagos, Abidjan ports, then land transit to Bamako and across West Africa. FCL and LCL options. Delivery in 60-75 days through trusted partners.'
        : 'Fret maritime économique du port de Foshan/Guangzhou vers Dakar, Lagos, Abidjan, puis transit terrestre vers Bamako et toute l\'Afrique de l\'Ouest. Options FCL et LCL. Livraison en 60-75 jours.',
      provider: generateOrganizationSchema(),
      serviceType: 'FreightForwardingService',
      areaServed: SHIPPING_ROUTES.map(r => ({ '@type': 'Country', name: r.destination })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Sea Freight Services' : 'Services de Fret Maritime',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'FCL 20ft Container' : 'Conteneur FCL 20ft',
              description: isEn ? 'Full container load, 20-foot container to West Africa' : 'Conteneur complet 20 pieds vers l\'Afrique de l\'Ouest',
            },
            price: '3200.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'FCL 40ft Container' : 'Conteneur FCL 40ft',
              description: isEn ? 'Full container load, 40-foot container to West Africa' : 'Conteneur complet 40 pieds vers l\'Afrique de l\'Ouest',
            },
            price: '4500.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'LCL Consolidation' : 'Groupage LCL',
              description: isEn ? 'Less than container load, per CBM pricing to Bamako' : 'Groupage, tarification au CBM vers Bamako',
            },
            price: '120.00',
            priceCurrency: 'USD',
            priceUnit: 'cubic meter',
          },
        ],
      },
    },
    sourcing: {
      name: isEn ? 'China Sourcing Agent & Procurement' : 'Agent Sourcing & Approvisionnement Chine',
      description: isEn
        ? 'Professional China sourcing agent for African importers. We buy from Alibaba, 1688, and Chinese factories. Supplier verification, quality inspection, payment processing, and shipping to Mali, Senegal, Ivory Coast, and all West Africa.'
        : 'Agent sourcing professionnel en Chine pour importateurs africains. Achat sur Alibaba, 1688 et usines chinoises. Vérification fournisseurs, inspection qualité, paiement et expédition vers le Mali, Sénégal, Côte d\'Ivoire et toute l\'Afrique de l\'Ouest.',
      provider: generateOrganizationSchema(),
      serviceType: 'ProfessionalService',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Sourcing Services' : 'Services de Sourcing',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Alibaba Buying Agent' : 'Agent Achat Alibaba',
              description: isEn ? 'Buy from Alibaba on your behalf, negotiate prices' : 'Acheter sur Alibaba en votre nom, négocier les prix',
            },
            price: '50.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? '1688 Sourcing Agent' : 'Agent Sourcing 1688',
              description: isEn ? 'Source directly from Chinese factories on 1688.com' : 'Sourcer directement des usines chinoises sur 1688.com',
            },
            price: '80.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Quality Inspection' : 'Inspection Qualité',
              description: isEn ? 'Pre-shipment product inspection at factory' : 'Inspection produit avant expédition à l\'usine',
            },
            price: '100.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Factory Visit & Audit' : 'Visite Usine & Audit',
              description: isEn ? 'On-site factory verification in China' : 'Vérification sur place des usines en Chine',
            },
            price: '300.00',
            priceCurrency: 'USD',
          },
        ],
      },
    },
    payment: {
      name: isEn ? 'Chinese Supplier Payment Service' : 'Service Paiement Fournisseur Chinois',
      description: isEn
        ? 'Secure payment service for Chinese suppliers. We pay your Alibaba, 1688, and factory suppliers safely via Alipay, WeChat Pay, bank transfer, or escrow. Protect your money from scams and payment failures.'
        : 'Service de paiement sécurisé pour fournisseurs chinois. Nous payons vos fournisseurs Alibaba, 1688 et usines en toute sécurité via Alipay, WeChat Pay, virement bancaire ou escrow. Protégez votre argent des arnaques.',
      provider: generateOrganizationSchema(),
      serviceType: 'FinancialService',
      areaServed: SHIPPING_ROUTES.map(r => ({ '@type': 'Country', name: r.destination })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Payment Services' : 'Services de Paiement',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Alibaba Order Payment' : 'Paiement Commande Alibaba',
              description: isEn ? 'Pay your Alibaba suppliers safely' : 'Payez vos fournisseurs Alibaba en toute sécurité',
            },
            price: '25.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? '1688 Order Payment' : 'Paiement Commande 1688',
              description: isEn ? 'Pay your 1688 suppliers (Chinese-only platform)' : 'Payez vos fournisseurs 1688 (plateforme chinoise)',
            },
            price: '35.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Factory Direct Payment' : 'Paiement Direct Usine',
              description: isEn ? 'Bank transfer or mobile payment to Chinese factories' : 'Virement bancaire ou paiement mobile vers usines chinoises',
            },
            price: '50.00',
            priceCurrency: 'USD',
          },
        ],
      },
    },
    verification: {
      name: isEn ? 'Chinese Supplier Verification Service' : 'Service Vérification Fournisseur Chinois',
      description: isEn
        ? 'Avoid scams on Alibaba and 1688. We verify Chinese suppliers on-site: check business licenses, visit factories, inspect production capacity, and validate product quality before you pay. Essential for safe importing from China to Africa.'
        : 'Évitez les arnaques sur Alibaba et 1688. Nous vérifions les fournisseurs chinois sur place : vérification des licences, visite d\'usine, inspection de la capacité de production et validation de la qualité avant paiement.',
      provider: generateOrganizationSchema(),
      serviceType: 'ProfessionalService',
      areaServed: SHIPPING_ROUTES.map(r => ({ '@type': 'Country', name: r.destination })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Verification Services' : 'Services de Vérification',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Business License Check' : 'Vérification Licence Commerciale',
              description: isEn ? 'Verify supplier registration and legal status in China' : 'Vérifier l\'enregistrement et le statut légal du fournisseur en Chine',
            },
            price: '50.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Factory Site Inspection' : 'Inspection sur Site Usine',
              description: isEn ? 'Physical visit to supplier factory in China' : 'Visite physique de l\'usine du fournisseur en Chine',
            },
            price: '200.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Full Due Diligence Report' : 'Rapport Due Diligence Complet',
              description: isEn ? 'Complete supplier background check and risk assessment' : 'Vérification complète et évaluation des risques du fournisseur',
            },
            price: '500.00',
            priceCurrency: 'USD',
          },
        ],
      },
    },
    alibaba: {
      name: isEn ? 'Alibaba Agent for Africa' : 'Agent Alibaba pour l\'Afrique',
      description: isEn
        ? 'Your trusted Alibaba buying agent in China. We help African businesses buy safely from Alibaba: find suppliers, negotiate prices, verify quality, handle payment, and ship to Mali, Senegal, Ivory Coast, and all West Africa.'
        : 'Votre agent achat Alibaba de confiance en Chine. Nous aidons les entreprises africaines à acheter en toute sécurité sur Alibaba : recherche de fournisseurs, négociation, vérification qualité, paiement et expédition.',
      provider: generateOrganizationSchema(),
      serviceType: 'ProfessionalService',
      areaServed: SHIPPING_ROUTES.map(r => ({ '@type': 'Country', name: r.destination })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'Alibaba Agent Services' : 'Services Agent Alibaba',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Alibaba Product Sourcing' : 'Sourcing Produits Alibaba',
              description: isEn ? 'Find the best suppliers for your products on Alibaba' : 'Trouver les meilleurs fournisseurs pour vos produits sur Alibaba',
            },
            price: '50.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Alibaba Order Management' : 'Gestion Commandes Alibaba',
              description: isEn ? 'We place and manage your Alibaba orders for you' : 'Nous passons et gérons vos commandes Alibaba pour vous',
            },
            price: '30.00',
            priceCurrency: 'USD',
          },
        ],
      },
    },
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...serviceConfig[serviceType],
  };
}

/**
 * Generate ShippingDeliveryTime schema
 */
export function generateShippingDeliveryTimeSchema(
  route: ShippingRoute,
  method: 'air' | 'sea'
) {
  const duration = method === 'air' 
    ? { min: 14, max: 21, unit: 'day' }
    : { min: 60, max: 75, unit: 'day' };
    
  return {
    '@context': 'https://schema.org',
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 3,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: duration.min,
      maxValue: duration.max,
      unitCode: 'DAY',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: route.destination,
    },
    shippingOrigin: {
      '@type': 'DefinedRegion',
      addressCountry: route.origin,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  locale: Locale = 'fr'
) {
  const baseUrl = BUSINESS_INFO.url;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(
  faqs: { question: string; answer: string }[],
  locale: Locale = 'fr'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review schema — for genuine, collected reviews only.
 *
 * This function used to carry four invented reviews as its default payload:
 * "Amadou Diallo", "Fatou Keita", "Moussa Traore" and "Aisha Cissé", with
 * invented ratings, invented publication dates and an invented story about a
 * €5,000 Alibaba scam. Any caller that omitted the argument published all four
 * to Google as real customer testimony, along with an aggregateRating derived
 * from them.
 *
 * Google's review-snippet policy treats fabricated review markup as spam and
 * it carries a manual action against the whole site. The default is gone, and
 * the function now returns `null` rather than inventing a fallback — a page
 * with no reviews must emit no review markup.
 *
 * ChinaLink has collected four reviews to date (see REVIEWS_COLLECTED in
 * constants/companyFacts.ts). They are real, and since 2026-09 they render on
 * the home page, /calculateur and /avis, fetched live from the API. They are
 * still not emitted as markup: four ratings is not an average to hand a search
 * engine, and reviews a business collects about itself are not eligible for
 * review rich results whatever the sample size. Showing them to readers is the
 * point; a star in the SERP is not on offer for first-party reviews.
 */
export function generateReviewSchema(
  reviews: {
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }[]
) {
  if (!reviews || reviews.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.url}/#localbusiness`,
    name: BUSINESS_INFO.name,
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };
}

/**
 * Generate WebSite schema with search
 */
export function generateWebsiteSchema(locale: Locale = 'fr') {
  const isEn = locale === 'en';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS_INFO.url}/#website`,
    name: BUSINESS_INFO.name,
    url: BUSINESS_INFO.url,
    /*
     * No `potentialAction: SearchAction`.
     *
     * It declared `/{locale}/search?q={search_term_string}`. There is no
     * `search` route on this site — the URL 404s. A sitelinks searchbox that
     * points at a 404 is invalid markup, and declaring capabilities the site
     * does not have is the same credibility problem as an invented statistic,
     * just aimed at a crawler instead of a reader.
     */
    inLanguage: getSeoLocale(locale),
    publisher: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
  };
}

/**
 * The homepage's Service node.
 *
 * Deliberately separate from `generateServiceSchema`, which embeds a full
 * Organization object as its `provider` — fine on a service page rendered
 * alone, but on the homepage it would put a second Organization into a graph
 * that already declares one, which is how an entity gets split in two.
 *
 * This node references the organization by `@id` instead, and describes the one
 * corridor the business actually runs. No prices: air and sea rates move with
 * volume and season, and a price in markup that disagrees with the quote a
 * client is given is worse than no price at all.
 */
export function generateHomeServiceSchema(locale: Locale = 'fr') {
  const isEn = locale === 'en';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS_INFO.url}/#service-china-mali`,
    name: isEn
      ? 'China to Mali shipping, sourcing and supplier payment'
      : 'Expédition, sourcing et paiement fournisseur Chine–Mali',
    description: isEn
      ? 'Supplier sourcing and purchasing in China, supplier payment, receiving and consolidation at the Guangzhou and Foshan warehouses, air freight in 14–21 days or sea freight in 60–75 days to Bamako, with shipment status updates throughout.'
      : 'Recherche de fournisseurs et achat en Chine, paiement fournisseur, réception et consolidation aux entrepôts de Guangzhou et Foshan, fret aérien en 14 à 21 jours ou maritime en 60 à 75 jours vers Bamako, avec information du client à chaque étape.',
    serviceType: 'FreightForwardingService',
    provider: { '@id': `${BUSINESS_INFO.url}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'China' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: BUSINESS_INFO.url,
      servicePhone: BUSINESS_INFO.contact.phones.china,
    },
  };
}

/**
 * Generate process ItemList schema for guides.
 * HowTo rich results are deprecated, so use ItemList for crawlable step summaries.
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string; image?: string }[],
  locale: Locale = 'fr'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    itemListElement: steps.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      description: step.text,
      ...(step.image ? { image: step.image } : {}),
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string = 'ChinaLink Express Team',
  locale: Locale = 'fr'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url: `${BUSINESS_INFO.url}${url}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: BUSINESS_INFO.url,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo,
      },
    },
    inLanguage: getSeoLocale(locale),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BUSINESS_INFO.url}${url}`,
    },
  };
}

// ============================================================================
// Metadata Generators
// ============================================================================

/**
 * Generate hreflang alternates for a page
 */
/**
 * Compose the locale-prefixed path for a page.
 *
 * A locale home page is declared as `path: '/'`, which naively composes to
 * `/fr/`. next.config.ts sets `trailingSlash: false`, so `/fr/` 308-redirects to
 * `/fr` — and Google discards a canonical or hreflang that points at a redirect,
 * substituting its own choice. That surfaces in Search Console as "Duplicate,
 * Google chose different canonical than user". Every URL we declare must be the
 * one the server answers 200 for.
 */
function localePath(locale: Locale | string, path: string): string {
  const normalized = path === '/' ? '' : path.replace(/\/+$/, '');
  return `/${locale}${normalized}`;
}

export function generateHreflangAlternates(
  path: string = '',
  excludeLocales?: Locale[],
  supportedLocales: Locale[] = [...i18nConfig.locales]
): Record<string, string> {
  const alternates: Record<string, string> = {};

  supportedLocales.forEach(locale => {
    if (excludeLocales?.includes(locale)) return;

    const seoLocale = getSeoLocale(locale);
    alternates[seoLocale] = localePath(locale, path);
  });

  const defaultLocale = supportedLocales.includes('fr') ? 'fr' : supportedLocales[0];
  alternates['x-default'] = localePath(defaultLocale, path);

  return alternates;
}

/**
 * Generate comprehensive metadata for any page
 */
export function generatePageMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  ogImage,
  ogType = 'website',
  noIndex = false,
  supportedLocales,
}: {
  title: string;
  description: string;
  keywords: string;
  path: string;
  locale: Locale;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  supportedLocales?: Locale[];
}): Metadata {
  const baseUrl = BUSINESS_INFO.url;
  const canonicalUrl = localePath(locale, path);
  const fullUrl = `${baseUrl}${canonicalUrl}`;
  const seoLocale = getSeoLocale(locale);
  const frenchOnlyPathPrefixes = ['/blog', '/guides', '/cargo-chine-mali', '/communaute'];
  const resolvedSupportedLocales =
    supportedLocales ||
    (frenchOnlyPathPrefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
      ? (['fr'] as Locale[])
      : undefined);
  
  const defaultOgImage = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg';
  
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangAlternates(path, undefined, resolvedSupportedLocales),
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: BUSINESS_INFO.name,
      locale: seoLocale,
      type: ogType,
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage || defaultOgImage],
      creator: '@chinalinkexpress',
      site: '@chinalinkexpress',
    },
    robots: noIndex 
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    other: {
      'geo.region': 'ML-BM',
      'geo.placename': 'Bamako',
      'geo.position': '12.6392;-8.0029',
      'ICBM': '12.6392, -8.0029',
    },
  };
}

// ============================================================================
// Page-Specific SEO Data
// ============================================================================

export const PAGE_PATHS = {
  home: '/',
  services: {
    airFreight: '/services/air-freight',
    seaFreight: '/services/sea-freight',
    sourcing: '/services/sourcing',
    payment: '/services/paiement-fournisseur-chine',
    verification: '/services/verification-fournisseur-chine',
    alibabaAgent: '/services/agent-sourcing-chine',
    alibabaBuying: '/services/achat-alibaba-mali',
  },
  routes: {
    chinaToMali: '/routes/china-to-mali',
    chinaToSenegal: '/routes/china-to-senegal',
    chinaToCoteIvoire: '/routes/china-to-cote-divoire',
    chinaToNigeria: '/routes/china-to-nigeria',
    chinaToGhana: '/routes/china-to-ghana',
    chinaToAfrica: '/routes/china-to-africa',
  },
  tools: {
    calculator: '/calculateur',
    pricing: '/tarifs',
  },
  info: {
    contact: '/contact',
    about: '/about',
    faq: '/faq',
    privacy: '/privacy',
    testimonials: '/temoignages',
  },
  industries: {
    textiles: '/industries/textiles-chine-afrique',
    electronics: '/industries/electronique-chine-afrique',
    machinery: '/industries/machines-chine-afrique',
    cosmetics: '/industries/cosmetiques-chine-afrique',
    autoParts: '/industries/pieces-auto-chine-afrique',
    construction: '/industries/materiaux-construction-chine-afrique',
  },
} as const;

// ============================================================================
// MASSIVELY EXPANDED Keywords by Locale - 200+ keywords each
// ============================================================================

export const SEO_KEYWORDS = {
  en: {
    // Core shipping keywords
    primary: 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight, cargo shipping, express delivery, freight forwarder, shipping agent',
    // Long-tail search queries
    longTail: 'shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, Alibaba shipping agent, how to import from China to Mali, cheapest shipping from China to Africa, reliable freight forwarder China Africa, shipping agent for small business, door to door shipping China Africa, shipping from China to Senegal, shipping from China to Ivory Coast, shipping from China to Nigeria, shipping from China to Ghana',
    // Service-specific keywords
    service: 'air cargo China Africa, express shipping China Mali, FCL shipping, LCL consolidation, customs clearance Africa, container shipping China Africa, bulk cargo shipping, parcel delivery China Africa, package consolidation China, warehousing China Africa, door to door delivery, multimodal transport',
    // Location keywords
    location: 'shipping China Bamako, freight forwarder China Mali, import China Mali, sourcing Bamako, logistics company Bamako, shipping agent Mali, cargo Mali, freight Mali, import export Mali, shipping to West Africa, China Africa trade route',
    // Sourcing keywords - NEW
    sourcing: 'China sourcing agent, Alibaba sourcing agent, 1688 sourcing agent, buy from Alibaba, buy from 1688, Chinese supplier finder, factory direct sourcing, wholesale from China, import from China, China procurement services, product sourcing China, private label manufacturing China, OEM factory China',
    // Payment keywords - NEW
    payment: 'pay Chinese supplier, supplier payment China, Alibaba payment service, 1688 payment, pay factory in China, secure payment China, escrow payment China, WeChat Pay supplier, Alipay supplier payment, bank transfer China supplier, payment agent China, avoid Alibaba scam, safe payment China',
    // Verification keywords - NEW
    verification: 'verify Chinese supplier, Alibaba supplier verification, check Chinese factory, avoid China scam, legitimate Chinese supplier, factory audit China, supplier background check, Alibaba scam check, 1688 supplier check, China supplier blacklist, reliable supplier China, trusted manufacturer China',
    // Industry keywords - NEW
    industry: 'import textiles from China, import electronics from China, import machinery from China, import cosmetics from China, import auto parts from China, import construction materials from China, wholesale clothing China, wholesale phones China, wholesale machines China',
    // Comparison keywords - NEW
    comparison: 'air freight vs sea freight China Africa, DHL vs freight forwarder China, cheapest shipping method China Africa, Alibaba vs 1688 for Africa, shipping by air or sea from China, container vs air cargo cost',
  },
  fr: {
    // Core shipping keywords
    primary: 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale, transport maritime, transport aérien, cargo Chine, société logistique, agent maritime',
    // Long-tail search queries
    longTail: 'expédition colis Chine Afrique, fret Chine Mali, agent sourcing Chine, paiement fournisseur chinois, comment importer de Chine au Mali, fret pas cher Chine Afrique, transitaire fiable Chine Afrique, agent maritime petit commerce, livraison porte à porte Chine Afrique, expédition Chine Sénégal, expédition Chine Côte d\'Ivoire, expédition Chine Nigeria, expédition Chine Ghana',
    // Service-specific keywords
    service: 'cargo aérien Chine Afrique, express Chine Mali, conteneur complet FCL, groupage maritime LCL, dédouanement Mali, transport conteneur Chine Afrique, fret vrac, livraison colis Chine Afrique, consolidation colis Chine, entrepôt Chine Afrique, livraison porte à porte, transport multimodal',
    // Location keywords
    location: 'expédition Chine Bamako, transitaire Bamako, fret Chine Mali, sourcing Mali, société logistique Bamako, agent maritime Mali, cargo Mali, fret Mali, import export Mali, expédition Afrique de l\'Ouest, route commerciale Chine Afrique',
    // Sourcing keywords - NEW
    sourcing: 'agent sourcing Chine, agent sourcing Alibaba, agent sourcing 1688, acheter sur Alibaba, acheter sur 1688, trouver fournisseur chinois, sourcing direct usine, grossiste Chine, importer de Chine, service approvisionnement Chine, sourcing produits Chine, fabrication marque privée Chine, usine OEM Chine',
    // Payment keywords - NEW
    payment: 'payer fournisseur chinois, paiement fournisseur Chine, service paiement Alibaba, paiement 1688, payer usine Chine, paiement sécurisé Chine, escrow Chine, WeChat Pay fournisseur, Alipay paiement fournisseur, virement bancaire fournisseur Chine, agent paiement Chine, éviter arnaque Alibaba, paiement sécurisé Chine',
    // Verification keywords - NEW
    verification: 'vérifier fournisseur chinois, vérification fournisseur Alibaba, vérifier usine chinoise, éviter arnaque Chine, fournisseur chinois sérieux, audit usine Chine, vérification antécédents fournisseur, vérification arnaque Alibaba, vérification fournisseur 1688, liste noire fournisseurs Chine, fournisseur fiable Chine, fabricant de confiance Chine',
    // Industry keywords - NEW
    industry: 'importer textiles Chine, importer électronique Chine, importer machines Chine, importer cosmétiques Chine, importer pièces auto Chine, importer matériaux construction Chine, gros vêtements Chine, gros téléphones Chine, gros machines Chine',
    // Comparison keywords - NEW
    comparison: 'fret aérien vs maritime Chine Afrique, DHL vs transitaire Chine, moyen expédition pas cher Chine Afrique, Alibaba vs 1688 pour Afrique, expédition air ou mer depuis Chine, conteneur vs cargo aérien coût',
  },
} as const;

/**
 * Build keyword string from categories
 */
export function buildKeywords(
  locale: Locale,
  categories: ('primary' | 'longTail' | 'service' | 'location' | 'sourcing' | 'payment' | 'verification' | 'industry' | 'comparison')[]
): string {
  const keywords = SEO_KEYWORDS[locale === 'en' ? 'en' : 'fr'];
  return categories.map(cat => keywords[cat]).join(', ');
}

/**
 * Get all keywords as a single string (for comprehensive pages)
 */
export function getAllKeywords(locale: Locale): string {
  const k = SEO_KEYWORDS[locale === 'en' ? 'en' : 'fr'];
  return Object.values(k).join(', ');
}
