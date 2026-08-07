/**
 * Shared data and helpers for the country-route pages.
 *
 * There were eleven near-identical `page.tsx` files under
 * `app/[locale]/routes/*`, fifty-four lines each and differing only by a slug,
 * a destination name and a transit-day range — the largest clone group in the
 * codebase. Ten of them are now served by a single dynamic segment,
 * `routes/[route]/page.tsx`, and the per-lane facts live in the map below.
 *
 * `china-to-mali` keeps its own folder: it carries a visible breadcrumb, extra
 * FAQ structured data and hand-written copy. A static segment takes precedence
 * over a sibling dynamic one in the App Router, so it continues to win the
 * match without any special casing here.
 */

import { getRouteSeo } from './route-seo';

export interface RouteLane {
  /** Destination as it appears in structured data. */
  destination: string;
  /** Door-to-door transit range across both modes, in days. */
  durationDays: { min: number; max: number };
}

/**
 * The lanes served by the dynamic segment. `china-to-mali` is intentionally
 * absent — see the note above.
 */
export const ROUTE_LANES: Record<string, RouteLane> = {
  'china-to-africa': { destination: 'West Africa', durationDays: { min: 12, max: 75 } },
  'china-to-benin': { destination: 'Benin', durationDays: { min: 12, max: 60 } },
  'china-to-burkina-faso': { destination: 'Burkina Faso', durationDays: { min: 14, max: 75 } },
  'china-to-cote-divoire': { destination: 'Ivory Coast', durationDays: { min: 12, max: 60 } },
  'china-to-ghana': { destination: 'Ghana', durationDays: { min: 12, max: 60 } },
  'china-to-guinea': { destination: 'Guinea', durationDays: { min: 12, max: 60 } },
  'china-to-niger': { destination: 'Niger', durationDays: { min: 14, max: 75 } },
  'china-to-nigeria': { destination: 'Nigeria', durationDays: { min: 10, max: 60 } },
  'china-to-senegal': { destination: 'Senegal', durationDays: { min: 12, max: 60 } },
  'china-to-togo': { destination: 'Togo', durationDays: { min: 12, max: 60 } },
};

export const ROUTE_SLUGS = Object.keys(ROUTE_LANES);

export function getRouteLane(slug: string): RouteLane | undefined {
  return ROUTE_LANES[slug];
}

export function createRouteBreadcrumbs(slug: string, locale: string, breadcrumb: string) {
  return [
    { name: locale === 'en' ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/${slug}` },
    { name: breadcrumb, url: `/${locale}/routes/${slug}` },
  ];
}

export { getRouteSeo };
