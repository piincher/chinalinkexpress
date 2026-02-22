/**
 * i18n Configuration
 * 
 * Internationalization configuration for ChinaLink Express.
 * Supports French (primary), English, Chinese, and Arabic.
 */

export const i18nConfig = {
  // Supported locales
  locales: ['fr', 'en', 'zh', 'ar'] as const,
  
  // Default locale (French)
  defaultLocale: 'fr' as const,
  
  // Locale prefixes in URLs
  localePrefix: 'always' as const,
  
  // Locale display names
  localeLabels: {
    fr: { label: 'Français', flag: '🇫🇷', dir: 'ltr' as const },
    en: { label: 'English', flag: '🇬🇧', dir: 'ltr' as const },
    zh: { label: '中文', flag: '🇨🇳', dir: 'ltr' as const },
    ar: { label: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
  },
  
  // SEO locale codes for hreflang
  seoLocales: {
    fr: 'fr-FR',
    en: 'en-US',
    zh: 'zh-CN',
    ar: 'ar-SA',
  },
};

export type Locale = (typeof i18nConfig.locales)[number];

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}

/**
 * Get locale direction (LTR or RTL)
 */
export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return i18nConfig.localeLabels[locale].dir;
}

/**
 * Get SEO locale code
 */
export function getSeoLocale(locale: Locale): string {
  return i18nConfig.seoLocales[locale];
}
