
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

const cityRoutes = {
  senegal: {
    slug: 'china-to-senegal',
    code: 'SN',
    frCountry: 'Sénégal',
    zhCountry: '塞内加尔',
    arCountry: 'السنغال',
    zhCity: '达喀尔',
    arCity: 'داكار',
    enCountry: 'Senegal',
    city: 'Dakar',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
    seaDurationZh: '45-60 天',
    seaDurationAr: '45-60 يومًا',
  },
  coteDivoire: {
    slug: 'china-to-cote-divoire',
    code: 'CI',
    frCountry: 'Côte d’Ivoire',
    zhCountry: '科特迪瓦',
    arCountry: 'ساحل العاج',
    zhCity: '阿比让',
    arCity: 'أبيدجان',
    enCountry: 'Ivory Coast',
    city: 'Abidjan',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
    seaDurationZh: '45-60 天',
    seaDurationAr: '45-60 يومًا',
  },
  nigeria: {
    slug: 'china-to-nigeria',
    code: 'NG',
    frCountry: 'Nigeria',
    zhCountry: '尼日利亚',
    arCountry: 'نيجيريا',
    zhCity: '拉各斯',
    arCity: 'لاغوس',
    enCountry: 'Nigeria',
    city: 'Lagos',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '40-60 days',
    seaDurationFr: '40-60 jours',
    seaDurationZh: '40-60 天',
    seaDurationAr: '40-60 يومًا',
  },
  ghana: {
    slug: 'china-to-ghana',
    code: 'GH',
    frCountry: 'Ghana',
    zhCountry: '加纳',
    arCountry: 'غانا',
    zhCity: '阿克拉',
    arCity: 'أكرا',
    enCountry: 'Ghana',
    city: 'Accra / Tema',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '40-60 days',
    seaDurationFr: '40-60 jours',
    seaDurationZh: '40-60 天',
    seaDurationAr: '40-60 يومًا',
  },
  burkinaFaso: {
    slug: 'china-to-burkina-faso',
    code: 'BF',
    frCountry: 'Burkina Faso',
    zhCountry: '布基纳法索',
    arCountry: 'بوركينا فاسو',
    zhCity: '瓦加杜古',
    arCity: 'واغادوغو',
    enCountry: 'Burkina Faso',
    city: 'Ouagadougou',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    airDurationZh: '14-21 天',
    airDurationAr: '14-21 يومًا',
    seaDurationEn: '60-75 days',
    seaDurationFr: '60-75 jours',
    seaDurationZh: '60-75 天',
    seaDurationAr: '60-75 يومًا',
  },
  niger: {
    slug: 'china-to-niger',
    code: 'NE',
    frCountry: 'Niger',
    zhCountry: '尼日尔',
    arCountry: 'النيجر',
    zhCity: '尼亚美',
    arCity: 'نيامي',
    enCountry: 'Niger',
    city: 'Niamey',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    airDurationZh: '14-21 天',
    airDurationAr: '14-21 يومًا',
    seaDurationEn: '60-75 days',
    seaDurationFr: '60-75 jours',
    seaDurationZh: '60-75 天',
    seaDurationAr: '60-75 يومًا',
  },
  benin: {
    slug: 'china-to-benin',
    code: 'BJ',
    frCountry: 'Bénin',
    zhCountry: '贝宁',
    arCountry: 'بنين',
    zhCity: '科托努',
    arCity: 'كوتونو',
    enCountry: 'Benin',
    city: 'Cotonou',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
    seaDurationZh: '45-60 天',
    seaDurationAr: '45-60 يومًا',
  },
  togo: {
    slug: 'china-to-togo',
    code: 'TG',
    frCountry: 'Togo',
    zhCountry: '多哥',
    arCountry: 'توغو',
    zhCity: '洛美',
    arCity: 'لومي',
    enCountry: 'Togo',
    city: 'Lomé',
    airDurationEn: '12-20 days',
    airDurationFr: '12-20 jours',
    airDurationZh: '12-20 天',
    airDurationAr: '12-20 يومًا',
    seaDurationEn: '45-60 days',
    seaDurationFr: '45-60 jours',
    seaDurationZh: '45-60 天',
    seaDurationAr: '45-60 يومًا',
  },
  guinea: {
    slug: 'china-to-guinea',
    code: 'GN',
    frCountry: 'Guinée',
    zhCountry: '几内亚',
    arCountry: 'غينيا',
    zhCity: '科纳克里',
    arCity: 'كوناكري',
    enCountry: 'Guinea',
    city: 'Conakry',
    airDurationEn: '14-21 days',
    airDurationFr: '14-21 jours',
    airDurationZh: '14-21 天',
    airDurationAr: '14-21 يومًا',
    seaDurationEn: '50-70 days',
    seaDurationFr: '50-70 jours',
    seaDurationZh: '50-70 天',
    seaDurationAr: '50-70 يومًا',
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
    zh: {
      origin: { country: '中国', city: '广州 / 上海', code: 'CN' },
      destination: { country: route.zhCountry, city: route.zhCity, code: route.code },
      airFreight: {
        duration: route.airDurationZh,
        routes: [
          { via: '迪拜', path: `Guangzhou → Dubai → ${route.city}` },
          { via: '亚的斯亚贝巴', path: `Shanghai → Addis → ${route.city}` },
        ],
      },
      seaFreight: {
        duration: route.seaDurationZh,
        routes: [
          { via: route.city.split(' / ')[0], path: `Shanghai → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Ningbo → ${route.city.split(' / ')[0]}` },
          { via: route.city.split(' / ')[0], path: `Shenzhen → ${route.city.split(' / ')[0]}` },
        ],
      },
    },
    ar: {
      origin: { country: 'الصين', city: 'قوانغتشو / شنغهاي', code: 'CN' },
      destination: { country: route.arCountry, city: route.arCity, code: route.code },
      airFreight: {
        duration: route.airDurationAr,
        routes: [
          { via: 'دبي', path: `Guangzhou → Dubai → ${route.city}` },
          { via: 'أديس أبابا', path: `Shanghai → Addis → ${route.city}` },
        ],
      },
      seaFreight: {
        duration: route.seaDurationAr,
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
    zh: {
      origin: { country: '中国', city: '广州 / 上海 / 深圳', code: 'CN' },
      destination: { country: '西非', city: '巴马科 / 达喀尔 / 阿比让 / 拉各斯 / 阿克拉', code: 'WA' },
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
          { via: '拉各斯', path: 'Guangzhou → Lagos' },
          { via: '阿比让', path: 'Shenzhen → Abidjan' },
        ],
      },
    },
    ar: {
      origin: { country: 'الصين', city: 'قوانغتشو / شنغهاي / شنتشن', code: 'CN' },
      destination: { country: 'غرب أفريقيا', city: 'باماكو / داكار / أبيدجان / لاغوس / أكرا', code: 'WA' },
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
          { via: 'لاغوس', path: 'Guangzhou → Lagos' },
          { via: 'أبيدجان', path: 'Shenzhen → Abidjan' },
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
  return route[locale as Locale];
}
