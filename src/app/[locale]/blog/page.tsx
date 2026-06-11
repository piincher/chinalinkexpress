import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { getBlogPosts } from '@/features/seo-content/blog-content';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn ? 'China-Africa Import Blog | Freight, Sourcing & Customs Guides' : 'Blog Import Chine Mali | Guides & Conseils',
    description: isEn
      ? 'Practical guides for importing from China to Mali and West Africa. Freight, customs, sourcing, supplier payment and expert logistics advice.'
      : 'Retrouvez nos guides pratiques pour importer de la Chine vers le Mali. Fret, douanes, sourcing, paiement fournisseur et conseils d’experts.',
    keywords: isEn
      ? 'China Africa import blog, import from China to Mali, China freight guide, sourcing China Africa, Mali customs guide'
      : 'blog import Chine Mali, guide import Chine, conseils importation Mali, fret Chine Mali, sourcing Chine, douane Mali',
    path: '/blog',
    locale: locale as Locale,
    supportedLocales: ['fr', 'en'],
    ogType: 'website',
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === 'en';
  setRequestLocale(locale);

  const posts = getBlogPosts(locale as Locale);
  const quickLinks = isEn
    ? [
        { href: '/en/cargo-chine-mali', label: 'China to Mali cargo' },
        { href: '/en/routes/china-to-africa', label: 'China to Africa routes' },
        { href: '/en/services/sourcing', label: 'China sourcing agent' },
        { href: '/en/services/paiement-fournisseur-chine', label: 'Supplier payment' },
        { href: '/en/calculateur', label: 'Freight calculator' },
      ]
    : [
        { href: '/fr/cargo-chine-mali', label: 'Cargo Chine-Mali' },
        { href: '/fr/routes/china-to-mali', label: 'Fret Chine-Mali' },
        { href: '/fr/services/sourcing', label: 'Agent sourcing Chine' },
        { href: '/fr/services/paiement-fournisseur-chine', label: 'Paiement fournisseur' },
        { href: '/fr/calculateur', label: 'Calculateur de fret' },
      ];

  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="bg-slate-950 pt-28 pb-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
            {isEn ? 'ChinaLink Express Blog' : 'Blog ChinaLink Express'}
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            {isEn ? 'China-Africa Import Guides' : 'Blog Import Chine Mali — Guides & Conseils'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            {isEn
              ? 'Practical advice for importing from China to Mali and West Africa: freight, customs, sourcing, supplier payment and logistics explained clearly.'
              : 'Tous nos conseils pour importer de la Chine vers le Mali en toute sécurité. Fret, douanes, sourcing, paiement et logistique expliqués simplement.'}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {isEn ? 'Useful pages for importing from China to Africa' : 'Pages utiles pour importer de Chine au Mali'}
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
                {post.description}
              </p>
              <div className="mt-6">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {isEn ? 'Read article' : 'Lire l’article'} →
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
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
