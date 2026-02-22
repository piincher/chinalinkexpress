/**
 * Landing Page Constants
 * 
 * Feature-specific constants for the landing page.
 * Keeping constants close to where they are used.
 */

import type { Service, Testimonial, Partner, FAQ } from '@/types';

export const HERO_TEXTS = [
  'Solutions Logistiques Complètes',
  'Expéditions Internationales',
  'Votre Partenaire de Confiance',
] as const;

export const SERVICES: Service[] = [
  {
    id: 'achat',
    title: 'ACHAT',
    description:
      'Nous gérons vos achats auprès des fournisseurs chinois avec professionnalisme et transparence.',
    icon: '🛒',
  },
  {
    id: 'expedition-aerienne',
    title: 'EXPÉDITION AÉRIENNE',
    description:
      'Livraison rapide par voie aérienne pour vos marchandises urgentes à travers le monde.',
    icon: '✈️',
  },
  {
    id: 'expedition-maritime',
    title: 'EXPÉDITION MARITIME',
    description: 'Solution économique pour le transport de gros volumes par voie maritime.',
    icon: '🚢',
  },
  {
    id: 'paiement-fournisseurs',
    title: 'PAIEMENT FOURNISSEURS',
    description:
      'Nous facilitons le paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay et autres méthodes.',
    icon: '💳',
  },
  {
    id: 'recharge-compte',
    title: 'RECHARGE COMPTE',
    description:
      'Rechargez votre compte ChinaLink Express facilement via Orange Money, Wave ou cash pour des transactions plus rapides.',
    icon: '📱',
  },
];

export const WHY_US = [
  {
    id: 'rapidite',
    title: 'Rapidité',
    description: 'Livraison express dans les délais les plus courts du marché.',
    image: 'https://placehold.co/200x200/3B82F6/FFFFFF?text=Livraison+Rapide',
  },
  {
    id: 'fiabilite',
    title: 'Fiabilité',
    description: 'Suivi en temps réel et service client disponible 24/7.',
    image: 'https://placehold.co/200x200/10B981/FFFFFF?text=Suivi+en+Temps+Réel',
  },
  {
    id: 'prix',
    title: 'Prix Compétitifs',
    description: 'Les meilleurs tarifs du marché avec aucune surprise de frais cachés.',
    image: 'https://placehold.co/200x200/F59E0B/FFFFFF?text=Prix+Compétitifs',
  },
  {
    id: 'expertise',
    title: 'Expertise',
    description: "Plus de 7ans d'expérience dans la logistique internationale.",
    image: 'https://placehold.co/200x200/8B5CF6/FFFFFF?text=Expertise+Logistique',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr Touré',
    company: 'Docteur',
    text: "Ça me fais plus de deux ans dans le système j'ai jamais travaillé avec une agence aussi organisée que la vôtre ! Continue dans ce sens tout le Mali viendra vers vous ou tout les autres vont vous imité !",
    rating: 5,
    image: 'https://placehold.co/100x100/6366F1/FFFFFF?text=DT',
  },
  {
    id: '2',
    name: 'Ousmane Diallo',
    company: 'AfricaDecor',
    text: "l'achat et l'expédition des colis de la Chine vers le Mali. Le suivi du colis, le temps de l'expédition, l'information. tout est professionnel. Merci",
    rating: 5,
    image: 'https://placehold.co/100x100/EC4899/FFFFFF?text=OD',
  },
  {
    id: '3',
    name: "Maimouna Matel N'Diaye",
    company: 'Société Générale',
    text: 'Ils sont impeccables. Les délais communiqués sont respectes. Bon.courage',
    rating: 5,
    image: 'https://placehold.co/100x100/10B981/FFFFFF?text=MN',
  },
];

export const PARTNERS: Partner[] = [
  { id: 'maersk', name: 'MAERSK', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png' },
  { id: 'cma-cgm', name: 'CMA-CGM', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png' },
  { id: 'hapag-lloyd', name: 'HAPAG-LLOYD', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png' },
  { id: 'evergreen', name: 'EVERGREEN', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/evergreen.png' },
  { id: 'msc', name: 'MSC', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/msc.png' },
  { id: 'ethiopian', name: 'ETHIOPIAN', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png' },
  { id: 'turkish', name: 'TURKISH AIRLINES', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png' },
];

export const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Quels types de marchandises pouvez-vous expédier ?',
    answer:
      "Nous expédions presque tous les types de marchandises, à l'exception des articles dangereux ou interdits par la loi. Contactez-nous pour plus de détails sur vos articles spécifiques +8618851725957.",
  },
  {
    id: '2',
    question: 'Combien de temps prend une expédition aérienne ?',
    answer:
      "L'expédition aérienne prend généralement entre 14 à 21 jours ouvrables Chine Bamako. Nous offrons également des options express pour des livraisons en 2-5 jours.",
  },
  {
    id: '3',
    question: 'Combien de temps prend une expédition maritime ?',
    answer:
      "L'expédition maritime prend généralement entre 60 à 75 jours ouvrables Chine Bamako. C'est l'option la plus économique pour les gros volumes.",
  },
  {
    id: '4',
    question: 'Comment fonctionne le paiement des fournisseurs ?',
    answer:
      'Nous facilitons le paiement sécurisé à vos fournisseurs en Chine via Alipay, WeChat Pay, cartes bancaires et autres méthodes. Vous payez le montant chez nous en fonction du taux du jour et nous réglons vos fournisseurs.',
  },
  {
    id: '5',
    question: 'Comment recharger mon compte ChinaLink Express ?',
    answer:
      'Vous pouvez recharger votre compte client via Orange Money,Wave et Cash. Les fonds sont crédités instantanément et vous permettent de régler vos expéditions plus rapidement.',
  },
  {
    id: '6',
    question: 'Proposez-vous un suivi en temps réel ?',
    answer:
      "Oui, tous nos envois sont équipés d'un système de suivi en temps réel accessible depuis votre tableau de bord client dans notre application mobile 24/7 .",
  },
];

export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  WHY_US: 'why-us',
  TESTIMONIALS: 'testimonials',
  PARTNERS: 'partners',
  FAQ: 'faq',
  CONTACT: 'contact',
} as const;
