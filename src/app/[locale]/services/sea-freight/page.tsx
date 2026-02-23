/**
 * Sea Freight Service Page
 * 
 * SEO-optimized page for sea freight services from China to Africa.
 * Targets keywords: sea freight China Africa, FCL shipping, LCL consolidation
 */

import type { Metadata } from 'next';
import { PAGE_SEO, STRUCTURED_DATA } from '@/config/seo';
import { SeaFreightPage } from '@/features/services/SeaFreightPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.services.seaFreight.en : PAGE_SEO.services.seaFreight.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/services/sea-freight/`,
      languages: {
        'en-US': '/en/services/sea-freight/',
        'fr-FR': '/fr/services/sea-freight/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/services/sea-freight/`,
      type: 'website',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/sea-freight-og.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'Sea Freight China to Africa' : 'Fret Maritime Chine Afrique',
        },
      ],
    },
  };
}

export default async function SeaFreight({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Sea Freight China to Africa' : 'Fret Maritime Chine Afrique',
    description: isEn
      ? 'Economical sea freight from China to Africa. FCL and LCL shipping options.'
      : 'Fret maritime économique de la Chine vers l\'Afrique. Options FCL et LCL.',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Sea Freight',
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
      '@type': 'AggregateOffer',
      description: isEn
        ? 'FCL full container load and LCL less than container load options'
        : 'Options conteneur complet FCL et groupage LCL',
      priceCurrency: 'USD',
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <SeaFreightPage locale={locale} />
    </>
  );
}
