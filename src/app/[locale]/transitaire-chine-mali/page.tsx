import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';
import { fetchBackendPricing } from '@/features/pricing/lib/livePricing';

/** The page text with {SEA_RATE} / {AIR_*} placeholders replaced by the live published rates. */
async function localized(locale: Locale): Promise<(typeof content)[Locale]> {
  const { sea, air } = await fetchBackendPricing();
  const fmt = (n: number) => (locale === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('en-US').replaceAll(',', locale === 'ar' ? '\u00A0' : ' '));
  const text = JSON.stringify(content[locale])
    .replaceAll('{SEA_RATE}', fmt(sea.ratePerCbm))
    .replaceAll('{AIR_STD}', fmt(air.standard))
    .replaceAll('{AIR_ELEC}', fmt(air.electronics))
    .replaceAll('{AIR_PHONE}', fmt(air.phones));
  return JSON.parse(text);
}

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    metaTitle: 'Transitaire Chine Mali | Fret Aérien et Maritime vers Bamako',
    metaDescription:
      'Transitaire Chine Mali : entrepôts à Guangzhou et Foshan, fret aérien en 14 à 21 jours, maritime en 60 à 75 jours, dédouanement et remise à Bamako. Tarifs publics et photos vérifiables.',
    keywords:
      'transitaire chine mali, transitaire chine bamako, transitaire bamako, cargo chine mali, fret chine mali, agent de fret chine mali',
    badge: 'Transitaire Chine Mali',
    title: 'Votre transitaire de la Chine au Mali',
    intro:
      "Un transitaire prend en charge le transport de vos marchandises et les démarches qui vont avec. ChinaLink Express le fait sur un seul corridor : la Chine et le Mali. Vos fournisseurs livrent à nos entrepôts de Guangzhou pour l'aérien ou de Foshan pour le maritime, et nous nous occupons de la suite jusqu'à Bamako.",
    highlights: [
      'Fret aérien : 14 à 21 jours jusqu’à Bamako',
      'Fret maritime : 60 à 75 jours, dédouanement inclus',
      'Tarifs publics : {AIR_STD} F CFA/kg en aérien, {SEA_RATE} F CFA/CBM en maritime',
      'Photos de réception avec code de vérification',
    ],
    sections: [
      {
        title: 'Ce que fait votre transitaire',
        body: 'Du moment où votre fournisseur livre jusqu’au moment où vous récupérez la marchandise, vous gardez un seul interlocuteur.',
        items: ['Réception, pesée et photos à l’entrepôt', 'Regroupement de plusieurs fournisseurs', 'Expédition aérienne ou maritime', 'Dédouanement et remise à Bamako'],
      },
      {
        title: 'Comment choisir un transitaire Chine Mali',
        body: 'Avant de confier vos marchandises, demandez des tarifs écrits, une adresse d’entrepôt précise et une preuve de réception que vous pouvez vérifier. Chez ChinaLink, les tarifs sont publiés, les adresses sont dans l’application et chaque photo de réception porte un code à vérifier sur notre site.',
      },
    ],
    table: {
      headers: ['Mode', 'Tarif', 'Délai annoncé'],
      rows: [
        ['Air Standard', '{AIR_STD} F CFA / kg', '14 à 21 jours'],
        ['Électronique', '{AIR_ELEC} F CFA / kg', '14 à 21 jours'],
        ['Téléphones', '{AIR_PHONE} F CFA / pièce', '14 à 21 jours'],
        ['Maritime', '{SEA_RATE} F CFA / CBM', '60 à 75 jours'],
      ],
    },
    process: [
      'Envoyez-nous sur WhatsApp ce que vous voulez expédier.',
      'Votre fournisseur livre à notre entrepôt avec votre marque d’expédition sur chaque carton.',
      'Nous réceptionnons, photographions et expédions, et chaque étape vous est notifiée.',
      'Vous réglez le solde et récupérez vos marchandises à Bamako.',
    ],
    faqs: [
      { question: 'Quel transitaire choisir de la Chine vers le Mali ?', answer: 'Choisissez un transitaire qui publie ses tarifs, donne une adresse d’entrepôt précise et fournit une preuve de réception vérifiable. ChinaLink Express publie ses tarifs et chaque photo de réception porte un code de vérification.' },
      { question: 'Combien coûte un transitaire Chine Mali ?', answer: 'Nos tarifs publics vont de {AIR_STD} F CFA/kg en Air Standard à {AIR_ELEC} F CFA/kg pour l’électronique, et {SEA_RATE} F CFA/CBM en maritime. Le poids ou le volume facturé est confirmé à l’entrepôt.' },
      { question: 'Où mon fournisseur doit-il livrer ?', answer: 'À Guangzhou pour l’aérien et à Foshan pour le maritime. Les adresses exactes et votre marque d’expédition sont disponibles dans l’application ChinaLink Express.' },
    ],
    links: [
      { href: '/fr/cargo-chine-mali', label: 'Cargo Chine Mali' },
      { href: '/fr/tarifs', label: 'Tarifs d’expédition' },
      { href: '/fr/calculateur', label: 'Calculer le coût de fret' },
      { href: '/fr/verifier', label: 'Vérifier une photo' },
    ],
    pageLabels: {},
  },
  en: {
    metaTitle: 'China to Mali Freight Forwarder | Air and Sea Freight to Bamako',
    metaDescription:
      'China to Mali freight forwarder: warehouses in Guangzhou and Foshan, air freight in 14 to 21 days, sea freight in 60 to 75 days, customs clearance and handover in Bamako. Published rates and verifiable photos.',
    keywords:
      'China Mali freight forwarder, freight forwarder China Bamako, China Mali cargo, shipping from China to Mali, freight forwarder China Africa',
    badge: 'China to Mali freight forwarder',
    title: 'Your freight forwarder from China to Mali',
    intro:
      'A freight forwarder handles moving your goods and the formalities that come with it. ChinaLink Express does this on one corridor: China and Mali. Your suppliers deliver to our Guangzhou warehouse for air freight or our Foshan warehouse for sea freight, and we handle the rest through to Bamako.',
    highlights: [
      'Air freight: 14 to 21 days to Bamako',
      'Sea freight: 60 to 75 days, customs clearance included',
      'Published rates: {AIR_STD} F CFA/kg by air, {SEA_RATE} F CFA/CBM by sea',
      'Reception photos with a verification code',
    ],
    sections: [
      {
        title: 'What your freight forwarder does',
        body: 'From the moment your supplier delivers to the moment you collect the goods, you keep one point of contact.',
        items: ['Receiving, weighing and photos at the warehouse', 'Consolidating several suppliers', 'Air or sea shipment', 'Customs clearance and handover in Bamako'],
      },
      {
        title: 'How to choose a China to Mali freight forwarder',
        body: 'Before handing over your goods, ask for written rates, an exact warehouse address and proof of receipt you can check. At ChinaLink, rates are published, addresses are in the app and every reception photo carries a code you can verify on our site.',
      },
    ],
    table: {
      headers: ['Mode', 'Rate', 'Stated transit'],
      rows: [
        ['Air Standard', '{AIR_STD} F CFA / kg', '14 to 21 days'],
        ['Electronics', '{AIR_ELEC} F CFA / kg', '14 to 21 days'],
        ['Phones', '{AIR_PHONE} F CFA / piece', '14 to 21 days'],
        ['Sea', '{SEA_RATE} F CFA / CBM', '60 to 75 days'],
      ],
    },
    process: [
      'Tell us on WhatsApp what you want to ship.',
      'Your supplier delivers to our warehouse with your shipping mark on every carton.',
      'We receive, photograph and ship, and you are notified at each stage.',
      'You settle the balance and collect your goods in Bamako.',
    ],
    faqs: [
      { question: 'Which freight forwarder should I choose from China to Mali?', answer: 'Choose one that publishes its rates, gives an exact warehouse address and provides verifiable proof of receipt. ChinaLink Express publishes its rates and every reception photo carries a verification code.' },
      { question: 'How much does a China to Mali freight forwarder cost?', answer: 'Our published rates run from {AIR_STD} F CFA/kg for Air Standard to {AIR_ELEC} F CFA/kg for electronics, and {SEA_RATE} F CFA/CBM by sea. The billed weight or volume is confirmed at the warehouse.' },
      { question: 'Where should my supplier deliver?', answer: 'To Guangzhou for air freight and Foshan for sea freight. The exact addresses and your shipping mark are in the ChinaLink Express app.' },
    ],
    links: [
      { href: '/en/cargo-chine-mali', label: 'China to Mali cargo' },
      { href: '/en/tarifs', label: 'Shipping rates' },
      { href: '/en/calculateur', label: 'Freight cost calculator' },
      { href: '/en/verifier', label: 'Verify a photo' },
    ],
    pageLabels: {
      ctaLabel: 'Get a quote on WhatsApp',
      routeCtaLabel: 'See China to Mali route',
      routeCtaHref: '/en/cargo-chine-mali',
      comparisonTitle: 'Published rates',
      processTitle: 'Our process',
      faqTitle: 'Frequently asked questions',
      usefulLinksTitle: 'Useful links',
      asideTitle: 'Need advice before paying?',
      asideText: 'Send the supplier link and quantities. Our team will reply on WhatsApp.',
      asideCtaLabel: 'Contact ChinaLink',
      stepLabel: 'Step',
    },
  },
  zh: {
    metaTitle: '中国马里货代 | 空运和海运到巴马科',
    metaDescription:
      '中国马里货代：广州和佛山仓库，空运 14 到 21 天，海运 60 到 75 天，清关并在巴马科交货。公开价格，照片可验证。',
    keywords:
      '中国马里货代, 中国巴马科货代, 巴马科货代, 中国马里货运, 中国马里物流, 中国马里货运代理',
    badge: '中国马里货代',
    title: '您从中国到马里的货代',
    intro:
      '货代负责运输您的货物并办理相关手续。ChinaLink Express 只专注一条走廊：中国和马里。您的供应商把空运货送到我们的广州仓库，把海运货送到我们的佛山仓库，后续直到巴马科都由我们负责。',
    highlights: [
      '空运：14 到 21 天到巴马科',
      '海运：60 到 75 天，含清关',
      '公开价格：空运 {AIR_STD} 西非法郎/公斤，海运 {SEA_RATE} 西非法郎/CBM',
      '带验证码的收货照片',
    ],
    sections: [
      {
        title: '您的货代做什么',
        body: '从供应商交货到您取货，全程只有一个对接人。',
        items: ['仓库收货、称重和拍照', '合并多家供应商的货物', '空运或海运发货', '清关并在巴马科交货'],
      },
      {
        title: '如何选择中国马里货代',
        body: '把货物交出去之前，请索取书面价格、准确的仓库地址和可验证的收货证明。在 ChinaLink，价格公开，地址在应用内，每张收货照片都有可在我们网站核验的代码。',
      },
    ],
    table: {
      headers: ['方式', '价格', '公布时效'],
      rows: [
        ['标准空运', '{AIR_STD} 西非法郎 / 公斤', '14 到 21 天'],
        ['电子产品', '{AIR_ELEC} 西非法郎 / 公斤', '14 到 21 天'],
        ['手机', '{AIR_PHONE} 西非法郎 / 件', '14 到 21 天'],
        ['海运', '{SEA_RATE} 西非法郎 / CBM', '60 到 75 天'],
      ],
    },
    process: [
      '通过 WhatsApp 告诉我们您要发什么货。',
      '您的供应商把货送到我们的仓库，每个纸箱贴上您的唛头。',
      '我们收货、拍照并发运，每个阶段都会通知您。',
      '您支付余款并在巴马科提货。',
    ],
    faqs: [
      { question: '从中国到马里应该选择哪家货代？', answer: '选择公开价格、提供准确仓库地址和可验证收货证明的货代。ChinaLink Express 公布价格，每张收货照片都带验证码。' },
      { question: '中国马里货代收费多少？', answer: '我们的公开价格从标准空运 {AIR_STD} 西非法郎/公斤到电子产品 {AIR_ELEC} 西非法郎/公斤，海运为 {SEA_RATE} 西非法郎/CBM。计费重量或体积在仓库确认。' },
      { question: '我的供应商应该把货送到哪里？', answer: '空运送到广州，海运送到佛山。准确地址和您的唛头可在 ChinaLink Express 应用内查看。' },
    ],
    links: [
      { href: '/zh/cargo-chine-mali', label: '中国马里货运' },
      { href: '/zh/tarifs', label: '发货价格' },
      { href: '/zh/calculateur', label: '计算运费' },
      { href: '/zh/verifier', label: '验证照片' },
    ],
    pageLabels: {},
  },
  ar: {
    metaTitle: 'وكيل شحن من الصين إلى مالي | شحن جوي وبحري إلى باماكو',
    metaDescription:
      'وكيل شحن من الصين إلى مالي: مستودعات في قوانغتشو وفوشان، شحن جوي خلال 14 إلى 21 يومًا، بحري خلال 60 إلى 75 يومًا، تخليص جمركي وتسليم في باماكو. أسعار معلنة وصور قابلة للتحقق.',
    keywords:
      'وكيل شحن من الصين إلى مالي، وكيل شحن من الصين إلى باماكو، وكيل شحن في باماكو، الشحن من الصين إلى مالي، نقل البضائع من الصين إلى مالي، وكيل نقل من الصين إلى مالي',
    badge: 'وكيل شحن من الصين إلى مالي',
    title: 'وكيل شحنك من الصين إلى مالي',
    intro:
      'يتولى وكيل الشحن نقل بضائعك والإجراءات المرتبطة بها. وتقوم ChinaLink Express بذلك على ممر واحد: الصين ومالي. يسلم مورّدوك إلى مستودعنا في قوانغتشو للشحن الجوي أو في فوشان للشحن البحري، ونتولى الباقي حتى باماكو.',
    highlights: [
      'الشحن الجوي: 14 إلى 21 يومًا حتى باماكو',
      'الشحن البحري: 60 إلى 75 يومًا، التخليص الجمركي مشمول',
      'أسعار معلنة: 10 500 فرنك CFA/كغ جوًا، و300 000 فرنك CFA/CBM بحرًا',
      'صور استلام مع رمز تحقق',
    ],
    sections: [
      {
        title: 'ما يفعله وكيل شحنك',
        body: 'من لحظة تسليم المورد حتى استلامك البضاعة، يبقى لك مسؤول واحد للتواصل.',
        items: ['الاستلام والوزن والتصوير في المستودع', 'تجميع عدة موردين', 'الشحن الجوي أو البحري', 'التخليص الجمركي والتسليم في باماكو'],
      },
      {
        title: 'كيف تختار وكيل شحن من الصين إلى مالي',
        body: 'قبل تسليم بضائعك، اطلب أسعارًا مكتوبة وعنوان مستودع دقيقًا وإثبات استلام يمكنك التحقق منه. لدى ChinaLink الأسعار منشورة والعناوين في التطبيق وكل صورة استلام تحمل رمزًا يمكن التحقق منه على موقعنا.',
      },
    ],
    table: {
      headers: ['الطريقة', 'السعر', 'المدة المعلنة'],
      rows: [
        ['الشحن الجوي القياسي', '{AIR_STD} فرنك CFA / كغ', '14 إلى 21 يومًا'],
        ['الإلكترونيات', '{AIR_ELEC} فرنك CFA / كغ', '14 إلى 21 يومًا'],
        ['الهواتف', '{AIR_PHONE} فرنك CFA / قطعة', '14 إلى 21 يومًا'],
        ['الشحن البحري', '{SEA_RATE} فرنك CFA / CBM', '60 إلى 75 يومًا'],
      ],
    },
    process: [
      'أرسل إلينا عبر WhatsApp ما تريد شحنه.',
      'يسلم مورّدك إلى مستودعنا مع علامة الشحن الخاصة بك على كل كرتون.',
      'نستلم ونصور ونشحن، ويصلك إشعار بكل مرحلة.',
      'تسدد الرصيد وتستلم بضائعك في باماكو.',
    ],
    faqs: [
      { question: 'أي وكيل شحن أختار من الصين إلى مالي؟', answer: 'اختر وكيلًا ينشر أسعاره ويعطي عنوان مستودع دقيقًا ويقدم إثبات استلام قابلًا للتحقق. تنشر ChinaLink Express أسعارها وتحمل كل صورة استلام رمز تحقق.' },
      { question: 'كم يكلف وكيل الشحن من الصين إلى مالي؟', answer: 'تتراوح أسعارنا المعلنة من {AIR_STD} فرنك CFA/كغ للشحن الجوي القياسي إلى {AIR_ELEC} فرنك CFA/كغ للإلكترونيات، و{SEA_RATE} فرنك CFA/CBM للشحن البحري. ويتأكد الوزن أو الحجم المحتسب في المستودع.' },
      { question: 'أين يجب أن يسلم مورّدي؟', answer: 'في قوانغتشو للشحن الجوي وفي فوشان للشحن البحري. العناوين الدقيقة وعلامة الشحن الخاصة بك متاحة في تطبيق ChinaLink Express.' },
    ],
    links: [
      { href: '/ar/cargo-chine-mali', label: 'الشحن من الصين إلى مالي' },
      { href: '/ar/tarifs', label: 'أسعار الشحن' },
      { href: '/ar/calculateur', label: 'احسب كلفة الشحن' },
      { href: '/ar/verifier', label: 'التحقق من صورة' },
    ],
    pageLabels: {},
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = await localized(locale as Locale);
  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: '/transitaire-chine-mali',
    locale: locale as Locale,

  });
}

export default async function TransitaireChineMaliPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = await localized(locale as Locale);
  setRequestLocale(locale);

  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.metaTitle,
      serviceType: 'FreightForwardingService',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description: page.metaDescription,
    },
    generateBreadcrumbSchema(
      [
        { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
        { name: page.badge, url: `/${locale}/transitaire-chine-mali` },
      ],
      locale as Locale
    ),
    generateFAQPageSchema([...page.faqs], locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        locale={(locale as Locale)}
        badge={page.badge}
        title={page.title}
        intro={page.intro}
        highlights={page.highlights}
        sections={page.sections}
        table={page.table}
        process={page.process}
        faqs={page.faqs}
        links={page.links}
        {...page.pageLabels}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 300; // published sea rate refreshes within 5 minutes
