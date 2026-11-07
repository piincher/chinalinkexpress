import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQPageSchema, generateOrganizationSchema } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { ItemSearch, StatusLegend } from '@/features/dangerous-goods';
import { PageHero } from '@/components/site';

interface Props {
  params: Promise<{ locale: string }>;
}

const getFaqs = (isEn: boolean, isZh: boolean, isAr: boolean) => [
  {
    question: isEn
      ? 'Can I ship lithium batteries from China to Africa?'
      : isZh ? '我可以把锂电池从中国运到非洲吗？' : isAr ? 'هل يمكنني شحن بطاريات الليثيوم من الصين إلى أفريقيا؟' : 'Puis-je expédier des batteries lithium de Chine vers l\'Afrique ?',
    answer: isEn
      ? 'Yes, but with restrictions. Smartphones, laptops, and power banks can be shipped with proper declaration. The battery must remain inside the device, and capacity limits apply for air freight (max 20,000mAh for power banks). Large lithium batteries for electric vehicles or solar systems may require sea freight and MSDS documentation.'
      : isZh ? '可以，但有限制。智能手机、笔记本电脑和移动电源经适当申报后可以运输。电池必须留在设备内，空运有容量限制（移动电源最大 20 000mAh）。电动车或太阳能系统用的大型锂电池可能需要海运和 MSDS 文件。' : isAr ? 'نعم، لكن بقيود. يمكن شحن الهواتف الذكية والحواسيب المحمولة وبطاريات الشحن المتنقلة مع تصريح مناسب. يجب أن تبقى البطارية داخل الجهاز، وتُطبق حدود للسعة في الشحن الجوي (20 000 mAh كحد أقصى لبطاريات الشحن المتنقلة). وقد تتطلب بطاريات الليثيوم الكبيرة للمركبات الكهربائية أو الأنظمة الشمسية الشحن البحري ومستندات MSDS.' : 'Oui, mais avec des restrictions. Les smartphones, ordinateurs portables et batteries externes peuvent être expédiés avec une déclaration appropriée. La batterie doit rester à l\'intérieur de l\'appareil, et des limites de capacité s\'appliquent pour le fret aérien (max 20 000mAh pour les batteries externes). Les grandes batteries lithium pour véhicules électriques ou systèmes solaires peuvent nécessiter le fret maritime et une documentation MSDS.',
  },
  {
    question: isEn
      ? 'What happens if I try to ship a prohibited item?'
      : isZh ? '如果我尝试运输禁运物品会怎样？' : isAr ? 'ماذا يحدث إذا حاولت شحن سلعة محظورة؟' : 'Que se passe-t-il si j\'essaie d\'expédier un article interdit ?',
    answer: isEn
      ? 'Prohibited items will be seized by customs at departure or arrival. You may face fines, and the shipping carrier may blacklist you. Common prohibited items include weapons, explosives, narcotics, pesticides, and cash. Always check our product verifier before ordering.'
      : isZh ? '禁运物品会在出发地或目的地被海关没收。您可能被罚款，承运人也可能把您列入黑名单。常见禁运物品包括武器、爆炸物、毒品、农药和现金。下单前请务必查询我们的产品检查工具。' : isAr ? 'تصادر الجمارك السلع المحظورة عند المغادرة أو الوصول. وقد تواجه غرامات، وقد يدرجك الناقل في قائمة سوداء. ومن السلع المحظورة الشائعة الأسلحة والمتفجرات والمخدرات والمبيدات والنقود. تحقق دائمًا من أداة فحص المنتجات لدينا قبل الطلب.' : 'Les articles interdits seront saisis par les douanes au départ ou à l\'arrivée. Vous risquez des amendes, et le transporteur peut vous mettre sur liste noire. Les articles interdits courants incluent les armes, explosifs, stupéfiants, pesticides et espèces. Vérifiez toujours notre vérificateur de produits avant de commander.',
  },
  {
    question: isEn
      ? 'Do cosmetics need special permits to import to Mali?'
      : isZh ? '化妆品进口到马里需要特殊许可吗？' : isAr ? 'هل تحتاج مستحضرات التجميل إلى تصاريح خاصة للاستيراد إلى مالي؟' : 'Les cosmétiques nécessitent-ils des permis spéciaux pour importer au Mali ?',
    answer: isEn
      ? 'Most cosmetics (creams, makeup, shampoo) do not need permits. However, products with high alcohol content like perfumes and nail polish are classified as flammable liquids and have quantity restrictions. Hair dyes with ammonia may need a Safety Data Sheet. Always ensure cosmetics have proper ingredient labeling in French.'
      : isZh ? '大多数化妆品（面霜、彩妆、洗发水）不需要许可。但酒精含量高的产品（如香水和指甲油）属于易燃液体，有数量限制。含氨染发剂可能需要安全数据表。请务必确保化妆品有法语成分标签。' : isAr ? 'لا تحتاج معظم مستحضرات التجميل (الكريمات والمكياج والشامبو) إلى تصريح. لكن المنتجات عالية الكحول مثل العطور وطلاء الأظافر تصنف سوائل قابلة للاشتعال وتخضع لقيود على الكمية. وقد تتطلب صبغات الأمونيا صحيفة بيانات سلامة. تأكد دائمًا من وجود ملصق مكونات بالفرنسية على مستحضرات التجميل.' : 'La plupart des cosmétiques (crèmes, maquillage, shampooing) ne nécessitent pas de permis. Cependant, les produits avec forte teneur en alcool comme les parfums et vernis à ongles sont classés comme liquides inflammables et ont des restrictions de quantité. Les colorations avec ammoniac peuvent nécessiter une fiche de données de sécurité. Assurez-vous toujours que les cosmétiques ont un étiquetage des ingrédients en français.',
  },
  {
    question: isEn
      ? 'Can I ship food products like spices and canned goods?'
      : isZh ? '我可以运输香料和罐头等食品吗？' : isAr ? 'هل يمكنني شحن المنتجات الغذائية مثل التوابل والمعلبات؟' : 'Puis-je expédier des produits alimentaires comme des épices et des conserves ?',
    answer: isEn
      ? 'Yes. Dried spices, canned foods, instant noodles, and cooking oil are generally allowed. Ensure commercial packaging with ingredient lists and best-before dates visible. Frozen and fresh foods are prohibited as we do not offer cold chain logistics. Baby formula and honey may require health ministry permits depending on the destination country.'
      : isZh ? '可以。干香料、罐头食品、方便面和食用油通常是允许的。请确保使用商业包装，配料表和保质期清晰可见。冷冻和新鲜食品被禁止，因为我们不提供冷链物流。婴儿奶粉和蜂蜜根据目的国可能需要卫生部门的许可。' : isAr ? 'نعم. التوابل المجففة والمعلبات والنودلز سريعة التحضير وزيت الطهي مسموح بها عمومًا. تأكد من وجود تغليف تجاري مع قائمة مكونات وتواريخ صلاحية ظاهرة. والأغذية المجمدة والطازجة محظورة لأننا لا نقدم خدمات سلسلة التبريد. وقد يتطلب حليب الرضع والعسل تصاريح من وزارة الصحة حسب بلد الوصول.' : 'Oui. Les épices séchées, aliments en conserve, nouilles instantanées et huile de cuisson sont généralement autorisés. Assurez-vous d\'un emballage commercial avec liste des ingrédients et dates de péremption visibles. Les aliments surgelés et frais sont interdits car nous n\'offrons pas de logistique de chaîne du froid. Le lait infantile et le miel peuvent nécessiter des permis du ministère de la santé selon le pays de destination.',
  },
  {
    question: isEn
      ? 'What does "restricted" mean vs "prohibited"?'
      : isZh ? '"限制"和"禁止"有什么区别？' : isAr ? 'ما الفرق بين "مقيّد" و"محظور"؟' : 'Que signifie "restreint" par rapport à "interdit" ?',
    answer: isEn
      ? 'Restricted items CAN be shipped but require special handling, packaging, or documentation. Examples: lithium batteries, paint, aerosols. Prohibited items CANNOT be shipped under any circumstances through standard freight. Examples: weapons, explosives, cash, pesticides. If you are unsure about an item, contact us on WhatsApp for verification.'
      : isZh ? '限制物品可以运输，但需要特殊处理、包装或文件，例如锂电池、油漆、气雾剂。禁止物品在任何情况下都不能通过标准货运运输，例如武器、爆炸物、现金、农药。如果不确定某件物品，请通过 WhatsApp 联系我们核实。' : isAr ? 'يمكن شحن السلع المقيدة لكنها تتطلب مناولة أو تغليفًا أو مستندات خاصة، مثل بطاريات الليثيوم والطلاء والبخاخات. أما السلع المحظورة فلا يمكن شحنها بأي حال عبر الشحن القياسي، مثل الأسلحة والمتفجرات والنقود والمبيدات. إذا لم تكن متأكدًا من سلعة، تواصل معنا عبر WhatsApp للتحقق.' : 'Les articles restreints PEUVENT être expédiés mais nécessitent une manipulation, un emballage ou une documentation spéciale. Exemples : batteries lithium, peinture, aérosols. Les articles interdits NE PEUVENT PAS être expédiés en aucune circonstance par fret standard. Exemples : armes, explosifs, espèces, pesticides. Si vous n\'êtes pas sûr d\'un article, contactez-nous sur WhatsApp pour vérification.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Can I Ship This? | Dangerous Goods Checker | ChinaLink Express'
      : isZh ? '我能运这个吗？ | 产品检查工具 | ChinaLink Express' : isAr ? 'هل يمكنني شحن هذا؟ | أداة فحص المنتجات | ChinaLink Express' : 'Puis-je Expédier Ceci ? | Vérificateur de Produits | ChinaLink Express',
    description: isEn
      ? 'Check if your product can be shipped from China to Africa. Search 90+ items: electronics, cosmetics, food, machinery, medical supplies. Instantly see if allowed, restricted, prohibited, or needs a permit.'
      : isZh ? '检查您的产品能否从中国运到非洲。搜索 90 多种物品：电子产品、化妆品、食品、机器、医疗用品。立即查看是否允许、限制、禁止或需要许可。' : isAr ? 'تحقق مما إذا كان منتجك قابلًا للشحن من الصين إلى أفريقيا. ابحث في أكثر من 90 سلعة: إلكترونيات ومستحضرات تجميل وأغذية وآلات ومستلزمات طبية. اعرف فورًا إن كان مسموحًا أو مقيدًا أو محظورًا أو يتطلب تصريحًا.' : 'Vérifiez si votre produit peut être expédié de Chine vers l\'Afrique. Recherchez 90+ articles : électronique, cosmétiques, alimentation, machines, fournitures médicales. Voyez instantanément si autorisé, restreint, interdit ou permis requis.',
    keywords: isEn
      ? 'dangerous goods checker, prohibited items shipping, can i ship batteries, restricted items china africa, customs prohibited items mali, shipping restrictions china, what can i import from china, hazardous goods freight, cargo restrictions west africa, product verifier chinalink'
      : isZh ? '进口禁运产品, 检查中国马里产品, 货运危险品, 中国非洲运输限制, 马里海关禁运物品, 能否运电池, 中国受限产品, ChinaLink 产品检查, 中国马里货运限制' : isAr ? 'المنتجات المحظورة في الاستيراد، فحص منتج من الصين إلى مالي، البضائع الخطرة في الشحن، قيود الشحن من الصين إلى أفريقيا، السلع المحظورة في جمارك مالي، هل يمكن شحن البطاريات، المنتجات المقيدة من الصين، أداة فحص منتجات ChinaLink، قيود الشحن من الصين إلى مالي' : 'produits interdits importation, verifier produit chine mali, marchandises dangereuses fret, restrictions expédition chine afrique, articles interdits douane mali, puis-je expédier batteries, produits restreints chine, vérificateur produits chinalink, cargo chine mali restrictions',
    path: '/verifier-produit',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function VerifierProduitPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const faqs = getFaqs(isEn, isZh, isAr);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
      { name: isEn ? 'Product Checker' : isZh ? '产品检查工具' : isAr ? 'أداة فحص المنتجات' : 'Vérificateur Produit', url: `/${locale}/verifier-produit` },
    ], locale as Locale),
    generateFAQPageSchema(faqs, locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Hero */}
        <PageHero
          eyebrow={isEn ? 'Free Product Checker' : isZh ? '免费检查工具' : isAr ? 'أداة فحص مجانية' : 'Vérificateur Gratuit'}
          title={isEn ? 'Can I Ship This Item?' : isZh ? '我能运这个产品吗？' : isAr ? 'هل يمكنني شحن هذا المنتج؟' : 'Puis-je Expédier Ce Produit ?'}
          lede={isEn
            ? 'Check if your product can be shipped from China to West Africa. Search 90+ items across electronics, cosmetics, food, machinery, and more. Instantly see shipping rules.'
            : isZh ? '检查您的产品能否从中国运到西非。搜索 90 多种物品：电子产品、化妆品、食品、机器等。立即查看运输规则。' : isAr ? 'تحقق مما إذا كان منتجك قابلًا للشحن من الصين إلى غرب أفريقيا. ابحث في أكثر من 90 سلعة: إلكترونيات ومستحضرات تجميل وأغذية وآلات وغيرها. اطلع فورًا على قواعد الشحن.' : "Vérifiez si votre produit peut être expédié de Chine vers l'Afrique de l'Ouest. Recherchez 90+ articles : électronique, cosmétiques, alimentation, machines et plus. Voyez instantanément les règles d'expédition."}
        />

        {/* Status Legend */}
        <section className="border-y border-white/5 bg-white/[0.02] py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <StatusLegend locale={locale} />
          </div>
        </section>

        {/* Search */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-10">
              <h2 className="text-2xl font-bold md:text-3xl">
                {isEn ? 'Search a Product' : isZh ? '搜索产品' : isAr ? 'ابحث عن منتج' : 'Rechercher un Produit'}
              </h2>
              <p className="mt-2 text-slate-400">
                {isEn
                  ? 'Type a product name or browse by category and status.'
                  : isZh ? '输入产品名称，或按类别和状态浏览。' : isAr ? 'اكتب اسم منتج أو تصفح حسب الفئة والحالة.' : 'Tapez un nom de produit ou parcourez par catégorie et statut.'}
              </p>
            </div>
            <ItemSearch locale={(locale as Locale)} />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold md:text-3xl text-center mb-10">
              {isEn ? 'Frequently Asked Questions' : isZh ? '常见问题' : isAr ? 'الأسئلة الشائعة' : 'Questions Fréquentes'}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 open:bg-white/[0.07] transition"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-semibold text-white list-none">
                    {faq.question}
                    <span className="ml-4 text-slate-400 transition group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-300 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEn ? 'Not sure about your product?' : isZh ? '不确定您的产品？' : isAr ? 'لست متأكدًا من منتجك؟' : 'Pas sûr de votre produit ?'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              {isEn
                ? 'Our team can verify any product for you. Send us a photo or description on WhatsApp and we will confirm shipping eligibility within minutes.'
                : isZh ? '我们的团队可以为您核实任何产品。通过 WhatsApp 发送照片或描述，我们会在几分钟内确认是否可运。' : isAr ? 'يمكن لفريقنا التحقق من أي منتج لك. أرسل إلينا صورة أو وصفًا عبر WhatsApp وسنؤكد إمكانية الشحن خلال دقائق.' : 'Notre équipe peut vérifier n\'importe quel produit pour vous. Envoyez-nous une photo ou description sur WhatsApp et nous confirmerons l\'éligibilité en quelques minutes.'}
            </p>
            <a
              href="https://wa.me/8618851725957?text=Bonjour%20ChinaLink%2C%20j'ai%20une%20question%20sur%20un%20produit%20%C3%A0%20exp%C3%A9dier."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-500/20 transition hover:bg-green-400"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {isEn ? 'Ask on WhatsApp' : isZh ? '在 WhatsApp 上咨询' : isAr ? 'اسأل عبر WhatsApp' : 'Demander sur WhatsApp'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
