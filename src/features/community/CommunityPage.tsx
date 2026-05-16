/**
 * ChinaLink Community Page
 *
 * Composes all community sections:
 * Hero → WhatsAppCTA → TopicList → SuccessStories → CommunityGuidelines
 */

'use client';

import {
  CommunityHero,
  WhatsAppCTA,
  TopicList,
  SuccessStories,
  CommunityGuidelines,
} from './components';

export function CommunityPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <CommunityHero />
      <WhatsAppCTA />
      <TopicList />
      <SuccessStories />
      <CommunityGuidelines />
    </main>
  );
}
