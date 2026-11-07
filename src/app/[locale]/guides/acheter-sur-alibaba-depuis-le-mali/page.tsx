import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { i18nConfig, Locale } from '@/i18n/config';
import {
  BUSINESS_INFO,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generatePageMetadata,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';
import { GUIDE_CRUMBS, GUIDE_LABELS, type GuideContent } from '@/features/seo-content/guide-labels';

interface Props {
  params: Promise<{ locale: string }>;
}

const slug = 'acheter-sur-alibaba-depuis-le-mali';

const content: Record<Locale, GuideContent> = {
  fr: {
    metaTitle: 'Acheter sur Alibaba depuis le Mali | Guide import Chine',
    breadcrumb: 'Acheter sur Alibaba depuis le Mali',
    title: 'Acheter sur Alibaba depuis le Mali',
    description: 'Guide pour acheter sur Alibaba depuis le Mali : choisir un fournisseur, éviter les arnaques, payer, inspecter et expédier vers Bamako.',
    keywords: 'acheter sur Alibaba depuis le Mali, Alibaba Mali, achat Alibaba Bamako, fournisseur Alibaba Chine Mali',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 6 minutes',
    sections: [
      { title: 'Créer une demande claire', body: 'Avant de contacter un fournisseur Alibaba, préparez le produit exact, la quantité, les dimensions, la matière, le budget et le délai souhaité. Plus votre demande est claire, plus le devis sera exploitable.', items: ['Lien produit ou photo', 'Quantité minimum', 'Destination Bamako', 'Mode de fret souhaité'] },
      { title: 'Comparer plusieurs fournisseurs', body: 'Ne choisissez pas le premier prix. Comparez la société, les délais, les avis, les certificats, la communication et la cohérence des prix. Un prix trop bas peut cacher une qualité faible.' },
      { title: 'Vérifier avant de payer', body: 'Demandez des photos réelles, une vidéo courte, un devis écrit et les conditions de paiement. Pour les grosses commandes, faites vérifier le fournisseur ou commandez un échantillon.' },
      { title: 'Organiser le paiement et le fret', body: 'Après validation, ChinaLink peut faciliter le paiement, suivre la préparation, recevoir la marchandise en Chine, la contrôler et l’expédier vers Bamako.' },
    ],
    faqs: [
      { question: 'Alibaba livre-t-il directement au Mali ?', answer: 'Certains fournisseurs proposent une livraison internationale, mais il est souvent plus sûr de passer par un partenaire qui vérifie, consolide et organise le fret vers Bamako.' },
      { question: 'Comment éviter une arnaque sur Alibaba ?', answer: 'Vérifiez la société, demandez des preuves réelles, commencez par un échantillon ou petit lot, et évitez les paiements hors plateforme sans contrôle.' },
      { question: 'ChinaLink peut-il acheter sur Alibaba pour moi ?', answer: 'Oui. Nous pouvons contacter le fournisseur, négocier, payer, contrôler et expédier la marchandise vers le Mali.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'Service achat Alibaba' },
      { href: '/services/verification-fournisseur-chine', label: 'Vérifier un fournisseur Alibaba' },
      { href: '/services/paiement-fournisseur-chine', label: 'Payer un fournisseur chinois' },
      { href: '/guides/importer-de-chine-au-mali', label: 'Guide import Chine-Mali' },
    ],
  },
  en: {
    metaTitle: 'Buy on Alibaba from Mali | China import guide',
    breadcrumb: 'Buy on Alibaba from Mali',
    title: 'Buy on Alibaba from Mali',
    description: 'A guide to buying on Alibaba from Mali: choose a supplier, avoid scams, pay, inspect and ship to Bamako.',
    keywords: 'buy on Alibaba from Mali, Alibaba Mali, Alibaba supplier Mali, Alibaba agent Mali, Alibaba shipping Bamako',
    updatedAt: 'April 21, 2026',
    readTime: '6 min read',
    sections: [
      { title: 'Write a clear request', body: 'Before contacting an Alibaba supplier, prepare the exact product, quantity, dimensions, material, budget and desired timing. The clearer your request, the more usable the quote.', items: ['Product link or photo', 'Minimum quantity', 'Destination: Bamako', 'Preferred freight mode'] },
      { title: 'Compare several suppliers', body: 'Do not choose the first price. Compare the company, lead times, reviews, certificates, communication and price consistency. A very low price can hide poor quality.' },
      { title: 'Check before paying', body: 'Ask for real photos, a short video, a written quote and the payment terms. For large orders, have the supplier verified or order a sample.' },
      { title: 'Organise payment and freight', body: 'Once approved, ChinaLink can help with payment, follow the preparation, receive the goods in China, check them and ship them to Bamako.' },
    ],
    faqs: [
      { question: 'Does Alibaba deliver directly to Mali?', answer: 'Some suppliers offer international delivery, but it is often safer to go through a partner who checks, consolidates and organises the shipment.' },
      { question: 'How do I avoid a scam on Alibaba?', answer: 'Check the company, ask for real proof, start with a sample or small batch, and avoid off-platform payments without checks.' },
      { question: 'Can ChinaLink buy on Alibaba for me?', answer: 'Yes. We can contact the supplier, negotiate, pay, check and ship the goods to Mali.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'Alibaba buying service' },
      { href: '/services/verification-fournisseur-chine', label: 'Verify an Alibaba supplier' },
      { href: '/services/paiement-fournisseur-chine', label: 'Pay a Chinese supplier' },
      { href: '/guides/importer-de-chine-au-mali', label: 'China to Mali import guide' },
    ],
  },
  zh: {
    metaTitle: '从马里在 Alibaba 购买 | 中国进口指南',
    breadcrumb: '从马里在 Alibaba 购买',
    title: '从马里在 Alibaba 购买',
    description: '从马里在 Alibaba 购买的指南：选择供应商、避免诈骗、付款、验货并发往巴马科。',
    keywords: '从马里在 Alibaba 购买, 马里 Alibaba, 马里 Alibaba 供应商, 马里 Alibaba 代理, Alibaba 巴马科发货',
    updatedAt: '2026 年 4 月 21 日',
    readTime: '阅读时间：6 分钟',
    sections: [
      { title: '写出清晰的需求', body: '联系 Alibaba 供应商之前，准备好准确的产品、数量、尺寸、材质、预算和期望时间。需求越清晰，报价越有用。', items: ['产品链接或照片', '最小数量', '目的地巴马科', '期望的运输方式'] },
      { title: '比较多家供应商', body: '不要选择第一个价格。比较公司、交期、评价、证书、沟通和价格一致性。过低的价格可能隐藏质量问题。' },
      { title: '付款前核验', body: '索取真实照片、短视频、书面报价和付款条件。大额订单请核验供应商或订购样品。' },
      { title: '安排付款和货运', body: '确认后，ChinaLink 可以协助付款、跟进备货、在中国收货、检查并发往巴马科。' },
    ],
    faqs: [
      { question: 'Alibaba 直接送到马里吗？', answer: '有些供应商提供国际配送，但通过负责核验、集运和安排发货的伙伴通常更安全。' },
      { question: '如何避免 Alibaba 上的诈骗？', answer: '核验公司、索取真实证明、从样品或小批量开始，避免未经检查就在平台外付款。' },
      { question: 'ChinaLink 可以替我在 Alibaba 购买吗？', answer: '可以。我们可以联系供应商、议价、付款、检查并把货物发往马里。' },
    ],
    links: [
      { href: '/services/sourcing', label: 'Alibaba 采购服务' },
      { href: '/services/verification-fournisseur-chine', label: '核验 Alibaba 供应商' },
      { href: '/services/paiement-fournisseur-chine', label: '向中国供应商付款' },
      { href: '/guides/importer-de-chine-au-mali', label: '中国—马里进口指南' },
    ],
  },
  ar: {
    metaTitle: 'الشراء من Alibaba من مالي | دليل الاستيراد من الصين',
    breadcrumb: 'الشراء من Alibaba من مالي',
    title: 'الشراء من Alibaba من مالي',
    description: 'دليل للشراء من Alibaba من مالي: اختيار المورد وتجنب الاحتيال والدفع والفحص والشحن إلى باماكو.',
    keywords: 'الشراء من Alibaba من مالي، Alibaba مالي، مورد Alibaba في مالي، وكيل Alibaba في مالي، شحن Alibaba إلى باماكو',
    updatedAt: '21 أبريل 2026',
    readTime: 'وقت القراءة: 6 دقائق',
    sections: [
      { title: 'اكتب طلبًا واضحًا', body: 'قبل التواصل مع مورد في Alibaba، جهز المنتج بدقة والكمية والأبعاد والمادة والميزانية والمدة المطلوبة. كلما كان طلبك أوضح، كان عرض السعر أفيد.', items: ['رابط المنتج أو صورة', 'الحد الأدنى للكمية', 'الوجهة باماكو', 'طريقة الشحن المطلوبة'] },
      { title: 'قارن عدة موردين', body: 'لا تختر أول سعر. قارن الشركة والمدد والآراء والشهادات والتواصل وتناسق الأسعار. فقد يخفي السعر المنخفض جدًا جودة ضعيفة.' },
      { title: 'تحقق قبل الدفع', body: 'اطلب صورًا حقيقية وفيديو قصيرًا وعرض سعر مكتوبًا وشروط الدفع. وللطلبات الكبيرة، اطلب التحقق من المورد أو عينة.' },
      { title: 'نظم الدفع والشحن', body: 'بعد الموافقة، يمكن لـChinaLink تسهيل الدفع ومتابعة التجهيز واستلام البضاعة في الصين وفحصها وشحنها إلى باماكو.' },
    ],
    faqs: [
      { question: 'هل تسلم Alibaba مباشرة في مالي؟', answer: 'يقدم بعض الموردين توصيلًا دوليًا، لكن الأكثر أمانًا غالبًا هو المرور عبر شريك يتحقق من البضاعة ويجمعها وينظم شحنها.' },
      { question: 'كيف أتجنب الاحتيال في Alibaba؟', answer: 'تحقق من الشركة، واطلب أدلة حقيقية، وابدأ بعينة أو دفعة صغيرة، وتجنب الدفع خارج المنصة دون فحص.' },
      { question: 'هل يمكن لـChinaLink الشراء من Alibaba نيابة عني؟', answer: 'نعم. يمكننا التواصل مع المورد والتفاوض والدفع والفحص وشحن البضاعة إلى مالي.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'خدمة الشراء من Alibaba' },
      { href: '/services/verification-fournisseur-chine', label: 'التحقق من مورد في Alibaba' },
      { href: '/services/paiement-fournisseur-chine', label: 'الدفع لمورد صيني' },
      { href: '/guides/importer-de-chine-au-mali', label: 'دليل الاستيراد من الصين إلى مالي' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = content[locale as Locale];
  return generatePageMetadata({
    title: page.metaTitle,
    description: page.description,
    keywords: page.keywords,
    path: `/guides/${slug}`,
    locale: locale as Locale,
    ogType: 'article',
  });
}

export default async function GuideAlibabaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = content[locale as Locale];
  const crumbs = GUIDE_CRUMBS[locale as Locale];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    author: { '@type': 'Organization', name: BUSINESS_INFO.name },
    publisher: { '@type': 'Organization', name: BUSINESS_INFO.name },
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    inLanguage: locale,
    mainEntityOfPage: `${BUSINESS_INFO.url}/${locale}/guides/${slug}`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema([
            { name: crumbs.home, url: `/${locale}/` },
            { name: crumbs.guides, url: `/${locale}/guides/importer-de-chine-au-mali` },
            { name: page.breadcrumb, url: `/${locale}/guides/${slug}` },
          ], locale as Locale),
          generateFAQPageSchema(page.faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={page.title}
        description={page.description}
        updatedAt={page.updatedAt}
        readTime={page.readTime}
        sections={page.sections}
        faqs={page.faqs}
        links={page.links.map((link) => ({ ...link, href: `/${locale}${link.href}` }))}
        {...GUIDE_LABELS[locale as Locale]}
      />
    </>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
