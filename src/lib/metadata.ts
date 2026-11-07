/**
 * Metadata Utilities
 * 
 * Helper functions for generating consistent, SEO-optimized metadata
 * across all pages with proper hreflang and OpenGraph support.
 */

import { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import { Locale, i18nConfig, getSeoLocale } from '@/i18n/config';
import { BUSINESS_INFO, generatePageMetadata } from '@/config/seo-advanced';

// ============================================================================
// NEW: Expanded Metadata Generators for #1 Rankings
// ============================================================================

/**
 * Payment service page metadata
 */
export async function generatePaymentMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return generatePageMetadata({
    title: isEn
      ? 'Pay Chinese Suppliers Safely | Alibaba & 1688 Payment Agent | ChinaLink'
      : isZh ? '向中国供应商付款 | Alibaba 1688 付款服务 | ChinaLink' : isAr ? 'الدفع لمورد صيني | خدمة الدفع في Alibaba و1688 | ChinaLink' : 'Payer Fournisseur Chinois | Service Paiement Alibaba 1688 | ChinaLink',
    description: isEn
      ? 'Secure payment service for Chinese suppliers. Pay Alibaba, 1688 & factory suppliers safely via Alipay, WeChat Pay, bank transfer. Avoid scams. Trusted by 500+ African businesses. WhatsApp: +86 188 5172 5957'
      : isZh ? '面向中国供应商的安全付款服务。通过支付宝、微信支付、转账向 Alibaba、1688 和工厂付款。避免诈骗。500 多家非洲企业信任我们。' : isAr ? 'خدمة دفع آمنة للموردين الصينيين. ادفع لـAlibaba و1688 والمصانع عبر Alipay وWeChat Pay والتحويل. تجنب الاحتيال. أكثر من 500 شركة أفريقية تثق بنا.' : 'Service de paiement sécurisé pour fournisseurs chinois. Payez Alibaba, 1688 et usines via Alipay, WeChat Pay, virement. Évitez les arnaques. 500+ entreprises africaines nous font confiance.',
    keywords: isEn
      ? 'pay Chinese supplier, supplier payment China, Alibaba payment service, 1688 payment, pay factory in China, secure payment China, escrow payment China, WeChat Pay supplier, Alipay supplier payment, payment agent China, avoid Alibaba scam, safe payment China, freight forwarder China Mali'
      : isZh ? '向中国供应商付款, 中国供应商付款, Alibaba 付款服务, 1688 付款, 向中国工厂付款, 中国安全付款, 中国托管, 微信支付供应商, 支付宝付款, 中国付款代理, 避免 Alibaba 诈骗, 中国马里货运, 中国马里货代' : isAr ? 'الدفع لمورد صيني، الدفع للموردين في الصين، خدمة الدفع في Alibaba، الدفع في 1688، الدفع لمصنع في الصين، الدفع الآمن في الصين، الضمان في الصين، WeChat Pay للموردين، الدفع عبر Alipay، وكيل دفع في الصين، تجنب احتيال Alibaba، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'payer fournisseur chinois, paiement fournisseur Chine, service paiement Alibaba, paiement 1688, payer usine Chine, paiement sécurisé Chine, escrow Chine, WeChat Pay fournisseur, Alipay paiement, agent paiement Chine, éviter arnaque Alibaba, cargo chine mali, transitaire chine mali',
    path: '/services/paiement-fournisseur-chine',
    locale,
    ogType: 'article',
  });
}

/**
 * Supplier verification page metadata
 */
export async function generateVerificationMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return generatePageMetadata({
    title: isEn
      ? 'Verify Chinese Suppliers | Avoid Alibaba Scams | Factory Audit China'
      : isZh ? '核验中国供应商 | 避免 Alibaba 诈骗 | 中国工厂审核' : isAr ? 'التحقق من مورد صيني | تجنب احتيال Alibaba | تدقيق المصانع في الصين' : 'Vérifier Fournisseur Chinois | Éviter Arnaque Alibaba | Audit Usine Chine',
    description: isEn
      ? 'Avoid scams on Alibaba & 1688. On-site Chinese supplier verification: factory audit, license check, quality inspection. Protect your investment. Trusted by African importers since 2019.'
      : isZh ? '避免 Alibaba 和 1688 上的诈骗。实地核验中国供应商：工厂审核、执照核查、质量检验。保护您的投资。' : isAr ? 'تجنب الاحتيال في Alibaba و1688. تحقق ميداني من الموردين الصينيين: تدقيق المصنع وفحص الرخصة وفحص الجودة. احمِ استثمارك.' : 'Évitez les arnaques sur Alibaba et 1688. Vérification sur place des fournisseurs chinois : audit usine, vérification licence, inspection qualité. Protégez votre investissement.',
    keywords: isEn
      ? 'verify Chinese supplier, Alibaba supplier verification, check Chinese factory, avoid China scam, legitimate Chinese supplier, factory audit China, supplier background check, Alibaba scam check, 1688 supplier check, trusted manufacturer China, freight forwarder China Mali'
      : isZh ? '核验中国供应商, Alibaba 供应商核验, 核验中国工厂, 避免中国诈骗, 可靠的中国供应商, 中国工厂审核, Alibaba 诈骗核查, 1688 供应商核验, 中国值得信赖的制造商, 中国马里货运, 中国马里货代' : isAr ? 'التحقق من مورد صيني، التحقق من موردي Alibaba، التحقق من مصنع صيني، تجنب الاحتيال في الصين، مورد صيني جاد، تدقيق المصانع في الصين، فحص احتيال Alibaba، التحقق من موردي 1688، مصنّع موثوق في الصين، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'vérifier fournisseur chinois, vérification fournisseur Alibaba, vérifier usine chinoise, éviter arnaque Chine, fournisseur chinois sérieux, audit usine Chine, vérification arnaque Alibaba, vérification fournisseur 1688, fabricant de confiance Chine, cargo chine mali, transitaire chine mali',
    path: '/services/verification-fournisseur-chine',
    locale,
    ogType: 'article',
  });
}

/**
 * Alibaba agent page metadata
 */
