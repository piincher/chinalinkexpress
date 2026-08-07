'use client';

/**
 * SectionHead — one heading pattern for the whole site.
 *
 * Replaces the pattern that was repeated eight times on the home page:
 *
 *     [ pill eyebrow on tinted background ]      ← centred
 *     Heading                                    ← centred, 4xl/5xl bold
 *     ▬▬▬▬ gradient underline bar ▬▬▬▬            ← centred, rounded
 *     Lede paragraph                             ← centred, max-w-3xl
 *
 * Every part of that is a template signal, and the gradient bar most of all.
 * What replaces it: left-aligned by default, no pill, no bar. Emphasis comes
 * from size and from the space above the heading, which is what emphasis is
 * made of on a page that isn't shouting.
 *
 * `align="center"` exists because a couple of sections genuinely want it, but
 * it is not the default — a page where every heading is centred has no reading
 * direction.
 */

import React from 'react';
import { Reveal } from '@/components/motion';

interface SectionHeadProps {
  title: React.ReactNode;
  /** Short line above the title. Used sparingly — three times on the whole page. */
  label?: string;
  lede?: React.ReactNode;
  align?: 'start' | 'center';
  tone?: 'ink' | 'void';
  /** Slot for a link or button placed opposite the heading on wide screens. */
  aside?: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionHead({
  title,
  label,
  lede,
  align = 'start',
  tone = 'ink',
  aside,
  className,
  id,
}: SectionHeadProps) {
  const inkColor = tone === 'void' ? 'var(--color-void-ink)' : 'var(--color-ink)';
  const subColor = tone === 'void' ? 'var(--color-void-ink-2)' : 'var(--color-ink-2)';
  const labelColor = tone === 'void' ? 'var(--color-accent-bright)' : 'var(--color-accent)';

  return (
    <Reveal
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align === 'center' ? 'center' : 'start',
        marginBottom: 'var(--space-2xl)',
      }}
    >
      <div
        style={{
          display: 'flex',
          // Collapses to one column below 900px so the aside never squeezes the
          // heading into a two-character-wide column.
          flexWrap: 'wrap',
          gap: 'var(--space-lg)',
          alignItems: 'flex-end',
          justifyContent: aside ? 'space-between' : undefined,
          width: '100%',
        }}
      >
        <div style={{ minWidth: 0, flex: '1 1 22rem' }}>
          {label && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: labelColor,
                marginBottom: 'var(--space-md)',
              }}
            >
              {label}
            </div>
          )}

          <h2
            id={id}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              lineHeight: 'var(--leading-heading)',
              color: inkColor,
              margin: 0,
              overflowWrap: 'anywhere',
            }}
          >
            {title}
          </h2>
        </div>

        {aside && <div style={{ flex: '0 0 auto' }}>{aside}</div>}
      </div>

      {lede && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-md)',
            lineHeight: 'var(--leading-body)',
            color: subColor,
            maxWidth: 'var(--measure)',
            margin: 0,
          }}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

export default SectionHead;
