import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';

interface Props {
  params: Promise<{ locale: string }>;
}

const posts = [
  {
    slug: 'comment-importer-chine-mali-2026',
    title: 'Comment Importer de la Chine vers le Mali en 2026 (Guide Complet)',
    excerpt: 'Guide étape par étape pour importer du Mali depuis la Chine. Documents, douanes, tarifs, délais. Tout ce qu\'il faut savoir.',
    date: '2026-04-21',
    readTime: '8 min',
    category: 'Guide',
  },
  {
    slug: 'cargo-chine-mali-guide-complet',
    title: 'Cargo Chine Mali : Le Guide Complet du Fret Aérien et Maritime',
    excerpt: 'Tout savoir sur le cargo Chine-Mali. Fret aérien vs maritime, tarifs, délais, douanes. Guide pratique avec devis gratuit.',
    date: '2026-04-18',
    readTime: '6 min',
    category: 'Fret',
  },
  {
    slug: 'acheter-alibaba-mali-sans-arnaque',
    title: 'Comment Acheter sur Alibaba depuis le Mali Sans Se Faire Arnaquer',
    excerpt: 'Guide étape par étape pour acheter sur Alibaba depuis le Mali. Vérification, paiement, expédition. Évitez les arnaques !',
    date: '2026-04-15',
    readTime: '7 min',
    category: 'Sourcing',
  },
  {
    slug: 'paiement-fournisseur-chine-guide',
    title: 'Paiement Fournisseur Chinois : Alipay, WeChat Pay, Virement — Guide Mali',
    excerpt: 'Comparez les méthodes de paiement fournisseur en Chine. Sécurité, frais, délais. Guide pour les importateurs au Mali.',
    date: '2026-04-10',
    readTime: '5 min',
    category: 'Paiement',
  },
  {
    slug: 'douane-mali-import-chine',
    title: 'Douane Mali : Tout Ce Qu\'il Faut Savoir pour Importer de Chine',
    excerpt: 'Documents requis, droits de douane, TVA, procédures DGD Mali. Guide complet pour un dédouanement sans encombre.',
    date: '2026-04-05',
    readTime: '6 min',
    category: 'Douane',
  },
  {
    slug: 'conteneur-chine-mali-prix-2026',
    title: 'Conteneur Chine Mali : Prix, Délais et Démarches en 2026',
    excerpt: 'FCL 20ft, FCL 40ft, LCL groupage. Tarifs indicatifs, délais, ports de départ et arrivée. Tout pour votre conteneur.',
    date: '2026-04-01',
    readTime: '5 min',
    category: 'Fret',
  },
];

const quickLinks = [
  { href: '/fr/cargo-chine-mali', label: 'Cargo Chine-Mali' },
  { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
  { href: '/fr/services/sourcing', label: 'Agent sourcing Chine' },
  { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur' },
  { href: '/fr/calculateur', label: 'Calculateur de fret' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Blog Import Chine Mali | Guides & Conseils',
    description:
      'Retrouvez nos guides pratiques pour importer de la Chine vers le Mali. Fret, douanes, sourcing, paiement fournisseur et conseils d\'experts.',
    keywords:
      'blog import Chine Mali, guide import Chine, conseils importation Mali, fret Chine Mali, sourcing Chine, douane Mali',
    path: '/blog',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="bg-slate-950 pt-28 pb-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
            Blog ChinaLink Express
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Blog Import Chine Mali — Guides & Conseils
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            Tous nos conseils pour importer de la Chine vers le Mali en toute sécurité.
            Fret, douanes, sourcing, paiement et logistique expliqués simplement.
          </p>
        </div>
      </section>

      {/* Priority Links */}
      <section className="border-b border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Pages utiles pour importer de Chine au Mali
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950 dark:text-blue-300 dark:hover:border-blue-700 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800"
            >
              <div className="mb-4 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <Link href={`/${locale}/blog/${post.slug}`} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
              <div className="mt-6">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Lire l&apos;article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