export async function generateAlibabaAgentMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return generatePageMetadata({
    title: isEn
      ? 'Alibaba Buying Agent for Africa | Buy from China | ChinaLink Express'
      : isZh ? '非洲 Alibaba 采购代理 | 在中国采购 | ChinaLink Express' : isAr ? 'وكيل شراء Alibaba في أفريقيا | الشراء من الصين | ChinaLink Express' : 'Agent Achat Alibaba Afrique | Acheter en Chine | ChinaLink Express',
    description: isEn
      ? 'Your trusted Alibaba buying agent for Mali, Senegal, Ivory Coast & West Africa. We find suppliers, negotiate prices, verify quality, handle payment & ship to your door. Get started on WhatsApp!'
      : isZh ? '面向马里、塞内加尔、科特迪瓦和西非的可信赖 Alibaba 采购代理。我们寻找供应商、议价、核验质量、付款并发货。在 WhatsApp 上开始！' : isAr ? 'وكيلك الموثوق للشراء من Alibaba لمالي والسنغال وساحل العاج وغرب أفريقيا. نجد الموردين ونتفاوض ونتحقق من الجودة وندفع ونشحن. ابدأ عبر WhatsApp!' : 'Votre agent achat Alibaba de confiance pour le Mali, Sénégal, Côte d\'Ivoire et Afrique de l\'Ouest. Nous trouvons les fournisseurs, négocions, vérifions la qualité, payons et expédions. Commencez sur WhatsApp !',
    keywords: isEn
      ? 'Alibaba buying agent, Alibaba agent Africa, buy from Alibaba Mali, Alibaba sourcing agent, Alibaba procurement Africa, Alibaba shipping agent, buy from China agent, China buying agent Africa, Alibaba middleman, cargo chine mali, freight forwarder China Mali'
      : isZh ? 'Alibaba 采购代理, 非洲 Alibaba 代理, 马里 Alibaba 购买, Alibaba 采购代理, 非洲 Alibaba 采购, Alibaba 海运代理, 中国代购, 中国非洲采购代理, Alibaba 中间商, 中国马里货运, 中国马里货代' : isAr ? 'وكيل شراء Alibaba، وكيل Alibaba في أفريقيا، الشراء من Alibaba في مالي، وكيل توريد Alibaba، التوريد من Alibaba إلى أفريقيا، وكيل بحري Alibaba، وكيل الشراء من الصين، وكيل شراء من الصين إلى أفريقيا، وسيط Alibaba، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي' : 'agent achat Alibaba, agent Alibaba Afrique, acheter Alibaba Mali, agent sourcing Alibaba, approvisionnement Alibaba Afrique, agent maritime Alibaba, acheter Chine agent, agent achat Chine Afrique, intermédiaire Alibaba, cargo chine mali, transitaire chine mali',
    path: '/services/agent-sourcing-chine',
    locale,
    ogType: 'article',
  });
}

/**
 * Industry page metadata generator
 */
