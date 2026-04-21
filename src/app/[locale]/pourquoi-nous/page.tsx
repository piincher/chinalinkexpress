/**
 * Pourquoi Nous / Why Us Page
 *
 * Full Service vs Simple Transit comparison page.
 * Shows why a full-service import partner is better than a basic freight forwarder.
 */

import type { Metadata } from 'next';
import { generatePageMetadata, generateOrganizationSchema, generateLocalBusinessSchema } from '@/config/seo-advanced';
import type { Locale } from '@/i18n/config';
import { FullServicePage } from '@/features/comparison/FullServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Why Us | Full Service vs Simple Transit | ChinaLink Express'
      : 'Pourquoi Nous | Service Complet vs Simple Transit | ChinaLink Express',
    description: isEn
      ? 'Why choose a full import partner instead of a basic freight forwarder. Discover how ChinaLink Express secures your purchases from China to Africa.'
      : 'Pourquoi choisir un partenaire d\'importation complet plutôt qu\'un simple transitaire. Découvrez comment ChinaLink Express sécurise vos achats en Chine.',
    keywords: isEn
      ? 'freight forwarder china africa, import partner, china sourcing, full service vs basic freight, import china mali, import partner africa'
      : 'transitaire chine afrique, partenaire importation, sourcing chine, fret complet vs simple, importation chine mali, partenaire importation afrique',
    path: '/pourquoi-nous',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function PourquoiNous({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      {
        '@type': 'Service',
        name: isEn ? 'Full Import Partner Service' : 'Service Partenaire Importation Complet',
        description: isEn
          ? 'Complete import solution from China to Africa including sourcing, quality control, payment processing, and shipping.'
          : 'Solution d\'importation complète de la Chine vers l\'Afrique incluant sourcing, contrôle qualité, traitement paiement et expédition.',
        provider: generateOrganizationSchema(),
        serviceType: 'FreightForwardingService',
        areaServed: [
          { '@type': 'Country', name: 'Mali' },
          { '@type': 'Country', name: 'Senegal' },
          { '@type': 'Country', name: 'Ivory Coast' },
          { '@type': 'Country', name: 'Nigeria' },
          { '@type': 'Country', name: 'Ghana' },
          { '@type': 'Country', name: 'Guinea' },
          { '@type': 'Country', name: 'Burkina Faso' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isEn ? 'Import Services' : 'Services d\'Importation',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Supplier Sourcing & Verification' : 'Sourcing & Vérification Fournisseurs',
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
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Shipping & Customs Clearance' : 'Expédition & Dédouanement',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FullServicePage locale={locale} />
    </>
  );
}
