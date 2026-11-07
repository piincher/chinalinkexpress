import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
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
    badge: 'Import Cosmétiques Chine',
    title: 'Importer des cosmétiques et produits beauté de Chine',
    intro: 'Vous souhaitez importer des cosmétiques, produits de soin, produits capillaires ou matériel esthétique de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé beauté basé à Guangzhou, le centre cosmétique de la Chine. Nous sourçons depuis les usines certifiées ISO et les marchés de gros de Baiyun, avec contrôle qualité, étiquetage conforme et expédition sécurisée.',
    highlights: [
      'Sourcing cosmétiques depuis Guangzhou Baiyun et usines certifiées ISO',
      'Soins visage, cheveux, maquillage, parfums et matériel esthétique',
      'Vérification certification et contrôle qualité produit',
      'Étiquetage conforme pour importation Afrique de l\'Ouest',
      'Fret aérien et maritime avec emballage sécurisé',
    ],
    sections: [
      {
        title: 'Quels cosmétiques importer de Chine ?',
        body: 'Guangzhou est le plus grand centre de production cosmétique de Chine. Nous sourçons tous types de produits beauté adaptés au marché africain, avec formulation et packaging personnalisables.',
        items: [
          'Soins visage : crèmes, sérums, masques, lotions',
          'Produits capillaires : shampoings, conditioners, huiles, traitements',
          'Maquillage : fonds de teint, rouges à lèvres, mascaras, palettes',
          'Parfums et eaux de toilette (reproductions de grandes marques autorisées)',
          'Matériel esthétique : appareils soin, brosses, accessoires salon',
          'Savons artisanaux et produits naturels',
        ],
      },
      {
        title: 'Certification et conformité des cosmétiques',
        body: 'L\'importation de cosmétiques nécessite des précautions réglementaires. Nous sélectionnons des usines avec certification ISO, GMP et vérifions la conformité des ingrédients pour le marché africain.',
        items: [
          'Usines certifiées ISO 22716 (GMP cosmétique)',
          'Vérification ingrédients et formules conformes normes OAPI',
          'Étiquetage en français avec composition INCI',
          'Tests dermatologiques et stabilité produit',
          'Documentation pour dédouanement produits cosmétiques au Mali',
        ],
      },
      {
        title: 'Packaging personnalisé et marque blanche',
        body: 'De nombreuses usines chinoises proposent du packaging personnalisé et de la marque blanche (private label). Nous pouvons développer votre propre ligne de cosmétiques avec votre logo et votre design.',
        items: [
          'Création de marque blanche avec votre logo et packaging',
          'Formulations personnalisées pour peaux africaines',
          'Design flacons, pots et étiquettes sur mesure',
          'Production à partir de 500 unités selon le produit',
          'Conseil réglementaire pour l\'enregistrement de marque en Afrique',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine cosmétique', 'Fournisseurs non certifiés', 'Usines ISO/GMP vérifiées Guangzhou'],
      ['Qualité produit', 'Produits non testés, risques santé', 'Contrôle qualité + tests stabilité'],
      ['Étiquetage conforme', 'Étiquettes incompliantes rejetées', 'Étiquetage français conforme OAPI'],
      ['Marque blanche', 'Impossible seul', 'Développement packaging + logo inclus'],
      ['Expédition sécurisée', 'Fuites et casses fréquentes', 'Emballage double + protection thermique'],
    ],
    process: [
      'Décrivez vos besoins cosmétiques (type, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 usines certifiées et comparons formulations.',
      'Vous validez après réception des échantillons et certifications.',
      'Nous supervisons la production, contrôlons qualité et étiquetage.',
      'Expédition sécurisée + dédouanement cosmétique + livraison.',
    ],
    faqs: [
      {
        question: 'Les cosmétiques chinois sont-ils autorisés au Mali ?',
        answer: 'Oui, avec une documentation adéquate : facture détaillée, liste des ingrédients, et certification de l\'usine. Nous préparons tous les documents nécessaires pour le dédouanement des produits cosmétiques à Bamako.',
      },
      {
        question: 'Puis-je créer ma propre marque de cosmétiques ?',
        answer: 'Oui, nous travaillons avec des usines proposant du private label à partir de 500-1000 unités selon le produit. Nous gérons le design du packaging, le logo, et la formulation adaptée au marché africain.',
      },
      {
        question: 'Quelle certification faut-il pour importer des cosmétiques ?',
        answer: 'Nous recommandons des usines certifiées ISO 22716 (GMP cosmétique). Pour certains produits, des tests dermatologiques sont nécessaires. Nous vérifions la conformité des ingrédients avec les réglementations africaines.',
      },
      {
        question: 'Quel délai pour produire des cosmétiques sur mesure ?',
        answer: 'La production standard prend 15-25 jours. Pour du private label avec packaging personnalisé, comptez 30-45 jours. Le fret aérien ajoute 14-21 jours, le maritime 60-75 jours.',
      },
      {
        question: 'Proposez-vous des formulations pour peaux africaines ?',
        answer: 'Oui, nous collaborons avec des laboratoires chinois spécialisés dans les formulations adaptées aux peaux noires et métisses : beurre de karité, huile de ricin, huiles nourrissantes intenses, et protection UV élevée.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/air-freight', label: 'Fret aérien cosmétiques' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis import cosmétiques' },
    ],
  },
  en: {
    badge: 'Import Cosmetics China',
    title: 'Import Cosmetics and Beauty Products from China',
    intro: 'Want to import cosmetics, skincare, hair products, or beauty equipment from China to Mali and West Africa? ChinaLink Express is your specialized beauty sourcing agent based in Guangzhou, China\'s cosmetics capital. We source from ISO-certified factories and Baiyun wholesale markets, with quality control, compliant labeling, and secure shipping.',
    highlights: [
      'Cosmetics sourcing from Guangzhou Baiyun and ISO-certified factories',
      'Face care, hair care, makeup, perfumes, and beauty equipment',
      'Certification verification and product quality control',
      'Compliant labeling for West Africa importation',
      'Air and sea freight with secure packaging',
    ],
    sections: [
      {
        title: 'What cosmetics can you import from China?',
        body: 'Guangzhou is China\'s largest cosmetics production center. We source all types of beauty products adapted to the African market, with customizable formulations and packaging.',
        items: [
          'Face care: creams, serums, masks, lotions',
          'Hair products: shampoos, conditioners, oils, treatments',
          'Makeup: foundations, lipsticks, mascaras, palettes',
          'Perfumes and eaux de toilette (authorized brand reproductions)',
          'Beauty equipment: skincare devices, brushes, salon accessories',
          'Artisanal soaps and natural products',
        ],
      },
      {
        title: 'Certification and compliance of cosmetics',
        body: 'Importing cosmetics requires regulatory precautions. We select factories with ISO, GMP certification and verify ingredient compliance for the African market.',
        items: [
          'ISO 22716 certified factories (cosmetic GMP)',
          'Ingredient and formula verification compliant with OAPI standards',
          'French labeling with INCI composition',
          'Dermatological and product stability tests',
          'Documentation for cosmetic customs clearance in Mali',
        ],
      },
      {
        title: 'Custom packaging and white label',
        body: 'Many Chinese factories offer custom packaging and white label (private label). We can develop your own cosmetics line with your logo and design.',
        items: [
          'White label creation with your logo and packaging',
          'Custom formulations for African skin',
          'Custom bottle, jar, and label design',
          'Production from 500 units depending on product',
          'Regulatory advice for trademark registration in Africa',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find cosmetic factory', 'Uncertified suppliers', 'Verified ISO/GMP factories in Guangzhou'],
      ['Product quality', 'Untested products, health risks', 'Quality control + stability tests'],
      ['Compliant labeling', 'Non-compliant labels rejected', 'French labeling OAPI compliant'],
      ['White label', 'Impossible alone', 'Packaging + logo development included'],
      ['Secure shipping', 'Frequent leaks and breakage', 'Double packaging + thermal protection'],
    ],
    process: [
      'Describe your cosmetic needs (type, quantity, budget) on WhatsApp.',
      'We research 3-5 certified factories and compare formulations.',
      'You validate after receiving samples and certifications.',
      'We supervise production, control quality and labeling.',
      'Secure shipping + cosmetic customs clearance + delivery.',
    ],
    faqs: [
      {
        question: 'Are Chinese cosmetics allowed in Mali?',
        answer: 'Yes, with adequate documentation: detailed invoice, ingredient list, and factory certification. We prepare all necessary documents for customs clearance of cosmetic products in Bamako.',
      },
      {
        question: 'Can I create my own cosmetics brand?',
        answer: 'Yes, we work with factories offering private label from 500-1000 units depending on the product. We manage packaging design, logo, and formulation adapted to the African market.',
      },
      {
        question: 'What certification is needed to import cosmetics?',
        answer: 'We recommend ISO 22716 certified factories (cosmetic GMP). For some products, dermatological tests are required. We verify ingredient compliance with African regulations.',
      },
      {
        question: 'What is the timeline for custom cosmetics production?',
        answer: 'Standard production takes 15-25 days. For private label with custom packaging, allow 30-45 days. Air freight adds 14-21 days, sea freight 60-75 days.',
      },
      {
        question: 'Do you offer formulations for African skin?',
        answer: 'Yes, we collaborate with Chinese laboratories specialized in formulations adapted to black and mixed skin: shea butter, castor oil, intense nourishing oils, and high UV protection.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/air-freight', label: 'Air freight cosmetics' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Cosmetics import quote' },
    ],
  },
  zh: {
    badge: '从中国进口化妆品',
    title: '从中国进口化妆品和美容产品',
    intro: '您想从中国向马里和西非进口化妆品、护肤品、护发产品或美容设备吗？ChinaLink Express 是您在中国化妆品中心广州的美容品类专业采购代理。我们从通过 ISO 认证的工厂和白云批发市场采购，并提供质量检查、合规标签和安全运输。',
    highlights: [
      '从广州白云和 ISO 认证工厂采购化妆品',
      '面部护理、护发、彩妆、香水和美容设备',
      '核验认证并检查产品质量',
      '符合西非进口要求的标签',
      '空运和海运，安全包装',
    ],
    sections: [
      {
        title: '从中国进口哪些化妆品？',
        body: '广州是中国最大的化妆品生产中心。我们采购适合非洲市场的各类美容产品，配方和包装均可定制。',
        items: [
          '面部护理：面霜、精华、面膜、乳液',
          '护发产品：洗发水、护发素、发油、护理产品',
          '彩妆：粉底、口红、睫毛膏、眼影盘',
          '香水和淡香水（经授权的大牌仿香）',
          '美容设备：护理仪器、刷具、沙龙配件',
          '手工皂和天然产品',
        ],
      },
      {
        title: '化妆品的认证与合规',
        body: '进口化妆品需要注意法规要求。我们选择具有 ISO、GMP 认证的工厂，并核实成分是否符合非洲市场要求。',
        items: [
          '通过 ISO 22716（化妆品 GMP）认证的工厂',
          '核验成分和配方符合 OAPI 标准',
          '法语标签，附 INCI 成分表',
          '皮肤测试和产品稳定性测试',
          '马里化妆品清关文件',
        ],
      },
      {
        title: '定制包装和白牌',
        body: '许多中国工厂提供定制包装和白牌（private label）。我们可以用您的标志和设计开发您自己的化妆品系列。',
        items: [
          '用您的标志和包装打造白牌',
          '针对非洲肤质的定制配方',
          '定制瓶、罐和标签设计',
          '视产品而定，500 件起生产',
          '在非洲注册品牌的法规建议',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找化妆品工厂', '未经认证的供应商', '经核验的广州 ISO/GMP 工厂'],
      ['产品质量', '未经测试的产品，存在健康风险', '质量检查 + 稳定性测试'],
      ['合规标签', '不合规标签被拒收', '符合 OAPI 的法语标签'],
      ['白牌', '自己无法完成', '包含包装和标志开发'],
      ['安全运输', '经常漏液和破损', '双层包装 + 隔热保护'],
    ],
    process: [
      '通过 WhatsApp 说明您的化妆品需求（类型、数量、预算）。',
      '我们寻找 3-5 家认证工厂并比较配方。',
      '您在收到样品和证书后确认。',
      '我们监督生产，检查质量和标签。',
      '安全运输 + 化妆品清关 + 交付。',
    ],
    faqs: [
      {
        question: '中国化妆品在马里允许进口吗？',
        answer: '允许，但需要完备的文件：详细发票、成分表和工厂认证。我们为巴马科的化妆品清关准备所有必要文件。',
      },
      {
        question: '我可以创建自己的化妆品品牌吗？',
        answer: '可以，我们合作的工厂提供 private label，视产品而定 500-1000 件起。我们负责包装设计、标志和适合非洲市场的配方。',
      },
      {
        question: '进口化妆品需要什么认证？',
        answer: '我们建议选择通过 ISO 22716（化妆品 GMP）认证的工厂。部分产品需要皮肤测试。我们会核实成分是否符合非洲法规。',
      },
      {
        question: '定制化妆品的生产周期是多久？',
        answer: '标准生产需要 15-25 天。定制包装的 private label 需要 30-45 天。空运再加 14-21 天，海运再加 60-75 天。',
      },
      {
        question: '你们提供适合非洲肤质的配方吗？',
        answer: '提供，我们与专门研究黑色和混血肤质配方的中国实验室合作：乳木果油、蓖麻油、高滋养油和高倍防晒。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/air-freight', label: '化妆品空运' },
      { href: '/zh/services/verification-fournisseur-chine', label: '工厂核验' },
      { href: '/zh/calculateur', label: '化妆品进口报价' },
    ],
  },
  ar: {
    badge: 'استيراد مستحضرات التجميل من الصين',
    title: 'استيراد مستحضرات التجميل ومنتجات الجمال من الصين',
    intro: 'هل ترغب في استيراد مستحضرات التجميل أو منتجات العناية أو منتجات الشعر أو معدات التجميل من الصين إلى مالي وغرب أفريقيا؟ ChinaLink Express وكيل التوريد المتخصص في الجمال لديك في قوانغتشو، مركز مستحضرات التجميل في الصين. نورّد من مصانع حاصلة على شهادة ISO ومن أسواق الجملة في بايون، مع فحص الجودة والملصقات المطابقة والشحن الآمن.',
    highlights: [
      'توريد مستحضرات التجميل من بايون في قوانغتشو ومن مصانع حاصلة على ISO',
      'العناية بالوجه والشعر والمكياج والعطور ومعدات التجميل',
      'التحقق من الشهادات وفحص جودة المنتج',
      'ملصقات مطابقة للاستيراد إلى غرب أفريقيا',
      'شحن جوي وبحري مع تغليف آمن',
    ],
    sections: [
      {
        title: 'ما مستحضرات التجميل التي يمكن استيرادها من الصين؟',
        body: 'قوانغتشو أكبر مركز لإنتاج مستحضرات التجميل في الصين. نورّد جميع منتجات الجمال المناسبة للسوق الأفريقية، مع إمكانية تخصيص التركيبة والتغليف.',
        items: [
          'العناية بالوجه: كريمات وسيروم وأقنعة ولوشن',
          'منتجات الشعر: شامبو وبلسم وزيوت وعلاجات',
          'المكياج: كريم أساس وأحمر شفاه وماسكارا ولوحات ألوان',
          'العطور وماء التواليت (نسخ مرخصة من ماركات كبرى)',
          'معدات التجميل: أجهزة العناية والفرش وإكسسوارات الصالونات',
          'الصابون اليدوي والمنتجات الطبيعية',
        ],
      },
      {
        title: 'شهادات مستحضرات التجميل ومطابقتها',
        body: 'يتطلب استيراد مستحضرات التجميل احتياطات تنظيمية. نختار مصانع حاصلة على شهادتي ISO وGMP، ونتحقق من مطابقة المكونات للسوق الأفريقية.',
        items: [
          'مصانع حاصلة على ISO 22716 (GMP لمستحضرات التجميل)',
          'التحقق من المكونات والتركيبات وفق معايير OAPI',
          'ملصقات بالفرنسية مع تركيبة INCI',
          'اختبارات جلدية واختبارات ثبات المنتج',
          'مستندات التخليص الجمركي لمستحضرات التجميل في مالي',
        ],
      },
      {
        title: 'تغليف مخصص وعلامة خاصة',
        body: 'تقدم مصانع صينية كثيرة تغليفًا مخصصًا وعلامة خاصة (private label). يمكننا تطوير خط مستحضرات تجميل خاص بك بشعارك وتصميمك.',
        items: [
          'إنشاء علامة خاصة بشعارك وتغليفك',
          'تركيبات مخصصة للبشرة الأفريقية',
          'تصميم مخصص للزجاجات والعلب والملصقات',
          'إنتاج ابتداءً من 500 وحدة حسب المنتج',
          'نصائح تنظيمية لتسجيل العلامة في أفريقيا',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على مصنع مستحضرات تجميل', 'موردون غير معتمدين', 'مصانع ISO/GMP موثقة في قوانغتشو'],
      ['جودة المنتج', 'منتجات غير مختبرة ومخاطر صحية', 'فحص الجودة + اختبارات الثبات'],
      ['ملصقات مطابقة', 'رفض الملصقات غير المطابقة', 'ملصقات بالفرنسية مطابقة لـOAPI'],
      ['علامة خاصة', 'مستحيل بمفردك', 'يشمل تطوير التغليف والشعار'],
      ['شحن آمن', 'تسربات وكسور متكررة', 'تغليف مزدوج + حماية حرارية'],
    ],
    process: [
      'صف احتياجاتك من مستحضرات التجميل (النوع والكمية والميزانية) عبر WhatsApp.',
      'نبحث عن 3-5 مصانع معتمدة ونقارن التركيبات.',
      'تؤكد بعد استلام العينات والشهادات.',
      'نشرف على الإنتاج ونفحص الجودة والملصقات.',
      'شحن آمن + تخليص جمركي لمستحضرات التجميل + تسليم.',
    ],
    faqs: [
      {
        question: 'هل يُسمح بمستحضرات التجميل الصينية في مالي؟',
        answer: 'نعم، بشرط توفر المستندات المناسبة: فاتورة مفصلة وقائمة مكونات وشهادة المصنع. نجهز كل المستندات اللازمة للتخليص الجمركي لمستحضرات التجميل في باماكو.',
      },
      {
        question: 'هل يمكنني إنشاء علامتي الخاصة لمستحضرات التجميل؟',
        answer: 'نعم، نعمل مع مصانع تقدم private label ابتداءً من 500-1000 وحدة حسب المنتج. ونتولى تصميم التغليف والشعار وتركيبة مناسبة للسوق الأفريقية.',
      },
      {
        question: 'ما الشهادة المطلوبة لاستيراد مستحضرات التجميل؟',
        answer: 'نوصي بمصانع حاصلة على ISO 22716 (GMP لمستحضرات التجميل). وتحتاج بعض المنتجات إلى اختبارات جلدية. ونتحقق من مطابقة المكونات للوائح الأفريقية.',
      },
      {
        question: 'ما مدة إنتاج مستحضرات التجميل حسب الطلب؟',
        answer: 'يستغرق الإنتاج القياسي 15-25 يومًا. ولمنتجات private label ذات التغليف المخصص، احسب 30-45 يومًا. ويضيف الشحن الجوي 14-21 يومًا والبحري 60-75 يومًا.',
      },
      {
        question: 'هل تقدمون تركيبات للبشرة الأفريقية؟',
        answer: 'نعم، نتعاون مع مختبرات صينية متخصصة في تركيبات تناسب البشرة السمراء والمختلطة: زبدة الشيا وزيت الخروع والزيوت شديدة التغذية والحماية العالية من الأشعة فوق البنفسجية.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/air-freight', label: 'الشحن الجوي لمستحضرات التجميل' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المصنع' },
      { href: '/ar/calculateur', label: 'عرض سعر لاستيراد مستحضرات التجميل' },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Import Cosmetics from China to Africa | Beauty Products Wholesale | ChinaLink'
      : isZh ? '从中国进口化妆品到非洲 | 美容产品批发 | ChinaLink' : isAr ? 'استيراد مستحضرات التجميل من الصين إلى أفريقيا | منتجات الجمال بالجملة | ChinaLink' : 'Importer Cosmétiques Chine Afrique | Produits Beauté Gros | ChinaLink',
    description: isEn
      ? 'Import beauty products, skincare, hair products & cosmetics from China to Africa. Guangzhou cosmetics market sourcing with FDA-compliant labeling. Air & sea freight available. WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向非洲进口美容产品、面部护理、护发和化妆品。在广州化妆品市场采购，标签合规。可选空运和海运。WhatsApp：+86 188 5172 5957' : isAr ? 'استورد منتجات الجمال والعناية بالوجه والشعر ومستحضرات التجميل من الصين إلى أفريقيا. توريد من سوق مستحضرات التجميل في قوانغتشو مع ملصقات مطابقة. شحن جوي وبحري متاح. WhatsApp: ‎+86 188 5172 5957' : 'Importez produits beauté, soins visage, cheveux et cosmétiques de Chine vers l\'Afrique. Sourcing marché cosmétiques Guangzhou avec étiquetage conforme. Fret aérien et maritime disponible. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import cosmetics from China, wholesale beauty products China, buy skincare from China, cosmetics sourcing agent, Guangzhou cosmetics market, import hair products China Africa, beauty supplier China, cosmetics wholesale Africa, private label cosmetics China, freight forwarder China Mali'
      : isZh ? '从中国进口化妆品, 中国美容产品批发, 从中国购买护肤品, 化妆品采购代理, 广州化妆品市场, 中国进口护发产品到非洲, 中国美容供应商, 中国化妆品白牌, 中国马里货运, 中国马里货代' : isAr ? 'استيراد مستحضرات التجميل من الصين، منتجات الجمال بالجملة من الصين، شراء منتجات العناية من الصين، وكيل توريد مستحضرات التجميل، سوق مستحضرات التجميل في قوانغتشو، استيراد منتجات الشعر من الصين إلى أفريقيا، مورد منتجات الجمال في الصين، علامة خاصة لمستحضرات التجميل، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'importer cosmétiques Chine, gros produits beauté Chine, acheter soins visage Chine, agent sourcing cosmétiques, marché cosmétiques Guangzhou, importer produits cheveux Chine Afrique, fournisseur beauté Chine, marque blanche cosmétiques Chine, cargo chine mali, transitaire chine mali',
    path: '/industries/cosmetiques-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function CosmeticsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Industries' : 'Industries', url: `/${locale}/industries` },
      { name: isEn ? 'Cosmetics China Africa' : isZh ? '中国—非洲化妆品' : isAr ? 'مستحضرات التجميل من الصين إلى أفريقيا' : 'Cosmétiques Chine Afrique', url: `/${locale}/industries/cosmetiques-chine-afrique` },
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
