/**
 * CSS Particle Field
 * 
 * Tier 1: CSS-only particle animation system.
 * Works on all devices, minimal performance impact.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useMemo } from 'react';
import { TIER_CONFIG } from '../types';
import type { PerformanceTier } from '../types';

interface CSSParticleFieldProps {
  tier: PerformanceTier;
  className?: string;
}

interface ParticleStyle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export function CSSParticleField({ tier, className = '' }: CSSParticleFieldProps) {
  const config = TIER_CONFIG[tier];
  
  // Generate particle styles
  const particles = useMemo<ParticleStyle[]>(() => {
    const count = Math.min(config.particleCount, 150); // Cap for CSS performance
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10, // 10-20s
      delay: Math.random() * -20, // Start at random positions
      opacity: Math.random() * 0.5 + 0.3,
      color: config.particleColors[Math.floor(Math.random() * config.particleColors.length)],
    }));
  }, [config]);

  if (tier === 'minimal' || config.particleCount === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Background gradient layers */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(63, 176, 255, 0.15) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 70%, rgba(127, 208, 255, 0.12) 0%, transparent 40%)',
        }}
      />

      {/* Particle container */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Connection lines (subtle) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3fb0ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#3fb0ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3fb0ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal flow lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="url(#lineGrad1)"
            strokeWidth="1"
            className="animate-dash-flow"
            style={{
              strokeDasharray: '100 200',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </svg>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(10px, -20px) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translate(20px, -10px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(5px, -30px) scale(1.05);
            opacity: 0.5;
          }
        }
        
        @keyframes dash-flow {
          0% {
            stroke-dashoffset: 300;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-float-particle {
          animation-name: float-particle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        .animate-dash-flow {
          animation-name: dash-flow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
