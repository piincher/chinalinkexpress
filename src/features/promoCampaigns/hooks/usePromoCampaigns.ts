'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getActivePromoCampaigns } from '../api';
import type { PromoCampaign } from '../types';

export function usePromoCampaigns() {
  const locale = useLocale();
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCampaigns() {
      try {
        const data = await getActivePromoCampaigns({
          platform: 'web',
          language: locale,
        });
        if (!cancelled) {
          setCampaigns(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load campaigns'));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCampaigns();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { campaigns, isLoading, error };
}
