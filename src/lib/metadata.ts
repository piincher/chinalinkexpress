/**
 * Metadata Utilities
 * 
 * Helper functions for generating consistent, SEO-optimized metadata
 * across all pages with proper hreflang and OpenGraph support.
 */

import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import { Locale, i18nConfig, getSeoLocale } from '@/i18n/config';
import { BUSINESS_INFO, generatePageMetadata } from '@/config/seo-advanced';

// ============================================================================
// Default Metadata Templates
// ============================================================================

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
};

/**
 * Base metadata that applies to all pages
 */
export function getBaseMetadata(locale: Locale): Metadata {
  const seoLocale = getSeoLocale(locale);
  
  return {
    applicationName: BUSINESS_INFO.name,
    authors: [{ name: BUSINESS_INFO.name, url: BUSINESS_INFO.url }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    generator: 'Next.js 15',
    referrer: 'origin-when-cross-origin',
    metadataBase: new URL(BUSINESS_INFO.url),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    category: 'logistics',
    classification: 'Business & Industrial > Shipping & Logistics',
    other: {
      // Geographic targeting
      'geo.region': 'ML-BM, SN-DK, CI-AB',
      'geo.placename': 'Bamako, Dakar, Abidjan',
      'geo.position': '12.6392;-8.0029',
      'ICBM': '12.6392, -8.0029',
      // Business info
      'business:contact_data:street_address': BUSINESS_INFO.address.streetAddress,
      'business:contact_data:locality': BUSINESS_INFO.address.addressLocality,
      'business:contact_data:country_name': BUSINESS_INFO.address.addressCountry,
      'business:contact_data:phone_number': BUSINESS_INFO.contact.phones.mali,
      'place:location:latitude': '12.6392',
      'place:location:longitude': '-8.0029',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@chinalinkexpress',
      site: '@chinalinkexpress',
    },
    appleWebApp: {
      capable: true,
      title: BUSINESS_INFO.name,
      statusBarStyle: 'default',
    },
    icons: {
      icon: [
        { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: '/icons/icon-32x32.png',
      apple: [
        { url: '/icons/icon-72x72.png', sizes: '72x72' },
        { url: '/icons/icon-114x114.png', sizes: '114x114' },
        { url: '/icons/icon-144x144.png', sizes: '144x144' },
        { url: '/icons/icon-152x152.png', sizes: '152x152' },
        { url: '/icons/icon-180x180.png', sizes: '180x180' },
        { url: '/icons/icon-192x192.png', sizes: '192x192' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/icons/safari-pinned-tab.svg',
          color: '#2563eb',
        },
      ],
    },
    manifest: '/manifest.json',
  };
}

// ============================================================================
// Page Metadata Generators
// ============================================================================

interface PageMetadataParams {
  locale: Locale;
  pageName: string;
  path: string;
  customTitle?: string;
  customDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Generate metadata for any page with translations
 */
export async function generateLocalizedMetadata({
  locale,
  pageName,
  path,
  customTitle,
  customDescription,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: PageMetadataParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const title = customTitle || t(`${pageName}.title`);
  const description = customDescription || t(`${pageName}.description`);
  const keywords = t(`${pageName}.keywords`);
  
  return generatePageMetadata({
    title,
    description,
    keywords,
    path,
    locale,
    ogImage,
    ogType,
    noIndex,
  });
}

/**
 * Home page metadata
 */
export async function generateHomeMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  
  return generatePageMetadata({
    title: isEn 
      ? 'ChinaLink Express | Freight Forwarding China to Africa | Air & Sea Shipping'
      : 'ChinaLink Express | Fret Maritime & Aérien Chine-Afrique | Transitaire',
    description: isEn
      ? 'Leading freight forwarder from China to Africa. Air freight (14-21 days) & sea freight (60-75 days) to Mali, Senegal, Ivory Coast & more. Get your free quote today!'
      : 'Transitaire de référence de la Chine vers l\'Afrique. Fret aérien (14-21 jours) & maritime (60-75 jours) vers le Mali, Sénégal, Côte d\'Ivoire, Nigeria. Devis gratuit!',
    keywords: isEn
      ? 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight, freight forwarder, China Africa shipping, shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, shipping from China to Senegal, China to Ivory Coast freight, Alibaba shipping agent, 1688 sourcing agent'
      : 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale, transport international, commissionnaire transport, fret Chine Afrique, expédition colis Chine Afrique, fret Chine Mali, envoi marchandises Chine Sénégal, transport maritime Chine Côte d\'Ivoire, achat fournisseur Chine, agent sourcing Chine',
    path: '/',
    locale,
    ogType: 'website',
  });
}

/**
 * Service page metadata
 */
export async function generateServiceMetadata(
  locale: Locale,
  service: 'air' | 'sea' | 'sourcing'
): Promise<Metadata> {
  const isEn = locale === 'en';
  
  const serviceConfig = {
    air: {
      title: isEn 
        ? 'Air Freight China to Africa | Express Shipping | ChinaLink Express'
        : 'Fret Aérien Chine Afrique | Expédition Express | ChinaLink Express',
      description: isEn
        ? 'Fast air freight from China to Mali, Senegal, Ivory Coast & West Africa. Delivery in 14-21 days. Real-time tracking. Get a quote for your air cargo!'
        : 'Fret aérien rapide de la Chine vers le Mali, Sénégal, Côte d\'Ivoire & Afrique de l\'Ouest. Livraison en 14-21 jours. Suivi en temps réel. Demandez votre devis!',
      keywords: isEn
        ? 'air freight China Africa, air cargo, express shipping China Mali, air freight Bamako, air freight Dakar, China air shipping, cargo aérien, avion fret Chine'
        : 'fret aérien Chine Afrique, cargo aérien, express Chine Mali, fret aérien Bamako, fret aérien Dakar, transport aérien Chine',
      path: '/services/air-freight',
    },
    sea: {
      title: isEn
        ? 'Sea Freight China to Africa | FCL & LCL Shipping | ChinaLink Express'
        : 'Fret Maritime Chine Afrique | Conteneur FCL & Groupage LCL',
      description: isEn
        ? 'Economical sea freight from China to Africa. FCL container shipping & LCL consolidation. Delivery in 60-75 days. Best rates for bulk goods. Get a quote!'
        : 'Fret maritime économique de la Chine vers l\'Afrique. Conteneurs complets FCL & groupage LCL. Livraison en 60-75 jours. Meilleurs tarifs pour gros volumes. Devis gratuit!',
      keywords: isEn
        ? 'sea freight China Africa, FCL shipping, LCL consolidation, container shipping, maritime freight China Mali, sea freight Bamako, bateau fret Chine'
        : 'fret maritime Chine Afrique, conteneur FCL, groupage LCL, transport maritime, fret maritime Chine Mali, conteneur Chine Afrique',
      path: '/services/sea-freight',
    },
    sourcing: {
      title: isEn
        ? 'China Sourcing Agent | Alibaba 1688 Procurement | ChinaLink Express'
        : 'Agent Sourcing Chine | Achat Alibaba 1688 | ChinaLink Express',
      description: isEn
        ? 'Professional sourcing agent in China. We buy from Alibaba, 1688, Taobao on your behalf. Supplier verification, quality inspection, payment processing. Start sourcing today!'
        : 'Agent sourcing professionnel en Chine. Nous achetons sur Alibaba, 1688, Taobao pour vous. Vérification fournisseurs, inspection qualité, paiement. Commencez vos achats!',
      keywords: isEn
        ? 'China sourcing agent, Alibaba agent, 1688 sourcing, procurement China, supplier verification, quality inspection China, agent achat Chine'
        : 'agent sourcing Chine, agent Alibaba, achat 1688, approvisionnement Chine, vérification fournisseur, inspection qualité Chine, achat en ligne Chine',
      path: '/services/sourcing',
    },
  };
  
  const config = serviceConfig[service];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
    ogType: 'article',
  });
}

/**
 * Route page metadata
 */
export async function generateRouteMetadata(
  locale: Locale,
  route: 'mali' | 'senegal' | 'ivory-coast'
): Promise<Metadata> {
  const isEn = locale === 'en';
  
  const routeConfig = {
    mali: {
      title: isEn
        ? 'Shipping from China to Mali | Freight Forwarder Bamako | ChinaLink Express'
        : 'Expédition Chine vers Mali | Transitaire Bamako | ChinaLink Express',
      description: isEn
        ? 'Reliable freight forwarding from China to Mali. Air & sea shipping to Bamako. Door-to-door delivery. 7+ years experience. Get your free quote now!'
        : 'Transitaire fiable de la Chine vers le Mali. Fret aérien et maritime vers Bamako. Livraison porte à porte. 7+ ans d\'expérience. Devis gratuit!',
      keywords: isEn
        ? 'shipping China Mali, freight forwarder Bamako, China to Bamako shipping, Mali logistics, import China Mali, fret Bamako Chine'
        : 'expédition Chine Mali, transitaire Bamako, fret Chine Bamako, logistique Mali, import Chine Mali, envoi colis Bamako',
      path: '/routes/china-to-mali',
    },
    senegal: {
      title: isEn
        ? 'Shipping from China to Senegal | Freight Forwarder Dakar | ChinaLink Express'
        : 'Expédition Chine vers Sénégal | Transitaire Dakar | ChinaLink Express',
      description: isEn
        ? 'Freight forwarding from China to Senegal. Air & sea shipping to Dakar. Competitive rates, reliable service. Get your quote today!'
        : 'Transitaire de la Chine vers le Sénégal. Fret aérien et maritime vers Dakar. Tarifs compétitifs, service fiable. Demandez votre devis!',
      keywords: isEn
        ? 'shipping China Senegal, freight forwarder Dakar, China to Dakar shipping, Senegal logistics, import China Senegal, fret Dakar Chine'
        : 'expédition Chine Sénégal, transitaire Dakar, fret Chine Dakar, logistique Sénégal, import Chine Sénégal, envoi colis Dakar',
      path: '/routes/china-to-senegal',
    },
    'ivory-coast': {
      title: isEn
        ? 'Shipping from China to Ivory Coast | Freight Forwarder Abidjan | ChinaLink Express'
        : 'Expédition Chine vers Côte d\'Ivoire | Transitaire Abidjan | ChinaLink Express',
      description: isEn
        ? 'Freight forwarding from China to Ivory Coast. Air & sea shipping to Abidjan. Professional logistics services. Get your free quote!'
        : 'Transitaire de la Chine vers la Côte d\'Ivoire. Fret aérien et maritime vers Abidjan. Services logistiques professionnels. Devis gratuit!',
      keywords: isEn
        ? 'shipping China Ivory Coast, freight forwarder Abidjan, China to Abidjan shipping, Cote d\'Ivoire logistics, import China Ivory Coast'
        : 'expédition Chine Côte d\'Ivoire, transitaire Abidjan, fret Chine Abidjan, logistique Côte d\'Ivoire, import Chine Côte d\'Ivoire',
      path: '/routes/china-to-ivory-coast',
    },
  };
  
  const config = routeConfig[route];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
  });
}

