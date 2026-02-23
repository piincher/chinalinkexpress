/**
 * Sitemap.xml Route
 * 
 * Dynamic sitemap generation for SEO.
 * Includes all pages with proper hreflang and priority settings.
 */

import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.chinalinkexpress.com';

const locales = ['fr', 'en', 'zh', 'ar'];

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: Record<string, string>;
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const urls = entries.map((entry) => {
    const alternates = entry.alternates
      ? Object.entries(entry.alternates)
          .map(([lang, url]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`)
          .join('\n    ')
      : '';

    return `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
    ${alternates}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [];

  // Home pages
  locales.forEach((locale) => {
    const alternates: Record<string, string> = {};
    locales.forEach((l) => {
      alternates[l === 'fr' ? 'fr-FR' : l === 'en' ? 'en-US' : l === 'zh' ? 'zh-CN' : 'ar-SA'] = `${BASE_URL}/${l}/`;
    });

    entries.push({
      url: `${BASE_URL}/${locale}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates,
    });
  });

  // Service pages
  const services = ['air-freight', 'sea-freight', 'sourcing'];
  services.forEach((service) => {
    locales.forEach((locale) => {
      const alternates: Record<string, string> = {};
      locales.forEach((l) => {
        alternates[l === 'fr' ? 'fr-FR' : l === 'en' ? 'en-US' : l === 'zh' ? 'zh-CN' : 'ar-SA'] = `${BASE_URL}/${l}/services/${service}/`;
      });

      entries.push({
        url: `${BASE_URL}/${locale}/services/${service}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates,
      });
    });
  });

  // Route pages
  const routes = ['china-to-mali', 'china-to-senegal', 'china-to-ivory-coast'];
  routes.forEach((route) => {
    locales.forEach((locale) => {
      const alternates: Record<string, string> = {};
      locales.forEach((l) => {
        alternates[l === 'fr' ? 'fr-FR' : l === 'en' ? 'en-US' : l === 'zh' ? 'zh-CN' : 'ar-SA'] = `${BASE_URL}/${l}/routes/${route}/`;
      });

      entries.push({
        url: `${BASE_URL}/${locale}/routes/${route}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates,
      });
    });
  });

  // Utility pages
  const utilityPages = [
    { path: 'tarifs', priority: 0.8 },
    { path: 'calculateur', priority: 0.8 },
    { path: 'contact', priority: 0.8 },
    { path: 'privacy', priority: 0.5 },
  ];

  utilityPages.forEach((page) => {
    locales.forEach((locale) => {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: page.priority,
      });
    });
  });

  const sitemap = generateSitemapXML(entries);

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
