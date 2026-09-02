/**
 * /[locale]/client/[handle] — a reviewer's public profile.
 *
 * Server component: the profile is fetched here so its content is in the HTML
 * for the reader (and so a missing profile is a real 404 rather than an empty
 * page that hydrates into nothing).
 *
 * **noindex, nofollow, and not in the sitemap.** This page is about a person.
 * It is shareable by anyone holding the link — that is the point, a review
 * links to it — but a client's shipping activity must not become findable by
 * searching their name. The reviews page at /avis stays indexed; this does not.
 *
 * The API returns 404 for an unknown handle, a staff author and a client who
 * never published a review alike, so `notFound()` here cannot be used to probe
 * whether a given person is a client of ours.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { fetchPublicClientProfile } from '@/lib/publicProfileApi';
import { PublicProfileView } from '@/features/publicProfile/PublicProfileView';

interface PublicProfilePageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const isEn = locale === 'en';
  const profile = await fetchPublicClientProfile(handle);
  const name = profile?.displayName ?? (isEn ? 'Client' : 'Client');

  return generatePageMetadata({
    title: isEn
      ? `${name} — client reviews | ChinaLink Express`
      : `${name} — avis client | ChinaLink Express`,
    description: isEn
      ? `Shipments and reviews published by ${name}, a ChinaLink Express client.`
      : `Expéditions et avis publiés par ${name}, client ChinaLink Express.`,
    keywords: '',
    path: `/client/${handle}`,
    locale: locale as Locale,
    // The whole reason this page is not in the index: it is about a person.
    noIndex: true,
  });
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { locale, handle } = await params;

  const validLocale = i18nConfig.locales.includes(locale as Locale)
    ? locale
    : i18nConfig.defaultLocale;

  setRequestLocale(validLocale);

  const profile = await fetchPublicClientProfile(handle);
  if (!profile) notFound();

  return <PublicProfileView profile={profile} />;
}
