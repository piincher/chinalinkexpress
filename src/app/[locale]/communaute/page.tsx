/**
 * Communauté / Community Page Route
 *
 * Dedicated page for the ChinaLink Community Hub — a WhatsApp-integrated space
 * where importers share tips, discuss products, and make connections.
 * URL: /fr/communaute, /en/communaute
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata, generateBreadcrumbSchema, generateOrganizationSchema } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { CommunityPage } from '@/features/community/CommunityPage';

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Join 2,400+ African Importers | ChinaLink Community Hub'
      : 'Rejoignez 2,400+ Importateurs Africains | Communauté ChinaLink',
    description: isEn
      ? 'Join the ChinaLink Express community of 2,400+ African importers. WhatsApp group for sourcing tips, verified suppliers, scam alerts, and container sharing. Free to join!'
      : 'Rejoignez la communauté ChinaLink Express de 2,400+ importateurs africains. Groupe WhatsApp pour conseils sourcing, fournisseurs vérifiés, alertes arnaques et partage de conteneurs. Gratuit !',
    keywords: isEn
      ? 'importers community west africa, china sourcing community, cargo discussion group mali, african importers forum, china import group, whatsapp group import chine, communauté importateurs afrique, groupe whatsapp import chine, alibaba community africa, 1688 discussion group, container sharing mali, bamako importers network, west africa trade community, chinese supplier reviews africa, import tips africa'
      : 'communaute importateurs afrique, groupe whatsapp import chine, forum importateurs mali, communauté sourcing chine, groupe achat alibaba afrique, partage conteneur bamako, alerte arnaque fournisseur chine, conseils importation chine afrique, transitaire communauté, cargo chine mali discussion, importateurs bamako réseau, avis fournisseurs chine afrique, achat groupé chine afrique, guide importation chine mali',
    path: '/communaute',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function CommunautePage({
  params,
}: CommunityPageProps) {
  const { locale } = await params;

  // Validate and set locale
  const validLocale = i18nConfig.locales.includes(locale as Locale)
    ? locale
    : i18nConfig.defaultLocale;

  setRequestLocale(validLocale);

  const isEn = validLocale === 'en';

  // Breadcrumb schema
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: `/${validLocale}/` },
    { name: isEn ? 'Community' : 'Communauté', url: `/${validLocale}/communaute/` },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(breadcrumbs, validLocale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <CommunityPage />
      {/* Moderation link */}
      <div className="bg-slate-950 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            {isEn
              ? 'Need to report an issue or contact a moderator?'
              : 'Un problème à signaler ou besoin de contacter un modérateur ?'}{' '}
            <Link
              href={`/${validLocale}/contact`}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
            >
              {isEn ? 'Contact us' : 'Contactez-nous'}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return ['fr', 'en'].map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
