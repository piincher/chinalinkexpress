'use client';

/**
 * Band — the page's horizontal rhythm.
 *
 * Every section on the home page is a Band. The page reads as composed rather
 * than stacked because the tone alternates — paper, paper-2, void — instead of
 * seventeen identical white blocks separated by whitespace.
 *
 * `void` is a deliberately dark band that stays dark in light mode. It is the
 * device that carries the photography and the two moments the page most wants
 * you to remember; used more than three times it stops being emphasis.
 */

import React from 'react';

export type BandTone = 'paper' | 'paper-2' | 'void';

interface BandProps {
  children: React.ReactNode;
  tone?: BandTone;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Remove the vertical padding — for bands that are edge-to-edge media. */
  flush?: boolean;
  /** Hairline rule along the top edge. */
  ruled?: boolean;
  as?: React.ElementType;
  /**
   * Marks this band as sitting *under* the fixed navbar, so the navbar can
   * flip its own contrast while it overlaps. Set to "void" on a dark hero;
   * SharedNavbar observes it. Without this the nav's ink-coloured links would
   * be invisible against a dark photograph.
   */
  'data-nav-overlay'?: BandTone;
}

const TONES: Record<BandTone, React.CSSProperties> = {
  paper: {
    backgroundColor: 'var(--color-paper)',
    color: 'var(--color-ink)',
  },
  'paper-2': {
    backgroundColor: 'var(--color-paper-2)',
    color: 'var(--color-ink)',
  },
  void: {
    backgroundColor: 'var(--color-void)',
    color: 'var(--color-void-ink)',
  },
};

export function Band({
  children,
  tone = 'paper',
  id,
  className,
  style,
  flush = false,
  ruled = false,
  as: TagProp = 'section',
  ...rest
}: BandProps) {
  // A polymorphic `as` widens the JSX props union to `never`; narrowing to one
  // concrete element keeps props typed, runtime tag unchanged.
  const Tag = TagProp as unknown as 'section';

  return (
    <Tag
      {...rest}
      id={id}
      // `band-void` is the hook globals.css uses to switch the focus ring to
      // its high-contrast variant on dark surfaces.
      className={[tone === 'void' ? 'band-void' : '', className].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        ...TONES[tone],
        paddingBlock: flush ? 0 : 'var(--band-y)',
        borderTop: ruled ? '1px solid var(--color-rule)' : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Shell — the measured column inside a Band.
 *
 * Separate from Band so a band can run its background edge-to-edge while its
 * content stays on the grid.
 */
export function Shell({
  children,
  className,
  style,
  width = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: 'default' | 'wide' | 'narrow';
}) {
  const max = width === 'wide' ? '92rem' : width === 'narrow' ? '54rem' : 'var(--shell)';
  return (
    <div
      className={className}
      style={{
        maxWidth: max,
        marginInline: 'auto',
        paddingInline: 'var(--band-x)',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Band;
