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
 * No section was removed — every feature the site had, it still has. Four of
 * them are arguably redundant (see the note in the README of this folder) but
 * cutting content is the owner's call, not the redesign's.
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
} from './components';
import { TrustFlowSection } from '@/features/trust/components/TrustFlowSection';
import { ComparisonSection } from './components/ComparisonSection';
import { QuizSection } from './components/QuizSection';
import { VerifiedReviewsSection } from '@/features/reviews/components/VerifiedReviewsSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
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

          {/* ── IV. the argument ─────────────────────────────────────────── */}
          <WhyUsSection />
          <ComparisonSection />
          <AboutSection />
          <AppPreviewSection />
          <TrustFlowSection />

          {/* ── V. other people's words ──────────────────────────────────── */}
          <VerifiedReviewsSection />
          <TestimonialsSection />
          <VideoTestimonialsSection />
          <PartnersSection />

          {/* ── VI. the close ────────────────────────────────────────────── */}
          <QuizSection locale={locale} />
          <FAQSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default LandingPage;
