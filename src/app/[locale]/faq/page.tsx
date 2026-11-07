import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { PAGE_SEO } from '@/config/seo';
import { generateFAQPageSchema, generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PageHero } from '@/components/site';

interface Props {
  params: Promise<{ locale: string }>;
}

const faqsFr = [
  {
    question: 'Combien de temps prend une expédition de Chine vers le Mali ?',
    answer: 'Le fret aérien prend généralement 14 à 21 jours vers Bamako. Le fret maritime prend généralement 60 à 75 jours via un port d\u2019Afrique de l\u2019Ouest puis transport terrestre.',
  },
  {
    question: 'ChinaLink peut-il acheter auprès d\u2019un fournisseur chinois pour moi ?',
    answer: 'Oui. Nous pouvons gérer le sourcing, l\u2019achat, la négociation, le paiement fournisseur, la vérification et la consolidation avant expédition.',
  },
  {
    question: 'Comment payer un fournisseur chinois depuis le Mali ?',
    answer: 'Vous pouvez passer par ChinaLink pour faciliter le paiement via les canaux utilisés en Chine, selon le fournisseur et le niveau de vérification nécessaire.',
  },
  {
    question: 'Quels produits sont interdits ou sensibles ?',
    answer: 'Les batteries, liquides, produits dangereux, drones, armes, produits inflammables et certaines marchandises réglementées nécessitent une validation préalable ou sont interdits selon le mode de transport.',
  },
  {
    question: 'Le dédouanement au Mali est-il inclus ?',
    answer: 'L\u2019accompagnement au dédouanement standard est inclus dans les offres courantes, mais certains produits peuvent demander des documents, frais ou procédures supplémentaires.',
  },
  {
    question: 'Puis-je suivre mes colis ?',
    answer: 'Oui. ChinaLink communique les étapes importantes et peut partager des mises à jour WhatsApp, photos et informations de suivi selon le service choisi.',
  },
  {
    question: 'Quel est le délai d\u2019expédition cargo Chine Mali ?',
    answer: 'Le fret aérien prend 14 à 21 jours de la Chine vers Bamako. Le fret maritime prend 60 à 75 jours via les ports d\u2019Afrique de l\u2019Ouest. Le délai exact dépend du mode choisi, de la saison et des procédures douanières.',
  },
  {
    question: 'Combien coûte un conteneur de la Chine vers le Mali ?',
    answer: 'Un conteneur 20ft coûte entre 2 000 et 3 500 USD, et un 40ft entre 3 500 et 5 500 USD selon la saison, le port de départ et les frais de destination. Contactez-nous pour un devis précis.',
  },
  {
    question: 'Comment acheter sur Alibaba depuis le Mali ?',
    answer: 'Créez un compte Alibaba, choisissez vos produits, puis contactez ChinaLink pour la vérification du fournisseur, le paiement sécurisé et l\u2019expédition vers Bamako. Nous gérons toute la chaîne pour vous.',
  },
  {
    question: 'Quels documents faut-il pour importer au Mali ?',
    answer: 'Il faut une facture commerciale, un connaissement (BL), un certificat d\u2019origine, une déclaration en douane DGD, et parfois un certificat de conformité. Notre équipe vous aide à préparer les documents.',
  },
  {
    question: 'Puis-je suivre mon cargo en temps réel ?',
    answer: 'Oui. Nous fournissons un numéro de suivi pour tous les envois et partageons des mises à jour WhatsApp avec photos à chaque étape : entrepôt, emballage, douane et livraison.',
  },
  {
    question: 'Quels produits sont interdits à l\u2019importation au Mali ?',
    answer: 'Les armes, stupéfiants, produits contrefaits, matériels pornographiques et produits chimiques dangereux sans permis sont interdits. Contactez-nous pour vérifier si votre produit est autorisé.',
  },
  {
    question: 'Quelle est la différence entre FCL et LCL ?',
    answer: 'FCL (Full Container Load) = vous louez un conteneur entier. LCL (Less than Container Load) = votre marchandise partage un conteneur avec d\u2019autres clients. Le LCL est idéal pour les petits volumes.',
  },
  {
    question: 'Livrez-vous à domicile à Bamako ?',
    answer: 'Oui, nous proposons la livraison porte à porte à Bamako et dans d\u2019autres villes du Mali selon la destination finale et le mode de transport choisi.',
  },
  {
    question: 'Combien de temps puis-je laisser ma marchandise dans votre entrepôt à Bamako ?',
    answer: 'Votre marchandise vous est réservée gratuitement pendant 72 heures à compter de son arrivée dans notre entrepôt de Bamako, et nous vous prévenons dès qu’elle est disponible. Passé ce délai, des frais de stockage de 3 000 FCFA par jour et par expédition sont appliqués, afin de préserver la capacité de l’entrepôt pour l’ensemble de nos clients. Si vous ne pouvez pas venir dans les temps, contactez-nous avant l’échéance : nous trouverons une solution ensemble.',
  },
  {
    question: 'Comment éviter les arnaques sur Alibaba ?',
    answer: 'Vérifiez l\u2019identité du fournisseur, demandez des preuves réelles, évitez les prix trop bas, utilisez un paiement traçable et faites appel à ChinaLink pour la vérification et le paiement sécurisé.',
  },
  {
    question: 'Pouvez-vous payer mon fournisseur chinois ?',
    answer: 'Oui. Nous facilitons le paiement de fournisseurs en Chine via Alipay ou virement bancaire, avec preuve de paiement et suivi de la commande.',
  },
  {
    question: 'Expédiez-vous vers d\u2019autres pays d\u2019Afrique ?',
    answer: 'Nous livrons à deux destinations : Bamako (Mali) et Kampala (Ouganda).',
  },
  {
    question: 'Faites-vous l\u2019inspection qualité en Chine ?',
    answer: 'Oui, nous inspectons vos produits avant expédition et vous envoyons des photos. Cela évite les mauvaises surprises à l\u2019arrivée au Mali.',
  },
];

