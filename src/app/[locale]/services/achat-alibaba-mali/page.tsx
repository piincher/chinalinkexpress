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
    badge: 'Achat Alibaba Mali',
    title: 'Acheter sur Alibaba depuis le Mali sans arnaque',
    intro: 'Vous voulez acheter sur Alibaba depuis le Mali mais vous craignez les arnaques, la barrière de la langue et les problèmes de paiement ? ChinaLink Express est votre agent achat Alibaba de confiance. Nous trouvons les meilleurs fournisseurs, négocions les prix, vérifions la qualité, payons en toute sécurité et livrons à Bamako. Plus de 500 importateurs maliens nous font déjà confiance.',
    highlights: [
      'Achat sécurisé sur Alibaba avec vérification fournisseur',
      'Négociation des prix en mandarin pour économiser 20-40%',
      'Paiement sécurisé via notre bureau chinois',
      'Inspection qualité avec photos avant expédition',
      'Livraison porte à porte au Mali en 14-21 jours (aérien)',
    ],
    sections: [
      {
        title: 'Pourquoi utiliser un agent pour acheter sur Alibaba ?',
        body: 'Acheter sur Alibaba depuis le Mali présente plusieurs défis : les fournisseurs préfèrent les paiements chinois (Alipay, virement), la négociation en anglais donne des prix export plus élevés, et il est impossible de vérifier la qualité à distance. Un agent local en Chine résout tous ces problèmes.',
        items: [
          'Paiement : nous payons les fournisseurs via Alipay et virement chinois',
          'Négociation : discussion en mandarin pour des tarifs usine réels',
          'Vérification : audit fournisseur, licence, historique, avis clients',
          'Qualité : inspection photos et vidéos avant expédition',
          'Logistique : consolidation et fret aérien/maritime vers le Mali',
        ],
      },
      {
        title: 'Comment éviter les arnaques sur Alibaba',
        body: 'Les arnaques sur Alibaba sont fréquentes pour les acheteurs africains : faux fournisseurs, produits de qualité inférieure, changement de spécifications après paiement, ou disparition du vendeur. ChinaLink Express protège votre investissement avec des contrôles systématiques.',
        items: [
          'Vérification de la licence commerciale et de l\'historique du vendeur',
          'Analyse des avis clients et des transactions passées',
          'Visite usine physique pour les commandes importantes',
          'Contrôle qualité avec photos détaillées avant expédition',
          'Paiement sécurisé avec preuve et suivi fournisseur',
        ],
      },
      {
        title: 'Processus d\'achat Alibaba simplifié',
        body: 'Avec ChinaLink Express, acheter sur Alibaba depuis le Mali devient simple et sécurisé. Voici comment nous travaillons pour vous :',
        items: [
          'Envoyez-nous le lien Alibaba ou la description du produit sur WhatsApp',
          'Nous recherchons 3 fournisseurs qualifiés et comparons les offres',
          'Vous validez le fournisseur et le prix négocié',
          'Nous vérifions, payons et suivons la production',
          'Nous inspectons, consolidons et expédions vers le Mali',
        ],
      },
    ],
    tableHeaders: ['Problème', 'Acheter seul sur Alibaba', 'Avec ChinaLink Express'],
    tableRows: [
      ['Paiement fournisseur', 'Alipay impossible depuis le Mali', 'Paiement via notre bureau chinois'],
      ['Négociation prix', 'Prix export élevés en anglais', 'Négociation mandarin, économies réelles'],
      ['Risque arnaque', 'Aucune vérification possible', 'Audit complet + inspection qualité'],
      ['Suivi commande', 'Messages sans réponse', 'Suivi WhatsApp en temps réel'],
      ['Expédition', 'Chaque fournisseur envoie séparément', 'Consolidation + fret groupé'],
    ],
    process: [
      'Envoyez le lien Alibaba ou la description du produit sur WhatsApp.',
      'Nous recherchons et comparons 3 fournisseurs qualifiés.',
      'Vous choisissez le meilleur rapport qualité-prix négocié.',
      'Nous vérifions le fournisseur, payons et suivons la production.',
      'Inspection qualité, consolidation et expédition fret vers le Mali.',
    ],
    faqs: [
      {
        question: 'Puis-je acheter sur Alibaba depuis le Mali ?',
        answer: 'Oui, mais avec des difficultés : paiement Alipay souvent bloqué, négociation en anglais avec prix export, et risque d\'arnaque sans vérification. ChinaLink Express résout tous ces problèmes en tant qu\'agent achat basé en Chine.',
      },
      {
        question: 'Combien coûte un agent achat Alibaba ?',
        answer: 'Nos frais d\'agent achat commencent à 50 USD par commande (recherche + négociation). L\'inspection qualité est à 100 USD. Le paiement fournisseur et le fret sont facturés séparément avec des tarifs transparents.',
      },
      {
        question: 'Comment savoir si un fournisseur Alibaba est fiable ?',
        answer: 'Nous vérifions la licence commerciale, l\'historique des transactions, les avis clients vérifiés, et réalisons une visite usine pour les grosses commandes. Nous ne payons jamais un fournisseur non audité.',
      },
      {
        question: 'Quel délai pour recevoir une commande Alibaba au Mali ?',
        answer: 'La recherche fournisseur prend 2-3 jours, la production 7-30 jours selon le produit, puis le fret aérien 14-21 jours ou maritime 60-75 jours. Nous vous donnons un calendrier précis à chaque étape.',
      },
      {
        question: 'Pouvez-vous acheter sur 1688 aussi ?',
        answer: 'Oui, 1688 est le marché chinois domestique avec des prix 30-50% moins chers qu\'Alibaba. Notre équipe bilingue achète pour vous sur 1688 avec les mêmes garanties de vérification et qualité.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine complet' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
      { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur Chine' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Guide complet acheter sur Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide acheter sur 1688' },
    ],
  },
  en: {
    badge: 'Alibaba Buying Agent Mali',
    title: 'Buy from Alibaba from Mali Without Getting Scammed',
    intro: 'Want to buy on Alibaba from Mali but worried about scams, language barriers, and payment issues? ChinaLink Express is your trusted Alibaba buying agent. We find the best suppliers, negotiate prices, verify quality, pay securely, and deliver to Bamako. Over 500 Malian importers already trust us.',
    highlights: [
      'Secure Alibaba purchasing with supplier verification',
      'Mandarin price negotiation to save 20-40%',
      'Secure payment via our China office',
      'Quality inspection with photos before shipping',
      'Door-to-door delivery to Mali in 14-21 days (air)',
    ],
    sections: [
      {
        title: 'Why use an agent to buy on Alibaba?',
        body: 'Buying on Alibaba from Mali presents several challenges: suppliers prefer Chinese payments (Alipay, bank transfer), English negotiation gives higher export prices, and quality verification is impossible remotely. A local agent in China solves all these problems.',
        items: [
          'Payment: we pay suppliers via Alipay and Chinese bank transfer',
          'Negotiation: Mandarin discussion for real factory prices',
          'Verification: supplier audit, license, history, customer reviews',
          'Quality: photo and video inspection before shipping',
          'Logistics: consolidation and air/sea freight to Mali',
        ],
      },
      {
        title: 'How to avoid scams on Alibaba',
        body: 'Alibaba scams are common for African buyers: fake suppliers, inferior quality products, specification changes after payment, or disappearing sellers. ChinaLink Express protects your investment with systematic controls.',
        items: [
          'Verification of business license and seller history',
          'Analysis of customer reviews and past transactions',
          'Physical factory visit for important orders',
          'Quality control with detailed photos before shipping',
          'Secure payment with proof and supplier follow-up',
        ],
      },
      {
        title: 'Simplified Alibaba buying process',
        body: 'With ChinaLink Express, buying on Alibaba from Mali becomes simple and secure. Here is how we work for you:',
        items: [
          'Send us the Alibaba link or product description on WhatsApp',
          'We research 3 qualified suppliers and compare offers',
          'You validate the supplier and negotiated price',
          'We verify, pay and follow production',
          'We inspect, consolidate and ship to Mali',
        ],
      },
    ],
    tableHeaders: ['Problem', 'Buying alone on Alibaba', 'With ChinaLink Express'],
    tableRows: [
      ['Supplier payment', 'Alipay impossible from Mali', 'Payment via our China office'],
      ['Price negotiation', 'High export prices in English', 'Mandarin negotiation, real savings'],
      ['Scam risk', 'No verification possible', 'Complete audit + quality inspection'],
      ['Order tracking', 'Unanswered messages', 'Real-time WhatsApp tracking'],
      ['Shipping', 'Each supplier ships separately', 'Consolidation + group freight'],
    ],
    process: [
      'Send the Alibaba link or product description on WhatsApp.',
      'We research and compare 3 qualified suppliers.',
      'You choose the best value-for-money negotiated offer.',
      'We verify the supplier, pay and follow production.',
      'Quality inspection, consolidation and freight shipping to Mali.',
    ],
    faqs: [
      {
        question: 'Can I buy on Alibaba from Mali?',
        answer: 'Yes, but with difficulties: Alipay often blocked, English negotiation with export prices, and scam risk without verification. ChinaLink Express solves all these issues as your buying agent based in China.',
      },
      {
        question: 'How much does an Alibaba buying agent cost?',
        answer: 'Our buying agent fees start at $50 per order (search + negotiation). Quality inspection is $100. Supplier payment and freight are charged separately with transparent rates.',
      },
      {
        question: 'How to know if an Alibaba supplier is reliable?',
        answer: 'We verify the business license, transaction history, verified customer reviews, and conduct factory visits for large orders. We never pay an unaudited supplier.',
      },
      {
        question: 'What is the delivery timeline for Alibaba orders to Mali?',
        answer: 'Supplier research takes 2-3 days, production 7-30 days depending on the product, then air freight 14-21 days or sea freight 60-75 days. We provide a precise timeline at every step.',
      },
      {
        question: 'Can you buy on 1688 too?',
        answer: 'Yes, 1688 is the Chinese domestic market with 30-50% lower prices than Alibaba. Our bilingual team buys for you on 1688 with the same verification and quality guarantees.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'Complete China sourcing agent' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
      { href: '/en/services/paiement-fournisseur-chine', label: 'Supplier payment China' },
      { href: '/fr/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Complete guide to buying on Alibaba' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide to buying on 1688' },
    ],
  },
  zh: {
    badge: '马里 Alibaba 采购',
    title: '从马里在 Alibaba 安全购买，避免诈骗',
    intro: '您想从马里在 Alibaba 购买，但担心诈骗、语言障碍和付款问题？ChinaLink Express 是您值得信赖的 Alibaba 采购代理。我们寻找最好的供应商、谈判价格、核验质量、安全付款并交付到巴马科。已有 500 多位马里进口商信任我们。',
    highlights: [
      '在 Alibaba 安全采购，并核验供应商',
      '用中文议价，节省 20-40%',
      '通过我们在中国的办公室安全付款',
      '发货前带照片的质量检验',
      '门到门交付到马里，14-21 天（空运）',
    ],
    sections: [
      {
        title: '为什么要通过代理在 Alibaba 购买？',
        body: '从马里在 Alibaba 购买有不少困难：供应商更喜欢中国付款方式（支付宝、转账），用英语谈判得到的是较高的出口价，而且无法远程核验质量。在中国的本地代理可以解决所有这些问题。',
        items: [
          '付款：我们通过支付宝和中国转账向供应商付款',
          '议价：用中文沟通，获得真实工厂价',
          '核验：供应商审核、执照、经营记录、客户评价',
          '质量：发货前照片和视频检验',
          '物流：集运并空运/海运到马里',
        ],
      },
      {
        title: '如何避免 Alibaba 上的诈骗',
        body: 'Alibaba 上针对非洲买家的诈骗很常见：假供应商、劣质产品、付款后更改规格或卖家消失。ChinaLink Express 通过系统性检查保护您的投资。',
        items: [
          '核验营业执照和卖家经营记录',
          '分析客户评价和过往交易',
          '大额订单实地考察工厂',
          '发货前带详细照片的质量检查',
          '安全付款，提供凭证并跟进供应商',
        ],
      },
      {
        title: '简化的 Alibaba 采购流程',
        body: '通过 ChinaLink Express，从马里在 Alibaba 购买变得简单又安全。我们是这样为您工作的：',
        items: [
          '通过 WhatsApp 把 Alibaba 链接或产品描述发给我们',
          '我们寻找 3 家合格供应商并比较报价',
          '您确认供应商和谈判后的价格',
          '我们核验、付款并跟进生产',
          '我们验货、集运并发往马里',
        ],
      },
    ],
    tableHeaders: ['问题', '自己在 Alibaba 购买', '使用 ChinaLink Express'],
    tableRows: [
      ['供应商付款', '从马里无法使用支付宝', '通过我们在中国的办公室付款'],
      ['价格谈判', '英语沟通，出口价高', '中文谈判，真正省钱'],
      ['诈骗风险', '无法核验', '全面审核 + 质量检验'],
      ['订单跟踪', '消息无人回复', 'WhatsApp 实时跟踪'],
      ['发货', '每家供应商单独发货', '集运 + 拼货运输'],
    ],
    process: [
      '通过 WhatsApp 发送 Alibaba 链接或产品描述。',
      '我们寻找并比较 3 家合格供应商。',
      '您选择谈判后性价比最高的方案。',
      '我们核验供应商、付款并跟进生产。',
      '质量检验、集运并发往马里。',
    ],
    faqs: [
      {
        question: '我可以从马里在 Alibaba 购买吗？',
        answer: '可以，但有困难：支付宝付款经常受阻，用英语谈判拿到的是出口价，而且不核验就有诈骗风险。ChinaLink Express 作为驻中国的采购代理，可解决所有这些问题。',
      },
      {
        question: 'Alibaba 采购代理收费多少？',
        answer: '我们的采购代理费从每单 50 美元起（搜索 + 议价）。质量检验为 100 美元。供应商付款和运费按透明价格单独收取。',
      },
      {
        question: '如何知道 Alibaba 供应商是否可靠？',
        answer: '我们核验营业执照、交易记录和经过核实的客户评价，并对大额订单实地考察工厂。我们从不向未经审核的供应商付款。',
      },
      {
        question: 'Alibaba 订单到马里需要多久？',
        answer: '寻找供应商需要 2-3 天，生产视产品需要 7-30 天，然后空运 14-21 天或海运 60-75 天。我们会在每个阶段提供准确的时间表。',
      },
      {
        question: '你们也能在 1688 购买吗？',
        answer: '可以，1688 是中国国内市场，价格比 Alibaba 便宜 30-50%。我们的双语团队为您在 1688 购买，并提供同样的核验和质量保障。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '完整的中国采购代理服务' },
      { href: '/zh/services/verification-fournisseur-chine', label: '供应商核验' },
      { href: '/zh/services/paiement-fournisseur-chine', label: '中国供应商付款' },
      { href: '/zh/guides/acheter-sur-alibaba-depuis-le-mali', label: 'Alibaba 购买完整指南' },
      { href: '/zh/guides/acheter-sur-1688-depuis-le-mali', label: '1688 购买指南' },
    ],
  },
  ar: {
    badge: 'الشراء من Alibaba في مالي',
    title: 'الشراء من Alibaba من مالي دون احتيال',
    intro: 'هل تريد الشراء من Alibaba من مالي لكنك تخشى الاحتيال وحاجز اللغة ومشكلات الدفع؟ ChinaLink Express وكيلك الموثوق للشراء من Alibaba. نجد أفضل الموردين ونتفاوض على الأسعار ونتحقق من الجودة وندفع بأمان ونسلم في باماكو. أكثر من 500 مستورد مالي يثقون بنا بالفعل.',
    highlights: [
      'شراء آمن من Alibaba مع التحقق من المورد',
      'التفاوض على الأسعار بالصينية لتوفير 20-40%',
      'دفع آمن عبر مكتبنا في الصين',
      'فحص الجودة بالصور قبل الشحن',
      'تسليم من الباب إلى الباب في مالي خلال 14-21 يومًا (جوًا)',
    ],
    sections: [
      {
        title: 'لماذا تستعين بوكيل للشراء من Alibaba؟',
        body: 'يطرح الشراء من Alibaba من مالي عدة تحديات: يفضل الموردون وسائل الدفع الصينية (Alipay والتحويل)، والتفاوض بالإنجليزية يعطي أسعار تصدير أعلى، ويستحيل التحقق من الجودة عن بعد. والوكيل المحلي في الصين يحل كل هذه المشكلات.',
        items: [
          'الدفع: ندفع للموردين عبر Alipay والتحويل الصيني',
          'التفاوض: نقاش بالصينية للحصول على أسعار المصنع الحقيقية',
          'التحقق: تدقيق المورد والرخصة والسجل وآراء العملاء',
          'الجودة: فحص بالصور والفيديو قبل الشحن',
          'الخدمات اللوجستية: تجميع وشحن جوي أو بحري إلى مالي',
        ],
      },
      {
        title: 'كيف تتجنب الاحتيال في Alibaba',
        body: 'الاحتيال في Alibaba شائع بين المشترين الأفارقة: موردون مزيفون ومنتجات رديئة وتغيير المواصفات بعد الدفع أو اختفاء البائع. تحمي ChinaLink Express استثمارك بفحوصات منهجية.',
        items: [
          'التحقق من الرخصة التجارية وسجل البائع',
          'تحليل آراء العملاء والمعاملات السابقة',
          'زيارة ميدانية للمصنع للطلبات الكبيرة',
          'فحص الجودة مع صور مفصلة قبل الشحن',
          'دفع آمن مع إثبات ومتابعة المورد',
        ],
      },
      {
        title: 'عملية مبسطة للشراء من Alibaba',
        body: 'مع ChinaLink Express يصبح الشراء من Alibaba من مالي بسيطًا وآمنًا. إليك كيف نعمل من أجلك:',
        items: [
          'أرسل إلينا رابط Alibaba أو وصف المنتج عبر WhatsApp',
          'نبحث عن 3 موردين مؤهلين ونقارن العروض',
          'تؤكد المورد والسعر المتفاوض عليه',
          'نتحقق وندفع ونتابع الإنتاج',
          'نفحص ونجمع ونشحن إلى مالي',
        ],
      },
    ],
    tableHeaders: ['المشكلة', 'الشراء من Alibaba بمفردك', 'مع ChinaLink Express'],
    tableRows: [
      ['الدفع للموردين', 'Alipay غير ممكن من مالي', 'الدفع عبر مكتبنا في الصين'],
      ['التفاوض على السعر', 'أسعار تصدير مرتفعة بالإنجليزية', 'تفاوض بالصينية وتوفير حقيقي'],
      ['خطر الاحتيال', 'لا يمكن التحقق', 'تدقيق كامل + فحص الجودة'],
      ['متابعة الطلب', 'رسائل بلا رد', 'متابعة فورية عبر WhatsApp'],
      ['الشحن', 'كل مورد يشحن على حدة', 'تجميع + شحن مجمّع'],
    ],
    process: [
      'أرسل رابط Alibaba أو وصف المنتج عبر WhatsApp.',
      'نبحث عن 3 موردين مؤهلين ونقارن بينهم.',
      'تختار أفضل قيمة مقابل السعر بعد التفاوض.',
      'نتحقق من المورد وندفع ونتابع الإنتاج.',
      'فحص الجودة والتجميع والشحن إلى مالي.',
    ],
    faqs: [
      {
        question: 'هل يمكنني الشراء من Alibaba من مالي؟',
        answer: 'نعم، لكن مع صعوبات: دفع Alipay غالبًا ما يتعذر، والتفاوض بالإنجليزية يعطي أسعار تصدير، وهناك خطر احتيال دون تحقق. تحل ChinaLink Express كل هذه المشكلات بصفتها وكيل شراء في الصين.',
      },
      {
        question: 'كم تبلغ تكلفة وكيل الشراء من Alibaba؟',
        answer: 'تبدأ رسوم وكيل الشراء لدينا من 50 دولارًا لكل طلب (بحث + تفاوض). ويبلغ فحص الجودة 100 دولار. ويُحتسب الدفع للمورد والشحن بشكل منفصل بأسعار شفافة.',
      },
      {
        question: 'كيف أعرف أن مورد Alibaba موثوق؟',
        answer: 'نتحقق من الرخصة التجارية وسجل المعاملات وآراء العملاء الموثقة، ونزور المصنع للطلبات الكبيرة. ولا ندفع أبدًا لمورد لم يخضع للتدقيق.',
      },
      {
        question: 'كم يستغرق وصول طلب Alibaba إلى مالي؟',
        answer: 'يستغرق البحث عن مورد 2-3 أيام، والإنتاج 7-30 يومًا حسب المنتج، ثم الشحن الجوي 14-21 يومًا أو البحري 60-75 يومًا. نزودك بجدول دقيق في كل مرحلة.',
      },
      {
        question: 'هل يمكنكم الشراء من 1688 أيضًا؟',
        answer: 'نعم، 1688 هي السوق الصينية المحلية بأسعار أقل بنسبة 30-50% من Alibaba. يشتري فريقنا ثنائي اللغة لك من 1688 بضمانات التحقق والجودة نفسها.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل توريد شامل في الصين' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المورد' },
      { href: '/ar/services/paiement-fournisseur-chine', label: 'الدفع لمورد في الصين' },
      { href: '/ar/guides/acheter-sur-alibaba-depuis-le-mali', label: 'الدليل الكامل للشراء من Alibaba' },
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
      ? 'Buy from Alibaba Mali | Alibaba Agent West Africa | ChinaLink'
      : isZh ? '马里 Alibaba 采购 | 非洲 Alibaba 采购代理 | ChinaLink' : isAr ? 'الشراء من Alibaba في مالي | وكيل شراء Alibaba في أفريقيا | ChinaLink' : 'Acheter sur Alibaba Mali | Agent Achat Alibaba Afrique | ChinaLink',
    description: isEn
      ? 'Trusted Alibaba buying agent for Mali & West Africa. Buy safely from Alibaba with supplier verification, price negotiation, secure payment & shipping to Bamako. Avoid scams. WhatsApp: +86 188 5172 5957'
      : isZh ? '面向马里和西非的可信赖 Alibaba 采购代理。在 Alibaba 安全购买，提供供应商核验、议价、安全付款和巴马科交付。WhatsApp：+86 188 5172 5957' : isAr ? 'وكيل شراء موثوق من Alibaba لمالي وغرب أفريقيا. اشترِ بأمان من Alibaba مع التحقق من المورد والتفاوض والدفع الآمن والتسليم في باماكو. WhatsApp: ‎+86 188 5172 5957' : 'Agent achat Alibaba de confiance pour le Mali et l\'Afrique de l\'Ouest. Achetez en sécurité sur Alibaba avec vérification fournisseur, négociation, paiement sécurisé et livraison à Bamako. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'buy from Alibaba Mali, Alibaba agent Mali, Alibaba buying agent Africa, Alibaba sourcing agent West Africa, purchase from Alibaba Africa, Alibaba procurement Mali, avoid Alibaba scam, Alibaba payment agent, Alibaba shipping agent Mali, freight forwarder China Mali'
      : isZh ? '马里 Alibaba 购买, 马里 Alibaba 代理, 非洲 Alibaba 采购代理, 西非 Alibaba 采购代理, 从非洲在 Alibaba 购买, 马里 Alibaba 采购, 避免 Alibaba 诈骗, Alibaba 付款代理, 马里 Alibaba 海运代理, 中国马里货运, 中国马里货代' : isAr ? 'الشراء من Alibaba في مالي، وكيل Alibaba في مالي، وكيل شراء Alibaba في أفريقيا، وكيل توريد Alibaba في غرب أفريقيا، الشراء من Alibaba في أفريقيا، التوريد من Alibaba إلى مالي، تجنب احتيال Alibaba، وكيل دفع Alibaba، وكيل شحن بحري Alibaba إلى مالي، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'acheter sur Alibaba Mali, agent Alibaba Mali, agent achat Alibaba Afrique, agent sourcing Alibaba Afrique de l\'Ouest, acheter sur Alibaba Afrique, approvisionnement Alibaba Mali, éviter arnaque Alibaba, agent paiement Alibaba, agent maritime Alibaba Mali, cargo chine mali, transitaire chine mali',
    path: '/services/achat-alibaba-mali',
    locale: locale as Locale,

  });
}

export default async function AchatAlibabaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  const schemas = [
    generateOrganizationSchema(),
    generateServiceSchema('alibaba', locale as Locale),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: isEn ? 'Alibaba Buying Agent' : isZh ? '马里 Alibaba 采购' : isAr ? 'الشراء من Alibaba في مالي' : 'Achat Alibaba Mali', url: `/${locale}/services/achat-alibaba-mali` },
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
        ctaLabel={isEn ? 'Request an Alibaba quote on WhatsApp' : undefined}
        routeCtaHref={`/${locale}/routes/china-to-mali`}
        routeCtaLabel={isEn ? 'See China to Mali freight' : undefined}
        comparisonTitle={isEn ? 'Quick comparison' : undefined}
        processTitle={isEn ? 'Our process' : undefined}
        faqTitle={isEn ? 'Frequently asked questions' : undefined}
        usefulLinksTitle={isEn ? 'Useful links' : undefined}
        asideTitle={isEn ? 'Need help buying on Alibaba?' : undefined}
        asideText={isEn ? 'Send the Alibaba link, quantity and destination. Our team will reply on WhatsApp.' : undefined}
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
