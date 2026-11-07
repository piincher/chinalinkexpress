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
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'Shipping calendar: when to ship from China | ChinaLink Express'
      : isZh ? '发货日历：何时从中国发货 | ChinaLink Express' : isAr ? 'تقويم الشحن: متى تشحن من الصين | ChinaLink Express' : "Calendrier d'expédition : quand expédier de Chine | ChinaLink Express",
    description: isEn
      ? 'For Ramadan, back to school and the end-of-year holidays: the last day to ship from China by air or sea to reach Mali in time.'
      : isZh ? '斋月、开学季和年末节日：从中国空运或海运并按时抵达马里的最后发货日期。' : isAr ? 'لرمضان والعودة إلى المدارس وأعياد نهاية العام: آخر موعد للشحن من الصين جوًا أو بحرًا للوصول إلى مالي في الوقت المناسب.' : "Pour le Ramadan, la rentrée scolaire et les fêtes de fin d'année : le dernier jour pour expédier de Chine par avion ou par bateau et arriver à temps au Mali.",
    keywords: isEn
      ? 'shipping calendar china mali, when to ship from china, ramadan shipping deadline, back to school shipping china'
      : isZh ? '中国马里发货日历, 何时从中国发货, 斋月中国马里时效, 开学季中国发货, 中国发货截止日期' : isAr ? 'تقويم الشحن من الصين إلى مالي، متى تشحن من الصين، مهلة رمضان من الصين إلى مالي، شحن العودة إلى المدارس من الصين، آخر موعد للشحن من الصين' : "calendrier expedition chine mali, quand expedier de chine, delai ramadan chine mali, rentree scolaire expedition chine, date limite expedition chine",
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
  const isZh = validLocale === 'zh';
  const isAr = validLocale === 'ar';

  // Everything visible: the page is the full calendar, not a teaser for it.
  const occasions = await fetchPublicOccasions(24);

  return (
    <>
      <StructuredData
        schemas={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema(
            [
              { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${validLocale}/` },
              {
                name: isEn ? 'Shipping calendar' : isZh ? '发货日历' : isAr ? 'تقويم الشحن' : "Calendrier d'expédition",
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
