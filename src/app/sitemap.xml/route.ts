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
import { i18nConfig, getSeoLocale } from '@/i18n/config';

const BASE_URL = 'https://www.chinalinkexpress.com';

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

// ============================================================================
// Page Configuration
// ============================================================================

const STATIC_PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: 'tarifs', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'calculateur', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: 'contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: 'terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

const SERVICE_PAGES = [
  { path: 'services/air-freight', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'services/sea-freight', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'services/sourcing', priority: 0.9, changeFrequency: 'weekly' as const },
];

const ROUTE_PAGES = [
  { path: 'routes/china-to-mali', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-senegal', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: 'routes/china-to-ivory-coast', priority: 0.9, changeFrequency: 'weekly' as const },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate hreflang alternates for a given path
 */
function generateAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  i18nConfig.locales.forEach((locale) => {
    const seoLocale = getSeoLocale(locale);
    const url = path 
      ? `${BASE_URL}/${locale}/${path}/`
      : `${BASE_URL}/${locale}/`;
    alternates[seoLocale] = url;
  });
  
  // Add x-default
  const defaultUrl = path 
    ? `${BASE_URL}/fr/${path}/`
    : `${BASE_URL}/fr/`;
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
  const currentDate = new Date().toISOString();
  const entries: SitemapEntry[] = [];

  // Generate entries for static pages
  STATIC_PAGES.forEach((page) => {
    i18nConfig.locales.forEach((locale) => {
      const url = page.path 
        ? `${BASE_URL}/${locale}/${page.path}/`
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
    i18nConfig.locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}/`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
      });
    });
  });

  // Generate entries for route pages
  ROUTE_PAGES.forEach((page) => {
    i18nConfig.locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}/`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: generateAlternates(page.path),
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
