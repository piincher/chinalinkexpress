/**
 * Error Handling and Retry Logic for WasenderAPI
 * 
 * Robust retry mechanism for WhatsApp message sending with
 * exponential backoff, jitter, and intelligent error classification.
 */

/**
 * Retry configuration constants
 */
export const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
} as const;

/**
 * Error classification types
 */
export type ErrorClassification = 'retryable' | 'permanent' | 'unknown';

/**
 * WasenderAPI specific error types
 */
export interface WasenderError extends Error {
  code?: string;
  statusCode?: number;
  response?: {
    status?: number;
    data?: unknown;
  };
}

/**
 * Network error detection patterns
 */
const NETWORK_ERROR_PATTERNS = [
  'ECONNREFUSED',
  'ECONNRESET',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'socket hang up',
  'network error',
  'Network Error',
  'fetch failed',
  'Failed to fetch',
];

/**
 * Timeout error detection patterns
 */
const TIMEOUT_PATTERNS = [
  'timeout',
  'ETIMEDOUT',
  'ETIMEOUT',
  'request timeout',
  'Response timeout',
  'operation timed out',
];

/**
 * Classify an error as retryable, permanent, or unknown
 * 
 * @param error - The error to classify
 * @returns Classification of the error
 */
export function classifyError(error: Error): ErrorClassification {
  const errorMessage = error.message.toLowerCase();
  const wasenderError = error as WasenderError;
  const statusCode = wasenderError.statusCode || wasenderError.response?.status;

  // Check for HTTP status codes first
  if (statusCode) {
    // 5xx errors are retryable (server errors)
    if (statusCode >= 500 && statusCode < 600) {
      return 'retryable';
    }

    // 429 Rate Limit - retryable with delay
    if (statusCode === 429) {
      return 'retryable';
    }

    // 401 Unauthorized - permanent (auth error)
    if (statusCode === 401) {
      return 'permanent';
    }

    // 403 Forbidden - permanent (auth/permission error)
    if (statusCode === 403) {
      return 'permanent';
    }

    // 404 Not Found - permanent (resource doesn't exist)
    if (statusCode === 404) {
      return 'permanent';
    }

    // 400 Bad Request - permanent (client error)
    if (statusCode === 400) {
      return 'permanent';
    }

    // Other 4xx errors - permanent (client errors)
    if (statusCode >= 400 && statusCode < 500) {
      return 'permanent';
    }
  }

  // Check for network errors
  if (NETWORK_ERROR_PATTERNS.some(pattern => 
    error.message.includes(pattern) || 
    wasenderError.code === pattern
  )) {
    return 'retryable';
  }

  // Check for timeout errors
  if (TIMEOUT_PATTERNS.some(pattern => errorMessage.includes(pattern.toLowerCase()))) {
    return 'retryable';
  }

  // Check for specific error codes
  if (wasenderError.code) {
    const retryableCodes = ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND'];
    if (retryableCodes.includes(wasenderError.code)) {
      return 'retryable';
    }
  }

  // Abort errors (user cancelled) - permanent
  if (error.name === 'AbortError' || errorMessage.includes('aborted')) {
    return 'permanent';
  }

  // Unknown errors - assume retryable for safety
  return 'unknown';
}

/**
 * Determine if an error should be retried based on classification and attempt number
 * 
 * @param error - The error that occurred
 * @param attempt - Current attempt number (0-indexed)
 * @returns Whether to retry the operation
 */
export function shouldRetry(error: Error, attempt: number): boolean {
  // Don't retry if max retries reached
  if (attempt >= RETRY_CONFIG.maxRetries) {
    logRetryDecision(error, attempt, false, 'max retries exceeded');
    return false;
  }

  const classification = classifyError(error);

  switch (classification) {
    case 'retryable':
      logRetryDecision(error, attempt, true, 'error is retryable');
      return true;
    
    case 'permanent':
      logRetryDecision(error, attempt, false, 'error is permanent (client error)');
      return false;
    
    case 'unknown':
      // For unknown errors, be conservative and retry once
      if (attempt < 1) {
        logRetryDecision(error, attempt, true, 'unknown error, attempting retry');
        return true;
      }
      logRetryDecision(error, attempt, false, 'unknown error, retries exhausted');
      return false;
    
    default:
      return false;
  }
}

/**
 * Calculate delay with exponential backoff and jitter
 * 
 * Formula: min(baseDelay * multiplier^attempt, maxDelay) + randomJitter
 * 
 * @param attempt - Current attempt number (0-indexed)
 * @returns Delay in milliseconds
 */
