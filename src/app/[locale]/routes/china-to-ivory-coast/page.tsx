/**
 * China to Ivory Coast Shipping Route Page
 * 
 * SEO-optimized page for shipping from China to Ivory Coast.
 * Targets keywords: shipping China Ivory Coast, freight forwarder Abidjan
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
  const seo = isEn ? PAGE_SEO.routes.chinaToIvoryCoast.en : PAGE_SEO.routes.chinaToIvoryCoast.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/routes/china-to-ivory-coast/`,
      languages: {
        'en-US': '/en/routes/china-to-ivory-coast/',
        'fr-FR': '/fr/routes/china-to-ivory-coast/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/routes/china-to-ivory-coast/`,
      type: 'website',
    },
  };
}

export default async function ChinaToIvoryCoast({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Shipping from China to Ivory Coast' : 'Expédition de la Chine vers la Côte d\'Ivoire',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Freight Forwarding',
    areaServed: {
      '@type': 'City',
      name: 'Abidjan',
      containedInPlace: {
        '@type': 'Country',
        name: 'Ivory Coast',
      },
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RoutePage locale={locale} routeKey="china-to-ivory-coast" country="Côte d'Ivoire" capital="Abidjan" />
    </>
  );
}
