/**
 * Marquee Component
 * 
 * Infinite horizontal scroll animation for logos, testimonials, or content.
 * Features:
 * - Seamless infinite loop with duplicated content
 * - Gradient masks on edges for fade effect
 * - Pause on hover for accessibility
 * - Reduced motion support
 * - Dark mode compatible
 * 
 * @example
 * <Marquee>
 *   <Logo1 />
 *   <Logo2 />
 *   <Logo3 />
 * </Marquee>
 */

'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import './Marquee.css';

export interface MarqueeProps {
  /** Content to scroll (usually logos or cards) */
  children: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Animation speed - 'slow' | 'normal' | 'fast' (default: 'normal') */
  speed?: 'slow' | 'normal' | 'fast';
  /** Reverse the animation direction (default: false) */
  reverse?: boolean;
  /** Pause animation on hover (default: true) */
  pauseOnHover?: boolean;
  /** Number of times to duplicate content (default: 2) */
  duplicateCount?: number;
  /** Gap between items in pixels (default: 40) */
  gap?: number;
}

export function Marquee({
  children,
  className = '',
  speed = 'normal',
  reverse = false,
  pauseOnHover = true,
  duplicateCount = 2,
  gap = 40,
}: MarqueeProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Build speed class
  const speedClass = {
    slow: 'marquee-track--slow',
    normal: '',
    fast: 'marquee-track--fast',
  }[speed];

  // Build direction class
  const directionClass = reverse ? 'marquee-track--reverse' : '';

  // Build hover pause class
  const hoverClass = pauseOnHover ? '' : 'marquee-track--no-pause';

  // Duplicate children for seamless loop
  const duplicatedContent = Array.from({ length: duplicateCount }, (_, i) => (
    <React.Fragment key={i}>
      {React.Children.map(children, (child, childIndex) => (
        <div 
          key={`${i}-${childIndex}`}
          className="marquee-item"
          style={{ padding: `0 ${gap / 2}px` }}
        >
          {child}
        </div>
      ))}
    </React.Fragment>
  ));

  // For reduced motion, show static grid
  if (isReducedMotion) {
    return (
      <div className={`marquee-container ${className}`}>
        <div className="marquee-track" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className="marquee-item" style={{ padding: '1rem' }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`marquee-container ${className}`}>
      <div 
        className={`marquee-track ${speedClass} ${directionClass} ${hoverClass}`}
        style={{ gap: `${gap}px` }}
      >
        {duplicatedContent}
      </div>
    </div>
  );
}

/**
 * LogoMarquee - Pre-configured marquee for logo displays
 * 
 * @example
 * <LogoMarquee>
 *   <img src="/logos/logo1.svg" alt="Partner 1" className="marquee-logo" />
 *   <img src="/logos/logo2.svg" alt="Partner 2" className="marquee-logo" />
 * </LogoMarquee>
 */
export interface LogoMarqueeProps extends Omit<MarqueeProps, 'children'> {
  /** Array of logo image sources */
  logos: { src: string; alt: string }[];
  /** Logo height in pixels (default: 40) */
  logoHeight?: number;
}

export function LogoMarquee({
  logos,
  logoHeight = 40,
  className = '',
  speed = 'normal',
  reverse = false,
  pauseOnHover = true,
  gap = 80,
}: LogoMarqueeProps) {
  return (
    <Marquee
      className={className}
      speed={speed}
      reverse={reverse}
      pauseOnHover={pauseOnHover}
      gap={gap}
    >
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="marquee-logo"
          style={{ height: logoHeight }}
          loading="lazy"
        />
      ))}
    </Marquee>
  );
}

/**
 * TestimonialMarquee - Pre-configured marquee for testimonial cards
 */
export function TestimonialMarquee({
  children,
  className = '',
  speed = 'slow',
}: {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}) {
  return (
    <Marquee
      className={className}
      speed={speed}
      gap={24}
      pauseOnHover={true}
    >
      {children}
    </Marquee>
  );
}

export default Marquee;
