/**
 * WhatsApp Message Templates
 * 
 * Message templates for WasenderAPI integration with the Import Readiness Quiz.
 * All messages are in French (primary market) and optimized for mobile readability.
 * 
 * @module wasender/templates
 */

import { CONTACT_CONFIG, APP_CONFIG } from '@/config/app';
import { LeadCategory } from '@/features/import-quiz/types';

// ============================================================================
// Configuration
// ============================================================================

const WHATSAPP_NUMBER = CONTACT_CONFIG.WHATSAPP.MALI;
const BRAND_NAME = APP_CONFIG.NAME;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate WhatsApp click-to-chat link with pre-filled message
 */
function generateWhatsAppChatLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Format score with visual indicator
 */
function formatScore(score: number): string {
  const filledBlocks = Math.round(score / 10);
  const emptyBlocks = 10 - filledBlocks;
  const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  return `${progressBar} ${score}%`;
}

// ============================================================================
// Quiz Result Messages
// ============================================================================

/**
 * Get message for HOT leads (score >= 80)
 * These leads are ready to import immediately
 */
export function getHotLeadMessage(score: number, guideUrl: string): string {
  const directQuoteLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je viens de faire le quiz et j'ai obtenu ${score}/100. ` +
    `Je suis prêt à importer et j'aimerais obtenir un devis.\n\n` +
    `Merci!`
  );

  return `🎉 *Félicitations ! Vous êtes prêt à importer !*

${formatScore(score)}

Votre profil montre que vous avez tout ce qu'il faut pour réussir votre premier import de Chine.

📘 *Votre Guide Personnalisé*
👇 Cliquez pour accéder :
${guideUrl}

✅ *Prochaine étape : Obtenez votre devis*

Notre équipe est prête à vous accompagner immédiatement.

📲 *Me contacter sur WhatsApp :*
${directQuoteLink}

Répondez aussi par :
• *DEVIS* → Estimation de vos frais d'expédition
• *CONSEILLER* → Parler à un expert import

_Bonne chance dans vos projets !_
_${BRAND_NAME} - Votre pont vers la Chine 🇨🇳_`;
}

/**
 * Get message for WARM leads (score 50-79)
 * These leads need a few adjustments before importing
 */
export function getWarmLeadMessage(score: number, guideUrl: string): string {
  const helpLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `J'ai obtenu ${score}/100 au quiz. ` +
    `J'aimerais discuter avec un conseiller pour finaliser ma préparation.\n\n` +
    `Merci!`
  );

  return `⚡ *Vous êtes presque prêt !*

${formatScore(score)}

Excellent début ! Quelques ajustements et vous serez prêt à importer avec succès.

📘 *Votre Guide Complet*
👇 Cliquez ici :
${guideUrl}

📋 *Ce guide vous aide à :*
• Compléter vos dernières étapes de préparation
• Vérifier et sécuriser vos fournisseurs
• Préparer votre première commande en toute confiance
• Éviter les pièges courants des débutants

💬 *Besoin d'aide ?*

Je suis là pour répondre à vos questions :
${helpLink}

Une fois prêt, répondez *DEVIS* pour vos frais d'expédition.

_${BRAND_NAME} 🇨🇳_`;
}

/**
 * Get message for COLD leads (score < 50)
 * These leads are beginners who need education first
 */
export function getColdLeadMessage(score: number, guideUrl: string): string {
  const questionLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je débute dans l'import et j'ai obtenu ${score}/100 au quiz. ` +
    `J'ai quelques questions pour bien démarrer.\n\n` +
    `Merci de votre aide !`
  );

  return `📚 *Bienvenue dans l'aventure de l'import !*

${formatScore(score)}

Pas d'inquiétude, tout le monde commence quelque part ! L'important est d'apprendre les bonnes pratiques dès le départ.

📘 *Votre Guide "Importer de Chine en 5 Étapes"*
👇 À lire attentivement :
${guideUrl}

✓ Comment choisir un produit gagnant
✓ Où trouver des fournisseurs fiables  
✓ Comment éviter les arnaques
✓ Les bases de la négociation
✓ L'expédition vers Bamako simplifiée

🎯 *Conseil :* Prenez le temps de bien lire ce guide. Il contient tout ce que vous devez savoir avant de commencer.

💬 *Des questions ?*

Je suis disponible pour vous guider :
${questionLink}

_Revenez quand vous serez prêt, je serai là !_
_${BRAND_NAME} 🇨🇳_`;
}