const faqsZh = [
  {
    question: '从中国发货到马里需要多长时间？',
    answer: '空运到巴马科通常需要 14 到 21 天。海运通常需要 60 到 75 天，经西非港口后再陆路运输。',
  },
  {
    question: 'ChinaLink 可以替我向中国供应商采购吗？',
    answer: '可以。我们可以负责采购、购买、议价、供应商付款、核验以及发货前的集运。',
  },
  {
    question: '如何从马里向中国供应商付款？',
    answer: '您可以通过 ChinaLink，使用中国常用的渠道协助付款，具体取决于供应商和所需的核验程度。',
  },
  {
    question: '哪些产品被禁止或属于敏感产品？',
    answer: '电池、液体、危险品、无人机、武器、易燃产品和某些受管制货物需要事先确认，或根据运输方式被禁止。',
  },
  {
    question: '马里清关包含在内吗？',
    answer: '常规服务包含标准清关协助，但某些产品可能需要额外的文件、费用或手续。',
  },
  {
    question: '我可以跟踪我的包裹吗？',
    answer: '可以。ChinaLink 会通知重要阶段，并可根据所选服务分享 WhatsApp 更新、照片和跟踪信息。',
  },
  {
    question: '中国到马里的货运时效是多少？',
    answer: '从中国到巴马科空运需要 14 到 21 天。海运经西非港口需要 60 到 75 天。具体时效取决于所选方式、季节和海关手续。',
  },
  {
    question: '从中国到马里的集装箱多少钱？',
    answer: '20 尺集装箱费用在 2 000 到 3 500 美元之间，40 尺在 3 500 到 5 500 美元之间，取决于季节、始发港和目的地费用。请联系我们获取准确报价。',
  },
  {
    question: '如何从马里在 Alibaba 购买？',
    answer: '创建 Alibaba 账户，选择产品，然后联系 ChinaLink 进行供应商核验、安全付款并发往巴马科。我们为您管理整个流程。',
  },
  {
    question: '进口到马里需要哪些文件？',
    answer: '需要商业发票、提单（BL）、原产地证书、DGD 海关申报单，有时还需要合格证书。我们的团队会帮您准备文件。',
  },
  {
    question: '我可以实时跟踪我的货物吗？',
    answer: '可以。我们为所有货物提供跟踪号，并在每个阶段通过 WhatsApp 分享带照片的更新：仓库、包装、海关和交付。',
  },
  {
    question: '哪些产品禁止进口到马里？',
    answer: '武器、毒品、假冒产品、色情材料和无许可证的危险化学品被禁止。请联系我们核实您的产品是否允许。',
  },
  {
    question: 'FCL 和 LCL 有什么区别？',
    answer: 'FCL（整箱）= 您租用整个集装箱。LCL（拼箱）= 您的货物与其他客户共用一个集装箱。LCL 非常适合小批量货物。',
  },
  {
    question: '你们送货上门到巴马科吗？',
    answer: '是的，根据最终目的地和所选运输方式，我们提供巴马科及马里其他城市的门到门交付。',
  },
  {
    question: '我的货物可以在你们巴马科的仓库存放多久？',
    answer: '自货物到达我们巴马科仓库起，免费为您保留 72 小时，货物可取时我们会立即通知您。超过此期限，每票货物每天收取 3 000 西非法郎的仓储费，以便为所有客户保留仓库容量。如果您无法按时前来，请在到期前联系我们，我们会一起找到解决办法。',
  },
  {
    question: '如何避免 Alibaba 上的诈骗？',
    answer: '核验供应商身份，索取真实证明，避开过低的价格，使用可追溯的付款方式，并请 ChinaLink 进行核验和安全付款。',
  },
  {
    question: '你们可以向我的中国供应商付款吗？',
    answer: '可以。我们通过支付宝或银行转账协助向中国供应商付款，并提供付款凭证和订单跟踪。',
  },
  {
    question: '你们发货到其他非洲国家吗？',
    answer: '我们送达两个目的地：巴马科（马里）和坎帕拉（乌干达）。',
  },
  {
    question: '你们在中国做质量检验吗？',
    answer: '是的，我们在发货前检查您的产品并发送照片。这可以避免货物到达马里时出现意外。',
  },
];

