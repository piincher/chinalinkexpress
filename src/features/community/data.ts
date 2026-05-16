/**
 * Community Data
 *
 * Realistic discussion topics, stats, and categories for the ChinaLink
 * Community Hub. Data is static for now; can be replaced with API calls later.
 */

export interface CommunityTopic {
  id: string;
  title: string;
  titleFr: string;
  content: string;
  contentFr: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  category: string;
  categoryFr: string;
  replies: number;
  likes: number;
  createdAt: string;
  isPinned: boolean;
}

export interface CommunityStats {
  memberCount: number;
  activeTopics: number;
  dailyMessages: number;
  countriesRepresented: number;
}

export const communityStats: CommunityStats = {
  memberCount: 2400,
  activeTopics: 156,
  dailyMessages: 340,
  countriesRepresented: 18,
};

export const categories = [
  { id: 'all', label: 'All', labelFr: 'Tout' },
  { id: 'sourcing', label: 'Sourcing', labelFr: 'Sourcing' },
  { id: 'shipping', label: 'Shipping', labelFr: 'Expédition' },
  { id: 'customs', label: 'Customs', labelFr: 'Douane' },
  { id: 'scam-alert', label: 'Scam Alert', labelFr: 'Alerte Arnaque' },
  { id: 'group-buy', label: 'Group Buy', labelFr: 'Achat Groupé' },
  { id: 'general', label: 'General', labelFr: 'Général' },
];

