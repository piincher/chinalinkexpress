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
  ServicesSection,
  AboutSection,
  FinalCtaSection,
} from './components';
import { TestimonialsBand } from './components/TestimonialsBand';
import { HowItWorksSection } from './components/HowItWorksSection';

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

      {/*
        2026-11-23, after a visitor said the page was too crowded and never said
        who we are (prod was 18 sections, 30 phone screens; "Qui nous sommes" was
        screen 22). Owner decisions: one action (WhatsApp), who-we-are first, each
        idea told once. Off the home page now: the pinned journey (same story as
        Sourcing), the second stats block, video testimonials (/avis), the
        shipping-mark example (/services), the seasons band (/calendrier), why-us,
        the contact form (/contact) and the route chip.
        Second pass, same day: photo proof + live numbers move to a future
        /application page, FAQ to /faq (linked under the reviews); Sourcing is
        replaced by a 4-step « Comment ça marche » matching the hero icons.
      */}
      <HeroSection />
      <AboutSection />
      <ServicesSection compact />
      <HowItWorksSection />
      <TestimonialsBand />
      <FinalCtaSection />
    </div>
  );
}

export default LandingPage;
