import { getRequestConfig } from 'next-intl/server';
import { i18nConfig, type Locale } from './config';

/**
 * next-intl request configuration
 * Used for server-side translations
 */
export default getRequestConfig(async ({ locale }) => {
  // Fallback to default locale if invalid
  const validLocale = (locale && i18nConfig.locales.includes(locale as Locale)) 
    ? locale 
    : i18nConfig.defaultLocale;

  // Dynamically import the messages for this locale
  const messages = (await import(`./locales/${validLocale}/common.json`)).default;

  return {
    locale: validLocale,
    messages,
    timeZone: 'Africa/Bamako',
    now: new Date(),
  };
});
