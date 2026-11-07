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

const slug = 'acheter-sur-1688-depuis-le-mali';

const content: Record<Locale, GuideContent> = {
  fr: {
    metaTitle: 'Acheter sur 1688 depuis le Mali | Paiement et livraison',
    breadcrumb: 'Acheter sur 1688 depuis le Mali',
    title: 'Acheter sur 1688 depuis le Mali',
    description: 'Comment acheter sur 1688 depuis le Mali avec un agent en Chine : recherche produit, paiement, vérification fournisseur, consolidation et livraison à Bamako.',
    keywords: 'acheter sur 1688 depuis Mali, achat 1688 Mali, agent 1688 Mali, paiement 1688 Chine Mali, livraison 1688 Bamako',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 7 minutes',
    sections: [
      { title: 'Ce qu’il faut comprendre sur 1688', body: '1688 est une plateforme chinoise orientée prix usine et grossistes locaux. Elle peut être très intéressante pour les importateurs maliens, mais elle demande traduction, négociation et paiement local.', items: ['Interface en chinois', 'Paiements souvent locaux', 'Vendeurs moins habitués à l’export', 'Contrôle qualité indispensable'] },
      { title: 'Comment trouver un bon produit', body: 'Travaillez avec des mots-clés chinois, comparez plusieurs vendeurs, vérifiez les volumes de vente et demandez des photos réelles. Évitez de commander un gros lot sans test.' },
      { title: 'Paiement et réception en Chine', body: 'Beaucoup de vendeurs 1688 préfèrent Alipay ou virement chinois. ChinaLink peut régler la commande validée, recevoir les colis dans son réseau en Chine et préparer la consolidation.' },
      { title: 'Expédition vers Bamako', body: 'Après réception et contrôle, les produits peuvent partir par fret aérien pour les petits volumes urgents ou par maritime pour les gros volumes.' },
    ],
    faqs: [
      { question: 'Pourquoi 1688 est-il souvent moins cher qu’Alibaba ?', answer: '1688 cible surtout le marché domestique chinois. Les prix peuvent être plus bas, mais la plateforme est en chinois et les vendeurs acceptent souvent des paiements locaux.' },
      { question: 'Peut-on payer 1688 depuis le Mali ?', answer: 'C’est difficile directement. ChinaLink peut faciliter le paiement lorsque le fournisseur et la commande sont validés.' },
      { question: '1688 est-il plus risqué ?', answer: 'Il demande plus de vérification : langue, paiement, qualité, retours et logistique. Un agent local réduit ces risques.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'Agent 1688 pour le Mali' },
      { href: '/services/paiement-fournisseur-chine', label: 'Paiement 1688 depuis le Mali' },
      { href: '/services/verification-fournisseur-chine', label: 'Vérification fournisseur 1688' },
      { href: '/routes/china-to-mali', label: 'Expédition vers Bamako' },
    ],
  },
  en: {
    metaTitle: 'Buy on 1688 from Mali | Payment and delivery',
    breadcrumb: 'Buy on 1688 from Mali',
    title: 'Buy on 1688 from Mali',
    description: 'How to buy on 1688 from Mali with an agent in China: product search, payment, supplier verification, consolidation and delivery to Bamako.',
    keywords: 'buy on 1688 from Mali, 1688 Mali, 1688 agent Mali, 1688 payment China Mali, 1688 delivery Bamako',
    updatedAt: 'April 21, 2026',
    readTime: '7 min read',
    sections: [
      { title: 'What to understand about 1688', body: '1688 is a Chinese platform built around factory prices and local wholesalers. It can be very attractive for Malian importers, but it requires translation, negotiation and local payment.', items: ['Chinese interface', 'Payments are often local', 'Sellers less used to export', 'Quality checks are essential'] },
      { title: 'How to find a good product', body: 'Work with Chinese keywords, compare several sellers, check sales volumes and ask for real photos. Avoid ordering a large batch without a test.' },
      { title: 'Payment and receiving in China', body: 'Many 1688 sellers prefer Alipay or a Chinese bank transfer. ChinaLink can pay the approved order, receive the parcels in its China network and prepare consolidation.' },
      { title: 'Shipping to Bamako', body: 'After receiving and checking, the goods can leave by air for small urgent volumes or by sea for large volumes.' },
    ],
    faqs: [
      { question: 'Why is 1688 often cheaper than Alibaba?', answer: '1688 mainly targets the Chinese domestic market. Prices can be lower, but the platform is in Chinese and sellers often accept local payments.' },
      { question: 'Can I pay on 1688 from Mali?', answer: 'It is hard to do directly. ChinaLink can help with payment once the supplier and order are approved.' },
      { question: 'Is 1688 riskier?', answer: 'It needs more verification: language, payment, quality, returns and logistics. A local agent reduces these risks.' },
    ],
    links: [
      { href: '/services/sourcing', label: '1688 agent for Mali' },
      { href: '/services/paiement-fournisseur-chine', label: '1688 payment from Mali' },
      { href: '/services/verification-fournisseur-chine', label: '1688 supplier verification' },
      { href: '/routes/china-to-mali', label: 'Shipping to Bamako' },
    ],
  },
  zh: {
    metaTitle: '从马里在 1688 购买 | 付款与交付',
    breadcrumb: '从马里在 1688 购买',
    title: '从马里在 1688 购买',
    description: '如何通过在中国的代理从马里在 1688 购买：搜索产品、付款、核验供应商、集运并交付到巴马科。',
    keywords: '从马里在 1688 购买, 马里 1688, 马里 1688 代理, 1688 中国马里付款, 1688 巴马科交付',
    updatedAt: '2026 年 4 月 21 日',
    readTime: '阅读时间：7 分钟',
    sections: [
      { title: '关于 1688 需要了解什么', body: '1688 是面向工厂价和本地批发商的中国平台。它对马里进口商很有吸引力，但需要翻译、议价和本地付款。', items: ['中文界面', '付款通常为本地方式', '卖家不太熟悉出口', '质量检查必不可少'] },
      { title: '如何找到好产品', body: '使用中文关键词，比较多家卖家，查看销量并索取真实照片。避免未经测试就订购大批量。' },
      { title: '在中国付款和收货', body: '许多 1688 卖家更喜欢支付宝或中国转账。ChinaLink 可以支付已确认的订单，在其中国网络内收货并准备集运。' },
      { title: '发往巴马科', body: '收货和检查后，小批量紧急货物可空运，大批量货物可海运。' },
    ],
    faqs: [
      { question: '为什么 1688 通常比 Alibaba 便宜？', answer: '1688 主要面向中国国内市场。价格可能更低，但平台是中文的，卖家通常接受本地付款。' },
      { question: '可以从马里在 1688 付款吗？', answer: '直接付款很困难。供应商和订单确认后，ChinaLink 可以协助付款。' },
      { question: '1688 风险更高吗？', answer: '它需要更多核验：语言、付款、质量、退货和物流。本地代理可以降低这些风险。' },
    ],
    links: [
      { href: '/services/sourcing', label: '面向马里的 1688 代理' },
      { href: '/services/paiement-fournisseur-chine', label: '从马里进行 1688 付款' },
      { href: '/services/verification-fournisseur-chine', label: '1688 供应商核验' },
      { href: '/routes/china-to-mali', label: '发往巴马科' },
    ],
  },
  ar: {
    metaTitle: 'الشراء من 1688 من مالي | الدفع والتسليم',
    breadcrumb: 'الشراء من 1688 من مالي',
    title: 'الشراء من 1688 من مالي',
    description: 'كيف تشتري من 1688 من مالي عبر وكيل في الصين: البحث عن المنتج والدفع والتحقق من المورد والتجميع والتسليم في باماكو.',
    keywords: 'الشراء من 1688 من مالي، 1688 مالي، وكيل 1688 في مالي، الدفع في 1688 بين الصين ومالي، تسليم 1688 في باماكو',
    updatedAt: '21 أبريل 2026',
    readTime: 'وقت القراءة: 7 دقائق',
    sections: [
      { title: 'ما يجب فهمه عن 1688', body: '1688 منصة صينية موجهة نحو أسعار المصانع وتجار الجملة المحليين. وقد تكون مغرية جدًا للمستوردين الماليين، لكنها تتطلب الترجمة والتفاوض والدفع المحلي.', items: ['واجهة بالصينية', 'الدفع محلي غالبًا', 'بائعون أقل اعتيادًا على التصدير', 'فحص الجودة ضروري'] },
      { title: 'كيف تجد منتجًا جيدًا', body: 'استخدم كلمات مفتاحية صينية، وقارن عدة بائعين، وتحقق من حجم المبيعات، واطلب صورًا حقيقية. تجنب طلب دفعة كبيرة دون تجربة.' },
      { title: 'الدفع والاستلام في الصين', body: 'يفضل كثير من بائعي 1688 استخدام Alipay أو التحويل الصيني. يمكن لـChinaLink دفع الطلب المعتمد واستلام الطرود في شبكتها في الصين وتجهيز التجميع.' },
      { title: 'الشحن إلى باماكو', body: 'بعد الاستلام والفحص، يمكن شحن المنتجات جوًا للكميات الصغيرة العاجلة أو بحرًا للكميات الكبيرة.' },
    ],
    faqs: [
      { question: 'لماذا 1688 أرخص غالبًا من Alibaba؟', answer: 'تستهدف 1688 أساسًا السوق الصينية المحلية. قد تكون الأسعار أقل، لكن المنصة بالصينية ويقبل البائعون غالبًا الدفع المحلي.' },
      { question: 'هل يمكن الدفع في 1688 من مالي؟', answer: 'هذا صعب مباشرة. يمكن لـChinaLink تسهيل الدفع بعد اعتماد المورد والطلب.' },
      { question: 'هل 1688 أكثر خطورة؟', answer: 'تتطلب مزيدًا من التحقق: اللغة والدفع والجودة والإرجاع والخدمات اللوجستية. ويقلل الوكيل المحلي هذه المخاطر.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'وكيل 1688 لمالي' },
      { href: '/services/paiement-fournisseur-chine', label: 'الدفع في 1688 من مالي' },
      { href: '/services/verification-fournisseur-chine', label: 'التحقق من موردي 1688' },
      { href: '/routes/china-to-mali', label: 'الشحن إلى باماكو' },
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

export default async function Guide1688Page({ params }: Props) {
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