/**
 * Calculator page metadata
 */
export async function generateCalculatorMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  
  return generatePageMetadata({
    title: isEn
      ? 'Shipping Cost Calculator | Freight Rates China to Africa | ChinaLink Express'
      : 'Calculateur de Frais d\'Expédition | Tarifs Fret Chine-Afrique',
    description: isEn
      ? 'Calculate your shipping costs from China to Africa instantly. Air freight & sea freight rates to Mali, Senegal, Ivory Coast. Get an accurate estimate in seconds!'
      : 'Calculez vos frais d\'expédition de la Chine vers l\'Afrique instantanément. Tarifs fret aérien et maritime vers Mali, Sénégal, Côte d\'Ivoire. Estimation précise!',
    keywords: isEn
      ? 'shipping calculator, freight rates China Africa, shipping cost estimator, air freight calculator, sea freight calculator, calculateur fret'
      : 'calculateur frais expédition, tarifs fret Chine Afrique, estimateur coût transport, calculateur fret aérien, simulateur prix fret',
    path: '/calculateur',
    locale,
  });
}

/**
 * Contact page metadata
 */
export async function generateContactMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  
  return generatePageMetadata({
    title: isEn
      ? 'Contact ChinaLink Express | Freight Quote | China to Africa Shipping'
      : 'Contact ChinaLink Express | Devis Fret | Expédition Chine-Afrique',
    description: isEn
      ? 'Contact ChinaLink Express for a free freight quote. WhatsApp: +86 188 5172 5957. Air & sea shipping from China to Mali, Senegal & West Africa. 24/7 support!'
      : 'Contactez ChinaLink Express pour un devis fret gratuit. WhatsApp: +86 188 5172 5957. Fret aérien et maritime de la Chine vers le Mali, Sénégal & Afrique. Support 24/7!',
    keywords: isEn
      ? 'contact freight forwarder, shipping quote China Africa, ChinaLink Express contact, freight inquiry, devis expédition'
      : 'contact transitaire, devis fret Chine Afrique, ChinaLink Express contact, demande expédition, devis logistique',
    path: '/contact',
    locale,
  });
}

// ============================================================================
// JSON-LD Structured Data Helpers
// ============================================================================

/**
 * Safely serialize structured data to JSON-LD
 */
export function serializeStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

/**
 * Generate combined structured data for a page
 */
export function generatePageStructuredData(
  schemas: Record<string, unknown>[],
  options: { pretty?: boolean } = {}
): string {
  const { pretty = false } = options;
  
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0], null, pretty ? 2 : 0);
  }
  
  // Multiple schemas as @graph
  const graphData = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
  
  return JSON.stringify(graphData, null, pretty ? 2 : 0);
}
