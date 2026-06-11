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

const pricingFaqs = {
  fr: [
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
  ],
  en: [
    {
      question: 'What are the freight rates from China to Africa?',
      answer: 'Rates depend on weight, volume, product type, air or sea mode and final destination. The calculator gives an estimate before WhatsApp confirmation.',
    },
    {
      question: 'Is customs coordination included?',
      answer: 'Current rates include standard customs coordination. Sensitive or regulated products may require extra documents, fees or procedures.',
    },
    {
      question: 'Can I pay freight on arrival?',
      answer: 'In many cases, payment is made on arrival after inspection. Some profiles, products or shipment values may require an advance payment.',
    },
  ],
};

export default async function PricingRoute({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const faqs = isEn ? pricingFaqs.en : pricingFaqs.fr;

  return (
    <>
      <FAQStructuredData faqs={faqs} locale={locale as 'fr' | 'en' | 'zh' | 'ar'} />
      <PricingPage />
    </>
  );
}
