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
