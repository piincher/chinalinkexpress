/**
 * ⚠️  NOT REAL REVIEWS. DO NOT RENDER THIS FILE ON A PUBLIC PAGE.
 *
 * The header here used to read "Realistic, verified client reviews for
 * ChinaLink Express" — and "realistic" was doing a great deal of work. Every
 * entry below is invented: the names, the dates, the amounts saved, the transit
 * times. Each carries `verified: true`. `AGGREGATE_RATING` states 4.8 from 312
 * reviews. The production `reviews` collection contains **two** documents.
 *
 * This was rendering on /calculateur via `VerifiedReviewsSection`, under a
 * heading that called the reviews verified and next to source badges implying
 * third-party collection. That section is no longer mounted (see
 * features/pricing/CalculatorPage.tsx).
 *
 * The file is kept because the UI around it is good and will be worth having
 * the day reviews are actually collected. What it needs is a data source — the
 * `reviews` collection, through an endpoint — not a rewrite.
 *
 * Until then: inventing customer reviews is a Google review-snippet policy
 * violation carrying a site-wide manual action, and it is the one class of
 * fabrication a prospect can disprove by asking a single question.
 *
 * The genuine quotes live in `src/views/landing/constants.ts` and render on the
 * home page. The two clients who actually filmed a testimonial are in
 * `videoTestimonials.ts`, which filters on the presence of a `videoUrl`.
 */

export interface Review {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
  service: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-001',
    name: 'Amadou Traoré',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 2 semaines',
    rating: 5,
    text: "Ma 3ème expédition avec eux. Toujours aussi pro. 16 jours à Bamako comme promis. Le QC m'a évité une mauvaise surprise sur mes articles électroniques.",
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-002',
    name: 'Fatou Ndiaye',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 1 mois',
    rating: 5,
    text: "Les photos QC m'ont sauvé 2000€. Le fournisseur avait changé la qualité du tissu sans prévenir. ChinaLink a refusé la marchandise et trouvé un autre atelier en 48h.",
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-003',
    name: 'Kofi Mensah',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 3 semaines',
    rating: 4,
    text: 'Good service overall. Sea freight took 65 days to Bamako which is normal. Communication on WhatsApp was responsive. Will use again for my next container.',
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-004',
    name: 'Aminata Koné',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 2 mois',
    rating: 5,
    text: "Service complet du début à la fin. Ils ont trouvé mon fournisseur, négocié les prix, fait l'inspection et livré à Bamako. Je n'ai rien eu à gérer.",
    verified: true,
    service: 'Full Service',
  },
  {
    id: 'rev-005',
    name: 'Ousmane Barry',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 5 jours',
    rating: 5,
    text: "Première fois que j'importe depuis la Chine. J'étais sceptique mais leur équipe m'a guidé étape par étape. Colis arrivé intact à Bamako en 14 jours.",
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-006',
    name: 'Marie-Claire Houessou',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 3 mois',
    rating: 4,
    text: "Très satisfaite du sourcing. Ils m'ont trouvé une usine fiable pour mes sacs en cuir. Le délai de production était un peu long mais la qualité est là.",
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-007',
    name: 'Issoufou Ouedraogo',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 1 semaine',
    rating: 5,
    text: "Mon conteneur de 40 pieds est arrivé à Bamako sans problème. La dédouane était incluse dans leur prix, pas de surprise. Prochain envoi prévu pour novembre.",
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-008',
    name: 'Kossi Agbessi',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 2 mois',
    rating: 5,
    text: "I saved me from a bad supplier. The factory looked good on Alibaba but ChinaLink's inspection found they had no real production line. Found me a better one.",
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-009',
    name: 'Rahina Ibrahim',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 4 semaines',
    rating: 4,
    text: "Envoi air express vers Bamako. Rapide et bien suivi. Le seul bémol c'est le prix du transport mais c'est le marché. Au moins y a pas de frais cachés.",
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-010',
    name: 'Jean-Baptiste Koffi',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 3 mois',
    rating: 5,
    text: "Full service pour ma boutique à Bamako. De la recherche produit à la livraison finale, tout était géré. J'ai gagné un temps fou et la qualité est top.",
    verified: true,
    service: 'Full Service',
  },
  {
    id: 'rev-011',
    name: 'Seydou Camara',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 1 semaine',
    rating: 5,
    text: "2ème conteneur avec eux cette année. Le fret maritime Bamako est stable et les délais respectés. Le paiement en 2 fois aide aussi pour la trésorerie.",
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-012',
    name: 'Adjoa Asare',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: 'il y a 2 semaines',
    rating: 5,
    text: "Best logistics partner I've worked with. They handle everything: sourcing, QC, shipping through their partners, customs. My business in Bamako runs smoother since I found them.",
    verified: true,
    service: 'Full Service',
  },
];

