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
 * It used to grow: a sentinel below the list pulled the next page whenever it
 * scrolled into view, so the band swallowed the page and a visitor scrolling
 * toward the rest of the pitch never reached it. A marketing page is read top
 * to bottom; a section that lengthens as you scroll is a trap, not evidence.
 *
 * So the feed is now a BOARD, not a list. A fixed window of rows advances one
 * row at a time on a timer, the way a departures board does. The section keeps
 * a constant height, the evidence still moves, and the page below it stays
 * reachable.
 *
 * Three behaviours, all deliberately boring:
 *
 *   Poll      Page 1 is refetched every 30min and merged by identity
 *             (ref + status + timestamp), so a parcel reaching a new milestone
 *             joins the rotation instead of duplicating.
 *   Rotate    The window slides by one row every few seconds and loops
 *             seamlessly. It pauses whenever nobody can act on it — tab
 *             hidden, section off-screen — and whenever the visitor hovers,
 *             so a row cannot slide away mid-read.
 *   Failure   A failed first load shows a quiet message and a retry button
 *             inside the section — the band stays mounted, so the page's
 *             rhythm does not collapse because one endpoint had a bad minute.
 *
 * Reduced motion is not a slower rotation, it is no rotation: the board holds
 * the newest rows still. Swapping content on a timer without animating it is
 * more disorienting than the animation it replaces, not less.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, SectionHead } from '@/components/site';
import {
  fetchLiveFeed,
  liveFeedEventKey,
  type LiveFeedCounters as LiveFeedCountersData,
  type LiveFeedEvent,
} from '@/lib/liveFeedApi';
import { SECTION_IDS } from '../constants';
import { LiveFeedCounters } from './LiveFeedCounters';
import { LiveFeedEventRow } from './LiveFeedEventRow';
import { LiveFeedRetryButton } from './LiveFeedRetryButton';
import { LiveFeedSkeleton } from './LiveFeedSkeleton';

const POLL_INTERVAL_MS = 30 * 60_000;
/** Rows visible at once. */
const WINDOW_ROWS = 5;
/** Every row occupies exactly this, so the transform cannot jitter. */
const ROW_HEIGHT = '5.25rem';
/** Dwell time on each position — long enough to read a row before it moves. */
const ROTATE_INTERVAL_MS = 3_600;
/** Must match the transition below. */
const SLIDE_MS = 700;

type FeedStatus = 'loading' | 'error' | 'ready';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

export function LiveFeedSection() {
  const t = useTranslations('liveFeed');
  const reducedMotion = usePrefersReducedMotion();

  const [status, setStatus] = useState<FeedStatus>('loading');
  const [events, setEvents] = useState<LiveFeedEvent[]>([]);
  const [counters, setCounters] = useState<LiveFeedCountersData | null>(null);

  // Rotation state. `offset` counts rows, not pixels.
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const busyRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const applyPageOne = useCallback(
    (payloadEvents: LiveFeedEvent[], nextCounters: LiveFeedCountersData | null) => {
      if (nextCounters) setCounters(nextCounters);
      setEvents((prev) => {
        const freshKeys = new Set(payloadEvents.map(liveFeedEventKey));
        return [...payloadEvents, ...prev.filter((event) => !freshKeys.has(liveFeedEventKey(event)))];
      });
    },
    []
  );

  const loadFirstPage = useCallback(async () => {
    busyRef.current = true;
    const result = await fetchLiveFeed(1);
    busyRef.current = false;
    if (!result.ok) {
      setStatus((prev) => (prev === 'ready' ? prev : 'error'));
      return;
    }
    applyPageOne(result.data.events, result.data.counters);
    setStatus('ready');
  }, [applyPageOne]);

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
        if (result.ok) applyPageOne(result.data.events, result.data.counters);
      })();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [status, applyPageOne]);

  // Only rotate while the band is actually on screen.
  useEffect(() => {
    if (status !== 'ready') return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [status]);

  // ...and while the tab is visible. A board rotating in a background tab is
  // pure battery cost for something nobody is looking at.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const canRotate =
    status === 'ready' && !reducedMotion && events.length > WINDOW_ROWS && onScreen && !paused;

  useEffect(() => {
    if (!canRotate) return;
    const timer = setInterval(() => setOffset((current) => current + 1), ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [canRotate]);

  // Seamless loop: the list is rendered with its first WINDOW_ROWS repeated at
  // the end, so position `events.length` looks identical to position 0. When we
  // land there, snap back with the transition switched off — the visitor sees
  // one continuous scroll rather than a rewind.
  useEffect(() => {
    if (offset === 0 || offset < events.length) return;
    const timer = setTimeout(() => {
      setAnimating(false);
      setOffset(0);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [offset, events.length]);

  useEffect(() => {
    if (animating) return;
    // Two frames: one to paint at the snapped position, one to re-arm.
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
    return () => cancelAnimationFrame(frame);
  }, [animating]);

  // Reset the rotation when the pool shrinks under us (a poll can drop rows).
  useEffect(() => {
    if (offset > events.length) setOffset(0);
  }, [events.length, offset]);

  const rendered = useMemo(() => {
    if (events.length === 0) return [];
    if (reducedMotion || events.length <= WINDOW_ROWS) return events.slice(0, WINDOW_ROWS);
    return [...events, ...events.slice(0, WINDOW_ROWS)];
  }, [events, reducedMotion]);

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

        {status === 'loading' && <LiveFeedSkeleton rows={WINDOW_ROWS} />}

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

            <div
              ref={viewportRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(document.hidden)}
              style={{
                position: 'relative',
                height: `calc(${ROW_HEIGHT} * ${WINDOW_ROWS})`,
                overflow: 'hidden',
                // Rows dissolve at the boundaries instead of being guillotined
                // by the container edge.
                maskImage:
                  'linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)',
              }}
            >
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  transform: `translate3d(0, calc(${ROW_HEIGHT} * -${offset}), 0)`,
                  transition: animating ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
                  willChange: 'transform',
                }}
              >
                {rendered.map((event, index) => (
                  <LiveFeedEventRow
                    // The tail repeats the head, so the key must carry the
                    // position too or React sees duplicates.
                    key={`${liveFeedEventKey(event)}-${index}`}
                    event={event}
                    fixedHeight={ROW_HEIGHT}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </Shell>
    </Band>
  );
}

export default LiveFeedSection;
