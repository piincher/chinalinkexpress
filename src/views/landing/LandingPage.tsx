/**
 * Landing Page
 * 
 * Main landing page component that composes all sections.
 * Entry point for the landing page feature.
 * Note: Header and Footer are now provided by the root layout.
 */

'use client';

import React from 'react';
import { type Locale } from '@/i18n/config';
import StructuredData from '@/app/components/StructuredData';
import {
  HeroSection,
  StatsSection,
  QuizSection,
  AboutSection,
  ComparisonSection,
  ServicesSection,
  WhyUsSection,
  TestimonialsSection,
  SuccessStoriesSection,
  PartnersSection,
  FAQSection,
  ContactSection,
} from './components';
import { SplitPaymentBanner } from '@/features/trust/components/SplitPaymentBanner';
import { DamageGuaranteeSection } from '@/features/trust/components';
import { TrustFlowSection } from '@/features/trust/components/TrustFlowSection';
import { CommunityPromoSection } from '@/features/community/components/CommunityPromoSection';
import { WhatsAppPhotoUpdates } from '@/features/trust/components/WhatsAppPhotoUpdates';
import { VerifiedReviewsSection } from '@/features/reviews/components/VerifiedReviewsSection';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';

interface LandingPageProps {
  locale?: Locale;
}

/**
 * Landing Page Component
 * 
 * Composes all landing page sections into a cohesive page.
 * Note: Navbar and Footer are provided by the root layout.
 */
export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <main>
          <HeroSection />
          <TrustFlowSection />
          <WhatsAppPhotoUpdates />
          <AboutSection />
          <ServicesSection />
          <DamageGuaranteeSection />
          <ComparisonSection />
          <QuizSection />
          <WhyUsSection />
          <StatsSection />
          <VerifiedReviewsSection />
          <VideoTestimonialsSection />
          <SplitPaymentBanner />
          <TestimonialsSection />
          <SuccessStoriesSection />
          <CommunityPromoSection />
          <PartnersSection />
          <FAQSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default LandingPage;