export const EN_REVIEWS: Review[] = [
  {
    id: 'rev-en-001',
    name: 'Amadou Traore',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: '2 weeks ago',
    rating: 5,
    text: 'My third shipment with ChinaLink. Still professional. The 16-day Bamako delivery was as promised, and QC saved me from an issue with electronic items.',
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-en-002',
    name: 'Fatou Ndiaye',
    country: 'Senegal',
    countryFlag: '🇸🇳',
    date: '1 month ago',
    rating: 5,
    text: 'The quality-control photos saved my order. The supplier changed the fabric quality, ChinaLink rejected the goods and found another workshop within 48 hours.',
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-en-003',
    name: 'Kofi Mensah',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    date: '3 weeks ago',
    rating: 4,
    text: 'Good service overall. Sea freight took 65 days to Bamako, which was expected. Communication on WhatsApp was responsive.',
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-en-004',
    name: 'Aminata Kone',
    country: 'Ivory Coast',
    countryFlag: '🇨🇮',
    date: '2 months ago',
    rating: 5,
    text: 'Complete service from start to finish. They found the supplier, negotiated pricing, inspected the goods and coordinated delivery.',
    verified: true,
    service: 'Full Service',
  },
  {
    id: 'rev-en-005',
    name: 'Ousmane Barry',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: '5 days ago',
    rating: 5,
    text: 'It was my first time importing from China. Their team guided me step by step, and the parcel arrived intact in Bamako in 14 days.',
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-en-006',
    name: 'Marie-Claire Houessou',
    country: 'Benin',
    countryFlag: '🇧🇯',
    date: '3 months ago',
    rating: 4,
    text: 'Very satisfied with sourcing. They found a reliable factory for my leather bags. Production took time, but the quality was strong.',
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-en-007',
    name: 'Issoufou Ouedraogo',
    country: 'Burkina Faso',
    countryFlag: '🇧🇫',
    date: '1 week ago',
    rating: 5,
    text: 'My 40-foot container arrived without issues. Customs coordination was included in the service, with no surprise charges.',
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-en-008',
    name: 'Kossi Agbessi',
    country: 'Togo',
    countryFlag: '🇹🇬',
    date: '2 months ago',
    rating: 5,
    text: "They saved me from a bad supplier. The factory looked good online, but ChinaLink's inspection found no real production line.",
    verified: true,
    service: 'Sourcing',
  },
  {
    id: 'rev-en-009',
    name: 'Rahina Ibrahim',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    date: '4 weeks ago',
    rating: 4,
    text: 'Air express was fast and well tracked. Transport pricing is the market reality, but there were no hidden fees.',
    verified: true,
    service: 'Air Express',
  },
  {
    id: 'rev-en-010',
    name: 'Jean-Baptiste Koffi',
    country: 'Ivory Coast',
    countryFlag: '🇨🇮',
    date: '3 months ago',
    rating: 5,
    text: 'Full service for my shop. From product research to final delivery, everything was handled and I saved a lot of time.',
    verified: true,
    service: 'Full Service',
  },
  {
    id: 'rev-en-011',
    name: 'Seydou Camara',
    country: 'Mali',
    countryFlag: '🇲🇱',
    date: '1 week ago',
    rating: 5,
    text: 'Second container with them this year. Sea freight to Bamako is stable, and the timelines have been respected.',
    verified: true,
    service: 'Sea Freight',
  },
  {
    id: 'rev-en-012',
    name: 'Adjoa Asare',
    country: 'Ghana',
    countryFlag: '🇬🇭',
    date: '2 weeks ago',
    rating: 5,
    text: 'Best logistics partner I have worked with. They handle sourcing, QC, shipping through partners and customs coordination.',
    verified: true,
    service: 'Full Service',
  },
];

export const AGGREGATE_RATING = {
  rating: 4.8,
  totalReviews: 312,
  sources: ['Google Reviews', 'Trustpilot', 'Direct'],
};

export const SERVICE_COLORS: Record<string, string> = {
  'Air Express': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  'Sea Freight': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Sourcing': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Full Service': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};
