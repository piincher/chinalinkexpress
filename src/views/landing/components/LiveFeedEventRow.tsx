'use client';

/**
 * LiveFeedEventRow — one milestone of one parcel.
 *
 * A hairline-separated row, not a card: the feed is a ledger, and ledgers read
 * as lines. Cards would put twenty bordered boxes down the page and make the
 * section shout; rules let the eye scan status-to-status down a single column.
 *
 * Colour is spent only on the status chip, and only two meanings exist:
 * accent for "moving through the network", positive for "arrived". Everything
 * else stays ink — a feed where every status has its own hue reads as a
 * monitoring dashboard, which this is not.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Plane, Ship } from 'lucide-react';
import type { LiveFeedEvent, LiveFeedStatus } from '@/lib/liveFeedApi';
import { formatRelativeTime } from './liveFeedFormat';

const ARRIVED_STATUSES: LiveFeedStatus[] = ['READY_FOR_PICKUP', 'DELIVERED'];
const MOVING_STATUSES: LiveFeedStatus[] = [
  'ASSIGNED_TO_CONTAINER',
  'LOADED_IN_CONTAINER',
  'IN_TRANSIT',
  'ARRIVED_DESTINATION',
];

function statusColor(status: LiveFeedStatus): string {
  if (ARRIVED_STATUSES.includes(status)) return 'var(--color-positive)';
  if (MOVING_STATUSES.includes(status)) return 'var(--color-accent)';
  return 'var(--color-ink-2)';
}

export function LiveFeedEventRow({ event }: { event: LiveFeedEvent }) {
  const t = useTranslations('liveFeed');
  const locale = useLocale();

  const ModeIcon = event.mode === 'AIR' ? Plane : Ship;
  const statusLabel = t(`status.${event.status}`);
  const relativeTime = formatRelativeTime(event.occurredAt, locale);
  const chipColor = statusColor(event.status);

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        paddingBlock: 'var(--space-md)',
        borderTop: '1px solid var(--color-rule)',
        listStyle: 'none',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-3xs)',
          flex: '0 0 auto',
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--color-rule)',
            color: 'var(--color-ink-2)',
          }}
        >
          <ModeIcon size={16} strokeWidth={1.75} />
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--color-neutral)',
          }}
        >
          {event.mode === 'AIR' ? t('modes.air') : t('modes.sea')}
        </span>
      </span>

      <span style={{ minWidth: 0, flex: '1 1 auto' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-medium)',
            color: 'var(--color-ink)',
            overflowWrap: 'anywhere',
          }}
        >
          {event.route}
        </span>
        <span
          style={{
            display: 'block',
            marginTop: 'var(--space-3xs)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neutral)',
          }}
        >
          {event.ref}
          {' · '}
          {event.client ?? t('anonymousClient')}
          {relativeTime && ` · ${relativeTime}`}
        </span>
      </span>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2xs)',
          flex: '0 0 auto',
          padding: 'var(--space-2xs) var(--space-sm)',
          borderRadius: 'var(--radius-pill)',
          border: `1px solid color-mix(in oklch, ${chipColor} 35%, var(--color-paper))`,
          backgroundColor: `color-mix(in oklch, ${chipColor} 8%, var(--color-paper))`,
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: chipColor,
          whiteSpace: 'nowrap',
        }}
      >
        {statusLabel}
      </span>
    </li>
  );
}

export default LiveFeedEventRow;
