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
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Why Us | Full Service vs Simple Transit | ChinaLink Express'
      : isZh ? '为什么选择我们 | 全程服务与普通货代 | ChinaLink Express' : isAr ? 'لماذا نحن | خدمة كاملة مقابل مجرد نقل | ChinaLink Express' : 'Pourquoi Nous | Service Complet vs Simple Transit | ChinaLink Express',
    description: isEn
      ? 'Why choose a full import partner instead of a basic freight forwarder. Discover how ChinaLink Express secures your purchases from China to Africa.'
      : isZh ? '为什么选择全程进口伙伴，而不只是普通货代。了解 ChinaLink Express 如何保障您在中国的采购。' : isAr ? 'لماذا تختار شريك استيراد متكاملًا بدلًا من مجرد وكيل شحن. اكتشف كيف تؤمّن ChinaLink Express مشترياتك في الصين.' : 'Pourquoi choisir un partenaire d\'importation complet plutôt qu\'un simple transitaire. Découvrez comment ChinaLink Express sécurise vos achats en Chine.',
    keywords: isEn
      ? 'freight forwarder china africa, import partner, china sourcing, full service vs basic freight, import china mali, import partner africa'
      : isZh ? '中国非洲货代, 进口伙伴, 中国采购, 全程货运与普通货运, 中国马里进口, 非洲进口伙伴' : isAr ? 'وكيل شحن من الصين إلى أفريقيا، شريك استيراد، التوريد من الصين، الشحن المتكامل مقابل البسيط، الاستيراد من الصين إلى مالي، شريك استيراد في أفريقيا' : 'transitaire chine afrique, partenaire importation, sourcing chine, fret complet vs simple, importation chine mali, partenaire importation afrique',
    path: '/pourquoi-nous',
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function PourquoiNous({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      {
        '@type': 'Service',
        name: isEn ? 'Full Import Partner Service' : isZh ? '全程进口伙伴服务' : isAr ? 'خدمة شريك الاستيراد المتكاملة' : 'Service Partenaire Importation Complet',
        description: isEn
          ? 'Complete import solution from China to Africa including sourcing, quality control, payment processing, and shipping.'
          : isZh ? '从中国到非洲的全程进口方案，包括采购、质量检查、付款处理和运输。' : isAr ? 'حل استيراد متكامل من الصين إلى أفريقيا يشمل التوريد وفحص الجودة ومعالجة الدفع والشحن.' : 'Solution d\'importation complète de la Chine vers l\'Afrique incluant sourcing, contrôle qualité, traitement paiement et expédition.',
        provider: generateOrganizationSchema(),
        serviceType: 'FreightForwardingService',
        areaServed: [
          { '@type': 'Country', name: 'Mali' },
          { '@type': 'Country', name: 'Uganda' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isEn ? 'Import Services' : isZh ? '进口服务' : isAr ? 'خدمات الاستيراد' : 'Services d\'Importation',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Supplier Sourcing & Verification' : isZh ? '采购与供应商核验' : isAr ? 'التوريد والتحقق من الموردين' : 'Sourcing & Vérification Fournisseurs',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Quality Inspection' : isZh ? '质量检验' : isAr ? 'فحص الجودة' : 'Inspection Qualité',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Payment Processing' : isZh ? '付款处理' : isAr ? 'معالجة الدفع' : 'Traitement Paiement',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEn ? 'Shipping & Customs Clearance' : isZh ? '运输与清关' : isAr ? 'الشحن والتخليص الجمركي' : 'Expédition & Dédouanement',
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
