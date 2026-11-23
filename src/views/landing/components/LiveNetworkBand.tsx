'use client';

/**
 * Home-page "network right now" band (owner decision 2026-11-23): the live
 * counters only, without the 3D feed that LiveFeedSection carries. Fetched in
 * the browser because the home page is statically rendered; on any failure the
 * band is not shown rather than showing stale or zero figures.
 */

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, SectionHead } from '@/components/site';
import { fetchLiveFeed, type LiveFeedCounters as Counters } from '@/lib/liveFeedApi';
import { LiveFeedCounters } from './LiveFeedCounters';
import { SECTION_IDS } from '../constants';

export function LiveNetworkBand() {
  const t = useTranslations('home');
  const [counters, setCounters] = useState<Counters | null>(null);

  useEffect(() => {
    let alive = true;
    fetchLiveFeed(1).then((r) => {
      const c = r.ok ? r.data.counters : null;
      // All zeros means the feed is down, not that the network is idle.
      if (alive && c && (c.onTheWay || c.containersInTransit || c.receivedLast30d)) setCounters(c);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!counters) return null;

  return (
    <Band id={SECTION_IDS.LIVE_FEED} tone="void" className="tone-dark">
      <Shell>
        <SectionHead tone="void" title={t('networkTitle')} />
        <LiveFeedCounters counters={counters} />
      </Shell>
    </Band>
  );
}
