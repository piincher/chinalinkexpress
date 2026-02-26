/**
 * Advanced SEO Configuration
 * 
 * Enterprise-level SEO with comprehensive structured data,
 * hreflang management, and logistics-specific schema markup.
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
// Business Information
// ============================================================================

export const BUSINESS_INFO = {
  name: 'ChinaLink Express',
  alternateName: 'CLE Logistics',
  url: 'https://www.chinalinkexpress.com',
  logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
  founded: '2017',
  employees: '50-200',
  
  contact: {
    email: 'contact@chinalinkexpress.com',
    phones: {
      china: '+86 188 5172 5957',
      mali: '+223 7669 61 77',
      senegal: '+223 5100 50 42',
    },
    whatsapp: {
      china: '+8618851725957',
      mali: '+22376696177',
    },
  },
  
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Kalaban Coura, près du lycée Birgo',
    addressLocality: 'Bamako',
    addressRegion: 'Bamako District',
    postalCode: 'BPE',
    addressCountry: 'ML',
  },
  
  geo: {
    '@type': 'GeoCoordinates' as const,
    latitude: 12.6392,
    longitude: -8.0029,
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
// Shipping Routes Data (for structured data)
// ============================================================================

export const SHIPPING_ROUTES: ShippingRoute[] = [
  { origin: 'China', destination: 'Mali', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Senegal', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Ivory Coast', durationDays: { min: 14, max: 72 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Nigeria', durationDays: { min: 14, max: 68 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Ghana', durationDays: { min: 14, max: 70 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Guinea', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
  { origin: 'China', destination: 'Burkina Faso', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] },
];

// ============================================================================
// Service Offers (for Offer schema)
// ============================================================================

export const SERVICE_OFFERS: Record<string, ServiceOffer> = {
  airFreight: {
    name: 'Air Freight China to Africa',
    description: 'Express air freight delivery from China to West Africa in 14-21 business days',
    price: { min: 8, max: 15, unit: 'USD per kg' },
  },
  seaFreightFCL: {
    name: 'Sea Freight FCL',
    description: 'Full container load shipping from China to Africa in 60-75 days',
    price: { min: 2000, max: 4500, unit: 'USD per 20ft container' },
  },
  seaFreightLCL: {
    name: 'Sea Freight LCL',
    description: 'Less than container load consolidation shipping from China to Africa',
    price: { min: 80, max: 150, unit: 'USD per CBM' },
  },
  sourcing: {
    name: 'China Sourcing Service',
    description: 'Professional sourcing from Alibaba, 1688, Taobao with quality inspection',
    price: { min: 50, max: 500, unit: 'USD per order' },
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
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 200,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.contact.phones.china,
        contactType: 'customer service',
        areaServed: ['CN', 'ML', 'SN', 'CI', 'NG'],
        availableLanguage: ['French', 'English', 'Chinese'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.contact.phones.mali,
        contactType: 'technical support',
        areaServed: 'ML',
        availableLanguage: ['French', 'Bambara'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'WhatsApp',
        url: `https://wa.me/${BUSINESS_INFO.contact.whatsapp.china}`,
        areaServed: ['CN', 'ML', 'SN', 'CI', 'NG'],
        availableLanguage: ['French', 'English', 'Chinese'],
      },
    ],
    address: BUSINESS_INFO.address,
  };
}

/**
 * Generate LocalBusiness schema with full details
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
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Money', 'WeChat Pay', 'Alipay'],
    currenciesAccepted: ['USD', 'EUR', 'CNY', 'XOF', 'XAF'],
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Senegal' },
      { '@type': 'Country', name: 'Ivory Coast' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Guinea' },
      { '@type': 'Country', name: 'Burkina Faso' },
      { '@type': 'Country', name: 'Benin' },
      { '@type': 'Country', name: 'Togo' },
    ],
    hasMap: 'https://www.google.com/maps/search/?api=1&query=12.6392,-8.0029',
  };
}

/**
 * Generate Service schema for specific offerings
 */
