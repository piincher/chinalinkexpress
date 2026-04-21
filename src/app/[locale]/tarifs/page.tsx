/**
 * Pricing Page Route
 * 
 * Displays freight rates and pricing information with SEO optimization.
 * Targets keywords: shipping rates China Africa, freight prices
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { FAQStructuredData } from '@/components/seo';
import { PricingPage } from '@/features/pricing';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.pricing.en : PAGE_SEO.pricing.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/tarifs`,
      languages: {
        'en-US': '/en/tarifs',
        'fr-FR': '/fr/tarifs',
        'zh-CN': '/zh/tarifs',
        'ar-SA': '/ar/tarifs',
        'x-default': '/fr/tarifs',
      },
    },
  };
}

const pricingFaqs = [
  {
    question: 'Quels sont les tarifs de fret Chine-Mali ?',
    answer: 'Les tarifs dépendent du poids, du volume, du type de produit, du mode aérien ou maritime et de la destination finale à Bamako. Le calculateur donne une estimation avant validation sur WhatsApp.',
  },
  {
    question: 'Le dédouanement est-il inclus ?',
    answer: 'Les tarifs courants incluent l’accompagnement de dédouanement standard. Les produits sensibles ou réglementés peuvent nécessiter des frais ou documents supplémentaires.',
  },
  {
    question: 'Puis-je payer le fret à l’arrivée ?',
    answer: 'Dans de nombreux cas, le paiement se fait à l’arrivée après inspection. Certains profils, produits ou montants peuvent demander une avance.',
  },
];

export default async function PricingRoute({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <FAQStructuredData faqs={pricingFaqs} locale={locale as 'fr' | 'en' | 'zh' | 'ar'} />
      <PricingPage />
    </>
  );
}
