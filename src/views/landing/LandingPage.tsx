/**
 * Landing Page — Hallmark Redesign
 *
 * Simplified section flow. Fewer sections, more breathing room.
 * Macrostructure: Marquee Hero
 */

'use client';

import React from 'react';
import { type Locale } from '@/i18n/config';
import StructuredData from '@/app/components/StructuredData';
import {
  HeroSection,
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

interface LandingPageProps {
  locale?: Locale;
}

export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
        <main>
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <AboutSection />
          <WhyUsSection />
          <TrustFlowSection />
          <ComparisonSection />
          <QuizSection />
          <VerifiedReviewsSection />
          <VideoTestimonialsSection />
          <TestimonialsSection />
          <PartnersSection />
          <FAQSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default LandingPage;
