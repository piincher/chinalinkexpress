/**
 * Contact Page Route
 * 
 * Displays contact form and information with SEO optimization.
 * Targets keywords: contact freight forwarder, shipping quote China Africa
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { ContactPage } from '@/features/contact';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.contact.en : PAGE_SEO.contact.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/contact/`,
      languages: {
        'en-US': '/en/contact/',
        'fr-FR': '/fr/contact/',
      },
    },
  };
}

export default function ContactRoute() {
  return <ContactPage />;
}
