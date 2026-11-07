import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import {
  BUSINESS_INFO,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generatePageMetadata,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { SeoGuidePage } from '@/features/seo-content/SeoGuidePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    metaTitle: 'Douane Mali import Chine | Documents et conseils',
    metaDescription:
      'Documents et précautions pour importer de Chine au Mali : facture, packing list, description produit, restrictions, dédouanement et livraison à Bamako.',
    keywords:
      'douane Mali import Chine, documents douane Mali, dedouanement Mali Chine, importer Chine Mali documents',
    title: 'Douane Mali : documents pour importer de Chine',
    description:
      'Documents et précautions pour importer de Chine au Mali : facture, packing list, description produit, restrictions, dédouanement et livraison à Bamako.',
    updatedAt: '21 avril 2026',
    readTime: 'Lecture : 5 minutes',
    kicker: 'Guide import Chine-Mali',
    updatedLabel: 'Mis a jour',
    reviewedBy: "Relu par l'equipe operations Chine/Bamako",
    faqTitle: 'FAQ',
    continueTitle: 'Continuer',
    advisorCtaLabel: 'Parler a un conseiller',
    breadcrumbHome: 'Accueil',
    breadcrumbCurrent: 'Douane Mali import Chine',
    sections: [
      {
        title: 'Les documents à préparer',
        body: 'Une expédition claire commence par une documentation claire. Les informations doivent correspondre à la marchandise réelle pour éviter blocages, frais supplémentaires ou retards.',
        items: ['Facture commerciale', 'Packing list', 'Description produit détaillée', 'Valeur déclarée cohérente'],
      },
      {
        title: 'Produits sensibles ou interdits',
        body: 'Batteries, liquides, drones, produits chimiques, armes, produits inflammables et certains compléments peuvent être interdits ou soumis à autorisation. Validez avant de payer le fournisseur.',
      },
      {
        title: 'Pourquoi la description produit compte',
        body: 'Une description vague comme "accessoires" ou "pièces" peut créer des problèmes. Indiquez la matière, l’usage, la quantité, les références et l’emballage.',
      },
      {
        title: 'Comment ChinaLink réduit les risques',
        body: 'Nous demandons les informations utiles avant expédition, contrôlons les marchandises sensibles et vous orientons vers le mode de fret le plus adapté.',
      },
    ],
    faqs: [
      {
        question: 'Quels documents demander au fournisseur chinois ?',
        answer:
          'Demandez au minimum une facture commerciale claire, une liste de colisage, les références produit, la quantité, la valeur et les informations d’emballage.',
      },
      {
        question: 'Tous les produits passent-ils en douane au Mali ?',
        answer:
          'Non. Certains produits sont interdits, réglementés ou demandent des autorisations. Il faut valider avant achat.',
      },
      {
        question: 'ChinaLink accompagne-t-il le dédouanement ?',
        answer:
          'Oui, ChinaLink accompagne les expéditions standards et signale les cas particuliers qui demandent des documents ou procédures supplémentaires.',
      },
    ],
    links: [
      { href: '/fr/services/verification-fournisseur-chine', label: 'Vérifier avant achat' },
      { href: '/fr/services/air-freight', label: 'Articles sensibles en aérien' },
      { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
      { href: '/fr/contact', label: 'Demander un avis douane' },
    ],
  },
  en: {
    metaTitle: 'Mali Customs for Imports from China | Documents and Checks',
    metaDescription:
      'Documents and precautions for importing from China to Mali and West Africa: commercial invoice, packing list, product description, restrictions, customs and Bamako delivery.',
    keywords:
      'Mali customs China import, China to Mali customs documents, import from China to Mali, West Africa customs clearance, Bamako freight documents',
    title: 'Mali customs: documents for importing from China',
    description:
      'Prepare the documents and product details needed before shipping from China to Mali or onward into West Africa, with Bamako as the main operational hub.',
    updatedAt: 'April 21, 2026',
    readTime: '5 min read',
    kicker: 'China to Mali Import Guide',
    updatedLabel: 'Updated',
    reviewedBy: 'Reviewed by the China/Bamako operations team',
    faqTitle: 'Frequently asked questions',
    continueTitle: 'Continue',
    advisorCtaLabel: 'Talk to an advisor',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Mali customs for China imports',
    sections: [
      {
        title: 'Documents to prepare',
        body: 'A reliable shipment starts with clear documentation. The declared details should match the actual goods to reduce customs blocks, extra charges and delays.',
        items: ['Commercial invoice', 'Packing list', 'Detailed product description', 'Consistent declared value'],
      },
      {
        title: 'Sensitive or restricted products',
        body: 'Batteries, liquids, drones, chemicals, weapons, flammable goods and some supplements may be restricted or require special authorization. Validate the category before paying the supplier.',
      },
      {
        title: 'Why product descriptions matter',
        body: 'Vague descriptions such as "accessories" or "parts" can create customs issues. Include the material, use, quantity, references and packaging details.',
      },
      {
        title: 'How ChinaLink reduces risk',
        body: 'We request the useful information before shipping, flag sensitive goods and guide you toward the freight mode that fits your cargo and destination.',
      },
    ],
    faqs: [
      {
        question: 'What documents should I request from a Chinese supplier?',
        answer:
          'Ask for a clear commercial invoice, packing list, product references, quantity, value and packaging details at minimum.',
      },
      {
        question: 'Can every product pass customs in Mali?',
        answer:
          'No. Some products are prohibited, regulated or require authorization. Validate the product category before purchase.',
      },
      {
        question: 'Does ChinaLink support customs coordination?',
        answer:
          'Yes. ChinaLink supports standard shipments and flags special cases that need additional documents or procedures.',
      },
    ],
    links: [
      { href: '/en/services/verification-fournisseur-chine', label: 'Verify before buying' },
      { href: '/en/services/air-freight', label: 'Sensitive items by air' },
      { href: '/en/routes/china-to-mali', label: 'China to Mali freight' },
      { href: '/en/contact', label: 'Ask for customs advice' },
    ],
  },
  zh: {
    metaTitle: '马里海关与中国进口 | 文件与建议',
    metaDescription:
      '从中国进口到马里需要的文件和注意事项：发票、装箱单、产品描述、限制、清关及在巴马科交付。',
    keywords:
      '马里海关中国进口, 马里海关文件, 马里中国清关, 中国进口马里文件',
    title: '马里海关：从中国进口所需文件',
    description:
      '从中国进口到马里需要的文件和注意事项：发票、装箱单、产品描述、限制、清关及在巴马科交付。',
    updatedAt: '2026 年 4 月 21 日',
    readTime: '阅读时间：5 分钟',
    kicker: '中国—马里进口指南',
    updatedLabel: '更新于',
    reviewedBy: '由中国/巴马科运营团队审核',
    faqTitle: 'FAQ',
    continueTitle: '继续阅读',
    advisorCtaLabel: '咨询顾问',
    breadcrumbHome: '首页',
    breadcrumbCurrent: '马里海关与中国进口',
    sections: [
      {
        title: '需要准备的文件',
        body: '清晰的发货从清晰的文件开始。信息必须与实际货物一致，以避免扣货、额外费用或延误。',
        items: ['商业发票', '装箱单', '详细的产品描述', '一致的申报价值'],
      },
      {
        title: '敏感或禁运产品',
        body: '电池、液体、无人机、化学品、武器、易燃产品和某些补充剂可能被禁止或需要许可。请在向供应商付款前确认。',
      },
      {
        title: '为什么产品描述很重要',
        body: '"配件"或"零件"这样含糊的描述可能带来问题。请注明材质、用途、数量、型号和包装。',
      },
      {
        title: 'ChinaLink 如何降低风险',
        body: '我们在发货前索取必要信息，检查敏感货物，并为您推荐最合适的运输方式。',
      },
    ],
    faqs: [
      {
        question: '应向中国供应商索取哪些文件？',
        answer:
          '至少索取清晰的商业发票、装箱单、产品型号、数量、价值和包装信息。',
      },
      {
        question: '所有产品都能通过马里海关吗？',
        answer:
          '不能。有些产品被禁止、受管制或需要许可。必须在购买前确认。',
      },
      {
        question: 'ChinaLink 协助清关吗？',
        answer:
          '是的，ChinaLink 协助标准货物清关，并会提示需要额外文件或手续的特殊情况。',
      },
    ],
    links: [
      { href: '/zh/services/verification-fournisseur-chine', label: '购买前核实' },
      { href: '/zh/services/air-freight', label: '空运敏感物品' },
      { href: '/zh/routes/china-to-mali', label: '中国—马里货运线路' },
      { href: '/zh/contact', label: '咨询海关意见' },
    ],
  },
  ar: {
    metaTitle: 'جمارك مالي والاستيراد من الصين | المستندات والنصائح',
    metaDescription:
      'المستندات والاحتياطات للاستيراد من الصين إلى مالي: الفاتورة وقائمة التعبئة ووصف المنتج والقيود والتخليص الجمركي والتسليم في باماكو.',
    keywords:
      'جمارك مالي والاستيراد من الصين، مستندات جمارك مالي، التخليص الجمركي بين مالي والصين، مستندات الاستيراد من الصين إلى مالي',
    title: 'جمارك مالي: مستندات الاستيراد من الصين',
    description:
      'المستندات والاحتياطات للاستيراد من الصين إلى مالي: الفاتورة وقائمة التعبئة ووصف المنتج والقيود والتخليص الجمركي والتسليم في باماكو.',
    updatedAt: '21 أبريل 2026',
    readTime: 'وقت القراءة: 5 دقائق',
    kicker: 'دليل الاستيراد من الصين إلى مالي',
    updatedLabel: 'آخر تحديث',
    reviewedBy: 'راجعه فريق العمليات في الصين وباماكو',
    faqTitle: 'FAQ',
    continueTitle: 'تابع القراءة',
    advisorCtaLabel: 'تحدث إلى مستشار',
    breadcrumbHome: 'الرئيسية',
    breadcrumbCurrent: 'جمارك مالي والاستيراد من الصين',
    sections: [
      {
        title: 'المستندات المطلوب تجهيزها',
        body: 'تبدأ الشحنة الواضحة بمستندات واضحة. يجب أن تطابق المعلومات البضاعة الفعلية لتجنب الحجز أو الرسوم الإضافية أو التأخير.',
        items: ['الفاتورة التجارية', 'قائمة التعبئة', 'وصف مفصل للمنتج', 'قيمة مصرّح بها متسقة'],
      },
      {
        title: 'المنتجات الحساسة أو المحظورة',
        body: 'قد تكون البطاريات والسوائل والطائرات المسيّرة والمواد الكيميائية والأسلحة والمنتجات القابلة للاشتعال وبعض المكملات محظورة أو خاضعة لترخيص. تأكد من ذلك قبل الدفع للمورد.',
      },
      {
        title: 'لماذا يهم وصف المنتج',
        body: 'قد يسبب وصف مبهم مثل "إكسسوارات" أو "قطع" مشكلات. اذكر المادة والاستخدام والكمية والمراجع والتغليف.',
      },
      {
        title: 'كيف تقلل ChinaLink المخاطر',
        body: 'نطلب المعلومات اللازمة قبل الشحن، ونفحص البضائع الحساسة، ونوجهك إلى طريقة الشحن الأنسب.',
      },
    ],
    faqs: [
      {
        question: 'ما المستندات التي أطلبها من المورد الصيني؟',
        answer:
          'اطلب على الأقل فاتورة تجارية واضحة وقائمة تعبئة ومراجع المنتج والكمية والقيمة ومعلومات التغليف.',
      },
      {
        question: 'هل تمر كل المنتجات عبر جمارك مالي؟',
        answer:
          'لا. بعض المنتجات محظورة أو منظمة أو تتطلب تراخيص. يجب التأكد قبل الشراء.',
      },
      {
        question: 'هل تساعد ChinaLink في التخليص الجمركي؟',
        answer:
          'نعم، تساعد ChinaLink في الشحنات القياسية وتنبه إلى الحالات الخاصة التي تتطلب مستندات أو إجراءات إضافية.',
      },
    ],
    links: [
      { href: '/ar/services/verification-fournisseur-chine', label: 'تحقق قبل الشراء' },
      { href: '/ar/services/air-freight', label: 'المواد الحساسة في الشحن الجوي' },
      { href: '/ar/routes/china-to-mali', label: 'خط الشحن من الصين إلى مالي' },
      { href: '/ar/contact', label: 'اطلب رأيًا جمركيًا' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];

  return generatePageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: '/guides/douane-mali-import-chine',
    locale: locale as Locale,

    ogType: 'article',
  });
}

