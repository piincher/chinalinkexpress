import type { PromoCampaignDismissState } from '../types';

const STORAGE_KEY = 'chinalink-promo-campaign-dismissals';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadDismissState(): PromoCampaignDismissState {
  if (!isBrowser()) {
    return { dismissedCampaignIds: [], campaignImpressions: {}, hideUntil: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { dismissedCampaignIds: [], campaignImpressions: {}, hideUntil: {} };
    }
    const parsed = JSON.parse(raw) as PromoCampaignDismissState;
    return {
      dismissedCampaignIds: parsed.dismissedCampaignIds || [],
      campaignImpressions: parsed.campaignImpressions || {},
      hideUntil: parsed.hideUntil || {},
    };
  } catch {
    return { dismissedCampaignIds: [], campaignImpressions: {}, hideUntil: {} };
  }
}

export function saveDismissState(state: PromoCampaignDismissState): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silent failure — promo campaigns are non-critical.
  }
}

export function shouldShowCampaign(
  campaign: { id: string; dismissBehavior: 'SHOW_AGAIN_NEXT_LAUNCH' | 'HIDE_FOR_24H' | 'NEVER_SHOW_AGAIN'; maxImpressionsPerUser: number | null },
  state: PromoCampaignDismissState
): boolean {
  const now = Date.now();
  if (state.hideUntil[campaign.id] && state.hideUntil[campaign.id] > now) {
    return false;
  }

  if (campaign.dismissBehavior === 'NEVER_SHOW_AGAIN' && state.dismissedCampaignIds.includes(campaign.id)) {
    return false;
  }

  const impressions = state.campaignImpressions[campaign.id] || 0;
  if (campaign.maxImpressionsPerUser && impressions >= campaign.maxImpressionsPerUser) {
    return false;
  }

  return true;
}

export function recordImpression(campaignId: string, state: PromoCampaignDismissState): PromoCampaignDismissState {
  return {
    ...state,
    campaignImpressions: {
      ...state.campaignImpressions,
      [campaignId]: (state.campaignImpressions[campaignId] || 0) + 1,
    },
  };
}

export function recordDismissal(
  campaignId: string,
  behavior: 'SHOW_AGAIN_NEXT_LAUNCH' | 'HIDE_FOR_24H' | 'NEVER_SHOW_AGAIN',
  state: PromoCampaignDismissState
): PromoCampaignDismissState {
  const next = { ...state };

  if (behavior === 'NEVER_SHOW_AGAIN') {
    if (!next.dismissedCampaignIds.includes(campaignId)) {
      next.dismissedCampaignIds = [...next.dismissedCampaignIds, campaignId];
    }
  } else if (behavior === 'HIDE_FOR_24H') {
    next.hideUntil = { ...next.hideUntil, [campaignId]: Date.now() + ONE_DAY_MS };
  }

  return next;
}
