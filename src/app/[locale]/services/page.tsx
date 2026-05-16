import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    href: '/services/sourcing',
    title: { fr: 'Agent sourcing Chine pour le Mali', en: 'China sourcing agent for Mali and Africa' },
    description: {
      fr: 'Recherche fournisseurs, achat Alibaba, négociation, contrôle qualité et consolidation.',
      en: 'Supplier search, Alibaba and 1688 purchasing, negotiation, quality checks and consolidation.',
    },
  },
  {
    href: '/services/agent-sourcing-chine',
    title: { fr: 'Agent sourcing Chine Afrique', en: 'China sourcing agent for West Africa' },
    description: {
      fr: 'Service sourcing complet : Alibaba, 1688, usines, négociation, paiement, inspection et fret.',
      en: 'Full sourcing service: Alibaba, 1688, factories, negotiation, payment, inspection and freight.',
    },
  },
  {
    href: '/services/achat-alibaba-mali',
    title: { fr: 'Achat Alibaba depuis le Mali', en: 'Alibaba buying agent for Mali' },
    description: {
      fr: 'Achetez sur Alibaba sans arnaque avec vérification fournisseur, paiement sécurisé et livraison.',
      en: 'Buy on Alibaba safely with supplier verification, secure payment and delivery.',
    },
  },
  {
    href: '/services/paiement-fournisseur-chine',
    title: { fr: 'Paiement fournisseur chinois', en: 'Chinese supplier payment' },
    description: {
      fr: 'Paiement Alipay ou virement avec preuve de paiement et suivi fournisseur.',
      en: 'Alipay or Chinese bank transfer support with payment proof and supplier follow-up.',
    },
  },
  {
    href: '/services/verification-fournisseur-chine',
    title: { fr: 'Vérification fournisseur Chine', en: 'China supplier verification' },
    description: {
      fr: 'Contrôle des fournisseurs avant paiement, inspection photo et réduction des risques.',
      en: 'Supplier checks before payment, photo inspection and fraud-risk reduction.',
    },
  },
  {
    href: '/services/air-freight',
    title: { fr: 'Fret aérien Chine-Mali', en: 'Air freight China to Mali' },
    description: {
      fr: 'Cargo aérien vers Bamako en 14-21 jours pour les marchandises urgentes.',
      en: 'Air cargo to Bamako in 14-21 days for urgent goods.',
    },
  },
  {
    href: '/services/sea-freight',
    title: { fr: 'Fret maritime Chine-Mali', en: 'Sea freight China to Mali' },
    description: {
      fr: 'FCL, LCL et groupage maritime via ports d’Afrique de l’Ouest vers Bamako.',
      en: 'FCL, LCL and consolidation via West African ports to Bamako.',
    },
  },
  {
    href: '/calculateur',
    title: { fr: 'Calculateur de fret', en: 'Freight calculator' },
    description: {
      fr: 'Estimez le coût de transport Chine-Mali selon poids, volume et mode de fret.',
      en: 'Estimate China-Mali shipping costs by weight, volume and freight mode.',
    },
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'China-Mali Business Services | Sourcing, Payments, Freight'
      : 'Services Chine-Mali | Sourcing, Paiement, Fret',
    description: isEn
      ? 'ChinaLink Express services for doing business with China from Mali and Africa: sourcing, supplier payment, verification, air freight, sea freight and cost calculator.'
      : 'Tous les services ChinaLink Express pour importer de Chine au Mali : sourcing, paiement fournisseur, vérification, fret aérien, fret maritime et calculateur.',
    keywords: isEn
      ? 'China Mali business services, China sourcing Africa, supplier payment China, China supplier verification, freight China Mali, China Africa logistics'
      : 'services Chine Mali, sourcing Chine Mali, paiement fournisseur chinois, fret Chine Mali, transitaire Chine Mali, vérification fournisseur Chine, achat Alibaba Mali',
    path: '/services',
    locale: locale as Locale,
  });
}

export default async function ServicesHub({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const textLocale = isEn ? 'en' : 'fr';

  return (
    <>
      <StructuredData type="organization" />
      <main className="min-h-screen bg-white pt-28 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
            {isEn ? 'ChinaLink Express Services' : 'Services ChinaLink Express'}
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            {isEn ? 'Services for doing business with China from Mali and Africa' : 'Services pour importer de Chine au Mali'}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            {isEn
              ? 'One partner to find the supplier, secure payment, verify quality and ship goods from China to Bamako or across Africa.'
              : 'Un seul partenaire pour trouver le fournisseur, sécuriser le paiement, vérifier la qualité et expédier vos marchandises de la Chine vers Bamako.'}
          </p>

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
      </main>
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
