/**
 * useTypingEffect Hook
 * 
 * A reusable hook for creating a typing animation effect.
 * Part of the global hooks library.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ANIMATION } from '@/constants/appConstants';

interface UseTypingEffectOptions {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  enabled?: boolean;
}

interface UseTypingEffectReturn {
  currentText: string;
  isDeleting: boolean;
  textIndex: number;
}

/**
 * Hook for creating a typing animation effect
 */
export function useTypingEffect({
  texts,
  typingSpeed = ANIMATION.TYPING_SPEED,
  deleteSpeed = ANIMATION.TYPING_DELETE_SPEED,
  pauseDuration = ANIMATION.TYPING_PAUSE,
  enabled = true,
}: UseTypingEffectOptions): UseTypingEffectReturn {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    if (!enabled || texts.length === 0) return;

    const handleTyping = () => {
      const currentFullText = texts[textIndex];

      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        setSpeed(deleteSpeed);
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        setSpeed(typingSpeed);
      }

      if (!isDeleting && currentText === currentFullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    textIndex,
    speed,
    texts,
    typingSpeed,
    deleteSpeed,
    pauseDuration,
    enabled,
  ]);

  return { currentText, isDeleting, textIndex };
}

export default useTypingEffect;
