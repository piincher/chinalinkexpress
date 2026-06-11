import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { RouteStructuredData } from '@/components/seo';
import { RoutePage } from '@/features/routes/RoutePage';
import { getRouteSeo } from '@/features/routes/route-seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = getRouteSeo('china-to-togo', locale as Locale);
  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: '/routes/china-to-togo',
    locale: locale as Locale,
  });
}

export default async function ChinaToTogoRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const seo = getRouteSeo('china-to-togo', locale as Locale);

  const breadcrumbs = [
    { name: locale === 'en' ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-togo` },
    { name: seo.breadcrumb, url: `/${locale}/routes/china-to-togo` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Togo', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-togo" country={seo.country} capital={seo.capital} />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
