import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    metaTitle: 'Paiement fournisseur chinois depuis le Mali | Alipay, Virement',
    metaDescription:
      'Payez un fournisseur en Chine depuis le Mali avec ChinaLink Express. Paiement Alipay, virement, preuve de paiement, vérification fournisseur et expédition vers Bamako.',
    keywords:
      'paiement fournisseur chinois Mali, payer fournisseur Chine depuis Mali, Alipay Mali Chine, virement fournisseur Chine, supplier payment China Mali, pay Chinese supplier from Africa',
    badge: 'Paiement fournisseur Chine-Mali',
    title: 'Payer un fournisseur en Chine depuis le Mali',
    intro:
      'Vous avez trouvé un fournisseur sur Alibaba, 1688 ou directement en Chine, mais il demande un paiement local, Alipay ou un virement chinois ? ChinaLink Express vous aide à sécuriser le paiement, vérifier les informations essentielles et organiser la suite : contrôle, consolidation et expédition vers Bamako.',
    highlights: [
      'Paiement Alipay ou virement selon le cas',
      'Preuve de paiement partagée avec le client',
      'Vérification recommandée avant tout gros montant',
      'Suivi fournisseur puis expédition Chine-Mali',
    ],
    sections: [
      {
        title: 'Plateformes et paiements acceptés',
        body: 'Les fournisseurs chinois travaillent souvent avec des moyens de paiement difficiles à utiliser depuis le Mali ou l’Afrique de l’Ouest. Nous aidons à payer les commandes lorsque le fournisseur accepte Alipay, virement bancaire chinois ou paiement via plateforme.',
        items: ['Alibaba et fournisseurs B2B', '1688 et vendeurs domestiques chinois', 'Tmall pour certains achats', 'Fournisseurs contactés directement'],
      },
      {
        title: 'Les risques à éviter avant de payer',
        body: 'Le paiement est l’étape où beaucoup d’importateurs perdent de l’argent : faux fournisseurs, compte personnel suspect, prix trop bas, changement de qualité ou absence de preuve. ChinaLink demande les informations clés avant paiement pour réduire ces risques.',
        items: ['Nom de société cohérent', 'Historique et preuves de production', 'Adresse et contact fournisseur', 'Photos, vidéos ou échantillon si nécessaire'],
      },
      {
        title: 'Ce que vous recevez après paiement',
        body: 'Après validation, vous recevez une confirmation claire. Le fournisseur est ensuite suivi jusqu’à la préparation de la marchandise, avec possibilité de contrôle photo avant l’expédition vers le Mali.',
        items: ['Confirmation du montant payé', 'Capture ou reçu disponible selon le canal', 'Suivi de la commande fournisseur', 'Coordination avec le service sourcing ou fret'],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink'],
    tableRows: [
      ['Payer via Alipay', 'Souvent impossible depuis le Mali', 'Paiement assisté en Chine'],
      ['Limiter les arnaques', 'Vérification difficile à distance', 'Contrôles avant paiement'],
      ['Regrouper les achats', 'Chaque fournisseur expédie séparément', 'Consolidation avant fret'],
      ['Suivre la commande', 'Messages éparpillés', 'Coordination WhatsApp'],
    ],
    process: [
      'Vous envoyez le lien produit, le devis fournisseur, le montant et les coordonnées du vendeur.',
      'Nous vérifions les informations de base et signalons les risques visibles avant paiement.',
      'Vous validez le montant, le taux et les frais applicables.',
      'ChinaLink règle le fournisseur par le canal accepté lorsque tout est clair.',
      'Nous suivons la préparation de la commande et pouvons organiser inspection, consolidation et expédition.',
    ],
    faqs: [
      {
        question: 'Puis-je payer un fournisseur chinois depuis le Mali ?',
        answer: 'Oui. ChinaLink Express peut faciliter le paiement de fournisseurs en Chine pour les importateurs maliens, notamment lorsque le fournisseur demande Alipay ou un virement local chinois.',
      },
      {
        question: 'Recevrai-je une preuve de paiement ?',
        answer: 'Oui. Nous partageons une confirmation de paiement et les détails utiles pour suivre la commande avec le fournisseur.',
      },
      {
        question: 'Vérifiez-vous le fournisseur avant paiement ?',
        answer: 'Nous recommandons toujours une vérification avant paiement, surtout pour un nouveau fournisseur ou un gros montant.',
      },
      {
        question: 'Pouvez-vous payer plusieurs fournisseurs puis regrouper les colis ?',
        answer: 'Oui. Nous pouvons gérer plusieurs paiements, suivre les commandes et consolider les marchandises avant expédition vers Bamako.',
      },
    ],
    links: [
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier un fournisseur chinois' },
      { href: '/fr/services/sourcing', label: 'Agent sourcing Chine pour le Mali' },
      { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
      { href: '/fr/calculateur', label: 'Calculer le coût de fret' },
    ],
  },
  en: {
    metaTitle: 'Pay Chinese Supplier from Mali | Alipay & Bank Transfer',
    metaDescription:
      'Pay suppliers in China from Mali or Africa with ChinaLink Express. Alipay, Chinese bank transfer, supplier checks, payment proof, consolidation and shipping to Bamako.',
    keywords:
      'pay Chinese supplier from Mali, supplier payment China Africa, Alipay payment service Mali, China supplier bank transfer, pay Alibaba supplier Mali, China procurement payment Africa',
    badge: 'China supplier payment',
    title: 'Pay a supplier in China from Mali or Africa',
    intro:
      'Found a supplier on Alibaba, 1688 or directly in China, but they need Alipay, a Chinese bank transfer or local payment? ChinaLink Express helps importers verify the supplier, complete the payment, collect proof, and move the order into inspection, consolidation and shipping.',
    highlights: [
      'Alipay or China bank transfer support',
      'Payment proof shared with the buyer',
      'Supplier verification before large payments',
      'Order follow-up, consolidation and China-Africa shipping',
    ],
    sections: [
      {
        title: 'Platforms and payment methods',
        body: 'Many Chinese suppliers use payment methods that are hard to access from Mali and West Africa. We assist when the supplier accepts Alipay, Chinese bank transfer or marketplace payment.',
        items: ['Alibaba and B2B suppliers', '1688 and domestic Chinese sellers', 'Tmall for selected purchases', 'Direct factory or trading company contacts'],
      },
      {
        title: 'Payment risks to avoid',
        body: 'Supplier payment is where many importers lose money: fake companies, suspicious personal accounts, unrealistic prices, product switches or no payment proof. We review the key signals before money moves.',
        items: ['Company name consistency', 'Production and trading evidence', 'Supplier address and contact details', 'Photos, videos or samples when needed'],
      },
      {
        title: 'What happens after payment',
        body: 'After validation, you receive clear confirmation. We follow the supplier until the goods are ready and can arrange photo checks before shipping to Mali or another African destination.',
        items: ['Paid amount confirmation', 'Receipt or screenshot when available', 'Supplier order follow-up', 'Coordination with sourcing or freight services'],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink'],
    tableRows: [
      ['Pay with Alipay', 'Often impossible from Mali', 'Assisted payment in China'],
      ['Reduce fraud risk', 'Hard to verify remotely', 'Checks before payment'],
      ['Combine purchases', 'Each supplier ships separately', 'Consolidation before freight'],
      ['Track the order', 'Scattered messages', 'WhatsApp coordination'],
    ],
    process: [
      'Send the product link, supplier quote, amount and seller contact details.',
      'We review the basic information and flag visible risks before payment.',
      'You confirm the amount, exchange rate and applicable service fees.',
      'ChinaLink pays the supplier through the accepted channel once the details are clear.',
      'We follow preparation and can organize inspection, consolidation and shipping.',
    ],
    faqs: [
      {
        question: 'Can I pay a Chinese supplier from Mali?',
        answer: 'Yes. ChinaLink Express can assist supplier payments in China for Mali and Africa-based importers, especially when the supplier requests Alipay or a local Chinese bank transfer.',
      },
      {
        question: 'Will I receive proof of payment?',
        answer: 'Yes. We share payment confirmation and useful order details so you can keep the supplier process documented.',
      },
      {
        question: 'Do you verify the supplier before payment?',
        answer: 'We strongly recommend verification before payment, especially for a new supplier or a large amount.',
      },
      {
        question: 'Can you pay multiple suppliers and consolidate the goods?',
        answer: 'Yes. We can coordinate several payments, follow the orders, and consolidate goods before shipping to Bamako.',
      },
    ],
    links: [
      { href: '/en/services/verification-fournisseur-chine', label: 'Verify a Chinese supplier' },
      { href: '/en/services/sourcing', label: 'China sourcing agent' },
      { href: '/en/routes/china-to-mali', label: 'China to Mali freight' },
      { href: '/en/calculateur', label: 'Calculate freight cost' },
    ],
  },
  zh: {
    metaTitle: '从马里向中国供应商付款 | 支付宝、转账',
    metaDescription:
      '通过 ChinaLink Express 从马里向中国供应商付款。支付宝、转账、付款凭证、供应商核验并发往巴马科。',
    keywords:
      '马里中国供应商付款, 从马里向中国供应商付款, 马里中国支付宝, 中国供应商转账, 中国马里供应商付款, 从非洲向中国供应商付款',
    badge: '中国—马里供应商付款',
    title: '从马里向中国供应商付款',
    intro:
      '您在 Alibaba、1688 或直接在中国找到了供应商，但对方要求本地付款、支付宝或中国转账？ChinaLink Express 帮助您保障付款、核验关键信息并安排后续：检查、集运和发往巴马科。',
    highlights: [
      '视情况使用支付宝或转账付款',
      '与客户共享付款凭证',
      '大额付款前建议先核验',
      '跟进供应商，然后从中国发往马里',
    ],
    sections: [
      {
        title: '接受的平台和付款方式',
        body: '中国供应商常用的付款方式在马里或西非很难使用。当供应商接受支付宝、中国银行转账或平台付款时，我们帮助支付订单。',
        items: ['Alibaba 和 B2B 供应商', '1688 和中国国内卖家', '部分采购可用天猫', '直接联系的供应商'],
      },
      {
        title: '付款前要避免的风险',
        body: '付款是许多进口商亏钱的环节：假供应商、可疑的个人账户、价格过低、质量变更或没有凭证。ChinaLink 在付款前索取关键信息，以降低这些风险。',
        items: ['公司名称一致', '经营记录和生产证明', '供应商地址和联系方式', '必要时提供照片、视频或样品'],
      },
      {
        title: '付款后您会收到什么',
        body: '确认后，您会收到清晰的确认信息。随后跟进供应商直到货物备好，并可在发往马里前进行照片检查。',
        items: ['已付金额确认', '视渠道提供截图或收据', '跟进供应商订单', '与采购或货运服务协调'],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '有 ChinaLink'],
    tableRows: [
      ['通过支付宝付款', '在马里通常无法使用', '在中国协助付款'],
      ['减少诈骗', '远程核验困难', '付款前检查'],
      ['合并采购', '每家供应商单独发货', '货运前集运'],
      ['跟踪订单', '消息分散', 'WhatsApp 协调'],
    ],
    process: [
      '您发送产品链接、供应商报价、金额和卖家联系方式。',
      '我们核实基本信息，并在付款前提示可见的风险。',
      '您确认金额、汇率和适用费用。',
      '一切清楚后，ChinaLink 通过对方接受的渠道向供应商付款。',
      '我们跟进订单准备，并可安排检验、集运和发运。',
    ],
    faqs: [
      {
        question: '我可以从马里向中国供应商付款吗？',
        answer: '可以。ChinaLink Express 可以帮助马里进口商向中国供应商付款，尤其是在供应商要求支付宝或中国本地转账时。',
      },
      {
        question: '我会收到付款凭证吗？',
        answer: '会。我们会分享付款确认和跟进供应商订单所需的信息。',
      },
      {
        question: '你们在付款前核验供应商吗？',
        answer: '我们始终建议在付款前核验，尤其是新供应商或大额付款。',
      },
      {
        question: '你们可以向多家供应商付款，再合并包裹吗？',
        answer: '可以。我们可以处理多笔付款、跟进订单，并在发往巴马科前合并货物。',
      },
    ],
    links: [
      { href: '/zh/services/verification-fournisseur-chine', label: '核验中国供应商' },
      { href: '/zh/services/sourcing', label: '面向马里的中国采购代理' },
      { href: '/zh/routes/china-to-mali', label: '中国—马里货运线路' },
      { href: '/zh/calculateur', label: '计算运费' },
    ],
  },
  ar: {
    metaTitle: 'الدفع لمورد صيني من مالي | Alipay والتحويل',
    metaDescription:
      'ادفع لمورد في الصين من مالي مع ChinaLink Express. دفع عبر Alipay والتحويل وإثبات الدفع والتحقق من المورد والشحن إلى باماكو.',
    keywords:
      'الدفع لمورد صيني من مالي، الدفع لمورد في الصين من مالي، Alipay بين مالي والصين، تحويل إلى مورد في الصين، الدفع للموردين بين الصين ومالي، الدفع لمورد صيني من أفريقيا',
    badge: 'الدفع للموردين بين الصين ومالي',
    title: 'الدفع لمورد في الصين من مالي',
    intro:
      'وجدت موردًا في Alibaba أو 1688 أو مباشرة في الصين، لكنه يطلب دفعًا محليًا أو Alipay أو تحويلًا صينيًا؟ تساعدك ChinaLink Express على تأمين الدفع والتحقق من المعلومات الأساسية وتنظيم ما بعده: الفحص والتجميع والشحن إلى باماكو.',
    highlights: [
      'الدفع عبر Alipay أو التحويل حسب الحالة',
      'مشاركة إثبات الدفع مع العميل',
      'يوصى بالتحقق قبل أي مبلغ كبير',
      'متابعة المورد ثم الشحن من الصين إلى مالي',
    ],
    sections: [
      {
        title: 'المنصات ووسائل الدفع المقبولة',
        body: 'كثيرًا ما يعمل الموردون الصينيون بوسائل دفع يصعب استخدامها من مالي أو غرب أفريقيا. نساعد في دفع الطلبات عندما يقبل المورد Alipay أو التحويل المصرفي الصيني أو الدفع عبر المنصة.',
        items: ['Alibaba وموردو B2B', '1688 والبائعون المحليون في الصين', 'Tmall لبعض المشتريات', 'موردون يتم التواصل معهم مباشرة'],
      },
      {
        title: 'المخاطر التي يجب تجنبها قبل الدفع',
        body: 'الدفع هو المرحلة التي يخسر فيها كثير من المستوردين أموالهم: موردون مزيفون وحساب شخصي مشبوه وسعر منخفض جدًا وتغيّر في الجودة أو غياب الإثبات. تطلب ChinaLink المعلومات الأساسية قبل الدفع لتقليل هذه المخاطر.',
        items: ['اسم شركة متسق', 'السجل وأدلة الإنتاج', 'عنوان المورد وبيانات الاتصال', 'صور أو فيديو أو عينة عند الحاجة'],
      },
      {
        title: 'ما تحصل عليه بعد الدفع',
        body: 'بعد الموافقة، تصلك رسالة تأكيد واضحة. ثم تتم متابعة المورد حتى تجهيز البضاعة، مع إمكانية الفحص بالصور قبل الشحن إلى مالي.',
        items: ['تأكيد المبلغ المدفوع', 'لقطة شاشة أو إيصال حسب القناة', 'متابعة طلب المورد', 'التنسيق مع خدمة التوريد أو الشحن'],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink'],
    tableRows: [
      ['الدفع عبر Alipay', 'غالبًا غير ممكن من مالي', 'دفع بمساعدة في الصين'],
      ['الحد من الاحتيال', 'تحقق صعب عن بعد', 'فحوصات قبل الدفع'],
      ['تجميع المشتريات', 'كل مورد يشحن على حدة', 'تجميع قبل الشحن'],
      ['متابعة الطلب', 'رسائل متفرقة', 'تنسيق عبر WhatsApp'],
    ],
    process: [
      'ترسل رابط المنتج وعرض سعر المورد والمبلغ وبيانات البائع.',
      'نتحقق من المعلومات الأساسية وننبهك إلى المخاطر الظاهرة قبل الدفع.',
      'تؤكد المبلغ وسعر الصرف والرسوم المطبقة.',
      'تدفع ChinaLink للمورد عبر القناة المقبولة عندما يتضح كل شيء.',
      'نتابع تجهيز الطلب ويمكننا تنظيم الفحص والتجميع والشحن.',
    ],
    faqs: [
      {
        question: 'هل يمكنني الدفع لمورد صيني من مالي؟',
        answer: 'نعم. يمكن لـChinaLink Express تسهيل الدفع للموردين في الصين للمستوردين الماليين، خصوصًا عندما يطلب المورد Alipay أو تحويلًا محليًا صينيًا.',
      },
      {
        question: 'هل سأتلقى إثبات دفع؟',
        answer: 'نعم. نشارك معك تأكيد الدفع والتفاصيل اللازمة لمتابعة الطلب مع المورد.',
      },
      {
        question: 'هل تتحققون من المورد قبل الدفع؟',
        answer: 'نوصي دائمًا بالتحقق قبل الدفع، خصوصًا مع مورد جديد أو مبلغ كبير.',
      },
      {
        question: 'هل يمكنكم الدفع لعدة موردين ثم تجميع الطرود؟',
        answer: 'نعم. يمكننا إدارة عدة مدفوعات ومتابعة الطلبات وتجميع البضائع قبل الشحن إلى باماكو.',
      },
    ],
    links: [
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من مورد صيني' },
      { href: '/ar/services/sourcing', label: 'وكيل توريد في الصين لمالي' },
      { href: '/ar/routes/china-to-mali', label: 'خط الشحن من الصين إلى مالي' },
      { href: '/ar/calculateur', label: 'احسب كلفة الشحن' },
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
    path: '/services/paiement-fournisseur-chine',
    locale: locale as Locale,

  });
}

export default async function SupplierPaymentPage({ params }: Props) {
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
      serviceType: 'Supplier Payment Service',
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
      { name: isEn ? 'Supplier payment China' : isZh ? '中国供应商付款' : isAr ? 'الدفع لمورد في الصين' : 'Paiement fournisseur Chine', url: `/${locale}/services/paiement-fournisseur-chine` },
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
        ctaLabel={isEn ? 'Request a quote on WhatsApp' : undefined}
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
