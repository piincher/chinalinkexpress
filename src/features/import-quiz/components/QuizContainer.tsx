/**
 * QuizContainer Component
 * 
 * Main orchestrator for the Import Readiness Quiz.
 * Manages quiz state, navigation, submission, and renders appropriate sub-components.
 * 
 * State Machine: intro -> question1 -> question2 -> ... -> question5 -> whatsapp -> submitting -> result
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Package, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button/Button';

// Quiz state and utilities
import { useQuizStore } from '../stores/useQuizStore';
import { QUIZ_QUESTIONS, QUIZ_CONFIG } from '../lib/constants';
import { prepareSubmissionData } from '../lib/scoring';
import { validateWhatsAppNumber } from '../lib/whatsapp';
import { captureQuizAttribution, createQuizSessionId } from '../lib/attribution';
import { trackQuizEvent } from '../lib/events';

// Sub-components
import { QuizProgress } from './QuizProgress';
import { QuestionCard } from './QuestionCard';
import { WhatsAppCapture } from './WhatsAppCapture';
import { QuizResult } from './QuizResult';

interface QuizContainerProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * QuizContainer - Main quiz orchestrator component
 */
export function QuizContainer({ className }: QuizContainerProps) {
  // Prevent hydration mismatch with Zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const sessionIdRef = useRef<string>(createQuizSessionId());
  const attribution = useMemo(() => (mounted ? captureQuizAttribution() : {}), [mounted]);
  const locale = mounted ? window.location.pathname.split('/')[1] || 'fr' : 'fr';
  
  // Quiz store state and actions
  const {
    currentQuestion,
    answers,
    whatsappNumber,
    isComplete,
    score,
    category,
    guideUrl,
    isSubmitting,
    error,
    setAnswer,
    nextQuestion,
    previousQuestion,
    setWhatsAppNumber,
    setComplete,
    setSubmitting,
    setError,
    setGuideUrl,
    resetQuiz,
    progress,
    canProceed,
  } = useQuizStore();

  // Local state for intro screen
  const [showIntro, setShowIntro] = useState(true);
  const whatsappStepTrackedRef = useRef(false);

  useEffect(() => {
    if (!mounted) return;

    trackQuizEvent({
      eventName: 'quiz_viewed',
      sessionId: sessionIdRef.current,
      locale: locale as 'fr' | 'en' | 'zh' | 'ar',
      attribution,
    });
  }, [mounted, locale, attribution]);

  // Reset intro when quiz is reset
  useEffect(() => {
    if (currentQuestion === 0 && !isComplete && Object.keys(answers).length === 0) {
      setShowIntro(true);
    }
  }, [currentQuestion, isComplete, answers]);

  /**
   * Handle answer selection
   */
  const handleAnswerSelect = useCallback((questionId: number, value: string) => {
    setAnswer(questionId, value);
    trackQuizEvent({
      eventName: 'question_answered',
      sessionId: sessionIdRef.current,
      locale: locale as 'fr' | 'en' | 'zh' | 'ar',
      questionId,
      answerValue: value,
      attribution,
    });
  }, [setAnswer, locale, attribution]);

  // Direction for animations
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  /**
   * Handle next button click
   */
  const handleNext = useCallback(() => {
    if (currentQuestion < QUIZ_CONFIG.totalQuestions) {
      setDirection('forward');
      nextQuestion();
    }
  }, [currentQuestion, nextQuestion]);

  /**
   * Handle previous button click
   */
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setDirection('backward');
      previousQuestion();
      trackQuizEvent({
        eventName: 'question_previous',
        sessionId: sessionIdRef.current,
        locale: locale as 'fr' | 'en' | 'zh' | 'ar',
        questionId: currentQuestion,
        attribution,
      });
    }
  }, [currentQuestion, previousQuestion, locale, attribution]);

  /**
   * Handle quiz start
   */
  const handleStartQuiz = useCallback(() => {
    setShowIntro(false);
    trackQuizEvent({
      eventName: 'quiz_started',
      sessionId: sessionIdRef.current,
      locale: locale as 'fr' | 'en' | 'zh' | 'ar',
      attribution,
    });
  }, [locale, attribution]);

  /**
   * Handle WhatsApp number change
   */
  const handleWhatsAppChange = useCallback((value: string) => {
    setWhatsAppNumber(value);
    // Clear error when user types
    if (error) setError(null);
  }, [setWhatsAppNumber, error, setError]);

  /**
   * Handle quiz submission
   */
  const handleSubmit = useCallback(async () => {
    // Validate WhatsApp number
    const validation = validateWhatsAppNumber(whatsappNumber);
    if (!validation.isValid) {
      setError(validation.error || 'Numéro de téléphone invalide');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Prepare submission data
      const submissionData = prepareSubmissionData(validation.formattedNumber, answers);
      
      // Submit to API
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
          locale,
          sessionId: sessionIdRef.current,
          attribution,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la soumission');
      }

      setComplete();
      trackQuizEvent({
        eventName: 'quiz_submitted',
        sessionId: sessionIdRef.current,
        locale: locale as 'fr' | 'en' | 'zh' | 'ar',
        metadata: {
          score: result.score,
          category: result.category,
          leadPriority: result.diagnostic?.recommendation?.leadPriority,
          primaryService: result.diagnostic?.recommendation?.primaryService,
        },
        attribution,
      });

      // Success - set guide URL
      if (result.guideUrl) {
        setGuideUrl(result.guideUrl);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(message);
      trackQuizEvent({
        eventName: 'quiz_submit_failed',
        sessionId: sessionIdRef.current,
        locale: locale as 'fr' | 'en' | 'zh' | 'ar',
        metadata: { error: message },
        attribution,
      });
    } finally {
      setSubmitting(false);
    }
  }, [whatsappNumber, answers, setComplete, setSubmitting, setError, setGuideUrl, locale, attribution]);

  /**
   * Handle quiz restart
   */
  const handleRestart = useCallback(() => {
    resetQuiz();
    setShowIntro(true);
    whatsappStepTrackedRef.current = false;
    sessionIdRef.current = createQuizSessionId();
  }, [resetQuiz]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  // Determine current step
  const isIntro = showIntro && currentQuestion === 0;
  const isQuestionStep = !isIntro && currentQuestion < QUIZ_CONFIG.totalQuestions;
  const isWhatsAppStep = !isIntro && currentQuestion === QUIZ_CONFIG.totalQuestions && !isComplete;
  const isResultStep = isComplete;

  useEffect(() => {
    if (!isWhatsAppStep || whatsappStepTrackedRef.current) return;

    whatsappStepTrackedRef.current = true;
    trackQuizEvent({
      eventName: 'whatsapp_step_viewed',
      sessionId: sessionIdRef.current,
      locale: locale as 'fr' | 'en' | 'zh' | 'ar',
      attribution,
    });
  }, [isWhatsAppStep, locale, attribution]);

  // Get current question data
  const currentQuestionData = isQuestionStep 
    ? QUIZ_QUESTIONS[currentQuestion] 
    : null;

  return (
    <div className={cn(
      'min-h-[500px] flex items-center justify-center',
      'bg-gradient-to-br from-blue-50 via-white to-yellow-50',
      'dark:from-blue-950 dark:via-gray-900 dark:to-blue-900',
      'p-4 sm:p-6',
      className
    )}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          'w-full max-w-2xl mx-auto',
          'bg-white dark:bg-gray-800',
          'rounded-2xl shadow-xl',
          'overflow-hidden'
        )}
      >
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className={cn(
            'px-6 py-5 border-b border-gray-100 dark:border-gray-700',
            'flex items-center gap-3'
          )}
        >
          <div className={cn(
            'w-10 h-10 rounded-xl',
            'bg-gradient-to-br from-blue-500 to-blue-600',
            'flex items-center justify-center',
            'shadow-lg shadow-blue-500/25'
          )}>
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Quiz d&apos;import
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Testez votre readiness
            </p>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {/* Intro Screen */}
            {isIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Êtes-vous prêt à importer de Chine?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Faites ce quiz de 5 questions pour évaluer votre readiness et recevoir 
                  un guide personnalisé pour démarrer votre importation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleStartQuiz}
                    className="min-w-[200px]"
                  >
                    Commencer le quiz
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-6">
                  Durée: ~2 minutes • Résultat personnalisé
                </p>
              </motion.div>
            )}

            {/* Question Step */}
            {isQuestionStep && currentQuestionData && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-6">
                  <QuizProgress
                    currentQuestion={currentQuestion}
                    totalQuestions={QUIZ_CONFIG.totalQuestions}
                    progress={progress}
                  />
                </div>

                {/* Question Card */}
                <QuestionCard
                  question={currentQuestionData}
                  selectedValue={answers[currentQuestionData.id] || null}
                  onSelect={(value) => handleAnswerSelect(currentQuestionData.id, value)}
                  onNext={handleNext}
                  direction={direction}
                />

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    rightIcon={canProceed ? undefined : undefined}
                  >
                    {currentQuestion === QUIZ_CONFIG.totalQuestions - 1 
                      ? 'Continuer' 
                      : 'Suivant'}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* WhatsApp Capture Step */}
            {isWhatsAppStep && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <WhatsAppCapture
                  value={whatsappNumber}
                  onChange={handleWhatsAppChange}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                  isValid={validateWhatsAppNumber(whatsappNumber).isValid}
                />

                {/* Back button */}
                <div className="flex justify-start mt-6">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                  >
                    Retour aux questions
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isSubmitting && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Génération de votre guide personnalisé...
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {error && !isSubmitting && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-lg',
                  'bg-red-50 dark:bg-red-900/20',
                  'border border-red-200 dark:border-red-800',
                  'mb-4'
                )}
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    Une erreur est survenue
                  </p>
                  <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Result Step */}
            {isResultStep && category && !isSubmitting && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <QuizResult
                  score={score}
                  category={category}
                  guideUrl={guideUrl || ''}
                  whatsappNumber={whatsappNumber}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Progress indicator for questions */}
        {isQuestionStep && (
          <motion.div 
            variants={itemVariants}
            className={cn(
              'px-6 py-4 border-t border-gray-100 dark:border-gray-700',
              'bg-gray-50 dark:bg-gray-900/50'
            )}
          >
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>
                Question {currentQuestion + 1} sur {QUIZ_CONFIG.totalQuestions}
              </span>
              <span>
                {Math.round(progress)}% complété
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default QuizContainer;
