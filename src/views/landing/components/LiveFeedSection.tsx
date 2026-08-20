'use client';

/**
 * LiveFeedSection — the network, running, in the middle of the pitch.
 *
 * Every other section on this page asserts something about the company; this
 * one shows the company working. Placed straight after the Journey band it
 * answers the question the journey raises — "does this actually happen, and
 * how often?" — with the one evidence that cannot be restated or art-directed:
 * events, arriving while you watch.
 *
 * Three behaviours, all deliberately boring:
 *
 *   Poll      Page 1 is refetched every 30min. Counters are replaced outright;
 *             events are merged by identity (ref + status + timestamp) so a
 *             parcel that reaches a new milestone prepends a fresh row instead
 *             of duplicating. Replacing only page 1 keeps pages the visitor
 *             already scrolled to stable under their cursor.
 *   Scroll    A sentinel below the list loads the next page when it enters
 *             the viewport, until the backend says there is none. A busy flag
 *             prevents overlapping loads; the end of the feed is stated, not
 *             implied by a spinner that never resolves.
 *   Failure   A failed first load shows a quiet message and a retry button
 *             inside the section — the band stays mounted, so the page's
 *             rhythm does not collapse because one endpoint had a bad minute.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, SectionHead } from '@/components/site';
import {
  fetchLiveFeed,
  liveFeedEventKey,
  LIVE_FEED_PAGE_SIZE,
  type LiveFeedCounters as LiveFeedCountersData,
  type LiveFeedEvent,
} from '@/lib/liveFeedApi';
import { SECTION_IDS } from '../constants';
import { LiveFeedCounters } from './LiveFeedCounters';
import { LiveFeedEventRow } from './LiveFeedEventRow';
import { LiveFeedRetryButton } from './LiveFeedRetryButton';
import { LiveFeedSkeleton } from './LiveFeedSkeleton';

const POLL_INTERVAL_MS = 30 * 60_000;

type FeedStatus = 'loading' | 'error' | 'ready';

export function LiveFeedSection() {
  const t = useTranslations('liveFeed');

  const [status, setStatus] = useState<FeedStatus>('loading');
  const [events, setEvents] = useState<LiveFeedEvent[]>([]);
  const [counters, setCounters] = useState<LiveFeedCountersData | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreFailed, setLoadMoreFailed] = useState(false);

  // Mirrors of the values the observer/poll callbacks need, so those callbacks
  // can be created once and never go stale.
  const busyRef = useRef(false);
  const pageRef = useRef(1);
  const hasNextRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const applyPageOne = useCallback((payloadEvents: LiveFeedEvent[], nextCounters: LiveFeedCountersData | null, next: boolean) => {
    if (nextCounters) setCounters(nextCounters);
    setHasNextPage(next);
    hasNextRef.current = next;
    setEvents((prev) => {
      const freshKeys = new Set(payloadEvents.map(liveFeedEventKey));
      return [...payloadEvents, ...prev.filter((event) => !freshKeys.has(liveFeedEventKey(event)))];
    });
  }, []);

  const loadFirstPage = useCallback(async () => {
    busyRef.current = true;
    const result = await fetchLiveFeed(1);
    busyRef.current = false;
    if (!result.ok) {
      setStatus((prev) => (prev === 'ready' ? prev : 'error'));
      return;
    }
    pageRef.current = 1;
    applyPageOne(
      result.data.events,
      result.data.counters,
      result.data.pagination?.hasNextPage ?? result.data.events.length >= LIVE_FEED_PAGE_SIZE
    );
    setStatus('ready');
  }, [applyPageOne]);

  const loadNextPage = useCallback(async () => {
    if (busyRef.current || !hasNextRef.current) return;
    busyRef.current = true;
    setLoadingMore(true);
    setLoadMoreFailed(false);

    const nextPage = pageRef.current + 1;
    const result = await fetchLiveFeed(nextPage);

    busyRef.current = false;
    setLoadingMore(false);
    if (!result.ok) {
      setLoadMoreFailed(true);
      return;
    }
    const next = result.data.pagination?.hasNextPage ?? false;
    pageRef.current = nextPage;
    setHasNextPage(next);
    hasNextRef.current = next;
    setEvents((prev) => {
      const known = new Set(prev.map(liveFeedEventKey));
      return [...prev, ...result.data.events.filter((event) => !known.has(liveFeedEventKey(event)))];
    });
  }, []);

  // First load.
  useEffect(() => {
    void loadFirstPage();
  }, [loadFirstPage]);

  // Poll page 1 — only once the feed is up, so a down endpoint is not polled.
  useEffect(() => {
    if (status !== 'ready') return;
    const interval = setInterval(() => {
      void (async () => {
        if (busyRef.current) return;
        busyRef.current = true;
        const result = await fetchLiveFeed(1);
        busyRef.current = false;
        if (result.ok) {
          applyPageOne(
            result.data.events,
            result.data.counters,
            result.data.pagination?.hasNextPage ?? hasNextRef.current
          );
        }
      })();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [status, applyPageOne]);

  // Infinite scroll — observe the sentinel once the feed is ready.
  useEffect(() => {
    if (status !== 'ready') return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadNextPage();
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [status, loadNextPage]);

  return (
    <Band id={SECTION_IDS.LIVE_FEED} tone="paper" ruled>
      <Shell>
        <SectionHead
          label={t('label')}
          title={t('title')}
          lede={t('lede')}
          aside={
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-accent)',
                  animation: 'live-feed-pulse 2s ease-in-out infinite',
                }}
              />
              {t('liveBadge')}
            </span>
          }
        />

        {status === 'loading' && <LiveFeedSkeleton rows={6} />}

        {status === 'error' && (
          <div style={{ paddingBlock: 'var(--space-xl)' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral)',
                margin: 0,
              }}
            >
              {t('loadError')}
            </p>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <LiveFeedRetryButton
                onRetry={() => {
                  setStatus('loading');
                  void loadFirstPage();
                }}
              />
            </div>
          </div>
        )}

        {status === 'ready' && (
          <>
            {counters && <LiveFeedCounters counters={counters} />}
            <ul style={{ margin: 0, padding: 0 }}>
              {events.map((event) => (
                <LiveFeedEventRow key={liveFeedEventKey(event)} event={event} />
              ))}
            </ul>

            <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />

            {loadingMore && <LiveFeedSkeleton rows={2} />}

            {loadMoreFailed && (
              <div style={{ paddingBlock: 'var(--space-md)', textAlign: 'center' }}>
                <LiveFeedRetryButton onRetry={() => void loadNextPage()} />
              </div>
            )}

            {!hasNextPage && !loadingMore && events.length > 0 && (
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  textAlign: 'center',
                  paddingBlock: 'var(--space-lg)',
                  margin: 0,
                }}
              >
                {t('endOfFeed')}
              </p>
            )}
          </>
        )}
      </Shell>
    </Band>
  );
}

export default LiveFeedSection;
