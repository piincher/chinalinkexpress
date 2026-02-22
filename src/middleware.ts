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
});

export const config = {
  // Match all paths except api, _next, static files
  matcher: [
    '/',
    '/(fr|en|zh|ar)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
