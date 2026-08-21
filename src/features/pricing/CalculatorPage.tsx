/**
 * Calculator Page
 *
 * Main calculator page with interactive freight calculators.
 * Part of the pricing feature.
 */

'use client';

import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/site';
import { CalculatorCard } from './components/CalculatorCard';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { PricingFAQ } from './components/PricingFAQ';
import { WeightPolicy } from './components/WeightPolicy';
import { SplitPaymentBanner } from '@/features/trust/components/SplitPaymentBanner';
import { DamageGuaranteeSection } from '@/features/trust/components';
import { TrustFlowSection } from '@/features/trust/components/TrustFlowSection';
import { WhatsAppPhotoUpdates } from '@/features/trust/components/WhatsAppPhotoUpdates';
import { VideoTestimonialsSection } from '@/features/reviews/components/VideoTestimonialsSection';

export function CalculatorPage() {
  const t = useTranslations('pricing');

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <PageHero title={t('calculatorPage.title')} lede={t('calculatorPage.subtitle')} />

      <TrustFlowSection />

      <WhatsAppPhotoUpdates />

      {/* Calculator Card */}
      <CalculatorCard />

      {/* Rounding + the 5% handling coefficient, stated right under the
          estimate. Disclosure only — the estimate itself is unchanged. */}
      <WeightPolicy />

      {/* Split Payment Banner */}
      <SplitPaymentBanner />

      {/*
        `VerifiedReviewsSection` is no longer mounted here.
        It rendered a 4.8 average "Basé sur 312 avis clients vérifiés", source
        badges, and a rotating carousel of eight reviews from
        features/reviews/data/reviews.ts — every one of them invented, each
        flagged `verified: true`, each with a relative date ("il y a 2
        semaines") that made them look freshly collected, and two of them
        carrying specific loss-avoided figures (2 000 € of fabric, a 16-day
        delivery). The production database holds two reviews.
        The real ones are on the home page, and the video section below shows
        the two clients who genuinely filmed something. The component and its
        data file are left in the tree so that whoever wires this up to the
        `reviews` collection has the UI ready — it needs a data source, not a
        rewrite.
      */}
      <VideoTestimonialsSection />

      {/* Navigation to Pricing */}
      <div className="py-8">
        <NavigationButton variant="calculator-to-pricing" />
      </div>

      {/* Additional Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProhibitedItems />
        <DamageGuaranteeSection />
        <PricingFAQ />
      </div>
    </main>
  );
}