export function generateServiceSchema(
  serviceType: 'air' | 'sea' | 'sourcing',
  locale: Locale = 'fr'
) {
  const isEn = locale === 'en';
  
  const serviceConfig = {
    air: {
      name: isEn ? 'Air Freight China to Africa' : 'Fret Aérien Chine-Afrique',
      description: isEn 
        ? 'Fast and reliable air freight from China to West Africa. Delivery in 14-21 days with real-time tracking.'
        : 'Fret aérien rapide et fiable de la Chine vers l\'Afrique de l\'Ouest. Livraison en 14-21 jours avec suivi en temps réel.',
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
              description: isEn ? '5-10kg packages, 21 days delivery' : 'Colis 5-10kg, livraison 21 jours',
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
              description: isEn ? '10kg+ packages, 14 days delivery' : 'Colis 10kg+, livraison 14 jours',
            },
            price: '10.00',
            priceCurrency: 'USD',
            priceUnit: 'kilogram',
          },
        ],
      },
    },
    sea: {
      name: isEn ? 'Sea Freight China to Africa' : 'Fret Maritime Chine-Afrique',
      description: isEn
        ? 'Economical sea freight from China to West Africa. FCL and LCL options. Delivery in 60-75 days.'
        : 'Fret maritime économique de la Chine vers l\'Afrique de l\'Ouest. Options FCL et LCL. Livraison en 60-75 jours.',
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
              description: isEn ? 'Full container load, 20-foot container' : 'Conteneur complet, 20 pieds',
            },
            price: '3200.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'FCL 40ft Container' : 'Conteneur FCL 40ft',
              description: isEn ? 'Full container load, 40-foot container' : 'Conteneur complet, 40 pieds',
            },
            price: '4500.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'LCL Consolidation' : 'Groupage LCL',
              description: isEn ? 'Less than container load, per CBM pricing' : 'Groupage, tarification au CBM',
            },
            price: '120.00',
            priceCurrency: 'USD',
            priceUnit: 'cubic meter',
          },
        ],
      },
    },
    sourcing: {
      name: isEn ? 'China Sourcing & Procurement' : 'Sourcing & Approvisionnement Chine',
      description: isEn
        ? 'Professional sourcing agent services from Alibaba, 1688, Taobao. Supplier verification, quality inspection, and payment processing.'
        : 'Services d\'agent sourcing professionnel sur Alibaba, 1688, Taobao. Vérification fournisseurs, inspection qualité et paiement.',
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
              name: isEn ? 'Supplier Search' : 'Recherche Fournisseur',
              description: isEn ? 'Find reliable suppliers on Alibaba/1688' : 'Trouver des fournisseurs fiables sur Alibaba/1688',
            },
            price: '50.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Quality Inspection' : 'Inspection Qualité',
              description: isEn ? 'Pre-shipment product inspection' : 'Inspection produit avant expédition',
            },
            price: '100.00',
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
 * Logistics-specific structured data
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
 * Generate Review/Rating schema
 */
export function generateReviewSchema(
  reviews: {
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }[]
) {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_INFO.url}/#localbusiness`,
    name: BUSINESS_INFO.name,
    aggregateRating,
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BUSINESS_INFO.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: getSeoLocale(locale),
    publisher: {
      '@id': `${BUSINESS_INFO.url}/#organization`,
    },
  };
}

// ============================================================================
// Metadata Generators
// ============================================================================

/**
 * Generate hreflang alternates for a page
 */
export function generateHreflangAlternates(
  path: string = '',
  excludeLocales?: Locale[]
): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  i18nConfig.locales.forEach(locale => {
    if (excludeLocales?.includes(locale)) return;
    
    const seoLocale = getSeoLocale(locale);
    alternates[seoLocale] = `/${locale}${path}`;
  });
  
  // Add x-default pointing to French (primary market)
  alternates['x-default'] = `/fr${path}`;
  
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
}: {
  title: string;
  description: string;
  keywords: string;
  path: string;
  locale: Locale;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const baseUrl = BUSINESS_INFO.url;
  const canonicalUrl = `/${locale}${path}`;
  const fullUrl = `${baseUrl}${canonicalUrl}`;
  const seoLocale = getSeoLocale(locale);
  
  const defaultOgImage = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg';
  
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangAlternates(path),
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
  },
  routes: {
    chinaToMali: '/routes/china-to-mali',
    chinaToSenegal: '/routes/china-to-senegal',
    chinaToIvoryCoast: '/routes/china-to-ivory-coast',
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
  },
} as const;

// ============================================================================
// Keywords by Locale
// ============================================================================

export const SEO_KEYWORDS = {
  en: {
    primary: 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight',
    longTail: 'shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, Alibaba shipping agent, 1688 sourcing agent',
    service: 'air cargo China Africa, express shipping China Mali, FCL shipping, LCL consolidation, customs clearance Africa',
    location: 'shipping China Bamako, freight forwarder China Mali, China Dakar shipping, China Abidjan freight',
  },
  fr: {
    primary: 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale',
    longTail: 'expédition colis Chine Afrique, fret Chine Mali, agent sourcing Chine, paiement fournisseur chinois',
    service: 'cargo aérien Chine Afrique, express Chine Mali, conteneur complet FCL, groupage maritime LCL, dédouanement Mali',
    location: 'expédition Chine Bamako, transitaire Bamako, fret Chine Dakar, transport Chine Abidjan',
  },
} as const;

/**
 * Build keyword string from categories
 */
export function buildKeywords(
  locale: Locale,
  categories: ('primary' | 'longTail' | 'service' | 'location')[]
): string {
  const keywords = SEO_KEYWORDS[locale === 'en' ? 'en' : 'fr'];
  return categories.map(cat => keywords[cat]).join(', ');
}
