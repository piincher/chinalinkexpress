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

export type QuizLocale = 'fr' | 'en' | 'zh' | 'ar';

export type QuizEventName =
  | 'quiz_viewed'
  | 'quiz_started'
  | 'question_answered'
  | 'question_previous'
  | 'whatsapp_step_viewed'
  | 'quiz_submitted'
  | 'quiz_submit_failed'
  | 'guide_opened'
  | 'guide_cta_clicked';

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

export interface QuizAttribution {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPath?: string;
}

export interface QuizDimensions {
  supplierReadiness: number;
  budgetReadiness: number;
  logisticsReadiness: number;
  urgency: number;
  experience: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ServiceRecommendation {
  primaryService:
    | 'sourcing'
    | 'supplier_verification'
    | 'supplier_payment'
    | 'air_freight'
    | 'sea_freight'
    | 'import_consultation';
  shippingMode: 'air' | 'sea_lcl' | 'sea_fcl' | 'undecided';
  nextAction: string;
  priorityReason: string;
  leadPriority: number;
}

export interface QuizDiagnostic {
  score: number;
  category: LeadCategory;
  dimensions: QuizDimensions;
  recommendation: ServiceRecommendation;
}

// Submission Types
export interface QuizSubmissionData {
  whatsappNumber: string;
  answers: Record<number, string>;
  score: number;
  category: LeadCategory;
  sessionId?: string;
  attribution?: QuizAttribution;
  diagnostic?: QuizDiagnostic;
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

export interface QuizEventPayload {
  eventName: QuizEventName;
  sessionId: string;
  locale: QuizLocale;
  questionId?: number;
  answerValue?: string;
  metadata?: Record<string, unknown>;
  attribution?: QuizAttribution;
}
