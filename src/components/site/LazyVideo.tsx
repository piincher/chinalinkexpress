'use client';

/**
 * Ambient footage that costs nothing until it is worth it: the poster paints
 * first, and the clip only loads when on screen, on a wide screen, without data
 * saver or a 2G connection, and without reduced motion. Everyone else keeps the
 * still photograph, which matters on a metered phone connection in Bamako.
 */

import React, { useEffect, useRef } from 'react';

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LazyVideo({ src, poster, className, style }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const allowed =
      !connection?.saveData &&
      !/2g/.test(connection?.effectiveType ?? '') &&
      window.matchMedia('(min-width: 901px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!allowed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
    />
  );
}

export default LazyVideo;
