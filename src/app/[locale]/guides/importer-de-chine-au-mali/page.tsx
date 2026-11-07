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

const slug = 'importer-de-chine-au-mali';

const content: Record<Locale, GuideContent> = {
  fr: {
    metaTitle: 'Importer de Chine au Mali : guide complet 2026',
    breadcrumb: 'Importer de Chine au Mali',
    title: 'Comment importer de Chine au Mali en toute sécurité',
    description: 'Guide pratique 2026 pour importer de Chine au Mali : choisir un produit, vérifier le fournisseur, payer en sécurité, contrôler la qualité, choisir le fret et recevoir à Bamako.',
    keywords: 'importer de Chine au Mali, comment importer de Chine, achat Chine Mali, fournisseur Chine Mali, fret Chine Mali',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 8 minutes',
    sections: [
      { title: '1. Choisir un produit rentable avant de chercher un fournisseur', body: 'La première erreur est de commencer par Alibaba au hasard. Commencez par le marché malien : prix de vente à Bamako, marge possible, concurrence, poids, fragilité, réglementation et fréquence de demande.', items: ['Comparez le prix local et le prix fournisseur', 'Évitez les produits trop fragiles au début', 'Calculez le fret avant de commander', 'Vérifiez si le produit est sensible ou interdit'] },
      { title: '2. Trouver un fournisseur chinois sans se faire piéger', body: 'Alibaba peut donner accès à de bons fournisseurs, mais aussi à des intermédiaires ou vendeurs risqués. Demandez des preuves réelles avant de payer.', items: ['Photos/vidéos récentes de production', 'Devis clair avec quantité et délai', 'Nom de société cohérent', 'Conditions de paiement et d’expédition écrites'] },
      { title: '3. Sécuriser le paiement fournisseur', body: 'Beaucoup de fournisseurs demandent Alipay ou un virement local. Avant de payer, vérifiez le fournisseur et gardez une preuve. ChinaLink peut faciliter le paiement et le suivi.', items: ['Ne payez pas un compte personnel suspect', 'Demandez une facture ou confirmation', 'Gardez les échanges importants', 'Évitez les gros acomptes sans contrôle'] },
      { title: '4. Contrôler la qualité avant l’expédition', body: 'Une inspection photo ou vidéo avant départ évite les mauvaises surprises à Bamako. Le contrôle doit vérifier la quantité, l’apparence, l’emballage et les références principales.' },
      { title: '5. Choisir fret aérien ou maritime vers Bamako', body: 'Le fret aérien est rapide et adapté aux petits volumes. Le fret maritime est plus économique pour les gros volumes, mais plus lent. Le bon choix dépend de la marge, de l’urgence et du type de marchandise.' },
      { title: '6. Préparer la réception au Mali', body: 'Avant l’arrivée, confirmez le contact de réception, l’adresse, les documents, les éventuels frais particuliers et le mode de paiement du fret.' },
    ],
    faqs: [
      { question: 'Quel budget faut-il pour commencer à importer de Chine au Mali ?', answer: 'Le budget dépend du produit, du minimum de commande, du mode de transport et des frais de paiement. Pour commencer prudemment, testez un petit lot ou un échantillon avant une grosse commande.' },
      { question: 'Comment choisir un bon fournisseur sur Alibaba ?', answer: 'Vérifiez l\'identité de l\'entreprise, demandez des preuves de production, commencez par un échantillon et utilisez un intermédiaire de confiance pour le paiement.' },
      { question: 'Quel fret choisir pour Bamako ?', answer: 'Le fret aérien convient aux produits urgents ou légers. Le fret maritime convient aux gros volumes, meubles, machines et cartons lourds.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'Agent sourcing Chine pour le Mali' },
      { href: '/services/paiement-fournisseur-chine', label: 'Paiement fournisseur chinois' },
      { href: '/routes/china-to-mali', label: 'Fret Chine-Mali' },
      { href: '/calculateur', label: 'Calculateur fret Chine-Mali' },
    ],
  },
  en: {
    metaTitle: 'Import from China to Mali: complete 2026 guide',
    breadcrumb: 'Import from China to Mali',
    title: 'How to import from China to Mali safely',
    description: 'Practical 2026 guide to importing from China to Mali: choose a product, verify the supplier, pay safely, check quality, choose your freight and receive in Bamako.',
    keywords: 'import from China to Mali, how to import from China, buy from China Mali, China Mali supplier, China Mali freight',
    updatedAt: 'April 21, 2026',
    readTime: '8 min read',
    sections: [
      { title: '1. Choose a profitable product before looking for a supplier', body: 'The first mistake is starting on Alibaba at random. Start with the Malian market: selling price in Bamako, possible margin, competition, weight, fragility, regulations and how often people buy.', items: ['Compare the local price with the supplier price', 'Avoid very fragile products at first', 'Work out the freight before ordering', 'Check whether the product is sensitive or prohibited'] },
      { title: '2. Find a Chinese supplier without falling into a trap', body: 'Alibaba can lead you to good suppliers, but also to middlemen or risky sellers. Ask for real proof before paying.', items: ['Recent production photos and videos', 'A clear quote with quantity and lead time', 'A consistent company name', 'Written payment and shipping terms'] },
      { title: '3. Secure the supplier payment', body: 'Many suppliers ask for Alipay or a local bank transfer. Before paying, verify the supplier and keep proof. ChinaLink can help with payment and follow-up.', items: ['Do not pay a suspicious personal account', 'Ask for an invoice or confirmation', 'Keep the important messages', 'Avoid large deposits without checks'] },
      { title: '4. Check quality before shipping', body: 'A photo or video inspection before departure avoids bad surprises in Bamako. It should confirm the quantity, appearance, packaging and main product references.' },
      { title: '5. Choose air or sea freight to Bamako', body: 'Air freight is fast and suits small volumes. Sea freight costs less for large volumes but is slower. The right choice depends on your margin, urgency and type of goods.' },
      { title: '6. Prepare to receive in Mali', body: 'Before arrival, confirm the receiving contact, address, documents, any specific fees and how the freight will be paid.' },
    ],
    faqs: [
      { question: 'What budget do I need to start importing from China to Mali?', answer: 'It depends on the product, the minimum order, the transport mode and the payment fees. To start carefully, test a small batch or a sample before a large order.' },
      { question: 'How do I choose a good supplier on Alibaba?', answer: 'Verify the company\'s identity, ask for proof of production, start with a sample and use a trusted intermediary for payment.' },
      { question: 'Which freight should I choose for Bamako?', answer: 'Air freight suits urgent or light products. Sea freight suits large volumes, furniture, machines and heavy cartons.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'China sourcing agent for Mali' },
      { href: '/services/paiement-fournisseur-chine', label: 'Chinese supplier payment' },
      { href: '/routes/china-to-mali', label: 'China to Mali freight' },
      { href: '/calculateur', label: 'China to Mali freight calculator' },
    ],
  },
  zh: {
    metaTitle: '从中国进口到马里：2026 年完整指南',
    breadcrumb: '从中国进口到马里',
    title: '如何安全地从中国进口到马里',
    description: '2026 年从中国进口到马里的实用指南：选择产品、核验供应商、安全付款、检查质量、选择运输方式并在巴马科收货。',
    keywords: '从中国进口到马里, 如何从中国进口, 中国马里采购, 中国马里供应商, 中国马里货运',
    updatedAt: '2026 年 4 月 21 日',
    readTime: '阅读时间：8 分钟',
    sections: [
      { title: '1. 寻找供应商前先选择有利润的产品', body: '第一个错误是随意从 Alibaba 开始。应先从马里市场入手：巴马科的售价、可能的利润、竞争、重量、易碎程度、法规和需求频率。', items: ['比较本地价格和供应商价格', '开始时避免过于易碎的产品', '下单前计算运费', '确认产品是否敏感或被禁止'] },
      { title: '2. 寻找中国供应商，避免上当', body: 'Alibaba 能带您找到好的供应商，也可能遇到中间商或高风险卖家。付款前请索取真实证明。', items: ['近期生产照片和视频', '注明数量和交期的清晰报价', '一致的公司名称', '书面的付款和发货条款'] },
      { title: '3. 保障供应商付款', body: '许多供应商要求支付宝或本地转账。付款前请核验供应商并保留凭证。ChinaLink 可协助付款和跟进。', items: ['不要向可疑的个人账户付款', '索取发票或确认', '保留重要沟通记录', '避免未经检查就支付大额定金'] },
      { title: '4. 发货前检查质量', body: '出发前的照片或视频检验可避免在巴马科遇到意外。检查应确认数量、外观、包装和主要型号。' },
      { title: '5. 选择空运或海运到巴马科', body: '空运速度快，适合小货量。海运对大货量更经济，但速度较慢。正确的选择取决于利润、紧急程度和货物类型。' },
      { title: '6. 准备在马里收货', body: '到货前，请确认收货联系人、地址、文件、可能的特殊费用和运费支付方式。' },
    ],
    faqs: [
      { question: '开始从中国进口到马里需要多少预算？', answer: '预算取决于产品、最小起订量、运输方式和付款费用。为谨慎起见，在大额订单前先测试小批量或样品。' },
      { question: '如何在 Alibaba 上选择好的供应商？', answer: '核验公司身份，索取生产证明，从样品开始，并通过可信赖的中间方付款。' },
      { question: '去巴马科应该选择哪种运输方式？', answer: '空运适合紧急或轻便的产品。海运适合大批量、家具、机器和重型纸箱。' },
    ],
    links: [
      { href: '/services/sourcing', label: '面向马里的中国采购代理' },
      { href: '/services/paiement-fournisseur-chine', label: '中国供应商付款' },
      { href: '/routes/china-to-mali', label: '中国—马里货运' },
      { href: '/calculateur', label: '中国—马里运费计算器' },
    ],
  },
  ar: {
    metaTitle: 'الاستيراد من الصين إلى مالي: الدليل الكامل 2026',
    breadcrumb: 'الاستيراد من الصين إلى مالي',
    title: 'كيف تستورد من الصين إلى مالي بأمان',
    description: 'دليل عملي لعام 2026 للاستيراد من الصين إلى مالي: اختيار المنتج والتحقق من المورد والدفع بأمان وفحص الجودة واختيار طريقة الشحن والاستلام في باماكو.',
    keywords: 'الاستيراد من الصين إلى مالي، كيفية الاستيراد من الصين، الشراء من الصين إلى مالي، مورد من الصين إلى مالي، الشحن من الصين إلى مالي',
    updatedAt: '21 أبريل 2026',
    readTime: 'وقت القراءة: 8 دقائق',
    sections: [
      { title: '1. اختر منتجًا مربحًا قبل البحث عن مورد', body: 'الخطأ الأول هو البدء من Alibaba عشوائيًا. ابدأ من السوق المالية: سعر البيع في باماكو والهامش الممكن والمنافسة والوزن والهشاشة واللوائح وتكرار الطلب.', items: ['قارن السعر المحلي بسعر المورد', 'تجنب المنتجات شديدة الهشاشة في البداية', 'احسب الشحن قبل الطلب', 'تحقق مما إذا كان المنتج حساسًا أو محظورًا'] },
      { title: '2. اعثر على مورد صيني دون الوقوع في فخ', body: 'يمكن أن توصلك Alibaba إلى موردين جيدين، لكن أيضًا إلى وسطاء أو بائعين محفوفين بالمخاطر. اطلب أدلة حقيقية قبل الدفع.', items: ['صور وفيديوهات حديثة للإنتاج', 'عرض سعر واضح بالكمية والمدة', 'اسم شركة متسق', 'شروط دفع وشحن مكتوبة'] },
      { title: '3. أمّن الدفع للمورد', body: 'يطلب كثير من الموردين Alipay أو تحويلًا محليًا. قبل الدفع، تحقق من المورد واحتفظ بإثبات. يمكن لـChinaLink تسهيل الدفع والمتابعة.', items: ['لا تدفع إلى حساب شخصي مشبوه', 'اطلب فاتورة أو تأكيدًا', 'احتفظ بالمراسلات المهمة', 'تجنب الدفعات المقدمة الكبيرة دون فحص'] },
      { title: '4. افحص الجودة قبل الشحن', body: 'يجنبك الفحص بالصور أو الفيديو قبل المغادرة المفاجآت السيئة في باماكو. ويجب أن يؤكد الكمية والمظهر والتغليف والمراجع الأساسية.' },
      { title: '5. اختر الشحن الجوي أو البحري إلى باماكو', body: 'الشحن الجوي سريع ومناسب للكميات الصغيرة. والبحري أوفر للكميات الكبيرة لكنه أبطأ. ويعتمد الاختيار الصحيح على الهامش والاستعجال ونوع البضاعة.' },
      { title: '6. استعد للاستلام في مالي', body: 'قبل الوصول، أكد جهة الاستلام والعنوان والمستندات وأي رسوم خاصة وطريقة دفع الشحن.' },
    ],
    faqs: [
      { question: 'ما الميزانية اللازمة لبدء الاستيراد من الصين إلى مالي؟', answer: 'تعتمد الميزانية على المنتج والحد الأدنى للطلب وطريقة النقل ورسوم الدفع. لتبدأ بحذر، جرّب دفعة صغيرة أو عينة قبل طلب كبير.' },
      { question: 'كيف أختار موردًا جيدًا في Alibaba؟', answer: 'تحقق من هوية الشركة، واطلب أدلة الإنتاج، وابدأ بعينة، واستعن بوسيط موثوق للدفع.' },
      { question: 'أي طريقة شحن أختار إلى باماكو؟', answer: 'الشحن الجوي مناسب للمنتجات العاجلة أو الخفيفة. والبحري مناسب للكميات الكبيرة والأثاث والآلات والكراتين الثقيلة.' },
    ],
    links: [
      { href: '/services/sourcing', label: 'وكيل توريد في الصين لمالي' },
      { href: '/services/paiement-fournisseur-chine', label: 'الدفع لمورد صيني' },
      { href: '/routes/china-to-mali', label: 'الشحن من الصين إلى مالي' },
      { href: '/calculateur', label: 'حاسبة الشحن من الصين إلى مالي' },
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

export default async function ImportGuidePage({ params }: Props) {
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
