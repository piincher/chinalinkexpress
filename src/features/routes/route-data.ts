/**
 * Localized route data for shipping routes from China to African destinations.
 */

export type RouteLocale = 'fr' | 'en' | 'zh' | 'ar';

export interface RouteData {
  origin: { country: string; city: string; code: string };
  destination: { country: string; city: string; code: string };
  airFreight: {
    duration: string;
    routes: Array<{ via: string; path: string }>;
  };
  seaFreight: {
    duration: string;
    routes: Array<{ via: string; path: string }>;
  };
}

type RouteCopy = Record<'fr' | 'en', RouteData>;

const cityRoutes = {
  senegal: {
    slug: 'china-to-senegal',
    code: 'SN',
    frCountry: 'Sénégal',
    enCountry: 'Senegal',
    city: 'Dakar',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
  },
  coteDivoire: {
    slug: 'china-to-cote-divoire',
    code: 'CI',
    frCountry: 'Côte d’Ivoire',
    enCountry: 'Ivory Coast',
    city: 'Abidjan',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
  },
  nigeria: {
    slug: 'china-to-nigeria',
    code: 'NG',
    frCountry: 'Nigeria',
    enCountry: 'Nigeria',
    city: 'Lagos',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '40-60 days',
    seaDurationFr: '40-60 jours',
  },
  ghana: {
    slug: 'china-to-ghana',
    code: 'GH',
    frCountry: 'Ghana',
    enCountry: 'Ghana',
    city: 'Accra / Tema',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '40-60 days',
    seaDurationFr: '40-60 jours',
  },
  burkinaFaso: {
    slug: 'china-to-burkina-faso',
    code: 'BF',
    frCountry: 'Burkina Faso',
    enCountry: 'Burkina Faso',
    city: 'Ouagadougou',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    seaDurationEn: '60-75 days',
    seaDurationFr: '60-75 jours',
  },
  niger: {
    slug: 'china-to-niger',
    code: 'NE',
    frCountry: 'Niger',
    enCountry: 'Niger',
    city: 'Niamey',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    seaDurationEn: '60-75 days',
    seaDurationFr: '60-75 jours',
  },
  benin: {
    slug: 'china-to-benin',
    code: 'BJ',
    frCountry: 'Bénin',
    enCountry: 'Benin',
    city: 'Cotonou',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
  },
  togo: {
    slug: 'china-to-togo',
    code: 'TG',
    frCountry: 'Togo',
    enCountry: 'Togo',
    city: 'Lomé',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
  },
  guinea: {
    slug: 'china-to-guinea',
    code: 'GN',
    frCountry: 'Guinée',
    enCountry: 'Guinea',
    city: 'Conakry',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    seaDurationEn: '50-70 days',
    seaDurationFr: '50-70 jours',
  },
} as const;

function makeCoastalRoute(route: (typeof cityRoutes)[keyof typeof cityRoutes]): RouteCopy {
  return {
    fr: {
      origin: { country: 'Chine', city: 'Guangzhou / Shanghai', code: 'CN' },
      destination: { country: route.frCountry, city: route.city, code: route.code },
      airFreight: {
        duration: route.airDurationFr,
        routes: [
          { via: 'Dubai', path: `Guangzhou → Dubai → ${route.city}` },
          { via: 'Addis Abeba', path: `Shanghai → Addis → ${route.city}` },
        ],
      },
      seaFreight: {
        duration: route.seaDurationFr,
        routes: [
          { via: route.city.split(' / ')[0], path: `Shanghai → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Ningbo → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Shenzhen → ${route.city.split(' / ')[0]}` },
        ],
      },
    },
    en: {
      origin: { country: 'China', city: 'Guangzhou / Shanghai', code: 'CN' },
      destination: { country: route.enCountry, city: route.city, code: route.code },
      airFreight: {
        duration: route.airDurationEn,
        routes: [
          { via: 'Dubai', path: `Guangzhou → Dubai → ${route.city}` },
          { via: 'Addis Ababa', path: `Shanghai → Addis → ${route.city}` },
        ],
      },
      seaFreight: {
        duration: route.seaDurationEn,
        routes: [
          { via: route.city.split(' / ')[0], path: `Shanghai → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Ningbo → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Shenzhen → ${route.city.split(' / ')[0]}` },
        ],
      },
    },
  };
}

