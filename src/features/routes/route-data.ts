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
      duration: '7-12 jours',
      routes: [
        { via: 'Direct', path: 'Guangzhou → Bamako' },
        { via: 'Addis Abeba', path: 'Guangzhou → Addis → Bamako' },
        { via: 'Dubai', path: 'Shanghai → Dubai → Bamako' },
      ],
    },
    seaFreight: {
      duration: '45-60 jours',
      routes: [
        { via: 'Lomé', path: 'Shanghai → Lomé → Bamako' },
        { via: 'Dakar', path: 'Ningbo → Dakar → Bamako' },
        { via: 'Abidjan', path: 'Shenzhen → Abidjan → Bamako' },
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
      duration: '8-14 jours',
      routes: [
        { via: 'Direct', path: 'Guangzhou → Dakar' },
        { via: 'Paris', path: 'Shanghai → Paris → Dakar' },
      ],
    },
    seaFreight: {
      duration: '40-50 jours',
      routes: [
        { via: 'Direct', path: 'Ningbo → Dakar' },
        { via: 'Barcelone', path: 'Shanghai → Barcelone → Dakar' },
      ],
    },
  },
  'china-to-ivory-coast': {
    origin: {
      country: 'Chine',
      city: 'Guangzhou / Shanghai',
      code: 'CN',
    },
    destination: {
      country: "Côte d'Ivoire",
      city: 'Abidjan',
      code: 'CI',
    },
    airFreight: {
      duration: '8-12 jours',
      routes: [
        { via: 'Addis', path: 'Guangzhou → Addis → Abidjan' },
        { via: 'Dubai', path: 'Shanghai → Dubai → Abidjan' },
      ],
    },
    seaFreight: {
      duration: '42-52 jours',
      routes: [
        { via: 'Direct', path: 'Shenzhen → Abidjan' },
        { via: 'Lomé', path: 'Ningbo → Lomé → Abidjan' },
      ],
    },
  },
};

export function getRouteData(routeKey: string): RouteData | null {
  return ROUTES[routeKey] || null;
}
