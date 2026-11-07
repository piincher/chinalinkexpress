import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { PageHero } from '@/components/site';

interface Props {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    href: '/services/sourcing',
    title: { fr: 'Agent sourcing Chine pour le Mali', en: 'China sourcing agent for Mali and Africa', zh: '面向马里的中国采购代理', ar: 'وكيل توريد في الصين لمالي' },
    description: {
      fr: 'Recherche fournisseurs, achat Alibaba, négociation, contrôle qualité et consolidation.',
      en: 'Supplier search, Alibaba and 1688 purchasing, negotiation, quality checks and consolidation.',
      zh: '寻找供应商、Alibaba 采购、议价、质量检查和集运。',
      ar: 'البحث عن موردين والشراء من Alibaba والتفاوض وفحص الجودة والتجميع.',
    },
  },
  {
    href: '/services/agent-sourcing-chine',
    title: { fr: 'Agent sourcing Chine Afrique', en: 'China sourcing agent for West Africa', zh: '中国非洲采购代理', ar: 'وكيل توريد من الصين إلى أفريقيا' },
    description: {
      fr: 'Service sourcing complet : Alibaba, 1688, usines, négociation, paiement, inspection et fret.',
      en: 'Full sourcing service: Alibaba, 1688, factories, negotiation, payment, inspection and freight.',
      zh: '全程采购服务：Alibaba、1688、工厂、议价、付款、检验和货运。',
      ar: 'خدمة توريد متكاملة: Alibaba و1688 والمصانع والتفاوض والدفع والفحص والشحن.',
    },
  },
  {
    href: '/services/achat-alibaba-mali',
    title: { fr: 'Achat Alibaba depuis le Mali', en: 'Alibaba buying agent for Mali', zh: '从马里在 Alibaba 采购', ar: 'الشراء من Alibaba من مالي' },
    description: {
      fr: 'Achetez sur Alibaba sans arnaque avec vérification fournisseur, paiement sécurisé et livraison.',
      en: 'Buy on Alibaba safely with supplier verification, secure payment and delivery.',
      zh: '在 Alibaba 安全购买，提供供应商核验、安全付款和交付。',
      ar: 'اشترِ من Alibaba دون احتيال مع التحقق من المورد والدفع الآمن والتسليم.',
    },
  },
  {
    href: '/services/paiement-fournisseur-chine',
    title: { fr: 'Paiement fournisseur chinois', en: 'Chinese supplier payment', zh: '中国供应商付款', ar: 'الدفع لمورد صيني' },
    description: {
      fr: 'Paiement Alipay ou virement avec preuve de paiement et suivi fournisseur.',
      en: 'Alipay or Chinese bank transfer support with payment proof and supplier follow-up.',
      zh: '支付宝或转账付款，提供付款凭证并跟进供应商。',
      ar: 'دفع عبر Alipay أو التحويل مع إثبات الدفع ومتابعة المورد.',
    },
  },
  {
    href: '/services/verification-fournisseur-chine',
    title: { fr: 'Vérification fournisseur Chine', en: 'China supplier verification', zh: '中国供应商核验', ar: 'التحقق من الموردين في الصين' },
    description: {
      fr: 'Contrôle des fournisseurs avant paiement, inspection photo et réduction des risques.',
      en: 'Supplier checks before payment, photo inspection and fraud-risk reduction.',
      zh: '付款前检查供应商、照片检验，降低风险。',
      ar: 'فحص الموردين قبل الدفع وفحص بالصور وتقليل المخاطر.',
    },
  },
  {
    href: '/services/air-freight',
    title: { fr: 'Fret aérien Chine-Mali', en: 'Air freight China to Mali', zh: '中国—马里空运', ar: 'الشحن الجوي من الصين إلى مالي' },
    description: {
      fr: 'Cargo aérien vers Bamako en 14-21 jours pour les marchandises urgentes.',
      en: 'Air cargo to Bamako in 14-21 days for urgent goods.',
      zh: '紧急货物空运到巴马科，14-21 天。',
      ar: 'شحن جوي إلى باماكو خلال 14-21 يومًا للبضائع العاجلة.',
    },
  },
  {
    href: '/services/sea-freight',
    title: { fr: 'Fret maritime Chine-Mali', en: 'Sea freight China to Mali', zh: '中国—马里海运', ar: 'الشحن البحري من الصين إلى مالي' },
    description: {
      fr: 'FCL, LCL et groupage maritime via ports d’Afrique de l’Ouest vers Bamako.',
      en: 'FCL, LCL and consolidation via West African ports to Bamako.',
      zh: 'FCL、LCL 和海运拼箱，经西非港口到巴马科。',
      ar: 'FCL وLCL والشحن البحري المجمّع عبر موانئ غرب أفريقيا إلى باماكو.',
    },
  },
  {
    href: '/calculateur',
    title: { fr: 'Calculateur de fret', en: 'Freight calculator', zh: '运费计算器', ar: 'حاسبة الشحن' },
    description: {
      fr: 'Estimez le coût de transport Chine-Mali selon poids, volume et mode de fret.',
      en: 'Estimate China-Mali shipping costs by weight, volume and freight mode.',
      zh: '根据重量、体积和运输方式估算中国到马里的运输成本。',
      ar: 'قدّر كلفة النقل من الصين إلى مالي حسب الوزن والحجم وطريقة الشحن.',
    },
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'China-Mali Business Services | Sourcing, Payments, Freight'
      : isZh ? '中国—马里服务 | 采购、付款、货运' : isAr ? 'خدمات الصين-مالي | التوريد والدفع والشحن' : 'Services Chine-Mali | Sourcing, Paiement, Fret',
    description: isEn
      ? 'ChinaLink Express services for doing business with China from Mali and Africa: sourcing, supplier payment, verification, air freight, sea freight and cost calculator.'
      : isZh ? 'ChinaLink Express 从中国进口到马里的所有服务：采购、供应商付款、核验、空运、海运和计算器。' : isAr ? 'كل خدمات ChinaLink Express للاستيراد من الصين إلى مالي: التوريد والدفع للموردين والتحقق والشحن الجوي والبحري والحاسبة.' : 'Tous les services ChinaLink Express pour importer de Chine au Mali : sourcing, paiement fournisseur, vérification, fret aérien, fret maritime et calculateur.',
    keywords: isEn
      ? 'China Mali business services, China sourcing Africa, supplier payment China, China supplier verification, freight China Mali, China Africa logistics'
      : isZh ? '中国马里服务, 中国马里采购, 中国供应商付款, 中国马里货运, 中国马里货代, 中国供应商核验, 马里 Alibaba 采购' : isAr ? 'خدمات الصين-مالي، التوريد من الصين إلى مالي، الدفع لمورد صيني، الشحن من الصين إلى مالي، وكيل شحن من الصين إلى مالي، التحقق من الموردين في الصين، الشراء من Alibaba في مالي' : 'services Chine Mali, sourcing Chine Mali, paiement fournisseur chinois, fret Chine Mali, transitaire Chine Mali, vérification fournisseur Chine, achat Alibaba Mali',
    path: '/services',
    locale: locale as Locale,
  });
}

