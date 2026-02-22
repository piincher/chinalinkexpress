/**
 * Kinetic Typography
 * 
 * Physics-based text that responds to animations.
 * Characters have individual behaviors - floating, colliding, attracting.
 * Creates a living, breathing headline.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import type { PerformanceTier } from '../types';

interface KineticTypographyProps {
  tier: PerformanceTier;
  className?: string;
}

interface CharData {
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  rotation: number;
  scale: number;
  delay: number;
}

function KineticText({ 
  text, 
  className = '',
  baseDelay = 0,
  tier,
}: { 
  text: string; 
  className?: string;
  baseDelay?: number;
  tier: PerformanceTier;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPlaying = useIsAnimationPlaying();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Create character data
  const chars = useMemo(() => {
    return text.split('').map((char, i) => ({
      char,
      delay: baseDelay + i * 0.05,
      id: i,
    }));
  }, [text, baseDelay]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      style={{
        x: tier !== 'low' ? springX : 0,
        y: tier !== 'low' ? springY : 0,
      }}
    >
      {chars.map(({ char, delay, id }) => (
        <motion.span
          key={id}
          className="inline-block relative"
          initial={{ 
            opacity: 0, 
            y: 50,
            rotateX: -90,
            scale: 0.5,
          }}
          animate={isPlaying ? { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            scale: 1,
          } : {}}
          transition={{
            delay,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={tier !== 'low' ? {
            scale: 1.3,
            y: -10,
            rotate: Math.random() * 20 - 10,
            transition: { type: 'spring', stiffness: 400 },
          } : {}}
        >
          {/* Glow effect */}
          <motion.span
            className="absolute inset-0 blur-md opacity-0"
            style={{ color: '#3fb0ff' }}
            animate={isPlaying ? {
              opacity: [0, 0.5, 0],
            } : {}}
            transition={{
              delay: delay + 0.3,
              duration: 1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          
          {/* Main character */}
          <span className="relative z-10">
            {char === ' ' ? '\u00A0' : char}
          </span>
          
          {/* Underline animation */}
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            initial={{ width: 0, left: '50%' }}
            animate={isPlaying ? {
              width: '100%',
              left: '0%',
            } : {}}
            transition={{
              delay: delay + 0.5,
              duration: 0.4,
              ease: 'easeOut',
            }}
          />
        </motion.span>
      ))}
    </motion.div>
  );
}

// Floating particles around text
function TextParticles({ tier }: { tier: PerformanceTier }) {
  const isPlaying = useIsAnimationPlaying();
  const count = tier === 'high' ? 30 : tier === 'medium' ? 15 : 0;
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, [count]);

  if (tier === 'low' || tier === 'minimal') return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'linear-gradient(135deg, #3fb0ff, #7fd0ff)',
            boxShadow: `0 0 ${p.size * 2}px #3fb0ff`,
          }}
          animate={isPlaying ? {
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Glitch text effect
function GlitchText({ 
  text, 
  className = '',
}: { 
  text: string; 
  className?: string;
}) {
  const isPlaying = useIsAnimationPlaying();
  
  return (
    <motion.div 
      className={`relative ${className}`}
      animate={isPlaying ? {
        x: [0, -2, 2, -1, 0],
      } : {}}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 5,
      }}
    >
      {/* Glitch layers */}
      <span 
        className="absolute top-0 left-0 opacity-50 text-red-400"
        style={{ clipPath: 'inset(10% 0 60% 0)' }}
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 opacity-50 text-cyan-400"
        style={{ clipPath: 'inset(60% 0 10% 0)' }}
      >
        {text}
      </span>
      <span className="relative z-10">{text}</span>
    </motion.div>
  );
}

export function KineticTypography({ tier, className = '' }: KineticTypographyProps) {
  const isPlaying = useIsAnimationPlaying();

  return (
    <div className={`relative ${className}`}>
      <TextParticles tier={tier} />
      
      <div className="relative z-10 space-y-2">
        <div className="overflow-hidden">
          <KineticText 
            text="CHINALINK" 
            tier={tier}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
          />
        </div>
        
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isPlaying ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          >
            <GlitchText 
              text="EXPRESS"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
            />
          </motion.div>
        </div>
        
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 rounded-full mt-4"
          initial={{ width: 0 }}
          animate={isPlaying ? { width: '100%' } : {}}
          transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
