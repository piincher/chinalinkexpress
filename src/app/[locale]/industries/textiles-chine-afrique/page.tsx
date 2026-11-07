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
    badge: 'Import Textiles Chine',
    title: 'Importer des textiles et vêtements de Chine vers l\'Afrique',
    intro: 'Vous cherchez à importer des textiles, tissus, vêtements ou accessoires de mode de Chine vers le Mali, le Sénégal ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing textile depuis les marchés de gros de Guangzhou, Yiwu et Keqiao. Nous trouvons les meilleures usines textiles, négocions les prix au mètre ou en gros, contrôlons la qualité du tissu et expédions par conteneur FCL, groupage LCL ou fret aérien selon vos besoins.',
    highlights: [
      'Sourcing direct depuis les marchés textiles de Guangzhou et Keqiao',
      'Usines de vêtements, tissus, wax, dentelle et accessoires',
      'Négociation prix au mètre et en gros container',
      'Contrôle qualité tissu, couture et finitions avant expédition',
      'Fret maritime conteneur ou aérien express vers Bamako/Dakar',
    ],
    sections: [
      {
        title: 'Quels textiles pouvez-vous importer de Chine ?',
        body: 'La Chine est le premier producteur mondial de textiles. Que vous cherchiez des tissus wax africains, des dentelles, des vêtements prêt-à-porter, des tissus polyester, coton, soie ou des accessoires de mode, nous sourçons directement auprès des usines et marchés de gros chinois.',
        items: [
          'Tissus wax et imprimés africains (qualité supérieure à prix usine)',
          'Dentelles, broderies et tissus de cérémonie',
          'Vêtements prêt-à-porter femme, homme et enfant',
          'Tissus polyester, coton, soie, satin et voile',
          'Accessoires mode : sacs, chaussures, bijoux fantaisie',
          'Foulards, pagnes et tenues traditionnelles',
        ],
      },
      {
        title: 'Les marchés textiles chinois où nous sourçons',
        body: 'Notre bureau à Guangzhou et nos partenaires à Yiwu nous donnent un accès direct aux plus grands marchés textiles de Chine. Nous connaissons les meilleurs fournisseurs pour chaque type de produit.',
        items: [
          'Marché textile Guangzhou (Zhongda) : le plus grand marché de tissus d\'Asie',
          'Keqiao Textile Market : spécialiste des tissus en rouleau',
          'Yiwu Market : accessoires mode, bijoux et petites quantités',
          'Usines directes à Guangdong pour production sur mesure',
        ],
      },
      {
        title: 'Conteneur textile vs fret aérien : quel mode choisir ?',
        body: 'Le choix du transport dépend de votre volume, de votre budget et de l\'urgence. Pour les textiles, le conteneur maritime est le plus économique pour les gros volumes, tandis que le fret aérien convient aux échantillons et collections urgentes.',
        items: [
          'Conteneur FCL 20ft/40ft : idéal pour 5000-20000 pièces, 60-75 jours',
          'Groupage LCL : parfait pour 500-3000 pièces, tarif au CBM',
          'Fret aérien : pour échantillons, collections urgentes, 14-21 jours',
          'Consolidation textile : regroupez plusieurs fournisseurs dans un seul envoi',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine textile', 'Recherche sur internet sans garantie', 'Accès direct marchés Guangzhou/Keqiao'],
      ['Négocier prix tissu', 'Prix export élevés', 'Prix usine négociés en mandarin'],
      ['Vérifier qualité textile', 'Surprise à la réception', 'Inspection tissu, couture, couleur sur place'],
      ['Expédier conteneur textile', 'Chaque usine envoie séparément', 'Consolidation + conteneur optimisé'],
      ['Dédouanement Mali', 'Démarches complexes seul', 'Dédouanement inclus, livraison porte à porte'],
    ],
    process: [
      'Décrivez vos besoins textiles (type, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 usines ou grossistes sur les marchés chinois.',
      'Vous choisissez parmi les échantillons et devis négociés.',
      'Nous inspectons la qualité, payons l\'usine et consolidons.',
      'Expédition conteneur ou aérien + dédouanement + livraison au Mali.',
    ],
    faqs: [
      {
        question: 'Quel est le prix d\'un conteneur de vêtements Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft de textiles coûte entre 3200 et 4500 USD selon la saison et le port de départ. Le groupage LCL est à environ 120 USD par CBM. Le fret aérien textile est entre 8 et 12 USD/kg. Demandez un devis précis sur WhatsApp.',
      },
      {
        question: 'Puis-je importer des wax africains de Chine ?',
        answer: 'Oui, de nombreuses usines chinoises produisent des tissus wax de qualité pour le marché africain. Nous sourçons directement auprès de ces usines à des prix bien inférieurs aux importations européennes.',
      },
      {
        question: 'Comment vérifier la qualité des tissus avant expédition ?',
        answer: 'Nous réalisons une inspection complète : vérification du tissu (composition, poids, toucher), contrôle des coutures et finitions, comparaison couleur avec échantillon, et photos détaillées avant validation de l\'expédition.',
      },
      {
        question: 'Quel délai pour recevoir un conteneur textile au Mali ?',
        answer: 'La production textile prend 15-45 jours selon la complexité. Le fret maritime ajoute 60-75 jours jusqu\'à Bamako. Le fret aérien textile est livré en 14-21 jours.',
      },
      {
        question: 'Livrez-vous dans d\'autres pays d\'Afrique de l\'Ouest ?',
        answer: 'Oui, nous livrons des textiles au Sénégal, Côte d\'Ivoire, Ghana, Nigeria, Burkina Faso, Niger, Bénin, Togo, Guinée et bien d\'autres pays africains.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/air-freight', label: 'Fret aérien express' },
      { href: '/fr/calculateur', label: 'Calculer coût conteneur textile' },
    ],
  },
  en: {
    badge: 'Import Textiles China',
    title: 'Import Textiles and Clothing from China to Africa',
    intro: 'Looking to import textiles, fabrics, clothing, or fashion accessories from China to Mali, Senegal, or West Africa? ChinaLink Express is your specialized partner for textile sourcing from the wholesale markets of Guangzhou, Yiwu, and Keqiao. We find the best textile factories, negotiate meter and bulk prices, control fabric quality, and ship by FCL container, LCL consolidation, or air freight according to your needs.',
    highlights: [
      'Direct sourcing from Guangzhou and Keqiao textile markets',
      'Clothing factories, fabrics, wax, lace, and accessories',
      'Price negotiation per meter and bulk container rates',
      'Fabric, stitching, and finishing quality control before shipping',
      'Sea freight container or air express to Bamako/Dakar',
    ],
    sections: [
      {
        title: 'What textiles can you import from China?',
        body: 'China is the world\'s largest textile producer. Whether you\'re looking for African wax prints, lace, ready-to-wear clothing, polyester, cotton, silk fabrics, or fashion accessories, we source directly from Chinese factories and wholesale markets.',
        items: [
          'Wax prints and African fabrics (superior quality at factory prices)',
          'Lace, embroidery, and ceremony fabrics',
          'Ready-to-wear clothing for women, men, and children',
          'Polyester, cotton, silk, satin, and veil fabrics',
          'Fashion accessories: bags, shoes, costume jewelry',
          'Scarves, pagne, and traditional outfits',
        ],
      },
      {
        title: 'Chinese textile markets where we source',
        body: 'Our Guangzhou office and partners in Yiwu give us direct access to China\'s largest textile markets. We know the best suppliers for each product type.',
        items: [
          'Guangzhou Textile Market (Zhongda): Asia\'s largest fabric market',
          'Keqiao Textile Market: specialist in roll fabrics',
          'Yiwu Market: fashion accessories, jewelry, and small quantities',
          'Direct factories in Guangdong for custom production',
        ],
      },
      {
        title: 'Textile container vs air freight: which mode to choose?',
        body: 'The choice of transport depends on your volume, budget, and urgency. For textiles, sea freight container is the most economical for large volumes, while air freight suits samples and urgent collections.',
        items: [
          'FCL 20ft/40ft container: ideal for 5000-20000 pieces, 60-75 days',
          'LCL consolidation: perfect for 500-3000 pieces, per CBM rate',
          'Air freight: for samples, urgent collections, 14-21 days',
          'Textile consolidation: group multiple suppliers in one shipment',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find textile factory', 'Internet research without guarantee', 'Direct access to Guangzhou/Keqiao markets'],
      ['Negotiate fabric prices', 'High export prices', 'Factory prices negotiated in Mandarin'],
      ['Verify textile quality', 'Surprise on receipt', 'On-site fabric, stitching, color inspection'],
      ['Ship textile container', 'Each factory ships separately', 'Consolidation + optimized container'],
      ['Mali customs clearance', 'Complex procedures alone', 'Customs included, door-to-door delivery'],
    ],
    process: [
      'Describe your textile needs (type, quantity, budget) on WhatsApp.',
      'We research 3-5 factories or wholesalers in Chinese markets.',
      'You choose from negotiated samples and quotes.',
      'We inspect quality, pay the factory, and consolidate.',
      'Container or air shipping + customs clearance + delivery to Mali.',
    ],
    faqs: [
      {
        question: 'What is the price of a clothing container China-Mali?',
        answer: 'A 20ft FCL container of textiles costs between $3200 and $4500 depending on the season and departure port. LCL consolidation is about $120 per CBM. Textile air freight is between $8-12/kg. Request a precise quote on WhatsApp.',
      },
      {
        question: 'Can I import African wax prints from China?',
        answer: 'Yes, many Chinese factories produce quality wax fabrics for the African market. We source directly from these factories at prices well below European imports.',
      },
      {
        question: 'How to verify fabric quality before shipping?',
        answer: 'We conduct a complete inspection: fabric check (composition, weight, feel), stitching and finishing control, color comparison with sample, and detailed photos before validating shipment.',
      },
      {
        question: 'What is the timeline to receive a textile container in Mali?',
        answer: 'Textile production takes 15-45 days depending on complexity. Sea freight adds 60-75 days to Bamako. Textile air freight delivers in 14-21 days.',
      },
      {
        question: 'Do you deliver to other West African countries?',
        answer: 'Yes, we deliver textiles to Senegal, Ivory Coast, Ghana, Nigeria, Burkina Faso, Niger, Benin, Togo, Guinea, and many other African countries.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/air-freight', label: 'Air freight express' },
      { href: '/en/calculateur', label: 'Calculate textile container cost' },
    ],
  },
  zh: {
    badge: '从中国进口纺织品',
    title: '从中国向非洲进口纺织品和服装',
    intro: '您想从中国向马里、塞内加尔或西非进口纺织品、面料、服装或时尚配件吗？ChinaLink Express 是您在广州、义乌和柯桥批发市场采购纺织品的专业伙伴。我们寻找最好的纺织工厂，按米或按批量谈判价格，检查面料质量，并根据您的需要通过 FCL 整箱、LCL 拼箱或空运发货。',
    highlights: [
      '直接从广州和柯桥纺织市场采购',
      '服装、面料、蜡染布、蕾丝和配件工厂',
      '按米和整柜批量谈判价格',
      '发货前检查面料、缝制和整理质量',
      '集装箱海运或快速空运到巴马科/达喀尔',
    ],
    sections: [
      {
        title: '您可以从中国进口哪些纺织品？',
        body: '中国是全球最大的纺织品生产国。无论您需要非洲蜡染布、蕾丝、成衣、涤纶、棉、丝绸面料还是时尚配件，我们都直接向中国工厂和批发市场采购。',
        items: [
          '蜡染布和非洲印花布（工厂价高品质）',
          '蕾丝、刺绣和礼服面料',
          '女装、男装和童装成衣',
          '涤纶、棉、丝绸、缎面和薄纱面料',
          '时尚配件：包、鞋、时尚首饰',
          '头巾、缠腰布和传统服饰',
        ],
      },
      {
        title: '我们采购的中国纺织市场',
        body: '我们在广州的办事处和义乌的合作伙伴让我们能直接进入中国最大的纺织市场。我们了解每类产品的最佳供应商。',
        items: [
          '广州中大纺织市场：亚洲最大的面料市场',
          '柯桥纺织市场：卷装面料专家',
          '义乌市场：时尚配件、首饰和小批量',
          '广东直接工厂，可定制生产',
        ],
      },
      {
        title: '纺织品集装箱与空运：选哪种方式？',
        body: '运输方式取决于您的货量、预算和紧急程度。对于纺织品，大批量时海运集装箱最经济，而空运适合样品和紧急系列。',
        items: [
          '20/40 尺 FCL 集装箱：适合 5000-20000 件，60-75 天',
          'LCL 拼箱：适合 500-3000 件，按 CBM 计费',
          '空运：适合样品、紧急系列，14-21 天',
          '纺织品集运：把多家供应商的货合并到一票',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找纺织工厂', '网上搜索没有保障', '直接进入广州/柯桥市场'],
      ['谈判面料价格', '出口价高', '用中文谈判工厂价'],
      ['核验纺织品质量', '收货时才发现问题', '现场检查面料、缝制和颜色'],
      ['发运纺织品集装箱', '每家工厂单独发货', '集运 + 优化集装箱'],
      ['马里清关', '自己办理手续复杂', '包含清关，门到门交付'],
    ],
    process: [
      '通过 WhatsApp 说明您的纺织品需求（类型、数量、预算）。',
      '我们在中国市场寻找 3-5 家工厂或批发商。',
      '您从样品和谈判后的报价中选择。',
      '我们检查质量、向工厂付款并集运。',
      '集装箱或空运 + 清关 + 交付到马里。',
    ],
    faqs: [
      {
        question: '中国到马里的服装集装箱价格是多少？',
        answer: '一个 20 尺 FCL 纺织品集装箱费用在 3200 到 4500 美元之间，取决于季节和始发港。LCL 拼箱约每 CBM 120 美元。纺织品空运每公斤 8 到 12 美元。请在 WhatsApp 上索取准确报价。',
      },
      {
        question: '我可以从中国进口非洲蜡染布吗？',
        answer: '可以，许多中国工厂为非洲市场生产优质蜡染布。我们直接向这些工厂采购，价格远低于欧洲进口。',
      },
      {
        question: '发货前如何核验面料质量？',
        answer: '我们进行全面检查：核验面料（成分、克重、手感）、检查缝制和整理、与样品比对颜色，并在确认发货前提供详细照片。',
      },
      {
        question: '纺织品集装箱到马里需要多久？',
        answer: '纺织品生产根据复杂程度需要 15-45 天。海运到巴马科再加 60-75 天。纺织品空运 14-21 天送达。',
      },
      {
        question: '你们也送到其他西非国家吗？',
        answer: '是的，我们把纺织品送到塞内加尔、科特迪瓦、加纳、尼日利亚、布基纳法索、尼日尔、贝宁、多哥、几内亚以及其他许多非洲国家。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/sea-freight', label: '集装箱海运' },
      { href: '/zh/services/air-freight', label: '快速空运' },
      { href: '/zh/calculateur', label: '计算纺织品集装箱费用' },
    ],
  },
  ar: {
    badge: 'استيراد المنسوجات من الصين',
    title: 'استيراد المنسوجات والملابس من الصين إلى أفريقيا',
    intro: 'هل تبحث عن استيراد المنسوجات أو الأقمشة أو الملابس أو إكسسوارات الموضة من الصين إلى مالي أو السنغال أو غرب أفريقيا؟ ChinaLink Express شريكك المتخصص في توريد المنسوجات من أسواق الجملة في قوانغتشو وييوو وكيتشياو. نجد أفضل مصانع النسيج، ونتفاوض على الأسعار بالمتر أو بالجملة، ونفحص جودة القماش، ونشحن بحاوية FCL أو شحن مجمّع LCL أو جوًا حسب حاجتك.',
    highlights: [
      'توريد مباشر من أسواق النسيج في قوانغتشو وكيتشياو',
      'مصانع الملابس والأقمشة والواكس والدانتيل والإكسسوارات',
      'التفاوض على السعر بالمتر وبالحاوية بالجملة',
      'فحص جودة القماش والخياطة والتشطيبات قبل الشحن',
      'شحن بحري بالحاويات أو جوي سريع إلى باماكو أو داكار',
    ],
    sections: [
      {
        title: 'ما المنسوجات التي يمكنك استيرادها من الصين؟',
        body: 'الصين أكبر منتج للمنسوجات في العالم. سواء كنت تبحث عن أقمشة الواكس الأفريقية أو الدانتيل أو الملابس الجاهزة أو أقمشة البوليستر والقطن والحرير أو إكسسوارات الموضة، نورّد مباشرة من المصانع وأسواق الجملة الصينية.',
        items: [
          'أقمشة الواكس والمطبوعات الأفريقية (جودة عالية بسعر المصنع)',
          'الدانتيل والتطريز وأقمشة المناسبات',
          'ملابس جاهزة للنساء والرجال والأطفال',
          'أقمشة البوليستر والقطن والحرير والساتان والفوال',
          'إكسسوارات الموضة: حقائب وأحذية ومجوهرات تقليدية',
          'أوشحة وأقمشة بانيي وأزياء تقليدية',
        ],
      },
      {
        title: 'أسواق النسيج الصينية التي نورّد منها',
        body: 'يمنحنا مكتبنا في قوانغتشو وشركاؤنا في ييوو وصولًا مباشرًا إلى أكبر أسواق النسيج في الصين. ونعرف أفضل الموردين لكل نوع من المنتجات.',
        items: [
          'سوق النسيج في قوانغتشو (تشونغدا): أكبر سوق أقمشة في آسيا',
          'سوق كيتشياو للنسيج: متخصص في الأقمشة باللفائف',
          'سوق ييوو: إكسسوارات الموضة والمجوهرات والكميات الصغيرة',
          'مصانع مباشرة في قوانغدونغ للإنتاج حسب الطلب',
        ],
      },
      {
        title: 'حاوية منسوجات أم شحن جوي: أي طريقة تختار؟',
        body: 'تعتمد طريقة النقل على حجم بضاعتك وميزانيتك ومدى الاستعجال. بالنسبة إلى المنسوجات، الحاوية البحرية هي الأوفر للكميات الكبيرة، أما الشحن الجوي فيناسب العينات والمجموعات العاجلة.',
        items: [
          'حاوية FCL مقاس 20/40 قدمًا: مثالية لـ5000-20000 قطعة، 60-75 يومًا',
          'شحن مجمّع LCL: مناسب لـ500-3000 قطعة، السعر بالـCBM',
          'الشحن الجوي: للعينات والمجموعات العاجلة، 14-21 يومًا',
          'تجميع المنسوجات: اجمع عدة موردين في شحنة واحدة',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على مصنع نسيج', 'بحث عبر الإنترنت بلا ضمان', 'وصول مباشر إلى أسواق قوانغتشو وكيتشياو'],
      ['التفاوض على سعر القماش', 'أسعار تصدير مرتفعة', 'أسعار مصنع متفاوض عليها بالصينية'],
      ['التحقق من جودة المنسوجات', 'مفاجآت عند الاستلام', 'فحص القماش والخياطة واللون ميدانيًا'],
      ['شحن حاوية منسوجات', 'كل مصنع يشحن على حدة', 'تجميع + حاوية محسّنة'],
      ['التخليص الجمركي في مالي', 'إجراءات معقدة بمفردك', 'التخليص الجمركي مشمول، تسليم من الباب إلى الباب'],
    ],
    process: [
      'صف احتياجاتك من المنسوجات (النوع والكمية والميزانية) عبر WhatsApp.',
      'نبحث عن 3-5 مصانع أو تجار جملة في الأسواق الصينية.',
      'تختار من بين العينات والعروض المتفاوض عليها.',
      'نفحص الجودة وندفع للمصنع ونجمع البضائع.',
      'شحن بالحاوية أو جوًا + تخليص جمركي + تسليم في مالي.',
    ],
    faqs: [
      {
        question: 'ما سعر حاوية ملابس من الصين إلى مالي؟',
        answer: 'تتراوح كلفة حاوية FCL مقاس 20 قدمًا من المنسوجات بين 3200 و4500 دولار حسب الموسم وميناء المغادرة. ويبلغ الشحن المجمّع LCL نحو 120 دولارًا لكل CBM. والشحن الجوي للمنسوجات بين 8 و12 دولارًا/كغ. اطلب عرض سعر دقيقًا عبر WhatsApp.',
      },
      {
        question: 'هل يمكنني استيراد أقمشة الواكس الأفريقية من الصين؟',
        answer: 'نعم، تنتج مصانع صينية كثيرة أقمشة واكس جيدة للسوق الأفريقية. نورّد مباشرة من هذه المصانع بأسعار أقل بكثير من الواردات الأوروبية.',
      },
      {
        question: 'كيف نتحقق من جودة الأقمشة قبل الشحن؟',
        answer: 'نجري فحصًا كاملًا: التحقق من القماش (التركيب والوزن والملمس)، وفحص الخياطة والتشطيبات، ومقارنة اللون بالعينة، وصور مفصلة قبل الموافقة على الشحن.',
      },
      {
        question: 'كم تستغرق حاوية المنسوجات حتى مالي؟',
        answer: 'يستغرق إنتاج المنسوجات 15-45 يومًا حسب التعقيد. ويضيف الشحن البحري 60-75 يومًا حتى باماكو. ويصل الشحن الجوي للمنسوجات خلال 14-21 يومًا.',
      },
      {
        question: 'هل تسلمون في دول أخرى من غرب أفريقيا؟',
        answer: 'نعم، نسلم المنسوجات في السنغال وساحل العاج وغانا ونيجيريا وبوركينا فاسو والنيجر وبنين وتوغو وغينيا ودول أفريقية أخرى كثيرة.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/sea-freight', label: 'الشحن البحري بالحاويات' },
      { href: '/ar/services/air-freight', label: 'شحن جوي سريع' },
      { href: '/ar/calculateur', label: 'احسب كلفة حاوية منسوجات' },
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
      ? 'Import Textiles from China to Africa | Clothing Wholesale Agent | ChinaLink'
      : isZh ? '从中国进口纺织品到非洲 | 中国服装批发 | ChinaLink' : isAr ? 'استيراد المنسوجات من الصين إلى أفريقيا | ملابس بالجملة من الصين | ChinaLink' : 'Importer Textiles Chine Afrique | Grossiste Vêtements Chine | ChinaLink',
    description: isEn
      ? 'Import clothing, fabrics & textiles from China to Mali, Senegal & West Africa. Source from Guangzhou wholesale markets, inspect quality, ship by air or sea container. Best prices guaranteed! WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向马里、塞内加尔和西非进口服装、面料和纺织品。在广州批发市场采购，质量检查，空运或海运。最优价格保证！WhatsApp：+86 188 5172 5957' : isAr ? 'استورد الملابس والأقمشة والمنسوجات من الصين إلى مالي والسنغال وغرب أفريقيا. توريد من أسواق الجملة في قوانغتشو وفحص الجودة وشحن جوي أو بحري. أفضل الأسعار مضمونة! WhatsApp: ‎+86 188 5172 5957' : 'Importez vêtements, tissus et textiles de Chine vers le Mali, Sénégal et Afrique de l\'Ouest. Sourcing marchés gros Guangzhou, inspection qualité, expédition air ou mer. Meilleurs tarifs garantis ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import textiles from China, wholesale clothing China, buy clothes from China, textile sourcing agent, import fabrics China Africa, garment factory China, wholesale fashion China, clothing supplier China, wax fabric China, lace fabric China, textile container shipping, freight forwarder China Mali'
      : isZh ? '从中国进口纺织品, 中国服装批发, 从中国购买服装, 纺织品采购代理, 中国进口面料到非洲, 中国服装工厂, 中国时尚批发, 中国服装供应商, 中国蜡染布, 中国蕾丝, 纺织品集装箱, 中国马里货运, 中国马里货代' : isAr ? 'استيراد المنسوجات من الصين، ملابس بالجملة من الصين، شراء ملابس من الصين، وكيل توريد المنسوجات، استيراد الأقمشة من الصين إلى أفريقيا، مصنع ملابس في الصين، موضة بالجملة من الصين، مورد ملابس في الصين، قماش واكس من الصين، دانتيل من الصين، حاوية منسوجات، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'importer textiles Chine, grossiste vêtements Chine, acheter vêtements Chine, agent sourcing textile, importer tissus Chine Afrique, usine vêtements Chine, grossiste mode Chine, fournisseur vêtements Chine, tissu wax Chine, dentelle Chine, conteneur textile, cargo chine mali, transitaire chine mali',
    path: '/industries/textiles-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function TextilesPage({ params }: Props) {
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
      { name: isEn ? 'Textiles China Africa' : isZh ? '中国—非洲纺织品' : isAr ? 'المنسوجات من الصين إلى أفريقيا' : 'Textiles Chine Afrique', url: `/${locale}/industries/textiles-chine-afrique` },
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
