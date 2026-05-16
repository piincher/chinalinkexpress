/**
 * Sitemap.xml Route - SEO Optimized
 * 
 * Dynamic sitemap generation with:
 * - All localized URLs
 * - Proper hreflang alternates
 * - Change frequency and priority optimization
 * - Last modified dates
 * 
 * @see https://www.sitemaps.org/protocol.html
 */

import { NextResponse } from 'next/server';
import { i18nConfig, getSeoLocale, type Locale } from '@/i18n/config';

const BASE_URL = 'https://www.chinalinkexpress.com';
const LAST_MODIFIED = '2026-05-17T00:00:00.000Z';

// ============================================================================
// Types
// ============================================================================

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: Record<string, string>;
}

interface PageConfig {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry['changeFrequency'];
  locales?: readonly Locale[];
}

// ============================================================================
// Page Configuration
// ============================================================================

const STATIC_PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: 'services', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'tarifs', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'calculateur', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: 'terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

const SERVICE_PAGES: PageConfig[] = [
  { path: 'services/air-freight', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'services/sea-freight', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'services/sourcing', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'services/paiement-fournisseur-chine', priority: 0.9, changeFrequency: 'weekly' as const, locales: ['fr', 'en'] },
  { path: 'services/verification-fournisseur-chine', priority: 0.9, changeFrequency: 'weekly' as const, locales: ['fr', 'en'] },
  { path: 'services/agent-sourcing-chine', priority: 0.9, changeFrequency: 'weekly' as const, locales: ['fr', 'en'] },
  { path: 'services/achat-alibaba-mali', priority: 0.9, changeFrequency: 'weekly' as const, locales: ['fr', 'en'] },
];

const FR_LANDING_PAGES = [
  { path: 'cargo-chine-mali', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: 'blog', priority: 0.8, changeFrequency: 'weekly' as const },
];

const BLOG_POSTS = [
  { path: 'blog/comment-importer-chine-mali-2026', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'blog/cargo-chine-mali-guide-complet', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'blog/acheter-alibaba-mali-sans-arnaque', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'blog/paiement-fournisseur-chine-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'blog/douane-mali-import-chine', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'blog/conteneur-chine-mali-prix-2026', priority: 0.8, changeFrequency: 'monthly' as const },
];

const ROUTE_PAGES = [
  { path: 'routes/china-to-mali', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-africa', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-senegal', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-cote-divoire', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-nigeria', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-ghana', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-burkina-faso', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-niger', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-benin', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-togo', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-guinea', priority: 0.8, changeFrequency: 'weekly' as const },
];

const GUIDE_PAGES = [
  { path: 'guides/importer-de-chine-au-mali', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: 'guides/acheter-sur-alibaba-depuis-le-mali', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'guides/acheter-sur-1688-depuis-le-mali', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'guides/fret-aerien-vs-maritime-chine-mali', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'guides/douane-mali-import-chine', priority: 0.8, changeFrequency: 'monthly' as const },
];

const MULTILINGUAL_GUIDE_PAGES: PageConfig[] = [
  { path: 'guides/alibaba-vs-1688-pour-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
];

const INDUSTRY_PAGES: PageConfig[] = [
  { path: 'industries/textiles-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
  { path: 'industries/electronique-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
  { path: 'industries/machines-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
  { path: 'industries/cosmetiques-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
  { path: 'industries/pieces-auto-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
  { path: 'industries/materiaux-construction-chine-afrique', priority: 0.85, changeFrequency: 'monthly' as const, locales: ['fr', 'en'] },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate hreflang alternates for a given path
 */
function generateAlternates(path: string, locales: readonly Locale[] = i18nConfig.locales): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  locales.forEach((locale) => {
    const seoLocale = getSeoLocale(locale);
    const url = path 
      ? `${BASE_URL}/${locale}/${path}`
      : `${BASE_URL}/${locale}/`;
    alternates[seoLocale] = url;
  });
  
  // Add x-default
  const defaultLocale = locales.includes('fr') ? 'fr' : locales[0];
  const defaultUrl = path 
    ? `${BASE_URL}/${defaultLocale}/${path}`
    : `${BASE_URL}/${defaultLocale}/`;
  alternates['x-default'] = defaultUrl;
  
  return alternates;
}

/**
 * Generate XML for a single URL entry
 */
function generateUrlXML(entry: SitemapEntry): string {
  const alternatesXML = entry.alternates
    ? Object.entries(entry.alternates)
        .map(([lang, url]) => 
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`
        )
        .join('\n')
    : '';

  return `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
${alternatesXML}
  </url>`;
}

/**
 * Generate the complete sitemap XML
 */
function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map(generateUrlXML).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${urls}
</urlset>`;
}

// ============================================================================
// Route Handler
// ============================================================================

export async function GET() {
  const currentDate = LAST_MODIFIED;
  const entries: SitemapEntry[] = [];

  // Generate entries for static pages
  STATIC_PAGES.forEach((page) => {
    i18nConfig.locales.forEach((locale) => {
      const url = page.path 
        ? `${BASE_URL}/${locale}/${page.path}`
        : `${BASE_URL}/${locale}/`;
      
      entries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
      });
    });
  });

  // Generate entries for service pages
  SERVICE_PAGES.forEach((page) => {
    const locales = page.locales || i18nConfig.locales;
    locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path, locales),
      });
    });
  });

  // Generate entries for route pages
  ROUTE_PAGES.forEach((page) => {
    i18nConfig.locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
      });
    });
  });

  FR_LANDING_PAGES.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/fr/${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        'fr-FR': `${BASE_URL}/fr/${page.path}`,
        'x-default': `${BASE_URL}/fr/${page.path}`,
      },
    });
  });

  BLOG_POSTS.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/fr/${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        'fr-FR': `${BASE_URL}/fr/${page.path}`,
        'x-default': `${BASE_URL}/fr/${page.path}`,
      },
    });
  });

  GUIDE_PAGES.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/fr/${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        'fr-FR': `${BASE_URL}/fr/${page.path}`,
        'x-default': `${BASE_URL}/fr/${page.path}`,
      },
    });
  });

  MULTILINGUAL_GUIDE_PAGES.forEach((page) => {
    const locales = page.locales || i18nConfig.locales;
    locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path, locales),
      });
    });
  });

  INDUSTRY_PAGES.forEach((page) => {
    const locales = page.locales || i18nConfig.locales;
    locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path, locales),
      });
    });
  });

  // Sort entries by priority (highest first)
  entries.sort((a, b) => b.priority - a.priority);

  const sitemap = generateSitemapXML(entries);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex', // Don't index the sitemap itself
    },
  });
}

// ============================================================================
// Config
// ============================================================================

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
