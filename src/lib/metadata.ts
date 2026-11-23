/**
 * Metadata Utilities
 *
 * The viewport and the two metadata generators still in use (home, service pages).
 * The other generators had no callers and repeated claims the site no longer makes
 * ("500+ businesses", Senegal and Ivory Coast as destinations); removed 2026-11-20.
 */

import { Metadata, Viewport } from 'next';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';

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
   * More importantly it positioned the brand as pan-African. Owner, 2026-11-15:
   * the business sources and ships China to Mali and Uganda (Bamako, Kampala) for
   * importers across West and East Africa, and the title says exactly that.
   * Earlier note: it used to read as one corridor, Guangzhou and Foshan to Bamako. Spreading the homepage's
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
      title: "Cargo Chine Mali | Transitaire Chine Mali et Ouganda · ChinaLink Express",
      description:
        "Sourcing et expédition de la Chine vers le Mali et l'Ouganda, pour les importateurs d'Afrique de l'Ouest et de l'Est : recherche de fournisseurs, achat et paiement en Chine, fret aérien ou maritime jusqu'à Bamako ou Kampala. Devis gratuit.",
      keywords:
        "cargo chine mali, transitaire chine mali, cargo chine ouganda, sourcing Chine Afrique, expédition Chine Afrique de l'Ouest, expédition Chine Afrique de l'Est, fret aérien Chine Bamako, fret Chine Kampala",
    },
    en: {
      title: "China to Mali & Uganda Cargo, Sourcing & Shipping | ChinaLink Express",
      description:
        "Sourcing and shipping from China to Mali and Uganda for importers across West and East Africa: supplier search, purchasing and payment in China, air and sea freight to Bamako or Kampala, with verified photos and tracking.",
      keywords:
        "China Mali cargo, China Uganda cargo, China Mali freight forwarder, China Uganda freight forwarder, shipping from China to West Africa, shipping from China to East Africa, China sourcing agent Africa, freight China Kampala, air freight China Bamako",
    },
    zh: {
      title: "中国到马里和乌干达的采购与货运 | ChinaLink Express",
      description:
        "为西非和东非进口商提供从中国到马里和乌干达的采购与货运服务：寻找供应商、在中国采购与付款、空运和海运到巴马科或坎帕拉，并提供可验证的照片和货物跟踪。",
      keywords:
        "中国马里货运, 中国乌干达货运, 中国马里货运代理, 中国乌干达货运代理, 中国到西非货运, 中国到东非货运, 中国采购代理 非洲, 中国到坎帕拉货运, 中国到巴马科空运",
    },
    ar: {
      title: "التوريد والشحن من الصين إلى مالي وأوغندا | ChinaLink Express",
      description:
        "التوريد والشحن من الصين إلى مالي وأوغندا للمستوردين في غرب وشرق أفريقيا: البحث عن المورّدين، والشراء والدفع في الصين، والشحن الجوي والبحري إلى باماكو أو كمبالا، مع صور قابلة للتحقق وتتبع الشحنات.",
      keywords:
        "الشحن من الصين إلى مالي, الشحن من الصين إلى أوغندا, وكيل شحن الصين مالي, وكيل شحن الصين أوغندا, الشحن من الصين إلى غرب أفريقيا, الشحن من الصين إلى شرق أفريقيا, وكيل توريد في الصين, الشحن إلى كمبالا, الشحن الجوي إلى باماكو",
    },
  } as const;

  const copy = byLocale[locale] ?? byLocale.fr;

  const meta = generatePageMetadata({
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    path: '/',
    locale,
    ogType: 'website',
  });
  // The layout template does not apply on the home page, so keep the brand as written.
  return { ...meta, title: { absolute: copy.title } };
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
        ? 'China Sourcing Agent for West & East Africa | Supplier Search & Payment'
        : isZh ? '中国采购代理 | 寻找供应商 | 供应商付款' : isAr ? 'وكيل توريد في الصين | البحث عن الموردين | الدفع للموردين' : 'Agent Sourcing Chine | Recherche et Paiement Fournisseur',
      description: isEn
        ? 'China sourcing agent for importers in West and East Africa. We find suppliers in China, check the goods, pay for you and ship by air or sea to Bamako (Mali) and Kampala (Uganda).'
        : isZh ? '面向西非和东非进口商的中国采购代理。寻找中国供应商、检查货物、代为付款，并通过空运或海运发往巴马科（马里）和坎帕拉（乌干达）。' : isAr ? 'وكيل توريد في الصين للمستوردين في غرب أفريقيا وشرقها. نجد الموردين في الصين ونفحص البضاعة وندفع عنك ونشحن جواً أو بحراً إلى باماكو (مالي) وكمبالا (أوغندا).' : 'Agent sourcing en Chine pour les importateurs d’Afrique de l’Ouest et de l’Est. Recherche de fournisseurs, contrôle de la marchandise, paiement en Chine et expédition par avion ou bateau vers Bamako (Mali) et Kampala (Ouganda).',
      keywords: isEn
        ? 'China sourcing agent Africa, China procurement services, supplier verification China, sourcing agent Mali, sourcing agent Uganda'
        : isZh ? '中国采购代理, 中国马里采购, 中国乌干达采购, 中国供应商核验, 中国质量检验' : isAr ? 'وكيل توريد في الصين، التوريد من الصين إلى مالي، التوريد من الصين إلى أوغندا، التحقق من الموردين في الصين، فحص الجودة في الصين' : 'agent sourcing Chine, agent sourcing Chine Mali, agent sourcing Chine Ouganda, vérification fournisseur Chine, inspection qualité Chine',
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
