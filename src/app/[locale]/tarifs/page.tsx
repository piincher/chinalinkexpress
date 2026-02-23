/**
 * Pricing Page Route
 * 
 * Displays freight rates and pricing information with SEO optimization.
 * Targets keywords: shipping rates China Africa, freight prices
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { PricingPage } from '@/features/pricing';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.pricing.en : PAGE_SEO.pricing.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/tarifs/`,
      languages: {
        'en-US': '/en/tarifs/',
        'fr-FR': '/fr/tarifs/',
        'zh-CN': '/zh/tarifs/',
        'ar-SA': '/ar/tarifs/',
      },
    },
  };
}

export default function PricingRoute() {
  return <PricingPage />;
}
