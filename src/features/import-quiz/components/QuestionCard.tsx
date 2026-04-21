/**
 * QuestionCard Component
 * 
 * Displays a quiz question with its options and handles animations
 * between questions. Part of the Import Readiness Quiz feature.
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import type { QuizQuestion, QuizOption } from '../types';

interface OptionButtonProps {
  option: QuizOption;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

/**
 * OptionButton - Individual selectable option
 */
function OptionButton({ option, isSelected, onClick, index }: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.25 }}
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
        'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1',
        isSelected
          ? 'border-blue-600 bg-blue-50 text-blue-900 focus:ring-blue-500'
          : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50 focus:ring-blue-400'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200',
            isSelected
              ? 'border-blue-600 bg-blue-600'
              : 'border-gray-300 bg-white'
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
        </div>
        <span className="font-medium">{option.label}</span>
      </div>
    </motion.button>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  direction: 'forward' | 'backward';
}

/**
 * QuestionCard - Main quiz question card with animations
 */
export function QuestionCard({
  question,
  selectedValue,
  onSelect,
  onNext,
  direction,
}: QuestionCardProps) {
  // Animation variants based on direction
  const slideVariants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full"
      >
        {/* Question Number Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            Question {question.id}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-semibold text-gray-900 leading-tight">
          {question.text}
        </h2>

        {/* Subtitle (optional) */}
        {question.subtitle && (
          <p className="mt-2 text-sm text-gray-500">
            {question.subtitle}
          </p>
        )}

        {/* Options */}
        <div className="mt-6 space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={option.value}
              option={option}
              isSelected={selectedValue === option.value}
              onClick={() => onSelect(option.value)}
              index={index}
            />
          ))}
        </div>

        {/* Next Button - appears when option is selected */}
        <AnimatePresence>
          {selectedValue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              <button
                onClick={onNext}
                className={cn(
                  'w-full flex items-center justify-center gap-2',
                  'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
                  'text-white font-semibold py-3 px-6 rounded-xl',
                  'shadow-lg shadow-blue-600/25',
                  'transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span>Suivant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuestionCard;
