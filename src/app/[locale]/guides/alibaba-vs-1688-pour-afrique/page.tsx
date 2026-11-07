import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateOrganizationSchema,
  generateHowToSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoServicePage } from '@/features/seo-content/SeoServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    badge: 'Guide Alibaba vs 1688',
    title: 'Alibaba vs 1688 : quelle plateforme choisir pour importer en Afrique ?',
    intro: 'Vous hésitez entre Alibaba et 1688 pour acheter en Chine depuis l\'Afrique ? C\'est la question que se posent tous les importateurs africains. Alibaba est la plateforme internationale en anglais mais avec des prix export plus élevés. 1688 est le marché domestique chinois avec des prix 30-50% moins chers, mais en chinois uniquement et sans protection acheteur internationale. Dans ce guide complet, ChinaLink Express vous explique les différences clés, les avantages de chaque plateforme, et comment notre agent sourcing vous permet d\'acheter sur les deux en toute sécurité.',
    highlights: [
      'Comparaison détaillée prix, qualité, sécurité et accessibilité',
      '1688 : prix 30-50% moins chers mais risque plus élevé',
      'Alibaba : plus sûr mais prix export majorés',
      'Notre agent achat vous permet d\'acheter sur les deux plateformes',
      'Stratégie recommandée selon votre budget et expérience',
    ],
    sections: [
      {
        title: 'Quelle est la différence entre Alibaba et 1688 ?',
        body: 'Alibaba.com et 1688.com sont tous deux des plateformes du groupe Alibaba, mais destinées à des marchés complètement différents. Comprendre cette différence est essentiel pour choisir la bonne plateforme selon votre profil d\'importateur.',
        items: [
          'Alibaba : plateforme B2B internationale, en anglais, pour export vers le monde entier',
          '1688 : plateforme B2B domestique chinoise, en mandarin, pour le marché intérieur chinois',
          'Prix : 1688 est systématiquement 30-50% moins cher qu\'Alibaba pour le même produit',
          'MOQ (quantité minimum) : souvent plus basse sur 1688 car destiné aux petits commerçants chinois',
          'Protection acheteur : Trade Assurance sur Alibaba, aucune protection internationale sur 1688',
        ],
      },
      {
        title: 'Avantages et inconvénients de chaque plateforme',
        body: 'Chaque plateforme a ses forces et faiblesses. Voici un tableau comparatif pour vous aider à choisir selon votre situation.',
        items: [
          'Alibaba avantages : interface anglais, fournisseurs vérifiés, Trade Assurance, paiement sécurisé, support client',
          'Alibaba inconvénients : prix export élevés, MOQ élevées, communication lente avec vendeurs',
          '1688 avantages : prix usine réels, MOQ flexibles, nouveautés en avant-première, énorme choix',
          '1688 inconvénients : chinois uniquement, aucune protection internationale, risque arnaque élevé sans vérification, paiement difficile depuis l\'Afrique',
        ],
      },
      {
        title: 'Notre stratégie recommandée pour les importateurs africains',
        body: 'Après 7 ans d\'expérience avec des centaines d\'importateurs africains, nous recommandons une stratégie hybride qui combine les avantages des deux plateformes tout en minimisant les risques.',
        items: [
          'Débutants : commencez sur Alibaba avec Trade Assurance pour sécuriser vos premières commandes',
          'Intermédiaires : utilisez Alibaba pour les produits complexes, 1688 pour les produits simples et standards',
          'Importateurs confirmés : achetez principalement sur 1688 via un agent vérifié pour maximiser vos marges',
          'Tous niveaux : utilisez toujours un agent sourcing local en Chine pour vérifier les fournisseurs avant paiement',
        ],
      },
    ],
    tableHeaders: ['Critère', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['Langue', 'Anglais (multilingue)', 'Chinois uniquement'],
      ['Prix', 'Prix export (majorés 30-50%)', 'Prix usine domestique (30-50% moins cher)'],
      ['MOQ minimum', 'Élevé (100-1000+ pièces)', 'Flexible (10-100 pièces)'],
      ['Protection acheteur', 'Trade Assurance Alibaba', 'Aucune protection internationale'],
      ['Vérification fournisseur', 'Gold Supplier, vérifié', 'Niveau d\'entrée bas, vérification difficile'],
      ['Paiement depuis Afrique', 'Carte bancaire, T/T (difficile)', 'Alipay, WeChat Pay (impossible depuis Afrique)'],
      ['Nouveautés', 'Produits testés et validés', 'Nouveautés en avant-première'],
      ['Support client', 'En anglais par email', 'En chinois uniquement'],
    ],
    process: [
      'Définissez votre produit, budget et quantité sur WhatsApp.',
      'Nous recherchons le même produit sur Alibaba ET 1688 pour comparer.',
      'Vous recevez une comparaison prix, qualité, délai et risque.',
      'Vous choisissez la meilleure option, nous vérifions le fournisseur.',
      'Nous payons, inspectons et expédions vers votre pays en Afrique.',
    ],
    faqs: [
      {
        question: '1688 est-il vraiment 50% moins cher qu\'Alibaba ?',
        answer: 'Oui, pour de nombreux produits standards (textiles, accessoires, électronique, jouets), 1688 affiche des prix 30 à 50% inférieurs à Alibaba. Cela s\'explique car 1688 est destiné au marché domestique chinois, sans les surcoûts export, marketing international et commissions intermédiaires.',
      },
      {
        question: 'Puis-je acheter sur 1688 depuis le Mali sans agent ?',
        answer: 'Théoriquement non pratique : le site est en chinois, le paiement nécessite Alipay ou compte bancaire chinois, et il n\'y a aucune protection internationale. Sans agent local en Chine, vous exposez votre argent à un risque très élevé d\'arnaque.',
      },
      {
        question: 'Comment ChinaLink achète-t-il sur 1688 pour moi ?',
        answer: 'Notre équipe bilingue basée à Yiwu navigue sur 1688, identifie les fournisseurs fiables, négocie en mandarin, paie via notre compte Alipay chinois, inspecte la qualité sur place, et expédie vers l\'Afrique. Vous bénéficiez des prix 1688 avec la sécurité d\'un agent local.',
      },
      {
        question: 'Quels produits sont meilleurs sur 1688 ?',
        answer: 'Les produits standards et non complexes sont idéaux sur 1688 : textiles, accessoires mode, articles de maison, jouets, petits électroniques, outils. Pour les produits techniques complexes (machines, médical, électronique avancée), Alibaba reste plus sûr.',
      },
      {
        question: 'Quel est le coût de l\'agent pour acheter sur 1688 ?',
        answer: 'Nos honoraires pour l\'achat sur 1688 commencent à 80 USD par commande (recherche + négociation + paiement). L\'inspection qualité est à 100 USD. Ces frais sont rapidement amortis par les économies de 30-50% sur les prix 1688.',
      },
    ],
    links: [
      { href: '/fr/services/agent-sourcing-chine', label: 'Agent sourcing Chine complet' },
      { href: '/fr/services/achat-alibaba-mali', label: 'Acheter sur Alibaba depuis le Mali' },
      { href: '/fr/guides/acheter-sur-1688-depuis-le-mali', label: 'Guide complet acheter sur 1688' },
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérification fournisseur' },
    ],
  },
  en: {
    badge: 'Alibaba vs 1688 Guide',
    title: 'Alibaba vs 1688: Which Platform to Choose for Importing to Africa?',
    intro: 'Torn between Alibaba and 1688 for buying from China to Africa? This is the question every African importer asks. Alibaba is the international English platform but with higher export prices. 1688 is the Chinese domestic market with 30-50% lower prices, but Chinese only and without international buyer protection. In this complete guide, ChinaLink Express explains the key differences, advantages of each platform, and how our sourcing agent lets you buy safely on both.',
    highlights: [
      'Detailed comparison of price, quality, security, and accessibility',
      '1688: 30-50% cheaper but higher risk',
      'Alibaba: safer but marked-up export prices',
      'Our buying agent lets you purchase on both platforms',
      'Recommended strategy based on your budget and experience',
    ],
    sections: [
      {
        title: 'What is the difference between Alibaba and 1688?',
        body: 'Alibaba.com and 1688.com are both platforms of the Alibaba group, but aimed at completely different markets. Understanding this difference is essential to choose the right platform for your importer profile.',
        items: [
          'Alibaba: international B2B platform, in English, for export worldwide',
          '1688: Chinese domestic B2B platform, in Mandarin, for the Chinese domestic market',
          'Price: 1688 is systematically 30-50% cheaper than Alibaba for the same product',
          'MOQ (minimum quantity): often lower on 1688 as it targets small Chinese traders',
          'Buyer protection: Trade Assurance on Alibaba, no international protection on 1688',
        ],
      },
      {
        title: 'Pros and cons of each platform',
        body: 'Each platform has its strengths and weaknesses. Here is a comparative table to help you choose based on your situation.',
        items: [
          'Alibaba advantages: English interface, verified suppliers, Trade Assurance, secure payment, customer support',
          'Alibaba disadvantages: high export prices, high MOQs, slow communication with sellers',
          '1688 advantages: real factory prices, flexible MOQs, early access to new products, huge selection',
          '1688 disadvantages: Chinese only, no international protection, high scam risk without verification, difficult payment from Africa',
        ],
      },
      {
        title: 'Our recommended strategy for African importers',
        body: 'After 7 years of experience with hundreds of African importers, we recommend a hybrid strategy that combines the advantages of both platforms while minimizing risks.',
        items: [
          'Beginners: start on Alibaba with Trade Assurance to secure your first orders',
          'Intermediate: use Alibaba for complex products, 1688 for simple and standard products',
          'Experienced importers: buy mainly on 1688 via a verified agent to maximize margins',
          'All levels: always use a local sourcing agent in China to verify suppliers before payment',
        ],
      },
    ],
    tableHeaders: ['Criteria', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['Language', 'English (multilingual)', 'Chinese only'],
      ['Price', 'Export prices (marked up 30-50%)', 'Domestic factory prices (30-50% cheaper)'],
      ['Minimum MOQ', 'High (100-1000+ pieces)', 'Flexible (10-100 pieces)'],
      ['Buyer protection', 'Alibaba Trade Assurance', 'No international protection'],
      ['Supplier verification', 'Gold Supplier, verified', 'Low entry level, difficult verification'],
      ['Payment from Africa', 'Credit card, T/T (difficult)', 'Alipay, WeChat Pay (impossible from Africa)'],
      ['New products', 'Tested and validated products', 'Early access to new products'],
      ['Customer support', 'In English by email', 'In Chinese only'],
    ],
    process: [
      'Define your product, budget, and quantity on WhatsApp.',
      'We search for the same product on Alibaba AND 1688 to compare.',
      'You receive a comparison of price, quality, timeline, and risk.',
      'You choose the best option, we verify the supplier.',
      'We pay, inspect, and ship to your African country.',
    ],
    faqs: [
      {
        question: 'Is 1688 really 50% cheaper than Alibaba?',
        answer: 'Yes, for many standard products (textiles, accessories, electronics, toys), 1688 shows prices 30-50% lower than Alibaba. This is because 1688 targets the Chinese domestic market, without export markups, international marketing costs, and intermediary commissions.',
      },
      {
        question: 'Can I buy on 1688 from Mali without an agent?',
        answer: 'Theoretically not practical: the site is in Chinese, payment requires Alipay or Chinese bank account, and there is no international protection. Without a local agent in China, you expose your money to a very high scam risk.',
      },
      {
        question: 'How does ChinaLink buy on 1688 for me?',
        answer: 'Our bilingual team based in Yiwu navigates 1688, identifies reliable suppliers, negotiates in Mandarin, pays via our Chinese Alipay account, inspects quality on-site, and ships to Africa. You benefit from 1688 prices with the security of a local agent.',
      },
      {
        question: 'What products are better on 1688?',
        answer: 'Standard and non-complex products are ideal on 1688: textiles, fashion accessories, homeware, toys, small electronics, tools. For complex technical products (machinery, medical, advanced electronics), Alibaba remains safer.',
      },
      {
        question: 'What is the agent cost for buying on 1688?',
        answer: 'Our fees for buying on 1688 start at $80 per order (search + negotiation + payment). Quality inspection is $100. These fees are quickly offset by 30-50% savings on 1688 prices.',
      },
    ],
    links: [
      { href: '/en/services/agent-sourcing-chine', label: 'Complete China sourcing agent' },
      { href: '/en/services/achat-alibaba-mali', label: 'Buy on Alibaba from Mali' },
      { href: '/en/guides/acheter-sur-1688-depuis-le-mali', label: 'Complete guide to buying on 1688' },
      { href: '/en/services/verification-fournisseur-chine', label: 'Supplier verification' },
    ],
  },
  zh: {
    badge: 'Alibaba 与 1688 指南',
    title: 'Alibaba 与 1688：进口到非洲应该选哪个平台？',
    intro: '在非洲从中国采购时，您是否在 Alibaba 和 1688 之间犹豫？这是所有非洲进口商都会问的问题。Alibaba 是英文国际平台，但出口价格较高。1688 是中国国内市场，价格便宜 30-50%，但只有中文，也没有国际买家保护。在这份完整指南中，ChinaLink Express 为您讲解关键区别、各平台的优势，以及我们的采购代理如何让您安全地在两个平台购买。',
    highlights: [
      '价格、质量、安全性和可用性的详细比较',
      '1688：价格便宜 30-50%，但风险更高',
      'Alibaba：更安全，但出口价格更高',
      '我们的采购代理让您可以在两个平台购买',
      '根据预算和经验推荐的策略',
    ],
    sections: [
      {
        title: 'Alibaba 和 1688 有什么区别？',
        body: 'Alibaba.com 和 1688.com 都属于阿里巴巴集团，但面向完全不同的市场。理解这一区别，是根据您的进口商类型选择合适平台的关键。',
        items: [
          'Alibaba：国际 B2B 平台，英文，面向全球出口',
          '1688：中国国内 B2B 平台，中文，面向中国国内市场',
          '价格：同一产品 1688 通常比 Alibaba 便宜 30-50%',
          '最小起订量（MOQ）：1688 通常更低，因为面向中国小商户',
          '买家保护：Alibaba 有 Trade Assurance，1688 没有国际保护',
        ],
      },
      {
        title: '各平台的优缺点',
        body: '每个平台都有优势和不足。下面的对比表可帮助您根据自身情况选择。',
        items: [
          'Alibaba 优点：英文界面、已核验供应商、Trade Assurance、安全付款、客户支持',
          'Alibaba 缺点：出口价格高、起订量高、与卖家沟通慢',
          '1688 优点：真实工厂价、起订量灵活、新品率先上架、选择极多',
          '1688 缺点：仅中文、没有国际保护、不核验时诈骗风险高、从非洲付款困难',
        ],
      },
      {
        title: '我们为非洲进口商推荐的策略',
        body: '在与数百位非洲进口商合作 7 年后，我们推荐一种混合策略，既结合两个平台的优势，又将风险降到最低。',
        items: [
          '新手：先在 Alibaba 使用 Trade Assurance，保障最初的订单',
          '中级：复杂产品用 Alibaba，简单标准产品用 1688',
          '资深进口商：主要通过已核验的代理在 1688 采购，以提高利润',
          '所有水平：付款前始终通过在中国的本地采购代理核验供应商',
        ],
      },
    ],
    tableHeaders: ['标准', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['语言', '英语（多语言）', '仅中文'],
      ['价格', '出口价（加价 30-50%）', '国内工厂价（便宜 30-50%）'],
      ['最小起订量', '高（100-1000+ 件）', '灵活（10-100 件）'],
      ['买家保护', 'Alibaba Trade Assurance', '无国际保护'],
      ['供应商核验', 'Gold Supplier，已核验', '入驻门槛低，核验困难'],
      ['从非洲付款', '银行卡、T/T（困难）', '支付宝、微信支付（从非洲无法使用）'],
      ['新品', '经过测试和验证的产品', '率先上架的新品'],
      ['客户支持', '英文邮件', '仅中文'],
    ],
    process: [
      '通过 WhatsApp 确定您的产品、预算和数量。',
      '我们在 Alibaba 和 1688 上搜索相同产品进行比较。',
      '您会收到价格、质量、时效和风险的比较。',
      '您选择最佳方案，我们核验供应商。',
      '我们付款、验货并发运到您所在的非洲国家。',
    ],
    faqs: [
      {
        question: '1688 真的比 Alibaba 便宜 50% 吗？',
        answer: '是的，对于许多标准产品（纺织品、配件、电子产品、玩具），1688 的价格比 Alibaba 低 30% 到 50%。这是因为 1688 面向中国国内市场，没有出口、国际营销和中间佣金的额外成本。',
      },
      {
        question: '我可以不通过代理从马里在 1688 购买吗？',
        answer: '理论上不现实：网站是中文的，付款需要支付宝或中国银行账户，也没有任何国际保护。没有在中国的本地代理，您的资金将面临非常高的诈骗风险。',
      },
      {
        question: 'ChinaLink 如何替我在 1688 购买？',
        answer: '我们位于义乌的双语团队浏览 1688，筛选可靠供应商，用中文议价，通过我们的中国支付宝账户付款，现场检查质量，并发运到非洲。您既享受 1688 的价格，又有本地代理的保障。',
      },
      {
        question: '哪些产品在 1688 上更好？',
        answer: '标准且不复杂的产品最适合 1688：纺织品、时尚配件、家居用品、玩具、小型电子产品、工具。对于复杂的技术产品（机器、医疗、高级电子产品），Alibaba 仍然更安全。',
      },
      {
        question: '代理在 1688 购买的费用是多少？',
        answer: '我们在 1688 代购的服务费从每单 80 美元起（搜索 + 议价 + 付款）。质量检验为 100 美元。这些费用很快就能被 1688 价格节省的 30-50% 抵消。',
      },
    ],
    links: [
      { href: '/zh/services/agent-sourcing-chine', label: '完整的中国采购代理服务' },
      { href: '/zh/services/achat-alibaba-mali', label: '从马里在 Alibaba 购买' },
      { href: '/zh/guides/acheter-sur-1688-depuis-le-mali', label: '1688 购买完整指南' },
      { href: '/zh/services/verification-fournisseur-chine', label: '供应商核验' },
    ],
  },
  ar: {
    badge: 'دليل Alibaba مقابل 1688',
    title: 'Alibaba أم 1688: أي منصة تختار للاستيراد إلى أفريقيا؟',
    intro: 'هل تتردد بين Alibaba و1688 للشراء من الصين وأنت في أفريقيا؟ هذا سؤال يطرحه كل المستوردين الأفارقة. Alibaba منصة دولية باللغة الإنجليزية لكن بأسعار تصدير أعلى، و1688 هي السوق المحلية الصينية بأسعار أقل بنسبة 30-50%، لكنها بالصينية فقط وبلا حماية دولية للمشتري. في هذا الدليل الشامل تشرح لك ChinaLink Express الفروق الأساسية ومزايا كل منصة وكيف يتيح لك وكيلنا الشراء من كلتيهما بأمان.',
    highlights: [
      'مقارنة تفصيلية للسعر والجودة والأمان وسهولة الوصول',
      '1688: أسعار أقل بنسبة 30-50% لكن المخاطر أعلى',
      'Alibaba: أكثر أمانًا لكن بأسعار تصدير أعلى',
      'يتيح لك وكيل الشراء لدينا الشراء من المنصتين',
      'استراتيجية موصى بها حسب ميزانيتك وخبرتك',
    ],
    sections: [
      {
        title: 'ما الفرق بين Alibaba و1688؟',
        body: 'تنتمي Alibaba.com و1688.com إلى مجموعة Alibaba، لكنهما موجهتان إلى سوقين مختلفتين تمامًا. وفهم هذا الفرق ضروري لاختيار المنصة المناسبة لوضعك كمستورد.',
        items: [
          'Alibaba: منصة B2B دولية بالإنجليزية للتصدير إلى العالم كله',
          '1688: منصة B2B صينية محلية بالصينية للسوق الداخلية الصينية',
          'السعر: 1688 أرخص دائمًا من Alibaba بنسبة 30-50% للمنتج نفسه',
          'الحد الأدنى للطلب (MOQ): غالبًا أقل في 1688 لأنها موجهة إلى صغار التجار الصينيين',
          'حماية المشتري: Trade Assurance في Alibaba، ولا حماية دولية في 1688',
        ],
      },
      {
        title: 'مزايا وعيوب كل منصة',
        body: 'لكل منصة نقاط قوة وضعف. إليك جدول مقارنة يساعدك على الاختيار حسب وضعك.',
        items: [
          'مزايا Alibaba: واجهة إنجليزية، موردون موثقون، Trade Assurance، دفع آمن، دعم للعملاء',
          'عيوب Alibaba: أسعار تصدير مرتفعة، حد أدنى مرتفع للطلب، تواصل بطيء مع البائعين',
          'مزايا 1688: أسعار مصنع حقيقية وحد أدنى مرن للطلب وأحدث المنتجات وتشكيلة ضخمة',
          'عيوب 1688: بالصينية فقط، بلا حماية دولية، خطر احتيال مرتفع دون تحقق، دفع صعب من أفريقيا',
        ],
      },
      {
        title: 'الاستراتيجية التي نوصي بها للمستوردين الأفارقة',
        body: 'بعد 7 سنوات من الخبرة مع مئات المستوردين الأفارقة، نوصي باستراتيجية هجينة تجمع مزايا المنصتين مع تقليل المخاطر إلى الحد الأدنى.',
        items: [
          'المبتدئون: ابدأوا من Alibaba مع Trade Assurance لتأمين طلباتكم الأولى',
          'المتوسطون: Alibaba للمنتجات المعقدة، و1688 للمنتجات البسيطة والقياسية',
          'المستوردون المتمرسون: اشتروا أساسًا من 1688 عبر وكيل موثوق لزيادة هوامشكم',
          'لكل المستويات: استعينوا دائمًا بوكيل توريد محلي في الصين للتحقق من الموردين قبل الدفع',
        ],
      },
    ],
    tableHeaders: ['المعيار', 'Alibaba.com', '1688.com'],
    tableRows: [
      ['اللغة', 'الإنجليزية (متعددة اللغات)', 'الصينية فقط'],
      ['السعر', 'سعر التصدير (أعلى بنسبة 30-50%)', 'سعر المصنع المحلي (أقل بنسبة 30-50%)'],
      ['الحد الأدنى للطلب', 'مرتفع (100-1000+ قطعة)', 'مرن (10-100 قطعة)'],
      ['حماية المشتري', 'Trade Assurance من Alibaba', 'لا توجد حماية دولية'],
      ['التحقق من المورد', 'Gold Supplier، موثق', 'شروط دخول منخفضة وتحقق صعب'],
      ['الدفع من أفريقيا', 'بطاقة مصرفية، T/T (صعب)', 'Alipay وWeChat Pay (غير ممكن من أفريقيا)'],
      ['المنتجات الجديدة', 'منتجات مجربة ومعتمدة', 'أحدث المنتجات قبل غيرها'],
      ['دعم العملاء', 'بالإنجليزية عبر البريد الإلكتروني', 'بالصينية فقط'],
    ],
    process: [
      'حدد منتجك وميزانيتك والكمية عبر WhatsApp.',
      'نبحث عن المنتج نفسه في Alibaba و1688 للمقارنة.',
      'تتلقى مقارنة للسعر والجودة والمدة والمخاطر.',
      'تختار الخيار الأفضل، ونتحقق نحن من المورد.',
      'ندفع ونفحص ونشحن إلى بلدك في أفريقيا.',
    ],
    faqs: [
      {
        question: 'هل 1688 أرخص حقًا بنسبة 50% من Alibaba؟',
        answer: 'نعم، بالنسبة إلى كثير من المنتجات القياسية (المنسوجات والإكسسوارات والإلكترونيات والألعاب)، تقل أسعار 1688 عن Alibaba بنسبة 30 إلى 50%. والسبب أن 1688 موجهة إلى السوق المحلية الصينية بلا تكاليف إضافية للتصدير والتسويق الدولي وعمولات الوسطاء.',
      },
      {
        question: 'هل يمكنني الشراء من 1688 من مالي دون وكيل؟',
        answer: 'هذا غير عملي: فالموقع بالصينية، والدفع يتطلب Alipay أو حسابًا مصرفيًا صينيًا، ولا توجد أي حماية دولية. ودون وكيل محلي في الصين، تعرّض أموالك لخطر احتيال مرتفع جدًا.',
      },
      {
        question: 'كيف تشتري ChinaLink من 1688 نيابة عني؟',
        answer: 'يتصفح فريقنا ثنائي اللغة في ييوو منصة 1688، ويحدد الموردين الموثوقين، ويتفاوض بالصينية، ويدفع عبر حسابنا الصيني في Alipay، ويفحص الجودة ميدانيًا، ثم يشحن إلى أفريقيا. تستفيد من أسعار 1688 مع أمان وكيل محلي.',
      },
      {
        question: 'ما المنتجات الأفضل في 1688؟',
        answer: 'المنتجات القياسية غير المعقدة مثالية في 1688: المنسوجات وإكسسوارات الموضة والأدوات المنزلية والألعاب والإلكترونيات الصغيرة والعدد. أما المنتجات التقنية المعقدة (الآلات والمعدات الطبية والإلكترونيات المتقدمة) فتبقى Alibaba أكثر أمانًا لها.',
      },
      {
        question: 'ما تكلفة الوكيل للشراء من 1688؟',
        answer: 'تبدأ أتعابنا للشراء من 1688 من 80 دولارًا لكل طلب (بحث + تفاوض + دفع). ويبلغ فحص الجودة 100 دولار. وتُعوَّض هذه الرسوم سريعًا بما توفره أسعار 1688 من 30-50%.',
      },
    ],
    links: [
      { href: '/ar/services/agent-sourcing-chine', label: 'وكيل توريد شامل في الصين' },
      { href: '/ar/services/achat-alibaba-mali', label: 'الشراء من Alibaba من مالي' },
      { href: '/ar/guides/acheter-sur-1688-depuis-le-mali', label: 'الدليل الكامل للشراء من 1688' },
      { href: '/ar/services/verification-fournisseur-chine', label: 'التحقق من المورد' },
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
      ? 'Alibaba vs 1688 for African Importers | Which is Better? | ChinaLink'
      : isZh ? '非洲进口商选 Alibaba 还是 1688 | 如何选择？ | ChinaLink' : isAr ? 'Alibaba أم 1688 للمستوردين الأفارقة | أيهما تختار؟ | ChinaLink' : 'Alibaba vs 1688 pour Importateurs Africains | Lequel Choisir? | ChinaLink',
    description: isEn
      ? 'Alibaba (international, English, higher prices) vs 1688 (Chinese-only, factory direct, 30-50% cheaper). Which platform should African importers use? Complete guide with pros, cons, and our recommendation. WhatsApp: +86 188 5172 5957'
      : isZh ? 'Alibaba（国际、英文、价格较高）与 1688（仅中文、工厂直供、便宜 30-50%）。非洲进口商该选哪个平台？包含优缺点的完整指南。WhatsApp：+86 188 5172 5957' : isAr ? 'Alibaba (دولية، بالإنجليزية، أسعار أعلى) مقابل 1688 (بالصينية فقط، مباشرة من المصنع، أرخص بنسبة 30-50%). أي منصة تناسب المستوردين الأفارقة؟ دليل شامل بالمزايا والعيوب. WhatsApp: ‎+86 188 5172 5957' : 'Alibaba (international, anglais, prix plus élevés) vs 1688 (chinois uniquement, direct usine, 30-50% moins cher). Quelle plateforme pour les importateurs africains ? Guide complet avec avantages et inconvénients. WhatsApp : +86 188 5172 5957',
    keywords: isEn
      ? 'Alibaba vs 1688 for Africa, difference Alibaba 1688, buy from 1688 Africa, 1688 sourcing agent, Alibaba agent Africa, cheaper than Alibaba, Chinese factory direct, 1688 vs Alibaba price comparison, freight forwarder China Mali'
      : isZh ? '非洲 Alibaba 与 1688, Alibaba 1688 区别, 从非洲在 1688 购买, 1688 采购代理, 非洲 Alibaba 代理, 比 Alibaba 便宜, 中国工厂直供, 1688 Alibaba 价格比较, 中国马里货运, 中国马里货代' : isAr ? 'Alibaba مقابل 1688 لأفريقيا، الفرق بين Alibaba و1688، الشراء من 1688 في أفريقيا، وكيل توريد 1688، وكيل Alibaba في أفريقيا، أرخص من Alibaba، مباشرة من المصنع الصيني، مقارنة أسعار 1688 وAlibaba، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'Alibaba vs 1688 pour Afrique, différence Alibaba 1688, acheter sur 1688 Afrique, agent sourcing 1688, agent Alibaba Afrique, moins cher qu Alibaba, direct usine chinoise, comparaison prix 1688 Alibaba, cargo chine mali, transitaire chine mali',
    path: '/guides/alibaba-vs-1688-pour-afrique',
    locale: locale as Locale,

  });
}

