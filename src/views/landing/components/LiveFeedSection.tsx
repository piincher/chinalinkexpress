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
 * scrolled into view, so the band lengthened as the visitor scrolled and the
 * rest of the pitch kept receding. A marketing page is read top to bottom; a
 * section that grows while you scroll past it is a trap, not evidence.
 *
 * So the feed is a BOARD, not a list. It shows five records, holds a constant
 * height, and swaps the whole group for the next five on a timer — 1–5, then
 * 6–10, then 11–15 — looping back to the start at the end of the data.
 *
 *   allItems      every record already in memory (one fetch of page 1)
 *   currentIndex  which group of five is showing
 *   visibleItems  allItems.slice(start, start + GROUP_SIZE)
 *
 * Data: rotation is entirely client-side. One request returns 50 records,
 * which is ten groups; paging further just to animate would be network spent
 * on something the visitor never asked for. The existing 30-minute poll of
 * page 1 still refreshes the pool and merges by identity, so a parcel reaching
 * a new milestone joins the rotation instead of duplicating.
 *
 * Rotation pauses whenever nobody can act on it — tab hidden, band off-screen
 * — and whenever the visitor is reading it, on hover or keyboard focus, so a
 * group cannot swap out from under them.
 *
 * Reduced motion is not a slower rotation, it is no rotation: the board holds
 * the newest five still. Swapping content on a timer without animating it is
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
import { LiveFeedBackdrop } from './LiveFeedBackdrop';
import { LiveFeedRetryButton } from './LiveFeedRetryButton';
import { LiveFeedSkeleton } from './LiveFeedSkeleton';

const POLL_INTERVAL_MS = 30 * 60_000;
/** Records shown at once. */
const GROUP_SIZE = 5;
/** Every row occupies exactly this, so a group swap cannot shift the layout. */
const ROW_HEIGHT = '5.25rem';
/** Dwell time on a group — brisk enough that the board reads as moving. */
const ROTATE_INTERVAL_MS = 3_000;
/** Per-row entrance delay, so a group settles line by line. */
const ROW_STAGGER_MS = 70;

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

/**
 * Start offsets for each group of five.
 *
 * The final group is END-ALIGNED rather than short: with 12 records the starts
 * are 0, 5, 7 — so the last group shows records 8–12 instead of 11–12 plus
 * three empty rows. Groups may therefore overlap each other, but no record
 * appears twice WITHIN a group, and the board never renders a hole.
 */
const buildGroupStarts = (total: number): number[] => {
  if (total <= 0) return [];
  if (total <= GROUP_SIZE) return [0];
  const starts: number[] = [];
  for (let start = 0; start < total; start += GROUP_SIZE) {
    starts.push(Math.min(start, total - GROUP_SIZE));
  }
  // A tail shorter than GROUP_SIZE clamps onto the previous start; drop it.
  return Array.from(new Set(starts));
};

export function LiveFeedSection() {
  const t = useTranslations('liveFeed');
  const reducedMotion = usePrefersReducedMotion();

  const [status, setStatus] = useState<FeedStatus>('loading');
  const [allItems, setAllItems] = useState<LiveFeedEvent[]>([]);
  const [counters, setCounters] = useState<LiveFeedCountersData | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  const busyRef = useRef(false);
  const firstLoadStartedRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const applyPageOne = useCallback(
    (payloadEvents: LiveFeedEvent[], nextCounters: LiveFeedCountersData | null) => {
      if (nextCounters) setCounters(nextCounters);
      setAllItems((prev) => {
        const freshKeys = new Set(payloadEvents.map(liveFeedEventKey));
        return [...payloadEvents, ...prev.filter((event) => !freshKeys.has(liveFeedEventKey(event)))];
      });
    },
    []
  );

  const loadFirstPage = useCallback(async (isRetry = false) => {
    // StrictMode double-invokes effects in development; without this the first
    // paint fires two identical requests.
    if (!isRetry && firstLoadStartedRef.current) return;
    firstLoadStartedRef.current = true;
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
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const groupStarts = useMemo(() => buildGroupStarts(allItems.length), [allItems.length]);
  const groupCount = groupStarts.length;

  // Derived, never stored: a poll that shrinks the pool cannot leave the index
  // pointing past the end, so there is no out-of-range slice and no effect
  // needed to clamp it.
  const safeIndex = groupCount > 0 ? currentIndex % groupCount : 0;
  const visibleItems = useMemo(() => {
    if (groupCount === 0) return [];
    const start = groupStarts[safeIndex] ?? 0;
    return allItems.slice(start, start + GROUP_SIZE);
  }, [allItems, groupStarts, safeIndex, groupCount]);

  // Constant across rotations (groups are end-aligned), so reserving it keeps
  // the band's height fixed even while a poll is in flight.
  const reservedRows = Math.max(1, Math.min(GROUP_SIZE, allItems.length));

  const canRotate =
    status === 'ready' && !reducedMotion && groupCount > 1 && onScreen && !tabHidden && !hovered;

  // Deps are primitives that change only when the answer genuinely changes, so
  // an unrelated re-render never restarts the interval mid-dwell. The updater
  // is functional, so the callback cannot capture a stale index.
  useEffect(() => {
    if (!canRotate) return;
    const timer = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % groupCount);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [canRotate, groupCount]);

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

        {status === 'loading' && <LiveFeedSkeleton rows={GROUP_SIZE} rowHeight={ROW_HEIGHT} />}

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
                  void loadFirstPage(true);
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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              style={{
                position: 'relative',
                // Reserved whether or not the data fills it, so a short group
                // or a slow poll can never shift the page.
                minHeight: `calc(${ROW_HEIGHT} * ${reservedRows})`,
              }}
            >
              {/* The network, ambient, behind the records it produced. Runs
                  only while the board is on screen and the tab visible. */}
              <LiveFeedBackdrop active={!reducedMotion && onScreen && !tabHidden} />
              <ul
                // Remounting on the group index is what runs the entrance
                // animation; five nodes every few seconds is cheaper than
                // tracking enter/exit state by hand.
                key={safeIndex}
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {visibleItems.map((event, index) => (
                  <LiveFeedEventRow
                    key={liveFeedEventKey(event)}
                    event={event}
                    fixedHeight={ROW_HEIGHT}
                    enterDelayMs={reducedMotion ? undefined : index * ROW_STAGGER_MS}
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
