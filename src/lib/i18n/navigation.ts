/**
 * i18n Navigation Utilities
 * 
 * Helper functions for generating localized paths and URLs.
 * Uses next-intl v4 API.
 */

import { createNavigation } from 'next-intl/navigation';
import { i18nConfig } from '@/i18n/config';

// Create navigation utilities - v4 API (no parameters needed)
// Configuration is automatically read from middleware
export const { Link, redirect, usePathname, useRouter } = createNavigation();

/**
 * Generate hreflang links for SEO
 */
export function generateHreflangLinks(
  pathname: string,
  baseUrl: string = 'https://www.chinalinkexpress.com'
): Array<{ locale: string; url: string }> {
  return i18nConfig.locales.map((locale) => ({
    locale: i18nConfig.seoLocales[locale],
    url: `${baseUrl}/${locale}${pathname}`,
  }));
}

/**
 * Localized path helpers
 * Returns the path with locale prefix
 */
export function getLocalizedPath(path: string, locale: string): string {
  return `/${locale}${path}`;
}
