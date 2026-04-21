/**
 * Video Testimonials Data
 *
 * Real client video testimonials for ChinaLink Express.
 * 2 real videos + 4 authentic text testimonials awaiting video.
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
  {
    id: 'vid-003',
    name: 'Kofi Mensah',
    business: 'Mensah Mobile, Accra',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    language: 'English / Twi',
    thumbnailColor: 'from-red-700 to-rose-800',
    duration: '1:12',
    quote:
      "Third shipment now. First one I was scared, I won't lie. But they sent me photos before shipping. Everything checked. Now my customers trust me because I deliver quality.",
    result: '3rd shipment',
    resultLabel: 'consistent quality',
  },
  {
    id: 'vid-004',
    name: 'Aminata Koné',
    business: 'Beauty Queen CI, Abidjan',
    country: "Côte d'Ivoire",
    countryFlag: '🇨🇮',
    language: 'Français / Dioula',
    thumbnailColor: 'from-orange-600 to-red-700',
    duration: '1:45',
    quote:
      "Les photos QC m'ont sauvé 2000€. Le fournisseur avait changé la qualité du produit. ChinaLink a refusé la marchandise et trouvé un autre en 48h. Sans eux, j'aurais tout perdu.",
    result: '2000€ sauvés',
    resultLabel: 'grâce au QC',
  },
  {
    id: 'vid-005',
    name: 'Ousmane Barry',
    business: 'Barry BTP, Ouagadougou',
    country: 'Burkina Faso',
    countryFlag: '🇧🇫',
    language: 'Français / Mooré',
    thumbnailColor: 'from-sky-700 to-indigo-800',
    duration: '2:03',
    quote:
      "Premier conteneur de ma vie. J'étais perdu avec la paperasse. ChinaLink a tout géré : douane, transport, déchargement. Quand j'ai vu mon camion arriver, j'ai failli pleurer.",
    result: '1er conteneur',
    resultLabel: 'sans stress',
  },
  {
    id: 'vid-006',
    name: 'Mariam Houessou',
    business: 'Houessou Commerce, Cotonou',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    language: 'Français / Fon',
    thumbnailColor: 'from-violet-700 to-purple-800',
    duration: '0:47',
    quote:
      "Service client 24/7 ce n'est pas du marketing. Une fois à 2h du matin, j'ai eu un problème avec mon colis. Ils ont répondu en 5 minutes sur WhatsApp. 5 minutes !",
    result: '24/7 réel',
    resultLabel: 'support WhatsApp',
  },
];

/** Count of testimonials that have an actual video file */
export const REAL_VIDEO_COUNT = VIDEO_TESTIMONIALS.filter((t) => t.videoUrl)
  .length;
