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
import { AppPreviewSection } from './components/AppPreviewSection';
import { Marquee } from '@/components/animations/Marquee';

interface LandingPageProps {
  locale?: Locale;
}

function TrustMarquee() {
  const items = [
    'Fret Maritime',
    'Fret Aérien',
    'Sourcing',
    'Paiement Fournisseur',
    'Suivi 24/7',
    'Livraison Porte à Porte',
  ];

  return (
    <div
      className="py-6"
      style={{
        backgroundColor: 'var(--color-paper-2)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <Marquee speed={32} pauseOnHover>
        {items.map((item) => (
          <span
            key={item}
            className="text-sm font-medium uppercase tracking-widest whitespace-nowrap"
            style={{ color: 'var(--color-neutral)' }}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
        <main>
          <HeroSection />
          <TrustMarquee />
          <StatsSection />
          <ServicesSection />
          <AboutSection />
          <WhyUsSection />
          <AppPreviewSection />
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
