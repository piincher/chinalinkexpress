/**
 * Import Readiness Quiz - Guide Types
 * Phase 3: Personalized Guide System
 */

import type { ReactNode } from 'react';

/**
 * Main guide data structure
 * Contains all information for a personalized import guide
 */
export interface GuideData {
  /** Unique token for accessing this guide */
  token: string;
  /** Masked WhatsApp number (e.g., "+223 **** 1234") */
  whatsappNumber: string;
  /** Quiz score (0-100) */
  score: number;
  /** Temperature category based on score */
  category: 'hot' | 'warm' | 'cold';
  /** User's quiz answers - questionId -> answer mapping */
  answers: Record<number, string>;
  /** When the guide was generated */
  generatedAt: Date;
  /** When the guide access expires */
  expiresAt: Date;
}

/**
 * Guide content section
 * Represents a single section within the personalized guide
 */
export interface GuideSection {
  /** Unique identifier for the section */
  id: string;
  /** Display title */
  title: string;
  /** Content - can be plain text or React component */
  content: string | ReactNode;
  /** Optional icon identifier (Lucide icon name) */
  icon?: string;
}

/**
 * Dynamic pricing display
 * Current rates for different shipping methods
 */
export interface PricingDisplay {
  /** Express air freight price per kg (USD) */
  express: number;
  /** Standard air freight price per kg (USD) */
  standard: number;
  /** Electronics shipping price per kg (USD) */
  electronics: number;
  /** Mobile phones shipping price per kg (USD) */
  phones: number;
  /** Sea freight price per CBM (USD) */
  sea: number;
  /** When prices were last updated */
  lastUpdated: Date;
}

/**
 * Guide metadata
 * For SEO, social sharing, and analytics
 */
export interface GuideMeta {
  /** Page title for SEO */
  title: string;
  /** Meta description for SEO */
  description: string;
  /** Open Graph image URL for social sharing */
  ogImage?: string;
}

/**
 * Guide access log entry
 * Tracks when and how guides are accessed (input type only)
 */
export interface GuideAccessLog {
  /** Token of the accessed guide */
  guideToken: string;
  /** IP address of the visitor (optional for privacy) */
  ipAddress?: string;
  /** User agent string of the visitor */
  userAgent?: string;
  /** When the guide was accessed */
  accessedAt: Date;
}

/**
 * Guide temperature categories
 * Used to categorize leads based on quiz score
 */
export type GuideCategory = 'hot' | 'warm' | 'cold';

/**
 * Guide score ranges
 * Defines score thresholds for each category
 */
export interface GuideScoreRanges {
  /** Hot leads: 70-100 */
  hot: { min: number; max: number };
  /** Warm leads: 40-69 */
  warm: { min: number; max: number };
  /** Cold leads: 0-39 */
  cold: { min: number; max: number };
}

/**
 * Default score ranges for guide categorization
 */
export const DEFAULT_GUIDE_SCORE_RANGES: GuideScoreRanges = {
  hot: { min: 70, max: 100 },
  warm: { min: 40, max: 69 },
  cold: { min: 0, max: 39 },
};

/**
 * Determine guide category based on score
 * @param score - Quiz score (0-100)
 * @returns Category: 'hot' | 'warm' | 'cold'
 */
export function getGuideCategory(score: number): GuideCategory {
  if (score >= DEFAULT_GUIDE_SCORE_RANGES.hot.min) {
    return 'hot';
  }
  if (score >= DEFAULT_GUIDE_SCORE_RANGES.warm.min) {
    return 'warm';
  }
  return 'cold';
}

/**
 * Guide validation result
 * Used when validating guide tokens and access
 */
export interface GuideValidationResult {
  /** Whether the guide is valid and accessible */
  valid: boolean;
  /** Error message if invalid */
  error?: string;
  /** The guide data if valid */
  guide?: GuideData;
}

/**
 * Guide generation input
 * Data needed to generate a new guide
 */
export interface GuideGenerationInput {
  /** WhatsApp number for the lead */
  whatsappNumber: string;
  /** Quiz answers */
  answers: Record<number, string>;
  /** Calculated score */
  score: number;
}

/**
 * Guide generation result
 * Result of generating a new guide
 */
export interface GuideGenerationResult {
  /** Whether generation was successful */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** The generated guide token */
  token?: string;
  /** The complete guide data */
  guide?: GuideData;
}
