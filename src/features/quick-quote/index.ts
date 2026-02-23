/**
 * Quick Quote Feature
 * 
 * Fast quote request popup without leaving the current page.
 * Multi-step form with instant price estimation.
 */

// Components
export { QuickQuotePopup } from './components/QuickQuotePopup';
export { QuickQuoteButton, QuickQuoteButtonCompact, QuickQuoteButtonInline } from './components/QuickQuoteButton';
export { QuoteForm } from './components/QuoteForm';
export { QuoteEstimate as QuoteEstimateDisplay } from './components/QuoteEstimate';

// Hooks
export { useQuickQuote } from './hooks/useQuickQuote';

// Store
export { 
  useQuickQuoteStore,
  useQuickQuoteOpen,
  useQuickQuoteStep,
  useQuickQuoteFormData,
  useQuickQuoteEstimate,
  useQuickQuoteRecentQuotes,
  type QuoteStep,
  type WeightUnit,
  type QuickQuoteService,
  type QuickQuoteFormData,
  type SavedQuote,
} from './store/useQuickQuoteStore';

// Types (re-export from live-features)
export type { QuickQuoteForm, QuoteEstimate as QuoteEstimateType } from '@/features/live-features/types';
