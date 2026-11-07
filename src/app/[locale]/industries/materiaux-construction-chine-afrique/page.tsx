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
};

const content = {
  fr: {
    badge: 'Import Matériaux Construction',
    title: 'Importer des matériaux de construction de Chine vers l\'Afrique',
    intro: 'Vous êtes constructeur, promoteur immobilier ou négociant en matériaux de construction et vous cherchez à importer carreaux, sanitaire, quincaillerie, outils ou équipement BTP de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing de matériaux de construction depuis Foshan, la capitale mondiale de la céramique. Nous négocions les prix conteneur, vérifions la qualité des carreaux et sanitaire, et organisons le transport maritime FCL avec assurance et suivi complet.',
    highlights: [
      'Sourcing matériaux construction depuis Foshan et usines chinoises',
      'Carreaux céramique, sanitaire, robinetterie, quincaillerie et outils',
      'Négociation prix conteneur FCL 20ft/40ft avec économies 30-50%',
      'Contrôle qualité carreaux (épaisseur, planéité, couleur) avant chargement',
      'Conteneur maritime 60-75 jours + dédouanement + livraison chantier',
    ],
    sections: [
      {
        title: 'Quels matériaux de construction importer de Chine ?',
        body: 'La Chine est le premier producteur mondial de matériaux de construction. Nous sourçons directement depuis les usines de Foshan, Guangzhou et Shenzhen pour tous types de matériaux avec certification qualité.',
        items: [
          'Carreaux céramique : sol, mur, extérieur, imitation marbre et bois',
          'Sanitaire : lavabos, WC, baignoires, receveurs, robinetterie',
          'Quincaillerie bâtiment : charnières, serrures, rails, visserie',
          'Équipement BTP : échafaudages, bétonnières, compresseurs',
          'Tuyauterie et raccords PVC, PPR et métalliques',
          'Éclairage LED, câbles électriques et tableau électrique',
          'Portes, fenêtres aluminium et accessoires menuiserie',
        ],
      },
      {
        title: 'Foshan : la capitale mondiale des carreaux',
        body: 'Foshan produit 60% des carreaux céramiques mondiaux. Notre bureau partenaire nous donne un accès direct aux usines avec les meilleurs prix et la plus grande variété de modèles pour le marché africain.',
        items: [
          'Plus de 500 usines de carreaux dans la seule ville de Foshan',
          'Carreaux 30x30, 40x40, 60x60, 80x80 et grands formats',
          'Imitation marbre, imitation bois, aspect ciment, motifs africains',
          'Qualité premium (gros épaisseur) et qualité standard selon budget',
          'Possibilité de personnalisation couleur et motif à partir de 1000 m²',
        ],
      },
      {
        title: 'Transport conteneur pour matériaux de construction',
        body: 'Les matériaux de construction sont lourds, encombrants et fragiles. Le conteneur FCL est le mode de transport idéal avec un calage professionnel pour éviter les casses pendant le maritime.',
        items: [
          'Conteneur FCL 20ft : idéal pour 500-800 m² carreaux + sanitaire',
          'Conteneur FCL 40ft HC : jusqu\'à 2000 m² carreaux + matériel',
          'Calage professionnel avec bois, mousse et sangles',
          'Assurance tous risques pour matériaux de valeur',
          'Consolidation possible : carreaux + sanitaire + quincaillerie même conteneur',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Prix carreaux', 'Prix importation européenne/turque', 'Prix direct usine Foshan, -30 à 50%'],
      ['Qualité carreaux', 'Carreaux fins qui cassent', 'Contrôle épaisseur, planéité, résistance'],
      ['Variété modèles', 'Catalogue limité', 'Accès 500+ usines Foshan'],
      ['Sanitaire', 'Prix très élevés', 'Prix usine robinetterie et sanitaire'],
      ['Transport sécurisé', 'Casses fréquentes en conteneur', 'Calage pro + assurance tous risques'],
    ],
    process: [
      'Envoyez votre liste matériaux, quantités et budget sur WhatsApp.',
      'Nous recherchons les usines Foshan/Guangzhou et comparons les devis.',
      'Vous validez après réception des catalogues, échantillons photos et prix.',
      'Nous supervisons la production, contrôlons qualité et emballage.',
      'Chargement conteneur FCL + maritime + dédouanement + livraison chantier.',
    ],
    faqs: [
      {
        question: 'Quel est le prix d\'un conteneur de carreaux Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft de carreaux (500-800 m²) coûte entre 3500 et 5000 USD fret inclus jusqu\'à Bamako. Les carreaux eux-mêmes coûtent 3-8 USD/m² selon la qualité et le format. Un conteneur 40ft HC (1500-2000 m²) est plus économique au m².',
      },
      {
        question: 'Les carreaux chinois résistent-ils au climat africain ?',
        answer: 'Oui, nous sélectionnons des carreaux avec épaisseur ≥ 9mm pour sol, absorption d\'eau < 0,5% pour extérieur, et résistance au gel. Les carreaux céramique pleine masse sont particulièrement adaptés aux climats chauds et humides d\'Afrique de l\'Ouest.',
      },
      {
        question: 'Puis-je mélanger carreaux, sanitaire et quincaillerie dans un conteneur ?',
        answer: 'Absolument, c\'est même recommandé pour optimiser le coût transport. Nous consolidons tous vos matériaux dans un seul conteneur avec calage séparé pour protéger les produits fragiles (sanitaire) des produits lourds (carreaux).',
      },
      {
        question: 'Proposez-vous du sanitaire aussi ?',
        answer: 'Oui, nous sourçons lavabos, WC, baignoires, receveurs de douche et robinetterie depuis les usines de Chaozhou et Foshan. La qualité est comparable aux marques européennes à 40-60% de prix moins cher.',
      },
      {
        question: 'Quel délai pour recevoir un conteneur matériaux construction ?',
        answer: 'La production carreaux prend 15-30 jours selon le modèle. Le fret maritime ajoute 60-75 jours jusqu\'à Bamako. Pour les produits en stock, l\'expédition peut être réalisée en 7-10 jours. Total : 75-105 jours en moyenne.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis conteneur matériaux' },
    ],
  },
  en: {
    badge: 'Import Building Materials',
    title: 'Import Building Materials from China to Africa',
    intro: 'Are you a builder, real estate developer, or building materials trader looking to import tiles, sanitary ware, hardware, tools, or construction equipment from China to Mali and West Africa? ChinaLink Express is your specialized partner for construction material sourcing from Foshan, the world capital of ceramics. We negotiate container prices, verify tile and sanitary quality, and organize FCL sea freight with insurance and complete tracking.',
    highlights: [
      'Construction materials sourcing from Foshan and Chinese factories',
      'Ceramic tiles, sanitary ware, faucets, hardware, and tools',
      'FCL 20ft/40ft container price negotiation with 30-50% savings',
      'Tile quality control (thickness, flatness, color) before loading',
      'Sea freight 60-75 days + customs clearance + site delivery',
    ],
    sections: [
      {
        title: 'What building materials can you import from China?',
        body: 'China is the world\'s largest producer of building materials. We source directly from factories in Foshan, Guangzhou, and Shenzhen for all types of materials with quality certification.',
        items: [
          'Ceramic tiles: floor, wall, outdoor, marble and wood imitation',
          'Sanitary ware: washbasins, toilets, bathtubs, shower trays, faucets',
          'Building hardware: hinges, locks, rails, screws',
          'Construction equipment: scaffolding, concrete mixers, compressors',
          'PVC, PPR, and metal piping and fittings',
          'LED lighting, electrical cables, and electrical panels',
          'Aluminum doors, windows, and carpentry accessories',
        ],
      },
      {
        title: 'Foshan: the world capital of tiles',
        body: 'Foshan produces 60% of the world\'s ceramic tiles. Our partner office gives us direct access to factories with the best prices and widest variety of models for the African market.',
        items: [
          'Over 500 tile factories in Foshan city alone',
          'Tiles 30x30, 40x40, 60x60, 80x80 and large formats',
          'Marble imitation, wood imitation, cement look, African patterns',
          'Premium quality (thick) and standard quality according to budget',
          'Customization of color and pattern from 1000 m²',
        ],
      },
      {
        title: 'Container transport for building materials',
        body: 'Construction materials are heavy, bulky, and fragile. FCL container is the ideal transport mode with professional blocking to avoid breakage during sea freight.',
        items: [
          'FCL 20ft container: ideal for 500-800 m² tiles + sanitary',
          'FCL 40ft HC: up to 2000 m² tiles + equipment',
          'Professional blocking with wood, foam, and straps',
          'All-risk insurance for valuable materials',
          'Possible consolidation: tiles + sanitary + hardware in same container',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Tile prices', 'European/Turkish import prices', 'Direct Foshan factory prices, -30 to 50%'],
      ['Tile quality', 'Thin tiles that break', 'Thickness, flatness, resistance control'],
      ['Model variety', 'Limited catalog', 'Access to 500+ Foshan factories'],
      ['Sanitary ware', 'Very high prices', 'Factory prices for faucets and sanitary'],
      ['Secure transport', 'Frequent breakage in container', 'Pro blocking + all-risk insurance'],
    ],
    process: [
      'Send your materials list, quantities, and budget on WhatsApp.',
      'We research Foshan/Guangzhou factories and compare quotes.',
      'You validate after receiving catalogs, sample photos, and prices.',
      'We supervise production, control quality and packaging.',
      'FCL container loading + sea freight + customs + site delivery.',
    ],
    faqs: [
      {
        question: 'What is the price of a tile container China-Mali?',
        answer: 'A 20ft FCL tile container (500-800 m²) costs between $3500 and $5000 freight included to Bamako. The tiles themselves cost $3-8/m² depending on quality and format. A 40ft HC container (1500-2000 m²) is more economical per m².',
      },
      {
        question: 'Do Chinese tiles resist the African climate?',
        answer: 'Yes, we select tiles with thickness ≥ 9mm for floors, water absorption < 0.5% for outdoors, and frost resistance. Full-body ceramic tiles are particularly suitable for the hot and humid climates of West Africa.',
      },
      {
        question: 'Can I mix tiles, sanitary ware, and hardware in one container?',
        answer: 'Absolutely, it is even recommended to optimize transport costs. We consolidate all your materials in one container with separate blocking to protect fragile products (sanitary) from heavy products (tiles).',
      },
      {
        question: 'Do you offer sanitary ware too?',
        answer: 'Yes, we source washbasins, toilets, bathtubs, shower trays, and faucets from factories in Chaozhou and Foshan. The quality is comparable to European brands at 40-60% cheaper prices.',
      },
      {
        question: 'What is the timeline to receive a construction materials container?',
        answer: 'Tile production takes 15-30 days depending on the model. Sea freight adds 60-75 days to Bamako. For stocked products, shipping can be done in 7-10 days. Total: 75-105 days on average.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Materials container quote' },
    ],
  },
  zh: {
    badge: '进口建筑材料',
    title: '从中国向非洲进口建筑材料',
    intro: '您是建筑商、房地产开发商或建材贸易商，想从中国向马里和西非进口瓷砖、卫浴、五金、工具或建筑设备吗？ChinaLink Express 是您从全球陶瓷之都佛山采购建材的专业伙伴。我们谈判整柜价格，检查瓷砖和卫浴质量，并安排带保险和全程跟踪的 FCL 海运。',
    highlights: [
      '从佛山和中国工厂采购建材',
      '瓷砖、卫浴、水龙头、五金和工具',
      '谈判 20/40 尺 FCL 整柜价格，节省 30-50%',
      '装货前检查瓷砖质量（厚度、平整度、颜色）',
      '海运集装箱 60-75 天 + 清关 + 交付到工地',
    ],
    sections: [
      {
        title: '从中国进口哪些建筑材料？',
        body: '中国是全球最大的建筑材料生产国。我们直接从佛山、广州和深圳的工厂采购各类材料，并提供质量认证。',
        items: [
          '瓷砖：地面、墙面、户外、仿大理石和仿木',
          '卫浴：洗手盆、马桶、浴缸、淋浴底盆、水龙头',
          '建筑五金：铰链、门锁、滑轨、螺丝',
          '建筑设备：脚手架、搅拌机、空压机',
          'PVC、PPR 和金属管材及接头',
          'LED 照明、电缆和配电箱',
          '铝合金门窗和木工配件',
        ],
      },
      {
        title: '佛山：全球瓷砖之都',
        body: '佛山生产全球 60% 的瓷砖。我们的合作办事处让我们能直接对接工厂，为非洲市场提供最优价格和最多款式。',
        items: [
          '仅佛山就有 500 多家瓷砖工厂',
          '30x30、40x40、60x60、80x80 和大规格瓷砖',
          '仿大理石、仿木、水泥质感、非洲图案',
          '根据预算选择高品质（加厚）或标准品质',
          '1000 平方米起可定制颜色和图案',
        ],
      },
      {
        title: '建筑材料的集装箱运输',
        body: '建筑材料重、占空间且易碎。FCL 集装箱配合专业加固是理想的运输方式，可避免海运途中破损。',
        items: [
          '20 尺 FCL 集装箱：适合 500-800 平方米瓷砖 + 卫浴',
          '40 尺高柜 FCL 集装箱：最多 2000 平方米瓷砖 + 设备',
          '使用木材、泡沫和绑带进行专业加固',
          '贵重材料的一切险',
          '可合并：瓷砖 + 卫浴 + 五金同一集装箱',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['瓷砖价格', '欧洲/土耳其进口价', '佛山工厂直供价，便宜 30-50%'],
      ['瓷砖质量', '瓷砖薄且易碎', '检查厚度、平整度和强度'],
      ['款式选择', '目录有限', '对接佛山 500+ 工厂'],
      ['卫浴', '价格很高', '水龙头和卫浴工厂价'],
      ['安全运输', '集装箱内经常破损', '专业加固 + 一切险'],
    ],
    process: [
      '通过 WhatsApp 发送您的材料清单、数量和预算。',
      '我们寻找佛山/广州工厂并比较报价。',
      '您在收到目录、样品照片和价格后确认。',
      '我们监督生产，检查质量和包装。',
      'FCL 装柜 + 海运 + 清关 + 交付到工地。',
    ],
    faqs: [
      {
        question: '中国到马里的瓷砖集装箱价格是多少？',
        answer: '一个 20 尺 FCL 瓷砖集装箱（500-800 平方米）含运费到巴马科的费用在 3500 到 5000 美元之间。瓷砖本身根据质量和规格每平方米 3-8 美元。40 尺高柜（1500-2000 平方米）每平方米更经济。',
      },
      {
        question: '中国瓷砖能适应非洲气候吗？',
        answer: '能，我们选择地砖厚度 ≥ 9 毫米、户外吸水率 < 0.5% 且抗冻的瓷砖。通体瓷砖特别适合西非炎热潮湿的气候。',
      },
      {
        question: '我可以把瓷砖、卫浴和五金混装在一个集装箱吗？',
        answer: '当然可以，我们也建议这样做以优化运输成本。我们把您的所有材料合并到一个集装箱，并分开加固，以保护易碎产品（卫浴）不受重型产品（瓷砖）影响。',
      },
      {
        question: '你们也提供卫浴吗？',
        answer: '提供，我们从潮州和佛山的工厂采购洗手盆、马桶、浴缸、淋浴底盆和水龙头。质量可与欧洲品牌相比，价格便宜 40-60%。',
      },
      {
        question: '收到建材集装箱需要多久？',
        answer: '瓷砖生产根据型号需要 15-30 天。海运到巴马科再加 60-75 天。现货产品可在 7-10 天内发货。平均总计 75-105 天。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/sea-freight', label: '集装箱海运' },
      { href: '/zh/services/verification-fournisseur-chine', label: '工厂核验' },
      { href: '/zh/calculateur', label: '建材集装箱报价' },
    ],
  },
  ar: {
    badge: 'استيراد مواد البناء',
    title: 'استيراد مواد البناء من الصين إلى أفريقيا',
    intro: 'هل أنت مقاول أو مطور عقاري أو تاجر مواد بناء وتبحث عن استيراد البلاط أو الأدوات الصحية أو الخردوات أو العدد أو معدات البناء من الصين إلى مالي وغرب أفريقيا؟ ChinaLink Express شريكك المتخصص في توريد مواد البناء من فوشان، عاصمة السيراميك العالمية. نتفاوض على أسعار الحاويات ونفحص جودة البلاط والأدوات الصحية وننظم الشحن البحري FCL مع التأمين والمتابعة الكاملة.',
    highlights: [
      'توريد مواد البناء من فوشان والمصانع الصينية',
      'بلاط السيراميك والأدوات الصحية والحنفيات والخردوات والعدد',
      'التفاوض على سعر حاوية FCL مقاس 20/40 قدمًا مع توفير 30-50%',
      'فحص جودة البلاط (السماكة والاستواء واللون) قبل التحميل',
      'حاوية بحرية خلال 60-75 يومًا + تخليص جمركي + تسليم في الموقع',
    ],
    sections: [
      {
        title: 'ما مواد البناء التي يمكن استيرادها من الصين؟',
        body: 'الصين أكبر منتج لمواد البناء في العالم. نورّد مباشرة من مصانع فوشان وقوانغتشو وشنتشن جميع أنواع المواد مع شهادات الجودة.',
        items: [
          'بلاط السيراميك: للأرضيات والجدران والخارج، بتقليد الرخام والخشب',
          'الأدوات الصحية: مغاسل ومراحيض وأحواض استحمام وقواعد دش وحنفيات',
          'خردوات البناء: مفصلات وأقفال وسكك ومسامير',
          'معدات البناء: سقالات وخلاطات خرسانة وضواغط',
          'أنابيب ووصلات PVC وPPR ومعدنية',
          'إضاءة LED وكابلات كهربائية ولوحات كهرباء',
          'أبواب ونوافذ ألمنيوم وإكسسوارات نجارة',
        ],
      },
      {
        title: 'فوشان: عاصمة البلاط في العالم',
        body: 'تنتج فوشان 60% من بلاط السيراميك في العالم. يمنحنا مكتبنا الشريك وصولًا مباشرًا إلى المصانع بأفضل الأسعار وأكبر تشكيلة من النماذج للسوق الأفريقية.',
        items: [
          'أكثر من 500 مصنع بلاط في فوشان وحدها',
          'بلاط 30x30 و40x40 و60x60 و80x80 ومقاسات كبيرة',
          'تقليد الرخام والخشب ومظهر الإسمنت وزخارف أفريقية',
          'جودة ممتازة (سماكة كبيرة) أو جودة قياسية حسب الميزانية',
          'إمكانية تخصيص اللون والزخرفة ابتداءً من 1000 م²',
        ],
      },
      {
        title: 'النقل بالحاويات لمواد البناء',
        body: 'مواد البناء ثقيلة وكبيرة وهشة. وحاوية FCL مع تثبيت احترافي هي الطريقة المثالية لتجنب الكسر أثناء النقل البحري.',
        items: [
          'حاوية FCL مقاس 20 قدمًا: مثالية لـ500-800 م² من البلاط + الأدوات الصحية',
          'حاوية FCL مقاس 40 قدمًا عالية: حتى 2000 م² من البلاط + المعدات',
          'تثبيت احترافي بالخشب والرغوة والأحزمة',
          'تأمين شامل للمواد الثمينة',
          'إمكانية التجميع: بلاط + أدوات صحية + خردوات في الحاوية نفسها',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['سعر البلاط', 'سعر الاستيراد من أوروبا أو تركيا', 'سعر مصنع فوشان المباشر، أقل بنسبة 30-50%'],
      ['جودة البلاط', 'بلاط رقيق يتكسر', 'فحص السماكة والاستواء والمتانة'],
      ['تنوع النماذج', 'كتالوج محدود', 'الوصول إلى أكثر من 500 مصنع في فوشان'],
      ['الأدوات الصحية', 'أسعار مرتفعة جدًا', 'سعر المصنع للحنفيات والأدوات الصحية'],
      ['نقل آمن', 'كسور متكررة داخل الحاوية', 'تثبيت احترافي + تأمين شامل'],
    ],
    process: [
      'أرسل قائمة المواد والكميات والميزانية عبر WhatsApp.',
      'نبحث عن مصانع في فوشان وقوانغتشو ونقارن العروض.',
      'تؤكد بعد استلام الكتالوجات وصور العينات والأسعار.',
      'نشرف على الإنتاج ونفحص الجودة والتغليف.',
      'تحميل حاوية FCL + شحن بحري + تخليص جمركي + تسليم في الموقع.',
    ],
    faqs: [
      {
        question: 'ما سعر حاوية بلاط من الصين إلى مالي؟',
        answer: 'تتراوح كلفة حاوية FCL مقاس 20 قدمًا من البلاط (500-800 م²) بين 3500 و5000 دولار شاملة الشحن حتى باماكو. ويبلغ سعر البلاط نفسه 3-8 دولارات/م² حسب الجودة والمقاس. والحاوية العالية 40 قدمًا (1500-2000 م²) أوفر للمتر المربع.',
      },
      {
        question: 'هل يتحمل البلاط الصيني مناخ أفريقيا؟',
        answer: 'نعم، نختار بلاطًا بسماكة ≥ 9 مم للأرضيات، وامتصاص ماء < 0.5% للخارج، ومقاومة للتجمد. وبلاط السيراميك كامل الجسم مناسب خصوصًا لمناخ غرب أفريقيا الحار والرطب.',
      },
      {
        question: 'هل يمكنني جمع البلاط والأدوات الصحية والخردوات في حاوية واحدة؟',
        answer: 'بالتأكيد، ونوصي بذلك لتقليل كلفة النقل. نجمع كل موادك في حاوية واحدة مع تثبيت منفصل لحماية المنتجات الهشة (الأدوات الصحية) من الثقيلة (البلاط).',
      },
      {
        question: 'هل تقدمون الأدوات الصحية أيضًا؟',
        answer: 'نعم، نورّد المغاسل والمراحيض وأحواض الاستحمام وقواعد الدش والحنفيات من مصانع تشاوتشو وفوشان. جودتها تضاهي الماركات الأوروبية بأسعار أقل بنسبة 40-60%.',
      },
      {
        question: 'كم يستغرق استلام حاوية مواد بناء؟',
        answer: 'يستغرق إنتاج البلاط 15-30 يومًا حسب النموذج. ويضيف الشحن البحري 60-75 يومًا حتى باماكو. وللمنتجات المتوفرة يمكن الشحن خلال 7-10 أيام. الإجمالي: 75-105 أيام في المتوسط.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/sea-freight', label: 'الشحن البحري بالحاويات' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المصنع' },
      { href: '/ar/calculateur', label: 'عرض سعر لحاوية مواد بناء' },
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
      ? 'Import Building Materials from China to Africa | Construction Supplies | ChinaLink'
      : isZh ? '从中国进口建材到非洲 | 建筑用品 | ChinaLink' : isAr ? 'استيراد مواد البناء من الصين إلى أفريقيا | مستلزمات البناء | ChinaLink' : 'Importer Matériaux Construction Chine Afrique | Fournitures Bâtiment | ChinaLink',
    description: isEn
      ? 'Import tiles, sanitary ware, hardware, tools & building materials from China to Africa. Foshan ceramics market sourcing. FCL container shipping at best rates. Quote in 24h! WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向非洲进口瓷砖、卫浴、五金、工具和建筑材料。在佛山陶瓷市场采购。以最优价格进行 FCL 集装箱运输。24 小时内报价！WhatsApp：+86 188 5172 5957' : isAr ? 'استورد البلاط والأدوات الصحية والخردوات والعدد ومواد البناء من الصين إلى أفريقيا. توريد من سوق السيراميك في فوشان. شحن بحاويات FCL بأفضل الأسعار. عرض سعر خلال 24 ساعة! WhatsApp: ‎+86 188 5172 5957' : 'Importez carreaux, sanitaire, quincaillerie, outils et matériaux construction de Chine vers l\'Afrique. Sourcing marché céramique Foshan. Expédition conteneur FCL aux meilleurs tarifs. Devis en 24h ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import building materials from China, wholesale tiles China, buy sanitary ware from China, construction materials sourcing agent, Foshan ceramics market, import hardware China Africa, building supplies supplier China, construction equipment China Africa, freight forwarder China Mali'
      : isZh ? '从中国进口建筑材料, 中国瓷砖批发, 从中国购买卫浴, 建材采购代理, 佛山陶瓷市场, 中国进口五金到非洲, 中国建材供应商, 中国建筑设备到非洲, 中国马里货运, 中国马里货代' : isAr ? 'استيراد مواد البناء من الصين، بلاط بالجملة من الصين، شراء الأدوات الصحية من الصين، وكيل توريد مواد البناء، سوق السيراميك في فوشان، استيراد الخردوات من الصين إلى أفريقيا، مورد مواد البناء في الصين، معدات البناء من الصين إلى أفريقيا، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'importer matériaux construction Chine, gros carreaux Chine, acheter sanitaire Chine, agent sourcing matériaux construction, marché céramique Foshan, importer quincaillerie Chine Afrique, fournisseur matériaux bâtiment Chine, équipement BTP Chine Afrique, cargo chine mali, transitaire chine mali',
    path: '/industries/materiaux-construction-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function ConstructionPage({ params }: Props) {
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
      { name: isEn ? 'Building Materials China Africa' : isZh ? '中国—非洲建筑材料' : isAr ? 'مواد البناء من الصين إلى أفريقيا' : 'Matériaux Construction Chine Afrique', url: `/${locale}/industries/materiaux-construction-chine-afrique` },
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