export async function generateIndustryMetadata(
  locale: Locale,
  industry: 'textiles' | 'electronics' | 'machinery' | 'cosmetics' | 'autoParts' | 'construction'
): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  const industryConfig = {
    textiles: {
      title: isEn
        ? 'Import Textiles from China to Africa | Clothing Wholesale Agent | ChinaLink'
        : isZh ? '从中国进口纺织品到非洲 | 服装批发代理 | ChinaLink' : isAr ? 'استيراد المنسوجات من الصين إلى أفريقيا | وكيل ملابس بالجملة | ChinaLink' : 'Importer Textiles Chine Afrique | Agent Grossiste Vêtements | ChinaLink',
      description: isEn
        ? 'Import clothing, fabrics & textiles from China to Mali, Senegal & West Africa. We source from Guangzhou wholesale markets, inspect quality, and ship via air or sea. Best prices guaranteed!'
        : isZh ? '从中国向马里、塞内加尔和西非进口服装、面料和纺织品。我们在广州批发市场采购、检验并通过空运或海运发货。' : isAr ? 'استورد الملابس والأقمشة والمنسوجات من الصين إلى مالي والسنغال وغرب أفريقيا. نورّد من أسواق الجملة في قوانغتشو ونفحص ونشحن جوًا أو بحرًا.' : 'Importez vêtements, tissus et textiles de Chine vers le Mali, Sénégal et Afrique de l\'Ouest. Nous sourçons sur les marchés de gros de Guangzhou, inspectons et expédions par air ou mer.',
      keywords: isEn
        ? 'import textiles from China, wholesale clothing China, buy clothes from China, textile sourcing agent, import fabrics China Africa, garment factory China, wholesale fashion China, clothing supplier China, freight forwarder China Mali'
        : isZh ? '从中国进口纺织品, 中国服装批发, 从中国购买服装, 纺织品采购代理, 中国进口面料到非洲, 中国服装工厂, 中国时尚批发, 中国服装供应商, 中国马里货运' : isAr ? 'استيراد المنسوجات من الصين، ملابس بالجملة من الصين، شراء ملابس من الصين، وكيل توريد المنسوجات، استيراد الأقمشة من الصين إلى أفريقيا، مصنع ملابس في الصين، موضة بالجملة من الصين، مورد ملابس في الصين، الشحن من الصين إلى مالي' : 'importer textiles Chine, grossiste vêtements Chine, acheter vêtements Chine, agent sourcing textile, importer tissus Chine Afrique, usine vêtements Chine, grossiste mode Chine, fournisseur vêtements Chine, cargo chine mali',
      path: '/industries/textiles-chine-afrique',
    },
    electronics: {
      title: isEn
        ? 'Import Electronics from China to Africa | Phones, Laptops, Gadgets | ChinaLink'
        : isZh ? '从中国进口电子产品到非洲 | 手机、电脑 | ChinaLink' : isAr ? 'استيراد الإلكترونيات من الصين إلى أفريقيا | الهواتف والحواسيب | ChinaLink' : 'Importer Électronique Chine Afrique | Téléphones, Ordinateurs | ChinaLink',
      description: isEn
        ? 'Import phones, laptops, accessories & electronics from China to Africa. Shenzhen sourcing agent with quality control and warranty support. Air freight 14-21 days to Bamako.'
        : isZh ? '从中国向非洲进口手机、电脑、配件和电子产品。深圳采购代理，提供质量检查和保修支持。空运 14-21 天到巴马科。' : isAr ? 'استورد الهواتف والحواسيب والإكسسوارات والإلكترونيات من الصين إلى أفريقيا. وكيل توريد في شنتشن مع فحص الجودة ودعم الضمان. شحن جوي خلال 14-21 يومًا إلى باماكو.' : 'Importez téléphones, ordinateurs, accessoires et électronique de Chine vers l\'Afrique. Agent sourcing Shenzhen avec contrôle qualité et support garantie. Fret aérien 14-21 jours à Bamako.',
      keywords: isEn
        ? 'import electronics from China, wholesale phones China, buy laptops from China, electronics sourcing agent, Shenzhen electronics market, import gadgets China Africa, phone supplier China, electronics wholesale Africa, cargo chine mali'
        : isZh ? '从中国进口电子产品, 中国手机批发, 从中国购买电脑, 电子产品采购代理, 深圳电子市场, 中国进口小工具到非洲, 中国手机供应商, 中国马里货运' : isAr ? 'استيراد الإلكترونيات من الصين، هواتف بالجملة من الصين، شراء حواسيب من الصين، وكيل توريد الإلكترونيات، سوق الإلكترونيات في شنتشن، استيراد الأجهزة من الصين إلى أفريقيا، مورد هواتف في الصين، الشحن من الصين إلى مالي' : 'importer électronique Chine, gros téléphones Chine, acheter ordinateurs Chine, agent sourcing électronique, marché électronique Shenzhen, importer gadgets Chine Afrique, fournisseur téléphones Chine, cargo chine mali',
      path: '/industries/electronique-chine-afrique',
    },
    machinery: {
      title: isEn
        ? 'Import Machinery from China to Africa | Industrial Equipment | ChinaLink'
        : isZh ? '从中国进口机器到非洲 | 工业设备 | ChinaLink' : isAr ? 'استيراد الآلات من الصين إلى أفريقيا | معدات صناعية | ChinaLink' : 'Importer Machines Chine Afrique | Équipement Industriel | ChinaLink',
      description: isEn
        ? 'Import industrial machinery, construction equipment & tools from China to Africa. FCL container shipping, factory direct pricing, installation support. Get your quote today!'
        : isZh ? '从中国向非洲进口工业机器、建筑设备和工具。FCL 集装箱运输，工厂直供价，安装支持。免费报价！' : isAr ? 'استورد الآلات الصناعية ومعدات البناء والأدوات من الصين إلى أفريقيا. شحن بحاويات FCL وسعر المصنع المباشر ودعم التركيب. عرض سعر مجاني!' : 'Importez machines industrielles, équipement construction et outils de Chine vers l\'Afrique. Expédition conteneur FCL, prix direct usine, support installation. Devis gratuit !',
      keywords: isEn
        ? 'import machinery from China, industrial equipment China, buy machines from China, machinery sourcing agent, factory equipment China Africa, construction machinery import, machine supplier China, heavy equipment shipping, cargo chine mali'
        : isZh ? '从中国进口机器, 中国工业设备, 从中国购买机器, 机器采购代理, 中国工厂设备到非洲, 进口建筑设备, 中国机器供应商, 中国马里货运' : isAr ? 'استيراد الآلات من الصين، معدات صناعية من الصين، شراء آلات من الصين، وكيل توريد الآلات، معدات المصانع من الصين إلى أفريقيا، استيراد معدات البناء، مورد آلات في الصين، الشحن من الصين إلى مالي' : 'importer machines Chine, équipement industriel Chine, acheter machines Chine, agent sourcing machines, équipement usine Chine Afrique, importer matériel construction, fournisseur machines Chine, cargo chine mali',
      path: '/industries/machines-chine-afrique',
    },
    cosmetics: {
      title: isEn
        ? 'Import Cosmetics from China to Africa | Beauty Products Wholesale | ChinaLink'
        : isZh ? '从中国进口化妆品到非洲 | 美容产品批发 | ChinaLink' : isAr ? 'استيراد مستحضرات التجميل من الصين إلى أفريقيا | منتجات الجمال بالجملة | ChinaLink' : 'Importer Cosmétiques Chine Afrique | Produits Beauté Gros | ChinaLink',
      description: isEn
        ? 'Import beauty products, skincare, hair products & cosmetics from China to Africa. Guangzhou cosmetics market sourcing with FDA-compliant labeling. Air & sea freight available.'
        : isZh ? '从中国向非洲进口美容产品、面部护理、护发和化妆品。在广州化妆品市场采购，标签合规。可选空运和海运。' : isAr ? 'استورد منتجات الجمال والعناية بالوجه والشعر ومستحضرات التجميل من الصين إلى أفريقيا. توريد من سوق مستحضرات التجميل في قوانغتشو مع ملصقات مطابقة. شحن جوي وبحري متاح.' : 'Importez produits beauté, soins visage, cheveux et cosmétiques de Chine vers l\'Afrique. Sourcing marché cosmétiques Guangzhou avec étiquetage conforme. Fret aérien et maritime disponible.',
      keywords: isEn
        ? 'import cosmetics from China, wholesale beauty products China, buy skincare from China, cosmetics sourcing agent, Guangzhou cosmetics market, import hair products China Africa, beauty supplier China, cosmetics wholesale Africa, cargo chine mali'
        : isZh ? '从中国进口化妆品, 中国美容产品批发, 从中国购买护肤品, 化妆品采购代理, 广州化妆品市场, 中国进口护发产品到非洲, 中国马里货运' : isAr ? 'استيراد مستحضرات التجميل من الصين، منتجات الجمال بالجملة من الصين، شراء منتجات العناية من الصين، وكيل توريد مستحضرات التجميل، سوق مستحضرات التجميل في قوانغتشو، استيراد منتجات الشعر من الصين إلى أفريقيا، الشحن من الصين إلى مالي' : 'importer cosmétiques Chine, gros produits beauté Chine, acheter soins visage Chine, agent sourcing cosmétiques, marché cosmétiques Guangzhou, importer produits cheveux Chine Afrique, cargo chine mali',
      path: '/industries/cosmetiques-chine-afrique',
    },
    autoParts: {
      title: isEn
        ? 'Import Auto Parts from China to Africa | Car Spare Parts Wholesale | ChinaLink'
        : isZh ? '从中国进口汽配到非洲 | 零部件批发 | ChinaLink' : isAr ? 'استيراد قطع السيارات من الصين إلى أفريقيا | قطع غيار بالجملة | ChinaLink' : 'Importer Pièces Auto Chine Afrique | Gros Pièces Détachées | ChinaLink',
      description: isEn
        ? 'Import car parts, truck spare parts & auto accessories from China to Africa. Guangzhou auto parts market sourcing with quality guarantee. Container shipping for bulk orders.'
        : isZh ? '从中国向非洲进口汽车配件、卡车零部件和用品。在广州汽配市场采购，质量有保障。大批量集装箱运输。' : isAr ? 'استورد قطع السيارات وقطع غيار الشاحنات والإكسسوارات من الصين إلى أفريقيا. توريد من سوق قطع السيارات في قوانغتشو مع ضمان الجودة. شحن بالحاويات للكميات الكبيرة.' : 'Importez pièces auto, pièces détachées camion et accessoires de Chine vers l\'Afrique. Sourcing marché pièces auto Guangzhou avec garantie qualité. Expédition conteneur pour gros volumes.',
      keywords: isEn
        ? 'import auto parts from China, wholesale car parts China, buy spare parts from China, auto parts sourcing agent, Guangzhou auto parts market, import truck parts China Africa, car accessories supplier China, auto parts wholesale Africa, cargo chine mali'
        : isZh ? '从中国进口汽配, 中国汽配批发, 从中国购买零部件, 汽配采购代理, 广州汽配市场, 中国进口卡车配件到非洲, 中国马里货运' : isAr ? 'استيراد قطع السيارات من الصين، قطع سيارات بالجملة من الصين، شراء قطع الغيار من الصين، وكيل توريد قطع السيارات، سوق قطع السيارات في قوانغتشو، استيراد قطع الشاحنات من الصين إلى أفريقيا، الشحن من الصين إلى مالي' : 'importer pièces auto Chine, gros pièces auto Chine, acheter pièces détachées Chine, agent sourcing pièces auto, marché pièces auto Guangzhou, importer pièces camion Chine Afrique, cargo chine mali',
      path: '/industries/pieces-auto-chine-afrique',
    },
    construction: {
      title: isEn
        ? 'Import Building Materials from China to Africa | Construction Supplies | ChinaLink'
        : isZh ? '从中国进口建材到非洲 | 建筑用品 | ChinaLink' : isAr ? 'استيراد مواد البناء من الصين إلى أفريقيا | مستلزمات البناء | ChinaLink' : 'Importer Matériaux Construction Chine Afrique | Fournitures Bâtiment | ChinaLink',
      description: isEn
        ? 'Import tiles, sanitary ware, hardware, tools & building materials from China to Africa. Foshan ceramics market sourcing. FCL container shipping at best rates. Quote in 24h!'
        : isZh ? '从中国向非洲进口瓷砖、卫浴、五金、工具和建筑材料。在佛山陶瓷市场采购。以最优价格进行 FCL 集装箱运输。24 小时内报价！' : isAr ? 'استورد البلاط والأدوات الصحية والخردوات والعدد ومواد البناء من الصين إلى أفريقيا. توريد من سوق السيراميك في فوشان. شحن بحاويات FCL بأفضل الأسعار. عرض سعر خلال 24 ساعة!' : 'Importez carreaux, sanitaire, quincaillerie, outils et matériaux construction de Chine vers l\'Afrique. Sourcing marché céramique Foshan. Expédition conteneur FCL aux meilleurs tarifs. Devis en 24h !',
      keywords: isEn
        ? 'import building materials from China, wholesale tiles China, buy sanitary ware from China, construction materials sourcing agent, Foshan ceramics market, import hardware China Africa, building supplies supplier China, cargo chine mali'
        : isZh ? '从中国进口建筑材料, 中国瓷砖批发, 从中国购买卫浴, 建材采购代理, 佛山陶瓷市场, 中国进口五金到非洲, 中国马里货运' : isAr ? 'استيراد مواد البناء من الصين، بلاط بالجملة من الصين، شراء الأدوات الصحية من الصين، وكيل توريد مواد البناء، سوق السيراميك في فوشان، استيراد الخردوات من الصين إلى أفريقيا، الشحن من الصين إلى مالي' : 'importer matériaux construction Chine, gros carreaux Chine, acheter sanitaire Chine, agent sourcing matériaux construction, marché céramique Foshan, importer quincaillerie Chine Afrique, cargo chine mali',
      path: '/industries/materiaux-construction-chine-afrique',
    },
  };
  
  const config = industryConfig[industry];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
    ogType: 'article',
  });
}

