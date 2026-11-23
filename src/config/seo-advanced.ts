/**
 * Advanced SEO Configuration
 * 
 * Enterprise-level SEO with comprehensive structured data,
 * hreflang management, and logistics-specific schema markup.
 * 
 * EXPANDED FOR #1 RANKINGS - Covers 200+ keywords across
 * shipping, sourcing, supplier payment, 
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

// ============================================================================
// Business Information - EXPANDED with China Office
// ============================================================================

export const BUSINESS_INFO = {
  name: 'ChinaLink Express',
  url: 'https://www.chinalinkexpress.com',
  logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
  founded: '2019',

  contact: {
    email: 'contact@chinalinkexpress.com',
    phones: {
      china: '+86 188 5172 5957',
      mali: '+223 76 69 61 77',
      maliAlt: '+223 51 00 50 42',
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
  
  // Real profile URLs only; the four guessed ones were removed (audit 2026-11-20). Add them when confirmed.
  social: [] as string[],
} as const;

// ============================================================================
// Shipping Routes Data - destinations served
// ============================================================================

// Destinations served (owner, 2026-11-15): Mali and Uganda, for importers across West and East Africa.
export const SERVED_COUNTRIES = ['Mali', 'Uganda'].map((name) => ({ '@type': 'Country', name }));


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
    url: BUSINESS_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS_INFO.logo,
      width: 512,
      height: 512,
      caption: `${BUSINESS_INFO.name} Logo`,
    },
    image: BUSINESS_INFO.logo,
    ...(BUSINESS_INFO.social.length ? { sameAs: BUSINESS_INFO.social } : {}),
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
        areaServed: ['CN', 'ML', 'UG'],
        availableLanguage: ['French', 'English', 'Chinese', 'Bambara'],
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.contact.phones.mali,
        contactType: 'technical support',
        areaServed: ['ML', 'UG'],
        availableLanguage: ['French', 'Bambara', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'WhatsApp',
        url: `https://wa.me/${BUSINESS_INFO.contact.whatsapp.china}`,
        areaServed: ['CN', 'ML', 'UG'],
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
    // What the site itself says clients use: cash, Orange Money / Wave, bank transfer; billed in F CFA.
    paymentAccepted: ['Cash', 'Mobile Money', 'Bank Transfer'],
    currenciesAccepted: ['XOF'],
    // Bamako and Kampala are the only destinations served.
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'China' },
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
  serviceType: 'air' | 'sea' | 'sourcing' | 'payment' | 'verification',
  locale: Locale = 'fr'
) {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  const serviceConfig = {
    air: {
      name: isEn ? 'Air Freight China to Africa' : isZh ? '中国—非洲空运' : isAr ? 'الشحن الجوي من الصين إلى أفريقيا' : 'Fret Aérien Chine-Afrique',
      description: isEn 
        ? 'Air freight from China to Bamako (Mali) and Kampala (Uganda), for importers across West and East Africa. Announced transit to Bamako: 14 to 21 days.'
        : isZh ? '从中国空运到巴马科（马里）和坎帕拉（乌干达），服务西非和东非进口商。到巴马科的公布时效：14 到 21 天。' : isAr ? 'شحن جوي من الصين إلى باماكو (مالي) وكمبالا (أوغندا)، للمستوردين في غرب أفريقيا وشرقها. المدة المعلنة إلى باماكو: من 14 إلى 21 يومًا.' : 'Fret aérien de la Chine vers Bamako (Mali) et Kampala (Ouganda), pour les importateurs d’Afrique de l’Ouest et de l’Est. Délai annoncé vers Bamako : 14 à 21 jours.',
      provider: generateOrganizationSchema(),
      serviceType: 'FreightForwardingService',
      areaServed: SERVED_COUNTRIES,
    },
    sea: {
      name: isEn ? 'Sea Freight China to Africa' : isZh ? '中国—非洲海运' : isAr ? 'الشحن البحري من الصين إلى أفريقيا' : 'Fret Maritime Chine-Afrique',
      description: isEn
        ? 'Sea freight from Foshan to the port of Dakar, then by road to Bamako. Groupage billed per CBM, or a full container. Announced transit: 60 to 75 days. Uganda: contact us.'
        : isZh ? '从佛山海运到达喀尔港，再陆运到巴马科。拼箱按 CBM 计费，或整柜。公布时效：60 到 75 天。乌干达：请咨询我们。' : isAr ? 'شحن بحري من فوشان إلى ميناء داكار، ثم برًا إلى باماكو. شحن مجمّع بالـCBM أو حاوية كاملة. المدة المعلنة: من 60 إلى 75 يومًا. أوغندا: تواصل معنا.' : 'Fret maritime de Foshan jusqu’au port de Dakar, puis par la route jusqu’à Bamako. Groupage facturé au CBM, ou conteneur complet. Délai annoncé : 60 à 75 jours. Ouganda : nous consulter.',
      provider: generateOrganizationSchema(),
      serviceType: 'FreightForwardingService',
      areaServed: SERVED_COUNTRIES,
    },
    sourcing: {
      name: isEn ? 'China Sourcing Agent & Procurement' : isZh ? '中国采购与供应代理' : isAr ? 'وكيل التوريد والتموين في الصين' : 'Agent Sourcing & Approvisionnement Chine',
      description: isEn
        ? 'Professional China sourcing agent for African importers. We buy from factories and wholesalers in China. Supplier verification, quality inspection, payment processing, and shipping to Mali and Uganda (West and East Africa).'
        : isZh ? '为非洲进口商服务的中国专业采购代理。向中国工厂和批发商采购。供应商核验、质量检验、付款并发往马里和乌干达（西非和东非）。' : isAr ? 'وكيل توريد محترف في الصين للمستوردين الأفارقة. الشراء من المصانع وتجار الجملة في الصين. التحقق من الموردين وفحص الجودة والدفع والشحن إلى مالي وأوغندا (غرب أفريقيا وشرقها).' : 'Agent sourcing professionnel en Chine pour importateurs africains. Achat auprès d’usines et de grossistes en Chine. Vérification fournisseurs, inspection qualité, paiement et expédition vers le Mali et l’Ouganda (Afrique de l’Ouest et de l’Est).',
      provider: generateOrganizationSchema(),
      serviceType: 'ProfessionalService',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
    },
    payment: {
      name: isEn ? 'Chinese Supplier Payment Service' : isZh ? '中国供应商付款服务' : isAr ? 'خدمة الدفع للموردين الصينيين' : 'Service Paiement Fournisseur Chinois',
      description: isEn
        ? 'Secure payment service for Chinese suppliers. We pay your suppliers in China safely, in yuan, and send you the proof of payment. Protect your money from scams and payment failures.'
        : isZh ? '面向中国供应商的安全付款服务。我们以人民币安全地向您的中国供应商付款，并发送付款凭证。保护您的资金免受诈骗。' : isAr ? 'خدمة دفع آمنة للموردين الصينيين. ندفع لمورديك في الصين بأمان باليوان ونرسل لك إثبات الدفع. احمِ أموالك من الاحتيال.' : 'Service de paiement sécurisé pour fournisseurs chinois. Nous payons vos fournisseurs en Chine en toute sécurité, en yuan, et vous envoyons la preuve de paiement. Protégez votre argent des arnaques.',
      provider: generateOrganizationSchema(),
      serviceType: 'FinancialService',
      areaServed: SERVED_COUNTRIES,
    },
    verification: {
      name: isEn ? 'Chinese Supplier Verification Service' : isZh ? '中国供应商核验服务' : isAr ? 'خدمة التحقق من الموردين الصينيين' : 'Service Vérification Fournisseur Chinois',
      description: isEn
        ? 'Avoid supplier scams. We verify Chinese suppliers on-site: check business licenses, visit factories, inspect production capacity, and validate product quality before you pay. Essential for safe importing from China to Africa.'
        : isZh ? '避免供应商诈骗。我们实地核验中国供应商：执照核查、工厂考察、产能检查，并在付款前确认质量。' : isAr ? 'تجنب احتيال الموردين. نتحقق من الموردين الصينيين ميدانيًا: فحص الرخص وزيارة المصنع وفحص القدرة الإنتاجية والتأكد من الجودة قبل الدفع.' : 'Évitez les arnaques fournisseurs. Nous vérifions les fournisseurs chinois sur place : vérification des licences, visite d\'usine, inspection de la capacité de production et validation de la qualité avant paiement.',
      provider: generateOrganizationSchema(),
      serviceType: 'ProfessionalService',
      areaServed: SERVED_COUNTRIES,
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
 * €5,000 supplier scam. Any caller that omitted the argument published all four
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
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
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
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS_INFO.url}/#service-china-mali`,
    name: isEn
      ? 'China to Mali shipping, sourcing and supplier payment'
      : isZh ? '中国—马里发货、采购和供应商付款' : isAr ? 'الشحن والتوريد والدفع للموردين بين الصين ومالي' : 'Expédition, sourcing et paiement fournisseur Chine–Mali',
    description: isEn
      ? 'Supplier sourcing and purchasing in China, supplier payment, receiving and consolidation at the Guangzhou and Foshan warehouses, air freight in 14–21 days or sea freight in 60–75 days to Bamako, with shipment status updates throughout.'
      : isZh ? '在中国寻找供应商并采购、向供应商付款、在广州和佛山仓库收货和集运，空运 14 到 21 天或海运 60 到 75 天到巴马科，并在每个阶段通知客户。' : isAr ? 'البحث عن موردين والشراء في الصين، والدفع للمورد، والاستلام والتجميع في مستودعي قوانغتشو وفوشان، والشحن الجوي خلال 14 إلى 21 يومًا أو البحري خلال 60 إلى 75 يومًا إلى باماكو، مع إبلاغ العميل في كل مرحلة.' : 'Recherche de fournisseurs et achat en Chine, paiement fournisseur, réception et consolidation aux entrepôts de Guangzhou et Foshan, fret aérien en 14 à 21 jours ou maritime en 60 à 75 jours vers Bamako, avec information du client à chaque étape.',
    serviceType: 'FreightForwardingService',
    provider: { '@id': `${BUSINESS_INFO.url}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Uganda' },
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
 * Page titles without a trailing brand: the [locale] layout template appends
 * " | ChinaLink Express" itself, so titles that ended in "| ChinaLink" showed the
 * brand twice (17 French pages, audit 2026-11-20).
 */
