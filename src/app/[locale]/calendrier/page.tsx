/**
 * /calendrier — the shipping calendar.
 *
 * Server component so the dates and cutoffs are in the HTML: this page exists
 * to answer "quand dois-je expédier pour la rentrée / le Ramadan", which is a
 * question asked to a search engine as often as to us.
 *
 * `fetchPublicOccasions` returns an empty list rather than throwing, so an API
 * outage costs the deadlines, not the page.
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
import { OccasionsPage } from '@/features/occasions/OccasionsPage';
import { fetchPublicOccasions } from '@/lib/publicOccasionsApi';

interface CalendrierPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CalendrierPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Shipping calendar: when to ship from China | ChinaLink Express'
      : "Calendrier d'expédition : quand expédier de Chine | ChinaLink Express",
    description: isEn
      ? 'For Ramadan, back to school and the end-of-year holidays: the last day to ship from China by air or sea to reach Mali in time.'
      : "Pour le Ramadan, la rentrée scolaire et les fêtes de fin d'année : le dernier jour pour expédier de Chine par avion ou par bateau et arriver à temps au Mali.",
    keywords: isEn
      ? 'shipping calendar china mali, when to ship from china, ramadan shipping deadline, back to school shipping china'
      : "calendrier expedition chine mali, quand expedier de chine, delai ramadan chine mali, rentree scolaire expedition chine, date limite expedition chine",
    path: '/calendrier',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function CalendrierPage({ params }: CalendrierPageProps) {
  const { locale } = await params;

  const validLocale = i18nConfig.locales.includes(locale as Locale)
    ? locale
    : i18nConfig.defaultLocale;

  setRequestLocale(validLocale);
  const isEn = validLocale === 'en';

  // Everything visible: the page is the full calendar, not a teaser for it.
  const occasions = await fetchPublicOccasions(24);

  return (
    <>
      <StructuredData
        schemas={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema(
            [
              { name: isEn ? 'Home' : 'Accueil', url: `/${validLocale}/` },
              {
                name: isEn ? 'Shipping calendar' : "Calendrier d'expédition",
                url: `/${validLocale}/calendrier/`,
              },
            ],
            validLocale as Locale,
          ),
        ]}
      />
      <OccasionsPage occasions={occasions} />
    </>
  );
}
