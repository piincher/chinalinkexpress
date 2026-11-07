/**
 * Air Freight Service Page - SEO Optimized
 * 
 * Features:
 * - Dynamic metadata with comprehensive SEO
 * - Enhanced structured data with Service schema
 * - Breadcrumb navigation structured data
 * - OpenGraph and Twitter card optimization
 * 
 * Target Keywords:
 * - Primary: air freight China Africa, air cargo, express shipping
 * - Long-tail: air freight Bamako, China to Mali air shipping
 * - Location: shipping China Bamako, air freight Dakar
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { AirFreightPage } from '@/features/services/AirFreightPage';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'air');
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

const airFreightFaqs = {
  fr: [
    {
      question: 'Combien de temps prend le fret aérien Chine-Mali ?',
      answer: 'Le fret aérien de Chine vers Bamako prend généralement 14 à 21 jours ouvrables selon la ville de départ, la consolidation et les contrôles avant embarquement.',
    },
    {
      question: 'Quels produits conviennent au cargo aérien Chine-Mali ?',
      answer: 'Le fret aérien convient aux vêtements, accessoires, pièces, petits équipements, échantillons et marchandises urgentes. Les batteries, liquides et produits dangereux demandent une validation avant expédition.',
    },
    {
      question: 'Pouvez-vous acheter la marchandise avant de l’expédier ?',
      answer: 'Oui. ChinaLink peut sourcer, payer le fournisseur, contrôler la marchandise, consolider les colis puis organiser le fret aérien vers Bamako.',
    },
    {
      question: 'Comment recevoir un devis de fret aérien ?',
      answer: 'Envoyez le poids, le volume, la catégorie produit, la ville de départ en Chine et la destination à Bamako sur WhatsApp. Nous estimons le mode le plus adapté.',
    },
  ],
  en: [
    {
      question: 'How long does China to Mali air freight take?',
      answer: 'Air freight from China to Bamako usually takes 14 to 21 business days depending on origin city, consolidation and pre-flight checks.',
    },
    {
      question: 'Which products are suitable for China to Africa air cargo?',
      answer: 'Air freight works well for clothing, accessories, parts, small equipment, samples and urgent goods. Batteries, liquids and dangerous goods require validation before shipping.',
    },
    {
      question: 'Can you buy the goods before shipping them?',
      answer: 'Yes. ChinaLink can source products, pay the supplier, inspect goods, consolidate parcels and organize air freight to Bamako or another supported West African destination.',
    },
    {
      question: 'How do I get an air freight quote?',
      answer: 'Send the weight, volume, product category, China origin city and destination on WhatsApp. We will estimate the most suitable freight mode.',
    },
  ],
  zh: [
    {
      question: '中国到马里的空运需要多长时间？',
      answer: '从中国到巴马科的空运通常需要 14 到 21 个工作日，取决于始发城市、集运和登机前检查。',
    },
    {
      question: '哪些产品适合中国到马里空运？',
      answer: '空运适合服装、配件、零件、小型设备、样品和紧急货物。电池、液体和危险品需要在发货前确认。',
    },
    {
      question: '你们可以在发货前购买货物吗？',
      answer: '可以。ChinaLink 可以采购、向供应商付款、检查货物、合并包裹，再安排空运到巴马科。',
    },
    {
      question: '如何获得空运报价？',
      answer: '通过 WhatsApp 发送重量、体积、产品类别、中国始发城市和巴马科目的地。我们会估算最合适的方式。',
    },
  ],
  ar: [
    {
      question: 'كم يستغرق الشحن الجوي من الصين إلى مالي؟',
      answer: 'يستغرق الشحن الجوي من الصين إلى باماكو عادة من 14 إلى 21 يوم عمل حسب مدينة المغادرة والتجميع والفحوصات قبل التحميل.',
    },
    {
      question: 'ما المنتجات المناسبة للشحن الجوي من الصين إلى مالي؟',
      answer: 'يناسب الشحن الجوي الملابس والإكسسوارات والقطع والمعدات الصغيرة والعينات والبضائع العاجلة. وتتطلب البطاريات والسوائل والمواد الخطرة موافقة قبل الشحن.',
    },
    {
      question: 'هل يمكنكم شراء البضاعة قبل شحنها؟',
      answer: 'نعم. يمكن لـChinaLink التوريد والدفع للمورد وفحص البضاعة وتجميع الطرود ثم تنظيم الشحن الجوي إلى باماكو.',
    },
    {
      question: 'كيف أحصل على عرض سعر للشحن الجوي؟',
      answer: 'أرسل الوزن والحجم وفئة المنتج ومدينة المغادرة في الصين والوجهة في باماكو عبر WhatsApp. نقدّر لك الطريقة الأنسب.',
    },
  ],
};

export default async function AirFreightService({ params }: PageProps) {
  const { locale } = await params;
  
  // Set locale for static generation
  setRequestLocale(locale);
  
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const faqs = airFreightFaqs[locale as Locale];
  
  // Breadcrumb data for structured data
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'Air Freight' : isZh ? '空运' : isAr ? 'الشحن الجوي' : 'Fret Aérien', url: `/${locale}/services/air-freight` },
  ];

  return (
    <>
      {/* Enhanced Structured Data */}
      <ServiceStructuredData 
        serviceType="air" 
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      
      {/* Page Content */}
      <AirFreightPage locale={locale} />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

// Generate static pages for all locales at build time
export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

// Route segment config for caching
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
