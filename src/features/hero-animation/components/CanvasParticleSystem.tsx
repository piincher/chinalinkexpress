/**
 * Canvas Particle System
 * 
 * Tier 2: Canvas 2D-based particle animation.
 * Better performance than CSS for many particles.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useAnimationStore, useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import { TIER_CONFIG } from '../types';
import type { PerformanceTier, Particle } from '../types';

interface CanvasParticleSystemProps {
  tier: PerformanceTier;
  className?: string;
}

export function CanvasParticleSystem({ tier, className = '' }: CanvasParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const isPlaying = useIsAnimationPlaying();
  const isPageVisible = usePageVisibility();
  const config = TIER_CONFIG[tier];
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = config.particleCount;

    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: config.particleColors[Math.floor(Math.random() * config.particleColors.length)],
        life: Math.random() * 300,
        maxLife: 300 + Math.random() * 200,
      });
    }

    particlesRef.current = particles;
  }, [config]);

  // Draw frame
  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      // Mouse interaction (only for high tier)
      if (tier === 'high') {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.02;
          particle.vy -= (dy / dist) * force * 0.02;
        }
      }

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Reset if life exceeded
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.opacity = Math.random() * 0.6 + 0.2;
      }

      // Fade based on life
      const lifeRatio = particle.life / particle.maxLife;
      const fadeOpacity = particle.opacity * (1 - Math.abs(lifeRatio - 0.5) * 2);

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = fadeOpacity;
      ctx.fill();

      // Draw glow for larger particles
      if (particle.size > 2 && tier !== 'low') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = fadeOpacity * 0.3;
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;

    // Draw connections between nearby particles
    if (tier !== 'low') {
      ctx.strokeStyle = '#3fb0ff';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        const maxConnections = 3;

        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.2;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }
    }

    ctx.globalAlpha = 1;
  }, [tier]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, tier === 'high' ? 2 : 1);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (tier === 'high') {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    let lastTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      // Skip frame if too soon (limit to 30fps for medium tier)
      if (tier === 'medium' && deltaTime < 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      if (isPlaying && isPageVisible) {
        draw(ctx, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [initParticles, draw, isPlaying, isPageVisible, tier]);

  if (tier === 'minimal') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ 
        opacity: 0.8,
        mixBlendMode: 'screen',
      }}
    />
  );
}
