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
    title: 'Agent sourcing Chine pour le Mali',
    description: 'Recherche fournisseurs, achat Alibaba/1688, négociation, contrôle qualité et consolidation.',
  },
  {
    href: '/services/paiement-fournisseur-chine',
    frOnly: true,
    title: 'Paiement fournisseur chinois',
    description: 'Paiement Alipay, WeChat Pay ou virement avec preuve de paiement et suivi fournisseur.',
  },
  {
    href: '/services/verification-fournisseur-chine',
    frOnly: true,
    title: 'Vérification fournisseur Chine',
    description: 'Contrôle des fournisseurs avant paiement, inspection photo et réduction des risques.',
  },
  {
    href: '/services/air-freight',
    title: 'Fret aérien Chine-Mali',
    description: 'Cargo aérien vers Bamako en 14-21 jours pour les marchandises urgentes.',
  },
  {
    href: '/services/sea-freight',
    title: 'Fret maritime Chine-Mali',
    description: 'FCL, LCL et groupage maritime via ports d’Afrique de l’Ouest vers Bamako.',
  },
  {
    href: '/calculateur',
    title: 'Calculateur de fret',
    description: 'Estimez le coût de transport Chine-Mali selon poids, volume et mode de fret.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Services Chine-Mali | Sourcing, Paiement, Fret',
    description:
      'Tous les services ChinaLink Express pour importer de Chine au Mali : sourcing, paiement fournisseur, vérification, fret aérien, fret maritime et calculateur.',
    keywords:
      'services Chine Mali, sourcing Chine Mali, paiement fournisseur chinois, fret Chine Mali, transitaire Chine Mali',
    path: '/services',
    locale: locale as Locale,
  });
}

export default async function ServicesHub({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData type="organization" />
      <main className="min-h-screen bg-white pt-28 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Services ChinaLink Express
          </p>
          <h1 className="max-w-4xl text-4xl font-black md:text-6xl">
            Services pour importer de Chine au Mali
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Un seul partenaire pour trouver le fournisseur, sécuriser le paiement, vérifier la qualité et expédier vos marchandises de la Chine vers Bamako.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={`/${'frOnly' in service && service.frOnly ? 'fr' : locale}${service.href}`}
                className="rounded-lg border border-slate-200 p-6 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:hover:border-blue-700 dark:hover:bg-slate-900"
              >
                <h2 className="text-xl font-bold">{service.title}</h2>
                <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">{service.description}</p>
              </Link>
            ))}
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
