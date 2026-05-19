import { SharedShipmentResult } from '@/app/s/[token]/types';

export type ShareError = 'not_found' | 'revoked' | 'rate_limited' | 'api_error';

export interface ShareApiResponse {
  data?: SharedShipmentResult;
  error?: ShareError;
}

export async function fetchSharedShipment(token: string): Promise<ShareApiResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.chinalinkexpress.com';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${API_BASE_URL}/api/v2/public/share/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.status === 404) return { error: 'not_found' };
    if (res.status === 410) return { error: 'revoked' };
    if (res.status === 429) return { error: 'rate_limited' };
    if (!res.ok) return { error: 'api_error' };
    const json = await res.json();
    return { data: json.data as SharedShipmentResult };
  } catch {
    return { error: 'api_error' };
  }
}
