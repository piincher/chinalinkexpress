/**
 * Localized Home Page
 * 
 * The main landing page with i18n support.
 */

import { setRequestLocale } from 'next-intl/server';
import { i18nConfig, type Locale } from '@/i18n/config';
import { LandingPage } from '@/views/landing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  
  // Validate locale
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;

  // Set locale for static generation
  setRequestLocale(validLocale);

  return <LandingPage locale={validLocale as Locale} />;
}
