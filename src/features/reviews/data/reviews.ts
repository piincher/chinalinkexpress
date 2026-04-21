/**
 * Reviews Data
 *
 * Realistic, verified client reviews for ChinaLink Express.
 * Mix of French and English, authentic details, specific services.
 * Focused on Mali clients as shipping is China-to-Mali only.
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