export function calculateDelay(attempt: number): number {
  // Calculate exponential backoff
  const exponentialDelay = RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt);
  
  // Cap at maxDelay
  const cappedDelay = Math.min(exponentialDelay, RETRY_CONFIG.maxDelay);
  
  // Add jitter (random 0-1000ms) to prevent thundering herd
  const jitter = Math.floor(Math.random() * 1000);
  
  const totalDelay = cappedDelay + jitter;
  
  // Log delay calculation
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Retry] Delay calculation:`, {
      attempt: attempt + 1,
      exponentialDelay: `${exponentialDelay}ms`,
      cappedDelay: `${cappedDelay}ms`,
      jitter: `${jitter}ms`,
      totalDelay: `${totalDelay}ms`,
    });
  }
  
  return totalDelay;
}

/**
 * Log retry decision for debugging
 */
function logRetryDecision(
  error: Error, 
  attempt: number, 
  willRetry: boolean, 
  reason: string
): void {
  const wasenderError = error as WasenderError;
  
  const logData = {
    attempt: attempt + 1,
    maxRetries: RETRY_CONFIG.maxRetries,
    willRetry,
    reason,
    errorMessage: error.message,
    errorName: error.name,
    statusCode: wasenderError.statusCode || wasenderError.response?.status,
    errorCode: wasenderError.code,
  };

  if (typeof window !== 'undefined') {
    if (willRetry) {
      console.warn(`[Retry] Will retry operation:`, logData);
    } else {
      console.error(`[Retry] Will not retry operation:`, logData);
    }
  }
}

/**
 * Log attempt start
 */
function logAttempt(context: string, attempt: number, maxRetries: number): void {
  if (typeof window !== 'undefined') {
    console.log(`[Retry] Starting attempt ${attempt + 1}/${maxRetries + 1} for: ${context}`);
  }
}

/**
 * Log successful retry
 */
function logSuccess(context: string, attempt: number): void {
  if (typeof window !== 'undefined') {
    if (attempt > 0) {
      console.log(`[Retry] Success after ${attempt + 1} attempts for: ${context}`);
    } else {
      console.log(`[Retry] Success on first attempt for: ${context}`);
    }
  }
}

/**
 * Log final failure
 */
function logFinalFailure(context: string, lastError: Error, totalAttempts: number): void {
  if (typeof window !== 'undefined') {
    console.error(`[Retry] Final failure after ${totalAttempts} attempts for: ${context}`, {
      error: lastError.message,
      stack: lastError.stack,
    });
  }
}

/**
 * Sleep utility for delay between retries
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Execute an async function with retry logic
 * 
 * @param fn - The async function to execute
 * @param context - Descriptive context for logging (e.g., 'send-quiz-result')
 * @returns The result of the function
 * @throws The last error encountered after all retries are exhausted
 * 
 * @example
 * ```typescript
 * const result = await withRetry(
 *   () => sendWhatsAppMessage({ to, text }),
 *   'send-quiz-result'
 * );
 * ```
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    logAttempt(context, attempt, RETRY_CONFIG.maxRetries);
    
    try {
      // Attempt the operation
      const result = await fn();
      
      // Success!
      logSuccess(context, attempt);
      return result;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Log the error
      if (typeof window !== 'undefined') {
        console.error(`[Retry] Attempt ${attempt + 1} failed for: ${context}`, {
          error: lastError.message,
          statusCode: (lastError as WasenderError).statusCode,
        });
      }
      
      // Check if we should retry
      if (!shouldRetry(lastError, attempt)) {
        // Don't retry - throw the error immediately
        logFinalFailure(context, lastError, attempt + 1);
        throw lastError;
      }
      
      // Calculate and apply delay before next attempt
      if (attempt < RETRY_CONFIG.maxRetries) {
        const delay = calculateDelay(attempt);
        
        if (typeof window !== 'undefined') {
          console.log(`[Retry] Waiting ${delay}ms before attempt ${attempt + 2}...`);
        }
        
        await sleep(delay);
      }
    }
  }
  
  // All retries exhausted
  if (lastError) {
    logFinalFailure(context, lastError, RETRY_CONFIG.maxRetries + 1);
    throw lastError;
  }
  
  // This should never happen, but TypeScript needs it
  throw new Error(`[Retry] Unexpected state: no error but retries exhausted for: ${context}`);
}

/**
 * Create a retry wrapper with custom configuration
 * 
 * @param customConfig - Partial configuration to override defaults
 * @returns Configured withRetry function
 */
export function createRetryWrapper(customConfig: Partial<typeof RETRY_CONFIG>) {
  const config = { ...RETRY_CONFIG, ...customConfig };
  
  return async function withCustomRetry<T>(
    fn: () => Promise<T>,
    context: string
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        const result = await fn();
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        const shouldRetryAttempt = attempt < config.maxRetries && classifyError(lastError) === 'retryable';
        
        if (!shouldRetryAttempt) {
          throw lastError;
        }
        
        const exponentialDelay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
        const cappedDelay = Math.min(exponentialDelay, config.maxDelay);
        const jitter = Math.floor(Math.random() * 1000);
        
        await sleep(cappedDelay + jitter);
      }
    }
    
    throw lastError!;
  };
}

/**
 * Check if an error is a rate limit error (429)
 */
export function isRateLimitError(error: Error): boolean {
  const wasenderError = error as WasenderError;
  return wasenderError.statusCode === 429 || wasenderError.response?.status === 429;
}

/**
 * Check if an error is an authentication error (401/403)
 */
export function isAuthError(error: Error): boolean {
  const wasenderError = error as WasenderError;
  const statusCode = wasenderError.statusCode || wasenderError.response?.status;
  return statusCode === 401 || statusCode === 403;
}

/**
 * Check if an error is a network connectivity error
 */
export function isNetworkError(error: Error): boolean {
  return classifyError(error) === 'retryable' && 
    NETWORK_ERROR_PATTERNS.some(pattern => error.message.includes(pattern));
}

/**
 * Check if an error is a timeout error
 */
export function isTimeoutError(error: Error): boolean {
  return TIMEOUT_PATTERNS.some(pattern => 
    error.message.toLowerCase().includes(pattern.toLowerCase())
  );
}
