/**
 * QuizProgress Component
 * 
 * Displays quiz progress with an animated progress bar,
 * current question indicator, and percentage complete.
 * 
 * Part of the Import Readiness Quiz feature.
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuizProgressProps {
  /** Current question index (0-based) */
  currentQuestion: number;
  /** Total number of questions */
  totalQuestions: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** Additional CSS classes */
  className?: string;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  progress,
  className,
}: QuizProgressProps) {
  // Ensure progress is within bounds
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Calculate current question number (1-based for display)
  const currentQuestionNumber = Math.min(currentQuestion + 1, totalQuestions);
  
  // Round progress for display
  const displayProgress = Math.round(clampedProgress);

  return (
    <div className={cn('w-full', className)}>
      {/* Progress bar container */}
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Animated progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // cubic-bezier for smooth animation
          }}
        />
      </div>
      
      {/* Progress info row */}
      <div className="flex justify-between items-center mt-2">
        {/* Question counter */}
        <motion.span
          key={currentQuestionNumber}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium"
        >
          Question {currentQuestionNumber}/{totalQuestions}
        </motion.span>
        
        {/* Percentage complete */}
        <motion.span
          key={displayProgress}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium"
        >
          {displayProgress}% complete
        </motion.span>
      </div>
    </div>
  );
}