/**
 * Get result message based on lead category
 * Convenience function that delegates to specific category functions
 */
export function getResultMessage(
  category: LeadCategory,
  score: number,
  guideUrl: string
): string {
  switch (category) {
    case 'hot':
      return getHotLeadMessage(score, guideUrl);
    case 'warm':
      return getWarmLeadMessage(score, guideUrl);
    case 'cold':
      return getColdLeadMessage(score, guideUrl);
    default:
      return getColdLeadMessage(score, guideUrl);
  }
}

// ============================================================================
// Follow-Up Messages
// ============================================================================

/**
 * Get follow-up message sent 24h after quiz if guide not opened
 * Gentle reminder with offer to help
 */
export function getFollowUpMessage(guideUrl: string): string {
  const directContactLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je voudrais discuter de mon projet d'import. ` +
    `Pouvez-vous m'aider ?\n\n` +
    `Merci !`
  );

  return `👋 *Bonjour,*

J'espère que vous allez bien !

📚 J'ai remarqué que vous n'avez pas encore consulté votre guide d'import personnalisé.

👉 *Votre guide vous attend ici :*
${guideUrl}

Ce guide contient des informations précieuses pour votre projet d'import de Chine.

💡 *Comment puis-je vous aider ?*

Si vous avez des questions ou besoin d'accompagnement, je suis là :
${directContactLink}

À votre disposition,
_${BRAND_NAME} 🇨🇳_`;
}

/**
 * Get nurture message sent 7 days after quiz
 * Value-add content with soft CTA
 */
export function getNurtureMessage(): string {
  const contactLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je suis intéressé(e) par vos services d'import. ` +
    `Pouvons-nous en discuter ?\n\n` +
    `Merci !`
  );

  // Rotating content for variety
  const tips = [
    {
      title: '💡 Le saviez-vous ?',
      content: `La plupart de nos clients économisent *30-50%* sur leurs achats en important directement de Chine avec ${BRAND_NAME}.`,
    },
    {
      title: '📦 Conseil du jour',
      content: `Pour votre premier import, commencez avec un petit colis test. Cela vous permet de vérifier la qualité et la fiabilité de votre fournisseur.`,
    },
    {
      title: '✅ Success Story',
      content: `Un de nos clients a importé 500kg de marchandises et a réalisé un bénéfice de 200% en 3 mois. Le marché malien attend vos produits !`,
    },
    {
      title: '🚀 Opportunité',
      content: `Les meilleurs produits à importer actuellement : électronique, mode, articles de maison. Demandez notre catalogue !`,
    },
  ];

  // Select a random tip
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return `*${tip.title}*

${tip.content}

⏱️ *Nos délais d'expédition :*
📦 Fret Aérien : 10-14 jours
🚢 Fret Maritime : 45-60 jours

📲 *Prêt à démarrer ?*
Discutons de votre projet :
${contactLink}

À bientôt,
_${BRAND_NAME} 🇨🇳_`;
}

// ============================================================================
// Guide Confirmation Messages
// ============================================================================

/**
 * Get confirmation message when user opens the guide
 * Sent to acknowledge and offer immediate help
 */
