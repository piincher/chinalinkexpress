/**
 * Import Quiz Feature Types
 * 
 * Domain-specific types for the import readiness quiz feature.
 */

// Quiz State Management
export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  whatsappNumber: string;
  isComplete: boolean;
  score: number;
  category: LeadCategory | null;
  guideUrl: string | null;
  isSubmitting: boolean;
  error: string | null;
}

export type LeadCategory = 'hot' | 'warm' | 'cold';

// Question & Answer Types
export interface QuizOption {
  value: string;
  label: string;
  points: number;
  description?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  subtitle?: string;
  options: QuizOption[];
}

// Submission Types
export interface QuizSubmissionData {
  whatsappNumber: string;
  answers: Record<number, string>;
  score: number;
  category: LeadCategory;
}

export interface QuizSubmissionResponse {
  success: boolean;
  guideUrl?: string;
  error?: string;
}

// Guide Types
export interface GuideData {
  token: string;
  whatsappNumber: string;
  score: number;
  category: LeadCategory;
  answers: Record<number, string>;
  generatedAt: string;
  expiresAt: string;
}

// WhatsApp Validation
export interface PhoneValidationResult {
  isValid: boolean;
  formattedNumber: string;
  countryCode: string;
  error?: string;
}

// Analytics Types
export interface QuizAnalytics {
  totalSubmissions: number;
  completionRate: number;
  averageScore: number;
  categoryDistribution: {
    hot: number;
    warm: number;
    cold: number;
  };
  guideOpenRate: number;
}