export const categoryColors: Record<string, string> = {
  sourcing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipping: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  customs: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'scam-alert': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'group-buy': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  general: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export const authorColors = [
  'bg-amber-500 text-white',
  'bg-emerald-500 text-white',
  'bg-blue-500 text-white',
  'bg-rose-500 text-white',
  'bg-violet-500 text-white',
  'bg-cyan-500 text-white',
  'bg-orange-500 text-white',
  'bg-teal-500 text-white',
  'bg-indigo-500 text-white',
  'bg-pink-500 text-white',
];

export const communityTopics: CommunityTopic[] = [
  {
    id: '1',
    title: 'Best suppliers for phone accessories on 1688',
    titleFr: 'Meilleurs fournisseurs accessoires téléphone sur 1688',
    content:
      'I have been sourcing phone cases, chargers, and screen protectors from 1688 for 6 months. Here is my verified list of 3 reliable suppliers with MOQs under 100pcs. Happy to share contact details via DM.',
    contentFr:
      "Je sors des accessoires téléphone (coques, chargeurs, protections écran) sur 1688 depuis 6 mois. Voici ma liste vérifiée de 3 fournisseurs fiables avec des MOQ sous 100 pièces. Je partage les contacts en privé.",
    author: 'Ibrahim K.',
    authorInitials: 'IK',
    authorColor: authorColors[0],
    category: 'sourcing',
    categoryFr: 'Sourcing',
    replies: 34,
    likes: 127,
    createdAt: '2026-05-16T10:30:00Z',
    isPinned: true,
  },
  {
    id: '2',
    title: 'How to avoid scams when paying suppliers',
    titleFr: 'Comment éviter les arnaques lors du paiement fournisseurs',
    content:
      'Three red flags every African importer should know: 1) Supplier refuses video call, 2) Price is 40%+ below market, 3) Asks for Western Union to personal account. Always use escrow or a trusted agent.',
    contentFr:
      "Trois signaux d'alerte que tout importateur africain doit connaître : 1) Le fournisseur refuse l'appel vidéo, 2) Le prix est 40%+ sous le marché, 3) Il demande un transfert Western Union sur un compte personnel. Utilisez toujours un escrow ou un agent de confiance.",
    author: 'Amina D.',
    authorInitials: 'AD',
    authorColor: authorColors[1],
    category: 'scam-alert',
    categoryFr: 'Alerte Arnaque',
    replies: 56,
    likes: 243,
    createdAt: '2026-05-14T08:15:00Z',
    isPinned: true,
  },
  {
    id: '3',
    title: 'Container sharing: Bamako departure June 15',
    titleFr: "Partage de conteneur : départ Bamako 15 juin",
    content:
      'I have 6 CBM booked on a 20ft container leaving Foshan on May 25, arriving Dakar June 15, then truck to Bamako. Looking for 2-3 people to share remaining 8 CBM. Rate: $115/CBM all-inclusive.',
    contentFr:
      "J'ai réservé 6 CBM dans un conteneur 20ft partant de Foshan le 25 mai, arrivée Dakar le 15 juin, puis camion vers Bamako. Je cherche 2-3 personnes pour partager les 8 CBM restants. Tarif : 115$/CBM tout compris.",
    author: 'Ousmane T.',
    authorInitials: 'OT',
    authorColor: authorColors[2],
    category: 'group-buy',
    categoryFr: 'Achat Groupé',
    replies: 18,
    likes: 89,
    createdAt: '2026-05-15T14:20:00Z',
    isPinned: true,
  },
  {
    id: '4',
    title: 'Customs fees experience at Bamako port',
    titleFr: "Expérience des frais de douane au port de Bamako",
    content:
      'Just cleared a 12 CBM LCL shipment at Bamako port. Total customs + handling + local transport came to ~$1,850. Breakdown attached. Key tip: have your HS codes correct and use a local customs broker.',
    contentFr:
      "Je viens de dédouaner une expédition LCL de 12 CBM au port de Bamako. Total douane + manutention + transport local : environ 1 850$. Détails ci-joints. Conseil clé : ayez vos codes HS corrects et utilisez un courtier en douane local.",
    author: 'Fatou S.',
    authorInitials: 'FS',
    authorColor: authorColors[3],
    category: 'customs',
    categoryFr: 'Douane',
    replies: 42,
    likes: 156,
    createdAt: '2026-05-13T09:45:00Z',
    isPinned: false,
  },
  {
    id: '5',
    title: 'Quality inspection tips before shipping',
    titleFr: "Conseils d'inspection qualité avant expédition",
    content:
      'Never skip pre-shipment inspection. Here is my 10-point checklist: packaging, labeling, quantity, color accuracy, functionality test, weight check, carton markings, accessories included, manual/language, and random sampling.',
    contentFr:
      "Ne sautez jamais l'inspection pré-expédition. Voici ma checklist 10 points : emballage, étiquetage, quantité, exactitude des couleurs, test fonctionnel, vérification du poids, marquage cartons, accessoires inclus, manuel/langue, et échantillonnage aléatoire.",
    author: 'Kofi M.',
    authorInitials: 'KM',
    authorColor: authorColors[4],
    category: 'sourcing',
    categoryFr: 'Sourcing',
    replies: 29,
    likes: 112,
    createdAt: '2026-05-12T16:00:00Z',
    isPinned: false,
  },
  {
    id: '6',
    title: 'Cheapest way to ship textiles from Guangzhou',
    titleFr: "Moyen le moins cher d'expédier des textiles de Guangzhou",
    content:
      'For textiles under 100kg, air freight via consolidated cargo is best at $8.50/kg. For 200kg+, sea LCL from Guangzhou to Dakar then truck is $95/CBM. I saved 35% switching to LCL last month.',
    contentFr:
      "Pour les textiles sous 100kg, le fret aérien en cargo consolidé est le meilleur à 8,50$/kg. Pour 200kg+, le groupage maritime Guangzhou-Dakar puis camion est à 95$/CBM. J'ai économisé 35% en passant au LCL le mois dernier.",
    author: 'Mariam C.',
    authorInitials: 'MC',
    authorColor: authorColors[5],
    category: 'shipping',
    categoryFr: 'Expédition',
    replies: 21,
    likes: 98,
    createdAt: '2026-05-11T11:30:00Z',
    isPinned: false,
  },
  {
    id: '7',
    title: 'New import regulations in Mali 2026',
    titleFr: 'Nouvelles réglementations importation Mali 2026',
    content:
      'Mali customs updated the prohibited items list effective April 2026. Drones now require DGAC permit. Used clothing restrictions tightened. New electronic invoice requirement for all imports above $2,000.',
    contentFr:
      "La douane malienne a mis à jour la liste des articles interdits en avril 2026. Les drones nécessitent désormais une autorisation DGAC. Les restrictions sur les vêtements d'occasion se sont renforcées. Nouvelle exigence de facture électronique pour toutes importations > 2 000$.",
    author: 'Drissa B.',
    authorInitials: 'DB',
    authorColor: authorColors[6],
    category: 'customs',
    categoryFr: 'Douane',
    replies: 38,
    likes: 201,
    createdAt: '2026-05-10T07:20:00Z',
    isPinned: false,
  },
  {
    id: '8',
    title: 'Group buy: LED lighting from Shenzhen',
    titleFr: "Achat groupé : éclairage LED de Shenzhen",
    content:
      'Organizing a group buy for LED strips, panels, and flood lights from a verified Shenzhen factory. MOQ is 500pcs but we can hit it with 4-5 buyers. Prices 30% below Alibaba. Deadline: May 25.',
    contentFr:
      "J'organise un achat groupé de rubans LED, panneaux et projecteurs auprès d'une usine vérifiée à Shenzhen. Le MOQ est de 500 pièces mais on peut l'atteindre avec 4-5 acheteurs. Prix 30% sous Alibaba. Date limite : 25 mai.",
    author: 'Youssef N.',
    authorInitials: 'YN',
    authorColor: authorColors[7],
    category: 'group-buy',
    categoryFr: 'Achat Groupé',
    replies: 15,
    likes: 76,
    createdAt: '2026-05-09T13:10:00Z',
    isPinned: false,
  },
  {
    id: '9',
    title: 'Bank transfer vs Alipay for large orders',
    titleFr: 'Virement bancaire vs Alipay pour grosses commandes',
    content:
      'For orders above $5,000, I prefer bank transfer with a verified contract. For smaller orders, Alipay escrow is safer. Here is a fee comparison and risk analysis for both methods.',
    contentFr:
      "Pour les commandes > 5 000$, je préfère le virement bancaire avec un contrat vérifié. Pour les petites commandes, l'escrow Alipay est plus sûr. Voici une comparaison des frais et une analyse des risques pour les deux méthodes.",
    author: 'Nadia K.',
    authorInitials: 'NK',
    authorColor: authorColors[8],
    category: 'general',
    categoryFr: 'Général',
    replies: 27,
    likes: 94,
    createdAt: '2026-05-08T10:00:00Z',
    isPinned: false,
  },
  {
    id: '10',
    title: 'Air freight rate trends: May 2026 update',
    titleFr: "Tendances tarifs fret aérien : mise à jour mai 2026",
    content:
      'Air freight rates from Guangzhou to Bamako dropped slightly this month. Current range $9.50-$13.50/kg depending on volume. Fuel surcharge down 4%. Book early for Ramadan season rush.',
    contentFr:
      "Les tarifs fret aérien Guangzhou-Bamako ont légèrement baissé ce mois-ci. Fourchette actuelle : 9,50-13,50$/kg selon volume. Surcharge carburant en baisse de 4%. Réservez tôt pour la ruée du Ramadan.",
    author: 'Issa F.',
    authorInitials: 'IF',
    authorColor: authorColors[9],
    category: 'shipping',
    categoryFr: 'Expédition',
    replies: 31,
    likes: 118,
    createdAt: '2026-05-07T15:45:00Z',
    isPinned: false,
  },
];

export const successStories = [
  {
    id: '1',
    quote:
      'I found 3 reliable suppliers thanks to this group. My import costs dropped by 25% and I no longer worry about scams.',
    quoteFr:
      "J'ai trouvé 3 fournisseurs fiables grâce à ce groupe. Mes coûts d'importation ont baissé de 25% et je ne m'inquiète plus des arnaques.",
    author: 'Amadou',
    location: 'Bamako',
    countryFlag: '🇲🇱',
  },
  {
    id: '2',
    quote:
      'Saved $800 on my last shipment by sharing a container. The community made it easy to find trustworthy partners.',
    quoteFr:
      "J'ai économisé 800$ sur ma dernière expédition en partageant un conteneur. La communauté m'a facilité la recherche de partenaires de confiance.",
    author: 'Fatou',
    location: 'Dakar',
    countryFlag: '🇸🇳',
  },
  {
    id: '3',
    quote:
      'Avoided a scam because someone warned me about that supplier. This group is worth its weight in gold.',
    quoteFr:
      "J'ai évité une arnaque car quelqu'un m'a prévenu à propos de ce fournisseur. Ce groupe vaut de l'or.",
    author: 'Moussa',
    location: 'Abidjan',
    countryFlag: '🇨🇮',
  },
];
