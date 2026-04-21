/**
 * Import Quiz Constants
 * 
 * Configuration values and static data for the quiz feature.
 */

import { QuizQuestion } from '../types';

// Quiz Configuration
export const QUIZ_CONFIG = {
  totalQuestions: 5,
  minScore: 0,
  maxScore: 100,
  hotThreshold: 80,
  warmThreshold: 50,
  guideExpirationDays: 30,
  whatsappBusinessNumber: '+8618851725957',
} as const;

// Scoring Categories
export const LEAD_CATEGORIES = {
  hot: {
    minScore: 80,
    maxScore: 100,
    label: 'Prêt à importer',
    emoji: '🎉',
    color: 'green',
    description: 'Vous avez tout ce qu\'il faut pour démarrer!',
  },
  warm: {
    minScore: 50,
    maxScore: 79,
    label: 'Presque prêt',
    emoji: '⚡',
    color: 'yellow',
    description: 'Quelques ajustements et vous serez prêt!',
  },
  cold: {
    minScore: 0,
    maxScore: 49,
    label: 'En apprentissage',
    emoji: '📚',
    color: 'blue',
    description: 'Commençons par les bases de l\'import!',
  },
} as const;

// Quiz Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Avez-vous déjà identifié un fournisseur en Chine ?',
    subtitle: 'Un fournisseur fiable est la clé du succès',
    options: [
      { value: 'yes', label: 'Oui, j\'ai un fournisseur', points: 25 },
      { value: 'several', label: 'J\'en ai plusieurs en tête', points: 15 },
      { value: 'searching', label: 'Non, je cherche encore', points: 5 },
      { value: 'no', label: 'Je ne sais pas par où commencer', points: 0 },
    ],
  },
  {
    id: 2,
    text: 'Quel est votre budget estimé pour cette première commande ?',
    subtitle: 'Le budget détermine votre mode d\'expédition',
    options: [
      { value: '>5m', label: 'Plus de 5 000 000 FCFA', points: 25 },
      { value: '2m-5m', label: '2 000 000 - 5 000 000 FCFA', points: 20 },
      { value: '500k-2m', label: '500 000 - 2 000 000 FCFA', points: 15 },
      { value: '<500k', label: 'Moins de 500 000 FCFA', points: 10 },
    ],
  },
  {
    id: 3,
    text: 'Quelle catégorie de produits souhaitez-vous importer ?',
    subtitle: 'Certaines catégories sont plus faciles pour débuter',
    options: [
      { value: 'fashion', label: 'Mode (vêtements, chaussures, accessoires)', points: 10 },
      { value: 'electronics', label: 'Électronique (téléphones, accessoires)', points: 10 },
      { value: 'home', label: 'Maison & Déco', points: 10 },
      { value: 'hardware', label: 'Quincaillerie & Outillage', points: 10 },
      { value: 'beauty', label: 'Beauté & Cosmétiques', points: 8 },
      { value: 'other', label: 'Autre', points: 8 },
    ],
  },
  {
    id: 4,
    text: 'Avez-vous déjà importé de Chine auparavant ?',
    subtitle: 'L\'expérience compte, mais les débutants sont les bienvenus!',
    options: [
      { value: 'expert', label: 'Oui, plusieurs fois', points: 25 },
      { value: 'some', label: 'Oui, une fois', points: 20 },
      { value: 'other_countries', label: 'Non, mais j\'ai importé d\'autres pays', points: 15 },
      { value: 'first', label: 'Non, c\'est ma première fois', points: 10 },
    ],
  },
  {
    id: 5,
    text: 'Quand souhaitez-vous lancer votre premier import ?',
    subtitle: 'Votre échéance nous aide à vous accompagner',
    options: [
      { value: '2weeks', label: 'Dans les 2 semaines', points: 25 },
      { value: 'month', label: 'Dans le mois', points: 20 },
      { value: '3months', label: 'Dans les 3 mois', points: 10 },
      { value: 'unsure', label: 'Je ne suis pas encore sûr', points: 5 },
    ],
  },
];

// Result Messages for WhatsApp
export const RESULT_MESSAGES = {
  hot: (score: number, guideUrl: string) => `
🎉 Félicitations! Vous êtes prêt à importer!

Score: ${score}/100

Votre guide personnalisé "Importer de Chine en 5 Étapes":
👉 ${guideUrl}

✅ Prochaine étape: Obtenez votre devis maintenant!

Répondez:
• DEVIS - Pour une estimation de vos frais d'expédition
• CONSEILLER - Pour parler à un expert import

_ChinaLink Express - Votre pont vers la Chine 🇨🇳_
`,
  
  warm: (score: number, guideUrl: string) => `
⚡ Vous êtes presque prêt!

Score: ${score}/100

Votre guide personnalisé:
👉 ${guideUrl}

📋 Ce guide vous aide à:
• Compléter vos dernières étapes
• Vérifier vos fournisseurs
• Préparer votre première commande

Une fois prêt, répondez DEVIS pour vos frais d'expédition.

_ChinaLink Express 🇨🇳_
`,
  
  cold: (score: number, guideUrl: string) => `
📚 Commençons par les bases!

Score: ${score}/100

Pas d'inquiétude, tout le monde commence quelque part!

Votre guide complet "Importer de Chine en 5 Étapes":
👉 ${guideUrl}

Ce guide couvre:
✓ Comment choisir un produit gagnant
✓ Où trouver des fournisseurs fiables
✓ Comment éviter les arnaques
✓ Les bases de la négociation
✓ Expédition vers Bamako simplifiée

Lisez attentivement et revenez quand vous serez prêt!

💬 Des questions? Répondez OUI pour discuter.

_ChinaLink Express 🇨🇳_
`,
};

// Follow-up Messages
export const FOLLOW_UP_MESSAGES = {
  reminder: `
📚 Avez-vous consulté votre guide d'import?

Nous avons préparé un guide personnalisé rien que pour vous.

💡 Besoin d'aide pour avancer?
Répondez OUI pour parler à un conseiller import.

_ChinaLink Express 🇨🇳_
`,
  
  nurture: `
💡 Le saviez-vous?

La plupart de nos clients économisent 30-50% sur leurs achats en important directement de Chine avec ChinaLink Express.

📦 Fret Aérien: 10-14 jours
🚢 Fret Maritime: 45-60 jours

Besoin d'aide pour commencer?
Discutons sur WhatsApp!

_ChinaLink Express 🇨🇳_
`,
};
