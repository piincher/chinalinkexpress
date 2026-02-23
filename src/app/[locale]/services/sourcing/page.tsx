/**
 * Sourcing & Procurement Service Page
 * 
 * SEO-optimized page for China sourcing services.
 * Targets keywords: China sourcing agent, Alibaba agent, 1688 sourcing
 */

import type { Metadata } from 'next';
import { PAGE_SEO, STRUCTURED_DATA } from '@/config/seo';
import { SourcingPage } from '@/features/services/SourcingPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.services.sourcing.en : PAGE_SEO.services.sourcing.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/services/sourcing/`,
      languages: {
        'en-US': '/en/services/sourcing/',
        'fr-FR': '/fr/services/sourcing/',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://www.chinalinkexpress.com/${locale}/services/sourcing/`,
      type: 'website',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/sourcing-og.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'China Sourcing Agent' : 'Agent Sourcing Chine',
        },
      ],
    },
  };
}

export default async function Sourcing({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'China Sourcing Agent' : 'Agent Sourcing Chine',
    description: isEn
      ? 'Professional sourcing agent in China. We buy from Alibaba, 1688, Taobao on your behalf.'
      : 'Agent sourcing professionnel en Chine. Nous achetons sur Alibaba, 1688, Taobao pour vous.',
    provider: STRUCTURED_DATA.organization,
    serviceType: 'Procurement Service',
    areaServed: {
      '@type': 'Country',
      name: 'China',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sourcing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Supplier Verification' : 'Vérification Fournisseur',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Quality Inspection' : 'Inspection Qualité',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEn ? 'Payment Processing' : 'Traitement Paiement',
          },
        },
      ],
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <SourcingPage locale={locale} />
    </>
  );
}
