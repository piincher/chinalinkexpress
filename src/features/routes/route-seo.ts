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
  'china-to-africa': { en: 'West Africa', fr: 'Afrique de l’Ouest', capital: 'Bamako', priority: false, zh: '西非', ar: 'غرب أفريقيا' },
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