/**
 * Comparison page metadata
 */
export async function generateComparisonMetadata(
  locale: Locale,
  topic: 'air-vs-sea' | 'alibaba-vs-1688' | 'dhl-vs-forwarder'
): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  const comparisonConfig = {
    'air-vs-sea': {
      title: isEn
        ? 'Air Freight vs Sea Freight from China to Africa | 2026 Comparison | ChinaLink'
        : isZh ? '中国非洲空运与海运 | 2026 年比较 | ChinaLink' : isAr ? 'الشحن الجوي مقابل البحري من الصين إلى أفريقيا | مقارنة 2026 | ChinaLink' : 'Fret Aérien vs Maritime Chine Afrique | Comparaison 2026 | ChinaLink',
      description: isEn
        ? 'Air freight (14-21 days, $8-15/kg) vs sea freight (60-75 days, $80-150/CBM). Which is best for your China to Africa shipment? Complete 2026 comparison with costs, times, and recommendations.'
        : isZh ? '空运（14-21 天，每公斤 8-15 美元）与海运（60-75 天，每 CBM 80-150 美元）。您从中国到非洲的货物该选哪种？2026 年完整比较，包含成本、时效和建议。' : isAr ? 'الشحن الجوي (14-21 يومًا، 8-15 دولارًا/كغ) مقابل البحري (60-75 يومًا، 80-150 دولارًا/CBM). أيهما تختار لشحنتك من الصين إلى أفريقيا؟ مقارنة كاملة لعام 2026 بالتكاليف والمدد والتوصيات.' : 'Fret aérien (14-21 jours, 8-15$/kg) vs maritime (60-75 jours, 80-150$/CBM). Lequel choisir pour votre expédition Chine-Afrique ? Comparaison complète 2026 avec coûts, délais et recommandations.',
      keywords: isEn
        ? 'air freight vs sea freight China Africa, shipping by air or sea from China, container vs air cargo cost, cheapest shipping method China Africa, DHL vs freight forwarder China, cargo chine mali'
        : isZh ? '中国非洲空运与海运, 从中国空运还是海运, 集装箱与空运成本, 中国非洲便宜运输方式, DHL 与中国货代, 中国马里货运' : isAr ? 'الشحن الجوي مقابل البحري من الصين إلى أفريقيا، الشحن جوًا أم بحرًا من الصين، كلفة الحاوية مقابل الشحن الجوي، أرخص طريقة شحن من الصين إلى أفريقيا، DHL مقابل وكيل شحن صيني، الشحن من الصين إلى مالي' : 'fret aérien vs maritime Chine Afrique, expédition air ou mer depuis Chine, conteneur vs cargo aérien coût, moyen expédition pas cher Chine Afrique, DHL vs transitaire Chine, cargo chine mali',
      path: '/guides/fret-aerien-vs-maritime-chine-mali',
    },
    'alibaba-vs-1688': {
      title: isEn
        ? 'Alibaba vs 1688 for African Importers | Which is Better? | ChinaLink'
        : isZh ? '非洲进口商选 Alibaba 还是 1688 | 如何选择？ | ChinaLink' : isAr ? 'Alibaba أم 1688 للمستوردين الأفارقة | أيهما تختار؟ | ChinaLink' : 'Alibaba vs 1688 pour Importateurs Africains | Lequel Choisir? | ChinaLink',
      description: isEn
        ? 'Alibaba (international, English, higher prices) vs 1688 (Chinese-only, factory direct, 30-50% cheaper). Which platform should African importers use? Complete guide with pros, cons, and our recommendation.'
        : isZh ? 'Alibaba（国际、英文、价格较高）与 1688（仅中文、工厂直供、便宜 30-50%）。非洲进口商该选哪个平台？包含优缺点的完整指南。' : isAr ? 'Alibaba (دولية، بالإنجليزية، أسعار أعلى) مقابل 1688 (بالصينية فقط، مباشرة من المصنع، أرخص بنسبة 30-50%). أي منصة تناسب المستوردين الأفارقة؟ دليل شامل بالمزايا والعيوب.' : 'Alibaba (international, anglais, prix plus élevés) vs 1688 (chinois uniquement, direct usine, 30-50% moins cher). Quelle plateforme pour les importateurs africains ? Guide complet avec avantages et inconvénients.',
      keywords: isEn
        ? 'Alibaba vs 1688 for Africa, difference Alibaba 1688, buy from 1688 Africa, 1688 sourcing agent, Alibaba agent Africa, cheaper than Alibaba, Chinese factory direct, cargo chine mali'
        : isZh ? '非洲 Alibaba 与 1688, Alibaba 1688 区别, 从非洲在 1688 购买, 1688 采购代理, 非洲 Alibaba 代理, 比 Alibaba 便宜, 中国工厂直供, 中国马里货运' : isAr ? 'Alibaba مقابل 1688 لأفريقيا، الفرق بين Alibaba و1688، الشراء من 1688 في أفريقيا، وكيل توريد 1688، وكيل Alibaba في أفريقيا، أرخص من Alibaba، مباشرة من المصنع الصيني، الشحن من الصين إلى مالي' : 'Alibaba vs 1688 pour Afrique, différence Alibaba 1688, acheter sur 1688 Afrique, agent sourcing 1688, agent Alibaba Afrique, moins cher qu Alibaba, direct usine chinoise, cargo chine mali',
      path: '/guides/alibaba-vs-1688-pour-afrique',
    },
    'dhl-vs-forwarder': {
      title: isEn
        ? 'DHL vs Freight Forwarder from China to Africa | Cost Comparison 2026 | ChinaLink'
        : isZh ? 'DHL 与中国非洲货代 | 2026 年成本比较 | ChinaLink' : isAr ? 'DHL مقابل وكيل شحن من الصين إلى أفريقيا | مقارنة التكلفة 2026 | ChinaLink' : 'DHL vs Transitaire Chine Afrique | Comparaison Coût 2026 | ChinaLink',
      description: isEn
        ? 'DHL ($25-50/kg, 5-7 days) vs freight forwarder ($8-15/kg, 14-21 days). Which is better for shipping from China to Mali, Senegal, Ivory Coast? Detailed cost comparison for African businesses.'
        : isZh ? 'DHL（每公斤 25-50 美元，5-7 天）与货代（每公斤 8-15 美元，14-21 天）。从中国发往马里、塞内加尔、科特迪瓦该选哪个？为非洲企业提供的详细比较。' : isAr ? 'DHL (25-50 دولارًا/كغ، 5-7 أيام) مقابل وكيل الشحن (8-15 دولارًا/كغ، 14-21 يومًا). أيهما تختار للشحن من الصين إلى مالي والسنغال وساحل العاج؟ مقارنة مفصلة للشركات الأفريقية.' : 'DHL (25-50$/kg, 5-7 jours) vs transitaire (8-15$/kg, 14-21 jours). Lequel choisir pour expédier de Chine vers le Mali, Sénégal, Côte d\'Ivoire ? Comparaison détaillée pour entreprises africaines.',
      keywords: isEn
        ? 'DHL vs freight forwarder China Africa, DHL shipping China Mali cost, cheap alternative DHL China, freight forwarder vs courier China, shipping cost comparison China Africa, cargo chine mali'
        : isZh ? 'DHL 与中国非洲货代, DHL 中国马里费用, 中国 DHL 便宜替代, 货代与快递, 中国非洲运输成本比较, 中国马里货运' : isAr ? 'DHL مقابل وكيل شحن من الصين إلى أفريقيا، كلفة DHL من الصين إلى مالي، بديل رخيص لـDHL من الصين، وكيل شحن مقابل البريد السريع، مقارنة تكلفة الشحن من الصين إلى أفريقيا، الشحن من الصين إلى مالي' : 'DHL vs transitaire Chine Afrique, coût DHL Chine Mali, alternative pas cher DHL Chine, transitaire vs courrier Chine, comparaison coût expédition Chine Afrique, cargo chine mali',
      path: '/guides/dhl-vs-transitaire-chine-afrique',
    },
  };
  
  const config = comparisonConfig[topic];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
    ogType: 'article',
  });
}


