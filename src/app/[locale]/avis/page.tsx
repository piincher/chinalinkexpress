/**
 * /avis — the public reviews page.
 *
 * Server component: it fetches the real reviews so their text is in the HTML,
 * then hands them to the client view. `fetchPublicReviews` returns an empty
 * payload rather than throwing, so an API outage costs the reviews, not the
 * page.
 *
 * Deliberately no `Review` or `aggregateRating` structured data. Reviews a
 * business collects about itself are not eligible for review rich results, and
 * this site has already paid once for markup that claimed otherwise — an
 * `aggregateRating` of 4.8 from 127 reviews when the collection held two.
 * Breadcrumb + Organization only.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import {
  generatePageMetadata,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { ReviewsPage } from '@/features/reviews/ReviewsPage';
import { fetchPublicReviews } from '@/lib/publicReviewsApi';

interface AvisPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AvisPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Client Reviews | ChinaLink Express'
      : 'Avis clients | ChinaLink Express',
    description: isEn
      ? 'Reviews written by ChinaLink Express clients in the app after their delivery from China to Bamako, with the team\u2019s replies.'
      : "Les avis écrits par les clients de ChinaLink Express dans l'application après leur livraison de Chine à Bamako, avec les réponses de l'équipe.",
    keywords: isEn
      ? 'chinalink express reviews, china mali freight forwarder reviews, shipping china bamako reviews, client testimonials'
      : 'avis chinalink express, avis transitaire chine mali, avis expedition chine bamako, temoignages clients import chine',
    path: '/avis',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function AvisPage({ params }: AvisPageProps) {
  const { locale } = await params;

  const validLocale = i18nConfig.locales.includes(locale as Locale)
    ? locale
    : i18nConfig.defaultLocale;

  setRequestLocale(validLocale);

  const isEn = validLocale === 'en';
  const { reviews, stats } = await fetchPublicReviews(100);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(
      [
        { name: isEn ? 'Home' : 'Accueil', url: `/${validLocale}/` },
        { name: isEn ? 'Reviews' : 'Avis', url: `/${validLocale}/avis/` },
      ],
      validLocale as Locale,
    ),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <ReviewsPage reviews={reviews} stats={stats} />
    </>
  );
}
