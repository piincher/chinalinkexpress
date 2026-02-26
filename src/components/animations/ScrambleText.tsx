/**
 * ScrambleText
 * 
 * A text scrambling animation effect that decodes from random characters.
 * Integrates with useAnimationActivation for scroll-triggered animations.
 * Perfect for tech-themed headings and dynamic text effects.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

interface ScrambleTextProps {
  /** Text to animate */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in milliseconds (default: 2000) */
  duration?: number;
  /** Characters to use for scrambling (default: alphanumeric) */
  chars?: string;
  /** Delay before animation starts in milliseconds (default: 0) */
  delay?: number;
  /** Trigger animation only once (default: true) */
  once?: boolean;
  /** Intersection threshold 0-1 (default: 0.5) */
  threshold?: number;
  /** Speed of character changes in ms (default: 30) */
  scrambleSpeed?: number;
  /** Whether to preserve spaces during scramble (default: true) */
  preserveSpaces?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function ScrambleText({
  children,
  className = '',
  duration = 2000,
  chars = DEFAULT_CHARS,
  delay = 0,
  once = true,
  threshold = 0.5,
  scrambleSpeed = 30,
  preserveSpaces = true,
  onComplete,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(
    preserveSpaces 
      ? children.split('').map(c => c === ' ' ? ' ' : ' ').join('')
      : ''
  );
  const [hasCompleted, setHasCompleted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { ref, isActive } = useAnimationActivation({
    once,
    threshold,
    delay,
  });

  const scramble = useCallback(() => {
    const text = children;
    const length = text.length;
    const iterationsPerChar = Math.floor((duration - delay) / scrambleSpeed / length);
    let iteration = 0;
    const maxIterations = length * iterationsPerChar;

    const animate = () => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            // Preserve spaces if enabled
            if (preserveSpaces && char === ' ') return ' ';
            
            // If this character should be revealed
            if (index < iteration / iterationsPerChar) {
              return char;
            }
            
            // Return random character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration < maxIterations) {
        animationRef.current = window.setTimeout(animate, scrambleSpeed);
      } else {
        // Ensure final text is correct
        setDisplayText(text);
        setHasCompleted(true);
        onComplete?.();
      }
    };

    animate();
  }, [children, chars, duration, delay, scrambleSpeed, preserveSpaces, onComplete]);

  useEffect(() => {
    if (isActive && !hasCompleted) {
      // Small delay to ensure smooth start
      timeoutRef.current = setTimeout(() => {
        scramble();
      }, 50);
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, hasCompleted, scramble]);

  return (
    <span 
      ref={ref as React.RefObject<HTMLSpanElement>} 
      className={`font-mono ${className}`}
      aria-label={children}
    >
      {displayText}
    </span>
  );
}

// Decoding variant - simulates a decoding/encryption effect
interface DecodeTextProps extends Omit<ScrambleTextProps, 'chars'> {
  /** Use binary-like characters for decoding effect */
  binary?: boolean;
  /** Use hex characters for decoding effect */
  hex?: boolean;
}

export function DecodeText({
  binary = false,
  hex = false,
  ...props
}: DecodeTextProps) {
  const chars = binary 
    ? '01' 
    : hex 
      ? '0123456789ABCDEF' 
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  return <ScrambleText chars={chars} {...props} />;
}

// Typewriter scramble hybrid - types then scrambles to final
interface TypeScrambleProps extends ScrambleTextProps {
  /** Type speed in ms (default: 50) */
  typeSpeed?: number;
}

export function TypeScramble({
  typeSpeed = 50,
  duration = 1500,
  ...props
}: TypeScrambleProps) {
  return (
    <ScrambleText 
      duration={duration} 
      scrambleSpeed={typeSpeed}
      {...props} 
    />
  );
}

// Alias for the enhanced version
export const ScrambleTextEnhanced = ScrambleText;

export default ScrambleText;