export default async function CustomsGuidePage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const page = content[locale as Locale];
  setRequestLocale(locale);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    author: { '@type': 'Organization', name: BUSINESS_INFO.name },
    publisher: { '@type': 'Organization', name: BUSINESS_INFO.name },
    datePublished: '2026-04-21',
    dateModified: '2026-04-21',
    inLanguage: (locale as Locale),
    mainEntityOfPage: `${BUSINESS_INFO.url}/${locale}/guides/douane-mali-import-chine`,
  };

  return (
    <>
      <StructuredData
        schemas={[
          articleSchema,
          generateBreadcrumbSchema(
            [
              { name: page.breadcrumbHome, url: `/${locale}/` },
              { name: 'Guides', url: isEn ? '/en/blog' : isZh ? '/zh/guides/importer-de-chine-au-mali' : isAr ? '/ar/guides/importer-de-chine-au-mali' : '/fr/guides/importer-de-chine-au-mali' },
              { name: page.breadcrumbCurrent, url: `/${locale}/guides/douane-mali-import-chine` },
            ],
            locale as Locale
          ),
          generateFAQPageSchema(page.faqs, locale as Locale),
        ]}
      />
      <SeoGuidePage
        title={page.title}
        description={page.description}
        updatedAt={page.updatedAt}
        readTime={page.readTime}
        sections={page.sections}
        faqs={page.faqs}
        links={page.links}
        kicker={page.kicker}
        updatedLabel={page.updatedLabel}
        reviewedBy={page.reviewedBy}
        faqTitle={page.faqTitle}
        continueTitle={page.continueTitle}
        advisorCtaLabel={page.advisorCtaLabel}
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
