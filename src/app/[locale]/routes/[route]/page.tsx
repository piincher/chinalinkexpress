/**
 * Country-route pages.
 *
 * One dynamic segment replaces ten hand-maintained folders that differed only
 * by a slug, a destination name and a transit range. The URLs are unchanged and
 * every lane is still statically generated for all four locales.
 *
 * `routes/china-to-mali` keeps its own static folder — the App Router matches a
 * static segment before a sibling dynamic one, so it wins without special
 * casing. Anything not in ROUTE_LANES 404s rather than rendering an empty page.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { RouteStructuredData } from '@/components/seo';
import { RoutePage } from '@/features/routes/RoutePage';
import {
  ROUTE_SLUGS,
  getRouteLane,
  getRouteSeo,
  createRouteBreadcrumbs,
} from '@/features/routes/createRoutePage';

interface Props {
  params: Promise<{ locale: string; route: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, route } = await params;
  if (!getRouteLane(route)) return {};

  const seo = getRouteSeo(route, locale as Locale);
  return generatePageMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: `/routes/${route}`,
    locale: locale as Locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale, route } = await params;
  const lane = getRouteLane(route);
  if (!lane) notFound();

  setRequestLocale(locale);
  const seo = getRouteSeo(route, locale as Locale);

  return (
    <>
      <RouteStructuredData
        route={{
          origin: 'China',
          destination: lane.destination,
          durationDays: lane.durationDays,
          methods: ['air', 'sea'],
        }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={createRouteBreadcrumbs(route, locale, seo.breadcrumb)}
      />
      <RoutePage
        locale={locale}
        routeKey={route}
        country={seo.country}
        capital={seo.capital}
      />
    </>
  );
}

/**
 * Both params are returned explicitly. The parent `[locale]` segment has its
 * own generateStaticParams, but enumerating the full cross-product here is what
 * guarantees all forty pages are prerendered rather than falling back to
 * on-demand rendering for locales the parent happens not to emit.
 */
export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    ROUTE_SLUGS.map((route) => ({ locale, route }))
  );
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