export function getGuideOpenedConfirmation(): string {
  const helpLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je viens d'ouvrir le guide et j'ai quelques questions.\n\n` +
    `Pouvez-vous m'aider ?\n\n` +
    `Merci !`
  );

  return `✅ *Guide ouvert avec succès !*

J'espère que vous trouverez toutes les informations utiles pour votre projet d'import.

💬 *Des questions après lecture ?*

N'hésitez pas à me contacter directement :
${helpLink}

Je réponds généralement sous *2 heures*.

📌 *Rappel :* Vous pouvez consulter ce guide autant de fois que vous voulez. Il est à vous !

Bonne lecture,
_${BRAND_NAME} 🇨🇳_`;
}

// ============================================================================
// Additional Utility Messages
// ============================================================================

/**
 * Get welcome message for new WhatsApp contacts
 */
export function getWelcomeMessage(): string {
  const quizLink = `${CONTACT_CONFIG.WHATSAPP.MALI}`; // Could be replaced with actual quiz link

  return `👋 *Bienvenue chez ${BRAND_NAME} !*

Votre partenaire logistique de confiance pour importer de Chine vers le Mali et l'Afrique.

🚀 *Nos services :*
• Sourcing de fournisseurs fiables
• Achat et négociation
• Fret aérien & maritime
• Dédouanement
• Livraison à Bamako

📋 *Testez votre readiness :*
Faites notre quiz gratuit pour savoir si vous êtes prêt à importer :
👉 [Quiz à venir]

💬 *Comment puis-je vous aider aujourd'hui ?*

Répondez par :
• *DEVIS* → Devis d'expédition
• *SOURCING* → Trouver un fournisseur
• *AIDE* → Parler à un conseiller

_${BRAND_NAME} - Votre pont vers la Chine 🇨🇳_`;
}

/**
 * Get quote request response message
 */
export function getQuoteRequestMessage(): string {
  return `📋 *Demande de devis reçue !*

Merci pour votre intérêt. Pour vous donner un devis précis, j'ai besoin de quelques informations :

📦 *Type de marchandise :*
(Ex: vêtements, électronique, etc.)

⚖️ *Poids estimé :*
(En kg)

📐 *Dimensions ou volume :*
(Longueur x Largeur x Hauteur)

🇨🇳 *Ville de départ en Chine :*
(Shanghai, Guangzhou, Shenzhen...)

🇲🇱 *Destination :*
(Bamako ou autre)

✈️ *Mode d'expédition préféré :*
(Aérien rapide / Maritime économique)

Répondez avec ces informations et je vous envoie votre devis sous 30 minutes !

_${BRAND_NAME} 🇨🇳_`;
}

/**
 * Get message for abandoned quiz (user started but didn't finish)
 */
export function getAbandonedQuizMessage(): string {
  const resumeLink = generateWhatsAppChatLink(
    `Bonjour ${BRAND_NAME},\n\n` +
    `Je voudrais reprendre le quiz ou en savoir plus sur l'import.\n\n` +
    `Merci !`
  );

  return `👋 *Vous avez commencé le quiz...*

Mais vous ne l'avez pas terminé ! Pas de problème, on peut continuer quand vous voulez.

🎯 *Pourquoi finir le quiz ?*
• Obtenir un guide personnalisé
• Savoir si vous êtes prêt à importer
• Recevoir des conseils adaptés à votre situation

📲 *Reprendre ou discuter :*
${resumeLink}

À votre rythme !
_${BRAND_NAME} 🇨🇳_`;
}

// ============================================================================
// Export All Templates
// ============================================================================

export const WhatsAppTemplates = {
  // Quiz Results
  getHotLeadMessage,
  getWarmLeadMessage,
  getColdLeadMessage,
  getResultMessage,
  
  // Follow-ups
  getFollowUpMessage,
  getNurtureMessage,
  
  // Confirmations
  getGuideOpenedConfirmation,
  
  // Utility
  getWelcomeMessage,
  getQuoteRequestMessage,
  getAbandonedQuizMessage,
} as const;

export default WhatsAppTemplates;
