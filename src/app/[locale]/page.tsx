/**
 * Localized Home Page
 * 
 * The main landing page with i18n support and comprehensive SEO.
 * Targets primary keywords: freight forwarding, shipping from China, logistics company
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { i18nConfig, type Locale } from '@/i18n/config';
import { PAGE_SEO } from '@/config/seo';
import { LandingPage } from '@/views/landing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.home.en : PAGE_SEO.home.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        'en-US': '/en/',
        'fr-FR': '/fr/',
        'zh-CN': '/zh/',
        'ar-SA': '/ar/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/`,
      type: 'website',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'ChinaLink Express - Freight Forwarding China to Africa' : 'ChinaLink Express - Fret Chine Afrique',
        },
      ],
    },
  };
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
