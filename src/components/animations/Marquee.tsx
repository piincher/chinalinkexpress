/**
 * Marquee — CSS-only infinite horizontal scroll
 *
 * Clean, GPU-composited, pauses on hover.
 * No JS animation loops. Reduced-motion: stops scroll.
 */

'use client';

import React from 'react';

export interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // seconds for one loop
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={`flex w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate children for seamless loop */}
        <div className="flex shrink-0 items-center gap-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8" aria-hidden="true">{children}</div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: marquee-scroll"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
