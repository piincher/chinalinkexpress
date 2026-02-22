/**
 * Dynamic Sitemap Generation
 * 
 * Generates multilingual sitemap for all supported locales.
 */

import { NextResponse } from 'next/server';
import { i18nConfig, type Locale } from '@/i18n/config';

const baseUrl = 'https://www.chinalinkexpress.com';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: Array<{ lang: string; url: string }>;
}

/**
 * Generate URLs for all locales
 */
function generateLocalizedUrls(
  path: string,
  priority: string,
  changefreq: string
): SitemapUrl[] {
  const lastmod = new Date().toISOString();
  
  return i18nConfig.locales.map((locale) => ({
    loc: `${baseUrl}/${locale}${path}`,
    lastmod,
    changefreq,
    priority,
    alternates: i18nConfig.locales.map((l) => ({
      lang: i18nConfig.seoLocales[l],
      url: `${baseUrl}/${l}${path}`,
    })),
  }));
}

export async function GET() {
  // Static routes
  const staticRoutes: SitemapUrl[] = [
    ...generateLocalizedUrls('/', '1.0', 'daily'),
    ...generateLocalizedUrls('/services', '0.9', 'weekly'),
    ...generateLocalizedUrls('/about', '0.8', 'monthly'),
    ...generateLocalizedUrls('/contact', '0.8', 'monthly'),
    ...generateLocalizedUrls('/faq', '0.7', 'monthly'),
    ...generateLocalizedUrls('/tracking', '0.9', 'daily'),
    ...generateLocalizedUrls('/blog', '0.6', 'weekly'),
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticRoutes
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.alternates
      ?.map(
        (alt) =>
          `<xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`
      )
      .join('\n    ')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/fr/" />
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
