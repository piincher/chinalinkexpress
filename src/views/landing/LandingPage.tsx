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
  AboutSection,
  ServicesSection,
  WhyUsSection,
  TestimonialsSection,
  PartnersSection,
  FAQSection,
  ContactSection,
} from './components';

// Live Features
import { LiveShipmentFeed } from '@/features/live-feed';
import { DeliveryCountdown } from '@/features/countdown';
import { 
  TrustBadges, 
  ActivityTicker, 
  SocialProofBanner, 
  RecentActivityToast 
} from '@/features/social-proof';
import { TrackingTimeline, TrackingCard } from '@/features/tracking';
import { TrendingRoutesMap } from '@/features/routes-map';
import { 
  QuickQuoteButton, 
  QuickQuoteButtonCompact, 
  QuickQuoteButtonInline,
  QuickQuotePopup 
} from '@/features/quick-quote';

interface LandingPageProps {
  locale?: Locale;
}

/**
 * Landing Page Component
 * 
 * Composes all landing page sections into a cohesive page.
 * Includes ALL live features:
 * - Live Shipment Feed
 * - Delivery Countdown (Full + Compact)
 * - Social Proof (Trust Badges, Activity Ticker, Banner, Toast)
 * - Tracking Timeline (Full + Compact)
 * - Trending Routes Map
 * - Quick Quote (All variants + Popup)
 * 
 * Note: Navbar and Footer are provided by the root layout.
 */
export function LandingPage({ locale = 'fr' }: LandingPageProps) {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* 1. Live Shipment Feed - Full Component */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto">
              <LiveShipmentFeed />
            </div>
          </section>
          
          {/* 2. Delivery Countdown - Full + Compact Variants */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Suivi de Livraison en Temps Réel
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Suivez vos colis à chaque étape avec notre système de compte à rebours précis
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Full Variant */}
                <DeliveryCountdown trackingNumber="CLE-2024-001" variant="full" />
                {/* Compact Variant */}
                <DeliveryCountdown trackingNumber="CLE-2024-003" variant="compact" />
              </div>
            </div>
          </section>
          
          {/* 3. Social Proof - Trust Badges + Activity Ticker + Banner */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Trust Badges */}
              <div>
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
                  Pourquoi Nos Clients Nous Font Confiance
                </h2>
                <TrustBadges variant="grid" />
              </div>
              
              {/* Activity Ticker */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Activité en Direct
                </h3>
                <ActivityTicker variant="horizontal" />
              </div>
              
              {/* Social Proof Banner */}
              <div className="relative h-20">
                <SocialProofBanner position="bottom" />
              </div>
            </div>
          </section>
          
          {/* Toast Notifications */}
          <RecentActivityToast />
          
          <AboutSection />
          <ServicesSection />
          
          {/* 4. Tracking Timeline - Full + Compact */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Chronologie de Livraison
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Visualisez chaque étape du parcours de votre colis
                </p>
              </div>
              
              {/* Full Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Vue Complète
                </h3>
                <TrackingTimeline trackingNumber="CLE-AIR-2026-001" />
              </div>
              
              {/* Compact Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Vue Compacte
                </h3>
                <div className="max-w-md mx-auto">
                  <TrackingCard trackingNumber="CLE-AIR-2026-002" />
                </div>
              </div>
            </div>
          </section>
          
          {/* 5. Trending Routes Map - Full Interactive Map */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Routes Populaires
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Découvrez nos routes les plus demandées entre la Chine et l'Afrique
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <TrendingRoutesMap />
              </div>
            </div>
          </section>
          
          <WhyUsSection />
          <TestimonialsSection />
          <PartnersSection />
          <FAQSection />
          
          {/* 6. Quick Quote - All 3 Button Variants */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Devis Express
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Obtenez un devis instantané en quelques clics
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <div className="text-center">
                  <QuickQuoteButton showLabel={true} />
                  <span className="text-sm text-slate-500 mt-2 block">Par défaut</span>
                </div>
                <div className="text-center">
                  <QuickQuoteButtonCompact />
                  <span className="text-sm text-slate-500 mt-2 block">Compact</span>
                </div>
                <div className="text-center">
                  <QuickQuoteButtonInline />
                  <span className="text-sm text-slate-500 mt-2 block">Inline</span>
                </div>
              </div>
            </div>
          </section>
          
          <ContactSection />
        </main>
        
        {/* Quick Quote Popup (always available) */}
        <QuickQuotePopup />
        
        {/* Floating Quick Quote Button (always visible) */}
        <QuickQuoteButton />
      </div>
    </>
  );
}

export default LandingPage;
