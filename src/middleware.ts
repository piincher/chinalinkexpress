/**
 * Next.js Middleware
 * 
 * Handles internationalization routing, locale detection, and redirects.
 * Uses next-intl for locale management.
 */

import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n/config';

export default createMiddleware({
  // Supported locales
  locales: i18nConfig.locales,

  // Default locale
  defaultLocale: i18nConfig.defaultLocale,

  // Always show locale in URL
  localePrefix: i18nConfig.localePrefix,

  // Redirect / to /fr/
  localeDetection: true,

  /*
   * Do not emit the `Link: rel="alternate" hreflang=...` response header.
   *
   * next-intl builds that header itself, and it declared x-default as
   * `https://www.chinalinkexpress.com/` — with the trailing slash. `/` answers
   * 307 (locale detection) and `/fr/` answers 308 (trailingSlash: false), so
   * the header pointed x-default at a redirect while the HTML <head> pointed it
   * at `/fr`. Google discards an hreflang that resolves to a redirect and then
   * picks its own canonical, which is the "Duplicate, Google chose different
   * canonical" report this site has already been through once.
   *
   * The <head> alternates are complete, per-page, and built through
   * `localePath()` in config/seo-advanced.ts, which strips trailing slashes by
   * construction. One source, verified live with:
   *   curl -sI https://www.chinalinkexpress.com/fr | grep -i '^link:'
   */
  alternateLinks: false,
});

export const config = {
  // Match all paths except api, _next, static files, and share links.
  //
  // `s/` and `r/` are locale-free on purpose: both are pasted verbatim into
  // WhatsApp and printed into QR codes / app-link associations. Letting the
  // locale middleware redirect /r/CODE to /fr/r/CODE would change a link that
  // has already been shared, and break the universal-link path match that opens
  // the app.
  matcher: [
    '/',
    '/(fr|en|zh|ar)/:path*',
    '/((?!api|_next|_vercel|s/|r/|.*\\..*).*)',
  ],
};
