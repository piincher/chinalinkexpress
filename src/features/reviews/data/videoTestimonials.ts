/**
 * Video Testimonials Data
 *
 * Real client video testimonials for ChinaLink Express.
 *
 * Every entry has an actual video file. Four without footage were removed on
 * 2026-08-07: the section badges each card "VIDÉO RÉELLE" under the line "Pas
 * d'acteurs. Pas de scripts.", and a claim of authenticity cannot be padded
 * with people who have no video. Add new entries only with a `videoUrl`.
 */

export interface VideoTestimonial {
  id: string;
  name: string;
  business: string;
  country: string;
  countryFlag: string;
  language: string;
  thumbnailColor: string;
  duration: string;
  quote: string;
  result: string;
  resultLabel: string;
  /** CDN URL to the MP4 video file. If absent, shows "coming soon" placeholder. */
  videoUrl?: string;
  /** Optional poster frame URL for the video thumbnail */
  posterUrl?: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-001',
    name: 'Abdul Niang',
    business: 'Importateur, Bamako',
    country: 'Mali',
    countryFlag: '🇲🇱',
    language: 'Français',
    thumbnailColor: 'from-amber-600 to-orange-700',
    duration: '0:48',
    quote:
      "Avant ChinaLink, j'expédiait avec un autre cargo. Je ne recevais jamais mes marchandises en 2 mois — quand ça allait vite c'était 6 mois. Avec ChinaLink Express, mes 7 cartons sont arrivés en 2 mois et 12 jours. C'est au-delà de ce que j'imaginais possible.",
    result: '2 mois 12 jours',
    resultLabel: '7 cartons par mer',
    videoUrl:
      'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/niang.mp4',
  },
  {
    id: 'vid-002',
    name: 'Client Batteuse Mali',
    business: 'Équipement Agricole, Bamako',
    country: 'Mali',
    countryFlag: '🇲🇱',
    language: 'Français / Bambara',
    thumbnailColor: 'from-emerald-600 to-teal-700',
    duration: '1:15',
    quote:
      "Nous avons fait venir toute notre équipement agricole — batteuses et machines — avec ChinaLink Express. Le service a été impeccable du début à la fin. Nos machines sont arrivées en parfait état et dans les délais. On recommande à 100%.",
    result: 'Parfait état',
    resultLabel: 'équipement agricole',
    videoUrl:
      'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/batteuse.mp4',
  },
];

export const EN_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-en-001',
    name: 'Abdul Niang',
    business: 'Importer, Bamako',
    country: 'Mali',
    countryFlag: '🇲🇱',
    language: 'French',
    thumbnailColor: 'from-amber-600 to-orange-700',
    duration: '0:48',
    quote:
      'Before ChinaLink, I shipped with another cargo provider and delays were unpredictable. With ChinaLink Express, my cartons arrived with clear updates and a realistic timeline.',
    result: 'Reliable timeline',
    resultLabel: 'sea shipment',
    videoUrl:
      'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/niang.mp4',
  },
  {
    id: 'vid-en-002',
    name: 'Mali Agriculture Client',
    business: 'Agricultural Equipment, Bamako',
    country: 'Mali',
    countryFlag: '🇲🇱',
    language: 'French / Bambara',
    thumbnailColor: 'from-emerald-600 to-teal-700',
    duration: '1:15',
    quote:
      'We imported agricultural machines with ChinaLink Express. The service was organized from supplier coordination to arrival, and the equipment reached us in good condition.',
    result: 'Good condition',
    resultLabel: 'agricultural equipment',
    videoUrl:
      'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/batteuse.mp4',
  },
];

/** Count of testimonials that have an actual video file */
export const REAL_VIDEO_COUNT = VIDEO_TESTIMONIALS.filter((t) => t.videoUrl)
  .length;
