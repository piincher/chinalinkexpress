import { apiClient } from '@/api/client';
import type { PromoCampaign, PromoCampaignEventType } from './types';

export interface ActivePromoCampaignsParams {
  platform?: 'ios' | 'android' | 'web';
  country?: string;
  language?: string;
  appVersion?: string;
}

export interface TrackPromoCampaignEventInput {
  eventType: PromoCampaignEventType;
  slideIndex?: number;
  metadata?: Record<string, unknown>;
}

export interface ActivePromoCampaignsResponse {
  success: boolean;
  data: PromoCampaign[];
}

export async function getActivePromoCampaigns(params?: ActivePromoCampaignsParams): Promise<PromoCampaign[]> {
  const query = new URLSearchParams({ platform: 'web' });
  if (params?.language) query.set('language', params.language);
  if (params?.country) query.set('country', params.country);
  if (params?.appVersion) query.set('appVersion', params.appVersion);

  const queryString = query.toString();
  const endpoint = `/promo-campaigns/active${queryString ? `?${queryString}` : ''}`;
  const response = await apiClient.get<ActivePromoCampaignsResponse>(endpoint);
  return response.data?.data ?? [];
}

export async function trackPromoCampaignEvent(
  campaignId: string,
  input: TrackPromoCampaignEventInput
): Promise<void> {
  await apiClient.post(`/promo-campaigns/${campaignId}/track`, input);
}
