import type { Locale } from '@/i18n/config';

export interface RouteSeoCopy {
  title: string;
  description: string;
  keywords: string;
  breadcrumb: string;
  country: string;
  capital: string;
}

const routeDestinations = {
  'china-to-mali': { en: 'Mali', fr: 'Mali', zh: '马里', ar: 'مالي', capital: 'Bamako', priority: true },
  'china-to-africa': { en: 'West Africa', fr: 'Afrique de l’Ouest', capital: 'Bamako, Dakar, Abidjan, Lagos, Accra', priority: false, zh: '西非', ar: 'غرب أفريقيا' },
  'china-to-senegal': { en: 'Senegal', fr: 'Sénégal', capital: 'Dakar', priority: false, zh: '塞内加尔', ar: 'السنغال' },
  'china-to-cote-divoire': { en: 'Ivory Coast', fr: 'Côte d’Ivoire', capital: 'Abidjan', priority: false, zh: '科特迪瓦', ar: 'ساحل العاج' },
  'china-to-nigeria': { en: 'Nigeria', fr: 'Nigeria', capital: 'Lagos', priority: false, zh: '尼日利亚', ar: 'نيجيريا' },
  'china-to-ghana': { en: 'Ghana', fr: 'Ghana', capital: 'Accra', priority: false, zh: '加纳', ar: 'غانا' },
  'china-to-burkina-faso': { en: 'Burkina Faso', fr: 'Burkina Faso', capital: 'Ouagadougou', priority: false, zh: '布基纳法索', ar: 'بوركينا فاسو' },
  'china-to-niger': { en: 'Niger', fr: 'Niger', capital: 'Niamey', priority: false, zh: '尼日尔', ar: 'النيجر' },
  'china-to-benin': { en: 'Benin', fr: 'Bénin', capital: 'Cotonou', priority: false, zh: '贝宁', ar: 'بنين' },
  'china-to-togo': { en: 'Togo', fr: 'Togo', capital: 'Lomé', priority: false, zh: '多哥', ar: 'توغو' },
  'china-to-guinea': { en: 'Guinea', fr: 'Guinée', capital: 'Conakry', priority: false, zh: '几内亚', ar: 'غينيا' },
} as const;

export type RouteSeoKey = keyof typeof routeDestinations;

export function getRouteSeo(routeKey: string, locale: Locale): RouteSeoCopy {
  const route = routeDestinations[routeKey as RouteSeoKey] || routeDestinations['china-to-africa'];
  const isEn = locale === 'en';
  const destination = route[locale as Locale];

  if (isEn) {
    const africaPhrase = routeKey === 'china-to-africa' ? 'Mali, Senegal, Ivory Coast, Ghana and Nigeria' : destination;
    return {
      title: `Shipping from China to ${destination} | Air & Sea Freight`,
      description: `ChinaLink Express coordinates China-to-Africa freight to ${africaPhrase}. Sourcing, supplier payment, consolidation, air freight, sea freight and WhatsApp tracking with Mali as our strongest hub.`,
      keywords: `shipping from China to ${destination}, China Africa freight, freight forwarder China Africa, air freight China ${destination}, sea freight China ${destination}, ChinaLink Express, Mali logistics hub`,
      breadcrumb: routeKey === 'china-to-africa' ? 'China to Africa' : `China to ${destination}`,
      country: destination,
      capital: route.capital,
    };
  }

  if (locale === 'zh') {
    return {
      title: route.priority ? '中国马里货运 | 空运和海运到巴马科' : `中国到${destination}发货 | 空运和海运`,
      description: `从中国到${destination}的空运和海运。ChinaLink Express 为西非提供采购、供应商付款、集运、WhatsApp 跟踪和报价。`,
      keywords: `中国${destination}货运, 中国${destination}发货, 中国非洲货代, 中国${destination}物流, 中国非洲空运, 中国非洲海运`,
      breadcrumb: routeKey === 'china-to-africa' ? '中国到非洲' : `中国到${destination}`,
      country: destination,
      capital: route.capital,
    };
  }

  if (locale === 'ar') {
    return {
      title: route.priority ? 'الشحن من الصين إلى مالي | جوًا وبحرًا إلى باماكو' : `الشحن من الصين إلى ${destination} | جوًا وبحرًا`,
      description: `شحن جوي وبحري من الصين إلى ${destination}. التوريد والدفع للموردين والتجميع والمتابعة عبر WhatsApp وعروض الأسعار من ChinaLink Express لغرب أفريقيا.`,
      keywords: `الشحن من الصين إلى ${destination}، وكيل شحن من الصين إلى أفريقيا، الشحن الجوي من الصين إلى أفريقيا، الشحن البحري من الصين إلى أفريقيا`,
      breadcrumb: routeKey === 'china-to-africa' ? 'من الصين إلى أفريقيا' : `من الصين إلى ${destination}`,
      country: destination,
      capital: route.capital,
    };
  }

  return {
    title: route.priority
      ? 'Cargo Chine Mali | Fret Aérien & Maritime vers Bamako'
      : `Expédition Chine ${destination} | Fret aérien et maritime`,
    description: `Fret aérien et maritime de la Chine vers ${destination}. Sourcing, paiement fournisseur, consolidation, suivi WhatsApp et devis ChinaLink Express pour l’Afrique de l’Ouest.`,
    keywords: `fret Chine ${destination}, expédition Chine ${destination}, transitaire Chine Afrique, cargo Chine ${destination}, fret aérien Chine Afrique, fret maritime Chine Afrique`,
    breadcrumb: routeKey === 'china-to-africa' ? 'Chine vers Afrique' : `Chine vers ${destination}`,
    country: destination,
    capital: route.capital,
  };
}
