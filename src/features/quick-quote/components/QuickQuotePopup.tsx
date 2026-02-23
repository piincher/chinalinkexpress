/**
 * Quick Quote Popup
 * 
 * Slide-in panel from right (desktop) or bottom sheet (mobile) for quick quotes.
 * Multi-step form with progress indicator and smooth animations.
 * Part of the quick-quote feature.
 */

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuickQuoteStore } from '../store/useQuickQuoteStore';
import { useQuickQuote } from '../hooks/useQuickQuote';
import { QuoteForm } from './QuoteForm';
import { QuoteEstimate } from './QuoteEstimate';

// Step titles in French
const STEP_TITLES = [
  'Itinéraire',
  'Détails du colis',
  'Service',
  'Contact & Devis',
];

// Step descriptions
const STEP_DESCRIPTIONS = [
  'Sélectionnez votre route',
  'Entrez les caractéristiques',
  'Choisissez le service',
  'Recevez votre estimation',
];

/**
 * Quick Quote Popup Component
 */
export function QuickQuotePopup() {
  const { isOpen, close, step, direction, submitSuccess, resetForm } = useQuickQuoteStore();
  const { prevStep, nextStep, validateStep, submitQuote } = useQuickQuote();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  // Handle next step click
  const handleNext = async () => {
    if (validateStep(step)) {
      if (step === 4) {
        await submitQuote();
      } else {
        nextStep();
      }
    }
  };

  // Handle close with form reset after success
  const handleClose = () => {
    close();
    if (submitSuccess) {
      setTimeout(resetForm, 300);
    }
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <motion.div
            initial={false}
            animate={{
              scale: s === step ? 1.1 : 1,
              backgroundColor: s <= step ? '#2563eb' : '#e5e7eb',
            }}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300',
              s <= step ? 'text-white' : 'text-gray-500'
            )}
          >
            {s < step ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              s
            )}
          </motion.div>
          {s < 4 && (
            <div
              className={cn(
                'w-8 h-0.5 mx-1 transition-colors duration-300',
                s < step ? 'bg-blue-600' : 'bg-gray-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Step content title
  const StepHeader = () => (
    <div className="text-center mb-6">
      <motion.h3
        key={`title-${step}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        {STEP_TITLES[step - 1]}
      </motion.h3>
      <motion.p
        key={`desc-${step}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-500 dark:text-gray-400 mt-1"
      >
        {STEP_DESCRIPTIONS[step - 1]}
      </motion.p>
    </div>
  );

  // Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Panel animation - slide from right on desktop, from bottom on mobile
  const panelVariants = {
    hidden: {
      x: '100%',
      y: 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      x: '100%',
      y: 0,
      opacity: 0,
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 300,
      },
    },
  };

  // Mobile panel animation (bottom sheet)
  const mobilePanelVariants = {
    hidden: {
      y: '100%',
      x: 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
      },
    },
    exit: {
      y: '100%',
      x: 0,
      opacity: 0,
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 300,
      },
    },
  };

  // Content animation
  const contentVariants = {
    enter: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'next' | 'prev') => ({
      x: direction === 'next' ? -20 : 20,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Desktop Panel (right slide) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed right-0 top-0 h-full w-full max-w-[480px] bg-white dark:bg-gray-900',
              'shadow-2xl z-50 flex flex-col',
              'hidden sm:flex' // Desktop only
            )}
          >
            <PopupContent
              onClose={handleClose}
              ProgressIndicator={ProgressIndicator}
              StepHeader={StepHeader}
              contentVariants={contentVariants}
              handleNext={handleNext}
            />
          </motion.div>

          {/* Mobile Panel (bottom sheet) */}
          <motion.div
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white dark:bg-gray-900',
              'rounded-t-2xl shadow-2xl z-50 flex flex-col',
              'sm:hidden' // Mobile only
            )}
          >
            {/* Mobile drag handle */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <PopupContent
                onClose={handleClose}
                ProgressIndicator={ProgressIndicator}
                StepHeader={StepHeader}
                contentVariants={contentVariants}
                handleNext={handleNext}
                isMobile
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Popup content component
interface PopupContentProps {
  onClose: () => void;
  ProgressIndicator: React.FC;
  StepHeader: React.FC;
  contentVariants: {
    enter: (direction: 'next' | 'prev') => { x: number; opacity: number };
    center: { x: number; opacity: number };
    exit: (direction: 'next' | 'prev') => { x: number; opacity: number };
  };
  handleNext: () => void;
  isMobile?: boolean;
}

function PopupContent({
  onClose,
  ProgressIndicator,
  StepHeader,
  contentVariants,
  handleNext,
  isMobile,
}: PopupContentProps) {
  const { step, direction, submitSuccess, resetForm } = useQuickQuoteStore();
  const { prevStep, isSubmitting } = useQuickQuote();

  const getButtonText = () => {
    if (isSubmitting) return 'Envoi...';
    if (step === 4) return 'Obtenir mon devis';
    return 'Continuer';
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Devis Express
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className={cn(
        "flex-1 overflow-y-auto p-6",
        isMobile && "max-h-[calc(90vh-200px)]"
      )}>
        {submitSuccess ? (
          <SuccessView onClose={onClose} />
        ) : (
          <>
            <ProgressIndicator />
            <StepHeader />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <QuoteForm step={step} />
              </motion.div>
            </AnimatePresence>

            {step === 4 && <QuoteEstimate />}
          </>
        )}
      </div>

      {/* Footer Navigation */}
      {!submitSuccess && (
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={prevStep}
                disabled={isSubmitting}
                className={cn(
                  'flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                  'border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Retour
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                'bg-blue-600 text-white font-semibold',
                'hover:bg-blue-700 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {getButtonText()}
              {!isSubmitting && step < 4 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Success view after submission
function SuccessView({ onClose }: { onClose: () => void }) {
  const { resetForm } = useQuickQuoteStore();

  const handleNewQuote = () => {
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Devis envoyé !
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
        Notre équipe vous contactera dans les 24 heures avec un devis détaillé.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleNewQuote}
          className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Nouveau devis
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Fermer
        </button>
      </div>
    </motion.div>
  );
}

export default QuickQuotePopup;