const faqsAr = [
  {
    question: 'كم يستغرق الشحن من الصين إلى مالي؟',
    answer: 'يستغرق الشحن الجوي عادة من 14 إلى 21 يومًا إلى باماكو. ويستغرق البحري عادة من 60 إلى 75 يومًا عبر ميناء في غرب أفريقيا ثم نقلًا بريًا.',
  },
  {
    question: 'هل يمكن لـChinaLink الشراء من مورد صيني نيابة عني؟',
    answer: 'نعم. يمكننا تولي التوريد والشراء والتفاوض والدفع للمورد والتحقق والتجميع قبل الشحن.',
  },
  {
    question: 'كيف أدفع لمورد صيني من مالي؟',
    answer: 'يمكنك المرور عبر ChinaLink لتسهيل الدفع بالقنوات المستخدمة في الصين، حسب المورد ومستوى التحقق اللازم.',
  },
  {
    question: 'ما المنتجات المحظورة أو الحساسة؟',
    answer: 'تتطلب البطاريات والسوائل والمواد الخطرة والطائرات المسيّرة والأسلحة والمنتجات القابلة للاشتعال وبعض البضائع المنظمة موافقة مسبقة، أو تكون محظورة حسب طريقة النقل.',
  },
  {
    question: 'هل التخليص الجمركي في مالي مشمول؟',
    answer: 'المساعدة في التخليص الجمركي القياسي مشمولة في العروض المعتادة، لكن بعض المنتجات قد تتطلب مستندات أو رسومًا أو إجراءات إضافية.',
  },
  {
    question: 'هل يمكنني متابعة طرودي؟',
    answer: 'نعم. تبلّغك ChinaLink بالمراحل المهمة ويمكنها مشاركة تحديثات WhatsApp والصور ومعلومات التتبع حسب الخدمة المختارة.',
  },
  {
    question: 'ما مدة الشحن من الصين إلى مالي؟',
    answer: 'يستغرق الشحن الجوي من 14 إلى 21 يومًا من الصين إلى باماكو. ويستغرق البحري من 60 إلى 75 يومًا عبر موانئ غرب أفريقيا. وتعتمد المدة الدقيقة على الطريقة المختارة والموسم والإجراءات الجمركية.',
  },
  {
    question: 'كم تكلف حاوية من الصين إلى مالي؟',
    answer: 'تتراوح كلفة الحاوية 20 قدمًا بين 2 000 و3 500 دولار، و40 قدمًا بين 3 500 و5 500 دولار حسب الموسم وميناء المغادرة ورسوم الوجهة. تواصل معنا للحصول على عرض سعر دقيق.',
  },
  {
    question: 'كيف أشتري من Alibaba من مالي؟',
    answer: 'أنشئ حسابًا في Alibaba، واختر منتجاتك، ثم تواصل مع ChinaLink للتحقق من المورد والدفع الآمن والشحن إلى باماكو. نتولى السلسلة كلها نيابة عنك.',
  },
  {
    question: 'ما المستندات اللازمة للاستيراد إلى مالي؟',
    answer: 'يلزم فاتورة تجارية وبوليصة شحن (BL) وشهادة منشأ وتصريح جمركي DGD، وأحيانًا شهادة مطابقة. ويساعدك فريقنا في تجهيز المستندات.',
  },
  {
    question: 'هل يمكنني متابعة شحنتي في الوقت الفعلي؟',
    answer: 'نعم. نوفر رقم تتبع لكل الشحنات ونشارك تحديثات WhatsApp مع صور في كل مرحلة: المستودع والتغليف والجمارك والتسليم.',
  },
  {
    question: 'ما المنتجات المحظور استيرادها إلى مالي؟',
    answer: 'الأسلحة والمخدرات والمنتجات المقلدة والمواد الإباحية والمواد الكيميائية الخطرة دون تصريح محظورة. تواصل معنا للتحقق مما إذا كان منتجك مسموحًا.',
  },
  {
    question: 'ما الفرق بين FCL وLCL؟',
    answer: 'FCL (حاوية كاملة) = تستأجر حاوية كاملة. LCL (أقل من حاوية) = تشارك بضاعتك حاوية مع عملاء آخرين. وLCL مثالي للكميات الصغيرة.',
  },
  {
    question: 'هل تسلمون إلى المنازل في باماكو؟',
    answer: 'نعم، نقدم التسليم من الباب إلى الباب في باماكو ومدن أخرى في مالي حسب الوجهة النهائية وطريقة النقل المختارة.',
  },
  {
    question: 'كم من الوقت يمكنني ترك بضاعتي في مستودعكم في باماكو؟',
    answer: 'تُحجز بضاعتك لك مجانًا لمدة 72 ساعة من وصولها إلى مستودعنا في باماكو، ونبلغك فور توفرها. وبعد هذه المدة تُطبق رسوم تخزين قدرها 3 000 فرنك CFA يوميًا لكل شحنة، للحفاظ على سعة المستودع لجميع عملائنا. إذا لم تتمكن من الحضور في الموعد، تواصل معنا قبل انتهاء المهلة وسنجد حلًا معًا.',
  },
  {
    question: 'كيف أتجنب الاحتيال في Alibaba؟',
    answer: 'تحقق من هوية المورد، واطلب أدلة حقيقية، وتجنب الأسعار المنخفضة جدًا، واستخدم دفعًا قابلًا للتتبع، واستعن بـChinaLink للتحقق والدفع الآمن.',
  },
  {
    question: 'هل يمكنكم الدفع لموردي الصيني؟',
    answer: 'نعم. نسهل الدفع للموردين في الصين عبر Alipay أو التحويل المصرفي، مع إثبات الدفع ومتابعة الطلب.',
  },
  {
    question: 'هل تشحنون إلى دول أفريقية أخرى؟',
    answer: 'نوصل إلى وجهتين: باماكو (مالي) وكمبالا (أوغندا).',
  },
  {
    question: 'هل تجرون فحص الجودة في الصين؟',
    answer: 'نعم، نفحص منتجاتك قبل الشحن ونرسل إليك صورًا. وهذا يجنبك المفاجآت السيئة عند الوصول إلى مالي.',
  },
];

