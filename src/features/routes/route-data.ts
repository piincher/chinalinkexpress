/**
 * Route Data
 * 
 * Static data for shipping routes from China to African destinations.
 */

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

export const ROUTES: Record<string, RouteData> = {
  'china-to-mali': {
    origin: {
      country: 'Chine',
      city: 'Guangzhou / Shanghai',
      code: 'CN',
    },
    destination: {
      country: 'Mali',
      city: 'Bamako',
      code: 'ML',
    },
    airFreight: {
      duration: '14-21 jours',
      routes: [
        { via: 'Addis Abeba', path: 'Guangzhou → Addis → Bamako' },
        { via: 'Dubai', path: 'Shanghai → Dubai → Bamako' },
      ],
    },
    seaFreight: {
      duration: '60-75 jours',
      routes: [
        { via: 'Lomé + route', path: 'Shanghai → Lomé → Bamako (terrestre)' },
        { via: 'Dakar + route', path: 'Ningbo → Dakar → Bamako (terrestre)' },
        { via: 'Abidjan + route', path: 'Shenzhen → Abidjan → Bamako (terrestre)' },
      ],
    },
  },
  'china-to-senegal': {
    origin: {
      country: 'Chine',
      city: 'Guangzhou / Shanghai',
      code: 'CN',
    },
    destination: {
      country: 'Sénégal',
      city: 'Dakar',
      code: 'SN',
    },
    airFreight: {
      duration: '12-20 jours',
      routes: [
        { via: 'Dubai', path: 'Guangzhou → Dubai → Dakar' },
        { via: 'Addis Abeba', path: 'Shanghai → Addis → Dakar' },
      ],
    },
    seaFreight: {
      duration: '45-60 jours',
      routes: [
        { via: 'Dakar', path: 'Shanghai → Dakar' },
        { via: 'Dakar', path: 'Ningbo → Dakar' },
        { via: 'Dakar', path: 'Shenzhen → Dakar' },
      ],
    },
  },
  'china-to-cote-divoire': {
    origin: {
      country: 'Chine',
      city: 'Guangzhou / Shanghai',
      code: 'CN',
    },
    destination: {
      country: 'Côte d’Ivoire',
      city: 'Abidjan',
      code: 'CI',
    },
    airFreight: {
      duration: '12-20 jours',
      routes: [
        { via: 'Dubai', path: 'Guangzhou → Dubai → Abidjan' },
        { via: 'Addis Abeba', path: 'Shanghai → Addis → Abidjan' },
      ],
    },
    seaFreight: {
      duration: '45-60 jours',
      routes: [
        { via: 'Abidjan', path: 'Shanghai → Abidjan' },
        { via: 'Abidjan', path: 'Ningbo → Abidjan' },
        { via: 'Abidjan', path: 'Shenzhen → Abidjan' },
      ],
    },
  },
  'china-to-africa': {
    origin: {
      country: 'Chine',
      city: 'Guangzhou / Shanghai / Shenzhen',
      code: 'CN',
    },
    destination: {
      country: 'Afrique de l’Ouest',
      city: 'Bamako / Dakar / Abidjan',
      code: 'WA',
    },
    airFreight: {
      duration: '12-21 jours',
      routes: [
        { via: 'Dubai', path: 'Chine → Dubai → Afrique de l’Ouest' },
        { via: 'Addis Abeba', path: 'Chine → Addis → Afrique de l’Ouest' },
      ],
    },
    seaFreight: {
      duration: '45-75 jours',
      routes: [
        { via: 'Lomé', path: 'Shanghai → Lomé → pays enclavés' },
        { via: 'Dakar', path: 'Ningbo → Dakar → Sénégal / Mali' },
        { via: 'Abidjan', path: 'Shenzhen → Abidjan → Côte d’Ivoire / Mali' },
      ],
    },
  },
};

export function getRouteData(routeKey: string): RouteData | null {
  return ROUTES[routeKey] || null;
}
