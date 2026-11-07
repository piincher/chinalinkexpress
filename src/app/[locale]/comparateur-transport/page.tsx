/**
 * Shipping Cost Comparison Page
 *
 * Interactive comparison tool showing ChinaLink Express rates
 * side-by-side with competitors (DHL, Aramex).
 *
 * SEO Targets:
 * - Primary: comparer fret chine afrique, dhl vs transitaire chine
 * - Secondary: shipping cost comparison china africa, fret aerien vs maritime cout
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { FAQStructuredData, StructuredData } from '@/components/seo';
import { ComparisonPage } from '@/features/shipping-comparison/ComparisonPage';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Shipping Cost Comparison China to Africa | DHL vs ChinaLink | Free Quote'
      : isZh ? '中国—非洲运费比较 | DHL 与 ChinaLink | 免费报价' : isAr ? 'مقارنة الشحن من الصين إلى أفريقيا | DHL مقابل ChinaLink | عرض سعر مجاني' : 'Comparateur de Fret Chine-Afrique | DHL vs ChinaLink | Devis Gratuit',
    description: isEn
      ? 'Compare shipping costs from China to West Africa. ChinaLink Sea ($3-5/kg, 60-75 days) vs Air ($8-15/kg, 14-21 days) vs DHL ($25-45/kg). See how much you save. Instant comparison for Mali, Senegal, Ivory Coast, Ghana, Nigeria.'
      : isZh ? '比较从中国到西非的运输成本。ChinaLink 海运（3-5 美元/公斤，60-75 天）、空运（8-15 美元/公斤，14-21 天）与 DHL（25-45 美元/公斤）。了解您能节省多少，立即比较。' : isAr ? 'قارن تكاليف الشحن من الصين إلى غرب أفريقيا. ChinaLink البحري (3-5 دولارات/كغ، 60-75 يومًا) مقابل الجوي (8-15 دولارًا/كغ، 14-21 يومًا) مقابل DHL (25-45 دولارًا/كغ). اكتشف ما توفره. مقارنة فورية.' : 'Comparez les coûts d\'expédition de la Chine vers l\'Afrique de l\'Ouest. ChinaLink Maritime (3-5$/kg, 60-75 jours) vs Aérien (8-15$/kg, 14-21 jours) vs DHL (25-45$/kg). Découvrez vos économies. Comparaison instantanée.',
    keywords: isEn
      ? 'shipping cost comparison china africa, compare freight rates china to africa, DHL vs freight forwarder china, cheap shipping china west africa, air freight vs sea freight cost, cargo rates china mali, compare DHL Aramex ChinaLink, shipping calculator china africa, freight quote comparison, west africa freight quote'
      : isZh ? '比较中国非洲运费, 中国非洲运输比较, DHL 与中国货代, 空运海运成本, 中国马里货运价格, 中国发货价格比较, ChinaLink 与 DHL 价格, 中国非洲运费报价, 便宜的中国非洲运输, 货代比较' : isAr ? 'مقارنة الشحن من الصين إلى أفريقيا، مقارنة النقل، DHL مقابل وكيل شحن صيني، كلفة الشحن الجوي والبحري، أسعار الشحن من الصين إلى مالي، مقارنة أسعار الشحن من الصين، ChinaLink مقابل DHL، عرض سعر الشحن إلى أفريقيا، شحن رخيص من الصين إلى أفريقيا، مقارنة وكلاء الشحن' : 'comparer fret chine afrique, comparateur transport chine afrique, dhl vs transitaire chine, fret aerien vs maritime cout, tarifs cargo chine mali, comparateur prix expedition chine, chinalink vs dhl prix, devis fret chine afrique, transport chine afrique pas cher, comparateur transitaire',
    path: '/comparateur-transport',
    locale: locale as Locale,
    ogType: 'website',
  });
}

// ============================================================================
// FAQ Data
// ============================================================================

const getFaqs = (isEn: boolean, isZh: boolean, isAr: boolean) => [
  {
    question: isEn
      ? 'Why is ChinaLink cheaper than DHL for shipping to Africa?'
      : isZh ? '为什么发往非洲时 ChinaLink 比 DHL 便宜？' : isAr ? 'لماذا ChinaLink أرخص من DHL للشحن إلى أفريقيا؟' : 'Pourquoi ChinaLink est-il moins cher que DHL pour expédier vers l\'Afrique ?',
    answer: isEn
      ? 'ChinaLink specializes in China-to-Africa logistics with consolidation warehouses in Yiwu, bulk shipping contracts, and local partner networks. DHL charges premium express rates for global coverage. For non-urgent shipments, ChinaLink saves 50-80% while still providing reliable delivery and WhatsApp tracking.'
      : isZh ? 'ChinaLink 专注于中国—非洲物流，拥有义乌集运仓库、批量运输合同和本地合作伙伴网络。DHL 则为全球覆盖收取高价快递费。对于非紧急货物，ChinaLink 可节省 50-80%，同时通过 WhatsApp 跟踪确保可靠交付。' : isAr ? 'تتخصص ChinaLink في الخدمات اللوجستية بين الصين وأفريقيا، مع مستودعات تجميع في ييوو وعقود شحن بالجملة وشبكات شركاء محليين. أما DHL فتفرض أسعارًا سريعة مرتفعة مقابل تغطية عالمية. للشحنات غير العاجلة، توفر ChinaLink من 50 إلى 80% مع تسليم موثوق ومتابعة عبر WhatsApp.' : 'ChinaLink se spécialise dans la logistique Chine-Afrique avec des entrepôts de consolidation à Yiwu, des contrats de fret en vrac et des réseaux de partenaires locaux. DHL facture des tarifs express premium pour une couverture mondiale. Pour les envois non urgents, ChinaLink économise 50-80% tout en assurant une livraison fiable avec suivi WhatsApp.',
  },
  {
    question: isEn
      ? 'How accurate is this shipping cost comparison?'
      : isZh ? '这个价格比较有多准确？' : isAr ? 'ما مدى دقة هذه المقارنة بين الأسعار؟' : 'À quel point cette comparaison de tarifs est-elle précise ?',
    answer: isEn
      ? 'Our rates are based on real 2026 pricing for West African destinations. Prices include customs clearance and door-to-door delivery for ChinaLink services. Final quotes may vary slightly based on product category, packaging, and seasonal demand. Contact us on WhatsApp for a confirmed quote.'
      : isZh ? '我们的价格基于 2026 年西非目的地的实际价格。ChinaLink 服务的价格包含清关和门到门交付。最终报价可能因产品类别、包装和季节性需求略有不同。请通过 WhatsApp 联系我们获取确认报价。' : isAr ? 'تستند أسعارنا إلى الأسعار الفعلية لعام 2026 لوجهات غرب أفريقيا. وتشمل أسعار خدمات ChinaLink التخليص الجمركي والتسليم من الباب إلى الباب. قد تختلف العروض النهائية قليلًا حسب فئة المنتج والتغليف والطلب الموسمي. تواصل معنا عبر WhatsApp للحصول على عرض سعر مؤكد.' : 'Nos tarifs sont basés sur les prix réels de 2026 pour les destinations d\'Afrique de l\'Ouest. Les prix incluent le dédouanement et la livraison porte-à-porte pour les services ChinaLink. Les devis finaux peuvent légèrement varier selon la catégorie de produit, l\'emballage et la demande saisonnière. Contactez-nous sur WhatsApp pour un devis confirmé.',
  },
  {
    question: isEn
      ? 'Should I choose sea freight or air freight from China?'
      : isZh ? '从中国发货应该选海运还是空运？' : isAr ? 'هل أختار الشحن البحري أم الجوي من الصين؟' : 'Dois-je choisir le fret maritime ou aérien depuis la Chine ?',
    answer: isEn
      ? 'Choose sea freight for large, heavy, or non-urgent shipments (60-75 days, $3-5/kg). It\'s ideal for containers, furniture, machinery, and bulk goods. Choose air freight for urgent, lightweight, or high-value items (14-21 days, $8-15/kg). Electronics, samples, and seasonal fashion items are perfect for air cargo.'
      : isZh ? '体积大、重量大或不紧急的货物选择海运（60-75 天，3-5 美元/公斤），适合集装箱、家具、机器和散货。紧急、轻便或贵重的货物选择空运（14-21 天，8-15 美元/公斤）。电子产品、样品和季节性时尚商品非常适合空运。' : isAr ? 'اختر الشحن البحري للشحنات الكبيرة أو الثقيلة أو غير العاجلة (60-75 يومًا، 3-5 دولارات/كغ)، وهو مثالي للحاويات والأثاث والآلات والبضائع السائبة. واختر الشحن الجوي للبضائع العاجلة أو الخفيفة أو الثمينة (14-21 يومًا، 8-15 دولارًا/كغ). الإلكترونيات والعينات والأزياء الموسمية مناسبة تمامًا للشحن الجوي.' : 'Choisissez le fret maritime pour les envois volumineux, lourds ou non urgents (60-75 jours, 3-5$/kg). Idéal pour les conteneurs, meubles, machines et marchandises en vrac. Choisissez le fret aérien pour les articles urgents, légers ou de valeur (14-21 jours, 8-15$/kg). L\'électronique, les échantillons et les articles de mode saisonniers sont parfaits pour le cargo aérien.',
  },
  {
    question: isEn
      ? 'Does ChinaLink include customs clearance in the price?'
      : isZh ? 'ChinaLink 的价格包含清关吗？' : isAr ? 'هل يشمل سعر ChinaLink التخليص الجمركي؟' : 'ChinaLink inclut-il le dédouanement dans le prix ?',
    answer: isEn
      ? 'Yes. Both our sea and air freight quotes include customs clearance at destination. We handle all documentation, duties, and border processing. You only pay the shipping cost quoted — no hidden fees. This is a major advantage over DHL and Aramex where customs charges are often billed separately.'
      : isZh ? '包含。我们的海运和空运报价都包含目的地清关。我们负责所有文件、关税和边境手续。您只需支付标明的运费，没有隐藏费用。这是相比 DHL 和 Aramex 的一大优势，后者的海关费用通常单独收取。' : isAr ? 'نعم. تشمل عروض أسعار الشحن البحري والجوي التخليص الجمركي في بلد الوصول. نتولى جميع المستندات والرسوم الجمركية وإجراءات الحدود. تدفع فقط كلفة الشحن المذكورة، بلا رسوم خفية. وهذه ميزة كبيرة مقارنة بـDHL وAramex حيث تُحتسب الرسوم الجمركية غالبًا بشكل منفصل.' : 'Oui. Nos devis de fret maritime et aérien incluent le dédouanement à destination. Nous gérons tous les documents, droits de douane et formalités frontalières. Vous ne payez que le coût d\'expédition indiqué — pas de frais cachés. C\'est un avantage majeur par rapport à DHL et Aramex où les frais de douane sont souvent facturés séparément.',
  },
  {
    question: isEn
      ? 'How do I get a confirmed quote after using the comparison tool?'
      : isZh ? '使用比较工具后如何获得确认报价？' : isAr ? 'كيف أحصل على عرض سعر مؤكد بعد استخدام أداة المقارنة؟' : 'Comment obtenir un devis confirmé après avoir utilisé l\'outil de comparaison ?',
    answer: isEn
      ? 'Click the WhatsApp button on the results page and send us your shipment details (weight, destination, product type). Our team in China and Mali will reply within minutes with a confirmed quote, pickup instructions, and estimated delivery date. No account needed — just message us on WhatsApp.'
      : isZh ? '点击结果页面上的 WhatsApp 按钮，把货物详情（重量、目的地、产品类型）发给我们。我们在中国和马里的团队会在几分钟内回复确认报价、提货说明和预计交付日期。无需注册账户，只需在 WhatsApp 上给我们发消息。' : isAr ? 'اضغط على زر WhatsApp في صفحة النتائج وأرسل إلينا تفاصيل شحنتك (الوزن والوجهة ونوع المنتج). سيرد فريقنا في الصين ومالي خلال دقائق بعرض سعر مؤكد وتعليمات الاستلام وموعد التسليم المتوقع. لا حاجة إلى حساب، فقط أرسل إلينا رسالة عبر WhatsApp.' : 'Cliquez sur le bouton WhatsApp sur la page de résultats et envoyez-nous les détails de votre envoi (poids, destination, type de produit). Notre équipe en Chine et au Mali répondra en quelques minutes avec un devis confirmé, les instructions d\'enlèvement et la date de livraison estimée. Pas de compte nécessaire — envoyez-nous simplement un message sur WhatsApp.',
  },
];

// ============================================================================
// Breadcrumb Schema
// ============================================================================

function getBreadcrumbs(isEn: boolean, isZh: boolean, isAr: boolean, locale: string) {
  return [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Tools' : isZh ? '工具' : isAr ? 'الأدوات' : 'Outils', url: `/${locale}/calculateur` },
    { name: isEn ? 'Shipping Comparison' : isZh ? '运输比较工具' : isAr ? 'أداة مقارنة النقل' : 'Comparateur Transport', url: `/${locale}/comparateur-transport` },
  ];
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ComparisonPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const faqs = getFaqs(isEn, isZh, isAr);
  const breadcrumbs = getBreadcrumbs(isEn, isZh, isAr, locale);

  return (
    <>
      {/* Structured Data */}
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={breadcrumbs}
        locale={locale as Locale}
      />

      {/* Page Content */}
      <ComparisonPage locale={locale} />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
