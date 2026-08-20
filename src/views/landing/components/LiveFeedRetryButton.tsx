'use client';

/**
 * LiveFeedRetryButton — the feed's one recovery gesture, used twice (first
 * load failure and load-more failure). Extracted so both failure states share
 * exactly one look: a quiet outlined pill in the mono label voice, the same
 * register as the section's other small print.
 */

import React from 'react';
import { useTranslations } from 'next-intl';

export function LiveFeedRetryButton({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations('liveFeed');

  return (
    <button
      type="button"
      onClick={onRetry}
      style={{
        padding: 'var(--space-xs) var(--space-lg)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--color-rule-2)',
        backgroundColor: 'transparent',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: 'var(--color-ink)',
        cursor: 'pointer',
      }}
    >
      {t('retry')}
    </button>
  );
}

export default LiveFeedRetryButton;
