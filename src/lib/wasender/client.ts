/**
 * WasenderAPI Client
 * 
 * WhatsApp message sending utility for ChinaLink Express.
 * Integrates with WasenderAPI for reliable message delivery.
 */

// ============================================================================
// Types
// ============================================================================

export interface SendWhatsAppMessageParams {
  to: string;
  text: string;
  sessionId?: string;
}

export interface SendWhatsAppMessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface WasenderConfig {
  apiKey: string;
  baseUrl: string;
}

export interface WasenderApiResponse {
  success?: boolean;
  messageId?: string;
  message?: string;
  error?: string;
}

// ============================================================================
// Configuration
// ============================================================================

const WASENDER_BASE_URL = 'https://www.wasenderapi.com/api';

/**
 * Get WasenderAPI configuration from environment
 */
function getWasenderConfig(): WasenderConfig {
  const apiKey = process.env.WASENDER_API_KEY;
  
  if (!apiKey) {
    throw new WasenderAuthError(
      'WASENDER_API_KEY environment variable is not set'
    );
  }
  
  return {
    apiKey,
    baseUrl: WASENDER_BASE_URL,
  };
}

/**
 * Validate configuration on initialization
 */
export function validateWasenderConfig(): void {
  const config = getWasenderConfig();
  
  // Basic API key validation
  if (config.apiKey.length < 10) {
    throw new WasenderAuthError('WASENDER_API_KEY appears to be invalid (too short)');
  }
  
  logDebug('WasenderAPI configuration validated successfully');
}

// ============================================================================
// Error Classes
// ============================================================================

export class WasenderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WasenderError';
  }
}

export class WasenderAuthError extends WasenderError {
  constructor(message: string) {
    super(message);
    this.name = 'WasenderAuthError';
  }
}

export class WasenderRateLimitError extends WasenderError {
  retryAfter: number;
  
  constructor(message: string, retryAfter: number = 60) {
    super(message);
    this.name = 'WasenderRateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class WasenderValidationError extends WasenderError {
  constructor(message: string) {
    super(message);
    this.name = 'WasenderValidationError';
  }
}

// ============================================================================
// Validation
// ============================================================================

const MAX_MESSAGE_LENGTH = 4096;

/**
 * Validate phone number format
 * Supports international formats: +1234567890, 1234567890
 */
export function validatePhoneNumber(phone: string): { valid: boolean; error?: string } {
  if (!phone || phone.trim().length === 0) {
    return { valid: false, error: 'Phone number is required' };
  }
  
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\.\(\)]/g, '');
  
  // Check for valid international format
  // Must start with + followed by country code and number
  // Or start with digits (will be treated as already formatted)
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  
  if (!phoneRegex.test(cleaned)) {
    return { 
      valid: false, 
      error: 'Invalid phone number format. Use international format: +1234567890' 
    };
  }
  
  // Check length (E.164 max is 15 digits including country code)
  const digitsOnly = cleaned.replace(/^\+/, '');
  if (digitsOnly.length > 15) {
    return { valid: false, error: 'Phone number is too long (max 15 digits)' };
  }
  
  if (digitsOnly.length < 8) {
    return { valid: false, error: 'Phone number is too short (min 8 digits)' };
  }
  
  return { valid: true };
}

/**
 * Validate message text
 */
export function validateMessageText(text: string): { valid: boolean; error?: string } {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Message text is required' };
  }
  
  if (text.length > MAX_MESSAGE_LENGTH) {
    return { 
      valid: false, 
      error: `Message text is too long (${text.length} chars, max ${MAX_MESSAGE_LENGTH})` 
    };
  }
  
  return { valid: true };
}

/**
 * Validate all parameters before sending
 */
function validateParams(params: SendWhatsAppMessageParams): void {
  const phoneValidation = validatePhoneNumber(params.to);
  if (!phoneValidation.valid) {
    throw new WasenderValidationError(phoneValidation.error!);
  }
  
  const textValidation = validateMessageText(params.text);
  if (!textValidation.valid) {
    throw new WasenderValidationError(textValidation.error!);
  }
}

// ============================================================================
// Logging
// ============================================================================

const isDev = process.env.NODE_ENV === 'development';

function logDebug(message: string, data?: unknown): void {
  if (isDev) {
    console.log(`[WasenderAPI] ${message}`, data ? data : '');
  }
}