export default async function AlibabaVs1688Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  const howToSteps = isEn
    ? [
        { name: 'Define your need', text: 'Identify the product, quantity and budget before choosing a platform.' },
        { name: 'Compare both platforms', text: 'Search the same product on Alibaba and 1688 to compare pricing and conditions.' },
        { name: 'Verify the supplier', text: 'Check license, history and customer signals before any payment.' },
        { name: 'Choose the payment method', text: 'Use Trade Assurance, China-side payment support or a local agent depending on the platform.' },
        { name: 'Inspect and ship', text: 'Quality control, consolidation and freight to your African destination.' },
      ]
    : isZh ? [
        { name: '明确您的需求', text: '在选择平台之前，先确定产品、数量和预算。' },
        { name: '比较两个平台', text: '在 Alibaba 和 1688 搜索相同产品，比较价格和条件。' },
        { name: '核验供应商', text: '在任何付款前审核营业执照、经营记录和客户评价。' },
        { name: '选择付款方式', text: '1688 用支付宝，Alibaba 用 Trade Assurance，或通过本地代理确保安全。' },
        { name: '验货并发运', text: '现场质检、集运并发往非洲。' },
      ] : isAr ? [
        { name: 'حدد حاجتك', text: 'حدد المنتج والكمية وميزانيتك قبل اختيار المنصة.' },
        { name: 'قارن بين المنصتين', text: 'ابحث عن المنتج نفسه في Alibaba و1688 لمقارنة السعر والشروط.' },
        { name: 'تحقق من المورد', text: 'افحص الرخصة والسجل وآراء العملاء قبل أي دفع.' },
        { name: 'اختر طريقة الدفع', text: 'Alipay لـ1688، وTrade Assurance لـAlibaba، أو وكيل محلي لتأمين الدفع.' },
        { name: 'افحص واشحن', text: 'فحص الجودة ميدانيًا والتجميع والشحن إلى أفريقيا.' },
      ] : [
        { name: 'Définir votre besoin', text: 'Identifiez le produit, la quantité et votre budget avant de choisir une plateforme.' },
        { name: 'Comparer les deux plateformes', text: 'Recherchez le même produit sur Alibaba et 1688 pour comparer prix et conditions.' },
        { name: 'Vérifier le fournisseur', text: 'Audit de la licence, historique et avis clients avant tout paiement.' },
        { name: 'Choisir le mode de paiement', text: 'Alipay pour 1688, Trade Assurance pour Alibaba, ou agent local pour sécuriser.' },
        { name: 'Inspecter et expédier', text: 'Contrôle qualité sur place, consolidation et fret vers l\'Afrique.' },
      ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Guides' : 'Guides', url: `/${locale}/guides` },
      { name: isEn ? 'Alibaba vs 1688' : 'Alibaba vs 1688', url: `/${locale}/guides/alibaba-vs-1688-pour-afrique` },
    ], locale as Locale),
    generateFAQPageSchema([...page.faqs], locale as Locale),
    generateHowToSchema(
      isEn ? 'How to Choose Between Alibaba and 1688 for African Importing' : isZh ? '进口到非洲时如何在 Alibaba 和 1688 之间选择' : isAr ? 'كيف تختار بين Alibaba و1688 للاستيراد إلى أفريقيا' : 'Comment choisir entre Alibaba et 1688 pour importer en Afrique',
      isEn ? 'Step-by-step guide to select the right Chinese platform for your business' : isZh ? '一步一步选择适合您业务的中国平台的指南' : isAr ? 'دليل خطوة بخطوة لاختيار المنصة الصينية المناسبة لتجارتك' : 'Guide étape par étape pour choisir la bonne plateforme chinoise pour votre business',
      howToSteps,
      locale as Locale
    ),
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
