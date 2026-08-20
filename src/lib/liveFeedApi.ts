/**
 * Live feed API — the public activity stream behind the landing page's
 * "En direct" section.
 *
 * Same contract as shareApi: a plain fetch, `no-store`, an 8s abort timeout,
 * and a discriminated-union result so the caller never has to catch. The
 * endpoint is public and returns masked references only — nothing here needs
 * auth headers or credentials.
 *
 * One defensive detail: the backend's responseHelper puts pagination at the
 * top level of the response body, but paginated payloads elsewhere in the
 * stack have shipped it nested inside `data`. Both locations are read, so a
 * backend convention change cannot silently break infinite scroll.
 */

import { API_CONFIG } from '@/config/api';

export type LiveFeedMode = 'AIR' | 'SEA';

export type LiveFeedStatus =
  | 'RECEIVED_AT_WAREHOUSE'
  | 'PACKED'
  | 'ASSIGNED_TO_CONTAINER'
  | 'LOADED_IN_CONTAINER'
  | 'IN_TRANSIT'
  | 'ARRIVED_DESTINATION'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

export interface LiveFeedEvent {
  type: string;
  ref: string;
  client: string | null;
  mode: LiveFeedMode;
  status: LiveFeedStatus;
  route: string;
  occurredAt: string;
}

export interface LiveFeedCounters {
  onTheWay: number;
  onTheWayAir: number;
  onTheWaySea: number;
  deliveredTotal: number;
  receivedLast30d: number;
  containersInTransit: number;
  airInTransit: number;
}

export interface LiveFeedPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LiveFeedPayload {
  events: LiveFeedEvent[];
  /** Present on page 1 only. */
  counters: LiveFeedCounters | null;
  pagination: LiveFeedPagination | null;
}

export type LiveFeedError = 'network' | 'server' | 'timeout';

export type LiveFeedResult =
  | { ok: true; data: LiveFeedPayload }
  | { ok: false; error: LiveFeedError };

export const LIVE_FEED_PAGE_SIZE = 20;
const TIMEOUT_MS = 8000;

export async function fetchLiveFeed(page: number): Promise<LiveFeedResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `${API_CONFIG.BASE_URL}/api/v2/public/live-feed?page=${page}&limit=${LIVE_FEED_PAGE_SIZE}`,
      { method: 'GET', cache: 'no-store', signal: controller.signal }
    );
    if (!res.ok) return { ok: false, error: 'server' };

    const json = await res.json();
    const data = json?.data ?? {};
    const pagination = (json?.pagination ?? data?.pagination ?? null) as LiveFeedPagination | null;

    return {
      ok: true,
      data: {
        events: Array.isArray(data.events) ? (data.events as LiveFeedEvent[]) : [],
        counters: (data.counters ?? null) as LiveFeedCounters | null,
        pagination,
      },
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { ok: false, error: 'timeout' };
    }
    return { ok: false, error: 'network' };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Identity of a feed event for dedupe. A goods item re-enters the feed when
 * its status changes, so the status and timestamp are part of the key — the
 * same ref must be allowed to appear once per milestone, never twice.
 */
export function liveFeedEventKey(event: LiveFeedEvent): string {
  return `${event.ref}|${event.status}|${event.occurredAt}`;
}
