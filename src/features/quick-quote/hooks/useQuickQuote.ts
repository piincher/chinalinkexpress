/**
 * Use Quick Quote Hook
 * 
 * Hook for managing quick quote form logic, validation, and price calculation.
 * Part of the quick-quote feature.
 */

'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { generateId } from '@/lib/utils';
import { useQuickQuoteStore, type QuickQuoteFormData, type QuickQuoteService } from '../store/useQuickQuoteStore';
import type { QuoteEstimate } from '@/features/live-features/types';

// Pricing rates per kg in USD
const SERVICE_RATES: Record<QuickQuoteService, { min: number; max: number }> = {
  air: { min: 8, max: 12 },
  sea: { min: 3, max: 5 },
  express: { min: 15, max: 20 },
};

// Delivery time ranges
const DELIVERY_TIMES: Record<QuickQuoteService, { min: number; max: number }> = {
  air: { min: 7, max: 14 },
  sea: { min: 45, max: 90 },
  express: { min: 3, max: 7 },
};

// Additional fees as percentages
const FEE_RATES = {
  handling: 0.05, // 5%
  insurance: 0.03, // 3%
  customs: 0.10, // 10%
} as const;

export interface ValidationErrors {
  origin?: string;
  destination?: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  service?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface UseQuickQuoteReturn {
  // Form state
  formData: QuickQuoteFormData;
  step: number;
  direction: 'next' | 'prev';
  
  // Estimate
  estimate: QuoteEstimate | null;
  
  // Validation
  errors: ValidationErrors;
  validateStep: (step: number) => boolean;
  validateAll: () => boolean;
  
  // Form handlers
  setFormField: <K extends keyof QuickQuoteFormData>(field: K, value: QuickQuoteFormData[K]) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Submission
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  submitQuote: () => Promise<boolean>;
  resetSubmission: () => void;
  
  // Utilities
  convertWeight: (weight: number, from: 'kg' | 'lb', to: 'kg' | 'lb') => number;
  calculatePrice: (weightKg: number, service: QuickQuoteService) => QuoteEstimate;
}

/**
 * Hook for quick quote form logic
 */
export function useQuickQuote(): UseQuickQuoteReturn {
  const {
    formData,
    step,
    direction,
    currentEstimate,
    isSubmitting,
    submitError,
    submitSuccess,
    setFormField,
    setStep,
    nextStep,
    prevStep,
    setCurrentEstimate,
    setIsSubmitting,
    setSubmitError,
    setSubmitSuccess,
    saveRecentQuote,
    resetSubmission,
  } = useQuickQuoteStore();

  /**
   * Convert weight between kg and lb
   */
  const convertWeight = useCallback((weight: number, from: 'kg' | 'lb', to: 'kg' | 'lb'): number => {
    if (from === to) return weight;
    if (from === 'lb' && to === 'kg') return weight * 0.453592;
    return weight * 2.20462;
  }, []);

  /**
   * Calculate volumetric weight
   */
  const calculateVolumetricWeight = useCallback((
    length: number,
    width: number,
    height: number,
    unit: 'cm' | 'in' = 'cm'
  ): number => {
    let l = length;
    let w = width;
    let h = height;
    
    // Convert inches to cm if needed
    if (unit === 'in') {
      l *= 2.54;
      w *= 2.54;
      h *= 2.54;
    }
    
    const volume = l * w * h; // cm³
    return volume / 5000; // kg (standard volumetric divisor)
  }, []);

  /**
   * Calculate price estimate
   */
  const calculatePrice = useCallback((weightKg: number, service: QuickQuoteService): QuoteEstimate => {
    const rates = SERVICE_RATES[service];
    const deliveryTimes = DELIVERY_TIMES[service];
    
    // Calculate base freight cost (use average rate)
    const avgRate = (rates.min + rates.max) / 2;
    const freightCost = weightKg * avgRate;
    
    // Calculate additional fees
    const handlingCost = freightCost * FEE_RATES.handling;
    const insuranceCost = freightCost * FEE_RATES.insurance;
    const customsCost = freightCost * FEE_RATES.customs;
    
    const totalPrice = freightCost + handlingCost + insuranceCost + customsCost;
    
    // Calculate delivery days (use average)
    const avgDays = Math.round((deliveryTimes.min + deliveryTimes.max) / 2);
    
    // Valid until (7 days from now)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);
    
    return {
      id: generateId(12),
      service,
      price: {
        amount: Math.round(totalPrice * 100) / 100,
        currency: 'USD',
      },
      estimatedDays: avgDays,
      validUntil: validUntil.toISOString(),
      breakdown: {
        freight: Math.round(freightCost * 100) / 100,
        handling: Math.round(handlingCost * 100) / 100,
        insurance: Math.round(insuranceCost * 100) / 100,
        customs: Math.round(customsCost * 100) / 100,
      },
    };
  }, []);

  /**
   * Auto-calculate estimate when relevant fields change
   */
  useEffect(() => {
    const weight = parseFloat(formData.weight);
    if (!weight || weight <= 0) {
      setCurrentEstimate(null);
      return;
    }

    // Convert to kg if needed
    const weightInKg = formData.weightUnit === 'lb' 
      ? convertWeight(weight, 'lb', 'kg') 
      : weight;

    // Check volumetric weight if dimensions are provided
    let chargeableWeight = weightInKg;
    const length = parseFloat(formData.length);
    const width = parseFloat(formData.width);
    const height = parseFloat(formData.height);
    
    if (length && width && height) {
      const volumetricWeight = calculateVolumetricWeight(length, width, height);
      chargeableWeight = Math.max(weightInKg, volumetricWeight);
    }

    const estimate = calculatePrice(chargeableWeight, formData.service);
    setCurrentEstimate(estimate);
  }, [
    formData.weight,
    formData.weightUnit,
    formData.length,
    formData.width,
    formData.height,
    formData.service,
    convertWeight,
    calculateVolumetricWeight,
    calculatePrice,
    setCurrentEstimate,
  ]);

  /**
   * Validate email format
   */
  const isValidEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  /**
   * Validate phone format (basic international check)
   */
  const isValidPhone = useCallback((phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{8,20}$/;
    return phoneRegex.test(phone);
  }, []);

  /**
   * Validate a specific step
   */
  const validateStep = useCallback((stepNumber: number): boolean => {
    const errors: ValidationErrors = {};

    switch (stepNumber) {
      case 1: // Route
        if (!formData.origin.trim()) {
          errors.origin = 'Veuillez sélectionner une origine';
        }
        if (!formData.destination.trim()) {
          errors.destination = 'Veuillez sélectionner une destination';
        }
        if (formData.origin && formData.destination && formData.origin === formData.destination) {
          errors.destination = 'L\'origine et la destination doivent être différentes';
        }
        break;

      case 2: // Package details
        const weight = parseFloat(formData.weight);
        if (!formData.weight || isNaN(weight) || weight <= 0) {
          errors.weight = 'Veuillez entrer un poids valide';
        } else if (weight > 1000) {
          errors.weight = 'Le poids maximum est de 1000 kg';
        }

        // Validate dimensions if provided
        const length = parseFloat(formData.length);
        const width = parseFloat(formData.width);
        const height = parseFloat(formData.height);
        
        if (formData.length && (isNaN(length) || length <= 0 || length > 500)) {
          errors.length = 'Longueur invalide (max 500 cm)';
        }
        if (formData.width && (isNaN(width) || width <= 0 || width > 500)) {
          errors.width = 'Largeur invalide (max 500 cm)';
        }
        if (formData.height && (isNaN(height) || height <= 0 || height > 500)) {
          errors.height = 'Hauteur invalide (max 500 cm)';
        }
        break;

      case 3: // Service selection
        if (!formData.service) {
          errors.service = 'Veuillez sélectionner un service';
        }
        break;

      case 4: // Contact info
        if (!formData.name.trim()) {
          errors.name = 'Veuillez entrer votre nom';
        } else if (formData.name.trim().length < 2) {
          errors.name = 'Le nom doit contenir au moins 2 caractères';
        }

        if (!formData.email.trim()) {
          errors.email = 'Veuillez entrer votre email';
        } else if (!isValidEmail(formData.email)) {
          errors.email = 'Veuillez entrer un email valide';
        }

        if (formData.phone && !isValidPhone(formData.phone)) {
          errors.phone = 'Veuillez entrer un numéro de téléphone valide';
        }
        break;
    }

    return Object.keys(errors).length === 0;
  }, [formData, isValidEmail, isValidPhone]);

  /**
   * Validate entire form
   */
  const validateAll = useCallback((): boolean => {
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) {
        return false;
      }
    }
    return true;
  }, [validateStep]);

  /**
   * Get validation errors for current state
   */
  const errors = useMemo((): ValidationErrors => {
    const errs: ValidationErrors = {};
    
    // Check all fields and accumulate errors
    if (!formData.origin) errs.origin = 'Origine requise';
    if (!formData.destination) errs.destination = 'Destination requise';
    
    const weight = parseFloat(formData.weight);
    if (!formData.weight || isNaN(weight) || weight <= 0) {
      errs.weight = 'Poids requis';
    }
    
    if (!formData.service) errs.service = 'Service requis';
    if (!formData.name.trim()) errs.name = 'Nom requis';
    if (!formData.email.trim()) errs.email = 'Email requis';
    else if (!isValidEmail(formData.email)) errs.email = 'Email invalide';
    
    return errs;
  }, [formData, isValidEmail]);

  /**
   * Submit quote request
   */
  const submitQuote = useCallback(async (): Promise<boolean> => {
    if (!validateAll()) {
      setSubmitError('Veuillez corriger les erreurs dans le formulaire');
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save to recent quotes
      if (currentEstimate) {
        const savedQuote = {
          ...currentEstimate,
          createdAt: new Date().toISOString(),
          origin: formData.origin,
          destination: formData.destination,
          weight: parseFloat(formData.weight),
          dimensions: formData.length && formData.width && formData.height
            ? {
                length: parseFloat(formData.length),
                width: parseFloat(formData.width),
                height: parseFloat(formData.height),
              }
            : undefined,
        };
        saveRecentQuote(savedQuote);
      }

      setSubmitSuccess(true);
      return true;
    } catch (error) {
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de l\'envoi'
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [
    validateAll,
    currentEstimate,
    formData,
    setIsSubmitting,
    setSubmitError,
    setSubmitSuccess,
    saveRecentQuote,
  ]);

  return {
    formData,
    step,
    direction,
    estimate: currentEstimate,
    errors,
    validateStep,
    validateAll,
    setFormField,
    setStep,
    nextStep,
    prevStep,
    isSubmitting,
    submitError,
    submitSuccess,
    submitQuote,
    resetSubmission,
    convertWeight,
    calculatePrice,
  };
}

export default useQuickQuote;
