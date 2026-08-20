/**
 * Landing page — band rhythm.
 *
 * The problem this ordering solves: the page was seventeen sections that all
 * looked the same. White background, centred pill, centred heading, gradient
 * underline, three rounded cards. Nothing was emphasised because everything
 * was, and a reader arriving at section nine had no idea whether they were near
 * the beginning or the end.
 *
 * The fix is tonal rhythm rather than deletion. Sections alternate paper →
 * paper-2 → void, and the three `void` bands are placed at the moments the page
 * most wants remembered: the opening statement, the journey, and the close.
 * Everything between them is quiet on purpose, so those three land.
 *
 * Four sections were cut, because the page was telling one story four times:
 *
 *   TrustFlow            six numbered steps of "we handle everything", which is
 *                        the Journey section's four stages plus the Comparison
 *                        section's argument, in smaller type. It also embedded
 *                        its own second "Qui fait quoi" comparison table.
 *   Partners             a carrier logo wall, now the hero's proof bar.
 *   VerifiedReviews      a third rotation of customer quotes.
 *   SuccessStories       already unreferenced.
 *
 * Repetition is what actually reads as cheap here — more than any gradient did.
 * A confident supplier states a thing once and moves on; restating it four ways
 * is what a brochure does when it is not sure you believed it the first time.
 * The components remain in the codebase and are re-mountable in one line.
 *
 * Server component: the hero is async so it can render its copy and its LCP
 * photograph on the server. Interactive sections below stay client components
 * and are rendered as children, which is allowed and keeps the boundary at the
 * leaf rather than at the page.
 */

import React from 'react';
import { type Locale } from '@/i18n/config';
import StructuredData from '@/app/components/StructuredData';
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
} from './components';
import { ComparisonSection } from './components/ComparisonSection';
import { QuizSection } from './components/QuizSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AppPreviewSection } from './components/AppPreviewSection';
import { JourneySection } from './components/JourneySection';

interface LandingPageProps {
  locale?: Locale;
}

export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    <>
      <StructuredData />
      <div style={{ backgroundColor: 'var(--color-paper)' }}>
        <main>
          {/* ── I. the claim ─────────────────────────────────────────────── */}
          <HeroSection />

          {/* ── II. how it works ─────────────────────────────────────────── */}
          <SourcingSection />
          <StatsSection />
          <ServicesSection />

          {/* ── III. the journey — the page's centre of gravity ──────────── */}
          <JourneySection />

          {/* ── IV. the proof — the network, live ────────────────────────── */}
          <LiveFeedSection />

          {/* ── V. the argument ──────────────────────────────────────────── */}
          <WhyUsSection />
          <ComparisonSection />
          <AboutSection />
          <AppPreviewSection />

          {/* ── VI. other people's words ─────────────────────────────────── */}
          <TestimonialsSection />
          <VideoTestimonialsSection />

          {/* ── VII. the close ───────────────────────────────────────────── */}
          <QuizSection locale={locale} />
          <FAQSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default LandingPage;
