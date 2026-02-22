/**
 * Validation Utilities
 * 
 * Form validation helpers with security considerations.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'L\'email est requis' };
  }
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Veuillez entrer une adresse email valide' };
  }
  
  // Check for suspicious patterns
  if (trimmed.length > 254) {
    return { isValid: false, error: 'L\'email est trop long' };
  }
  
  return { isValid: true };
}

/**
 * Validate name
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Le nom est requis' };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Le nom doit contenir au moins 2 caractères' };
  }
  
  if (trimmed.length > 100) {
    return { isValid: false, error: 'Le nom est trop long' };
  }
  
  // Check for only whitespace or special characters
  const hasValidChars = /[\p{L}\p{N}]/u.test(trimmed);
  if (!hasValidChars) {
    return { isValid: false, error: 'Le nom contient des caractères invalides' };
  }
  
  return { isValid: true };
}

/**
 * Validate phone number (optional field)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { isValid: true }; // Phone is optional
  }
  
  const trimmed = phone.trim();
  
  // Remove common phone separators for validation
  const digitsOnly = trimmed.replace(/[\s\-\.\(\)\+]/g, '');
  
  // Check if contains only digits after removing separators
  if (!/^\d+$/.test(digitsOnly)) {
    return { isValid: false, error: 'Le numéro contient des caractères invalides' };
  }
  
  // International phone numbers: 8-15 digits
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return { isValid: false, error: 'Le numéro doit contenir entre 8 et 15 chiffres' };
  }
  
  return { isValid: true };
}

/**
 * Validate message
 */
export function validateMessage(message: string): ValidationResult {
  const trimmed = message.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Le message est requis' };
  }
  
  if (trimmed.length < 10) {
    return { isValid: false, error: 'Le message doit contenir au moins 10 caractères' };
  }
  
  if (trimmed.length > 5000) {
    return { isValid: false, error: 'Le message ne doit pas dépasser 5000 caractères' };
  }
  
  return { isValid: true };
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Check for suspicious content (spam detection)
 */
export function containsSuspiciousContent(text: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /mocha:/i,
    /livescript:/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(text));
}

/**
 * Rate limiting check using localStorage
 */
const RATE_LIMIT_KEY = 'contact_form_submissions';
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface SubmissionRecord {
  timestamp: number;
}

export function checkRateLimit(): { allowed: boolean; remaining: number; resetIn?: number } {
  if (typeof window === 'undefined') {
    return { allowed: true, remaining: MAX_SUBMISSIONS };
  }
  
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    const submissions: SubmissionRecord[] = stored ? JSON.parse(stored) : [];
    
    // Filter out old submissions
    const validSubmissions = submissions.filter(
      sub => now - sub.timestamp < TIME_WINDOW_MS
    );
    
    if (validSubmissions.length >= MAX_SUBMISSIONS) {
      const oldestSubmission = validSubmissions[0];
      const resetIn = Math.ceil((oldestSubmission.timestamp + TIME_WINDOW_MS - now) / 60000);
      
      return { 
        allowed: false, 
        remaining: 0, 
        resetIn 
      };
    }
    
    return { 
      allowed: true, 
      remaining: MAX_SUBMISSIONS - validSubmissions.length 
    };
  } catch {
    // If localStorage fails, allow submission
    return { allowed: true, remaining: MAX_SUBMISSIONS };
  }
}

/**
 * Record a submission for rate limiting
 */
export function recordSubmission(): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: SubmissionRecord[] = stored ? JSON.parse(stored) : [];
    
    submissions.push({ timestamp: Date.now() });
    
    // Keep only recent submissions
    const now = Date.now();
    const validSubmissions = submissions.filter(
      sub => now - sub.timestamp < TIME_WINDOW_MS
    );
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(validSubmissions));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  
  // Store in sessionStorage
  try {
    sessionStorage.setItem('csrf_token', token);
  } catch {
    // Silently fail
  }
  
  return token;
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  if (typeof window === 'undefined') {
    return true; // Allow on server
  }
  
  try {
    const stored = sessionStorage.getItem('csrf_token');
    return stored === token;
  } catch {
    return true; // Allow if storage is unavailable
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Chinese numbers (+86)
  if (cleaned.startsWith('86') && cleaned.length === 13) {
    return `+86 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  
  // Format Mali numbers (+223)
  if (cleaned.startsWith('223') && cleaned.length === 11) {
    return `+223 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  
  // Generic formatting
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
}
