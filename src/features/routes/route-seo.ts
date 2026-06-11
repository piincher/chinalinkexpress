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
  'china-to-mali': { en: 'Mali', fr: 'Mali', capital: 'Bamako', priority: true },
  'china-to-africa': { en: 'West Africa', fr: 'Afrique de l’Ouest', capital: 'Bamako, Dakar, Abidjan, Lagos, Accra', priority: false },
  'china-to-senegal': { en: 'Senegal', fr: 'Sénégal', capital: 'Dakar', priority: false },
  'china-to-cote-divoire': { en: 'Ivory Coast', fr: 'Côte d’Ivoire', capital: 'Abidjan', priority: false },
  'china-to-nigeria': { en: 'Nigeria', fr: 'Nigeria', capital: 'Lagos', priority: false },
  'china-to-ghana': { en: 'Ghana', fr: 'Ghana', capital: 'Accra', priority: false },
  'china-to-burkina-faso': { en: 'Burkina Faso', fr: 'Burkina Faso', capital: 'Ouagadougou', priority: false },
  'china-to-niger': { en: 'Niger', fr: 'Niger', capital: 'Niamey', priority: false },
  'china-to-benin': { en: 'Benin', fr: 'Bénin', capital: 'Cotonou', priority: false },
  'china-to-togo': { en: 'Togo', fr: 'Togo', capital: 'Lomé', priority: false },
  'china-to-guinea': { en: 'Guinea', fr: 'Guinée', capital: 'Conakry', priority: false },
} as const;

export type RouteSeoKey = keyof typeof routeDestinations;

export function getRouteSeo(routeKey: string, locale: Locale): RouteSeoCopy {
  const route = routeDestinations[routeKey as RouteSeoKey] || routeDestinations['china-to-africa'];
  const isEn = locale === 'en';
  const destination = isEn ? route.en : route.fr;

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