// ============================================================================
// Default Metadata Templates
// ============================================================================

export const defaultViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
};

/**
 * Base metadata that applies to all pages
 */
export function getBaseMetadata(locale: Locale): Metadata {
  const seoLocale = getSeoLocale(locale);
  
  return {
    applicationName: BUSINESS_INFO.name,
    authors: [{ name: BUSINESS_INFO.name, url: BUSINESS_INFO.url }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    generator: 'Next.js 15',
    referrer: 'origin-when-cross-origin',
    metadataBase: new URL(BUSINESS_INFO.url),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    category: 'logistics',
    classification: 'Business & Industrial > Shipping & Logistics',
    other: {
      // Geographic targeting
      'geo.region': 'ML-BM',
      'geo.placename': 'Bamako',
      'geo.position': '12.6392;-8.0029',
      'ICBM': '12.6392, -8.0029',
      // Business info
      'business:contact_data:street_address': BUSINESS_INFO.address.streetAddress,
      'business:contact_data:locality': BUSINESS_INFO.address.addressLocality,
      'business:contact_data:country_name': BUSINESS_INFO.address.addressCountry,
      'business:contact_data:phone_number': BUSINESS_INFO.contact.phones.mali,
      'place:location:latitude': '12.6392',
      'place:location:longitude': '-8.0029',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@chinalinkexpress',
      site: '@chinalinkexpress',
    },
    appleWebApp: {
      capable: true,
      title: BUSINESS_INFO.name,
      statusBarStyle: 'default',
    },
    icons: {
      icon: [
        { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: '/icons/icon-32x32.png',
      apple: [
        { url: '/icons/icon-72x72.png', sizes: '72x72' },
        { url: '/icons/icon-114x114.png', sizes: '114x114' },
        { url: '/icons/icon-144x144.png', sizes: '144x144' },
        { url: '/icons/icon-152x152.png', sizes: '152x152' },
        { url: '/icons/icon-180x180.png', sizes: '180x180' },
        { url: '/icons/icon-192x192.png', sizes: '192x192' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/icons/safari-pinned-tab.svg',
          color: '#2563eb',
        },
      ],
    },
    manifest: '/manifest.json',
  };
}

// ============================================================================
// Page Metadata Generators
// ============================================================================

interface PageMetadataParams {
  locale: Locale;
  pageName: string;
  path: string;
  customTitle?: string;
  customDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Generate metadata for any page with translations
 */
export async function generateLocalizedMetadata({
  locale,
  pageName,
  path,
  customTitle,
  customDescription,
  ogImage,
  ogType = 'website',
  noIndex = false,
}: PageMetadataParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const title = customTitle || t(`${pageName}.title`);
  const description = customDescription || t(`${pageName}.description`);
  const keywords = t(`${pageName}.keywords`);
  
  return generatePageMetadata({
    title,
    description,
    keywords,
    path,
    locale,
    ogImage,
    ogType,
    noIndex,
  });
}

/**
 * Home page metadata
 */
export async function generateHomeMetadata(locale: Locale): Promise<Metadata> {
  /*
   * The homepage title used to read "N°1 Transitaire Chine Afrique". Two
   * problems, and the second is the expensive one.
   *
   * "N°1" is an unverifiable superlative — the kind of claim that reads as
   * noise to a reader and carries no weight with a search engine, because
   * every competitor makes it too.
   *
   * More importantly it positioned the brand as pan-African. The business runs
   * one corridor: Guangzhou and Foshan to Bamako. Spreading the homepage's
   * strongest signal across "Afrique", Senegal, Ivory Coast, Ghana and Nigeria
   * meant the highest-authority URL on the site never said plainly what this
   * company is, which is precisely the ambiguity that lets similarly-named
   * forwarders occupy the brand's own search results. The route pages still
   * cover the other corridors; the homepage now claims one thing.
   *
   * The keyword list is trimmed from ~40 terms to the handful that describe
   * the business. `keywords` carries no ranking weight, and a 40-term list is
   * a stuffing signal — the terms live in the page copy, where they count.
   */
  /*
   * All four locales, not the usual `isEn ? english : french`.
   *
   * Every generator in this file branches on English alone, so the Chinese and
   * Arabic pages have always carried French titles and French descriptions.
   * For most pages that is a cosmetic problem; for the four home pages it is
   * the highest-authority URL on the site telling a Chinese-language searcher
   * nothing it can read — and the Chinese page is the one a *supplier* in
   * Guangzhou lands on when a client sends them the link. Translating the whole
   * metadata layer is a larger job; the home pages are worth doing now.
   */
  const byLocale = {
    fr: {
      title: 'Cargo Chine Mali | Transitaire Chine Mali · ChinaLink Express',
      description:
        "Expédition de marchandises de Chine vers le Mali : recherche de fournisseurs, achat et paiement en Chine, réception à nos entrepôts de Guangzhou et Foshan, fret aérien en 14 à 21 jours ou maritime en 60 à 75 jours, et suivi de vos colis jusqu'à Bamako.",
      keywords:
        'ChinaLink Express, transport chine mali, cargo chine mali, transitaire chine mali, fret aérien chine mali, fret maritime chine mali, expédition chine bamako, fournisseur chine mali, paiement fournisseur chine',
    },
    en: {
      title: 'China to Mali Cargo & Freight Forwarder | ChinaLink Express',
      description:
        'China to Mali cargo and freight forwarding for importers across East and West Africa: sourcing, supplier payment, air and sea freight to Bamako, with verified photos and tracking.',
      keywords:
        'China Mali cargo, China Mali freight forwarder, freight forwarder China Africa, shipping from China to West Africa, shipping from China to East Africa, air freight China Bamako, sea freight China Bamako, China sourcing agent Africa',
    },
    zh: {
      title: '中国到马里货运与货运代理 | ChinaLink Express',
      description:
        '为东非和西非进口商提供中国到马里的货运代理服务：采购、供应商付款、空运和海运到巴马科，并提供可验证的照片和货物跟踪。',
      keywords:
        '中国马里货运, 中国马里货运代理, 中非货运代理, 中国到西非货运, 中国到东非货运, 中国到巴马科空运, 中国到巴马科海运',
    },
    ar: {
      title: 'الشحن من الصين إلى مالي ووكيل الشحن | ChinaLink Express',
      description:
        'شحن من الصين إلى مالي للمستوردين في شرق وغرب أفريقيا: التوريد، والدفع للموردين، والشحن الجوي والبحري إلى باماكو، مع صور قابلة للتحقق وتتبع الشحنات.',
      keywords:
        'الشحن من الصين إلى مالي, وكيل شحن الصين مالي, الشحن من الصين إلى غرب أفريقيا, الشحن من الصين إلى شرق أفريقيا, الشحن الجوي إلى باماكو, الشحن البحري إلى باماكو',
    },
  } as const;

  const copy = byLocale[locale] ?? byLocale.fr;

  return generatePageMetadata({
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    path: '/',
    locale,
    ogType: 'website',
  });
}

/**
 * Service page metadata
 */
export async function generateServiceMetadata(
  locale: Locale,
  service: 'air' | 'sea' | 'sourcing'
): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  const serviceConfig = {
    air: {
      title: isEn 
        ? 'Air Freight China to Africa | Mali & West Africa Hub'
        : isZh ? '中国马里空运 | 巴马科快递货运 | ChinaLink' : isAr ? 'الشحن الجوي من الصين إلى مالي | شحن سريع إلى باماكو | ChinaLink' : 'Cargo Aérien Chine Mali | Fret Express Bamako | ChinaLink',
      description: isEn
        ? 'Fast air freight from China to Mali and West Africa. Delivery in 14-21 days via Bamako hub, with sourcing, supplier payment, consolidation, and WhatsApp tracking.'
        : isZh ? '从中国到马里巴马科的快速空运。14-21 天交付，提供采购、供应商付款、集运和 WhatsApp 跟踪。' : isAr ? 'شحن جوي سريع من الصين إلى باماكو في مالي. تسليم خلال 14-21 يومًا مع التوريد والدفع للموردين والتجميع والمتابعة عبر WhatsApp.' : 'Fret aérien rapide de la Chine vers Bamako, Mali. Livraison en 14-21 jours, sourcing, paiement fournisseur, consolidation et suivi WhatsApp.',
      keywords: isEn
        ? 'air freight China Africa, air cargo China Mali, express shipping China West Africa, air freight Bamako, cargo from China to Mali'
        : isZh ? '中国马里空运, 中国马里航空货运, 中国马里快递, 巴马科空运, 中国马里货运' : isAr ? 'الشحن الجوي من الصين إلى مالي، النقل الجوي من الصين إلى مالي، الشحن السريع من الصين إلى مالي، الشحن الجوي إلى باماكو، الشحن من الصين إلى مالي' : 'fret aérien Chine Mali, cargo aérien Chine Mali, cargo aerien chine mali, express Chine Mali, fret aérien Bamako, cargo Chine Mali',
      path: '/services/air-freight',
    },
    sea: {
      title: isEn
        ? 'Sea Freight China to Africa | FCL & LCL via West Africa'
        : isZh ? '中国马里集装箱 | 巴马科海运 | FCL 和 LCL' : isAr ? 'حاوية من الصين إلى مالي | الشحن البحري إلى باماكو | FCL وLCL' : 'Conteneur Chine Mali | Fret Maritime Bamako | FCL & LCL',
      description: isEn
        ? 'Economical sea freight from China to West Africa, then land transit to Bamako and nearby markets. FCL and LCL options in 60-75 days.'
        : isZh ? '从佛山港到达喀尔港的经济海运，再陆路转运到巴马科。FCL 集装箱和 LCL 拼箱到马里，60-75 天。' : isAr ? 'شحن بحري اقتصادي من ميناء فوشان إلى ميناء داكار، ثم عبور بري إلى باماكو. حاوية FCL وشحن مجمّع LCL إلى مالي خلال 60-75 يومًا.' : 'Fret maritime économique du port de Foshan au port de Dakar, puis transit terrestre vers Bamako. Conteneur FCL et groupage LCL vers le Mali en 60-75 jours.',
      keywords: isEn
        ? 'sea freight China Africa, FCL shipping West Africa, LCL consolidation Mali, container shipping China Mali, sea freight Bamako'
        : isZh ? '中国马里海运, 中国马里集装箱, 马里 LCL 拼箱, 中国马里海上运输, 中国巴马科海运' : isAr ? 'الشحن البحري من الصين إلى مالي، حاوية من الصين إلى مالي، شحن مجمّع LCL إلى مالي، النقل البحري من الصين إلى مالي، الشحن البحري من الصين إلى باماكو' : 'fret maritime Chine Mali, conteneur Chine Mali, conteneur chine mali, groupage LCL Mali, transport maritime Chine Mali, fret maritime Chine Bamako',
      path: '/services/sea-freight',
    },
    sourcing: {
      title: isEn
        ? 'China Sourcing Agent for Africa | Alibaba & 1688 Procurement'
        : isZh ? '中国采购代理 | Alibaba 采购 | 供应商付款' : isAr ? 'وكيل توريد في الصين | الشراء من Alibaba | الدفع للموردين' : 'Agent Sourcing Chine | Achat Alibaba | Paiement Fournisseur',
      description: isEn
        ? 'China sourcing agent for African importers. We buy from Alibaba and 1688, verify suppliers, inspect goods, process payment, and ship through our Mali hub and West Africa routes.'
        : isZh ? '面向马里进口商的中国采购代理。Alibaba 采购、供应商核验、质量检验、付款并发往巴马科。' : isAr ? 'وكيل توريد في الصين للمستوردين الماليين. الشراء من Alibaba والتحقق من الموردين وفحص الجودة والدفع والشحن إلى باماكو.' : 'Agent sourcing en Chine pour les importateurs maliens. Achat Alibaba, vérification fournisseur, inspection qualité, paiement et expédition vers Bamako.',
      keywords: isEn
        ? 'China sourcing agent Africa, Alibaba agent Africa, China procurement services, supplier verification China, 1688 sourcing agent'
        : isZh ? '中国马里采购代理, 马里 Alibaba 代理, 中国马里采购, 中国供应商核验, 中国质量检验' : isAr ? 'وكيل توريد من الصين إلى مالي، وكيل Alibaba في مالي، التوريد من الصين إلى مالي، التحقق من الموردين في الصين، فحص الجودة في الصين' : 'agent sourcing Chine Mali, agent Alibaba Mali, approvisionnement Chine Mali, vérification fournisseur Chine, inspection qualité Chine',
      path: '/services/sourcing',
    },
  };
  
  const config = serviceConfig[service];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
    ogType: 'article',
  });
}

/**
 * Route page metadata
 */
export async function generateRouteMetadata(
  locale: Locale,
  route: 'mali'
): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  const routeConfig = {
    mali: {
      title: isEn
        ? 'Shipping from China to Mali | Freight Forwarder Bamako'
        : isZh ? '中国马里货运 | 空运与海运 | ChinaLink Express' : isAr ? 'الشحن من الصين إلى مالي | جوًا وبحرًا | ChinaLink Express' : 'Cargo Chine Mali | Fret Aérien & Maritime | ChinaLink Express',
      description: isEn
        ? 'Reliable freight forwarding from China to Mali. Air freight 14-21 days, sea freight 60-75 days, sourcing, supplier payment, and WhatsApp tracking to Bamako.'
        : isZh ? '专注中国—马里的货代。空运 14-21 天，海运集装箱 60-75 天。WhatsApp 免费报价。7 年以上经验。' : isAr ? 'وكيل شحن متخصص بين الصين ومالي. شحن جوي خلال 14-21 يومًا وحاوية بحرية خلال 60-75 يومًا. عرض سعر مجاني عبر WhatsApp. خبرة تزيد على 7 سنوات.' : 'Transitaire spécialisé Chine-Mali. Cargo aérien 14-21 jours, conteneur maritime 60-75 jours. Devis gratuit WhatsApp. 7+ ans d\'expérience.',
      keywords: isEn
        ? 'shipping from China to Mali, freight forwarder China Mali, cargo from China to Mali, China to Bamako shipping, import China Mali'
        : isZh ? '中国马里货运, 中国马里物流, 中国马里寄包裹, 巴马科货代, 中国巴马科货运, 马里物流, 中国马里进口, 中国马里集装箱, 中国巴马科发货, 巴马科空运' : isAr ? 'الشحن من الصين إلى مالي، نقل البضائع من الصين إلى مالي، إرسال طرد من الصين إلى مالي، وكيل شحن في باماكو، الشحن من الصين إلى باماكو، الخدمات اللوجستية في مالي، الاستيراد من الصين إلى مالي، حاوية من الصين إلى مالي، الشحن الجوي إلى باماكو' : 'cargo chine mali, fret chine mali, envoi colis chine mali, transitaire bamako, fret chine bamako, logistique mali, import chine mali, conteneur chine mali, expedition chine bamako, cargo aerien bamako',
      path: '/routes/china-to-mali',
    },
  };
  
  const config = routeConfig[route];
  
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    path: config.path,
    locale,
  });
}

