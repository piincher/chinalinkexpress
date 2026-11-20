/**
 * Landing page — one argument, told in order.
 *
 * The previous ordering solved a real problem (seventeen identical white
 * sections with no rhythm) by alternating tone — paper → paper-2 → void — and
 * cutting four duplicated sections. That work stands: the bands still
 * alternate, the three `void` bands still mark the opening, the centre and the
 * close, and TrustFlow / Partners / VerifiedReviews / SuccessStories are still
 * unmounted as restatements of Journey, the services index and the hero's
 * carrier bar. Comparison joins them, for the same reason — see section VIII.
 *
 * What it did not solve is the *sequence of the argument*. The page opened with
 * a claim, then made that claim four more ways — sourcing strip, figures,
 * services index, journey, live feed, "why us", comparison table, about — and
 * only then, tenth, showed the product that makes the claim true. A reader
 * deciding whether to trust a company with goods sitting in a Guangzhou
 * warehouse does not need the fifth argument; they need the first piece of
 * evidence, early.
 *
 * So the spine is now: promise → what we are → proof → how it works → the
 * network live → what we handle → the figures → the argument → other people →
 * the close.
 *
 * The one structural move that matters: AppPreview goes from tenth to third.
 * The hero promises "vous ne perdez pas leur trace"; three screens later the
 * page shows the status sequence, in the operation's own vocabulary, and links
 * to the app in the stores. Everything after that is elaboration on something
 * already demonstrated rather than a claim still waiting to be paid for.
 *
 * Two smaller changes:
 *
 *   · The stats band moved down, from third to seventh. Numbers are an argument
 *     for someone already interested, and they mean more after the reader has
 *     seen what is being counted than before.
 *   · A FinalCtaSection now precedes the contact form, so the page ends on a
 *     reason and an action rather than on a text field.
 *
 * Server component. The hero is async so its copy renders on the server;
 * interactive sections below stay client components and are passed as children,
 * which keeps the boundary at the leaf rather than at the page.
 */

import React from 'react';
import { type Locale } from '@/i18n/config';
import {
  HeroSection,
  SourcingSection,
  ServicesSection,
  AboutSection,
  WhyUsSection,
  FAQSection,
  ContactSection,
  FinalCtaSection,
} from './components';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';
import { TestimonialsBand } from './components/TestimonialsBand';
import { LiveStatsSection } from './components/LiveStatsSection';
import { OccasionsHomeBand } from './components/OccasionsHomeBand';
import { AppPreviewSection } from './components/AppPreviewSection';
import { JourneySection } from './components/JourneySection';
import { ProofSection } from './components/ProofSection';
import { RouteChip } from './components/RouteChip';
import { ShippingMarkExampleSection } from './components/ShippingMarkExampleSection';

interface LandingPageProps {
  locale?: Locale;
}

export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    /*
     * No <main> and no <StructuredData> here. Both were duplicates:
     *
     *   <main>   [locale]/layout.tsx already wraps every page's children in
     *            one, so this produced two `main` landmarks in the document.
     *            A screen reader offers "skip to main content" twice and
     *            neither is authoritative.
     *
     *   schema   page.tsx renders <HomeStructuredData>, which emits
     *            Organization + LocalBusiness + WebSite + Service as one graph.
     *            This component additionally rendered the older
     *            app/components/StructuredData with type="all", emitting a
     *            *second* Organization and a *second* LocalBusiness from a
     *            different config file, disagreeing on @id and address. For a
     *            brand already being confused with similarly-named companies in
     *            search results, publishing two versions of itself was the last
     *            thing the page could afford.
     */
    <div style={{ backgroundColor: 'var(--color-paper)' }}>
      {/* ── 0. the season ──────────────────────────────────────────────────
          The accent override now lives in the locale layout, so the campaign
          dresses every page rather than the homepage alone — the app skins the
          whole app, and a visitor who lands on a guide and clicks through to
          here should not watch the brand colour change under them. The ambient
          effect stays in the hero (SeasonalAtmosphere): it is a decoration for
          one full-bleed photo, not for a blog post. */}

      {/* ── I. the promise ───────────────────────────────────────────────── */}
      <RouteChip />
      <HeroSection />

      {/*
        Order since the 2026-11-20 audit: what we do → how → proof → other people
        → services → figures → tracking → the close. On a phone the page was 34
        screens with the reviews 15th of 17 sections. Removed from the home page:
        the 3D live feed (heaviest script on the page), the container fill, the
        tagline band and the quiz (still at /quiz; its block hard-coded an old
        client count). Reviews moved up to sit right after the photo proof.
      */}
      <SourcingSection />
      <JourneySection />
      <ProofSection />

      {/* Real reviews from the app plus the WhatsApp quotes; the rating is stated with its count. */}
      <TestimonialsBand />
      <VideoTestimonialsSection />

      <ServicesSection />
      <LiveStatsSection />
      <AppPreviewSection />
      <ShippingMarkExampleSection />
      <OccasionsHomeBand />

      <WhyUsSection />
      <AboutSection />

      <FAQSection />
      <FinalCtaSection />
      <ContactSection />

    </div>
  );
}

export default LandingPage;
