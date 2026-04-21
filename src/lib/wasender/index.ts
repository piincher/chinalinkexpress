/**
 * WasenderAPI Module Exports
 * 
 * WhatsApp Business API integration for ChinaLink Express.
 * Handles lead notifications, follow-ups, and marketing messages.
 * 
 * @module wasender
 * @example
 * ```typescript
 * import { 
 *   sendWhatsAppMessage, 
 *   getHotLeadMessage,
 *   withRetry 
 * } from '@/lib/wasender';
 * ```
 */

// ============================================================================
// Types
// ============================================================================

export type {
  WasenderConfig,
  SendMessageRequest,
  SendMessageResponse,
  WasenderError,
  MessageStatus,
  WebhookPayload,
} from './types';

// ============================================================================
// Client
// ============================================================================

export {
  sendWhatsAppMessage,
  sendTemplateMessage,
  validateWasenderConfig,
  validatePhoneNumber,
  validateMessageText,
  isWasenderConfigured,
} from './client';

// ============================================================================
// Templates
// ============================================================================

export {
  // Lead temperature templates
  getHotLeadMessage,
  getWarmLeadMessage,
  getColdLeadMessage,
  getResultMessage,
  
  // Follow-up templates
  getFollowUpMessage,
  getNurtureMessage,
  
  // Guide interaction templates
  getGuideOpenedConfirmation,
  
  // Other templates
  getWelcomeMessage,
  getQuoteRequestMessage,
  getAbandonedQuizMessage,
  
  // Template registry
  WhatsAppTemplates,
} from './templates';

// ============================================================================
// Retry Logic
// ============================================================================

export {
  withRetry,
  shouldRetry,
  calculateDelay,
  classifyError,
  createRetryWrapper,
  isRateLimitError,
  isAuthError,
  isNetworkError,
  isTimeoutError,
  RETRY_CONFIG,
} from './retry';

// ============================================================================
// Scheduler
// ============================================================================

export {
  getPendingFollowUps,
  sendFollowUpMessage,
  processFollowUps,
} from './scheduler';

export type { FollowUpResult, ProcessStats } from './scheduler';
