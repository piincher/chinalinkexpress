/**
 * Calculator Page Route
 * 
 * Interactive freight calculator page with SEO optimization.
 * Targets keywords: shipping calculator, freight rates China Africa
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { CalculatorPage } from '@/features/pricing';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.calculator.en : PAGE_SEO.calculator.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/calculateur/`,
      languages: {
        'en-US': '/en/calculateur/',
        'fr-FR': '/fr/calculateur/',
      },
    },
  };
}

export default function CalculatorRoute() {
  return <CalculatorPage />;
}