/**
 * Calculator page metadata
 */
export async function generateCalculatorMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return generatePageMetadata({
    title: isEn
      ? 'Shipping Cost Calculator | Freight Rates China to Mali | ChinaLink Express'
      : isZh ? '运费计算器 | 中国—马里运价' : isAr ? 'حاسبة رسوم الشحن | أسعار الشحن من الصين إلى مالي' : 'Calculateur de Frais d\'Expédition | Tarifs Fret Chine-Mali',
    description: isEn
      ? 'Calculate your shipping costs from China to Mali instantly. Air freight & sea freight rates to Bamako via our partner network. Get an accurate estimate in seconds!'
      : isZh ? '立即计算从中国到马里的运费。通过我们的伙伴网络查看到巴马科的空运和海运价格。准确估算！' : isAr ? 'احسب رسوم الشحن من الصين إلى مالي فورًا. أسعار الشحن الجوي والبحري إلى باماكو عبر شبكة شركائنا. تقدير دقيق!' : 'Calculez vos frais d\'expédition de la Chine vers le Mali instantanément. Tarifs fret aérien et maritime vers Bamako via notre réseau de partenaires. Estimation précise!',
    keywords: isEn
      ? 'shipping calculator, freight rates China Mali, shipping cost estimator, air freight calculator, sea freight calculator, calculateur fret'
      : isZh ? '运费计算器, 中国马里运价, 运输成本估算, 空运计算器, 运价模拟' : isAr ? 'حاسبة رسوم الشحن، أسعار الشحن من الصين إلى مالي، مقدّر كلفة النقل، حاسبة الشحن الجوي، محاكي أسعار الشحن' : 'calculateur frais expédition, tarifs fret Chine Mali, estimateur coût transport, calculateur fret aérien, simulateur prix fret',
    path: '/calculateur',
    locale,
  });
}

