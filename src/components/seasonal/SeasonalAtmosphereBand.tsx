'use client';

/**
 * SeasonalAtmosphereBand — the campaign's ambient decoration, drifting over
 * the landing hero.
 *
 * One canvas, absolutely placed inside the hero band (which clips it), behind
 * the headline and above the globe. It never intercepts a pointer, never
 * announces itself to a screen reader, and never reaches beyond the fold.
 *
 * Four effects, matching the server's vocabulary:
 *
 *   SNOWFALL        flakes drifting down with a slow lateral sway
 *   CRESCENT_STARS  a fixed field of twinkling stars, plus one pale crescent
 *   LANTERNS        soft glowing orbs rising and breathing
 *   CONFETTI        a single celebratory burst that falls out and stops
 *
 * Density scales particle counts only. Reduced motion is not slower motion:
 * stars render as one static frame, and everything else renders nothing —
 * the campaign's colours still come through SeasonalStyleOverride, so the
 * season is present without the movement.
 *
 * The loop pauses when the tab is hidden and tears down cleanly on unmount.
 */

import React, { useEffect, useRef } from 'react';

export type AtmosphereEffect = 'SNOWFALL' | 'LANTERNS' | 'CONFETTI' | 'CRESCENT_STARS';
export type AtmosphereDensity = 'SUBTLE' | 'FESTIVE';

interface SeasonalAtmosphereBandProps {
  effect: AtmosphereEffect;
  density: AtmosphereDensity;
  /** Validated `#RRGGBB` campaign accent; effects fall back to neutral tones. */
  accent?: string | null;
}

const COUNTS: Record<AtmosphereEffect, Record<AtmosphereDensity, number>> = {
  SNOWFALL: { SUBTLE: 36, FESTIVE: 80 },
  CRESCENT_STARS: { SUBTLE: 48, FESTIVE: 100 },
  LANTERNS: { SUBTLE: 9, FESTIVE: 20 },
  CONFETTI: { SUBTLE: 70, FESTIVE: 150 },
};

