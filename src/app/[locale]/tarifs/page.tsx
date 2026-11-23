/**
 * Pricing Page Route
 * 
 * Displays freight rates and pricing information with SEO optimization.
 * Targets keywords: shipping rates China Africa, freight prices
 */

import type { Metadata } from 'next';
import { withoutBrand } from '@/config/seo-advanced';
import { PAGE_SEO } from '@/config/seo';
import { PricingPage } from '@/features/pricing';
import { fetchCompanyStats } from '@/lib/publicStatsApi';
import type { Locale } from '@/i18n/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = PAGE_SEO.pricing[locale as Locale];
  
  return {
    title: withoutBrand(seo.title),
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/tarifs`,
      languages: {
        'en': '/en/tarifs',
        'fr': '/fr/tarifs',
        'zh': '/zh/tarifs',
        'ar': '/ar/tarifs',
        'x-default': '/fr/tarifs',
      },
    },
  };
}

export default async function PricingRoute({ params }: Props) {
  const { locale } = await params;
  const stats = await fetchCompanyStats();

  return (
    <>
      <PricingPage shipmentsHandled={stats.shipmentsHandled} />
    </>
  );
}
