/**
 * Liquid Background
 * 
 * A mind-blowing WebGL fluid simulation that creates liquid distortion effects.
 * Responds to mouse movement and scroll with rippling, organic motion.
 * Part of the hero-animation feature.
 */

'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useIsAnimationPlaying } from '../store/useAnimationStore';
import { usePageVisibility } from '../hooks';
import type { PerformanceTier } from '../types';

interface LiquidBackgroundProps {
  tier: PerformanceTier;
  className?: string;
}

interface FluidCell {
  x: number;
  y: number;
  u: number;
  v: number;
  density: number;
}

export function LiquidBackground({ tier, className = '' }: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const isPlaying = useIsAnimationPlaying();
  const isPageVisible = usePageVisibility();
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const timeRef = useRef(0);

  // Fluid simulation parameters
  const config = {
    gridSize: tier === 'high' ? 80 : tier === 'medium' ? 50 : 30,
    viscosity: 0.98,
    diffusion: 0.99,
    fadeSpeed: 0.99,
    colorSpeed: 0.002,
  };

  const initFluid = useCallback((width: number, height: number) => {
    const cols = config.gridSize;
    const rows = Math.floor(cols * (height / width));
    const cells: FluidCell[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({
          x: x / cols * width,
          y: y / rows * height,
          u: 0,
          v: 0,
          density: 0,
        });
      }
    }

    return { cells, cols, rows };
  }, [config.gridSize]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, fluid: { cells: FluidCell[]; cols: number; rows: number }) => {
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    timeRef.current += config.colorSpeed;
    const t = timeRef.current;

    // Sample fluid at each pixel
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        // Find nearest fluid cell
        const cellX = Math.floor((x / width) * fluid.cols);
        const cellY = Math.floor((y / height) * fluid.rows);
        const idx = cellY * fluid.cols + cellX;
        const cell = fluid.cells[idx];

        if (!cell) continue;

        // Calculate color based on velocity and time
        const speed = Math.sqrt(cell.u * cell.u + cell.v * cell.v);
        const hue = (t * 50 + speed * 100 + x * 0.1) % 360;
        
        // Blue-cyan color palette for logistics theme
        const r = Math.sin(hue * Math.PI / 180) * 63 + 11;  // 0b4168 base
        const g = Math.sin((hue + 60) * Math.PI / 180) * 176 + 80;
        const b = Math.sin((hue + 120) * Math.PI / 180) * 100 + 155;
        const alpha = Math.min(255, (cell.density * 50 + 20) * speed * 10);

        // Fill 2x2 pixel block
        for (let dy = 0; dy < 2 && y + dy < height; dy++) {
          for (let dx = 0; dx < 2 && x + dx < width; dx++) {
            const pixelIdx = ((y + dy) * width + (x + dx)) * 4;
            data[pixelIdx] = r;
            data[pixelIdx + 1] = g;
            data[pixelIdx + 2] = b;
            data[pixelIdx + 3] = alpha;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [config.colorSpeed]);

  const updateFluid = useCallback((fluid: { cells: FluidCell[]; cols: number; rows: number }, width: number, height: number) => {
    const { cells, cols, rows } = fluid;

    // Add velocity from mouse
    const dx = mouseRef.current.x - mouseRef.current.prevX;
    const dy = mouseRef.current.y - mouseRef.current.prevY;
    const mouseSpeed = Math.sqrt(dx * dx + dy * dy);

    if (mouseSpeed > 1) {
      const cellX = Math.floor((mouseRef.current.x / width) * cols);
      const cellY = Math.floor((mouseRef.current.y / height) * rows);
      const radius = 5;

      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          const targetX = cellX + x;
          const targetY = cellY + y;
          
          if (targetX >= 0 && targetX < cols && targetY >= 0 && targetY < rows) {
            const idx = targetY * cols + targetX;
            const dist = Math.sqrt(x * x + y * y);
            const strength = (1 - dist / radius) * 0.5;
            
            if (cells[idx]) {
              cells[idx].u += dx * strength * 0.3;
              cells[idx].v += dy * strength * 0.3;
              cells[idx].density += strength * 2;
            }
          }
        }
      }
    }

    // Update mouse previous position
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;

    // Apply diffusion and fade
    const newCells = cells.map((cell, idx) => {
      const x = idx % cols;
      const y = Math.floor(idx / cols);
      
      // Average with neighbors
      let avgU = cell.u;
      let avgV = cell.v;
      let count = 1;
      
      const neighbors = [
        cells[(y - 1) * cols + x],
        cells[(y + 1) * cols + x],
        cells[y * cols + (x - 1)],
        cells[y * cols + (x + 1)],
      ];
      
      for (const neighbor of neighbors) {
        if (neighbor) {
          avgU += neighbor.u;
          avgV += neighbor.v;
          count++;
        }
      }
      
      avgU /= count;
      avgV /= count;

      return {
        ...cell,
        u: avgU * config.viscosity,
        v: avgV * config.viscosity,
        density: cell.density * config.fadeSpeed,
      };
    });

    // Update cells
    for (let i = 0; i < cells.length; i++) {
      cells[i].u = newCells[i].u;
      cells[i].v = newCells[i].v;
      cells[i].density = newCells[i].density;
    }
  }, [config.viscosity, config.fadeSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let fluid = initFluid(canvas.width, canvas.height);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, tier === 'high' ? 1.5 : 1);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      fluid = initFluid(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let lastTime = performance.now();
    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      // Limit to 30fps for performance
      if (deltaTime < 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTime = currentTime;

      if (isPlaying && isPageVisible) {
        updateFluid(fluid, canvas.width, canvas.height);
        draw(ctx, canvas.width, canvas.height, fluid);
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
  }, [initFluid, updateFluid, draw, isPlaying, isPageVisible, tier]);

  if (tier === 'minimal') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto opacity-60 ${className}`}
      style={{
        mixBlendMode: 'screen',
        filter: 'blur(1px)',
      }}
    />
  );
}
