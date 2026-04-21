/**
 * Video Testimonials Data
 *
 * 6 realistic video testimonial entries for ChinaLink.
 * Authentic West African business owners sharing their experience
 * in their local language.
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
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-001',
    name: 'Amadou Traoré',
    business: 'Diallo Electronics, Bamako',
    country: 'Mali',
    countryFlag: '🇲🇱',
    language: 'Bambara / Français',
    thumbnailColor: 'from-amber-600 to-orange-700',
    duration: '1:24',
    quote: "An bɛ ChinaLink fɛ sisan. Sanga 16 don Bamako. N'man siran fanga la. — 'Je suis avec ChinaLink maintenant. 16 jours à Bamako. Je ne crains plus les arnaques.'",
    result: '16 jours',
    resultLabel: 'Bamako porte-à-porte',
  },
  {
    id: 'vid-002',
    name: 'Fatou Ndiaye',
    business: 'Ndiaye Mode, Dakar',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    language: 'Wolof / Français',
    thumbnailColor: 'from-emerald-600 to-teal-700',
    duration: '0:58',
    quote: "Dama am ay mbokk yiy wax ñu amul benn video. Man ma ngi ci. +40% benef. — 'J'ai des collègues qui disent qu'ils n'ont aucune vidéo. Moi j'en ai. +40% de marge.'",
    result: '+40% marge',
    resultLabel: 'vs achat local',
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
    quote: "Third shipment now. First one I was scared, I won't lie. But they sent me photos before shipping. Everything checked. Now my customers trust me because I deliver quality.",
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
    quote: "Les photos QC m'ont sauvé 2000€. Le fournisseur avait changé la qualité du produit. ChinaLink a refusé la marchandise et trouvé un autre en 48h. Sans eux, j'aurais tout perdu.",
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
    quote: "Premier conteneur de ma vie. J'étais perdu avec la paperasse. ChinaLink a tout géré : douane, transport, déchargement. Quand j'ai vu mon camion arriver, j'ai failli pleurer.",
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
    quote: "Service client 24/7 ce n'est pas du marketing. Une fois à 2h du matin, j'ai eu un problème avec mon colis. Ils ont répondu en 5 minutes sur WhatsApp. 5 minutes !",
    result: '24/7 réel',
    resultLabel: 'support WhatsApp',
  },
];
