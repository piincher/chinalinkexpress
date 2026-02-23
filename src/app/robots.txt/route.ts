/**
 * Robots.txt Route
 * 
 * Dynamic robots.txt generation for SEO.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.chinalinkexpress.com/sitemap.xml

# Crawl rate
Crawl-delay: 1

# Disallow patterns
Disallow: /api/
Disallow: /_next/
Disallow: /*.json$
Disallow: /*.xml$

# Allow important pages
Allow: /fr/
Allow: /en/
Allow: /zh/
Allow: /ar/
Allow: /fr/services/
Allow: /en/services/
Allow: /fr/routes/
Allow: /en/routes/
Allow: /fr/tarifs
Allow: /en/tarifs
Allow: /fr/calculateur
Allow: /en/calculator
Allow: /fr/contact
Allow: /en/contact
Allow: /fr/faq
Allow: /en/faq

# Search engine specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 1
`.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