function logError(message: string, error: unknown, context?: Record<string, unknown>): void {
  const errorInfo = {
    message,
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    context,
    timestamp: new Date().toISOString(),
  };
  
  // Always log errors
  console.error(`[WasenderAPI] ${message}`, errorInfo);
}

function logAttempt(attempt: number, maxAttempts: number, to: string): void {
  logDebug(`Attempt ${attempt}/${maxAttempts}: Sending message to ${to}`);
}

// ============================================================================
// HTTP Client
// ============================================================================

const REQUEST_TIMEOUT_MS = 10000; // 10 seconds
const MAX_RETRIES = 3;

/**
 * Create abort controller with timeout
 */
function createTimeoutController(timeoutMs: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller;
}

/**
 * Calculate exponential backoff delay
 */
function getRetryDelay(attempt: number): number {
  // Exponential backoff: 1s, 2s, 4s
  return Math.min(1000 * Math.pow(2, attempt - 1), 10000);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse API response
 */
async function parseResponse(response: Response): Promise<WasenderApiResponse> {
  try {
    return await response.json() as WasenderApiResponse;
  } catch {
    // If JSON parsing fails, return a generic response
    return {
      success: response.ok,
      message: response.statusText,
    };
  }
}

/**
 * Handle HTTP error responses
 */
function handleHttpError(
  response: Response, 
  apiResponse: WasenderApiResponse
): never {
  const errorMessage = apiResponse.message || apiResponse.error || response.statusText;
  
  switch (response.status) {
    case 401:
      throw new WasenderAuthError(`Authentication failed: ${errorMessage}`);
    
    case 429: {
      const retryAfter = response.headers.get('Retry-After');
      throw new WasenderRateLimitError(
        `Rate limit exceeded: ${errorMessage}`,
        retryAfter ? parseInt(retryAfter, 10) : 60
      );
    }
    
    case 400:
      throw new WasenderValidationError(`Bad request: ${errorMessage}`);
    
    case 403:
      throw new WasenderAuthError(`Forbidden: ${errorMessage}`);
    
    case 404:
      throw new WasenderError(`Endpoint not found: ${errorMessage}`);
    
    case 500:
    case 502:
    case 503:
    case 504:
      throw new WasenderError(`Server error (${response.status}): ${errorMessage}`);
    
    default:
      throw new WasenderError(`HTTP ${response.status}: ${errorMessage}`);
  }
}

// ============================================================================
// Main API Function
// ============================================================================

/**
 * Send WhatsApp message via WasenderAPI
 * 
 * @param params - Message parameters (to, text, optional sessionId)
 * @returns Promise with success status, messageId, and optional error
 * 
 * @example
 * ```typescript
 * const result = await sendWhatsAppMessage({
 *   to: '+1234567890',
 *   text: 'Hello from ChinaLink Express!',
 * });
 * 
 * if (result.success) {
 *   console.log('Message sent:', result.messageId);
 * } else {
 *   console.error('Failed:', result.error);
 * }
 * ```
 */
export async function sendWhatsAppMessage(
  params: SendWhatsAppMessageParams
): Promise<SendWhatsAppMessageResult> {
  // Validate parameters first
  try {
    validateParams(params);
  } catch (error) {
    if (error instanceof WasenderValidationError) {
      return { success: false, error: error.message };
    }
    throw error;
  }
  
  // Get configuration
  let config: WasenderConfig;
  try {
    config = getWasenderConfig();
  } catch (error) {
    if (error instanceof WasenderAuthError) {
      return { success: false, error: error.message };
    }
    throw error;
  }
  
  // Prepare request
  const url = `${config.baseUrl}/send-message`;
  const body = {
    to: params.to,
    text: params.text,
    ...(params.sessionId && { sessionId: params.sessionId }),
  };
  
  // Retry loop
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    logAttempt(attempt, MAX_RETRIES, params.to);
    
    const controller = createTimeoutController(REQUEST_TIMEOUT_MS);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      
      const apiResponse = await parseResponse(response);
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          const errorMsg = `Authentication failed: ${apiResponse.message || 'Invalid API key'}`;
          logError('Authentication failed', new Error(errorMsg), { to: params.to });
          return { success: false, error: errorMsg };
        }
        
        if (response.status === 429) {
          // Rate limit - wait and retry
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : getRetryDelay(attempt);
          
          logDebug(`Rate limited, waiting ${delay}ms before retry`);
          
          if (attempt < MAX_RETRIES) {
            await sleep(delay);
            continue;
          }
          
          const errorMsg = `Rate limit exceeded. Please try again later.`;
          logError('Rate limit exceeded', new Error(errorMsg), { to: params.to, attempt });
          return { success: false, error: errorMsg };
        }
        
        // Server errors (5xx) - retry
        if (response.status >= 500) {
          if (attempt < MAX_RETRIES) {
            const delay = getRetryDelay(attempt);
            logDebug(`Server error ${response.status}, retrying after ${delay}ms`);
            await sleep(delay);
            continue;
          }
        }
        
        // Other errors - throw to be handled
        handleHttpError(response, apiResponse);
      }
      
      // Success
      logDebug(`Message sent successfully`, { messageId: apiResponse.messageId });
      
      return {
        success: true,
        messageId: apiResponse.messageId,
      };
      
    } catch (error) {
      // Handle abort/timeout
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new WasenderError('Request timeout after 10 seconds');
        
        if (attempt < MAX_RETRIES) {
          logDebug(`Request timeout, retrying (attempt ${attempt + 1}/${MAX_RETRIES})`);
          await sleep(getRetryDelay(attempt));
          continue;
        }
        
        logError('Request timeout after all retries', timeoutError, { to: params.to });
        return { success: false, error: timeoutError.message };
      }
      
      // Network errors - retry
      if (error instanceof TypeError || (error instanceof Error && error.message.includes('fetch'))) {
        if (attempt < MAX_RETRIES) {
          logDebug(`Network error, retrying (attempt ${attempt + 1}/${MAX_RETRIES})`);
          await sleep(getRetryDelay(attempt));
          continue;
        }
        
        const networkError = `Network error: ${error instanceof Error ? error.message : 'Unable to connect to WasenderAPI'}`;
        logError('Network error after all retries', error, { to: params.to });
        return { success: false, error: networkError };
      }
      
      // Re-throw WasenderError types for outer catch
      if (error instanceof WasenderError) {
        throw error;
      }
      
      // Unknown error
      throw error;
    }
  }
  
  // Should not reach here, but just in case
  return { success: false, error: 'Failed to send message after all retries' };
}

