import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generatePageMetadata,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    metaTitle: 'Vérification fournisseur Chine | Inspection avant achat',
    metaDescription:
      'Vérifiez un fournisseur chinois avant de payer. ChinaLink Express contrôle les informations Alibaba, 1688, usine, certificats, échantillons et marchandises pour les importateurs maliens.',
    keywords:
      'vérification fournisseur Chine, inspection qualité Chine, fournisseur Alibaba fiable, contrôler fournisseur chinois Mali, verification fournisseur 1688, supplier verification China Africa',
    badge: 'Supplier verification',
    title: 'Vérifier un fournisseur chinois avant de payer',
    intro:
      'Avant de transférer de l’argent à un fournisseur en Chine, ChinaLink Express vous aide à vérifier les signaux essentiels : identité, capacité réelle, cohérence des prix, qualité annoncée, risques de fraude et options d’inspection avant expédition vers le Mali.',
    highlights: [
      'Contrôle Alibaba, 1688 et fournisseurs directs',
      'Vérification d’usine et de société selon les données disponibles',
      'Inspection photo avant expédition',
      'Conseils avant paiement fournisseur',
    ],
    sections: [
      {
        title: 'Ce que nous vérifions',
        body: 'Un fournisseur peut avoir de belles photos et un bon discours, mais cela ne suffit pas. Nous regardons les informations concrètes qui permettent de décider s’il faut avancer, demander un échantillon ou refuser.',
        items: ['Nom de société et coordonnées', 'Cohérence entre prix, quantité et qualité', 'Photos ou vidéos réelles', 'Capacité à préparer la commande et documents'],
      },
      {
        title: 'Alibaba, 1688 et fournisseurs directs',
        body: 'Alibaba est la plateforme internationale la plus utilisée, tandis que 1688 cible surtout le marché chinois. Chaque canal a ses risques. Nous adaptons la vérification selon la plateforme et le montant à engager.',
        items: ['Analyse de fiche fournisseur', 'Questions ciblées au vendeur', 'Contrôle du mode de paiement demandé', 'Signalement des prix irréalistes'],
      },
      {
        title: 'Inspection avant expédition',
        body: 'Quand la marchandise est prête, un contrôle photo ou vidéo permet de confirmer la quantité, l’emballage, l’apparence du produit et les erreurs visibles avant le départ vers Bamako.',
        items: ['Photos de cartons et références', 'Contrôle visuel de la qualité', 'Vérification emballage', 'Validation avant fret aérien ou maritime'],
      },
    ],
    tableHeaders: ['Point de contrôle', 'Risque si ignoré', 'Action ChinaLink'],
    tableRows: [
      ['Société fournisseur', 'Intermédiaire ou faux vendeur', 'Vérification de cohérence'],
      ['Prix trop bas', 'Qualité inférieure ou arnaque', 'Alerte avant paiement'],
      ['Photos produit', 'Produit non conforme', 'Demande de preuves réelles'],
      ['Commande prête', 'Erreur découverte trop tard', 'Inspection avant expédition'],
    ],
    process: [
      'Vous envoyez le lien fournisseur, les captures, le devis et les conditions de paiement.',
      'Nous analysons les signaux de risque et les informations disponibles.',
      'Nous contactons le fournisseur si nécessaire pour confirmer les détails.',
      'Vous recevez une recommandation claire : continuer, demander plus de preuves ou éviter.',
      'Si vous commandez, nous pouvons suivre le paiement, le contrôle qualité et le fret vers Bamako.',
    ],
    faqs: [
      {
        question: 'Comment savoir si un fournisseur chinois est fiable ?',
        answer: 'Il faut vérifier l’identité de l’entreprise, la cohérence des informations, les preuves de production, les avis, les photos réelles, les conditions de paiement et la capacité à fournir les documents demandés.',
      },
      {
        question: 'Pouvez-vous vérifier un fournisseur Alibaba ou 1688 ?',
        answer: 'Oui. Nous pouvons analyser les informations disponibles, contacter le fournisseur, demander des preuves, organiser un contrôle photo ou recommander une inspection plus poussée selon le montant.',
      },
      {
        question: 'La vérification garantit-elle qu’il n’y aura aucun problème ?',
        answer: 'Non, aucune vérification ne supprime tous les risques. Elle réduit fortement les erreurs évidentes et les arnaques fréquentes avant paiement.',
      },
      {
        question: 'Faut-il vérifier avant de commander un échantillon ?',
        answer: 'Oui, surtout si le fournisseur est nouveau. Un échantillon est utile, mais il doit être commandé auprès d’un fournisseur qui semble déjà crédible.',
      },
    ],
    links: [
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Payer un fournisseur chinois' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Acheter sur Alibaba depuis le Mali' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Acheter sur 1688 depuis le Mali' },
      { href: '/fr/services/sourcing', label: 'Service sourcing Chine' },
    ],
  },
  en: {
    metaTitle: 'China Supplier Verification | Alibaba & 1688 Inspection',
    metaDescription:
      'Verify Chinese suppliers before payment. ChinaLink Express checks Alibaba, 1688, company details, factory evidence, samples and goods for Mali and Africa importers.',
    keywords:
      'China supplier verification, verify Alibaba supplier, 1688 supplier check, China factory inspection, supplier verification Africa, quality inspection China Mali',
    badge: 'Supplier verification',
    title: 'Verify a Chinese supplier before you pay',
    intro:
      'Before sending money to a supplier in China, ChinaLink Express helps importers check the essential signals: company identity, real capacity, price consistency, stated quality, fraud risks and inspection options before shipping to Mali or Africa.',
    highlights: [
      'Alibaba, 1688 and direct supplier checks',
      'Company and factory verification where data is available',
      'Photo inspection before shipment',
      'Payment-risk advice before supplier transfer',
    ],
    sections: [
      {
        title: 'What we check',
        body: 'A supplier can have strong photos and convincing messages, but that is not enough. We review concrete signals that help you decide whether to proceed, ask for a sample, request more proof or walk away.',
        items: ['Company name and contact details', 'Price, quantity and quality consistency', 'Real photos or videos', 'Ability to prepare goods and documents'],
      },
      {
        title: 'Alibaba, 1688 and direct factories',
        body: 'Alibaba is common for international trade, while 1688 mainly serves the domestic Chinese market. Each channel has different risks, so the verification changes by platform and order value.',
        items: ['Supplier profile review', 'Targeted questions to the seller', 'Payment method risk check', 'Warning on unrealistic prices'],
      },
      {
        title: 'Inspection before shipping',
        body: 'When the goods are ready, a photo or video check can confirm quantity, packaging, product appearance and visible mistakes before the shipment leaves China.',
        items: ['Carton and reference photos', 'Visual quality control', 'Packaging check', 'Approval before air or sea freight'],
      },
    ],
    tableHeaders: ['Check point', 'Risk if ignored', 'ChinaLink action'],
    tableRows: [
      ['Supplier company', 'Middleman or fake seller', 'Consistency check'],
      ['Too-low price', 'Lower quality or scam', 'Warning before payment'],
      ['Product photos', 'Non-conforming product', 'Request real proof'],
      ['Goods ready', 'Mistake found too late', 'Inspection before shipment'],
    ],
    process: [
      'Send the supplier link, screenshots, quote and payment terms.',
      'We analyze risk signals and available information.',
      'We contact the supplier when needed to confirm key details.',
      'You receive a clear recommendation: continue, ask for more proof or avoid.',
      'If you order, we can follow payment, quality control and freight to Bamako.',
    ],
    faqs: [
      {
        question: 'How do I know if a Chinese supplier is reliable?',
        answer: 'You should check the company identity, consistency of information, production proof, reviews, real photos, payment terms and ability to provide requested documents.',
      },
      {
        question: 'Can you verify an Alibaba or 1688 supplier?',
        answer: 'Yes. We can analyze available information, contact the supplier, request proof, arrange photo checks or recommend deeper inspection based on the order value.',
      },
      {
        question: 'Does verification guarantee there will be no problem?',
        answer: 'No verification removes every risk. It strongly reduces obvious mistakes and common fraud signals before payment.',
      },
      {
        question: 'Should I verify before ordering a sample?',
        answer: 'Yes, especially for a new supplier. A sample helps, but it should come from a supplier that already looks credible.',
      },
    ],
    links: [
      { href: '/en/services/paiement-fournisseur-chine', label: 'Pay a Chinese supplier' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Alibaba buying guide' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: '1688 buying guide' },
      { href: '/en/services/sourcing', label: 'China sourcing service' },
    ],
  },
  zh: {
    metaTitle: '中国供应商核验 | 购买前检查',
    metaDescription:
      '付款前核验中国供应商。ChinaLink Express 为马里进口商检查 Alibaba、1688、工厂、证书、样品和货物信息。',
    keywords:
      '中国供应商核验, 中国质量检验, 可靠的 Alibaba 供应商, 马里核查中国供应商, 1688 供应商核验, 中国非洲供应商核验',
    badge: '供应商核验',
    title: '付款前核验中国供应商',
    intro:
      '在向中国供应商转账之前，ChinaLink Express 帮助您核验关键信号：身份、真实产能、价格一致性、宣称质量、诈骗风险，以及发往马里前的检验选项。',
    highlights: [
      '检查 Alibaba、1688 和直接供应商',
      '根据可用数据核验工厂和公司',
      '发货前照片检验',
      '向供应商付款前的建议',
    ],
    sections: [
      {
        title: '我们核验什么',
        body: '供应商可能有漂亮的照片和动听的说辞，但这还不够。我们查看具体信息，帮助决定是继续、索取样品还是拒绝。',
        items: ['公司名称和联系方式', '价格、数量和质量的一致性', '真实照片或视频', '备货能力和文件'],
      },
      {
        title: 'Alibaba、1688 和直接供应商',
        body: 'Alibaba 是使用最广泛的国际平台，而 1688 主要面向中国市场。每个渠道都有风险。我们根据平台和投入金额调整核验方式。',
        items: ['分析供应商资料', '向卖家提出针对性问题', '检查要求的付款方式', '提示不切实际的价格'],
      },
      {
        title: '发货前检验',
        body: '货物备好后，照片或视频检查可在发往巴马科前确认数量、包装、产品外观和可见错误。',
        items: ['纸箱和型号照片', '目视质量检查', '核验包装', '空运或海运前确认'],
      },
    ],
    tableHeaders: ['检查点', '忽略的风险', 'ChinaLink 的做法'],
    tableRows: [
      ['供应商公司', '中间商或假卖家', '一致性核验'],
      ['价格过低', '质量差或诈骗', '付款前提醒'],
      ['产品照片', '产品不符', '索取真实证明'],
      ['订单备好', '错误发现得太晚', '发货前检验'],
    ],
    process: [
      '您发送供应商链接、截图、报价和付款条件。',
      '我们分析风险信号和可用信息。',
      '必要时我们联系供应商确认细节。',
      '您会收到明确建议：继续、索取更多证明或避免。',
      '如果您下单，我们可以跟进付款、质量检查和发往巴马科的货运。',
    ],
    faqs: [
      {
        question: '如何知道中国供应商是否可靠？',
        answer: '需要核验公司身份、信息一致性、生产证明、评价、真实照片、付款条件以及提供所需文件的能力。',
      },
      {
        question: '你们可以核验 Alibaba 或 1688 供应商吗？',
        answer: '可以。我们可以分析可用信息、联系供应商、索取证明、安排照片检查，或根据金额建议更深入的检验。',
      },
      {
        question: '核验能保证不会有任何问题吗？',
        answer: '不能，任何核验都无法消除所有风险。但它能在付款前大幅减少明显错误和常见诈骗。',
      },
      {
        question: '订购样品前需要核验吗？',
        answer: '需要，尤其是新供应商。样品很有用，但应向看起来已有可信度的供应商订购。',
      },
    ],
    links: [
      { href: '/zh/services/paiement-fournisseur-chine', label: '向中国供应商付款' },
      { href: '/zh/guides/acheter-sur-alibaba-depuis-le-mali', label: '从马里在 Alibaba 购买' },
      { href: '/zh/guides/acheter-sur-1688-depuis-le-mali', label: '从马里在 1688 购买' },
      { href: '/zh/services/sourcing', label: '中国采购服务' },
    ],
  },
  ar: {
    metaTitle: 'التحقق من الموردين في الصين | فحص قبل الشراء',
    metaDescription:
      'تحقق من المورد الصيني قبل الدفع. تفحص ChinaLink Express معلومات Alibaba و1688 والمصنع والشهادات والعينات والبضائع للمستوردين الماليين.',
    keywords:
      'التحقق من الموردين في الصين، فحص الجودة في الصين، مورد Alibaba موثوق، فحص مورد صيني من مالي، التحقق من موردي 1688، التحقق من الموردين بين الصين وأفريقيا',
    badge: 'التحقق من المورد',
    title: 'تحقق من المورد الصيني قبل الدفع',
    intro:
      'قبل تحويل الأموال إلى مورد في الصين، تساعدك ChinaLink Express على التحقق من المؤشرات الأساسية: الهوية والقدرة الفعلية وتناسق الأسعار والجودة المعلنة ومخاطر الاحتيال وخيارات الفحص قبل الشحن إلى مالي.',
    highlights: [
      'فحص Alibaba و1688 والموردين المباشرين',
      'التحقق من المصنع والشركة حسب البيانات المتاحة',
      'فحص بالصور قبل الشحن',
      'نصائح قبل الدفع للمورد',
    ],
    sections: [
      {
        title: 'ما نتحقق منه',
        body: 'قد تكون لدى المورد صور جميلة وكلام مقنع، لكن هذا لا يكفي. ننظر في المعلومات الملموسة التي تساعد على تقرير المضي قدمًا أو طلب عينة أو الرفض.',
        items: ['اسم الشركة وبيانات الاتصال', 'التناسق بين السعر والكمية والجودة', 'صور أو فيديو حقيقية', 'القدرة على تجهيز الطلب والمستندات'],
      },
      {
        title: 'Alibaba و1688 والموردون المباشرون',
        body: 'Alibaba أكثر المنصات الدولية استخدامًا، بينما تستهدف 1688 أساسًا السوق الصينية. ولكل قناة مخاطرها. نكيّف التحقق حسب المنصة والمبلغ المراد دفعه.',
        items: ['تحليل ملف المورد', 'أسئلة موجهة إلى البائع', 'فحص طريقة الدفع المطلوبة', 'التنبيه إلى الأسعار غير الواقعية'],
      },
      {
        title: 'الفحص قبل الشحن',
        body: 'عندما تجهز البضاعة، يتيح الفحص بالصور أو الفيديو تأكيد الكمية والتغليف ومظهر المنتج والأخطاء الظاهرة قبل المغادرة إلى باماكو.',
        items: ['صور الكراتين والمراجع', 'فحص بصري للجودة', 'التحقق من التغليف', 'الموافقة قبل الشحن الجوي أو البحري'],
      },
    ],
    tableHeaders: ['نقطة الفحص', 'الخطر عند الإهمال', 'إجراء ChinaLink'],
    tableRows: [
      ['شركة المورد', 'وسيط أو بائع مزيف', 'التحقق من التناسق'],
      ['سعر منخفض جدًا', 'جودة رديئة أو احتيال', 'تنبيه قبل الدفع'],
      ['صور المنتج', 'منتج غير مطابق', 'طلب أدلة حقيقية'],
      ['الطلب جاهز', 'خطأ يُكتشف بعد فوات الأوان', 'الفحص قبل الشحن'],
    ],
    process: [
      'ترسل رابط المورد ولقطات الشاشة وعرض السعر وشروط الدفع.',
      'نحلل مؤشرات الخطر والمعلومات المتاحة.',
      'نتواصل مع المورد عند الحاجة لتأكيد التفاصيل.',
      'تتلقى توصية واضحة: المتابعة أو طلب مزيد من الأدلة أو التجنب.',
      'إذا طلبت، يمكننا متابعة الدفع وفحص الجودة والشحن إلى باماكو.',
    ],
    faqs: [
      {
        question: 'كيف أعرف أن المورد الصيني موثوق؟',
        answer: 'يجب التحقق من هوية الشركة وتناسق المعلومات وأدلة الإنتاج والآراء والصور الحقيقية وشروط الدفع والقدرة على تقديم المستندات المطلوبة.',
      },
      {
        question: 'هل يمكنكم التحقق من مورد في Alibaba أو 1688؟',
        answer: 'نعم. يمكننا تحليل المعلومات المتاحة والتواصل مع المورد وطلب الأدلة وتنظيم فحص بالصور أو التوصية بفحص أعمق حسب المبلغ.',
      },
      {
        question: 'هل يضمن التحقق عدم حدوث أي مشكلة؟',
        answer: 'لا، لا يزيل أي تحقق جميع المخاطر. لكنه يقلل كثيرًا الأخطاء الواضحة وعمليات الاحتيال الشائعة قبل الدفع.',
      },
      {
        question: 'هل يجب التحقق قبل طلب عينة؟',
        answer: 'نعم، خصوصًا إذا كان المورد جديدًا. العينة مفيدة، لكن يجب طلبها من مورد يبدو موثوقًا بالفعل.',
      },
    ],
    links: [
      { href: '/ar/services/paiement-fournisseur-chine', label: 'الدفع لمورد صيني' },
      { href: '/ar/guides/acheter-sur-alibaba-depuis-le-mali', label: 'الشراء من Alibaba من مالي' },
      { href: '/ar/guides/acheter-sur-1688-depuis-le-mali', label: 'الشراء من 1688 من مالي' },
      { href: '/ar/services/sourcing', label: 'خدمة التوريد من الصين' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = content[locale as Locale];

  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: '/services/verification-fournisseur-chine',
    locale: locale as Locale,

  });
}

export default async function SupplierVerificationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.metaTitle,
      serviceType: 'Supplier Verification Service',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'China' },
      ],
      description:
        page.metaDescription,
    },
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'China supplier verification' : isZh ? '中国供应商核验' : isAr ? 'التحقق من الموردين في الصين' : 'Vérification fournisseur Chine', url: `/${locale}/services/verification-fournisseur-chine` },
    ], locale as Locale),
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
        highlights={[...page.highlights]}
        sections={[...page.sections]}
        table={{
          headers: [...page.tableHeaders],
          rows: [...page.tableRows],
        }}
        process={[...page.process]}
        faqs={[...page.faqs]}
        links={[...page.links]}
        ctaLabel={isEn ? 'Request a supplier check on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need advice before paying?' : undefined}
        asideText={isEn ? 'Send the supplier link, quantities and destination. Our team will reply on WhatsApp.' : undefined}
        asideCtaLabel={isEn ? 'Contact ChinaLink' : undefined}
        stepLabel={isEn ? 'Step' : undefined}
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
