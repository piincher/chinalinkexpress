/**
 * China to Mali Route Page - SEO Optimized
 * 
 * Features:
 * - Route-specific metadata targeting "shipping China Mali" keywords
 * - ShippingDeliveryTime structured data
 * - Geographic targeting for Mali market
 * 
 * Target Keywords:
 * - Primary: shipping China Mali, freight forwarder Bamako
 * - Long-tail: import China Mali, China to Bamako shipping
 * - Local: transitaire Bamako, fret Chine Mali
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateRouteMetadata } from '@/lib/metadata';
import { FAQStructuredData, RouteStructuredData, StructuredData } from '@/components/seo';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/config/seo-advanced';
import { Breadcrumb } from '@/components/Breadcrumb';
import { RoutePage } from '@/features/routes/RoutePage';
import { getRouteSeo } from '@/features/routes/route-seo';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale as Locale, 'mali');
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

const routeFaqs = {
  fr: [
    {
      question: 'Combien de temps prend le fret Chine-Mali ?',
      answer: 'Le fret aérien prend généralement 14 à 21 jours vers Bamako. Le fret maritime prend généralement 60 à 75 jours depuis le port de Foshan jusqu’au port de Dakar, puis par transport terrestre vers Bamako.',
    },
    {
      question: 'ChinaLink peut-il gérer le sourcing avant l’expédition ?',
      answer: 'Oui. ChinaLink peut rechercher le fournisseur, gérer le paiement, contrôler la marchandise, consolider les colis et organiser l’expédition vers le Mali.',
    },
    {
      question: 'Quels produits sont adaptés au fret aérien Chine-Mali ?',
      answer: 'Le fret aérien convient aux colis urgents, vêtements, accessoires, petites pièces, échantillons et produits à forte marge. Les batteries, liquides et produits dangereux doivent être validés avant expédition.',
    },
    {
      question: 'Quels produits sont adaptés au fret maritime Chine-Mali ?',
      answer: 'Le fret maritime convient aux gros volumes, meubles, machines, cartons lourds et marchandises non urgentes.',
    },
  ],
  en: [
    {
      question: 'How long does China to Mali freight take?',
      answer: 'Air freight to Bamako usually takes 14 to 21 days. Sea freight usually takes 60 to 75 days from Foshan port to Dakar port, then by road transit to Bamako.',
    },
    {
      question: 'Can ChinaLink handle sourcing before shipment?',
      answer: 'Yes. ChinaLink can find suppliers, assist supplier payment, inspect goods, consolidate parcels and organize shipping to Mali or another West African destination.',
    },
    {
      question: 'Which products are best for China to Mali air freight?',
      answer: 'Air freight works best for urgent parcels, clothing, accessories, small parts, samples and high-margin products. Batteries, liquids and dangerous goods must be validated before shipment.',
    },
    {
      question: 'Which products are best for China to Mali sea freight?',
      answer: 'Sea freight works best for large volumes, furniture, machinery, heavy cartons and non-urgent goods.',
    },
  ],
  zh: [
    {
      question: '中国到马里的货运需要多长时间？',
      answer: '空运到巴马科通常需要 14 到 21 天。海运通常需要 60 到 75 天，从佛山港到达喀尔港，再经陆路运到巴马科。',
    },
    {
      question: 'ChinaLink 能在发货前处理采购吗？',
      answer: '可以。ChinaLink 可以寻找供应商、处理付款、检查货物、合并包裹并安排发往马里。',
    },
    {
      question: '哪些产品适合中国到马里空运？',
      answer: '空运适合紧急包裹、服装、配件、小零件、样品和高利润产品。电池、液体和危险品必须在发货前确认。',
    },
    {
      question: '哪些产品适合中国到马里海运？',
      answer: '海运适合大批量、家具、机器、重型纸箱和不紧急的货物。',
    },
  ],
  ar: [
    {
      question: 'كم يستغرق الشحن من الصين إلى مالي؟',
      answer: 'يستغرق الشحن الجوي عادة من 14 إلى 21 يومًا إلى باماكو. ويستغرق البحري عادة من 60 إلى 75 يومًا من ميناء فوشان إلى ميناء داكار، ثم برًا إلى باماكو.',
    },
    {
      question: 'هل تستطيع ChinaLink تولي التوريد قبل الشحن؟',
      answer: 'نعم. يمكن لـChinaLink البحث عن المورد وإدارة الدفع وفحص البضاعة وتجميع الطرود وتنظيم الشحن إلى مالي.',
    },
    {
      question: 'ما المنتجات المناسبة للشحن الجوي من الصين إلى مالي؟',
      answer: 'يناسب الشحن الجوي الطرود العاجلة والملابس والإكسسوارات والقطع الصغيرة والعينات والمنتجات عالية الهامش. ويجب التأكد من البطاريات والسوائل والمواد الخطرة قبل الشحن.',
    },
    {
      question: 'ما المنتجات المناسبة للشحن البحري من الصين إلى مالي؟',
      answer: 'يناسب الشحن البحري الكميات الكبيرة والأثاث والآلات والكراتين الثقيلة والبضائع غير العاجلة.',
    },
  ],
};

export default async function ChinaToMaliRoute({ params }: PageProps) {
  const { locale } = await params;
  
  // Set locale for static generation
  setRequestLocale(locale);
  
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const seo = getRouteSeo('china-to-mali', locale as Locale);
  const faqs = routeFaqs[locale as Locale];
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Routes' : 'Routes', url: `/${locale}/routes/` },
    { name: seo.breadcrumb, url: `/${locale}/routes/china-to-mali/` },
  ];
  
  // Shipping route data for structured data
  const shippingRoute = {
    origin: 'China',
    destination: 'Mali',
    durationDays: { min: 14, max: 75 },
    methods: ['air', 'sea'] as ('air' | 'sea')[],
  };

  // Additional schemas for route page
  const additionalSchemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
  ];

  const breadcrumbItems = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

  return (
    <>
      {/* Route-specific Structured Data */}
      <RouteStructuredData 
        route={shippingRoute}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Organization & LocalBusiness */}
      <StructuredData schemas={additionalSchemas} />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />

      {/* Visible Breadcrumb Navigation */}
      <div className="bg-white pt-28 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} locale={locale as Locale} />
        </div>
      </div>
      
      {/* Page Content */}
      <RoutePage 
        locale={locale} 
        routeKey="china-to-mali"
        country={seo.country}
        capital={seo.capital}
      />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
