/**
 * The commercial calendar, as a visitor reads it.
 *
 * The same payload the app's home screen renders (`GET /api/v2/public/occasions`),
 * and the same rule: **nothing here recomputes a deadline**. Which occasions
 * are visible, which lane is still open, how many days remain and what the
 * recommended cutoff is were all decided by the server. A cutoff worked out in
 * the browser from a clock we do not control is a cutoff nobody can be held to,
 * and the entire value of this feature is that the dates are trustworthy.
 *
 * Same shape as `publicReviewsApi`: a plain fetch, an abort timeout, and an
 * empty result rather than a throw — out of season the honest answer is no
 * occasions, and a marketing page must render without them rather than not at
 * all.
 *
 * Revalidated hourly. Deadlines move by the day, never by the minute, and a
 * page that hits the API on every request is a page that goes down when the
 * API does.
 */

import { API_CONFIG } from '@/config/api';

export type OccasionLaneMode = 'AIR' | 'SEA';

/**
 * Where a lane stands right now, decided server-side:
 *
 *   open     comfortably before the recommended cutoff
 *   urgency  inside the last week
 *   risky    past the recommended date, before the last plausible one
 *   closed   no honest way to promise arrival any more
 */
export type OccasionLaneState = 'open' | 'urgency' | 'risky' | 'closed';

export interface OccasionLane {
  mode: OccasionLaneMode;
  state: OccasionLaneState;
  recommendedCutoff: string;
  recommendedCutoffLabel: string | null;
  daysRemaining: number | null;
}

export interface CustomerOccasion {
  id: string;
  key: string;
  name: string;
  emoji: string;
  targetDate: string;
  targetDateLabel: string | null;
  /** `estimated` for Islamic and school dates until an admin confirms them. */
  dateConfidence: 'estimated' | 'confirmed';
  daysUntilTarget: number | null;
  purchaseStartDate: string | null;
  purchaseStartLabel: string | null;
  goodsSuggestions: string[];
  lanes: OccasionLane[];
  /** True when neither lane can still make the date. Say so; promise nothing. */
  allDeadlinesPassed: boolean;
  priority: 'critical' | 'high' | 'medium' | 'informational';
  eventType: 'commercial_mali' | 'operational_china' | 'special_campaign';
}

const TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 3600;

export async function fetchPublicOccasions(limit = 6): Promise<CustomerOccasion[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/occasions?limit=${limit}`, {
      method: 'GET',
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const json = await res.json();
    const occasions = json?.data?.occasions;
    return Array.isArray(occasions) ? (occasions as CustomerOccasion[]) : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * The lane a visitor should be told about first.
 *
 * Air and sea have different cutoffs for the same date, and a page with room
 * for one line should show the one that still helps: the most urgent lane that
 * is still open, or — when both have closed — the fact that they have.
 */
export function leadLane(occasion: CustomerOccasion): OccasionLane | null {
  const order: Record<OccasionLaneState, number> = { urgency: 0, risky: 1, open: 2, closed: 3 };
  const lanes = [...(occasion.lanes ?? [])].sort((a, b) => order[a.state] - order[b.state]);
  return lanes[0] ?? null;
}
