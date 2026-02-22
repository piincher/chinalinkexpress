/**
 * Pricing Store
 * 
 * Global state management for calculator and pricing page.
 * Uses Zustand for performant state updates.
 * Part of the pricing feature.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ShippingMode, ItemCategory } from '../constants';
import type { AirCalculationResult, SeaCalculationResult } from '../lib/pricingEngine';

interface AirCalculatorState {
  weight: string;
  length: string;
  width: string;
  height: string;
  category: ItemCategory;
  destination: string;
}

interface SeaCalculatorState {
  length: string;
  width: string;
  height: string;
  weight: string;
  destination: string;
}

interface PricingState {
  // Current mode
  mode: ShippingMode;
  setMode: (mode: ShippingMode) => void;
  
  // Air calculator state
  airState: AirCalculatorState;
  setAirField: (field: keyof AirCalculatorState, value: string) => void;
  resetAirState: () => void;
  
  // Sea calculator state
  seaState: SeaCalculatorState;
  setSeaField: (field: keyof SeaCalculatorState, value: string) => void;
  resetSeaState: () => void;
  
  // Results
  airResult: AirCalculationResult | null;
  setAirResult: (result: AirCalculationResult | null) => void;
  
  seaResult: SeaCalculationResult | null;
  setSeaResult: (result: SeaCalculationResult | null) => void;
  
  // UI State
  isCalculating: boolean;
  setIsCalculating: (isCalculating: boolean) => void;
  
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  
  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
}

const initialAirState: AirCalculatorState = {
  weight: '',
  length: '',
  width: '',
  height: '',
  category: 'standard',
  destination: 'ML',
};

const initialSeaState: SeaCalculatorState = {
  length: '',
  width: '',
  height: '',
  weight: '',
  destination: 'ML',
};

export const usePricingStore = create<PricingState>()(
  devtools(
    (set) => ({
      // Mode
      mode: 'air',
      setMode: (mode) => set({ mode, error: null }),
      
      // Air state
      airState: initialAirState,
      setAirField: (field, value) =>
        set((state) => ({
          airState: { ...state.airState, [field]: value },
          error: null,
        })),
      resetAirState: () => set({ airState: initialAirState, airResult: null }),
      
      // Sea state
      seaState: initialSeaState,
      setSeaField: (field, value) =>
        set((state) => ({
          seaState: { ...state.seaState, [field]: value },
          error: null,
        })),
      resetSeaState: () => set({ seaState: initialSeaState, seaResult: null }),
      
      // Results
      airResult: null,
      setAirResult: (airResult) => set({ airResult }),
      
      seaResult: null,
      setSeaResult: (seaResult) => set({ seaResult }),
      
      // UI State
      isCalculating: false,
      setIsCalculating: (isCalculating) => set({ isCalculating }),
      
      showDetails: false,
      setShowDetails: (showDetails) => set({ showDetails }),
      
      // Error
      error: null,
      setError: (error) => set({ error }),
    }),
    { name: 'pricing-store' }
  )
);

// Selector hooks for performance
export const useCalculatorMode = () => usePricingStore((state) => state.mode);
export const useAirState = () => usePricingStore((state) => state.airState);
export const useSeaState = () => usePricingStore((state) => state.seaState);
export const useAirResult = () => usePricingStore((state) => state.airResult);
export const useSeaResult = () => usePricingStore((state) => state.seaResult);
export const useIsCalculating = () => usePricingStore((state) => state.isCalculating);
