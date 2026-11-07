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

interface Props {
  params: Promise<{ locale: string }>;
}

const cargoContent = {
  fr: {
    metaTitle: 'Cargo Chine Mali | Fret Aérien & Maritime',
    metaDescription:
      "Transitaire spécialisé pour l'envoi de cargo de la Chine vers le Mali. Fret aérien 14-21 jours, conteneur maritime 60-75 jours vers Bamako. Devis gratuit WhatsApp !",
    keywords:
      'cargo chine mali, fret chine mali, envoi colis chine mali, transitaire bamako, fret chine bamako, conteneur chine mali, expedition chine bamako, cargo aerien bamako, import chine mali',
    badge: 'Cargo Chine-Mali',
    title: 'Envoyez votre cargo de la Chine vers le Mali',
    intro:
      "ChinaLink Express est le transitaire de référence pour l'envoi de cargo de la Chine vers le Mali. Que vous importiez pour votre entreprise, votre boutique ou un projet personnel, nous gérons l'ensemble du transport de porte à porte jusqu'à Bamako : sourcing, paiement fournisseur, fret aérien ou maritime, dédouanement et livraison.",
    highlights: [
      'Fret aérien 14-21 jours vers Bamako',
      'Conteneur maritime 60-75 jours FCL/LCL',
      'Sourcing, paiement et vérification fournisseur',
      'Suivi WhatsApp avec photos à chaque étape',
    ],
    sections: [
      {
        title: 'Options de fret : aérien vs maritime',
        body: 'Le choix entre fret aérien et maritime dépend de votre budget, de votre délai et du type de marchandise. Le fret aérien est idéal pour les colis urgents, les échantillons ou les produits de valeur. Le conteneur maritime est préférable pour les volumes importants.',
        items: ['Fret aérien : 14-21 jours', 'Conteneur FCL : 60-75 jours', 'Groupage LCL pour volumes moyens', 'Conseil personnalisé selon votre marge'],
      },
      {
        title: 'Ce qui est inclus dans chaque envoi',
        body: 'Nous réceptionnons, contrôlons, consolidons, photographions, expédions et suivons votre marchandise avec un support WhatsApp clair.',
        items: ['Réception en Chine', 'Inspection photo ou vidéo', 'Consolidation multi-fournisseurs', 'Dédouanement et livraison au Mali'],
      },
      {
        title: 'Bamako et Kampala',
        body: 'Bamako est notre hub principal, avec un bureau sur place. Nous livrons aussi à Kampala, en Ouganda.',
      },
    ],
    table: {
      headers: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink'],
      rows: [
        ['Trouver un transitaire fiable', 'Recherche longue et risquée', 'Transitaire spécialisé Chine-Afrique'],
        ['Payer un fournisseur chinois', 'Difficultés avec Alipay et virements', 'Paiement assisté et vérification fournisseur'],
        ['Consolider plusieurs achats', 'Colis éparpillés', 'Entrepôt en Chine + regroupement'],
        ['Suivre la livraison', 'Peu de visibilité', 'Photos et updates WhatsApp'],
      ],
    },
    process: [
      'Vous nous envoyez le lien produit, les quantités ou le devis fournisseur sur WhatsApp.',
      'Nous proposons un devis clair avec fret aérien et maritime, délais et taxes incluses.',
      'Nous réceptionnons, inspectons, consolidons et expédions votre cargo.',
      'Nous suivons l’arrivée et coordonnons la livraison finale.',
    ],
    faqs: [
      { question: 'Combien de temps prend le cargo de la Chine vers le Mali ?', answer: "Le fret aérien prend entre 14 et 21 jours jusqu'à Bamako. Le maritime prend généralement 60 à 75 jours selon le port et le transit terrestre." },
      { question: 'Quel est le prix du cargo Chine-Mali ?', answer: 'Le tarif dépend du mode, du poids, du volume et du type de marchandise. Envoyez-nous vos détails sur WhatsApp pour une estimation précise.' },
      { question: 'Puis-je suivre mon cargo pendant le transport ?', answer: 'Oui. Vous recevez des mises à jour WhatsApp avec photos aux étapes importantes.' },
    ],
    links: [
      { href: '/fr/routes/china-to-mali', label: 'Route fret Chine-Mali' },
      { href: '/fr/services/air-freight', label: 'Fret aérien Chine-Afrique' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/calculateur', label: 'Calculer le coût de fret' },
    ],
    pageLabels: {},
  },
  en: {
    metaTitle: 'China to Mali Cargo | Air & Sea Freight for West Africa',
    metaDescription:
      'Specialist China-to-Mali and China-to-West-Africa cargo support. Air freight in 14-21 days, sea freight in 60-75 days, sourcing, supplier payment, consolidation and WhatsApp tracking.',
    keywords:
      'China to Mali cargo, shipping from China to Mali, China Africa freight, air freight China Mali, sea freight China Mali, China to West Africa shipping, freight forwarder Bamako',
    badge: 'China to Mali Cargo',
    title: 'Ship cargo from China to Mali and West Africa',
    intro:
      'ChinaLink Express helps African importers move goods from China to Mali and West Africa with one coordinated process: sourcing, supplier payment, inspection, consolidation, air freight, sea freight, customs coordination and final delivery support. Mali is our strongest hub, with routes extending across West Africa.',
    highlights: [
      'Air freight to Bamako in 14-21 days',
      'FCL/LCL sea freight in 60-75 days',
      'Supplier sourcing, payment and verification',
      'WhatsApp tracking with photo updates',
    ],
    sections: [
      {
        title: 'Freight options: air vs sea',
        body: 'The right mode depends on budget, timeline and product type. Air freight is best for urgent parcels, samples and high-value goods. Sea freight is better for larger volumes, furniture, machinery and heavy cartons.',
        items: ['Air freight: 14-21 days', 'FCL container: 60-75 days', 'LCL consolidation for medium volumes', 'Route advice based on your margin'],
      },
      {
        title: 'What is included in each shipment',
        body: 'We receive, inspect, consolidate, photograph, ship and track your goods with clear WhatsApp support throughout the process.',
        items: ['Receiving in China', 'Photo or video inspection', 'Multi-supplier consolidation', 'Customs and delivery coordination'],
      },
      {
        title: 'Bamako and Kampala',
        body: 'Bamako is our main hub, with an office on site. We also deliver to Kampala, Uganda.',
      },
    ],
    table: {
      headers: ['Need', 'Without ChinaLink', 'With ChinaLink'],
      rows: [
        ['Find a reliable freight partner', 'Long and risky search', 'China-Africa freight specialist'],
        ['Pay a Chinese supplier', 'Alipay and transfer issues', 'Assisted payment and supplier checks'],
        ['Consolidate several purchases', 'Scattered parcels', 'China-side warehouse and grouping'],
        ['Track the delivery', 'Limited visibility', 'Photo updates on WhatsApp'],
      ],
    },
    process: [
      'Send us the product link, quantities or supplier quote on WhatsApp.',
      'We provide a clear air and sea freight quote with timeline and included costs.',
      'We receive, inspect, consolidate and ship your cargo from China.',
      'We track arrival and coordinate final delivery or pickup support.',
    ],
    faqs: [
      { question: 'How long does China to Mali cargo take?', answer: 'Air freight to Bamako usually takes 14 to 21 days. Sea freight usually takes 60 to 75 days depending on port handling and road transit.' },
      { question: 'How much does China to Mali cargo cost?', answer: 'Pricing depends on mode, weight, volume and product category. Send your shipment details on WhatsApp for a precise estimate.' },
      { question: 'Can I track my cargo during transit?', answer: 'Yes. You receive WhatsApp updates and photos at key shipment milestones.' },
    ],
    links: [
      { href: '/en/routes/china-to-mali', label: 'China to Mali route' },
      { href: '/en/routes/china-to-africa', label: 'China to Africa routes' },
      { href: '/en/services/air-freight', label: 'Air freight service' },
      { href: '/en/services/sea-freight', label: 'Sea freight service' },
    ],
    pageLabels: {
      ctaLabel: 'Get a quote on WhatsApp',
      routeCtaLabel: 'See China to Africa routes',
      routeCtaHref: '/en/routes/china-to-africa',
      comparisonTitle: 'Quick comparison',
      processTitle: 'Our process',
      faqTitle: 'Frequently asked questions',
      usefulLinksTitle: 'Useful links',
      asideTitle: 'Need advice before paying?',
      asideText: 'Send the supplier link, quantities and destination. Our team will reply on WhatsApp.',
      asideCtaLabel: 'Contact ChinaLink',
      stepLabel: 'Step',
    },
  },
  zh: {
    metaTitle: '中国马里货运 | 空运与海运',
    metaDescription:
      '专注于中国到马里货运的货代。空运 14-21 天，海运集装箱 60-75 天到巴马科。WhatsApp 免费报价！',
    keywords:
      '中国马里货运, 中国马里物流, 中国马里寄包裹, 巴马科货代, 中国巴马科货运, 中国马里集装箱, 中国巴马科发货, 巴马科空运, 中国马里进口',
    badge: '中国—马里货运',
    title: '把您的货物从中国运到马里',
    intro:
      'ChinaLink Express 是从中国向马里发货的专业货代。无论您是为公司、店铺还是个人项目进口，我们都负责门到门运输直至巴马科：采购、供应商付款、空运或海运、清关和交付。',
    highlights: [
      '空运 14-21 天到巴马科',
      '海运集装箱 60-75 天（FCL/LCL）',
      '采购、付款与供应商核验',
      'WhatsApp 跟踪，每个阶段都有照片',
    ],
    sections: [
      {
        title: '运输方式：空运与海运对比',
        body: '选择空运还是海运，取决于您的预算、时间和货物类型。空运适合紧急包裹、样品或贵重产品；海运集装箱更适合大批量货物。',
        items: ['空运：14-21 天', '整箱 FCL：60-75 天', '中等货量可选拼箱 LCL', '根据您的利润提供个性化建议'],
      },
      {
        title: '每票货物包含的服务',
        body: '我们负责收货、检查、集运、拍照、发运并跟踪您的货物，并通过 WhatsApp 提供清晰的支持。',
        items: ['在中国收货', '照片或视频验货', '多供应商集运', '马里清关与交付'],
      },
      {
        title: '巴马科与坎帕拉',
        body: '巴马科是我们的主要枢纽，设有本地办公室。我们也送达乌干达坎帕拉。',
      },
    ],
    table: {
      headers: ['需求', '没有 ChinaLink', '有 ChinaLink'],
      rows: [
        ['寻找可靠的货代', '寻找过程漫长且有风险', '专注中国—非洲的货代'],
        ['向中国供应商付款', '支付宝和转账存在困难', '协助付款并核验供应商'],
        ['合并多笔采购', '包裹分散', '中国仓库 + 集运'],
        ['跟踪交付', '信息不透明', '照片和 WhatsApp 更新'],
      ],
    },
    process: [
      '您通过 WhatsApp 发送产品链接、数量或供应商报价。',
      '我们提供清晰的报价，包含空运和海运、时效及税费。',
      '我们收货、验货、集运并发运您的货物。',
      '我们跟踪到货情况并协调最终交付。',
    ],
    faqs: [
      { question: '从中国到马里的货运需要多长时间？', answer: '空运到巴马科需要 14 到 21 天。海运通常需要 60 到 75 天，具体取决于港口和陆路转运。' },
      { question: '中国到马里的货运价格是多少？', answer: '价格取决于运输方式、重量、体积和货物类型。请通过 WhatsApp 发送详情，以获得准确估价。' },
      { question: '运输途中我可以跟踪货物吗？', answer: '可以。在重要阶段，您会收到带照片的 WhatsApp 更新。' },
    ],
    links: [
      { href: '/zh/routes/china-to-mali', label: '中国—马里货运线路' },
      { href: '/zh/services/air-freight', label: '中国—非洲空运' },
      { href: '/zh/services/sea-freight', label: '集装箱海运' },
      { href: '/zh/calculateur', label: '计算运费' },
    ],
    pageLabels: {},
  },
  ar: {
    metaTitle: 'الشحن من الصين إلى مالي | جوًا وبحرًا',
    metaDescription:
      'وكيل شحن متخصص في نقل البضائع من الصين إلى مالي. شحن جوي خلال 14-21 يومًا، وحاوية بحرية خلال 60-75 يومًا إلى باماكو. عرض سعر مجاني عبر WhatsApp!',
    keywords:
      'الشحن من الصين إلى مالي، نقل البضائع من الصين إلى مالي، إرسال طرد من الصين إلى مالي، وكيل شحن في باماكو، الشحن من الصين إلى باماكو، حاوية من الصين إلى مالي، شحن جوي إلى باماكو، الاستيراد من الصين إلى مالي',
    badge: 'الشحن من الصين إلى مالي',
    title: 'اشحن بضائعك من الصين إلى مالي',
    intro:
      'ChinaLink Express وكيل شحن مرجعي لنقل البضائع من الصين إلى مالي. سواء كنت تستورد لشركتك أو متجرك أو مشروعك الشخصي، نتولى النقل كاملًا من الباب إلى الباب حتى باماكو: التوريد، والدفع للمورد، والشحن الجوي أو البحري، والتخليص الجمركي، والتسليم.',
    highlights: [
      'شحن جوي خلال 14-21 يومًا إلى باماكو',
      'حاوية بحرية خلال 60-75 يومًا (FCL/LCL)',
      'التوريد والدفع والتحقق من المورد',
      'متابعة عبر WhatsApp مع صور في كل مرحلة',
    ],
    sections: [
      {
        title: 'خيارات الشحن: جوي أم بحري',
        body: 'يعتمد الاختيار بين الشحن الجوي والبحري على ميزانيتك والوقت المتاح ونوع البضاعة. الشحن الجوي مثالي للطرود العاجلة والعينات والمنتجات الثمينة، أما الحاوية البحرية فهي الأنسب للكميات الكبيرة.',
        items: ['الشحن الجوي: 14-21 يومًا', 'حاوية كاملة FCL: 60-75 يومًا', 'شحن مجمّع LCL للكميات المتوسطة', 'نصيحة مخصصة حسب هامش ربحك'],
      },
      {
        title: 'ما تشمله كل شحنة',
        body: 'نستلم بضائعك ونفحصها ونجمعها ونصورها ونشحنها ونتابعها، مع دعم واضح عبر WhatsApp.',
        items: ['الاستلام في الصين', 'فحص بالصور أو الفيديو', 'تجميع البضائع من عدة موردين', 'التخليص الجمركي والتسليم في مالي'],
      },
      {
        title: 'باماكو وكمبالا',
        body: 'باماكو هي مركزنا الرئيسي، ولدينا مكتب فيها. ونوصل أيضًا إلى كمبالا في أوغندا.',
      },
    ],
    table: {
      headers: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink'],
      rows: [
        ['العثور على وكيل شحن موثوق', 'بحث طويل ومحفوف بالمخاطر', 'وكيل شحن متخصص بين الصين وأفريقيا'],
        ['الدفع لمورد صيني', 'صعوبات مع Alipay والتحويلات', 'مساعدة في الدفع والتحقق من المورد'],
        ['تجميع عدة مشتريات', 'طرود متفرقة', 'مستودع في الصين + تجميع'],
        ['متابعة التسليم', 'رؤية محدودة', 'صور وتحديثات عبر WhatsApp'],
      ],
    },
    process: [
      'ترسل إلينا عبر WhatsApp رابط المنتج أو الكميات أو عرض سعر المورد.',
      'نقدّم عرض سعر واضحًا يشمل الشحن الجوي والبحري والمدد والضرائب.',
      'نستلم بضائعك ونفحصها ونجمعها ونشحنها.',
      'نتابع الوصول وننسق التسليم النهائي.',
    ],
    faqs: [
      { question: 'كم يستغرق الشحن من الصين إلى مالي؟', answer: 'يستغرق الشحن الجوي من 14 إلى 21 يومًا حتى باماكو. أما البحري فيستغرق عادة من 60 إلى 75 يومًا حسب الميناء والعبور البري.' },
      { question: 'ما سعر الشحن من الصين إلى مالي؟', answer: 'يعتمد السعر على طريقة الشحن والوزن والحجم ونوع البضاعة. أرسل إلينا التفاصيل عبر WhatsApp للحصول على تقدير دقيق.' },
      { question: 'هل يمكنني متابعة بضائعي أثناء النقل؟', answer: 'نعم. تصلك تحديثات عبر WhatsApp مع صور في المراحل المهمة.' },
    ],
    links: [
      { href: '/ar/routes/china-to-mali', label: 'خط الشحن من الصين إلى مالي' },
      { href: '/ar/services/air-freight', label: 'الشحن الجوي من الصين إلى أفريقيا' },
      { href: '/ar/services/sea-freight', label: 'الشحن البحري بالحاويات' },
      { href: '/ar/calculateur', label: 'احسب كلفة الشحن' },
    ],
    pageLabels: {},
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const content = cargoContent[locale as Locale];

  return generatePageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    path: '/cargo-chine-mali',
    locale: locale as Locale,

  });
}

export default async function CargoChineMaliPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const content = cargoContent[locale as Locale];
  setRequestLocale(locale);

  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.metaTitle,
      serviceType: 'FreightForwardingService',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Place', name: 'West Africa' },
        { '@type': 'Country', name: 'China' },
      ],
      description: content.metaDescription,
    },
    generateBreadcrumbSchema(
      [
        { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
        { name: content.badge, url: `/${locale}/cargo-chine-mali` },
      ],
      locale as Locale
    ),
    generateFAQPageSchema([...content.faqs], locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <SeoServicePage
        locale={(locale as Locale)}
        badge={content.badge}
        title={content.title}
        intro={content.intro}
        highlights={content.highlights}
        sections={content.sections}
        table={content.table}
        process={content.process}
        faqs={content.faqs}
        links={content.links}
        {...content.pageLabels}
      />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
