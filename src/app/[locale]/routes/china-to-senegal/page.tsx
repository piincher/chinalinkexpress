/**
 * China to Senegal Shipping Route Page
 * 
 * SEO-optimized page for shipping from China to Senegal.
 * Targets keywords: shipping China Senegal, freight forwarder Dakar
 */

import type { Metadata } from 'next';
import { PAGE_SEO, STRUCTURED_DATA } from '@/config/seo';
import { RoutePage } from '@/features/routes/RoutePage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.routes.chinaToSenegal.en : PAGE_SEO.routes.chinaToSenegal.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/routes/china-to-senegal/`,
      languages: {
        'en-US': '/en/routes/china-to-senegal/',
        'fr-FR': '/fr/routes/china-to-senegal/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/routes/china-to-senegal/`,
      type: 'website',
    },
  };
}

export default async function ChinaToSenegal({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Shipping from China to Senegal' : 'Expédition de la Chine vers le Sénégal',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Freight Forwarding',
    areaServed: {
      '@type': 'City',
      name: 'Dakar',
      containedInPlace: {
        '@type': 'Country',
        name: 'Senegal',
      },
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RoutePage locale={locale} routeKey="china-to-senegal" country="Sénégal" capital="Dakar" />
    </>
  );
}
