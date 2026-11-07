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
    badge: 'Import Machines Chine',
    title: 'Importer des machines et équipements industriels de Chine',
    intro: 'Vous cherchez à importer des machines industrielles, équipements de construction, outils ou matériel agricole de Chine vers le Mali ou l\'Afrique de l\'Ouest ? ChinaLink Express est votre partenaire spécialisé dans le sourcing de machines lourdes depuis les usines chinoises. Nous trouvons les fabricants certifiés, négocions les prix conteneur, vérifions la conformité technique et organisons le transport FCL avec assurance cargo.',
    highlights: [
      'Sourcing machines industrielles, BTP et agriculture depuis les usines chinoises',
      'Négociation prix direct usine pour conteneur FCL 20ft et 40ft',
      'Vérification conformité technique et tests avant expédition',
      'Manutention, calage sécurisé et assurance conteneur',
      'Dédouanement industriel et livraison sur site au Mali',
    ],
    sections: [
      {
        title: 'Quelles machines importer de Chine ?',
        body: 'La Chine est le premier fabricant mondial de machines et équipements industriels. Nous sourçons directement auprès des usines avec certification CE et garantie fabricant pour tous types de matériel.',
        items: [
          'Machines de construction : mini-pelles, compacteurs, bétonnières, échafaudages',
          'Matériel agricole : motoculteurs, broyeurs, presses à huile, systèmes d\'irrigation',
          'Machines industrielles : presses, découpeuses, soudeuses, convoyeurs',
          'Générateurs électriques et groupes électrogènes',
          'Équipements de transformation alimentaire : moulins, embouteillage, séchage',
          'Outillage professionnel et équipements de garage',
        ],
      },
      {
        title: 'Transport de machines : conteneur FCL spécialisé',
        body: 'Les machines nécessitent un transport spécifique : calage dans le conteneur, protection contre l\'humidité, et parfois conteneur open-top ou flat-rack pour les surdimensions. Nous gérons toute la logistique lourde.',
        items: [
          'Conteneur FCL 20ft/40ft standard pour machines jusqu\'à 28 tonnes',
          'Conteneur Open-Top pour machines en hauteur',
          'Flat-Rack pour équipements surdimensionnés',
          'Calage professionnel avec bois et sangles dans le conteneur',
          'Protection anticorrosion et housse étanche pour le maritime',
          'Assurance cargo tous risques pour machines de valeur',
        ],
      },
      {
        title: 'Conformité et documents pour machines importées',
        body: 'L\'importation de machines nécessite des documents spécifiques : facture commerciale détaillée, certificat d\'origine, manuel technique, et parfois certification CE. Nous préparons l\'ensemble de la documentation douanière.',
        items: [
          'Facture commerciale avec détail technique des machines',
          'Certificat d\'origine Chine pour le dédouanement malien',
          'Manuel technique et schémas électriques en français si disponible',
          'Vérification tension électrique 220V/380V compatible Mali',
          'Conseil sur les normes OAPI et homologations nécessaires',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans ChinaLink', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver usine machines', 'Intermédiaires coûteux', 'Direct usine certifiée en Chine'],
      ['Négocier prix conteneur', 'Prix majorés par intermédiaires', 'Négociation directe, économies 15-30%'],
      ['Vérifier conformité', 'Machines incompatibles 380V', 'Tests tension, puissance, sécurité sur place'],
      ['Transport sécurisé', 'Détérioration pendant transport', 'Calage pro + assurance tous risques'],
      ['Dédouanement machines', 'Démarches complexes et longues', 'Documentation complète + dédouanement clé en main'],
    ],
    process: [
      'Envoyez les spécifications techniques et budget machine sur WhatsApp.',
      'Nous recherchons 3 usines certifiées et comparons les offres techniques.',
      'Vous validez après réception du devis, photos et spécifications.',
      'Nous vérifions l\'usine, payons et supervisons l\'emballage conteneur.',
      'Expédition maritime FCL + dédouanement industriel + livraison sur chantier.',
    ],
    faqs: [
      {
        question: 'Quel conteneur pour importer des machines ?',
        answer: 'Pour la plupart des machines, un conteneur FCL 20ft (28 tonnes max) ou 40ft suffit. Pour les machines en hauteur, nous utilisons des conteneurs Open-Top. Pour les surdimensions, des Flat-Rack. Nous conseillons le meilleur format selon vos machines.',
      },
      {
        question: 'Les machines chinoises sont-elles compatibles électricité Mali ?',
        answer: 'Nous vérifions systématiquement la tension (220V/380V) et la fréquence (50Hz) pour compatibilité avec le réseau malien. Nous sélectionnons des machines avec certification CE et manuels en français quand disponible.',
      },
      {
        question: 'Quel est le coût d\'un conteneur machines Chine-Mali ?',
        answer: 'Un conteneur FCL 20ft machines coûte entre 3500 et 5000 USD selon le poids et le port de départ. Le tarif inclut le chargement, calage, maritime jusqu\'à Dakar, et transit terrestre vers Bamako. Demandez un devis précis.',
      },
      {
        question: 'Proposez-vous une garantie sur les machines importées ?',
        answer: 'Oui, nous sélectionnons des usines offrant une garantie fabricant de 12 à 24 mois. Nous documentons les numéros de série et coordonnons le support technique par vidéo si nécessaire.',
      },
      {
        question: 'Pouvez-vous former mes techniciens à l\'utilisation ?',
        answer: 'Pour les commandes importantes, nous pouvons organiser une formation vidéo avec le fabricant chinois. Pour certaines machines complexes, un technicien peut accompagner la livraison sur devis.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine' },
      { href: '/fr/services/sea-freight', label: 'Fret maritime conteneur' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification usine' },
      { href: '/fr/calculateur', label: 'Devis conteneur machines' },
    ],
  },
  en: {
    badge: 'Import Machinery China',
    title: 'Import Industrial Machinery and Equipment from China',
    intro: 'Looking to import industrial machinery, construction equipment, tools, or agricultural machinery from China to Mali or West Africa? ChinaLink Express is your specialized partner for heavy machinery sourcing from Chinese factories. We find certified manufacturers, negotiate container prices, verify technical compliance, and organize FCL transport with cargo insurance.',
    highlights: [
      'Sourcing industrial, construction, and agricultural machinery from Chinese factories',
      'Direct factory price negotiation for FCL 20ft and 40ft containers',
      'Technical compliance verification and pre-shipment testing',
      'Professional handling, secure blocking, and container insurance',
      'Industrial customs clearance and on-site delivery in Mali',
    ],
    sections: [
      {
        title: 'What machinery can you import from China?',
        body: 'China is the world\'s largest manufacturer of machinery and industrial equipment. We source directly from factories with CE certification and manufacturer warranty for all types of equipment.',
        items: [
          'Construction machinery: mini-excavators, compactors, concrete mixers, scaffolding',
          'Agricultural equipment: tillers, grinders, oil presses, irrigation systems',
          'Industrial machines: presses, cutters, welders, conveyors',
          'Electric generators and generator sets',
          'Food processing equipment: mills, bottling, drying',
          'Professional tools and garage equipment',
        ],
      },
      {
        title: 'Machinery transport: specialized FCL container',
        body: 'Machinery requires specific transport: blocking in the container, moisture protection, and sometimes open-top or flat-rack containers for oversize loads. We manage all heavy logistics.',
        items: [
          'Standard FCL 20ft/40ft container for machines up to 28 tons',
          'Open-Top container for tall machinery',
          'Flat-Rack for oversize equipment',
          'Professional blocking with wood and straps in container',
          'Anti-corrosion protection and waterproof cover for sea freight',
          'All-risk cargo insurance for valuable machines',
        ],
      },
      {
        title: 'Compliance and documents for imported machinery',
        body: 'Importing machinery requires specific documents: detailed commercial invoice, certificate of origin, technical manual, and sometimes CE certification. We prepare all customs documentation.',
        items: [
          'Commercial invoice with machine technical details',
          'China certificate of origin for Malian customs',
          'Technical manual and electrical diagrams in French when available',
          'Electrical voltage 220V/380V verification for Mali compatibility',
          'Advice on OAPI standards and required approvals',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without ChinaLink', 'With ChinaLink Express'],
    tableRows: [
      ['Find machine factory', 'Expensive intermediaries', 'Direct certified factory in China'],
      ['Negotiate container price', 'Marked-up prices by intermediaries', 'Direct negotiation, 15-30% savings'],
      ['Verify compliance', 'Incompatible 380V machines', 'On-site voltage, power, safety tests'],
      ['Secure transport', 'Damage during transport', 'Pro blocking + all-risk insurance'],
      ['Machinery customs clearance', 'Complex and lengthy procedures', 'Complete documentation + turnkey customs'],
    ],
    process: [
      'Send machine technical specifications and budget on WhatsApp.',
      'We research 3 certified factories and compare technical offers.',
      'You validate after receiving quote, photos, and specifications.',
      'We verify the factory, pay, and supervise container packing.',
      'FCL sea shipping + industrial customs clearance + on-site delivery.',
    ],
    faqs: [
      {
        question: 'What container for importing machinery?',
        answer: 'For most machinery, a standard FCL 20ft (28 tons max) or 40ft container is sufficient. For tall machinery, we use Open-Top containers. For oversize loads, Flat-Rack containers. We advise the best format for your machines.',
      },
      {
        question: 'Are Chinese machines compatible with Mali electricity?',
        answer: 'We systematically verify voltage (220V/380V) and frequency (50Hz) for compatibility with the Malian grid. We select machines with CE certification and French manuals when available.',
      },
      {
        question: 'What is the cost of a machinery container China-Mali?',
        answer: 'A 20ft FCL machinery container costs between $3500 and $5000 depending on weight and departure port. The rate includes loading, blocking, sea freight to Dakar, and land transit to Bamako. Request a precise quote.',
      },
      {
        question: 'Do you offer warranty on imported machinery?',
        answer: 'Yes, we select factories offering a 12-24 month manufacturer warranty. We document serial numbers and coordinate video technical support if needed.',
      },
      {
        question: 'Can you train my technicians on usage?',
        answer: 'For large orders, we can organize video training with the Chinese manufacturer. For some complex machines, a technician can accompany delivery by quote.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'China sourcing agent' },
      { href: '/en/services/sea-freight', label: 'Sea freight container' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Factory verification' },
      { href: '/en/calculateur', label: 'Machinery container quote' },
    ],
  },
  zh: {
    badge: '从中国进口机器',
    title: '从中国进口机器和工业设备',
    intro: '您想从中国向马里或西非进口工业机器、建筑设备、工具或农业设备吗？ChinaLink Express 是您从中国工厂采购重型机器的专业伙伴。我们寻找认证制造商，谈判整柜价格，核验技术合规性，并安排带货物保险的 FCL 运输。',
    highlights: [
      '从中国工厂采购工业、建筑和农业机器',
      '为 20 尺和 40 尺 FCL 集装箱谈判工厂直供价',
      '发货前核验技术合规性并进行测试',
      '装卸、安全加固和集装箱保险',
      '工业品清关并交付到马里现场',
    ],
    sections: [
      {
        title: '从中国进口哪些机器？',
        body: '中国是全球最大的机器和工业设备制造国。我们直接向工厂采购各类设备，提供 CE 认证和厂家保修。',
        items: [
          '建筑机械：小型挖掘机、压实机、搅拌机、脚手架',
          '农业设备：微耕机、粉碎机、榨油机、灌溉系统',
          '工业机器：压力机、切割机、焊接机、输送机',
          '发电机和发电机组',
          '食品加工设备：磨粉机、灌装、烘干',
          '专业工具和车库设备',
        ],
      },
      {
        title: '机器运输：专用 FCL 集装箱',
        body: '机器需要专门运输：在集装箱内加固、防潮，超尺寸时可能需要开顶箱或框架箱。我们负责全部重型物流。',
        items: [
          '标准 20/40 尺 FCL 集装箱，适用于 28 吨以内的机器',
          '开顶集装箱，适用于超高机器',
          '框架箱，适用于超尺寸设备',
          '在集装箱内使用木材和绑带进行专业加固',
          '海运防腐保护和防水罩',
          '贵重机器的货物一切险',
        ],
      },
      {
        title: '进口机器的合规与文件',
        body: '进口机器需要特定文件：详细的商业发票、原产地证书、技术手册，有时还需要 CE 认证。我们准备全部海关文件。',
        items: [
          '含机器技术明细的商业发票',
          '用于马里清关的中国原产地证书',
          '技术手册和电气图（如有法语版）',
          '核验与马里兼容的 220V/380V 电压',
          '关于 OAPI 标准和所需认证的建议',
        ],
      },
    ],
    tableHeaders: ['需求', '没有 ChinaLink', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找机器工厂', '中间商成本高', '直接对接中国认证工厂'],
      ['谈判整柜价格', '中间商加价', '直接谈判，节省 15-30%'],
      ['核验合规性', '380V 机器不兼容', '现场测试电压、功率和安全性'],
      ['安全运输', '运输途中损坏', '专业加固 + 一切险'],
      ['机器清关', '手续复杂且耗时', '完整文件 + 一站式清关'],
    ],
    process: [
      '通过 WhatsApp 发送技术规格和机器预算。',
      '我们寻找 3 家认证工厂并比较技术方案。',
      '您在收到报价、照片和规格后确认。',
      '我们核验工厂、付款并监督装箱。',
      'FCL 海运 + 工业品清关 + 交付到工地。',
    ],
    faqs: [
      {
        question: '进口机器用什么集装箱？',
        answer: '大多数机器使用 20 尺（最多 28 吨）或 40 尺 FCL 集装箱即可。超高机器使用开顶箱，超尺寸使用框架箱。我们会根据您的机器建议最佳规格。',
      },
      {
        question: '中国机器与马里电力兼容吗？',
        answer: '我们始终核验电压（220V/380V）和频率（50Hz）是否与马里电网兼容。我们选择具有 CE 认证的机器，并在可能时提供法语手册。',
      },
      {
        question: '中国到马里的机器集装箱费用是多少？',
        answer: '一个 20 尺 FCL 机器集装箱费用在 3500 到 5000 美元之间，取决于重量和始发港。价格包含装货、加固、海运到达喀尔以及陆运到巴马科。请索取准确报价。',
      },
      {
        question: '进口机器提供保修吗？',
        answer: '提供，我们选择提供 12 到 24 个月厂家保修的工厂。我们记录序列号，并在需要时协调视频技术支持。',
      },
      {
        question: '你们可以培训我的技术人员使用吗？',
        answer: '对于大额订单，我们可以安排与中国厂家的视频培训。对于某些复杂机器，可以按报价安排技术人员随货交付。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '中国采购代理' },
      { href: '/zh/services/sea-freight', label: '集装箱海运' },
      { href: '/zh/services/verification-fournisseur-chine', label: '工厂核验' },
      { href: '/zh/calculateur', label: '机器集装箱报价' },
    ],
  },
  ar: {
    badge: 'استيراد الآلات من الصين',
    title: 'استيراد الآلات والمعدات الصناعية من الصين',
    intro: 'هل تبحث عن استيراد آلات صناعية أو معدات بناء أو أدوات أو معدات زراعية من الصين إلى مالي أو غرب أفريقيا؟ ChinaLink Express شريكك المتخصص في توريد الآلات الثقيلة من المصانع الصينية. نجد المصنّعين المعتمدين، ونتفاوض على أسعار الحاويات، ونتحقق من المطابقة الفنية، وننظم نقل FCL مع تأمين البضائع.',
    highlights: [
      'توريد الآلات الصناعية والإنشائية والزراعية من المصانع الصينية',
      'التفاوض على سعر المصنع المباشر لحاويات FCL مقاس 20 و40 قدمًا',
      'التحقق من المطابقة الفنية واختبارات قبل الشحن',
      'المناولة والتثبيت الآمن وتأمين الحاوية',
      'التخليص الجمركي الصناعي والتسليم في الموقع في مالي',
    ],
    sections: [
      {
        title: 'ما الآلات التي يمكن استيرادها من الصين؟',
        body: 'الصين أكبر مصنّع للآلات والمعدات الصناعية في العالم. نورّد مباشرة من المصانع مع شهادة CE وضمان الشركة المصنعة لجميع أنواع المعدات.',
        items: [
          'آلات البناء: حفارات صغيرة ومدكات وخلاطات خرسانة وسقالات',
          'المعدات الزراعية: جرارات صغيرة وكسارات ومعاصر زيت وأنظمة ري',
          'الآلات الصناعية: مكابس وآلات قطع ولحام وسيور ناقلة',
          'المولدات الكهربائية ومجموعات التوليد',
          'معدات تصنيع الأغذية: مطاحن وتعبئة وتجفيف',
          'العدد الاحترافية ومعدات الورش',
        ],
      },
      {
        title: 'نقل الآلات: حاوية FCL متخصصة',
        body: 'تحتاج الآلات إلى نقل خاص: التثبيت داخل الحاوية والحماية من الرطوبة، وأحيانًا حاوية مفتوحة السقف أو مسطحة للأحجام الكبيرة. نتولى كل الخدمات اللوجستية الثقيلة.',
        items: [
          'حاوية FCL قياسية 20/40 قدمًا للآلات حتى 28 طنًا',
          'حاوية مفتوحة السقف للآلات العالية',
          'حاوية مسطحة للمعدات كبيرة الحجم',
          'تثبيت احترافي بالخشب والأحزمة داخل الحاوية',
          'حماية من التآكل وغطاء عازل للماء للنقل البحري',
          'تأمين شامل على البضائع للآلات الثمينة',
        ],
      },
      {
        title: 'مطابقة الآلات المستوردة ومستنداتها',
        body: 'يتطلب استيراد الآلات مستندات محددة: فاتورة تجارية مفصلة وشهادة منشأ ودليل فني، وأحيانًا شهادة CE. نجهز جميع المستندات الجمركية.',
        items: [
          'فاتورة تجارية بالتفاصيل الفنية للآلات',
          'شهادة منشأ صينية للتخليص الجمركي في مالي',
          'الدليل الفني والمخططات الكهربائية بالفرنسية إن وجدت',
          'التحقق من توافق جهد 220V/380V مع مالي',
          'نصائح بشأن معايير OAPI والاعتمادات اللازمة',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون ChinaLink', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على مصنع آلات', 'وسطاء مكلفون', 'مباشرة من مصنع معتمد في الصين'],
      ['التفاوض على سعر الحاوية', 'أسعار مرتفعة بسبب الوسطاء', 'تفاوض مباشر وتوفير 15-30%'],
      ['التحقق من المطابقة', 'آلات 380V غير متوافقة', 'اختبار الجهد والقدرة والسلامة ميدانيًا'],
      ['نقل آمن', 'تلف أثناء النقل', 'تثبيت احترافي + تأمين شامل'],
      ['التخليص الجمركي للآلات', 'إجراءات معقدة وطويلة', 'مستندات كاملة + تخليص جمركي متكامل'],
    ],
    process: [
      'أرسل المواصفات الفنية وميزانية الآلة عبر WhatsApp.',
      'نبحث عن 3 مصانع معتمدة ونقارن العروض الفنية.',
      'تؤكد بعد استلام عرض السعر والصور والمواصفات.',
      'نتحقق من المصنع وندفع ونشرف على تعبئة الحاوية.',
      'شحن بحري FCL + تخليص جمركي صناعي + تسليم في الموقع.',
    ],
    faqs: [
      {
        question: 'ما الحاوية المناسبة لاستيراد الآلات؟',
        answer: 'بالنسبة إلى معظم الآلات تكفي حاوية FCL مقاس 20 قدمًا (28 طنًا كحد أقصى) أو 40 قدمًا. وللآلات العالية نستخدم حاويات مفتوحة السقف، وللأحجام الكبيرة حاويات مسطحة. ننصحك بأفضل مقاس حسب آلاتك.',
      },
      {
        question: 'هل الآلات الصينية متوافقة مع كهرباء مالي؟',
        answer: 'نتحقق دائمًا من الجهد (220V/380V) والتردد (50Hz) للتوافق مع الشبكة المالية. ونختار آلات حاصلة على شهادة CE وأدلة بالفرنسية عند توفرها.',
      },
      {
        question: 'ما كلفة حاوية آلات من الصين إلى مالي؟',
        answer: 'تتراوح كلفة حاوية FCL مقاس 20 قدمًا للآلات بين 3500 و5000 دولار حسب الوزن وميناء المغادرة. ويشمل السعر التحميل والتثبيت والنقل البحري حتى داكار والعبور البري إلى باماكو. اطلب عرض سعر دقيقًا.',
      },
      {
        question: 'هل تقدمون ضمانًا على الآلات المستوردة؟',
        answer: 'نعم، نختار مصانع تقدم ضمانًا من الشركة المصنعة من 12 إلى 24 شهرًا. نوثق الأرقام التسلسلية وننسق الدعم الفني بالفيديو عند الحاجة.',
      },
      {
        question: 'هل يمكنكم تدريب فنيّي على الاستخدام؟',
        answer: 'للطلبات الكبيرة، يمكننا تنظيم تدريب بالفيديو مع المصنّع الصيني. ولبعض الآلات المعقدة، يمكن لفني مرافقة التسليم مقابل عرض سعر.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل التوريد في الصين' },
      { href: '/ar/services/sea-freight', label: 'الشحن البحري بالحاويات' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المصنع' },
      { href: '/ar/calculateur', label: 'عرض سعر لحاوية آلات' },
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
      ? 'Import Machinery from China to Africa | Industrial Equipment | ChinaLink'
      : isZh ? '从中国进口机器到非洲 | 工业设备 | ChinaLink' : isAr ? 'استيراد الآلات من الصين إلى أفريقيا | معدات صناعية | ChinaLink' : 'Importer Machines Chine Afrique | Équipement Industriel | ChinaLink',
    description: isEn
      ? 'Import industrial machinery, construction equipment & tools from China to Africa. FCL container shipping, factory direct pricing, installation support. Get your quote today! WhatsApp: +86 188 5172 5957'
      : isZh ? '从中国向非洲进口工业机器、建筑设备和工具。FCL 集装箱运输，工厂直供价，安装支持。免费报价！WhatsApp：+86 188 5172 5957' : isAr ? 'استورد الآلات الصناعية ومعدات البناء والأدوات من الصين إلى أفريقيا. شحن بحاويات FCL وسعر المصنع المباشر ودعم التركيب. عرض سعر مجاني! WhatsApp: ‎+86 188 5172 5957' : 'Importez machines industrielles, équipement construction et outils de Chine vers l\'Afrique. Expédition conteneur FCL, prix direct usine, support installation. Devis gratuit ! WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'import machinery from China, industrial equipment China, buy machines from China, machinery sourcing agent, factory equipment China Africa, construction machinery import, machine supplier China, heavy equipment shipping, agricultural machinery China Africa, freight forwarder China Mali'
      : isZh ? '从中国进口机器, 中国工业设备, 从中国购买机器, 机器采购代理, 中国工厂设备到非洲, 进口建筑设备, 中国机器供应商, 中国农业设备到非洲, 中国马里货运, 中国马里货代' : isAr ? 'استيراد الآلات من الصين، معدات صناعية من الصين، شراء آلات من الصين، وكيل توريد الآلات، معدات المصانع من الصين إلى أفريقيا، استيراد معدات البناء، مورد آلات في الصين، معدات زراعية من الصين إلى أفريقيا، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'importer machines Chine, équipement industriel Chine, acheter machines Chine, agent sourcing machines, équipement usine Chine Afrique, importer matériel construction, fournisseur machines Chine, matériel agricole Chine Afrique, cargo chine mali, transitaire chine mali',
    path: '/industries/machines-chine-afrique',
    locale: locale as Locale,

  });
}

export default async function MachineryPage({ params }: Props) {
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
      { name: isEn ? 'Machinery China Africa' : isZh ? '中国—非洲机器' : isAr ? 'الآلات من الصين إلى أفريقيا' : 'Machines Chine Afrique', url: `/${locale}/industries/machines-chine-afrique` },
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
