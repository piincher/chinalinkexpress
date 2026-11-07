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
import { fetchPublicReviews } from '@/lib/publicReviewsApi';
import type { Locale } from '@/i18n/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = PAGE_SEO.calculator[locale as Locale];
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/calculateur`,
      languages: {
        'en': '/en/calculateur',
        'fr': '/fr/calculateur',
        'zh': '/zh/calculateur',
        'ar': '/ar/calculateur',
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
  zh: [
    {
      question: '如何计算从中国到巴马科的包裹价格？',
      answer: '填写重量、尺寸、产品类别和运输方式。计算器会先估算空运或海运费用，再由 ChinaLink 团队确认。',
    },
    {
      question: '空运是否使用体积重量？',
      answer: '是的。对于体积较大的包裹，价格可能按体积重量而不是实际重量计算。',
    },
    {
      question: '为什么最终价格可能变化？',
      answer: '如果产品属于敏感货物、包装不当、需要特殊检查，或实际体积与申报信息不符，价格可能会变化。',
    },
  ],
  ar: [
    {
      question: 'كيف أحسب سعر طرد من الصين إلى باماكو؟',
      answer: 'أدخل الوزن والأبعاد وفئة المنتج وطريقة الشحن. تقدّر الحاسبة كلفة الشحن الجوي أو البحري قبل أن يؤكدها فريق ChinaLink.',
    },
    {
      question: 'هل يُستخدم الوزن الحجمي في الشحن الجوي؟',
      answer: 'نعم. بالنسبة إلى الطرود كبيرة الحجم، قد يُحسب السعر على أساس الوزن الحجمي بدلًا من الوزن الفعلي.',
    },
    {
      question: 'لماذا قد يتغير السعر النهائي؟',
      answer: 'قد يتغير السعر إذا كان المنتج حساسًا أو سيئ التغليف أو خاضعًا لفحص خاص، أو إذا اختلف الحجم الفعلي عن البيانات المصرّح بها.',
    },
  ],
};

export default async function CalculatorRoute({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const faqs = calculatorFaqs[locale as Locale];
  // Fetched here rather than in the client page so the review text is in the
  // HTML; returns an empty payload rather than throwing if the API is down.
  const { reviews, stats } = await fetchPublicReviews();

  return (
    <>
      <FAQStructuredData faqs={faqs} locale={locale as 'fr' | 'en' | 'zh' | 'ar'} />
      <CalculatorPage reviews={reviews} reviewStats={stats} />
    </>
  );
}
