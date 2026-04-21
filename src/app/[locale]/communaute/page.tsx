/**
 * Communauté / Community Page Route
 *
 * Dedicated page for the ChinaLink Community — a WhatsApp-integrated space
 * where importers share tips, discuss products, and make connections.
 * URL: /fr/communaute, /en/communaute, etc.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { CommunityPage } from '@/features/community/CommunityPage';

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Join the ChinaLink Community | 500+ African Importers'
      : 'Rejoignez la Communauté ChinaLink | 500+ Importateurs Africains',
    description: isEn
      ? 'Join 500+ African importers on WhatsApp. Share tips, discover verified suppliers, get product alerts, and access group buying power.'
      : 'Rejoignez 500+ importateurs africains sur WhatsApp. Échangez conseils, découvrez des fournisseurs vérifiés, recevez des alertes produits et bénéficiez des achats groupés.',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/communaute/`,
      languages: {
        'fr-FR': '/fr/communaute/',
        'en-US': '/en/communaute/',
        'zh-CN': '/zh/communaute/',
        'ar-SA': '/ar/communaute/',
      },
    },
  };
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

  return <CommunityPage />;
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
