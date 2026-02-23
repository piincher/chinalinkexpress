/**
 * Quick Quote Store
 * 
 * Zustand store for managing quick quote popup state and persistence.
 * Part of the quick-quote feature.
 */

'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { generateId, isClient } from '@/lib/utils';
import type { QuoteEstimate as QuoteEstimateType } from '@/features/live-features/types';

export type QuoteStep = 1 | 2 | 3 | 4;
export type WeightUnit = 'kg' | 'lb';
export type QuickQuoteService = 'air' | 'sea' | 'express';

export interface SavedQuote extends QuoteEstimateType {
  createdAt: string;
  origin: string;
  destination: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface QuickQuoteFormData {
  origin: string;
  destination: string;
  weight: string;
  weightUnit: WeightUnit;
  length: string;
  width: string;
  height: string;
  service: QuickQuoteService;
  name: string;
  email: string;
  phone: string;
}

interface QuickQuoteState {
  // UI State
  isOpen: boolean;
  step: QuoteStep;
  direction: 'next' | 'prev';
  
  // Form Data
  formData: QuickQuoteFormData;
  
  // Submission State
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  
  // Estimate
  currentEstimate: QuoteEstimateType | null;
  
  // History
  recentQuotes: SavedQuote[];
  
  // Actions
  open: () => void;
  close: () => void;
  setStep: (step: QuoteStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setFormData: (data: Partial<QuickQuoteFormData>) => void;
  setFormField: <K extends keyof QuickQuoteFormData>(field: K, value: QuickQuoteFormData[K]) => void;
  setCurrentEstimate: (estimate: QuoteEstimateType | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error: string | null) => void;
  setSubmitSuccess: (success: boolean) => void;
  saveRecentQuote: (quote: SavedQuote) => void;
  clearRecentQuotes: () => void;
  resetForm: () => void;
  resetSubmission: () => void;
}

const initialFormData: QuickQuoteFormData = {
  origin: '',
  destination: '',
  weight: '',
  weightUnit: 'kg',
  length: '',
  width: '',
  height: '',
  service: 'air',
  name: '',
  email: '',
  phone: '',
};

const MAX_RECENT_QUOTES = 5;

export const useQuickQuoteStore = create<QuickQuoteState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        isOpen: false,
        step: 1,
        direction: 'next',
        formData: { ...initialFormData },
        isSubmitting: false,
        submitError: null,
        submitSuccess: false,
        currentEstimate: null,
        recentQuotes: [],
        
        // Actions
        open: () => {
          set({ isOpen: true, submitSuccess: false, submitError: null });
          // Prevent body scroll when popup is open
          if (isClient()) {
            document.body.style.overflow = 'hidden';
          }
        },
        
        close: () => {
          set({ isOpen: false });
          // Restore body scroll
          if (isClient()) {
            document.body.style.overflow = '';
          }
        },
        
        setStep: (step) => set({ step, direction: step > get().step ? 'next' : 'prev' }),
        
        nextStep: () => {
          const currentStep = get().step;
          if (currentStep < 4) {
            set({ step: (currentStep + 1) as QuoteStep, direction: 'next' });
          }
        },
        
        prevStep: () => {
          const currentStep = get().step;
          if (currentStep > 1) {
            set({ step: (currentStep - 1) as QuoteStep, direction: 'prev' });
          }
        },
        
        setFormData: (data) =>
          set((state) => ({
            formData: { ...state.formData, ...data },
          })),
        
        setFormField: (field, value) =>
          set((state) => ({
            formData: { ...state.formData, [field]: value },
          })),
        
        setCurrentEstimate: (estimate) => set({ currentEstimate: estimate }),
        
        setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
        
        setSubmitError: (error) => set({ submitError: error }),
        
        setSubmitSuccess: (success) => set({ submitSuccess: success }),
        
        saveRecentQuote: (quote) =>
          set((state) => {
            const newQuotes = [quote, ...state.recentQuotes].slice(0, MAX_RECENT_QUOTES);
            return { recentQuotes: newQuotes };
          }),
        
        clearRecentQuotes: () => set({ recentQuotes: [] }),
        
        resetForm: () =>
          set({
            formData: { ...initialFormData },
            step: 1,
            currentEstimate: null,
            submitSuccess: false,
            submitError: null,
          }),
        
        resetSubmission: () =>
          set({
            isSubmitting: false,
            submitError: null,
            submitSuccess: false,
          }),
      }),
      {
        name: 'quick-quote-storage',
        partialize: (state) => ({
          recentQuotes: state.recentQuotes,
        }),
      }
    ),
    { name: 'quick-quote-store' }
  )
);

// Selector hooks for performance
export const useQuickQuoteOpen = () => useQuickQuoteStore((state) => state.isOpen);
export const useQuickQuoteStep = () => useQuickQuoteStore((state) => state.step);
export const useQuickQuoteFormData = () => useQuickQuoteStore((state) => state.formData);
export const useQuickQuoteEstimate = () => useQuickQuoteStore((state) => state.currentEstimate);
export const useQuickQuoteRecentQuotes = () => useQuickQuoteStore((state) => state.recentQuotes);

export default useQuickQuoteStore;
