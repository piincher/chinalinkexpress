/**
 * WhatsApp Utilities
 * 
 * Phone number validation and formatting for WhatsApp integration.
 */

import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js/min';
import type { CountryCode } from 'libphonenumber-js';
import type { PhoneValidationResult } from '../types';

/**
 * Validate and format WhatsApp phone number
 */
export function validateWhatsAppNumber(
  phoneNumber: string,
  defaultCountry: CountryCode = 'ML'
): PhoneValidationResult {
  try {
    // Clean the input
    const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');

    // Check if valid
    if (!isValidPhoneNumber(cleaned, defaultCountry)) {
      return {
        isValid: false,
        formattedNumber: '',
        countryCode: '',
        error: 'Numéro de téléphone invalide',
      };
    }

    // Parse and format
    const phoneNumberObj = parsePhoneNumber(cleaned, defaultCountry);
    
    if (!phoneNumberObj) {
      return {
        isValid: false,
        formattedNumber: '',
        countryCode: '',
        error: 'Impossible de parser le numéro',
      };
    }

    // Format for WhatsApp (E.164 format without the +)
    const formattedNumber = phoneNumberObj.format('E.164').replace('+', '');

    return {
      isValid: true,
      formattedNumber,
      countryCode: phoneNumberObj.countryCallingCode,
    };
  } catch {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return {
        isValid: true,
        formattedNumber: digitsOnly,
        countryCode: digitsOnly.startsWith('223') ? '223' : '',
      };
    }

    return {
      isValid: false,
      formattedNumber: '',
      countryCode: '',
      error: 'Erreur de validation',
    };
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneForDisplay(
  phoneNumber: string,
  defaultCountry: CountryCode = 'ML'
): string {
  try {
    const phoneNumberObj = parsePhoneNumber(phoneNumber, defaultCountry);
    return phoneNumberObj?.formatInternational() || phoneNumber;
  } catch {
    return phoneNumber;
  }
}

/**
 * Mask phone number for privacy (display purposes)
 */
export function maskPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length < 8) return phoneNumber;
  
  return cleaned.slice(0, 3) + '****' + cleaned.slice(-3);
}

/**
 * Generate WhatsApp click-to-chat link
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  message?: string
): string {
  const baseUrl = 'https://wa.me/';
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}${cleanedNumber}?text=${encodedMessage}`;
  }
  
  return `${baseUrl}${cleanedNumber}`;
}

/**
 * Generate WhatsApp message for quiz result
 */
export function generateResultWhatsAppMessage(
  category: 'hot' | 'warm' | 'cold',
  score: number
): string {
  const messages = {
    hot: `Bonjour ChinaLink Express,

Je viens de faire le quiz et mon score est ${score}/100.
Je suis prêt à importer! Pouvez-vous m'aider avec un devis?

Merci!`,
    
    warm: `Bonjour ChinaLink Express,

J'ai fait le quiz (score: ${score}/100) et je suis presque prêt.
J'aimerais discuter avec un conseiller pour finaliser ma préparation.

Merci!`,
    
    cold: `Bonjour ChinaLink Express,

Je débute dans l'import et j'ai fait votre quiz (score: ${score}/100).
J'aimerais avoir des conseils pour bien démarrer.

Merci!`,
  };

  return messages[category];
}

/**
 * Validate if number is a valid Mali number
 */
export function isMaliNumber(phoneNumber: string): boolean {
  try {
    const phoneNumberObj = parsePhoneNumber(phoneNumber, 'ML' as CountryCode);
    return phoneNumberObj?.country === 'ML' || false;
  } catch {
    return false;
  }
}
