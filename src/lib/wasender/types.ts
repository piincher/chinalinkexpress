/**
 * WasenderAPI TypeScript Types
 * 
 * API Documentation: https://www.wasenderapi.com/api
 * Phase 4: WhatsApp Integration for Import Readiness Quiz
 */

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Configuration object for WasenderAPI client
 */
export interface WasenderConfig {
  /** API key for authentication (Bearer token) */
  apiKey: string;
  /** Base URL for API requests (optional, defaults to https://www.wasenderapi.com/api) */
  baseUrl?: string;
  /** Session ID for WhatsApp session management */
  sessionId?: string;
}

// ============================================================================
// Request Types
// ============================================================================

/**
 * Request body for sending a message via WasenderAPI
 * Supports text, image, video, document, audio, and sticker messages
 */
export interface SendMessageRequest {
  /** Recipient phone number in E.164 format (e.g., +1234567890) */
  to: string;
  /** Text content for text messages */
  text?: string;
  /** URL for image attachment */
  imageUrl?: string;
  /** URL for video attachment */
  videoUrl?: string;
  /** URL for document attachment */
  documentUrl?: string;
  /** URL for audio attachment */
  audioUrl?: string;
  /** URL for sticker attachment */
  stickerUrl?: string;
  /** Filename for document attachments (required for documents) */
  fileName?: string;
  /** Whether the message should be viewable only once */
  viewOnce?: boolean;
}

// ============================================================================
// Response Types
// ============================================================================

/**
 * Data object returned on successful message send
 */
export interface SendMessageData {
  /** Unique identifier for the sent message */
  messageId: string;
  /** ISO 8601 timestamp of when the message was sent */
  timestamp: string;
  /** Current delivery status of the message */
  status: 'sent' | 'delivered' | 'read';
}

/**
 * Success response from sending a message
 */
export interface SendMessageResponse {
  /** Indicates if the request was successful */
  success: true;
  /** Human-readable success message */
  message?: string;
  /** Response data containing message details */
  data?: SendMessageData;
}

/**
 * Error response from WasenderAPI
 */
export interface WasenderError {
  /** Always false for error responses */
  success: false;
  /** Human-readable error message */
  error: string;
  /** Error code for programmatic handling */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Union type for all API responses
 */
export type WasenderApiResponse<T = SendMessageData> = 
  | { success: true; message?: string; data: T }
  | WasenderError;

// ============================================================================
// Message Status Types
// ============================================================================

/**
 * Status values for message tracking throughout the delivery lifecycle
 */
export type MessageStatus = 
  | 'pending'   // Message is queued but not yet sent
  | 'sent'      // Message has been sent to WhatsApp servers
  | 'delivered' // Message has been delivered to recipient's device
  | 'read'      // Message has been read by recipient
  | 'failed';   // Message failed to send

/**
 * Extended status with timestamps for audit trails
 */
export interface MessageStatusWithTimestamps {
  status: MessageStatus;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  failedAt?: string;
  errorMessage?: string;
}

// ============================================================================
// Webhook Types
// ============================================================================

/**
 * Payload structure for incoming webhook events from WasenderAPI
 */
export interface WebhookPayload {
  /** Event type (e.g., 'message.status', 'message.received') */
  event: string;
  /** Session ID that triggered the event */
  sessionId: string;
  /** Event-specific payload data */
  payload: {
    /** Message identifier */
    messageId: string;
    /** Sender phone number (E.164 format) */
    from: string;
    /** Recipient phone number (E.164 format) */
    to: string;
    /** Current message status (for status updates) */
    status?: string;
    /** ISO 8601 timestamp of the event */
    timestamp: string;
    /** Message text content (for incoming messages) */
    text?: string;
    /** Message type (text, image, video, etc.) */
    type?: string;
    /** Media URL (for media messages) */
    mediaUrl?: string;
  };
}

/**
 * Supported webhook event types
 */
export type WebhookEventType =
  | 'message.status'    // Message status update
  | 'message.received'  // Incoming message received
  | 'session.connected' // WhatsApp session connected
  | 'session.disconnected' // WhatsApp session disconnected
  | 'session.qr';       // QR code for session pairing

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Options for sending messages
 */
export interface SendMessageOptions {
  /** Timeout in milliseconds */
  timeout?: number;
  /** Retry attempts on failure */
  retries?: number;
  /** Whether to validate the phone number before sending */
  validatePhone?: boolean;
}

/**
 * Phone number validation result
 */
export interface PhoneValidationResult {
  /** Whether the phone number is valid */
  valid: boolean;
  /** Normalized phone number in E.164 format */
  normalized?: string;
  /** Country code detected */
  countryCode?: string;
  /** Error message if invalid */
  error?: string;
}

/**
 * Rate limiting information from API responses
 */
export interface RateLimitInfo {
  /** Maximum requests allowed */
  limit: number;
  /** Remaining requests in current window */
  remaining: number;
  /** Unix timestamp when the rate limit resets */
  resetAt: number;
}

/**
 * Session status information
 */
export interface SessionStatus {
  /** Session ID */
  id: string;
  /** Whether the session is connected to WhatsApp */
  connected: boolean;
  /** Phone number associated with the session */
  phoneNumber?: string;
  /** Session creation timestamp */
  createdAt: string;
  /** Last activity timestamp */
  lastActivity?: string;
}
