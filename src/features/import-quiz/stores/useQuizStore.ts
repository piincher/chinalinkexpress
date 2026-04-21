/**
 * Quiz State Store
 * 
 * Zustand store for managing quiz state with persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { QuizState, LeadCategory } from '../types';
import { QUIZ_CONFIG } from '../lib/constants';
import { calculateScore, getLeadCategory } from '../lib/scoring';

interface QuizStore extends QuizState {
  // Actions
  setAnswer: (questionId: number, value: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setWhatsAppNumber: (number: string) => void;
  setComplete: () => void;
  resetQuiz: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setGuideUrl: (url: string) => void;
  
  // Computed
  progress: number;
  currentQuestionText: string;
  canProceed: boolean;
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  whatsappNumber: '',
  isComplete: false,
  score: 0,
  category: null,
  guideUrl: null,
  isSubmitting: false,
  error: null,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAnswer: (questionId: number, value: string) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: value,
          },
        }));
      },

      nextQuestion: () => {
        set((state) => ({
          currentQuestion: Math.min(
            state.currentQuestion + 1,
            QUIZ_CONFIG.totalQuestions
          ),
        }));
      },

      previousQuestion: () => {
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 0),
        }));
      },

      setWhatsAppNumber: (number: string) => {
        set({ whatsappNumber: number });
      },

      setComplete: () => {
        const { answers } = get();
        const score = calculateScore(answers);
        const category = getLeadCategory(score);
        
        set({
          isComplete: true,
          score,
          category,
        });
      },

      resetQuiz: () => {
        set(initialState);
      },

      setSubmitting: (isSubmitting: boolean) => {
        set({ isSubmitting });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setGuideUrl: (url: string) => {
        set({ guideUrl: url });
      },

      // Computed properties
      get progress() {
        const { currentQuestion } = get();
        return (currentQuestion / QUIZ_CONFIG.totalQuestions) * 100;
      },

      get currentQuestionText() {
        const { currentQuestion } = get();
        return currentQuestion === QUIZ_CONFIG.totalQuestions
          ? 'Contact'
          : `Question ${currentQuestion + 1}/${QUIZ_CONFIG.totalQuestions}`;
      },

      get canProceed() {
        const { currentQuestion, answers, whatsappNumber } = get();
        
        if (currentQuestion < QUIZ_CONFIG.totalQuestions) {
          return !!answers[currentQuestion + 1];
        }
        
        return whatsappNumber.length >= 8;
      },
    }),
    {
      name: 'import-quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        whatsappNumber: state.whatsappNumber,
      }),
    }
  )
);
