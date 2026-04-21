import type {
  LeadCategory,
  QuizDiagnostic,
  QuizDimensions,
  ServiceRecommendation,
} from '../types';
import { calculateScore, getLeadCategory } from './scoring';

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function answer(answers: Record<number, string>, questionId: number): string {
  return answers[questionId] || '';
}

export function calculateQuizDimensions(answers: Record<number, string>): QuizDimensions {
  const supplier = answer(answers, 1);
  const budget = answer(answers, 2);
  const product = answer(answers, 3);
  const experience = answer(answers, 4);
  const urgency = answer(answers, 5);

  const supplierReadiness = {
    yes: 90,
    several: 70,
    searching: 35,
    no: 10,
  }[supplier] ?? 0;

  const budgetReadiness = {
    '>5m': 95,
    '2m-5m': 82,
    '500k-2m': 62,
    '<500k': 38,
  }[budget] ?? 0;

  const logisticsReadiness = {
    fashion: 78,
    electronics: 62,
    home: 72,
    hardware: 70,
    beauty: 48,
    other: 45,
  }[product] ?? 40;

  const experienceScore = {
    expert: 95,
    some: 78,
    other_countries: 62,
    first: 35,
  }[experience] ?? 30;

  const urgencyScore = {
    '2weeks': 95,
    month: 80,
    '3months': 48,
    unsure: 20,
  }[urgency] ?? 20;

  const riskPoints = [
    supplier === 'no' || supplier === 'searching' ? 28 : 0,
    product === 'electronics' ? 18 : 0,
    product === 'beauty' ? 24 : 0,
    budget === '<500k' ? 12 : 0,
    experience === 'first' ? 22 : 0,
    urgency === '2weeks' && (supplier === 'no' || supplier === 'searching') ? 18 : 0,
  ].reduce((total, item) => total + item, 0);

  const riskLevel = riskPoints >= 55 ? 'high' : riskPoints >= 25 ? 'medium' : 'low';

  return {
    supplierReadiness: clamp(supplierReadiness),
    budgetReadiness: clamp(budgetReadiness),
    logisticsReadiness: clamp(logisticsReadiness),
    urgency: clamp(urgencyScore),
    experience: clamp(experienceScore),
    riskLevel,
  };
}

export function buildServiceRecommendation(
  answers: Record<number, string>,
  dimensions: QuizDimensions,
  category: LeadCategory
): ServiceRecommendation {
  const supplier = answer(answers, 1);
  const budget = answer(answers, 2);
  const product = answer(answers, 3);
  const urgency = answer(answers, 5);

  const primaryService =
    supplier === 'no' || supplier === 'searching'
      ? 'sourcing'
      : dimensions.riskLevel === 'high'
        ? 'supplier_verification'
        : urgency === '2weeks'
          ? 'air_freight'
          : budget === '>5m'
            ? 'sea_freight'
            : 'supplier_payment';

  const shippingMode =
    urgency === '2weeks' || product === 'electronics'
      ? 'air'
      : budget === '>5m'
        ? 'sea_fcl'
        : budget === '2m-5m'
          ? 'sea_lcl'
          : 'undecided';

  const leadPriority = clamp(
    dimensions.urgency * 0.35 +
      dimensions.budgetReadiness * 0.3 +
      dimensions.supplierReadiness * 0.2 +
      (category === 'hot' ? 15 : category === 'warm' ? 8 : 0)
  );

  const nextAction =
    primaryService === 'sourcing'
      ? 'Envoyer le produit recherché ou une photo pour lancer une recherche fournisseur.'
      : primaryService === 'supplier_verification'
        ? 'Envoyer le lien fournisseur pour une vérification avant paiement.'
        : primaryService === 'air_freight'
          ? 'Envoyer le poids, les dimensions et la ville de livraison pour un devis aérien.'
          : primaryService === 'sea_freight'
            ? 'Envoyer le volume estimé ou la liste de colisage pour un devis maritime.'
            : 'Envoyer la facture pro forma afin de préparer le paiement fournisseur.';

  const priorityReason = [
    category === 'hot' ? 'profil prêt à passer à l’action' : 'profil à accompagner',
    budget === '>5m' || budget === '2m-5m' ? 'budget commercial sérieux' : 'budget à qualifier',
    urgency === '2weeks' || urgency === 'month' ? 'délai proche' : 'délai encore ouvert',
    dimensions.riskLevel === 'high' ? 'risque fournisseur/logistique élevé' : 'risque maîtrisable',
  ].join(' · ');

  return {
    primaryService,
    shippingMode,
    nextAction,
    priorityReason,
    leadPriority,
  };
}

export function generateDiagnostic(answers: Record<number, string>): QuizDiagnostic {
  const score = calculateScore(answers);
  const category = getLeadCategory(score);
  const dimensions = calculateQuizDimensions(answers);
  const recommendation = buildServiceRecommendation(answers, dimensions, category);

  return {
    score,
    category,
    dimensions,
    recommendation,
  };
}
