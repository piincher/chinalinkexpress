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
  StatsSection,
  ServicesSection,
  AboutSection,
  WhyUsSection,
  FAQSection,
  ContactSection,
  LiveFeedSection,
  FinalCtaSection,
} from './components';
import { QuizSection } from './components/QuizSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';
import { TestimonialsBand } from './components/TestimonialsBand';
import { AppPreviewSection } from './components/AppPreviewSection';
import { JourneySection } from './components/JourneySection';

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
      {/* ── I. the promise ───────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── II. what this company is, in one screen ──────────────────────── */}
      <SourcingSection />

      {/* ── III. the proof, immediately ──────────────────────────────────── */}
      <AppPreviewSection />

      {/* ── IV. how it actually works — the page's centre of gravity ─────── */}
      <JourneySection />

      {/* ── V. the network, live ─────────────────────────────────────────── */}
      <LiveFeedSection />

      {/* ── VI. what we take on ──────────────────────────────────────────── */}
      <ServicesSection />

      {/* ── VII. the figures, once there is something to count ───────────── */}
      <StatsSection />

      {/* ── VIII. the argument ─────────────────────────────────────────────
          ComparisonSection is no longer mounted. Its seven-row "ChinaLink vs
          les autres" table restated the services index directly above it —
          which now covers the same before / in-China / to-Bamako span in nine
          rows — and then restated the four points beside it in WhyUs. Three
          tellings of one argument is what actually reads as unconvincing, and
          it cost ~1,800px on a phone.

          Nothing is lost: /pourquoi-nous renders the full comparison from the
          same `comparison` message namespace, and WhyUs now links to it. That
          page previously had no inbound link from anywhere on the site. The
          component is still in the tree and re-mounts in one line. */}
      <WhyUsSection />
      <AboutSection />

      {/* ── IX. other people's words ───────────────────────────────────────
          TestimonialsBand is async: it fetches the real reviews clients wrote
          in the app and renders them above the WhatsApp quotes, with the
          rating from the collection stated beside the heading. */}
      <TestimonialsBand />
      <VideoTestimonialsSection />

      {/* ── X. the close ─────────────────────────────────────────────────── */}
      <QuizSection locale={locale} />
      <FAQSection />
      <FinalCtaSection />
      <ContactSection />
    </div>
  );
}

export default LandingPage;
