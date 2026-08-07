'use client';

/**
 * Figure — the house treatment for photography.
 *
 * The company's photographs are honest but unstyled: overhead fluorescent
 * light, portrait framing, a lot of empty concrete along the bottom. The
 * treatment that makes them read as art-directed rather than as snapshots is
 * consistency — the same crop discipline, the same scrim, the same hairline, on
 * every one of them.
 *
 *   focal      pushes the crop toward the cargo instead of centring on floor
 *   scrim      two-stop gradient, dark at the bottom where type sits
 *   parallax   optional depth on the large bands
 *
 * The scrim is a gradient, not a flat wash: a uniform overlay desaturates the
 * whole frame and makes it look like a stock photo behind a filter, whereas a
 * gradient keeps the top of the image bright and hands the bottom to the text.
 */

import React from 'react';
import Image from 'next/image';
import { Parallax } from '@/components/motion';

interface FigureProps {
  src: string;
  alt: string;
  /** Vertical focal point of the crop. '35%' favours the cargo over the floor. */
  focal?: string;
  /** 0 = no scrim (light band), 1 = full house scrim (type over image). */
  scrim?: number;
  parallax?: boolean;
  priority?: boolean;
  rounded?: boolean;
  /** Duotone the image toward the brand hue. Used on the darkest band only. */
  tint?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  children?: React.ReactNode;
}

export function Figure({
  src,
  alt,
  focal = '35%',
  scrim = 0,
  parallax = false,
  priority = false,
  rounded = true,
  tint = false,
  className,
  style,
  sizes = '100vw',
  children,
}: FigureProps) {
  const picture = (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      style={{
        objectFit: 'cover',
        objectPosition: `50% ${focal}`,
        // A very slight desaturation plus a lift in contrast pulls the warm
        // fluorescent cast out of the originals and lets them sit on the cool
        // void band without clashing.
        // The originals are lit by overhead fluorescents and read warm and
        // flat. Pulling saturation and brightness down and contrast up gives
        // them the cool, graded look the dark bands need — and stops the
        // yellow-green cast from fighting the blue accent.
        filter: tint
          ? 'saturate(0.5) contrast(1.14) brightness(0.74)'
          : 'saturate(0.88) contrast(1.05)',
      }}
    />
  );

  return (
    <figure
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        borderRadius: rounded ? 'var(--radius-panel)' : 0,
        backgroundColor: 'var(--color-void-2)',
        ...style,
      }}
    >
      {parallax ? (
        <Parallax
          strength={0.16}
          style={{ position: 'absolute', inset: 0 }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>{picture}</div>
        </Parallax>
      ) : (
        picture
      )}

      {scrim > 0 && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              to bottom,
              var(--scrim-0) 0%,
              var(--scrim-25) 25%,
              var(--scrim-55) 55%,
              var(--scrim-85) 85%,
              var(--scrim-100) 100%
            )`,
            opacity: scrim,
          }}
        />
      )}

      {/* Hairline over the media rather than around the box, so it survives the
          rounded corner without a seam. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 0 1px color-mix(in oklch, var(--color-void-ink) 12%, transparent)',
          pointerEvents: 'none',
        }}
      />

      {children}
    </figure>
  );
}

export default Figure;
