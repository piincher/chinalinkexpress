import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateServiceSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    badge: 'Agent Sourcing Chine',
    title: 'Votre agent sourcing en Chine pour l\'Afrique de l\'Ouest',
    intro: 'Vous cherchez un agent sourcing fiable en Chine pour acheter sur Alibaba, 1688 ou directement en usine ? ChinaLink Express est votre intermédiaire de confiance basé à Yiwu et Guangzhou. Nous trouvons vos fournisseurs, négocions les prix, vérifions la qualité, payons en votre nom et expédions vers le Mali, le Sénégal, la Côte d\'Ivoire et toute l\'Afrique de l\'Ouest. Plus de 500 entreprises africaines nous font confiance depuis 2019.',
    highlights: [
      'Recherche de fournisseurs sur Alibaba, 1688 et usines',
      'Négociation des prix en mandarin pour de meilleurs tarifs',
      'Vérification qualité et inspection avant expédition',
      'Paiement fournisseur sécurisé via notre bureau en Chine',
      'Consolidation et expédition fret aérien ou maritime',
    ],
    sections: [
      {
        title: 'Pourquoi utiliser un agent sourcing en Chine ?',
        body: 'Acheter directement en Chine sans intermédiaire expose à de nombreux risques : arnaques sur Alibaba, mauvaise qualité, incompréhension linguistique, difficultés de paiement, et problèmes logistiques. Un agent sourcing local comme ChinaLink Express élimine ces risques en gérant chaque étape depuis la Chine.',
        items: [
          'Évitez les arnaques Alibaba et les faux fournisseurs',
          'Obtenez des prix 20-40% moins chers grâce à la négociation locale',
          'Assurez la qualité avec inspection sur place avant expédition',
          'Simplifiez le paiement via notre bureau chinois',
          'Consolidez plusieurs achats dans un seul envoi économique',
        ],
      },
      {
        title: 'Nos services de sourcing complet',
        body: 'ChinaLink Express propose un service de sourcing clé en main depuis la Chine. De la recherche du fournisseur à la livraison à votre adresse en Afrique, nous gérons tout pour vous.',
        items: [
          'Recherche fournisseur : Alibaba, 1688, foires, usines directes',
          'Négociation prix : discussion en mandarin pour obtenir les meilleurs tarifs',
          'Vérification fournisseur : audit usine, licence, historique',
          'Inspection qualité : contrôle produit avant expédition avec photos',
          'Paiement sécurisé : via notre bureau chinois (Alipay, virement, WeChat)',
          'Consolidation : regroupement de plusieurs fournisseurs avant envoi',
          'Expédition : fret aérien 14-21j ou maritime 60-75j vers l\'Afrique',
        ],
      },
      {
        title: 'Alibaba vs 1688 : quelle plateforme choisir ?',
        body: 'Alibaba est la plateforme internationale en anglais avec des prix plus élevés. 1688 est le site chinois réservé au marché domestique avec des prix 30-50% moins chers mais en chinois uniquement. Notre équipe bilingue achète sur les deux plateformes pour vous trouver les meilleures opportunités.',
        items: [
          'Alibaba : fournisseurs certifiés, Trade Assurance, prix internationaux',
          '1688 : prix usine direct, marché domestique chinois, 30-50% moins cher',
          'Nous sourçons sur les deux plateformes selon vos besoins et budget',
          'Vérification systématique avant tout paiement sur 1688',
        ],
      },
    ],
    tableHeaders: ['Besoin', 'Sans agent sourcing', 'Avec ChinaLink Express'],
    tableRows: [
      ['Trouver un fournisseur', 'Des heures de recherche, risque d\'arnaque', 'Recherche experte + vérification incluse'],
      ['Négocier les prix', 'Prix export élevés, barrière de langue', 'Négociation mandarin, économies 20-40%'],
      ['Payer en Chine', 'Impossible depuis l\'Afrique (Alipay, 1688)', 'Paiement via notre bureau chinois'],
      ['Vérifier la qualité', 'Surprise à la réception, pas de recours', 'Inspection photos avant expédition'],
      ['Expédier vers l\'Afrique', 'Chaque fournisseur envoie séparément', 'Consolidation + fret groupé économique'],
    ],
    process: [
      'Vous nous envoyez votre besoin (produit, quantité, budget) sur WhatsApp.',
      'Nous recherchons 3-5 fournisseurs qualifiés sur Alibaba et/ou 1688.',
      'Vous choisissez le fournisseur, nous négocions les prix et conditions.',
      'Nous vérifions le fournisseur, payons et suivons la production.',
      'Nous inspectons la qualité, consolidons et expédions vers votre pays.',
    ],
    faqs: [
      {
        question: 'Combien coûte un agent sourcing en Chine ?',
        answer: 'Nos honoraires de sourcing commencent à 50 USD par commande (recherche + négociation). L\'inspection qualité est à 100 USD. Le paiement fournisseur et la consolidation ont des tarifs transparents selon le montant et le volume. Contactez-nous sur WhatsApp pour un devis personnalisé.',
      },
      {
        question: 'Pouvez-vous acheter sur 1688 pour moi ?',
        answer: 'Oui, c\'est l\'un de nos services les plus demandés. 1688 propose des prix 30-50% moins chers qu\'Alibaba mais est en chinois uniquement. Notre équipe achète pour vous, vérifie la qualité et gère l\'expédition.',
      },
      {
        question: 'Comment éviter les arnaques sur Alibaba ?',
        answer: 'Nous vérifions systématiquement chaque fournisseur : licence commerciale, historique, avis clients, visite usine si nécessaire. Nous ne payons jamais un fournisseur non vérifié et utilisons les mécanismes de protection quand disponibles.',
      },
      {
        question: 'Quel délai pour recevoir mes marchandises ?',
        answer: 'La recherche fournisseur prend 2-5 jours. La production varie de 7 à 30 jours selon le produit. Le fret aérien ajoute 14-21 jours, le maritime 60-75 jours. Nous vous donnons un calendrier précis dès le devis.',
      },
      {
        question: 'Livrez-vous dans tous les pays d\'Afrique de l\'Ouest ?',
        answer: 'Oui, nous livrons au Mali, Sénégal, Côte d\'Ivoire, Ghana, Nigeria, Burkina Faso, Niger, Bénin, Togo, Guinée, Cameroun et RDC. Le fret aérien arrive généralement à Bamako ou Dakar avec transit local.',
      },
    ],
    links: [
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur chinois' },
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur Chine' },
      { href: '/fr/services/sourcing', label: 'Service sourcing complet' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide acheter sur Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide acheter sur 1688' },
    ],
  },
  en: {
    badge: 'China Sourcing Agent',
    title: 'Your China Sourcing Agent for West Africa',
    intro: 'Looking for a reliable sourcing agent in China to buy from Alibaba, 1688, or directly from factories? ChinaLink Express is your trusted intermediary based in Yiwu and Guangzhou. We find your suppliers, negotiate prices, verify quality, pay on your behalf, and ship to Mali, Senegal, Ivory Coast, and all of West Africa. Over 500 African businesses trust us since 2019.',
    highlights: [
      'Supplier search on Alibaba, 1688, and direct factories',
      'Price negotiation in Mandarin for better rates',
      'Quality verification and pre-shipment inspection',
      'Secure supplier payment via our China office',
      'Consolidation and air/sea freight shipping',
    ],
    sections: [
      {
        title: 'Why use a China sourcing agent?',
        body: 'Buying directly from China without an intermediary exposes you to many risks: Alibaba scams, poor quality, language barriers, payment difficulties, and logistics problems. A local sourcing agent like ChinaLink Express eliminates these risks by managing every step from China.',
        items: [
          'Avoid Alibaba scams and fake suppliers',
          'Get 20-40% cheaper prices through local negotiation',
          'Ensure quality with on-site inspection before shipping',
          'Simplify payment through our China office',
          'Consolidate multiple purchases into one economical shipment',
        ],
      },
      {
        title: 'Our complete sourcing services',
        body: 'ChinaLink Express offers a turnkey sourcing service from China. From supplier research to delivery at your African address, we handle everything for you.',
        items: [
          'Supplier search: Alibaba, 1688, trade fairs, direct factories',
          'Price negotiation: Mandarin discussion for best rates',
          'Supplier verification: factory audit, license, history',
          'Quality inspection: product check before shipping with photos',
          'Secure payment: via our China office (Alipay, bank, WeChat)',
          'Consolidation: grouping multiple suppliers before shipping',
          'Shipping: air freight 14-21 days or sea freight 60-75 days to Africa',
        ],
      },
      {
        title: 'Alibaba vs 1688: which platform to choose?',
        body: 'Alibaba is the international English platform with higher prices. 1688 is the Chinese domestic market site with 30-50% lower prices but Chinese only. Our bilingual team buys on both platforms to find you the best opportunities.',
        items: [
          'Alibaba: certified suppliers, Trade Assurance, international prices',
          '1688: direct factory prices, Chinese domestic market, 30-50% cheaper',
          'We source on both platforms according to your needs and budget',
          'Systematic verification before any payment on 1688',
        ],
      },
    ],
    tableHeaders: ['Need', 'Without sourcing agent', 'With ChinaLink Express'],
    tableRows: [
      ['Find a supplier', 'Hours of research, scam risk', 'Expert search + verification included'],
      ['Negotiate prices', 'High export prices, language barrier', 'Mandarin negotiation, 20-40% savings'],
      ['Pay in China', 'Impossible from Africa (Alipay, 1688)', 'Payment via our China office'],
      ['Check quality', 'Surprise on receipt, no recourse', 'Photo inspection before shipping'],
      ['Ship to Africa', 'Each supplier ships separately', 'Consolidation + economical group freight'],
    ],
    process: [
      'Send us your need (product, quantity, budget) on WhatsApp.',
      'We research 3-5 qualified suppliers on Alibaba and/or 1688.',
      'You choose the supplier, we negotiate prices and terms.',
      'We verify the supplier, pay and follow production.',
      'We inspect quality, consolidate and ship to your country.',
    ],
    faqs: [
      {
        question: 'How much does a China sourcing agent cost?',
        answer: 'Our sourcing fees start at $50 per order (search + negotiation). Quality inspection is $100. Supplier payment and consolidation have transparent rates based on amount and volume. Contact us on WhatsApp for a personalized quote.',
      },
      {
        question: 'Can you buy on 1688 for me?',
        answer: 'Yes, this is one of our most requested services. 1688 offers 30-50% lower prices than Alibaba but is Chinese only. Our team buys for you, verifies quality, and manages shipping.',
      },
      {
        question: 'How to avoid scams on Alibaba?',
        answer: 'We systematically verify every supplier: business license, history, customer reviews, factory visit when needed. We never pay an unverified supplier and use protection mechanisms when available.',
      },
      {
        question: 'What is the delivery timeline?',
        answer: 'Supplier research takes 2-5 days. Production varies from 7 to 30 days depending on the product. Air freight adds 14-21 days, sea freight 60-75 days. We provide a precise timeline with your quote.',
      },
      {
        question: 'Do you deliver to all West African countries?',
        answer: 'Yes, we deliver to Mali, Senegal, Ivory Coast, Ghana, Nigeria, Burkina Faso, Niger, Benin, Togo, Guinea, Cameroon, and DRC. Air freight usually arrives in Bamako or Dakar with local transit.',
      },
    ],
    links: [
      { href: '/en/services/verification-fournisseur-chine', label: 'Verify Chinese supplier' },
      { href: '/en/services/paiement-fournisseur-chine', label: 'Supplier payment China' },
      { href: '/en/services/sourcing', label: 'Complete sourcing service' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide to buying on Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide to buying on 1688' },
    ],
  },
  zh: {
    badge: '中国采购代理',
    title: '您在中国的西非采购代理',
    intro: '您在寻找中国可靠的采购代理，在 Alibaba、1688 或直接从工厂购买吗？ChinaLink Express 是您在义乌和广州值得信赖的中间人。我们寻找供应商、谈判价格、核验质量、代您付款，并发往马里、塞内加尔、科特迪瓦及整个西非。自 2019 年以来，已有 500 多家非洲企业信任我们。',
    highlights: [
      '在 Alibaba、1688 和工厂寻找供应商',
      '用中文议价，获得更好价格',
      '发货前质量核验和检查',
      '通过我们在中国的办公室安全向供应商付款',
      '集运并空运或海运',
    ],
    sections: [
      {
        title: '为什么要使用中国采购代理？',
        body: '不通过中间人直接在中国购买有很多风险：Alibaba 诈骗、质量差、语言不通、付款困难和物流问题。像 ChinaLink Express 这样的本地采购代理在中国管理每个环节，消除这些风险。',
        items: [
          '避免 Alibaba 诈骗和假供应商',
          '通过本地议价获得便宜 20-40% 的价格',
          '发货前现场检查，确保质量',
          '通过我们在中国的办公室简化付款',
          '把多笔采购合并为一票经济的货运',
        ],
      },
      {
        title: '我们的全程采购服务',
        body: 'ChinaLink Express 提供从中国出发的一站式采购服务。从寻找供应商到送达您在非洲的地址，我们为您管理一切。',
        items: [
          '寻找供应商：Alibaba、1688、展会、直接工厂',
          '议价：用中文沟通，争取最好价格',
          '供应商核验：工厂审核、执照、经营记录',
          '质量检验：发货前带照片的产品检查',
          '安全付款：通过我们在中国的办公室（支付宝、转账、微信）',
          '集运：发货前合并多家供应商的货物',
          '发运：空运 14-21 天或海运 60-75 天到非洲',
        ],
      },
      {
        title: 'Alibaba 与 1688：选哪个平台？',
        body: 'Alibaba 是价格较高的英文国际平台。1688 是面向国内市场的中文网站，价格便宜 30-50%，但只有中文。我们的双语团队在两个平台采购，为您寻找最佳机会。',
        items: [
          'Alibaba：认证供应商、Trade Assurance、国际价格',
          '1688：工厂直供价，中国国内市场，便宜 30-50%',
          '我们根据您的需求和预算在两个平台采购',
          '在 1688 付款前进行系统性核验',
        ],
      },
    ],
    tableHeaders: ['需求', '没有采购代理', '使用 ChinaLink Express'],
    tableRows: [
      ['寻找供应商', '花费数小时搜索，有诈骗风险', '专家搜索 + 包含核验'],
      ['谈判价格', '出口价高，语言障碍', '中文谈判，节省 20-40%'],
      ['在中国付款', '从非洲无法完成（支付宝、1688）', '通过我们在中国的办公室付款'],
      ['核验质量', '收货时才发现问题，无法追索', '发货前照片检验'],
      ['发运到非洲', '每家供应商单独发货', '集运 + 经济拼货运输'],
    ],
    process: [
      '您通过 WhatsApp 发送需求（产品、数量、预算）。',
      '我们在 Alibaba 和/或 1688 寻找 3-5 家合格供应商。',
      '您选择供应商，我们谈判价格和条件。',
      '我们核验供应商、付款并跟进生产。',
      '我们检查质量、集运并发往您的国家。',
    ],
    faqs: [
      {
        question: '中国采购代理收费多少？',
        answer: '我们的采购服务费从每单 50 美元起（搜索 + 议价）。质量检验为 100 美元。供应商付款和集运按金额和货量收取透明费用。请通过 WhatsApp 联系我们获取个性化报价。',
      },
      {
        question: '你们能替我在 1688 购买吗？',
        answer: '可以，这是我们最受欢迎的服务之一。1688 的价格比 Alibaba 便宜 30-50%，但只有中文。我们的团队为您购买、核验质量并安排发运。',
      },
      {
        question: '如何避免 Alibaba 上的诈骗？',
        answer: '我们系统性地核验每家供应商：营业执照、经营记录、客户评价，必要时实地考察工厂。我们从不向未经核验的供应商付款，并在可用时使用保护机制。',
      },
      {
        question: '收到货物需要多久？',
        answer: '寻找供应商需要 2-5 天。生产视产品需要 7 到 30 天。空运再加 14-21 天，海运再加 60-75 天。我们在报价时就提供准确的时间表。',
      },
      {
        question: '你们送达所有西非国家吗？',
        answer: '是的，我们送达马里、塞内加尔、科特迪瓦、加纳、尼日利亚、布基纳法索、尼日尔、贝宁、多哥、几内亚、喀麦隆和刚果（金）。空运通常到达巴马科或达喀尔，再本地转运。',
      },
    ],
    links: [
      { href: '/zh/services/verification-fournisseur-chine', label: '中国供应商核验' },
      { href: '/zh/services/paiement-fournisseur-chine', label: '中国供应商付款' },
      { href: '/zh/services/sourcing', label: '全程采购服务' },
      { href: '/zh/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Alibaba 购买指南' },
      { href: '/zh/guides/acheter-sur-1688-depuis-le-mali', label: '1688 购买指南' },
    ],
  },
  ar: {
    badge: 'وكيل التوريد في الصين',
    title: 'وكيل التوريد لديك في الصين لغرب أفريقيا',
    intro: 'هل تبحث عن وكيل توريد موثوق في الصين للشراء من Alibaba أو 1688 أو مباشرة من المصنع؟ ChinaLink Express وسيطك الموثوق في ييوو وقوانغتشو. نجد مورديك ونتفاوض على الأسعار ونتحقق من الجودة وندفع نيابة عنك ونشحن إلى مالي والسنغال وساحل العاج وغرب أفريقيا كلها. أكثر من 500 شركة أفريقية تثق بنا منذ 2019.',
    highlights: [
      'البحث عن موردين في Alibaba و1688 والمصانع',
      'التفاوض بالصينية للحصول على أسعار أفضل',
      'التحقق من الجودة والفحص قبل الشحن',
      'دفع آمن للمورد عبر مكتبنا في الصين',
      'التجميع والشحن الجوي أو البحري',
    ],
    sections: [
      {
        title: 'لماذا تستعين بوكيل توريد في الصين؟',
        body: 'الشراء مباشرة من الصين دون وسيط يعرّضك لمخاطر كثيرة: احتيال في Alibaba وجودة رديئة وسوء فهم لغوي وصعوبات في الدفع ومشكلات لوجستية. ووكيل التوريد المحلي مثل ChinaLink Express يزيل هذه المخاطر بإدارة كل مرحلة من الصين.',
        items: [
          'تجنب احتيال Alibaba والموردين المزيفين',
          'احصل على أسعار أقل بنسبة 20-40% بفضل التفاوض المحلي',
          'اضمن الجودة بالفحص الميداني قبل الشحن',
          'بسّط الدفع عبر مكتبنا في الصين',
          'اجمع عدة مشتريات في شحنة واحدة اقتصادية',
        ],
      },
      {
        title: 'خدماتنا المتكاملة للتوريد',
        body: 'تقدم ChinaLink Express خدمة توريد متكاملة من الصين. من البحث عن المورد إلى التسليم في عنوانك في أفريقيا، نتولى كل شيء نيابة عنك.',
        items: [
          'البحث عن مورد: Alibaba و1688 والمعارض والمصانع مباشرة',
          'التفاوض على السعر: نقاش بالصينية للحصول على أفضل الأسعار',
          'التحقق من المورد: تدقيق المصنع والرخصة والسجل',
          'فحص الجودة: فحص المنتج قبل الشحن مع الصور',
          'دفع آمن: عبر مكتبنا في الصين (Alipay والتحويل وWeChat)',
          'التجميع: جمع عدة موردين قبل الإرسال',
          'الشحن: جوًا خلال 14-21 يومًا أو بحرًا خلال 60-75 يومًا إلى أفريقيا',
        ],
      },
      {
        title: 'Alibaba أم 1688: أي منصة تختار؟',
        body: 'Alibaba منصة دولية بالإنجليزية بأسعار أعلى. و1688 موقع صيني مخصص للسوق المحلية بأسعار أقل بنسبة 30-50% لكنه بالصينية فقط. يشتري فريقنا ثنائي اللغة من المنصتين ليجد لك أفضل الفرص.',
        items: [
          'Alibaba: موردون معتمدون وTrade Assurance وأسعار دولية',
          '1688: سعر المصنع المباشر، السوق الصينية المحلية، أرخص بنسبة 30-50%',
          'نورّد من المنصتين حسب احتياجاتك وميزانيتك',
          'تحقق منهجي قبل أي دفع في 1688',
        ],
      },
    ],
    tableHeaders: ['الحاجة', 'بدون وكيل توريد', 'مع ChinaLink Express'],
    tableRows: [
      ['العثور على مورد', 'ساعات من البحث وخطر احتيال', 'بحث متخصص + التحقق مشمول'],
      ['التفاوض على الأسعار', 'أسعار تصدير مرتفعة وحاجز لغوي', 'تفاوض بالصينية وتوفير 20-40%'],
      ['الدفع في الصين', 'مستحيل من أفريقيا (Alipay و1688)', 'الدفع عبر مكتبنا في الصين'],
      ['التحقق من الجودة', 'مفاجآت عند الاستلام ولا سبيل للمطالبة', 'فحص بالصور قبل الشحن'],
      ['الشحن إلى أفريقيا', 'كل مورد يشحن على حدة', 'تجميع + شحن مجمّع اقتصادي'],
    ],
    process: [
      'ترسل حاجتك (المنتج والكمية والميزانية) عبر WhatsApp.',
      'نبحث عن 3-5 موردين مؤهلين في Alibaba و/أو 1688.',
      'تختار المورد، ونتفاوض نحن على الأسعار والشروط.',
      'نتحقق من المورد وندفع ونتابع الإنتاج.',
      'نفحص الجودة ونجمع ونشحن إلى بلدك.',
    ],
    faqs: [
      {
        question: 'كم تبلغ تكلفة وكيل التوريد في الصين؟',
        answer: 'تبدأ أتعاب التوريد لدينا من 50 دولارًا لكل طلب (بحث + تفاوض). ويبلغ فحص الجودة 100 دولار. وللدفع للمورد والتجميع أسعار شفافة حسب المبلغ والحجم. تواصل معنا عبر WhatsApp للحصول على عرض سعر مخصص.',
      },
      {
        question: 'هل يمكنكم الشراء من 1688 نيابة عني؟',
        answer: 'نعم، هذه من أكثر خدماتنا طلبًا. تقدم 1688 أسعارًا أقل بنسبة 30-50% من Alibaba لكنها بالصينية فقط. يشتري فريقنا لك ويتحقق من الجودة ويدير الشحن.',
      },
      {
        question: 'كيف أتجنب الاحتيال في Alibaba؟',
        answer: 'نتحقق بشكل منهجي من كل مورد: الرخصة التجارية والسجل وآراء العملاء وزيارة المصنع عند الحاجة. ولا ندفع أبدًا لمورد غير موثق، ونستخدم آليات الحماية عند توفرها.',
      },
      {
        question: 'كم يستغرق استلام بضائعي؟',
        answer: 'يستغرق البحث عن مورد 2-5 أيام. ويتراوح الإنتاج بين 7 و30 يومًا حسب المنتج. ويضيف الشحن الجوي 14-21 يومًا والبحري 60-75 يومًا. نزودك بجدول دقيق منذ عرض السعر.',
      },
      {
        question: 'هل تسلمون في كل دول غرب أفريقيا؟',
        answer: 'نعم، نسلم في مالي والسنغال وساحل العاج وغانا ونيجيريا وبوركينا فاسو والنيجر وبنين وتوغو وغينيا والكاميرون وجمهورية الكونغو الديمقراطية. ويصل الشحن الجوي عادة إلى باماكو أو داكار مع عبور محلي.',
      },
    ],
    links: [
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من الموردين الصينيين' },
      { href: '/ar/services/paiement-fournisseur-chine', label: 'الدفع لمورد في الصين' },
      { href: '/ar/services/sourcing', label: 'خدمة توريد متكاملة' },
      { href: '/ar/guides/acheter-sur-alibaba-depuis-le-mali', label: 'دليل الشراء من Alibaba' },
      { href: '/ar/guides/acheter-sur-1688-depuis-le-mali', label: 'دليل الشراء من 1688' },
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
      ? 'China Sourcing Agent for Africa | Alibaba & 1688 Buying Agent | ChinaLink'
      : isZh ? '中国非洲采购代理 | Alibaba 1688 代购 | ChinaLink Express' : isAr ? 'وكيل توريد من الصين إلى أفريقيا | الشراء من Alibaba و1688 | ChinaLink Express' : 'Agent Sourcing Chine Afrique | Achat Alibaba 1688 | ChinaLink Express',
    description: isEn
      ? 'Trusted China sourcing agent for West Africa. Buy from Alibaba, 1688 & Chinese factories with price negotiation, quality inspection, secure payment & shipping to Mali, Senegal, Ivory Coast. WhatsApp: +86 188 5172 5957'
      : isZh ? '面向西非的中国可信赖采购代理。在 Alibaba、1688 和中国工厂采购，提供议价、质量检验、安全付款并发往马里、塞内加尔、科特迪瓦。WhatsApp：+86 188 5172 5957' : isAr ? 'وكيل توريد موثوق في الصين لغرب أفريقيا. الشراء من Alibaba و1688 والمصانع الصينية مع التفاوض وفحص الجودة والدفع الآمن والشحن إلى مالي والسنغال وساحل العاج. WhatsApp: ‎+86 188 5172 5957' : 'Agent sourcing de confiance en Chine pour l\'Afrique de l\'Ouest. Achat sur Alibaba, 1688 et usines chinoises avec négociation, inspection qualité, paiement sécurisé et expédition vers le Mali, Sénégal, Côte d\'Ivoire. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'China sourcing agent, Alibaba sourcing agent, 1688 sourcing agent, buy from Alibaba Africa, China buying agent Mali, Alibaba agent West Africa, sourcing agent Yiwu, factory direct sourcing China, wholesale from China Africa, China procurement services, import from China Mali, freight forwarder China Mali'
      : isZh ? '中国采购代理, Alibaba 采购代理, 1688 采购代理, 从非洲在 Alibaba 购买, 中国马里采购代理, 西非 Alibaba 代理, 义乌采购, 中国工厂直采, 中国非洲批发商, 中国采购服务, 从中国进口到马里, 中国马里货运, 中国马里货代' : isAr ? 'وكيل توريد في الصين، وكيل توريد Alibaba، وكيل توريد 1688، الشراء من Alibaba في أفريقيا، وكيل شراء من الصين إلى مالي، وكيل Alibaba في غرب أفريقيا، التوريد من ييوو، التوريد مباشرة من المصانع الصينية، تاجر جملة من الصين إلى أفريقيا، خدمة التوريد من الصين، الاستيراد من الصين إلى مالي، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'agent sourcing Chine, agent sourcing Alibaba, agent sourcing 1688, acheter sur Alibaba Afrique, agent achat Chine Mali, agent Alibaba Afrique de l\'Ouest, sourcing Yiwu, sourcing direct usine Chine, grossiste Chine Afrique, service approvisionnement Chine, importer de Chine Mali, cargo chine mali, transitaire chine mali',
    path: '/services/agent-sourcing-chine',
    locale: locale as Locale,

  });
}

export default async function AgentSourcingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  const schemas = [
    generateOrganizationSchema(),
    generateServiceSchema('sourcing', locale as Locale),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'China Sourcing Agent' : isZh ? '中国采购代理' : isAr ? 'وكيل التوريد في الصين' : 'Agent Sourcing Chine', url: `/${locale}/services/agent-sourcing-chine` },
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
        ctaLabel={isEn ? 'Request a sourcing quote on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need a sourcing quote?' : undefined}
        asideText={isEn ? 'Send the product, quantity, target price and destination. Our team will reply on WhatsApp.' : undefined}
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
