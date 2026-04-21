/**
 * ChinaLink Community Page
 *
 * Composes all community sections: Hero → Benefits → Topics → Testimonials → WhatsAppCTA
 */

'use client';

import {
  CommunityHero,
  CommunityBenefits,
  CommunityTopics,
  MemberTestimonials,
  WhatsAppJoinCTA,
} from './components';

export function CommunityPage() {
  return (
    <main className="min-h-screen">
      <CommunityHero />
      <CommunityBenefits />
      <CommunityTopics />
      <MemberTestimonials />
      <WhatsAppJoinCTA />
    </main>
  );
}