// ============================================================================
// Convenience Exports
// ============================================================================

/**
 * Send template-based WhatsApp message
 * Pre-formatted templates for common use cases
 */
export async function sendTemplateMessage(
  to: string,
  templateName: 'welcome' | 'quote_received' | 'shipment_update' | 'delivery_confirmation',
  variables: Record<string, string>
): Promise<SendWhatsAppMessageResult> {
  const templates: Record<string, (vars: Record<string, string>) => string> = {
    welcome: (vars) => `Welcome to ChinaLink Express, ${vars.name || 'Valued Customer'}! 🚀\n\nWe're here to help you ship between China and Africa. Reply with your tracking number for updates.`,
    
    quote_received: (vars) => `Hi ${vars.name || 'there'},\n\nThank you for your quote request! 📦\n\nRoute: ${vars.origin || 'China'} → ${vars.destination || 'Africa'}\nEstimated: ${vars.estimate || '3-5 business days'}\n\nOur team will contact you within 24 hours with a detailed quote.`,
    
    shipment_update: (vars) => `📦 Shipment Update\n\nTracking: ${vars.trackingNumber || 'N/A'}\nStatus: ${vars.status || 'In Transit'}\nLocation: ${vars.location || 'En Route'}\n\n${vars.message || ''}\n\nTrack live: https://chinalink.express/track/${vars.trackingNumber || ''}`,
    
    delivery_confirmation: (vars) => `🎉 Delivery Confirmed!\n\nTracking: ${vars.trackingNumber || 'N/A'}\nDelivered to: ${vars.recipient || 'Recipient'}\nDate: ${vars.date || new Date().toLocaleDateString()}\n\nThank you for choosing ChinaLink Express! Rate your experience: https://chinalink.express/feedback`,
  };
  
  const text = templates[templateName]?.(variables) || variables.message || 'Message from ChinaLink Express';
  
  return sendWhatsAppMessage({ to, text });
}

/**
 * Check if WasenderAPI is properly configured
 */
export function isWasenderConfigured(): boolean {
  try {
    const apiKey = process.env.WASENDER_API_KEY;
    return !!apiKey && apiKey.length >= 10;
  } catch {
    return false;
  }
}

// Default export
export default {
  sendWhatsAppMessage,
  sendTemplateMessage,
  validateWasenderConfig,
  isWasenderConfigured,
  validatePhoneNumber,
  validateMessageText,
};