/**
 * Contact page metadata
 */
export async function generateContactMetadata(locale: Locale): Promise<Metadata> {
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return generatePageMetadata({
    title: isEn
      ? 'Contact ChinaLink Express | Freight Quote | China to Mali Shipping'
      : isZh ? '联系 ChinaLink Express | 货运报价 | 中国—马里发货' : isAr ? 'تواصل مع ChinaLink Express | عرض سعر الشحن | الشحن من الصين إلى مالي' : 'Contact ChinaLink Express | Devis Fret | Expédition Chine-Mali',
    description: isEn
      ? 'Contact ChinaLink Express for a free freight quote. WhatsApp: +86 188 5172 5957. Air & sea shipping from China to Bamako, Mali via trusted partners. 24/7 support!'
      : isZh ? '联系 ChinaLink Express 获取免费运费报价。WhatsApp：+86 188 5172 5957。通过值得信赖的伙伴从中国空运和海运到马里巴马科。全天候支持！' : isAr ? 'تواصل مع ChinaLink Express للحصول على عرض سعر مجاني للشحن. WhatsApp: ‎+86 188 5172 5957. شحن جوي وبحري من الصين إلى باماكو في مالي عبر شركاء موثوقين. دعم على مدار الساعة!' : 'Contactez ChinaLink Express pour un devis fret gratuit. WhatsApp: +86 188 5172 5957. Fret aérien et maritime de la Chine vers Bamako, Mali via des partenaires de confiance. Support 24/7!',
    keywords: isEn
      ? 'contact freight forwarder, shipping quote China Mali, ChinaLink Express contact, freight inquiry, devis expédition'
      : isZh ? '联系货代, 中国马里运费报价, ChinaLink Express 联系方式, 发货咨询, 物流报价' : isAr ? 'التواصل مع وكيل شحن، عرض سعر الشحن من الصين إلى مالي، الاتصال بـChinaLink Express، طلب شحن، عرض سعر لوجستي' : 'contact transitaire, devis fret Chine Mali, ChinaLink Express contact, demande expédition, devis logistique',
    path: '/contact',
    locale,
  });
}

// ============================================================================
// JSON-LD Structured Data Helpers
// ============================================================================

/**
 * Safely serialize structured data to JSON-LD
 */
export function serializeStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

/**
 * Generate combined structured data for a page
 */
export function generatePageStructuredData(
  schemas: Record<string, unknown>[],
  options: { pretty?: boolean } = {}
): string {
  const { pretty = false } = options;
  
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0], null, pretty ? 2 : 0);
  }
  
  // Multiple schemas as @graph
  const graphData = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
  
  return JSON.stringify(graphData, null, pretty ? 2 : 0);
}
