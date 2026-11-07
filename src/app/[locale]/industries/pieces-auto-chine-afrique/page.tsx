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
    badge: 'Import Pièces Auto Chine',
    title: 'Importer des pièces auto et pièces détachées de Chine',
    intro: 'Vous cherchez à importer des pièces automobiles, pièces détachées camion, accessoires auto ou outillage garage de Chine vers le Mali et l\'Afrique de l\'Ouest ? ChinaLink Express est votre agent sourcing spécialisé automobile basé à Guangzhou, près du plus grand marché de pièces auto de Chine. Nous sourçons depuis les usines OEM et les grossistes de Guangzhou Canton Fair, avec vérification compatibilité modèle, contrôle qualité et expédition conteneur ou aérien.',
    highlights: [
      'Sourcing pièces auto depuis Guangzhou et usines OEM chinoises',
      'Pièces détachées camion, Toyota, Nissan, Hyundai et universelles',
      'Vérification compatibilité modèle et année avant commande',
      'Prix direct usine 40-60% moins cher que les importations européennes',
      'Conteneur FCL spécialisé ou fret aérien express pour pièces urgentes',
    ],
    sections: [
      {
        title: 'Quelles pièces auto importer de Chine ?',
        body: 'La Chine est le premier fabricant mondial de pièces automobiles. Nous sourçons tous types de pièces détachées pour le parc automobile africain, avec une attention particulière à la compatibilité modèle et à la qualité OEM.',
        items: [
          'Pièces moteur : pistons, segments, coussinets, joints, pompes',
          'Freinage : plaquettes, disques, tambours, maîtres-cylindres',
          'Suspension : amortisseurs, ressorts, rotules, triangles',
          'Électricité auto : alternateurs, démarreurs, batteries, bougies',
          'Carrosserie : pare-chocs, ailes, phares, rétroviseurs, portes',
          'Filtres : huile, air, carburant, habitacle pour tous modèles',
          'Pneus et jantes pour voitures, 4x4 et camions',
        ],
      },
      {
        title: 'Le marché des pièces auto de Guangzhou',
        body: 'Guangzhou concentre le plus grand marché de pièces automobiles d\'Asie. Notre bureau local nous donne un accès direct aux fournisseurs avec les meilleurs stocks et les meilleurs prix pour le marché africain.',
        items: [
          'Marché auto Guangzhou : plus de 10 000 grossistes sur 5 km²',
          'Spécialistes Toyota, Nissan, Hyundai, Mitsubishi pour Afrique',
          'Usines OEM produisant pour les grandes marques européennes',
          'Pièces de rechange chinoises pour camions Howo, Shacman, Foton',
          'Accessoires auto : GPS, audio, covering, tuning',
        ],
      },
      {
        title: 'Compatibilité et qualité des pièces auto chinoises',
        body: 'L\'importation de pièces auto nécessite une vérification rigoureuse de la compatibilité modèle et de la qualité. Nous contrôlons chaque référence pour éviter les erreurs coûteuses.',
        items: [
          'Vérification compatibilité par numéro OEM et modèle véhicule',
          'Contrôle qualité : matériau, finition, dimensions, marquages',
          'Distinction pièces OEM (origine constructeur) et pièces aftermarket',
          'Tests fonctionnels pour alternateurs, démarreurs, pompes',
          'Garantie fabricant de 6 à 12 mois sur pièces sélectionnées',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver pièce compatible', 'Erreurs fréquentes modèle/année', 'Vérification OEM et compatibilité'],
      ['Prix pièces auto', 'Prix européens majorés', 'Prix direct usine Chine, -40 à 60%'],
      ['Qualité pièces', 'Copies bas de gamme', 'Sélection OEM ou aftermarket qualité'],
      ['Stock pièces camion', 'Rupture fréquente', 'Accès direct stock Guangzhou'],
      ['Expédition pièces', 'Colis éparpillés', 'Consolidation conteneur auto optimisé'],
    ],
    process: [
      'Envoyez la référence pièce, modèle véhicule et année sur WhatsApp.',
      'Nous recherchons la pièce chez 3-4 fournisseurs Guangzhou.',
      'Vous validez après vérification compatibilité, photos et prix.',
      'Nous contrôlons la qualité, consolidons et emballons sécurisé.',
      'Expédition conteneur ou aérien + dédouanement + livraison garage.',
    ],
    faqs: [
      {
        question: 'Les pièces auto chinoises sont-elles de bonne qualité ?',
        answer: 'Oui, à condition de bien choisir. Nous distinguons les pièces OEM (même qualité que l\'origine) des pièces aftermarket bas de gamme. Nous sélectionnons des fournisseurs certifiés ISO avec garantie fabricant.',
      },
      {
        question: 'Puis-je importer des pièces pour Toyota Hilux ou Land Cruiser ?',
        answer: 'Absolument, ce sont les modèles les plus demandés en Afrique. Nous avons des fournisseurs spécialisés Toyota avec catalogue complet : freinage, suspension, moteur, carrosserie et accessoires.',
      },
      {
        question: 'Quel conteneur pour importer des pièces auto ?',
        answer: 'Un conteneur FCL 20ft contient environ 15-20 tonnes de pièces auto. Le groupage LCL est idéal pour 2-5 tonnes. Le fret aérien convient aux pièces urgentes (alternateurs, démarreurs) en 14-21 jours.',
      },
      {
        question: 'Proposez-vous des pièces pour camions chinois ?',
        answer: 'Oui, nous sourçons des pièces pour camions chinois très répandus en Afrique : Howo, Shacman, Foton, Dongfeng. Ces pièces sont 50-70% moins chères que les pièces européennes avec disponibilité immédiate.',
      },
      {
        question: 'Quel délai pour recevoir des pièces auto de Chine ?',
        answer: 'Le fret aérien livre en 14-21 jours. Le conteneur maritime prend 60-75 jours. Pour les pièces en stock à Guangzhou, l\'expédition aérienne peut être réalisée en 10-14 jours.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/air-freight', label: 'Fret aérien pièces urgentes' },
      { href: '/fr/calculateur', label: 'Devis conteneur pièces auto' },
    ],
  },
  en: {
    badge: 'Import Auto Parts China',
    title: 'Import Car Parts and Auto Spare Parts from China',
    intro: 'Looking to import car parts, truck spare parts, auto accessories, or garage tools from China to Mali and West Africa? ChinaLink Express is your specialized automotive sourcing agent based in Guangzhou, near China\'s largest auto parts market. We source from OEM factories and Guangzhou Canton Fair wholesalers, with model compatibility verification, quality control, and container or air freight shipping.',
    highlights: [
      'Auto parts sourcing from Guangzhou and Chinese OEM factories',
      'Truck spare parts, Toyota, Nissan, Hyundai, and universal parts',
      'Model and year compatibility verification before ordering',
      'Direct factory prices 40-60% cheaper than European imports',
      'Specialized FCL container or air express for urgent parts',
    ],
    sections: [
      {
        title: 'What auto parts can you import from China?',
        body: 'China is the world\'s largest manufacturer of auto parts. We source all types of spare parts for the African vehicle fleet, with particular attention to model compatibility and OEM quality.',
        items: [
          'Engine parts: pistons, rings, bearings, gaskets, pumps',
          'Braking: pads, discs, drums, master cylinders',
          'Suspension: shock absorbers, springs, ball joints, control arms',
          'Auto electrical: alternators, starters, batteries, spark plugs',
          'Bodywork: bumpers, fenders, headlights, mirrors, doors',
          'Filters: oil, air, fuel, cabin for all models',
          'Tires and rims for cars, 4x4, and trucks',
        ],
      },
      {
        title: 'The Guangzhou auto parts market',
        body: 'Guangzhou concentrates Asia\'s largest auto parts market. Our local office gives us direct access to suppliers with the best stocks and prices for the African market.',
        items: [
          'Guangzhou Auto Market: over 10,000 wholesalers across 5 km²',
          'Toyota, Nissan, Hyundai, Mitsubishi specialists for Africa',
          'OEM factories producing for major European brands',
          'Chinese truck spare parts for Howo, Shacman, Foton',
          'Auto accessories: GPS, audio, wrapping, tuning',
        ],
      },
      {
        title: 'Compatibility and quality of Chinese auto parts',
        body: 'Importing auto parts requires rigorous verification of model compatibility and quality. We control each reference to avoid costly mistakes.',
        items: [
          'Compatibility verification by OEM number and vehicle model',
          'Quality control: material, finish, dimensions, markings',
          'Distinction between OEM parts (original manufacturer) and aftermarket',
          'Functional testing for alternators, starters, pumps',
          'Manufacturer warranty of 6-12 months on selected parts',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find compatible part', 'Frequent model/year errors', 'OEM verification and compatibility'],
      ['Auto parts prices', 'Marked-up European prices', 'Direct China factory prices, -40 to 60%'],
      ['Part quality', 'Low-quality copies', 'OEM or quality aftermarket selection'],
      ['Truck parts stock', 'Frequent stockouts', 'Direct access to Guangzhou stock'],
      ['Parts shipping', 'Scattered packages', 'Optimized auto container consolidation'],
    ],
    process: [
      'Send the part reference, vehicle model, and year on WhatsApp.',
      'We search for the part from 3-4 Guangzhou suppliers.',
      'You validate after compatibility check, photos, and price.',
      'We control quality, consolidate, and securely package.',
      'Container or air shipping + customs clearance + garage delivery.',
    ],
    faqs: [
      {
        question: 'Are Chinese auto parts good quality?',
        answer: 'Yes, if you choose well. We distinguish between OEM parts (same quality as original) and low-grade aftermarket parts. We select ISO-certified suppliers with manufacturer warranty.',
      },
      {
        question: 'Can I import parts for Toyota Hilux or Land Cruiser?',
        answer: 'Absolutely, these are the most requested models in Africa. We have specialized Toyota suppliers with complete catalog: braking, suspension, engine, bodywork, and accessories.',
      },
      {
        question: 'What container for importing auto parts?',
        answer: 'A 20ft FCL container holds approximately 15-20 tons of auto parts. LCL consolidation is ideal for 2-5 tons. Air freight suits urgent parts (alternators, starters) in 14-21 days.',
      },
      {
        question: 'Do you offer parts for Chinese trucks?',
        answer: 'Yes, we source parts for Chinese trucks very common in Africa: Howo, Shacman, Foton, Dongfeng. These parts are 50-70% cheaper than European parts with immediate availability.',
      },
      {
        question: 'What is the timeline to receive auto parts from China?',
        answer: 'Air freight delivers in 14-21 days. Sea container takes 60-75 days. For parts in stock in Guangzhou, air shipping can be done in 10-14 days.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/air-freight', label: 'Air freight urgent parts' },
      { href: '/en/calculateur', label: 'Auto parts container quote' },
    ],
  },
  zh: {
    badge: '从中国进口汽车配件',
    title: '从中国进口汽车配件和零部件',
    intro: '您想从中国向马里和西非进口汽车配件、卡车零部件、汽车用品或修车工具吗？ChinaLink Express 是您的汽车品类专业采购代理，位于广州，靠近中国最大的汽配市场。我们从 OEM 工厂和广州批发商采购，并核验车型兼容性、检查质量，通过集装箱或空运发货。',
    highlights: [
      '从广州和中国 OEM 工厂采购汽车配件',
      '卡车、丰田、日产、现代及通用零部件',
      '下单前核验车型和年份兼容性',
      '工厂直供价，比欧洲进口便宜 40-60%',
      '专用 FCL 集装箱或紧急配件快速空运',
    ],
    sections: [
      {
        title: '从中国进口哪些汽车配件？',
        body: '中国是全球最大的汽车配件制造国。我们为非洲的汽车保有量采购各类零部件，特别注重车型兼容性和 OEM 品质。',
        items: [
          '发动机配件：活塞、活塞环、轴瓦、垫片、泵',
          '制动：刹车片、刹车盘、刹车鼓、总泵',
          '悬挂：减震器、弹簧、球头、摆臂',
          '汽车电器：发电机、启动机、电瓶、火花塞',
          '车身：保险杠、翼子板、车灯、后视镜、车门',
          '滤清器：各车型机油、空气、燃油、空调滤芯',
          '轿车、四驱车和卡车的轮胎和轮毂',
        ],
      },
      {
        title: '广州汽配市场',
        body: '广州拥有亚洲最大的汽配市场。我们的本地办事处让我们能直接对接供应商，为非洲市场提供最好的库存和最优价格。',
        items: [
          '广州汽配市场：5 平方公里内超过 10,000 家批发商',
          '为非洲提供丰田、日产、现代、三菱专家',
          '为欧洲大品牌生产的 OEM 工厂',
          '豪沃、陕汽、福田卡车的中国备件',
          '汽车用品：GPS、音响、贴膜、改装',
        ],
      },
      {
        title: '中国汽车配件的兼容性和质量',
        body: '进口汽车配件需要严格核验车型兼容性和质量。我们检查每个型号，避免代价高昂的错误。',
        items: [
          '通过 OEM 编号和车型核验兼容性',
          '质量检查：材料、工艺、尺寸、标记',
          '区分 OEM 件（原厂）和售后件',
          '发电机、启动机、泵的功能测试',
          '精选配件享 6 到 12 个月厂家保修',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找兼容配件', '车型/年份经常出错', 'OEM 和兼容性核验'],
      ['汽配价格', '欧洲高价', '中国工厂直供价，便宜 40-60%'],
      ['配件质量', '低端仿制品', '精选 OEM 或优质售后件'],
      ['卡车配件库存', '经常缺货', '直接对接广州库存'],
      ['配件发运', '包裹分散', '汽配优化集装箱集运'],
    ],
    process: [
      '通过 WhatsApp 发送配件编号、车型和年份。',
      '我们在 3-4 家广州供应商中寻找配件。',
      '您在核验兼容性、照片和价格后确认。',
      '我们检查质量、集运并安全包装。',
      '集装箱或空运 + 清关 + 交付到修理厂。',
    ],
    faqs: [
      {
        question: '中国汽车配件质量好吗？',
        answer: '好，前提是选择得当。我们区分 OEM 件（与原厂同等质量）和低端售后件。我们选择通过 ISO 认证并提供厂家保修的供应商。',
      },
      {
        question: '我可以进口丰田 Hilux 或 Land Cruiser 的配件吗？',
        answer: '当然可以，这些是非洲需求最大的车型。我们有丰田专业供应商，目录齐全：制动、悬挂、发动机、车身和配件。',
      },
      {
        question: '进口汽车配件用什么集装箱？',
        answer: '一个 20 尺 FCL 集装箱可装约 15-20 吨汽车配件。LCL 拼箱适合 2-5 吨。空运适合紧急配件（发电机、启动机），14-21 天到达。',
      },
      {
        question: '你们提供中国卡车的配件吗？',
        answer: '提供，我们采购在非洲广泛使用的中国卡车配件：豪沃、陕汽、福田、东风。这些配件比欧洲配件便宜 50-70%，并且可立即供货。',
      },
      {
        question: '从中国收到汽车配件需要多久？',
        answer: '空运 14-21 天送达。海运集装箱需要 60-75 天。广州现货配件可在 10-14 天内空运发货。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/sea-freight', label: '集装箱海运' },
      { href: '/zh/services/air-freight', label: '紧急配件空运' },
      { href: '/zh/calculateur', label: '汽配集装箱报价' },
    ],
  },
  ar: {
    badge: 'استيراد قطع غيار السيارات من الصين',
    title: 'استيراد قطع السيارات وقطع الغيار من الصين',
    intro: 'هل تبحث عن استيراد قطع السيارات أو قطع غيار الشاحنات أو إكسسوارات السيارات أو عدد الورش من الصين إلى مالي وغرب أفريقيا؟ ChinaLink Express وكيل التوريد المتخصص في السيارات لديك في قوانغتشو، قرب أكبر سوق لقطع السيارات في الصين. نورّد من مصانع OEM وتجار الجملة في قوانغتشو مع التحقق من توافق الطراز وفحص الجودة والشحن بالحاوية أو جوًا.',
    highlights: [
      'توريد قطع السيارات من قوانغتشو ومصانع OEM الصينية',
      'قطع غيار الشاحنات وToyota وNissan وHyundai والقطع العامة',
      'التحقق من توافق الطراز والسنة قبل الطلب',
      'سعر المصنع المباشر، أقل بنسبة 40-60% من الواردات الأوروبية',
      'حاوية FCL متخصصة أو شحن جوي سريع للقطع العاجلة',
    ],
    sections: [
      {
        title: 'ما قطع السيارات التي يمكن استيرادها من الصين؟',
        body: 'الصين أكبر مصنّع لقطع السيارات في العالم. نورّد جميع قطع الغيار لأسطول السيارات في أفريقيا مع اهتمام خاص بتوافق الطراز وجودة OEM.',
        items: [
          'قطع المحرك: مكابس وحلقات ومحامل وجوانات ومضخات',
          'الفرامل: تيل وأقراص وطبول وأسطوانات رئيسية',
          'التعليق: مساعدات ونوابض ومفاصل كروية ومثلثات',
          'كهرباء السيارات: مولدات ومحركات بدء وبطاريات وشمعات إشعال',
          'الهيكل: صدامات ورفارف ومصابيح ومرايا وأبواب',
          'الفلاتر: زيت وهواء ووقود ومقصورة لجميع الطرازات',
          'إطارات وجنوط للسيارات والدفع الرباعي والشاحنات',
        ],
      },
      {
        title: 'سوق قطع السيارات في قوانغتشو',
        body: 'تضم قوانغتشو أكبر سوق لقطع السيارات في آسيا. يمنحنا مكتبنا المحلي وصولًا مباشرًا إلى الموردين بأفضل المخزونات والأسعار للسوق الأفريقية.',
        items: [
          'سوق السيارات في قوانغتشو: أكثر من 10,000 تاجر جملة على مساحة 5 كم²',
          'متخصصون في Toyota وNissan وHyundai وMitsubishi لأفريقيا',
          'مصانع OEM تنتج لكبرى الماركات الأوروبية',
          'قطع غيار صينية لشاحنات Howo وShacman وFoton',
          'إكسسوارات السيارات: GPS وصوتيات وتغليف وتعديل',
        ],
      },
      {
        title: 'توافق قطع السيارات الصينية وجودتها',
        body: 'يتطلب استيراد قطع السيارات تحققًا صارمًا من توافق الطراز والجودة. نفحص كل مرجع لتجنب الأخطاء المكلفة.',
        items: [
          'التحقق من التوافق برقم OEM وطراز المركبة',
          'فحص الجودة: المادة والتشطيب والأبعاد والعلامات',
          'التمييز بين قطع OEM (الأصلية) وقطع السوق الثانوية',
          'اختبارات أداء للمولدات ومحركات البدء والمضخات',
          'ضمان من الشركة المصنعة من 6 إلى 12 شهرًا على قطع مختارة',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على قطعة متوافقة', 'أخطاء متكررة في الطراز أو السنة', 'التحقق من OEM والتوافق'],
      ['أسعار قطع السيارات', 'أسعار أوروبية مرتفعة', 'سعر المصنع المباشر في الصين، أقل بنسبة 40-60%'],
      ['جودة القطع', 'نسخ منخفضة الجودة', 'اختيار قطع OEM أو قطع سوق ثانوية جيدة'],
      ['مخزون قطع الشاحنات', 'نفاد متكرر', 'وصول مباشر إلى مخزون قوانغتشو'],
      ['شحن القطع', 'طرود متفرقة', 'تجميع محسّن في حاوية السيارات'],
    ],
    process: [
      'أرسل مرجع القطعة وطراز المركبة والسنة عبر WhatsApp.',
      'نبحث عن القطعة لدى 3-4 موردين في قوانغتشو.',
      'تؤكد بعد التحقق من التوافق والصور والسعر.',
      'نفحص الجودة ونجمع ونغلف بأمان.',
      'شحن بالحاوية أو جوًا + تخليص جمركي + تسليم إلى الورشة.',
    ],
    faqs: [
      {
        question: 'هل قطع السيارات الصينية جيدة؟',
        answer: 'نعم، بشرط حسن الاختيار. نميز بين قطع OEM (بجودة الأصل نفسها) وقطع السوق الثانوية الرخيصة. ونختار موردين حاصلين على ISO مع ضمان من الشركة المصنعة.',
      },
      {
        question: 'هل يمكنني استيراد قطع Toyota Hilux أو Land Cruiser؟',
        answer: 'بالتأكيد، فهذه أكثر الطرازات طلبًا في أفريقيا. لدينا موردون متخصصون في Toyota بكتالوج كامل: الفرامل والتعليق والمحرك والهيكل والإكسسوارات.',
      },
      {
        question: 'ما الحاوية المناسبة لاستيراد قطع السيارات؟',
        answer: 'تتسع حاوية FCL مقاس 20 قدمًا لنحو 15-20 طنًا من قطع السيارات. والشحن المجمّع LCL مثالي لـ2-5 أطنان. والشحن الجوي مناسب للقطع العاجلة (المولدات ومحركات البدء) خلال 14-21 يومًا.',
      },
      {
        question: 'هل تقدمون قطعًا للشاحنات الصينية؟',
        answer: 'نعم، نورّد قطعًا للشاحنات الصينية المنتشرة في أفريقيا: Howo وShacman وFoton وDongfeng. وهذه القطع أرخص بنسبة 50-70% من القطع الأوروبية ومتوفرة فورًا.',
      },
      {
        question: 'كم يستغرق استلام قطع السيارات من الصين؟',
        answer: 'يصل الشحن الجوي خلال 14-21 يومًا. وتستغرق الحاوية البحرية 60-75 يومًا. وللقطع المتوفرة في قوانغتشو يمكن الشحن جوًا خلال 10-14 يومًا.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/sea-freight', label: 'الشحن البحري بالحاويات' },
      { href: '/ar/services/air-freight', label: 'شحن جوي للقطع العاجلة' },
      { href: '/ar/calculateur', label: 'عرض سعر لحاوية قطع سيارات' },
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
      ? 'Import Auto Parts from China to Africa | Car Spare Parts Wholesale | ChinaLink'
      : isZh ? '从中国进口汽配到非洲 | 零部件批发 | ChinaLink' : isAr ? 'استيراد قطع السيارات من الصين إلى أفريقيا | قطع غيار بالجملة | ChinaLink' : 'Importer Pièces Auto Chine Afrique | Gros Pièces Détachées | ChinaLink',
    description: isEn
      ? 'Import car parts, truck spare parts & auto accessories from China to Africa. Guangzhou auto parts market sourcing with quality guarantee. Container shipping for bulk orders. WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向非洲进口汽车配件、卡车零部件和用品。在广州汽配市场采购，质量有保障。大批量集装箱运输。WhatsApp：+86 188 5172 5957' : isAr ? 'استورد قطع السيارات وقطع غيار الشاحنات والإكسسوارات من الصين إلى أفريقيا. توريد من سوق قطع السيارات في قوانغتشو مع ضمان الجودة. شحن بالحاويات للكميات الكبيرة. WhatsApp: ‎+86 188 5172 5957' : 'Importez pièces auto, pièces détachées camion et accessoires de Chine vers l\'Afrique. Sourcing marché pièces auto Guangzhou avec garantie qualité. Expédition conteneur pour gros volumes. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import auto parts from China, wholesale car parts China, buy spare parts from China, auto parts sourcing agent, Guangzhou auto parts market, import truck parts China Africa, car accessories supplier China, auto parts wholesale Africa, Toyota parts China, truck spare parts China, freight forwarder China Mali'
      : isZh ? '从中国进口汽配, 中国汽配批发, 从中国购买零部件, 汽配采购代理, 广州汽配市场, 中国进口卡车配件到非洲, 中国丰田配件, 中国卡车配件, 中国马里货运, 中国马里货代' : isAr ? 'استيراد قطع السيارات من الصين، قطع سيارات بالجملة من الصين، شراء قطع الغيار من الصين، وكيل توريد قطع السيارات، سوق قطع السيارات في قوانغتشو، استيراد قطع الشاحنات من الصين إلى أفريقيا، قطع Toyota من الصين، قطع الشاحنات الصينية، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'importer pièces auto Chine, gros pièces auto Chine, acheter pièces détachées Chine, agent sourcing pièces auto, marché pièces auto Guangzhou, importer pièces camion Chine Afrique, pièces Toyota Chine, pièces camion chinois, cargo chine mali, transitaire chine mali',
    path: '/industries/pieces-auto-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function AutoPartsPage({ params }: Props) {
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
      { name: isEn ? 'Auto Parts China Africa' : isZh ? '中国—非洲汽车配件' : isAr ? 'قطع السيارات من الصين إلى أفريقيا' : 'Pièces Auto Chine Afrique', url: `/${locale}/industries/pieces-auto-chine-afrique` },
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
