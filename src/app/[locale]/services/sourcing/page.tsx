/**
 * Sourcing & Procurement Service Page
 *
 * SEO-optimized page for China sourcing services for Mali importers.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { SourcingPage } from '@/features/services/SourcingPage';

interface Props {
  params: Promise<{ locale: string }>;
}

const sourcingFaqs = {
  fr: [
    {
      question: 'Pouvez-vous acheter sur Alibaba pour un client au Mali ?',
      answer: 'Oui. ChinaLink Express peut rechercher le fournisseur, vérifier ses informations, payer la commande en Chine, contrôler les marchandises et organiser l’expédition vers Bamako.',
    },
    {
      question: 'Comment vérifiez-vous un fournisseur chinois ?',
      answer: 'Nous vérifions les informations de l’entreprise, la cohérence des prix, les photos/vidéos de production, les références disponibles et les risques avant tout paiement important.',
    },
    {
      question: 'Pouvez-vous regrouper plusieurs achats avant expédition ?',
      answer: 'Oui. Nous consolidons les colis de plusieurs fournisseurs dans notre réseau en Chine afin de réduire le coût du fret vers le Mali.',
    },
    {
      question: 'Le sourcing inclut-il le paiement fournisseur ?',
      answer: 'Oui, nous pouvons régler le fournisseur via les moyens de paiement utilisés en Chine, puis vous envoyer une preuve de paiement et le suivi de commande.',
    },
  ],
  en: [
    {
      question: 'Can you buy on Alibaba for an importer in Africa?',
      answer: 'Yes. ChinaLink Express can find the supplier, verify key information, pay the order in China, inspect the goods and organize shipping to Bamako or another supported West African destination.',
    },
    {
      question: 'How do you verify a Chinese supplier?',
      answer: 'We check company information, price consistency, production photos or videos, available references and risk signals before any significant payment.',
    },
    {
      question: 'Can you consolidate several purchases before shipping?',
      answer: 'Yes. We consolidate parcels from multiple suppliers through our China-side network to reduce freight costs to Mali and West Africa.',
    },
    {
      question: 'Does sourcing include supplier payment?',
      answer: 'Yes. We can pay the supplier through payment methods used in China, then send proof of payment and order tracking.',
    },
  ],
  zh: [
    {
      question: '你们可以为马里客户在 Alibaba 购买吗？',
      answer: '可以。ChinaLink Express 可以寻找供应商、核验信息、在中国支付订单、检查货物并安排发往巴马科。',
    },
    {
      question: '你们如何核验中国供应商？',
      answer: '在任何大额付款前，我们核验公司信息、价格一致性、生产照片/视频、可用参考和风险。',
    },
    {
      question: '你们可以在发货前合并多笔采购吗？',
      answer: '可以。我们在中国的网络中合并多家供应商的包裹，以降低到马里的运费。',
    },
    {
      question: '采购服务包含供应商付款吗？',
      answer: '包含，我们可以通过中国常用的付款方式向供应商付款，然后把付款凭证和订单跟踪发给您。',
    },
  ],
  ar: [
    {
      question: 'هل يمكنكم الشراء من Alibaba لعميل في مالي؟',
      answer: 'نعم. يمكن لـChinaLink Express البحث عن المورد والتحقق من معلوماته ودفع الطلب في الصين وفحص البضائع وتنظيم الشحن إلى باماكو.',
    },
    {
      question: 'كيف تتحققون من مورد صيني؟',
      answer: 'نتحقق من معلومات الشركة وتناسق الأسعار وصور وفيديوهات الإنتاج والمراجع المتاحة والمخاطر قبل أي دفع كبير.',
    },
    {
      question: 'هل يمكنكم تجميع عدة مشتريات قبل الشحن؟',
      answer: 'نعم. نجمع طرود عدة موردين في شبكتنا في الصين لتقليل كلفة الشحن إلى مالي.',
    },
    {
      question: 'هل يشمل التوريد الدفع للمورد؟',
      answer: 'نعم، يمكننا الدفع للمورد بوسائل الدفع المستخدمة في الصين، ثم نرسل إليك إثبات الدفع ومتابعة الطلب.',
    },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'sourcing');
}

export default async function Sourcing({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const faqs = sourcingFaqs[locale as Locale];
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'China Sourcing' : isZh ? '中国采购' : isAr ? 'التوريد من الصين' : 'Sourcing Chine', url: `/${locale}/services/sourcing` },
  ];

  return (
    <>
      <ServiceStructuredData
        serviceType="sourcing"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      <SourcingPage locale={locale} />
    </>
  );
}

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
