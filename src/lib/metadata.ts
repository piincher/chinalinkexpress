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
      'geo.region': 'ML-BM',
      'geo.placename': 'Bamako',
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
      : 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
    description: isEn
      ? 'Leading freight forwarder from China to Africa. Air freight (14-21 days) & sea freight (60-75 days) to Mali, Senegal, Ivory Coast & more. Get your free quote today!'
      : 'Envoi de cargo et colis de la Chine vers le Mali et l\'Afrique de l\'Ouest. Fret aérien 14-21 jours, maritime 60-75 jours. Devis gratuit par WhatsApp !',
    keywords: isEn
      ? 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight, freight forwarder, China Africa shipping, shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, shipping from China to Senegal, China to Ivory Coast freight, Alibaba shipping agent, 1688 sourcing agent'
      : 'cargo chine mali, transitaire chine mali, fret chine bamako, envoi colis chine mali, fret aerien chine afrique, conteneur chine mali, expedition chine mali, achat alibaba mali, agent sourcing chine, chinalink express, fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale',
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
        ? 'Air Freight China to Mali | Express Shipping'
        : 'Cargo Aérien Chine Mali | Fret Express Bamako | ChinaLink',
      description: isEn
        ? 'Fast air freight from China to Bamako, Mali. Delivery in 14-21 days, sourcing support, supplier payment, consolidation, and WhatsApp tracking.'
        : 'Fret aérien rapide de la Chine vers Bamako, Mali. Livraison en 14-21 jours, sourcing, paiement fournisseur, consolidation et suivi WhatsApp.',
      keywords: isEn
        ? 'air freight China Mali, air cargo China Mali, express shipping China Mali, air freight Bamako, cargo from China to Mali'
        : 'fret aérien Chine Mali, cargo aérien Chine Mali, cargo aerien chine mali, express Chine Mali, fret aérien Bamako, cargo Chine Mali',
      path: '/services/air-freight',
    },
    sea: {
      title: isEn
        ? 'Sea Freight China to Mali | FCL & LCL Shipping'
        : 'Conteneur Chine Mali | Fret Maritime Bamako | FCL & LCL',
      description: isEn
        ? 'Economical sea freight from China to Mali via Lome, Dakar, or Abidjan. FCL and LCL shipping to Bamako in 60-75 days.'
        : 'Fret maritime économique de la Chine vers le Mali via Lomé, Dakar ou Abidjan. Conteneur FCL et groupage LCL vers Bamako en 60-75 jours.',
      keywords: isEn
        ? 'sea freight China Mali, FCL shipping Mali, LCL consolidation Mali, container shipping China Mali, sea freight Bamako'
        : 'fret maritime Chine Mali, conteneur Chine Mali, conteneur chine mali, groupage LCL Mali, transport maritime Chine Mali, fret maritime Chine Bamako',
      path: '/services/sea-freight',
    },
    sourcing: {
      title: isEn
        ? 'China Sourcing Agent for Mali | Alibaba 1688 Procurement'
        : 'Agent Sourcing Chine | Achat Alibaba 1688 | Paiement Fournisseur',
      description: isEn
        ? 'China sourcing agent for Mali importers. We buy from Alibaba, 1688, and Taobao, verify suppliers, inspect goods, process payment, and ship to Bamako.'
        : 'Agent sourcing en Chine pour les importateurs maliens. Achat Alibaba, 1688 et Taobao, vérification fournisseur, inspection qualité, paiement et expédition vers Bamako.',
      keywords: isEn
        ? 'China sourcing agent Mali, Alibaba agent Mali, 1688 sourcing Mali, China procurement services, supplier verification China'
        : 'agent sourcing Chine Mali, agent Alibaba Mali, achat 1688 Mali, approvisionnement Chine Mali, vérification fournisseur Chine, inspection qualité Chine',
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
  route: 'mali'
): Promise<Metadata> {
  const isEn = locale === 'en';
  
  const routeConfig = {
    mali: {
      title: isEn
        ? 'Shipping from China to Mali | Freight Forwarder Bamako'
        : 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
      description: isEn
        ? 'Reliable freight forwarding from China to Mali. Air freight 14-21 days, sea freight 60-75 days, sourcing, supplier payment, and WhatsApp tracking to Bamako.'
        : 'Transitaire spécialisé Chine-Mali. Cargo aérien 14-21 jours, conteneur maritime 60-75 jours. Devis gratuit WhatsApp. 7+ ans d\'expérience.',
      keywords: isEn
        ? 'shipping from China to Mali, freight forwarder China Mali, cargo from China to Mali, China to Bamako shipping, import China Mali'
        : 'cargo chine mali, fret chine mali, envoi colis chine mali, transitaire bamako, fret chine bamako, logistique mali, import chine mali, conteneur chine mali, expedition chine bamako, cargo aerien bamako',
      path: '/routes/china-to-mali',
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
      ? 'Shipping Cost Calculator | Freight Rates China to Mali | ChinaLink Express'
      : 'Calculateur de Frais d\'Expédition | Tarifs Fret Chine-Mali',
    description: isEn
      ? 'Calculate your shipping costs from China to Mali instantly. Air freight & sea freight rates to Bamako via our partner network. Get an accurate estimate in seconds!'
      : 'Calculez vos frais d\'expédition de la Chine vers le Mali instantanément. Tarifs fret aérien et maritime vers Bamako via notre réseau de partenaires. Estimation précise!',
    keywords: isEn
      ? 'shipping calculator, freight rates China Mali, shipping cost estimator, air freight calculator, sea freight calculator, calculateur fret'
      : 'calculateur frais expédition, tarifs fret Chine Mali, estimateur coût transport, calculateur fret aérien, simulateur prix fret',
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
      ? 'Contact ChinaLink Express | Freight Quote | China to Mali Shipping'
      : 'Contact ChinaLink Express | Devis Fret | Expédition Chine-Mali',
    description: isEn
      ? 'Contact ChinaLink Express for a free freight quote. WhatsApp: +86 188 5172 5957. Air & sea shipping from China to Bamako, Mali via trusted partners. 24/7 support!'
      : 'Contactez ChinaLink Express pour un devis fret gratuit. WhatsApp: +86 188 5172 5957. Fret aérien et maritime de la Chine vers Bamako, Mali via des partenaires de confiance. Support 24/7!',
    keywords: isEn
      ? 'contact freight forwarder, shipping quote China Mali, ChinaLink Express contact, freight inquiry, devis expédition'
      : 'contact transitaire, devis fret Chine Mali, ChinaLink Express contact, demande expédition, devis logistique',
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
