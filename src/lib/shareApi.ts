import { cache } from 'react';
import { SharedShipmentResult } from '@/app/s/[token]/types';

export type ShareError = 'not_found' | 'revoked' | 'rate_limited' | 'api_error';

export interface ShareApiResponse {
  data?: SharedShipmentResult;
  error?: ShareError;
}

const TOKEN_REGEX = /^[a-zA-Z0-9_-]{4,128}$/;

export const fetchSharedShipment = cache(async (token: string): Promise<ShareApiResponse> => {
  if (!TOKEN_REGEX.test(token)) {
    return { error: 'not_found' };
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.chinalinkexpress.com';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE_URL}/api/v2/public/share/${encodeURIComponent(token)}`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (res.status === 404) return { error: 'not_found' };
    if (res.status === 410) return { error: 'revoked' };
    if (res.status === 429) return { error: 'rate_limited' };
    if (!res.ok) return { error: 'api_error' };
    const json = await res.json();
    return { data: json.data as SharedShipmentResult };
  } catch {
    return { error: 'api_error' };
  } finally {
    clearTimeout(timeout);
  }
});
