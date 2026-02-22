/**
 * Dynamic Robots.txt
 * 
 * Generates robots.txt with sitemap reference for all locales.
 */

import { NextResponse } from 'next/server';
import { i18nConfig } from '@/i18n/config';

const baseUrl = 'https://www.chinalinkexpress.com';

export async function GET() {
  const robots = `# robots.txt for ChinaLink Express
# Multilingual logistics website

User-agent: *
Allow: /

# Sitemap for all locales
Sitemap: ${baseUrl}/sitemap.xml

# Localized sitemaps (for search engines that support it)
${i18nConfig.locales
  .map(
    (locale) => `# Sitemap for ${i18nConfig.seoLocales[locale]}
# ${baseUrl}/${locale}/sitemap.xml`
  )
  .join('\n')}

# Crawl-delay for polite bots
Crawl-delay: 1

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /login
Disallow: /register

# Allow important assets
Allow: /assets/
Allow: /images/

# Block specific bots (optional)
# User-agent: BadBot
# Disallow: /
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
