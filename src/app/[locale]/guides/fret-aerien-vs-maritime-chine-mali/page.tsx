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

const slug = 'fret-aerien-vs-maritime-chine-mali';

const content: Record<Locale, GuideContent> = {
  fr: {
    metaTitle: 'Fret aérien vs maritime Chine-Mali | Prix et délais',
    breadcrumb: 'Fret aérien vs maritime',
    title: 'Fret aérien ou maritime Chine-Mali : prix, délais et choix',
    description: 'Comparez fret aérien et fret maritime de Chine vers le Mali : délais, coûts, produits adaptés, risques, calcul du poids et décision pour Bamako.',
    keywords: 'fret aérien vs maritime Chine Mali, fret Chine Mali prix, délai fret Chine Mali, cargo aérien Chine Mali, fret maritime Chine Mali',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 6 minutes',
    sections: [
      { title: 'Quand choisir le fret aérien', body: 'Choisissez l’aérien si la marchandise est urgente, légère, à forte marge ou nécessaire pour tester rapidement un produit sur le marché malien.', items: ['Délais 14-21 jours', 'Petits colis ou échantillons', 'Produits à rotation rapide', 'Budget plus élevé au kg'] },
      { title: 'Quand choisir le fret maritime', body: 'Choisissez le maritime pour les gros volumes, meubles, machines, cartons lourds ou commandes qui supportent un délai long. Le prix au volume devient plus compétitif.', items: ['Délais 60-75 jours', 'FCL ou LCL', 'Foshan → Dakar → Bamako', 'Meilleur pour gros volumes'] },
      { title: 'Attention au poids volumétrique', body: 'Un colis léger mais volumineux peut coûter cher en aérien. Mesurez longueur, largeur, hauteur et poids réel avant de décider.' },
      { title: 'Notre recommandation pratique', body: 'Testez en aérien quand vous découvrez un produit, puis passez en maritime quand la demande est validée et que les volumes augmentent.' },
    ],
    faqs: [
      { question: 'Quel est le plus rapide entre aérien et maritime ?', answer: 'Le fret aérien est le plus rapide, généralement 14 à 21 jours vers Bamako. Le maritime prend plutôt 60 à 75 jours.' },
      { question: 'Quel est le moins cher ?', answer: 'Le maritime est généralement moins cher pour les gros volumes. L’aérien reste intéressant pour les petits colis, produits urgents ou marges élevées.' },
      { question: 'Puis-je mélanger aérien et maritime ?', answer: 'Oui. Beaucoup d’importateurs envoient les échantillons ou produits urgents par avion, puis les gros volumes par bateau.' },
    ],
    links: [
      { href: '/services/air-freight', label: 'Fret aérien Chine-Mali' },
      { href: '/services/sea-freight', label: 'Fret maritime Chine-Mali' },
      { href: '/calculateur', label: 'Calculer le prix du fret' },
      { href: '/routes/china-to-mali', label: 'Route Chine vers Bamako' },
    ],
  },
  en: {
    metaTitle: 'Air vs sea freight China to Mali | Prices and transit times',
    breadcrumb: 'Air vs sea freight',
    title: 'Air or sea freight from China to Mali: prices, timing and choice',
    description: 'Compare air and sea freight from China to Mali: transit times, costs, suitable products, risks, weight calculation and the right decision for Bamako.',
    keywords: 'air vs sea freight China Mali, China Mali freight price, China Mali transit time, China Mali air cargo, China Mali sea freight',
    updatedAt: 'April 21, 2026',
    readTime: '6 min read',
    sections: [
      { title: 'When to choose air freight', body: 'Choose air if the goods are urgent, light, high-margin or needed to quickly test a product on the Malian market.', items: ['14-21 days', 'Small parcels or samples', 'Fast-selling products', 'Higher budget per kg'] },
      { title: 'When to choose sea freight', body: 'Choose sea for large volumes, furniture, machines, heavy cartons or orders that can wait. The price per volume becomes more competitive.', items: ['60-75 days', 'FCL or LCL', 'Foshan → Dakar → Bamako', 'Best for large volumes'] },
      { title: 'Watch the volumetric weight', body: 'A light but bulky parcel can cost a lot by air. Measure length, width, height and actual weight before deciding.' },
      { title: 'Our practical recommendation', body: 'Test by air when you are trying out a product, then move to sea once demand is confirmed and volumes grow.' },
    ],
    faqs: [
      { question: 'Which is faster, air or sea?', answer: 'Air freight is faster, usually 14 to 21 days to Bamako. Sea freight takes about 60 to 75 days.' },
      { question: 'Which is cheaper?', answer: 'Sea is usually cheaper for large volumes. Air remains useful for small parcels, urgent products or high margins.' },
      { question: 'Can I mix air and sea?', answer: 'Yes. Many importers send samples or urgent products by air, then large volumes by sea.' },
    ],
    links: [
      { href: '/services/air-freight', label: 'China to Mali air freight' },
      { href: '/services/sea-freight', label: 'China to Mali sea freight' },
      { href: '/calculateur', label: 'Calculate the freight price' },
      { href: '/routes/china-to-mali', label: 'China to Bamako route' },
    ],
  },
  zh: {
    metaTitle: '中国—马里空运与海运 | 价格和时效',
    breadcrumb: '空运与海运',
    title: '中国到马里选空运还是海运：价格、时效和选择',
    description: '比较从中国到马里的空运和海运：时效、成本、适合的产品、风险、重量计算以及去巴马科的决策。',
    keywords: '中国马里空运与海运, 中国马里运费价格, 中国马里运输时效, 中国马里空运, 中国马里海运',
    updatedAt: '2026 年 4 月 21 日',
    readTime: '阅读时间：6 分钟',
    sections: [
      { title: '何时选择空运', body: '如果货物紧急、轻便、利润高，或需要在马里市场快速测试产品，请选择空运。', items: ['时效 14-21 天', '小包裹或样品', '周转快的产品', '每公斤预算较高'] },
      { title: '何时选择海运', body: '大批量、家具、机器、重型纸箱或可以接受较长时效的订单，请选择海运。按体积计价更有竞争力。', items: ['时效 60-75 天', 'FCL 或 LCL', '佛山 → 达喀尔 → 巴马科', '最适合大批量'] },
      { title: '注意体积重量', body: '轻但体积大的包裹空运可能很贵。决定前请测量长度、宽度、高度和实际重量。' },
      { title: '我们的实用建议', body: '尝试新产品时先用空运测试，需求确认且货量增长后再转为海运。' },
    ],
    faqs: [
      { question: '空运和海运哪个更快？', answer: '空运更快，通常 14 到 21 天到巴马科。海运大约需要 60 到 75 天。' },
      { question: '哪个更便宜？', answer: '大批量时海运通常更便宜。空运仍适合小包裹、紧急产品或高利润产品。' },
      { question: '我可以同时使用空运和海运吗？', answer: '可以。许多进口商用空运发送样品或紧急产品，再用海运发送大批量货物。' },
    ],
    links: [
      { href: '/services/air-freight', label: '中国—马里空运' },
      { href: '/services/sea-freight', label: '中国—马里海运' },
      { href: '/calculateur', label: '计算运费' },
      { href: '/routes/china-to-mali', label: '中国到巴马科线路' },
    ],
  },
  ar: {
    metaTitle: 'الشحن الجوي مقابل البحري من الصين إلى مالي | الأسعار والمدد',
    breadcrumb: 'الشحن الجوي مقابل البحري',
    title: 'الشحن الجوي أم البحري من الصين إلى مالي: الأسعار والمدد والاختيار',
    description: 'قارن الشحن الجوي والبحري من الصين إلى مالي: المدد والتكاليف والمنتجات المناسبة والمخاطر وحساب الوزن والقرار المناسب لباماكو.',
    keywords: 'الشحن الجوي مقابل البحري من الصين إلى مالي، سعر الشحن من الصين إلى مالي، مدة الشحن من الصين إلى مالي، الشحن الجوي من الصين إلى مالي، الشحن البحري من الصين إلى مالي',
    updatedAt: '21 أبريل 2026',
    readTime: 'وقت القراءة: 6 دقائق',
    sections: [
      { title: 'متى تختار الشحن الجوي', body: 'اختر الجوي إذا كانت البضاعة عاجلة أو خفيفة أو عالية الهامش أو لازمة لتجربة منتج بسرعة في السوق المالية.', items: ['المدة 14-21 يومًا', 'طرود صغيرة أو عينات', 'منتجات سريعة الدوران', 'ميزانية أعلى لكل كغ'] },
      { title: 'متى تختار الشحن البحري', body: 'اختر البحري للكميات الكبيرة والأثاث والآلات والكراتين الثقيلة أو الطلبات التي تحتمل مدة طويلة. ويصبح السعر بالحجم أكثر تنافسية.', items: ['المدة 60-75 يومًا', 'FCL أو LCL', 'فوشان ← داكار ← باماكو', 'الأفضل للكميات الكبيرة'] },
      { title: 'انتبه إلى الوزن الحجمي', body: 'قد يكلف الطرد الخفيف كبير الحجم كثيرًا في الشحن الجوي. قس الطول والعرض والارتفاع والوزن الفعلي قبل أن تقرر.' },
      { title: 'توصيتنا العملية', body: 'جرّب جوًا عندما تكتشف منتجًا، ثم انتقل إلى البحري عندما يتأكد الطلب وتزيد الكميات.' },
    ],
    faqs: [
      { question: 'أيهما أسرع، الجوي أم البحري؟', answer: 'الشحن الجوي أسرع، عادة من 14 إلى 21 يومًا إلى باماكو. ويستغرق البحري نحو 60 إلى 75 يومًا.' },
      { question: 'أيهما أرخص؟', answer: 'البحري أرخص عادة للكميات الكبيرة. ويبقى الجوي مفيدًا للطرود الصغيرة والمنتجات العاجلة أو الهوامش العالية.' },
      { question: 'هل يمكنني الجمع بين الجوي والبحري؟', answer: 'نعم. يرسل كثير من المستوردين العينات أو المنتجات العاجلة جوًا، ثم الكميات الكبيرة بحرًا.' },
    ],
    links: [
      { href: '/services/air-freight', label: 'الشحن الجوي من الصين إلى مالي' },
      { href: '/services/sea-freight', label: 'الشحن البحري من الصين إلى مالي' },
      { href: '/calculateur', label: 'احسب سعر الشحن' },
      { href: '/routes/china-to-mali', label: 'الطريق من الصين إلى باماكو' },
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

export default async function FreightComparisonGuidePage({ params }: Props) {
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