const FALLBACK_ACCENT = '#E8B44F';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return null;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgba({ r, g, b }: { r: number; g: number; b: number }, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  spin: number;
  alpha: number;
  color: string;
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function spawn(effect: AtmosphereEffect, count: number, w: number, h: number, accent: string): Particle[] {
  const palette = [accent, '#FFFFFF', '#E8B44F'];
  return Array.from({ length: count }, (_, i) => {
    switch (effect) {
      case 'SNOWFALL':
        return {
          x: rand(0, w),
          y: rand(-h, h),
          size: rand(1.2, 3.4),
          speedX: rand(-6, 6),
          speedY: rand(14, 42),
          phase: rand(0, Math.PI * 2),
          spin: rand(0.4, 1.2),
          alpha: rand(0.35, 0.85),
          color: '#FFFFFF',
        };
      case 'CRESCENT_STARS':
        return {
          x: rand(0, w),
          y: rand(0, h * 0.72),
          size: rand(0.8, 2.2),
          speedX: 0,
          speedY: 0,
          phase: rand(0, Math.PI * 2),
          spin: rand(0.6, 2.2),
          alpha: rand(0.5, 1),
          color: i % 5 === 0 ? accent : '#FFFFFF',
        };
      case 'LANTERNS':
        return {
          x: rand(0, w),
          y: rand(0, h),
          size: rand(7, 16),
          speedX: rand(-4, 4),
          speedY: rand(-16, -7),
          phase: rand(0, Math.PI * 2),
          spin: rand(0.3, 0.9),
          alpha: rand(0.35, 0.7),
          color: accent,
        };
      case 'CONFETTI':
      default:
        return {
          x: rand(w * 0.15, w * 0.85),
          y: rand(-h * 0.25, -10),
          size: rand(3, 7),
          speedX: rand(-70, 70),
          speedY: rand(30, 120),
          phase: rand(0, Math.PI * 2),
          spin: rand(2, 7),
          alpha: 1,
          color: palette[i % palette.length],
        };
    }
  });
}

/** Advances and draws one frame. Returns false when a finite effect has ended. */
function drawFrame(
  ctx: CanvasRenderingContext2D,
  effect: AtmosphereEffect,
  particles: Particle[],
  w: number,
  h: number,
  t: number,
  accent: ReturnType<typeof hexToRgb>,
): boolean {
  ctx.clearRect(0, 0, w, h);
  let alive = 0;

  for (const p of particles) {
    switch (effect) {
      case 'SNOWFALL': {
        p.y += p.speedY * t;
        p.x += (p.speedX + Math.sin(p.phase + p.y * 0.012) * 12) * t;
        if (p.y > h + 6) {
          p.y = -6;
          p.x = rand(0, w);
        }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        alive++;
        break;
      }
      case 'CRESCENT_STARS': {
        const twinkle = 0.55 + 0.45 * Math.sin(p.phase + performance.now() * 0.001 * p.spin);
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        alive++;
        break;
      }
      case 'LANTERNS': {
        p.y += p.speedY * t;
        p.x += (p.speedX + Math.sin(p.phase + p.y * 0.01) * 8) * t;
        if (p.y < -24) {
          p.y = h + 24;
          p.x = rand(0, w);
        }
        const glow = 0.8 + 0.2 * Math.sin(p.phase + performance.now() * 0.001 * p.spin);
        const rgb = hexToRgb(p.color) ?? accent;
        if (!rgb) break;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.4);
        gradient.addColorStop(0, rgba(rgb, p.alpha * glow));
        gradient.addColorStop(0.55, rgba(rgb, p.alpha * glow * 0.35));
        gradient.addColorStop(1, rgba(rgb, 0));
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
        ctx.fill();
        alive++;
        break;
      }
      case 'CONFETTI': {
        if (p.alpha <= 0) break;
        p.speedY += 90 * t;
        p.speedX *= 1 - 0.6 * t;
        p.y += p.speedY * t;
        p.x += (p.speedX + Math.sin(p.phase + p.y * 0.05) * 30) * t;
        if (p.y > h * 0.75) p.alpha -= 1.6 * t;
        if (p.alpha <= 0) break;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.phase + p.spin * p.y * 0.02);
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
        alive++;
        break;
      }
    }
  }

  ctx.globalAlpha = 1;

  if (effect === 'CRESCENT_STARS' && accent) {
    const cx = w * 0.86;
    const cy = h * 0.16;
    const r = Math.min(w, h) * 0.055;
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = rgba(accent, 0.85);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx + r * 0.42, cy - r * 0.18, r * 0.86, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  return effect !== 'CONFETTI' || alive > 0;
}

export function SeasonalAtmosphereBand({ effect, density, accent }: SeasonalAtmosphereBandProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const accentHex = accent ?? FALLBACK_ACCENT;
    const accentRgb = hexToRgb(accentHex);

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    host.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      host.removeChild(canvas);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = spawn(effect, COUNTS[effect][density], w, h, accentHex);
    };
    resize();

    /* Reduced motion: stars hold one static frame; moving effects render
       nothing at all. */
    if (reduced.matches) {
      if (effect === 'CRESCENT_STARS') {
        drawFrame(ctx, effect, particles, w, h, 0, accentRgb);
      }
      const observer = new ResizeObserver(() => {
        resize();
        if (effect === 'CRESCENT_STARS') drawFrame(ctx, effect, particles, w, h, 0, accentRgb);
      });
      observer.observe(host);
      return () => {
        observer.disconnect();
        host.removeChild(canvas);
      };
    }

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - last) / 1000, 0.05);
      last = now;
      const running = drawFrame(ctx, effect, particles, w, h, t, accentRgb);
      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      host.removeChild(canvas);
    };
  }, [effect, density, accent]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  );
}

export default SeasonalAtmosphereBand;
