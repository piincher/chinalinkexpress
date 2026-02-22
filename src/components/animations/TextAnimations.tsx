/**
 * Text Animations
 * 
 * Specialized text animation components for headlines, paragraphs, and special text effects.
 * Part of the shared animation system.
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Split text into animated characters
interface SplitTextProps {
  children: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'rotate' | 'wave';
}

export function SplitText({
  children,
  className = '',
  charClassName = '',
  delay = 0,
  staggerDelay = 0.03,
  animation = 'fadeUp',
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const characters = children.split('');

  const animations = {
    fadeUp: { y: 40, opacity: 0 },
    fadeIn: { opacity: 0 },
    scaleUp: { scale: 0, opacity: 0 },
    rotate: { rotateX: -90, opacity: 0 },
    wave: { y: 20, opacity: 0 },
  };

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${charClassName}`}
          initial={animations[animation]}
          animate={isInView ? { y: 0, opacity: 1, scale: 1, rotateX: 0 } : animations[animation]}
          transition={{
            duration: 0.5,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Animated gradient text
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function GradientText({
  children,
  className = '',
  gradient = 'from-blue-400 via-purple-500 to-pink-500',
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.span>
  );
}

// Typewriter effect
interface TypewriterProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({
  texts,
  className = '',
  typingSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
}

// Glow text effect
interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function GlowText({
  children,
  className = '',
  color = '#3fb0ff',
}: GlowTextProps) {
  return (
    <motion.span
      className={className}
      animate={{
        textShadow: [
          `0 0 10px ${color}40`,
          `0 0 20px ${color}60`,
          `0 0 30px ${color}80`,
          `0 0 20px ${color}60`,
          `0 0 10px ${color}40`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ color }}
    >
      {children}
    </motion.span>
  );
}

// Scramble text effect (decodes from random characters)
interface ScrambleTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function ScrambleText({
  children,
  className = '',
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = React.useState(children.split('').map(() => ' ').join(''));
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  React.useEffect(() => {
    if (!isInView || hasStarted) return;
    
    const timeout = setTimeout(() => {
      setHasStarted(true);
      let iteration = 0;
      const maxIterations = children.length * 3;
      
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(children);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, children, delay, hasStarted]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
}
