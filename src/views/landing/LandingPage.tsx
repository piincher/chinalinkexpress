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
  AboutSection,
  ServicesSection,
  WhyUsSection,
  TestimonialsSection,
  PartnersSection,
  FAQSection,
  ContactSection,
} from './components';

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
          <StatsSection />
          <AboutSection />
          <ServicesSection />
          <WhyUsSection />
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
