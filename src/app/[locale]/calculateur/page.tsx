/**
 * Calculator Page Route
 * 
 * Interactive freight calculator page with SEO optimization.
 * Targets keywords: shipping calculator, freight rates China Africa
 */

import type { Metadata } from 'next';
import { PAGE_SEO } from '@/config/seo';
import { FAQStructuredData } from '@/components/seo';
import { CalculatorPage } from '@/features/pricing';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = isEn ? PAGE_SEO.calculator.en : PAGE_SEO.calculator.fr;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/calculateur`,
      languages: {
        'en-US': '/en/calculateur',
        'fr-FR': '/fr/calculateur',
        'zh-CN': '/zh/calculateur',
        'ar-SA': '/ar/calculateur',
        'x-default': '/fr/calculateur',
      },
    },
  };
}

const calculatorFaqs = {
  fr: [
    {
      question: 'Comment calculer le prix d’un colis de Chine à Bamako ?',
      answer: 'Renseignez le poids, les dimensions, la catégorie produit et le mode souhaité. Le calculateur estime le fret aérien ou maritime avant confirmation par l’équipe ChinaLink.',
    },
    {
      question: 'Le poids volumétrique est-il utilisé pour le fret aérien ?',
      answer: 'Oui. Pour les colis volumineux, le prix peut être basé sur le poids volumétrique plutôt que le poids réel.',
    },
    {
      question: 'Pourquoi le prix final peut-il changer ?',
      answer: 'Le prix peut varier si le produit est sensible, mal emballé, soumis à contrôle particulier ou si le volume réel diffère des informations déclarées.',
    },
  ],
  en: [
    {
      question: 'How do I calculate the price of a parcel from China to Africa?',
      answer: 'Enter the weight, dimensions, product category and preferred mode. The calculator estimates air or sea freight before the ChinaLink team confirms the final quote.',
    },
    {
      question: 'Is volumetric weight used for air freight?',
      answer: 'Yes. For bulky parcels, pricing may be based on volumetric weight instead of actual weight.',
    },
    {
      question: 'Why can the final price change?',
      answer: 'The final price can change if the product is sensitive, badly packed, requires special handling or if the real volume differs from the declared information.',
    },
  ],
};

export default async function CalculatorRoute({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const faqs = isEn ? calculatorFaqs.en : calculatorFaqs.fr;

  return (
    <>
      <FAQStructuredData faqs={faqs} locale={locale as 'fr' | 'en' | 'zh' | 'ar'} />
      <CalculatorPage />
    </>
  );
}
