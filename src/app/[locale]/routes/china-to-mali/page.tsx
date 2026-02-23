/**
 * China to Mali Shipping Route Page
 * 
 * SEO-optimized page for shipping from China to Mali.
 * Targets keywords: shipping China Mali, freight forwarder Bamako
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
  const seo = isEn ? PAGE_SEO.routes.chinaToMali.en : PAGE_SEO.routes.chinaToMali.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/routes/china-to-mali/`,
      languages: {
        'en-US': '/en/routes/china-to-mali/',
        'fr-FR': '/fr/routes/china-to-mali/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/routes/china-to-mali/`,
      type: 'website',
    },
  };
}

export default async function ChinaToMali({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const routeData = {
    origin: { country: 'China', city: 'Guangzhou', code: 'CN' },
    destination: { country: 'Mali', city: 'Bamako', code: 'ML' },
    airFreight: {
      duration: '14-21 days',
      routes: [
        { via: 'Ethiopian Airlines', path: 'Guangzhou → Addis Ababa → Bamako' },
        { via: 'Turkish Airlines', path: 'Guangzhou → Istanbul → Bamako' },
      ],
    },
    seaFreight: {
      duration: '60-75 days',
      routes: [
        { via: 'MSC', path: 'Shanghai → Lagos → Bamako (inland)' },
        { via: 'CMA CGM', path: 'Shenzhen → Dakar → Bamako (inland)' },
      ],
    },
  };
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Shipping from China to Mali' : 'Expédition de la Chine vers le Mali',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Freight Forwarding',
    areaServed: {
      '@type': 'City',
      name: 'Bamako',
      containedInPlace: {
        '@type': 'Country',
        name: 'Mali',
      },
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RoutePage locale={locale} route={routeData} routeKey="china-to-mali" />
    </>
  );
}
