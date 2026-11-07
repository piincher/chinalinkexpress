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
    badge: 'Import Électronique Chine',
    title: 'Importer de l\'électronique de Chine vers l\'Afrique',
    intro: 'Vous souhaitez importer des téléphones, ordinateurs, accessoires électroniques ou gadgets de Chine vers le Mali, le Sénégal ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé électronique basé à Shenzhen, la capitale mondiale de la tech. Nous sourçons directement depuis le marché électronique de Huaqiangbei, vérifions la qualité et les spécifications techniques, et expédions avec emballage anti-choc et assurance.',
    highlights: [
      'Sourcing direct depuis Shenzhen Huaqiangbei et marchés tech',
      'Téléphones, ordinateurs, accessoires, gadgets et composants',
      'Vérification technique : fonctionnalité, batterie, écran, connectique',
      'Garantie et support technique inclus sur certains produits',
      'Fret aérien sécurisé 14-21 jours ou conteneur maritime 60-75 jours',
    ],
    sections: [
      {
        title: 'Quels produits électroniques importer de Chine ?',
        body: 'Shenzhen est le plus grand marché électronique du monde. Nous sourçons tous types de produits tech pour le marché africain, avec une attention particulière aux spécifications compatibles (tension, langue, réseau).',
        items: [
          'Smartphones et téléphones mobiles (Android, feature phones)',
          'Ordinateurs portables, tablettes et accessoires informatiques',
          'Accessoires téléphone : coques, écouteurs, chargeurs, câbles',
          'Électronique grand public : enceintes, montres connectées, drones',
          'Composants électroniques et pièces de rechange',
          'Appareils électroménagers et équipements solaires',
        ],
      },
      {
        title: 'Pourquoi Shenzhen pour l\'électronique ?',
        body: 'Shenzhen concentre 90% de la production électronique mondiale. Notre bureau local nous donne un accès direct aux usines, aux nouveautés et aux meilleurs prix. Nous connaissons les fournisseurs fiables et les produits adaptés au marché africain.',
        items: [
          'Marché Huaqiangbei : le plus grand marché électronique au monde',
          'Accès direct aux usines de fabrication de téléphones et accessoires',
          'Connaissance des spécifications réseau et tension pour l\'Afrique',
          'Tests fonctionnels sur place avant expédition',
          'Emballage renforcé anti-choc pour le transport aérien et maritime',
        ],
      },
      {
        title: 'Sécurité et conformité des produits électroniques',
        body: 'L\'importation d\'électronique nécessite des précautions particulières : batteries lithium-ion réglementées, certification CE pour certains appareils, et vérification de la compatibilité réseau. Nous gérons ces contraintes pour vous.',
        items: [
          'Vérification compatibilité réseau 2G/3G/4G pour votre pays',
          'Tests batteries lithium-ion et certification de transport',
          'Contrôle qualité fonctionnel : écran, tactile, caméra, connectique',
          'Emballage spécialisé pour produits fragiles et électroniques',
          'Conseil sur les produits interdits ou réglementés au Mali',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver fournisseur tech', 'Risque de copies et contrefaçons', 'Fournisseurs vérifiés à Shenzhen'],
      ['Vérifier qualité électronique', 'Produits défectueux à la réception', 'Tests fonctionnels complets sur place'],
      ['Compatibilité Afrique', 'Téléphones incompatibles réseau', 'Vérification 2G/3G/4G et tension'],
      ['Expédition sécurisée', 'Batteries lithium refusées', 'Emballage certifié + documents IATA'],
      ['Garantie produit', 'Aucun recours possible', 'Support technique et garantie sélectionnée'],
    ],
    process: [
      'Décrivez vos besoins électroniques (modèle, quantité, budget) sur WhatsApp.',
      'Nous sourçons 3-5 fournisseurs qualifiés à Shenzhen et comparons.',
      'Vous validez après réception des spécifications techniques et photos.',
      'Nous testons la fonctionnalité, emballons sécurisé et payons.',
      'Expédition fret aérien ou maritime + dédouanement + livraison.',
    ],
    faqs: [
      {
        question: 'Puis-je importer des téléphones chinois au Mali ?',
        answer: 'Oui, mais il faut vérifier la compatibilité réseau 2G/3G/4G avec les opérateurs maliens. Nous testons chaque modèle et recommandons les téléphones adaptés au marché malien.',
      },
      {
        question: 'Les batteries lithium sont-elles autorisées en fret aérien ?',
        answer: 'Oui, avec des conditions précises : emballage spécialisé, déclaration IATA, et quantités limitées par colis. Nous gérons toute la documentation pour un transport sécurisé.',
      },
      {
        question: 'Quelle garantie sur les produits électroniques importés ?',
        answer: 'Nous sélectionnons des fournisseurs offrant une garantie fabricant de 6 à 12 mois. Nous testons chaque produit avant expédition et documentons les numéros de série pour tout suivi.',
      },
      {
        question: 'Puis-je importer des copies de marques connues ?',
        answer: 'Non, nous ne sourçons pas de contrefaçons. Nous proposons des marques chinoises originales de qualité (Xiaomi, Tecno, Infinix, Oppo) ou des produits sans marque avec spécifications équivalentes.',
      },
      {
        question: 'Quel délai pour recevoir de l\'électronique de Chine ?',
        answer: 'Le fret aérien électronique livre en 14-21 jours à Bamako. Le conteneur maritime prend 60-75 jours. Les batteries lithium peuvent allonger le délai aérien de 2-3 jours pour la documentation.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/air-freight', label: 'Fret aérien sécurisé' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
      { href: '/fr/calculateur', label: 'Calculer coût fret électronique' },
    ],
  },
  en: {
    badge: 'Import Electronics China',
    title: 'Import Electronics from China to Africa',
    intro: 'Want to import phones, computers, electronic accessories, or gadgets from China to Mali, Senegal, or West Africa? ChinaLink Express is your specialized electronics sourcing agent based in Shenzhen, the world tech capital. We source directly from Huaqiangbei electronic market, verify quality and technical specifications, and ship with anti-shock packaging and insurance.',
    highlights: [
      'Direct sourcing from Shenzhen Huaqiangbei and tech markets',
      'Phones, computers, accessories, gadgets, and components',
      'Technical verification: functionality, battery, screen, connectivity',
      'Warranty and technical support included on selected products',
      'Secure air freight 14-21 days or sea container 60-75 days',
    ],
    sections: [
      {
        title: 'What electronics can you import from China?',
        body: 'Shenzhen is the world\'s largest electronics market. We source all types of tech products for the African market, with particular attention to compatible specifications (voltage, language, network).',
        items: [
          'Smartphones and mobile phones (Android, feature phones)',
          'Laptops, tablets, and computer accessories',
          'Phone accessories: cases, earphones, chargers, cables',
          'Consumer electronics: speakers, smartwatches, drones',
          'Electronic components and spare parts',
          'Home appliances and solar equipment',
        ],
      },
      {
        title: 'Why Shenzhen for electronics?',
        body: 'Shenzhen concentrates 90% of global electronics production. Our local office gives us direct access to factories, new products, and the best prices. We know reliable suppliers and products adapted to the African market.',
        items: [
          'Huaqiangbei Market: the world\'s largest electronics market',
          'Direct access to phone and accessory manufacturing factories',
          'Knowledge of network and voltage specifications for Africa',
          'Functional testing on-site before shipping',
          'Reinforced anti-shock packaging for air and sea transport',
        ],
      },
      {
        title: 'Safety and compliance of electronic products',
        body: 'Importing electronics requires special precautions: regulated lithium-ion batteries, CE certification for certain devices, and network compatibility verification. We manage these constraints for you.',
        items: [
          'Network 2G/3G/4G compatibility verification for your country',
          'Lithium-ion battery testing and transport certification',
          'Functional quality control: screen, touch, camera, connectivity',
          'Specialized packaging for fragile and electronic products',
          'Advice on prohibited or regulated products in Mali',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find tech supplier', 'Risk of copies and counterfeits', 'Verified suppliers in Shenzhen'],
      ['Verify electronics quality', 'Defective products on receipt', 'Complete functional testing on-site'],
      ['Africa compatibility', 'Incompatible network phones', '2G/3G/4G and voltage verification'],
      ['Secure shipping', 'Lithium batteries refused', 'Certified packaging + IATA documents'],
      ['Product warranty', 'No recourse possible', 'Technical support and selected warranty'],
    ],
    process: [
      'Describe your electronic needs (model, quantity, budget) on WhatsApp.',
      'We source 3-5 qualified suppliers in Shenzhen and compare.',
      'You validate after receiving technical specifications and photos.',
      'We test functionality, package securely, and pay.',
      'Air or sea freight shipping + customs clearance + delivery.',
    ],
    faqs: [
      {
        question: 'Can I import Chinese phones to Mali?',
        answer: 'Yes, but network 2G/3G/4G compatibility with Malian operators must be verified. We test each model and recommend phones adapted to the Malian market.',
      },
      {
        question: 'Are lithium batteries allowed in air freight?',
        answer: 'Yes, with specific conditions: specialized packaging, IATA declaration, and limited quantities per package. We manage all documentation for secure transport.',
      },
      {
        question: 'What warranty on imported electronic products?',
        answer: 'We select suppliers offering a 6-12 month manufacturer warranty. We test each product before shipping and document serial numbers for any follow-up.',
      },
      {
        question: 'Can I import copies of known brands?',
        answer: 'No, we do not source counterfeits. We offer original Chinese quality brands (Xiaomi, Tecno, Infinix, Oppo) or unbranded products with equivalent specifications.',
      },
      {
        question: 'What is the timeline to receive electronics from China?',
        answer: 'Air freight electronics delivers in 14-21 days to Bamako. Sea container takes 60-75 days. Lithium batteries may extend air freight by 2-3 days for documentation.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/air-freight', label: 'Secure air freight' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
      { href: '/en/calculateur', label: 'Calculate electronics freight cost' },
    ],
  },
  zh: {
    badge: '从中国进口电子产品',
    title: '从中国向非洲进口电子产品',
    intro: '您想从中国向马里、塞内加尔或西非进口手机、电脑、电子配件或小工具吗？ChinaLink Express 是您在全球科技之都深圳的电子品类专业采购代理。我们直接从华强北电子市场采购，核验质量和技术规格，并采用防震包装和保险发运。',
    highlights: [
      '直接从深圳华强北和科技市场采购',
      '手机、电脑、配件、小工具和元器件',
      '技术核验：功能、电池、屏幕、接口',
      '部分产品包含保修和技术支持',
      '安全空运 14-21 天或海运集装箱 60-75 天',
    ],
    sections: [
      {
        title: '从中国进口哪些电子产品？',
        body: '深圳是全球最大的电子市场。我们为非洲市场采购各类科技产品，并特别注意规格兼容性（电压、语言、网络）。',
        items: [
          '智能手机和手机（Android、功能机）',
          '笔记本电脑、平板和电脑配件',
          '手机配件：手机壳、耳机、充电器、数据线',
          '消费电子：音箱、智能手表、无人机',
          '电子元器件和备件',
          '家用电器和太阳能设备',
        ],
      },
      {
        title: '为什么电子产品选深圳？',
        body: '深圳集中了全球 90% 的电子产品生产。我们的本地办事处让我们能直接接触工厂、新品和最优价格。我们了解可靠的供应商和适合非洲市场的产品。',
        items: [
          '华强北市场：全球最大的电子市场',
          '直接对接手机和配件制造工厂',
          '了解非洲的网络和电压规格',
          '发货前现场功能测试',
          '针对空运和海运的加固防震包装',
        ],
      },
      {
        title: '电子产品的安全与合规',
        body: '进口电子产品需要特别注意：锂离子电池受管制、部分设备需要 CE 认证，还要核实网络兼容性。我们为您处理这些限制。',
        items: [
          '核实您所在国家的 2G/3G/4G 网络兼容性',
          '锂离子电池测试和运输认证',
          '功能质检：屏幕、触控、摄像头、接口',
          '易碎和电子产品专用包装',
          '关于马里禁运或受管制产品的建议',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找科技产品供应商', '仿冒和假货风险', '经核验的深圳供应商'],
      ['核验电子产品质量', '收货时发现产品有缺陷', '现场完整功能测试'],
      ['非洲兼容性', '手机与网络不兼容', '核验 2G/3G/4G 和电压'],
      ['安全运输', '锂电池被拒运', '认证包装 + IATA 文件'],
      ['产品保修', '无法追索', '技术支持和精选保修'],
    ],
    process: [
      '通过 WhatsApp 说明您的电子产品需求（型号、数量、预算）。',
      '我们在深圳筛选 3-5 家合格供应商并进行比较。',
      '您在收到技术规格和照片后确认。',
      '我们测试功能、安全包装并付款。',
      '空运或海运 + 清关 + 交付。',
    ],
    faqs: [
      {
        question: '我可以把中国手机进口到马里吗？',
        answer: '可以，但需要核实与马里运营商的 2G/3G/4G 网络兼容性。我们测试每个型号，并推荐适合马里市场的手机。',
      },
      {
        question: '锂电池可以空运吗？',
        answer: '可以，但有明确条件：专用包装、IATA 申报，且每箱数量有限制。我们负责全部文件，确保运输安全。',
      },
      {
        question: '进口电子产品有什么保修？',
        answer: '我们选择提供 6 到 12 个月厂家保修的供应商。发货前测试每件产品，并记录序列号以便跟进。',
      },
      {
        question: '我可以进口知名品牌的仿制品吗？',
        answer: '不可以，我们不采购假冒产品。我们提供高品质的中国原创品牌（小米、Tecno、Infinix、Oppo）或规格相当的无品牌产品。',
      },
      {
        question: '从中国收到电子产品需要多久？',
        answer: '电子产品空运 14-21 天到巴马科。海运集装箱需要 60-75 天。锂电池因办理文件可能使空运时间增加 2-3 天。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/air-freight', label: '安全空运' },
      { href: '/zh/services/verification-fournisseur-chine', label: '供应商核验' },
      { href: '/zh/calculateur', label: '计算电子产品运费' },
    ],
  },
  ar: {
    badge: 'استيراد الإلكترونيات من الصين',
    title: 'استيراد الإلكترونيات من الصين إلى أفريقيا',
    intro: 'هل ترغب في استيراد الهواتف أو الحواسيب أو الإكسسوارات الإلكترونية أو الأجهزة الصغيرة من الصين إلى مالي أو السنغال أو غرب أفريقيا؟ ChinaLink Express وكيل التوريد المتخصص في الإلكترونيات لديك في شنتشن، عاصمة التكنولوجيا العالمية. نورّد مباشرة من سوق هواتشيانغبي للإلكترونيات، ونتحقق من الجودة والمواصفات الفنية، ونشحن بتغليف مقاوم للصدمات مع التأمين.',
    highlights: [
      'توريد مباشر من هواتشيانغبي في شنتشن وأسواق التكنولوجيا',
      'الهواتف والحواسيب والإكسسوارات والأجهزة الصغيرة والمكونات',
      'فحص فني: الأداء والبطارية والشاشة والمنافذ',
      'ضمان ودعم فني مشمولان في بعض المنتجات',
      'شحن جوي آمن خلال 14-21 يومًا أو حاوية بحرية خلال 60-75 يومًا',
    ],
    sections: [
      {
        title: 'ما الإلكترونيات التي يمكن استيرادها من الصين؟',
        body: 'شنتشن أكبر سوق للإلكترونيات في العالم. نورّد جميع المنتجات التقنية للسوق الأفريقية مع اهتمام خاص بتوافق المواصفات (الجهد واللغة والشبكة).',
        items: [
          'الهواتف الذكية والهواتف المحمولة (Android والهواتف البسيطة)',
          'الحواسيب المحمولة والأجهزة اللوحية وملحقات الحاسوب',
          'إكسسوارات الهاتف: أغطية وسماعات وشواحن وكابلات',
          'الإلكترونيات الاستهلاكية: مكبرات صوت وساعات ذكية وطائرات مسيّرة',
          'المكونات الإلكترونية وقطع الغيار',
          'الأجهزة المنزلية ومعدات الطاقة الشمسية',
        ],
      },
      {
        title: 'لماذا شنتشن للإلكترونيات؟',
        body: 'تتركز في شنتشن 90% من الإنتاج العالمي للإلكترونيات. يمنحنا مكتبنا المحلي وصولًا مباشرًا إلى المصانع وأحدث المنتجات وأفضل الأسعار. ونعرف الموردين الموثوقين والمنتجات المناسبة للسوق الأفريقية.',
        items: [
          'سوق هواتشيانغبي: أكبر سوق للإلكترونيات في العالم',
          'وصول مباشر إلى مصانع الهواتف والإكسسوارات',
          'معرفة بمواصفات الشبكات والجهد في أفريقيا',
          'اختبارات أداء ميدانية قبل الشحن',
          'تغليف مقوى مقاوم للصدمات للنقل الجوي والبحري',
        ],
      },
      {
        title: 'سلامة الإلكترونيات ومطابقتها',
        body: 'يتطلب استيراد الإلكترونيات احتياطات خاصة: بطاريات الليثيوم أيون منظمة، وشهادة CE مطلوبة لبعض الأجهزة، ويجب التحقق من توافق الشبكة. نتولى هذه القيود نيابة عنك.',
        items: [
          'التحقق من توافق شبكات 2G/3G/4G في بلدك',
          'اختبار بطاريات الليثيوم أيون وشهادات النقل',
          'فحص الأداء: الشاشة واللمس والكاميرا والمنافذ',
          'تغليف متخصص للمنتجات الهشة والإلكترونيات',
          'نصائح بشأن المنتجات المحظورة أو المنظمة في مالي',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على مورد تقنيات', 'خطر النسخ والتقليد', 'موردون موثقون في شنتشن'],
      ['التحقق من جودة الإلكترونيات', 'منتجات معيبة عند الاستلام', 'اختبارات أداء كاملة ميدانيًا'],
      ['التوافق مع أفريقيا', 'هواتف غير متوافقة مع الشبكة', 'التحقق من 2G/3G/4G والجهد'],
      ['شحن آمن', 'رفض بطاريات الليثيوم', 'تغليف معتمد + مستندات IATA'],
      ['ضمان المنتج', 'لا سبيل للمطالبة', 'دعم فني وضمان مختار'],
    ],
    process: [
      'صف احتياجاتك من الإلكترونيات (الطراز والكمية والميزانية) عبر WhatsApp.',
      'نختار 3-5 موردين مؤهلين في شنتشن ونقارن بينهم.',
      'تؤكد بعد استلام المواصفات الفنية والصور.',
      'نختبر الأداء ونغلف بأمان وندفع.',
      'شحن جوي أو بحري + تخليص جمركي + تسليم.',
    ],
    faqs: [
      {
        question: 'هل يمكنني استيراد هواتف صينية إلى مالي؟',
        answer: 'نعم، لكن يجب التحقق من توافق شبكات 2G/3G/4G مع المشغلين في مالي. نختبر كل طراز ونوصي بالهواتف المناسبة للسوق المالية.',
      },
      {
        question: 'هل يُسمح ببطاريات الليثيوم في الشحن الجوي؟',
        answer: 'نعم، بشروط محددة: تغليف متخصص وتصريح IATA وكميات محدودة لكل طرد. نتولى كل المستندات لنقل آمن.',
      },
      {
        question: 'ما الضمان على الإلكترونيات المستوردة؟',
        answer: 'نختار موردين يقدمون ضمانًا من الشركة المصنعة من 6 إلى 12 شهرًا. نختبر كل منتج قبل الشحن ونوثق الأرقام التسلسلية للمتابعة.',
      },
      {
        question: 'هل يمكنني استيراد نسخ مقلدة من ماركات معروفة؟',
        answer: 'لا، نحن لا نورّد المنتجات المقلدة. نقدم ماركات صينية أصلية عالية الجودة (Xiaomi وTecno وInfinix وOppo) أو منتجات بلا علامة بمواصفات مماثلة.',
      },
      {
        question: 'كم يستغرق استلام الإلكترونيات من الصين؟',
        answer: 'يصل الشحن الجوي للإلكترونيات خلال 14-21 يومًا إلى باماكو. وتستغرق الحاوية البحرية 60-75 يومًا. وقد تضيف بطاريات الليثيوم 2-3 أيام إلى المدة الجوية بسبب المستندات.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/air-freight', label: 'شحن جوي آمن' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المورد' },
      { href: '/ar/calculateur', label: 'احسب كلفة شحن الإلكترونيات' },
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
      ? 'Import Electronics from China to Africa | Phones, Laptops, Gadgets | ChinaLink'
      : isZh ? '从中国进口电子产品到非洲 | 手机、电脑 | ChinaLink' : isAr ? 'استيراد الإلكترونيات من الصين إلى أفريقيا | الهواتف والحواسيب | ChinaLink' : 'Importer Électronique Chine Afrique | Téléphones, Ordinateurs | ChinaLink',
    description: isEn
      ? 'Import phones, laptops, accessories & electronics from China to Africa. Shenzhen sourcing agent with quality control and warranty support. Air freight 14-21 days to Bamako. WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向非洲进口手机、电脑、配件和电子产品。深圳采购代理，提供质量检查和保修支持。空运 14-21 天到巴马科。WhatsApp：+86 188 5172 5957' : isAr ? 'استورد الهواتف والحواسيب والإكسسوارات والإلكترونيات من الصين إلى أفريقيا. وكيل توريد في شنتشن مع فحص الجودة ودعم الضمان. شحن جوي خلال 14-21 يومًا إلى باماكو. WhatsApp: ‎+86 188 5172 5957' : 'Importez téléphones, ordinateurs, accessoires et électronique de Chine vers l\'Afrique. Agent sourcing Shenzhen avec contrôle qualité et support garantie. Fret aérien 14-21 jours à Bamako. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import electronics from China, wholesale phones China, buy laptops from China, electronics sourcing agent, Shenzhen electronics market, import gadgets China Africa, phone supplier China, electronics wholesale Africa, import smartphones China Mali, Huaqiangbei agent, freight forwarder China Mali'
      : isZh ? '从中国进口电子产品, 中国手机批发, 从中国购买电脑, 电子产品采购代理, 深圳电子市场, 中国进口小工具到非洲, 中国手机供应商, 中国马里货运, 中国马里货代, 中国进口智能手机到马里, 华强北代理' : isAr ? 'استيراد الإلكترونيات من الصين، هواتف بالجملة من الصين، شراء حواسيب من الصين، وكيل توريد الإلكترونيات، سوق الإلكترونيات في شنتشن، استيراد الأجهزة من الصين إلى أفريقيا، مورد هواتف في الصين، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي، استيراد الهواتف الذكية من الصين إلى مالي، وكيل في هواتشيانغبي' : 'importer électronique Chine, gros téléphones Chine, acheter ordinateurs Chine, agent sourcing électronique, marché électronique Shenzhen, importer gadgets Chine Afrique, fournisseur téléphones Chine, cargo chine mali, transitaire chine mali, importer smartphones Chine Mali, agent Huaqiangbei',
    path: '/industries/electronique-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function ElectronicsPage({ params }: Props) {
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
      { name: isEn ? 'Electronics China Africa' : isZh ? '中国—非洲电子产品' : isAr ? 'الإلكترونيات من الصين إلى أفريقيا' : 'Électronique Chine Afrique', url: `/${locale}/industries/electronique-chine-afrique` },
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
