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
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Client Reviews | ChinaLink Express'
      : isZh ? '客户评价 | ChinaLink Express' : isAr ? 'آراء العملاء | ChinaLink Express' : 'Avis clients | ChinaLink Express',
    description: isEn
      ? 'Reviews written by ChinaLink Express clients in the app after their delivery from China to Bamako, with the team\u2019s replies.'
      : isZh ? 'ChinaLink Express 客户在货物从中国运抵巴马科后，在应用内写下的评价，以及团队的回复。' : isAr ? 'آراء كتبها عملاء ChinaLink Express داخل التطبيق بعد استلام شحناتهم من الصين إلى باماكو، مع ردود الفريق.' : "Les avis écrits par les clients de ChinaLink Express dans l'application après leur livraison de Chine à Bamako, avec les réponses de l'équipe.",
    keywords: isEn
      ? 'chinalink express reviews, china mali freight forwarder reviews, shipping china bamako reviews, client testimonials'
      : isZh ? 'ChinaLink Express 评价, 中国马里货代评价, 中国巴马科货运评价, 中国进口客户反馈' : isAr ? 'آراء ChinaLink Express، تقييم وكيل الشحن من الصين إلى مالي، آراء الشحن من الصين إلى باماكو، شهادات عملاء الاستيراد من الصين' : 'avis chinalink express, avis transitaire chine mali, avis expedition chine bamako, temoignages clients import chine',
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
  const isZh = validLocale === 'zh';
  const isAr = validLocale === 'ar';
  const { reviews, stats } = await fetchPublicReviews(100);

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(
      [
        { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${validLocale}/` },
        { name: isEn ? 'Reviews' : isZh ? '评价' : isAr ? 'الآراء' : 'Avis', url: `/${validLocale}/avis/` },
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
