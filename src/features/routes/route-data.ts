
import type { Locale } from '@/i18n/config';/**
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

type RouteCopy = Record<Locale, RouteData>;

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
    zh: {
      origin: { country: '中国', city: '佛山', code: 'CN' },
      destination: { country: '马里', city: '巴马科', code: 'ML' },
      airFreight: {
        duration: '14-21 天',
        routes: [
          { via: '亚的斯亚贝巴', path: 'Guangzhou → Addis → Bamako' },
          { via: '迪拜', path: 'Shanghai → Dubai → Bamako' },
        ],
      },
      seaFreight: {
        duration: '60-75 天',
        routes: [{ via: '达喀尔 + 公路', path: 'Foshan → Dakar → Bamako (terrestre)' }],
      },
    },
    ar: {
      origin: { country: 'الصين', city: 'فوشان', code: 'CN' },
      destination: { country: 'مالي', city: 'باماكو', code: 'ML' },
      airFreight: {
        duration: '14-21 يومًا',
        routes: [
          { via: 'أديس أبابا', path: 'Guangzhou → Addis → Bamako' },
          { via: 'دبي', path: 'Shanghai → Dubai → Bamako' },
        ],
      },
      seaFreight: {
        duration: '60-75 يومًا',
        routes: [{ via: 'داكار + طريق بري', path: 'Foshan → Dakar → Bamako (terrestre)' }],
      },
    },
  },
  'china-to-africa': {
    fr: {
      origin: { country: 'Chine', city: 'Guangzhou / Shanghai / Shenzhen', code: 'CN' },
      destination: { country: 'Afrique de l’Ouest', city: 'Bamako', code: 'WA' },
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
        ],
      },
    },
    en: {
      origin: { country: 'China', city: 'Guangzhou / Shanghai / Shenzhen', code: 'CN' },
      destination: { country: 'West Africa', city: 'Bamako', code: 'WA' },
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
        ],
      },
    },
    zh: {
      origin: { country: '中国', city: '广州 / 上海 / 深圳', code: 'CN' },
      destination: { country: '西非', city: '巴马科', code: 'WA' },
      airFreight: {
        duration: '12-21 天',
        routes: [
          { via: '迪拜', path: 'Chine → Dubai → Afrique de l’Ouest' },
          { via: '亚的斯亚贝巴', path: 'Chine → Addis → Afrique de l’Ouest' },
        ],
      },
      seaFreight: {
        duration: '40-75 天',
        routes: [
          { via: '达喀尔', path: 'Foshan → Dakar → Bamako (terrestre)' },
        ],
      },
    },
    ar: {
      origin: { country: 'الصين', city: 'قوانغتشو / شنغهاي / شنتشن', code: 'CN' },
      destination: { country: 'غرب أفريقيا', city: 'باماكو', code: 'WA' },
      airFreight: {
        duration: '12-21 يومًا',
        routes: [
          { via: 'دبي', path: 'Chine → Dubai → Afrique de l’Ouest' },
          { via: 'أديس أبابا', path: 'Chine → Addis → Afrique de l’Ouest' },
        ],
      },
      seaFreight: {
        duration: '40-75 يومًا',
        routes: [
          { via: 'داكار', path: 'Foshan → Dakar → Bamako (terrestre)' },
        ],
      },
    },
  },
};

export function getRouteData(routeKey: string, locale: RouteLocale = 'fr'): RouteData | null {
  const route = ROUTES[routeKey];
  if (!route) return null;
  return route[locale as Locale];
}