const ROUTES: Record<string, RouteCopy> = {
  'china-to-mali': {
    fr: {
      origin: { country: 'Chine', city: 'Foshan', code: 'CN' },
      destination: { country: 'Mali', city: 'Bamako', code: 'ML' },
      airFreight: {
        duration: '14-21 jours',
        routes: [
          { via: 'Addis Abeba', path: 'Guangzhou → Addis → Bamako' },
          { via: 'Dubai', path: 'Shanghai → Dubai → Bamako' },
        ],
      },
      seaFreight: {
        duration: '60-75 jours',
        routes: [{ via: 'Dakar + route', path: 'Foshan → Dakar → Bamako (terrestre)' }],
      },
    },
    en: {
      origin: { country: 'China', city: 'Foshan', code: 'CN' },
      destination: { country: 'Mali', city: 'Bamako', code: 'ML' },
      airFreight: {
        duration: '14-21 days',
        routes: [
          { via: 'Addis Ababa', path: 'Guangzhou → Addis → Bamako' },
          { via: 'Dubai', path: 'Shanghai → Dubai → Bamako' },
        ],
      },
      seaFreight: {
        duration: '60-75 days',
        routes: [{ via: 'Dakar + road', path: 'Foshan → Dakar → Bamako (land transit)' }],
      },
    },
  },
  'china-to-africa': {
    fr: {
      origin: { country: 'Chine', city: 'Guangzhou / Shanghai / Shenzhen', code: 'CN' },
      destination: { country: 'Afrique de l’Ouest', city: 'Bamako / Dakar / Abidjan / Lagos / Accra', code: 'WA' },
      airFreight: {
        duration: '12-21 jours',
        routes: [
          { via: 'Dubai', path: 'Chine → Dubai → Afrique de l’Ouest' },
          { via: 'Addis Abeba', path: 'Chine → Addis → Afrique de l’Ouest' },
        ],
      },
      seaFreight: {
        duration: '40-75 jours',
        routes: [
          { via: 'Dakar', path: 'Foshan → Dakar → Bamako (terrestre)' },
          { via: 'Lagos', path: 'Guangzhou → Lagos' },
          { via: 'Abidjan', path: 'Shenzhen → Abidjan' },
        ],
      },
    },
    en: {
      origin: { country: 'China', city: 'Guangzhou / Shanghai / Shenzhen', code: 'CN' },
      destination: { country: 'West Africa', city: 'Bamako / Dakar / Abidjan / Lagos / Accra', code: 'WA' },
      airFreight: {
        duration: '12-21 days',
        routes: [
          { via: 'Dubai', path: 'China → Dubai → West Africa' },
          { via: 'Addis Ababa', path: 'China → Addis → West Africa' },
        ],
      },
      seaFreight: {
        duration: '40-75 days',
        routes: [
          { via: 'Dakar', path: 'Foshan → Dakar → Bamako (land transit)' },
          { via: 'Lagos', path: 'Guangzhou → Lagos' },
          { via: 'Abidjan', path: 'Shenzhen → Abidjan' },
        ],
      },
    },
  },
  [cityRoutes.senegal.slug]: makeCoastalRoute(cityRoutes.senegal),
  [cityRoutes.coteDivoire.slug]: makeCoastalRoute(cityRoutes.coteDivoire),
  [cityRoutes.nigeria.slug]: makeCoastalRoute(cityRoutes.nigeria),
  [cityRoutes.ghana.slug]: makeCoastalRoute(cityRoutes.ghana),
  [cityRoutes.burkinaFaso.slug]: makeCoastalRoute(cityRoutes.burkinaFaso),
  [cityRoutes.niger.slug]: makeCoastalRoute(cityRoutes.niger),
  [cityRoutes.benin.slug]: makeCoastalRoute(cityRoutes.benin),
  [cityRoutes.togo.slug]: makeCoastalRoute(cityRoutes.togo),
  [cityRoutes.guinea.slug]: makeCoastalRoute(cityRoutes.guinea),
};

export function getRouteData(routeKey: string, locale: RouteLocale = 'fr'): RouteData | null {
  const route = ROUTES[routeKey];
  if (!route) return null;
  return locale === 'en' ? route.en : route.fr;
}
