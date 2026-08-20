'use client';

/**
 * LiveFeedSkeleton — the feed's shape before the feed arrives.
 *
 * Blocks match the row geometry of LiveFeedEventRow (icon square, two text
 * lines, status chip) so the first paint of real events does not shift the
 * layout. The shimmer reuses the site's existing `shimmer` keyframe; the base
 * tone is paper-2 on a paper band, which is exactly how the tokens intend a
 * quieter surface on a quiet surface to read.
 */

import React from 'react';

function Block({ width, height }: { width: string; height: string }) {
  return (
    <span
      style={{
        position: 'relative',
        display: 'block',
        width,
        height,
        overflow: 'hidden',
        borderRadius: 'var(--radius-input)',
        backgroundColor: 'var(--color-paper-2)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'translateX(-100%)',
          background:
            'linear-gradient(90deg, transparent, color-mix(in oklch, var(--color-paper) 70%, transparent), transparent)',
          animation: 'shimmer 1.6s infinite',
        }}
      />
    </span>
  );
}

export function LiveFeedSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <ul aria-hidden style={{ margin: 0, padding: 0 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            paddingBlock: 'var(--space-md)',
            borderTop: '1px solid var(--color-rule)',
            listStyle: 'none',
          }}
        >
          <Block width="2.25rem" height="2.25rem" />
          <span style={{ flex: '1 1 auto', display: 'block' }}>
            <Block width="38%" height="0.875rem" />
            <span style={{ display: 'block', marginTop: 'var(--space-2xs)' }}>
              <Block width="62%" height="0.75rem" />
            </span>
          </span>
          <Block width="6.5rem" height="1.5rem" />
        </li>
      ))}
    </ul>
  );
}

export default LiveFeedSkeleton;
