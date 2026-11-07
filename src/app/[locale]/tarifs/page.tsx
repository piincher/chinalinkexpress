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
import { fetchCompanyStats } from '@/lib/publicStatsApi';
import type { Locale } from '@/i18n/config';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const seo = PAGE_SEO.pricing[locale as Locale];
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/${locale}/tarifs`,
      languages: {
        'en': '/en/tarifs',
        'fr': '/fr/tarifs',
        'zh': '/zh/tarifs',
        'ar': '/ar/tarifs',
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
  zh: [
    {
      question: '中国到马里的运价是多少？',
      answer: '价格取决于重量、体积、产品类型、空运或海运方式以及巴马科的最终目的地。计算器会在 WhatsApp 确认前给出估算。',
    },
    {
      question: '包含清关吗？',
      answer: '常规价格包含标准清关协助。敏感或受管制产品可能需要额外费用或文件。',
    },
    {
      question: '我可以到货后再付运费吗？',
      answer: '在许多情况下，可以在到货并检查后付款。部分客户、产品或金额可能需要预付。',
    },
  ],
  ar: [
    {
      question: 'ما أسعار الشحن من الصين إلى مالي؟',
      answer: 'تعتمد الأسعار على الوزن والحجم ونوع المنتج وطريقة الشحن الجوي أو البحري والوجهة النهائية في باماكو. تعطي الحاسبة تقديرًا قبل التأكيد عبر WhatsApp.',
    },
    {
      question: 'هل التخليص الجمركي مشمول؟',
      answer: 'تشمل الأسعار المعتادة المساعدة في التخليص الجمركي القياسي. وقد تتطلب المنتجات الحساسة أو المنظمة رسومًا أو مستندات إضافية.',
    },
    {
      question: 'هل يمكنني دفع الشحن عند الوصول؟',
      answer: 'في كثير من الحالات يتم الدفع عند الوصول بعد الفحص. وقد تتطلب بعض الملفات أو المنتجات أو المبالغ دفعة مقدمة.',
    },
  ],
};

export default async function PricingRoute({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const faqs = pricingFaqs[locale as Locale];
  const stats = await fetchCompanyStats();

  return (
    <>
      <FAQStructuredData faqs={faqs} locale={locale as 'fr' | 'en' | 'zh' | 'ar'} />
      <PricingPage shipmentsHandled={stats.shipmentsHandled} />
    </>
  );
}
