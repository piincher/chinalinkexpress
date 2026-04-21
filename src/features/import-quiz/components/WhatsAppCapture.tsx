/**
 * WhatsApp Capture Component
 * 
 * Collects user's WhatsApp number for quiz result delivery.
 * Features phone number validation, country code selector, and privacy notice.
 */

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Country configuration
interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: Country[] = [
  { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223' },
];

interface WhatsAppCaptureProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string | null;
  isValid: boolean;
}

/**
 * WhatsApp Capture Component
 * 
 * Form component for collecting WhatsApp numbers with validation
 * and country code selection.
 */
export function WhatsAppCapture({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  isValid,
}: WhatsAppCaptureProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phoneInput, setPhoneInput] = useState('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Format phone number for display (adds spaces)
  const formatPhoneDisplay = useCallback((input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    // Format as XX XX XX XX for Mali-style numbers
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    }
    // For longer numbers, just add spaces every 2-3 digits
    return cleaned.replace(/(\d{2,3})(?=\d)/g, '$1 ').trim();
  }, []);

  // Handle phone input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Only allow digits and spaces
    const cleaned = rawValue.replace(/[^\d\s]/g, '');
    
    // Limit to 15 digits maximum
    const digitsOnly = cleaned.replace(/\D/g, '');
    if (digitsOnly.length > 15) return;

    setPhoneInput(cleaned);
    
    // Combine country code + phone for parent
    const fullNumber = `${selectedCountry.dialCode}${digitsOnly}`;
    onChange(fullNumber);

    // Real-time validation
    if (touched && digitsOnly.length > 0) {
      validateNumber(fullNumber, digitsOnly);
    }
  };

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = COUNTRIES.find(c => c.code === e.target.value);
    if (country) {
      setSelectedCountry(country);
      // Re-validate with new country code
      const digitsOnly = phoneInput.replace(/\D/g, '');
      const fullNumber = `${country.dialCode}${digitsOnly}`;
      onChange(fullNumber);
      
      if (touched && digitsOnly.length > 0) {
        validateNumber(fullNumber, digitsOnly);
      }
    }
  };

  // Validate phone number
  const validateNumber = (fullNumber: string, digitsOnly: string) => {
    // Minimum 8 digits check
    if (digitsOnly.length < 8) {
      setValidationMessage('Le numéro doit contenir au moins 8 chiffres');
      return;
    }

    // Maximum 15 digits check
    if (digitsOnly.length > 15) {
      setValidationMessage('Le numéro ne doit pas dépasser 15 chiffres');
      return;
    }

    // Use libphonenumber-js for validation
    try {
      if (isValidPhoneNumber(fullNumber)) {
        setValidationMessage('Numéro valide ✓');
      } else {
        setValidationMessage('Format de numéro invalide');
      }
    } catch {
      setValidationMessage('Format de numéro invalide');
    }
  };

  // Handle blur event
  const handleBlur = () => {
    setTouched(true);
    const digitsOnly = phoneInput.replace(/\D/g, '');
    const fullNumber = `${selectedCountry.dialCode}${digitsOnly}`;
    validateNumber(fullNumber, digitsOnly);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    const digitsOnly = phoneInput.replace(/\D/g, '');
    const fullNumber = `${selectedCountry.dialCode}${digitsOnly}`;
    validateNumber(fullNumber, digitsOnly);

    if (isValid && !isSubmitting) {
      onSubmit();
    }
  };

  // Determine validation state color
  const getValidationColor = () => {
    if (!touched || phoneInput.length === 0) return 'text-gray-500';
    if (isValid) return 'text-green-600';
    return 'text-red-600';
  };

  // Get validation icon
  const ValidationIcon = () => {
    if (!touched || phoneInput.length === 0) return null;
    
    if (isValid) {
      return (
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    return (
      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* WhatsApp Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Recevez votre résultat sur WhatsApp
        </h2>

        {/* Benefits List */}
        <ul className="space-y-2 mb-6">
          {[
            'Guide personnalisé envoyé instantanément',
            'Conseils adaptés à votre niveau',
            'Support client par WhatsApp',
          ].map((benefit, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <svg 
                className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Input Group */}
          <div>
            <label 
              htmlFor="whatsapp" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Numéro WhatsApp
            </label>
            
            <div className="flex gap-2">
              {/* Country Code Dropdown */}
              <div className="relative flex-shrink-0">
                <select
                  value={selectedCountry.code}
                  onChange={handleCountryChange}
                  disabled={isSubmitting}
                  className={cn(
                    'appearance-none w-[100px] h-12 pl-3 pr-8',
                    'bg-gray-50 border border-gray-300 rounded-lg',
                    'text-sm font-medium text-gray-900',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'cursor-pointer'
                  )}
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.dialCode}
                    </option>
                  ))}
                </select>
                
                {/* Dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="whatsapp"
                  value={phoneInput}
                  onChange={handlePhoneChange}
                  onBlur={handleBlur}
                  placeholder="XX XX XX XX"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full h-12 px-4',
                    'bg-gray-50 border rounded-lg',
                    'text-lg font-medium text-gray-900 placeholder-gray-400',
                    'focus:outline-none focus:ring-2 focus:border-transparent',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-colors duration-200',
                    touched && phoneInput.length > 0
                      ? isValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  )}
                />
                
                {/* Validation Icon */}
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <ValidationIcon />
                </div>
              </div>
            </div>

            {/* Validation/Error Message */}
            <div className="mt-2 min-h-[20px]">
              {error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : validationMessage ? (
                <p className={cn('text-sm', getValidationColor())}>
                  {validationMessage}
                </p>
              ) : null}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={cn(
              'w-full h-12 px-6',
              'bg-green-600 text-white font-semibold',
              'rounded-xl',
              'flex items-center justify-center',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
              !isValid || isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-green-700 active:bg-green-800'
            )}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Recevoir mon guide'
            )}
          </button>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            En soumettant, vous acceptez de recevoir votre guide et des informations 
            sur nos services par WhatsApp. Vos données sont sécurisées et ne seront 
            jamais partagées.{' '}
            <a 
              href="/privacy" 
              className="underline hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Politique de confidentialité
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default WhatsAppCapture;
