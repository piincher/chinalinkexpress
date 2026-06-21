'use client';

import { trackPromoCampaignEvent } from '../api';
import type { PromoCampaignEventType } from '../types';

export function usePromoCampaignTrack() {
  return async (campaignId: string, eventType: PromoCampaignEventType, slideIndex?: number) => {
    try {
      await trackPromoCampaignEvent(campaignId, { eventType, slideIndex });
    } catch {
      // Silent failure — analytics are best-effort.
    }
  };
}
