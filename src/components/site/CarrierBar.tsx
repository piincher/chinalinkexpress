'use client';

/**
 * CarrierBar — the proof line.
 *
 * Seven real carrier marks, rendered as flat monochrome silhouettes at one
 * optical height. This is the single highest-value element on the page for a
 * freight forwarder: "Maersk · MSC · CMA CGM · Hapag-Lloyd · Ethiopian" answers
 * *is this a real company* faster than any amount of copy.
 *
 * `brightness(0) invert(1)` flattens each PNG to a white silhouette. It is the
 * standard logo-wall treatment for a reason — seven brand palettes side by side
 * read as a sponsor board, one weight reads as infrastructure. The marks are
 * stacked lockups at differing aspect ratios, so each sits in a fixed-height
 * box with `object-fit: contain` and is optically balanced by width rather than
 * scaled to a common box.
 */

import React from 'react';
import Image from 'next/image';
import { CARRIERS, type Carrier } from './assets';

interface CarrierBarProps {
  tone?: 'void' | 'paper';
  /** Filter to sea or air carriers. Omit for all seven. */
  mode?: Carrier['mode'];
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CarrierBar({
  tone = 'void',
  mode,
  label,
  className,
  style,
}: CarrierBarProps) {
  const carriers = mode ? CARRIERS.filter((c) => c.mode === mode) : CARRIERS;
  const onVoid = tone === 'void';

  return (
    <div className={className} style={style}>
      {label && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: onVoid ? 'var(--color-void-ink-2)' : 'var(--color-neutral)',
            marginBottom: 'var(--space-lg)',
          }}
        >
          {label}
        </div>
      )}

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          // Generous and uneven-tolerant: the marks have different widths, and
          // forcing them onto a rigid grid is what makes logo walls look
          // clip-arty.
          gap: 'clamp(1.75rem, 4vw, 3.25rem)',
        }}
      >
        {carriers.map((carrier) => (
          <li
            key={carrier.name}
            style={{
              position: 'relative',
              height: 32,
              width: 'clamp(58px, 9vw, 84px)',
              flex: '0 0 auto',
            }}
          >
            <Image
              src={carrier.src}
              alt={carrier.name}
              fill
              sizes="84px"
              style={{
                objectFit: 'contain',
                filter: onVoid
                  ? carrier.art === 'filled'
                    // Desaturate and lift rather than flatten: a filled tile
                    // survives as a light-grey shape with its mark still
                    // readable inside it, instead of becoming a white block.
                    ? 'grayscale(1) brightness(1.7) contrast(0.85)'
                    : 'brightness(0) invert(1)'
                  : 'grayscale(1) brightness(0.4) contrast(1.2)',
                opacity: onVoid ? 0.78 : 0.6,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarrierBar;
