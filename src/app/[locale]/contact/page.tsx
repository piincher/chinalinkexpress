/**
 * Contact Page Route
 * 
 * Displays contact form and information with SEO optimization.
 * Targets keywords: contact freight forwarder, shipping quote China Africa
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { StructuredData } from '@/components/seo';
import { ContactPage } from '@/features/contact';
import type { Locale } from '@/i18n/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = PAGE_SEO.contact[locale as Locale];
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'en': '/en/contact',
        'fr': '/fr/contact',
        'zh': '/zh/contact',
        'ar': '/ar/contact',
        'x-default': '/fr/contact',
      },
    },
  };
}

export default function ContactRoute() {
  return (
    <>
      <StructuredData type="localBusiness" />
      <ContactPage />
    </>
  );
}