export const withoutBrand = (title: string) =>
  title.replace(/(\s*[|·—-]\s*ChinaLink(\s+Express)?)+\s*$/i, '').trim();

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
  const defaultOgImage = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg';
  title = withoutBrand(title);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangAlternates(path, undefined, supportedLocales),
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
  },
  routes: {
    chinaToMali: '/cargo-chine-mali',
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
    longTail: 'shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, how to import from China to Mali, cheapest shipping from China to Africa, reliable freight forwarder China Africa, shipping agent for small business, door to door shipping China Africa',
    // Service-specific keywords
    service: 'air cargo China Africa, express shipping China Mali, FCL shipping, LCL consolidation, customs clearance Africa, container shipping China Africa, bulk cargo shipping, parcel delivery China Africa, package consolidation China, warehousing China Africa, door to door delivery, multimodal transport',
    // Location keywords
    location: 'shipping China Bamako, freight forwarder China Mali, import China Mali, sourcing Bamako, logistics company Bamako, shipping agent Mali, cargo Mali, freight Mali, import export Mali, shipping to West Africa, China Africa trade route',
    // Sourcing keywords - NEW
    sourcing: 'China sourcing agent, Chinese supplier finder, factory direct sourcing, wholesale from China, import from China, China procurement services, product sourcing China, private label manufacturing China, OEM factory China',
    // Payment keywords - NEW
    payment: 'pay Chinese supplier, supplier payment China, pay factory in China, secure payment China, bank transfer China supplier, payment agent China, safe payment China',
    // Verification keywords - NEW
    verification: 'verify Chinese supplier, check Chinese factory, avoid China scam, legitimate Chinese supplier, factory audit China, supplier background check, China supplier blacklist, reliable supplier China, trusted manufacturer China',
    // Industry keywords - NEW
    industry: 'import textiles from China, import electronics from China, import machinery from China, import cosmetics from China, import auto parts from China, import construction materials from China, wholesale clothing China, wholesale phones China, wholesale machines China',
    // Comparison keywords - NEW
    comparison: 'air freight vs sea freight China Africa, DHL vs freight forwarder China, cheapest shipping method China Africa, shipping by air or sea from China, container vs air cargo cost',
  },
  fr: {
    // Core shipping keywords
    primary: 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale, transport maritime, transport aérien, cargo Chine, société logistique, agent maritime',
    // Long-tail search queries
    longTail: 'expédition colis Chine Afrique, fret Chine Mali, agent sourcing Chine, paiement fournisseur chinois, comment importer de Chine au Mali, fret pas cher Chine Afrique, transitaire fiable Chine Afrique, agent maritime petit commerce, livraison porte à porte Chine Afrique',
    // Service-specific keywords
    service: 'cargo aérien Chine Afrique, express Chine Mali, conteneur complet FCL, groupage maritime LCL, dédouanement Mali, transport conteneur Chine Afrique, fret vrac, livraison colis Chine Afrique, consolidation colis Chine, entrepôt Chine Afrique, livraison porte à porte, transport multimodal',
    // Location keywords
    location: 'expédition Chine Bamako, transitaire Bamako, fret Chine Mali, sourcing Mali, société logistique Bamako, agent maritime Mali, cargo Mali, fret Mali, import export Mali, expédition Afrique de l\'Ouest, route commerciale Chine Afrique',
    // Sourcing keywords - NEW
    sourcing: 'agent sourcing Chine, trouver fournisseur chinois, sourcing direct usine, grossiste Chine, importer de Chine, service approvisionnement Chine, sourcing produits Chine, fabrication marque privée Chine, usine OEM Chine',
    // Payment keywords - NEW
    payment: 'payer fournisseur chinois, paiement fournisseur Chine, payer usine Chine, paiement sécurisé Chine, virement bancaire fournisseur Chine, agent paiement Chine',
    // Verification keywords - NEW
    verification: 'vérifier fournisseur chinois, vérifier usine chinoise, éviter arnaque Chine, fournisseur chinois sérieux, audit usine Chine, vérification antécédents fournisseur, liste noire fournisseurs Chine, fournisseur fiable Chine, fabricant de confiance Chine',
    // Industry keywords - NEW
    industry: 'importer textiles Chine, importer électronique Chine, importer machines Chine, importer cosmétiques Chine, importer pièces auto Chine, importer matériaux construction Chine, gros vêtements Chine, gros téléphones Chine, gros machines Chine',
    // Comparison keywords - NEW
    comparison: 'fret aérien vs maritime Chine Afrique, DHL vs transitaire Chine, moyen expédition pas cher Chine Afrique, expédition air ou mer depuis Chine, conteneur vs cargo aérien coût',
  },
  zh: {
    // Core shipping keywords
    primary: '海运, 空运, 中国发货, 货代, 国际物流, 海上运输, 航空运输, 中国货运, 物流公司, 海运代理',
    // Long-tail search queries
    longTail: '中国非洲寄包裹, 中国马里货运, 中国采购代理, 中国供应商付款, 如何从中国进口到马里, 中国非洲便宜货运, 可靠的中国非洲货代, 小生意海运代理, 中国非洲门到门',
    // Service-specific keywords
    service: '中国非洲空运, 中国马里快递, FCL 整箱, LCL 拼箱, 马里清关, 中国非洲集装箱运输, 散货运输, 中国非洲包裹交付, 中国包裹集运, 中国非洲仓库, 门到门交付, 多式联运',
    // Location keywords
    location: '中国巴马科发货, 巴马科货代, 中国马里货运, 马里采购, 巴马科物流公司, 马里海运代理, 马里货运, 马里运输, 马里进出口, 西非发货, 中国非洲贸易路线',
    // Sourcing keywords - NEW
    sourcing: '中国采购代理, 寻找中国供应商, 工厂直采, 中国批发商, 从中国进口, 中国采购服务, 中国产品采购, 中国贴牌生产, 中国 OEM 工厂',
    // Payment keywords - NEW
    payment: '向中国供应商付款, 中国供应商付款, 向中国工厂付款, 中国安全付款, 中国供应商银行转账, 中国付款代理',
    // Verification keywords - NEW
    verification: '核验中国供应商, 核验中国工厂, 避免中国诈骗, 可靠的中国供应商, 中国工厂审核, 供应商背景调查, 中国供应商黑名单, 中国可靠供应商, 中国值得信赖的制造商',
    // Industry keywords - NEW
    industry: '从中国进口纺织品, 从中国进口电子产品, 从中国进口机器, 从中国进口化妆品, 从中国进口汽配, 从中国进口建材, 中国服装批发, 中国手机批发, 中国机器批发',
    // Comparison keywords - NEW
    comparison: '中国非洲空运与海运, DHL 与中国货代, 中国非洲便宜运输方式, 从中国空运还是海运, 集装箱与空运成本',
  },
  ar: {
    // Core shipping keywords
    primary: 'الشحن البحري، الشحن الجوي، الشحن من الصين، وكيل شحن، الخدمات اللوجستية الدولية، النقل البحري، النقل الجوي، شركة لوجستية، وكيل بحري',
    // Long-tail search queries
    longTail: 'إرسال طرد من الصين إلى أفريقيا، الشحن من الصين إلى مالي، وكيل توريد في الصين، الدفع لمورد صيني، كيفية الاستيراد من الصين إلى مالي، شحن رخيص من الصين إلى أفريقيا، وكيل شحن موثوق من الصين إلى أفريقيا، وكيل بحري للتجارة الصغيرة، التسليم من الباب إلى الباب',
    // Service-specific keywords
    service: 'الشحن الجوي من الصين إلى أفريقيا، الشحن السريع من الصين إلى مالي، حاوية كاملة FCL، شحن مجمّع LCL، التخليص الجمركي في مالي، النقل بالحاويات من الصين إلى أفريقيا، الشحن السائب، تسليم الطرود من الصين إلى أفريقيا، تجميع الطرود في الصين، مستودع بين الصين وأفريقيا، التسليم من الباب إلى الباب، النقل متعدد الوسائط',
    // Location keywords
    location: 'الشحن من الصين إلى باماكو، وكيل شحن في باماكو، الشحن من الصين إلى مالي، التوريد إلى مالي، شركة لوجستية في باماكو، وكيل بحري في مالي، الشحن إلى مالي، الاستيراد والتصدير في مالي، الشحن إلى غرب أفريقيا، طريق التجارة بين الصين وأفريقيا',
    // Sourcing keywords - NEW
    sourcing: 'وكيل توريد في الصين، العثور على مورد صيني، التوريد مباشرة من المصنع، تاجر جملة في الصين، الاستيراد من الصين، خدمة التوريد من الصين، توريد المنتجات من الصين، تصنيع بعلامة خاصة في الصين، مصنع OEM في الصين',
    // Payment keywords - NEW
    payment: 'الدفع لمورد صيني، الدفع للموردين في الصين، الدفع لمصنع في الصين، الدفع الآمن في الصين، الضمان في الصين، تحويل مصرفي لمورد في الصين، وكيل دفع في الصين',
    // Verification keywords - NEW
    verification: 'التحقق من مورد صيني، التحقق من مصنع صيني، تجنب الاحتيال في الصين، مورد صيني جاد، تدقيق المصانع في الصين، فحص خلفية المورد، القائمة السوداء للموردين في الصين، مورد موثوق في الصين، مصنّع موثوق في الصين',
    // Industry keywords - NEW
    industry: 'استيراد المنسوجات من الصين، استيراد الإلكترونيات من الصين، استيراد الآلات من الصين، استيراد مستحضرات التجميل من الصين، استيراد قطع السيارات من الصين، استيراد مواد البناء من الصين، ملابس بالجملة من الصين، هواتف بالجملة من الصين، آلات بالجملة من الصين',
    // Comparison keywords - NEW
    comparison: 'الشحن الجوي مقابل البحري من الصين إلى أفريقيا، DHL مقابل وكيل شحن صيني، أرخص طريقة شحن من الصين إلى أفريقيا، الشحن جوًا أم بحرًا من الصين، كلفة الحاوية مقابل الشحن الجوي',
  },
} as const;

/**
 * Build keyword string from categories
 */
export function buildKeywords(
  locale: Locale,
  categories: ('primary' | 'longTail' | 'service' | 'location' | 'sourcing' | 'payment' | 'verification' | 'industry' | 'comparison')[]
): string {
  const keywords = SEO_KEYWORDS[(locale as Locale)];
  return categories.map(cat => keywords[cat]).join(', ');
}

/**
 * Get all keywords as a single string (for comprehensive pages)
 */
export function getAllKeywords(locale: Locale): string {
  const k = SEO_KEYWORDS[(locale as Locale)];
  return Object.values(k).join(', ');
}
