/**
 * Air Freight Service Page
 * 
 * SEO-optimized page for air freight services from China to Africa.
 * Targets keywords: air freight China Africa, air cargo, express shipping
 */

import type { Metadata } from 'next';
import { PAGE_SEO, STRUCTURED_DATA } from '@/config/seo';
import { AirFreightPage } from '@/features/services/AirFreightPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.services.airFreight.en : PAGE_SEO.services.airFreight.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/services/air-freight/`,
      languages: {
        'en-US': '/en/services/air-freight/',
        'fr-FR': '/fr/services/air-freight/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/services/air-freight/`,
      type: 'website',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/air-freight-og.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'Air Freight China to Africa' : 'Fret Aérien Chine Afrique',
        },
      ],
    },
  };
}

export default async function AirFreight({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Air Freight China to Africa' : 'Fret Aérien Chine Afrique',
    description: isEn 
      ? 'Fast air freight from China to Mali, Senegal, Ivory Coast & West Africa. Delivery in 14-21 days.'
      : 'Fret aérien rapide de la Chine vers le Mali, Sénégal, Côte d\'Ivoire & Afrique de l\'Ouest. Livraison en 14-21 jours.',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Air Freight',
    areaServed: [
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Senegal' },
      { '@type': 'Country', name: 'Ivory Coast' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Guinea' },
      { '@type': 'Country', name: 'Burkina Faso' },
      { '@type': 'Country', name: 'Benin' },
      { '@type': 'Country', name: 'Togo' },
    ],
    offers: {
      '@type': 'Offer',
      description: isEn 
        ? 'Air freight delivery in 14-21 business days'
        : 'Livraison fret aérien en 14-21 jours ouvrables',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <AirFreightPage locale={locale} />
    </>
  );
}
