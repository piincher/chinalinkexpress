/**
 * Import Quiz Feature - Public API
 * 
 * Export all public components, hooks, and utilities for the import quiz feature.
 */

// Components
export { QuizContainer } from './components/QuizContainer';
export { PricingSection } from './components/guide/PricingSection';

// Hooks
export { useQuizStore } from './stores/useQuizStore';

// Types
export type {
  QuizState,
  LeadCategory,
  QuizQuestion,
  QuizOption,
  QuizSubmissionData,
  QuizSubmissionResponse,
  PhoneValidationResult,
} from './types';

// Utilities
export {
  calculateScore,
  getLeadCategory,
  generateQuizResult,
  prepareSubmissionData,
} from './lib/scoring';

export {
  calculateQuizDimensions,
  buildServiceRecommendation,
  generateDiagnostic,
} from './lib/diagnostics';

export {
  validateWhatsAppNumber,
  formatPhoneForDisplay,
  maskPhoneNumber,
  generateWhatsAppLink,
} from './lib/whatsapp';

// Constants
export {
  QUIZ_CONFIG,
  QUIZ_QUESTIONS,
  LEAD_CATEGORIES,
  RESULT_MESSAGES,
  FOLLOW_UP_MESSAGES,
} from './lib/constants';