export default async function ServicesHub({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const textLocale = (locale as Locale);

  return (
    <>
      <StructuredData type="organization" />
      <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
        <PageHero
          eyebrow={isEn ? 'ChinaLink Express Services' : isZh ? 'ChinaLink Express 服务' : isAr ? 'خدمات ChinaLink Express' : 'Services ChinaLink Express'}
          title={isEn ? 'Services for doing business with China from Mali and Africa' : isZh ? '从中国进口到马里的服务' : isAr ? 'خدمات الاستيراد من الصين إلى مالي' : 'Services pour importer de Chine au Mali'}
          lede={isEn
            ? 'One partner to find the supplier, secure payment, verify quality and ship goods from China to Bamako or across Africa.'
            : isZh ? '一个伙伴负责寻找供应商、保障付款、核验质量，并把您的货物从中国运到巴马科。' : isAr ? 'شريك واحد للعثور على المورد وتأمين الدفع والتحقق من الجودة وشحن بضائعك من الصين إلى باماكو.' : 'Un seul partenaire pour trouver le fournisseur, sécuriser le paiement, vérifier la qualité et expédier vos marchandises de la Chine vers Bamako.'}
        />
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const isTwoLocaleService =
                service.href === '/services/paiement-fournisseur-chine' ||
                service.href === '/services/verification-fournisseur-chine' ||
                service.href === '/services/agent-sourcing-chine' ||
                service.href === '/services/achat-alibaba-mali';
              const linkLocale = isTwoLocaleService && locale !== 'fr' && locale !== 'en' ? 'fr' : locale;

              return (
                <Link
                  key={service.href}
                  href={`/${linkLocale}${service.href}`}
                  className="rounded-lg border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:hover:border-blue-700 dark:hover:bg-slate-900"
                >
                  <h2 className="text-xl font-bold">{service.title[textLocale]}</h2>
                  <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{service.description[textLocale]}</p>
                </Link>
              );
            })}
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
