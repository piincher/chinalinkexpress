'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePromoCampaigns } from '../hooks/usePromoCampaigns';
import { usePromoCampaignTrack } from '../hooks/usePromoCampaignTrack';
import {
  loadDismissState,
  saveDismissState,
  shouldShowCampaign,
  recordImpression,
  recordDismissal,
} from '../lib/storage';
import { PromoModal } from './PromoModal';
import type { PromoCampaign, PromoCampaignDismissState } from '../types';

export function PromoModalProvider({ children }: { children: React.ReactNode }) {
  const { campaigns } = usePromoCampaigns();
  const trackEvent = usePromoCampaignTrack();
  const [dismissState, setDismissState] = useState<PromoCampaignDismissState | null>(null);
  const [sessionDismissedIds, setSessionDismissedIds] = useState<Set<string>>(new Set());
  const trackedImpressions = useRef<Set<string>>(new Set());

  useEffect(() => {
    setDismissState(loadDismissState());
  }, []);

  const activeCampaign = useMemo<PromoCampaign | null>(() => {
    if (!dismissState) return null;
    return (
      campaigns.find(
        (campaign) =>
          !sessionDismissedIds.has(campaign.id) && shouldShowCampaign(campaign, dismissState),
      ) || null
    );
  }, [campaigns, dismissState, sessionDismissedIds]);

  useEffect(() => {
    if (activeCampaign && !trackedImpressions.current.has(activeCampaign.id)) {
      trackEvent(activeCampaign.id, 'impression');
      trackedImpressions.current.add(activeCampaign.id);
      setDismissState((prev) => {
        if (!prev) return prev;
        const next = recordImpression(activeCampaign.id, prev);
        saveDismissState(next);
        return next;
      });
    }
  }, [activeCampaign, trackEvent]);

  const handleClose = () => {
    if (!activeCampaign || !dismissState) return;

    if (activeCampaign.dismissBehavior === 'SHOW_AGAIN_NEXT_LAUNCH') {
      setSessionDismissedIds((prev) => new Set(prev).add(activeCampaign.id));
    }

    const next = recordDismissal(activeCampaign.id, activeCampaign.dismissBehavior, dismissState);
    setDismissState(next);
    saveDismissState(next);
  };

  return (
    <>
      {children}
      {activeCampaign && (
        <PromoModal campaign={activeCampaign} onClose={handleClose} onEvent={trackEvent} />
      )}
    </>
  );
}