const faqsEn = [
  {
    question: 'How long does shipping from China to Mali take?',
    answer: 'Air freight usually takes 14 to 21 days to Bamako. Sea freight usually takes 60 to 75 days through a West African port followed by inland transport.',
  },
  {
    question: 'Can ChinaLink buy from a Chinese supplier for me?',
    answer: 'Yes. We can manage sourcing, purchasing, negotiation, supplier payment, verification and consolidation before shipping.',
  },
  {
    question: 'How can I pay a Chinese supplier from Africa?',
    answer: 'You can use ChinaLink to facilitate payment through China-side channels, depending on the supplier and the verification level required.',
  },
  {
    question: 'Which products are prohibited or sensitive?',
    answer: 'Batteries, liquids, dangerous goods, drones, weapons, flammable products and some regulated goods need validation before shipping or may be prohibited by mode.',
  },
  {
    question: 'Is customs coordination in Mali included?',
    answer: 'Standard customs coordination is included in current offers, but some products may require additional documents, fees or procedures.',
  },
  {
    question: 'Can I track my parcels?',
    answer: 'Yes. ChinaLink shares key milestones and can provide WhatsApp updates, photos and tracking information depending on the selected service.',
  },
  {
    question: 'What is the China to Mali cargo timeline?',
    answer: 'Air freight takes 14 to 21 days from China to Bamako. Sea freight takes 60 to 75 days through West African ports. Exact timing depends on mode, season and customs procedures.',
  },
  {
    question: 'How much does a container from China to Mali cost?',
    answer: 'A 20ft container often ranges from 2,000 to 3,500 USD, and a 40ft from 3,500 to 5,500 USD depending on season, departure port and destination charges. Contact us for a precise quote.',
  },
  {
    question: 'How do I buy on Alibaba from Mali or West Africa?',
    answer: 'Create an Alibaba account, choose your products, then contact ChinaLink for supplier verification, secure payment and shipping coordination. We can manage the full chain for you.',
  },
  {
    question: 'Which documents are needed for importing to Mali?',
    answer: 'You usually need a commercial invoice, bill of lading, certificate of origin, customs declaration and sometimes a certificate of conformity. Our team helps prepare the documents.',
  },
  {
    question: 'Can I track my cargo in real time?',
    answer: 'Yes. We provide tracking references where available and WhatsApp updates with photos at key stages such as warehouse receiving, packing, customs and delivery.',
  },
  {
    question: 'Which products are prohibited for Mali imports?',
    answer: 'Weapons, narcotics, counterfeit products, pornographic material and dangerous chemicals without authorization are prohibited. Contact us to verify your product category.',
  },
  {
    question: 'What is the difference between FCL and LCL?',
    answer: 'FCL means Full Container Load: you use the whole container. LCL means Less than Container Load: your goods share container space with other shipments. LCL is useful for smaller volumes.',
  },
  {
    question: 'Do you deliver to homes or businesses in Bamako?',
    answer: 'Yes, we offer door-to-door support in Bamako and other Malian cities depending on the final destination and transport mode.',
  },
  {
    question: 'How long can I leave my goods in your Bamako warehouse?',
    answer: 'Your goods are held free of charge for 72 hours from the moment they arrive at our Bamako warehouse, and we notify you as soon as they are ready for collection. After that, a storage fee of 3,000 FCFA per day, per shipment applies, so warehouse capacity stays available for every client. If you cannot collect in time, contact us before the deadline and we will arrange something with you.',
  },
  {
    question: 'How do I avoid Alibaba scams?',
    answer: 'Verify supplier identity, request real proof, avoid prices that look too low, use traceable payment and involve ChinaLink for supplier verification and secure payment support.',
  },
  {
    question: 'Can you pay my Chinese supplier?',
    answer: 'Yes. We can facilitate payment to Chinese suppliers through Alipay or bank transfer, with proof of payment and order follow-up.',
  },
  {
    question: 'Do you ship to other African countries?',
    answer: 'We deliver to two destinations: Bamako (Mali) and Kampala (Uganda).',
  },
  {
    question: 'Do you inspect product quality in China?',
    answer: 'Yes. We inspect products before shipping and send photos so importers can avoid surprises before goods leave China.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const pageFaqs = isEn ? faqsEn : isZh ? faqsZh : isAr ? faqsAr : faqsFr;
  const seo = PAGE_SEO.faq[locale as Locale];

  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/faq',
    locale: locale as Locale,
  });
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const pageFaqs = isEn ? faqsEn : isZh ? faqsZh : isAr ? faqsAr : faqsFr;

  const breadcrumbItems = [
    { label: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', href: `/${locale}/` },
    { label: 'FAQ' },
  ];

  return (
    <>
      <StructuredData schemas={[generateFAQPageSchema(pageFaqs, locale as Locale)]} />
      <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
        <PageHero
          eyebrow={isEn ? 'China to Africa FAQ' : isZh ? '中国—马里常见问题' : isAr ? 'الأسئلة الشائعة: الصين-مالي' : 'FAQ Chine-Mali'}
          title={isEn ? 'Frequently Asked Questions — China to Africa Cargo' : isZh ? '常见问题 — 中国马里货运' : isAr ? 'الأسئلة الشائعة — الشحن من الصين إلى مالي' : 'Questions Fréquentes — Cargo Chine Mali'}
          lede={isEn
            ? 'Essential answers before sourcing, paying suppliers or shipping goods from China to Mali, West Africa and beyond.'
            : isZh ? '在采购、向供应商付款或把货物从中国运到巴马科之前需要了解的关键答案。关于中国马里货运的一切。' : isAr ? 'الإجابات الأساسية قبل التوريد أو الدفع لمورد أو شحن بضائعك من الصين إلى باماكو. كل ما يتعلق بالشحن من الصين إلى مالي.' : 'Les réponses essentielles avant de sourcer, payer un fournisseur ou expédier vos marchandises de Chine vers Bamako. Tout sur le cargo Chine Mali.'}
        />
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} locale={locale as Locale} />
          </div>
          <div className="mt-10 space-y-4">
            {pageFaqs.map((faq) => (
              <section key={faq.question} className="rounded-lg border border-slate-200 p-6 dark:border-slate-800">
                <h2 className="text-xl font-bold">{faq.question}</h2>
                <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-lg bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">{isEn ? 'Have a specific case?' : isZh ? '您有具体情况要咨询吗？' : isAr ? 'هل لديك حالة محددة؟' : 'Vous avez un cas précis ?'}</h2>
            <p className="mt-2 text-blue-50">
              {isEn
                ? 'Send your supplier links, weight, volume and destination to our team.'
                : isZh ? '把供应商链接、重量、体积和目的地发给我们的团队。' : isAr ? 'أرسل إلى فريقنا روابط المورد والوزن والحجم والوجهة.' : 'Envoyez vos liens fournisseur, poids, volume et destination à notre équipe.'}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/8618851725957"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-5 py-3 text-center font-bold text-blue-700"
              >
                {isEn ? 'WhatsApp China team' : isZh ? '中国 WhatsApp' : isAr ? 'WhatsApp الصين' : 'WhatsApp Chine'}
              </a>
              <Link href={`/${locale}/calculateur`} className="rounded-lg border border-white/30 px-5 py-3 text-center font-bold">
                {isEn ? 'Calculate freight' : isZh ? '计算运费' : isAr ? 'احسب الشحن' : 'Calculer un fret'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
