/**
 * Contact Form Hook
 * 
 * Custom hook for managing contact form state, validation, and submission.
 * Includes security features like rate limiting and CSRF protection.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  sanitizeInput,
  containsSuspiciousContent,
  checkRateLimit,
  recordSubmission,
  generateCSRFToken,
  validateCSRFToken,
} from '@/lib/validation';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  general?: string;
}

export type SubmitStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  formData: FormData;
  errors: FormErrors;
  status: SubmitStatus;
  csrfToken: string;
  rateLimitInfo: {
    remaining: number;
    resetIn?: number;
  };
  handleChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [csrfToken, setCsrfToken] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState({ remaining: 3 });

  // Initialize CSRF token on mount
  useEffect(() => {
    setCsrfToken(generateCSRFToken());
    setRateLimitInfo(checkRateLimit());
  }, []);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error;
    }

    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error;
    }

    // Check for suspicious content
    const allFields = `${formData.name} ${formData.email} ${formData.phone} ${formData.message}`;
    if (containsSuspiciousContent(allFields)) {
      newErrors.general = 'Contenu non valide détecté. Veuillez vérifier vos informations.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit
    const rateCheck = checkRateLimit();
    setRateLimitInfo(rateCheck);
    
    if (!rateCheck.allowed) {
      setErrors({
        general: `Trop de tentatives. Veuillez réessayer dans ${rateCheck.resetIn} minutes.`
      });
      setStatus('error');
      return;
    }

    // Validate CSRF token
    if (!validateCSRFToken(csrfToken)) {
      setErrors({
        general: 'Session invalide. Veuillez rafraîchir la page.'
      });
      setStatus('error');
      return;
    }

    setStatus('validating');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      // Sanitize data
      const sanitizedData = {
        name: sanitizeInput(formData.name.trim()),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: sanitizeInput(formData.message.trim()),
        csrfToken,
      };

      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional failure for testing
          if (Math.random() > 0.95) {
            reject(new Error('Network error'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      // Record successful submission
      recordSubmission();
      setRateLimitInfo(checkRateLimit());
      
      setStatus('success');
      setFormData(initialFormData);
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setErrors({
        general: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
      setStatus('error');
    }
  }, [formData, csrfToken, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setStatus('idle');
    setCsrfToken(generateCSRFToken());
  }, []);

  return {
    formData,
    errors,
    status,
    csrfToken,
    rateLimitInfo,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
