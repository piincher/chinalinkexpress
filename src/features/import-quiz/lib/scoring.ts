/**
 * Quiz Scoring Logic
 * 
 * Calculates scores and determines lead categories based on quiz answers.
 */

import { LeadCategory, QuizSubmissionData } from '../types';
import { QUIZ_CONFIG, LEAD_CATEGORIES, QUIZ_QUESTIONS } from './constants';

/**
 * Calculate total score from answers
 */
export function calculateScore(answers: Record<number, string>): number {
  let totalScore = 0;

  for (const [questionId, answerValue] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === parseInt(questionId));
    if (question) {
      const option = question.options.find((o) => o.value === answerValue);
      if (option) {
        totalScore += option.points;
      }
    }
  }

  // Ensure score is within bounds
  return Math.max(QUIZ_CONFIG.minScore, Math.min(QUIZ_CONFIG.maxScore, totalScore));
}

/**
 * Determine lead category based on score
 */
export function getLeadCategory(score: number): LeadCategory {
  if (score >= QUIZ_CONFIG.hotThreshold) {
    return 'hot';
  }
  if (score >= QUIZ_CONFIG.warmThreshold) {
    return 'warm';
  }
  return 'cold';
}

/**
 * Get category display info
 */
export function getCategoryInfo(category: LeadCategory) {
  return LEAD_CATEGORIES[category];
}

/**
 * Generate comprehensive quiz result
 */
export function generateQuizResult(answers: Record<number, string>): {
  score: number;
  category: LeadCategory;
  maxPossibleScore: number;
  percentage: number;
} {
  const score = calculateScore(answers);
  const category = getLeadCategory(score);
  const maxPossibleScore = 100; // Sum of all max points
  const percentage = Math.round((score / maxPossibleScore) * 100);

  return {
    score,
    category,
    maxPossibleScore,
    percentage,
  };
}

/**
 * Validate quiz answers completeness
 */
export function validateQuizAnswers(
  answers: Record<number, string>,
  requiredQuestions: number
): { isValid: boolean; missingQuestions: number[] } {
  const missingQuestions: number[] = [];

  for (let i = 1; i <= requiredQuestions; i++) {
    if (!answers[i]) {
      missingQuestions.push(i);
    }
  }

  return {
    isValid: missingQuestions.length === 0,
    missingQuestions,
  };
}

/**
 * Generate guide token from phone number
 * Uses simple encoding for URL-safe tokens
 */
export function generateGuideToken(phoneNumber: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  const phoneHash = Buffer.from(phoneNumber).toString('base64url').substring(0, 8);
  
  return `${timestamp}-${phoneHash}-${random}`;
}

/**
 * Prepare submission data for database
 */
export function prepareSubmissionData(
  whatsappNumber: string,
  answers: Record<number, string>
): QuizSubmissionData {
  const { score, category } = generateQuizResult(answers);

  return {
    whatsappNumber,
    answers,
    score,
    category,
  };
}
