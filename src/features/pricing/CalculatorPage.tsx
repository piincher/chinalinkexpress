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
import { ClientReviewsBand } from '@/features/reviews/components/ClientReviewsBand';
import type { PublicReview, PublicReviewStats } from '@/lib/publicReviewsApi';

interface CalculatorPageProps {
  /**
   * Real reviews, fetched by the route (a server component) and passed in.
   * Absent means the API was unreachable — the band renders nothing.
   */
  reviews?: PublicReview[];
  reviewStats?: PublicReviewStats;
}

export function CalculatorPage({ reviews = [], reviewStats }: CalculatorPageProps = {}) {
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
        Where `VerifiedReviewsSection` used to be. That component rendered a 4.8
        average "Basé sur 312 avis clients vérifiés", Google/Trustpilot source
        badges and a carousel of twelve invented reviews, each flagged
        `verified: true` with a relative date that made them look freshly
        collected. It was unmounted in 2026-08 and its data file has since been
        deleted. What stands here now is the `reviews` collection itself, via
        GET /api/v2/public/reviews — the data source that note was waiting for.
      */}
      {reviewStats && (
        <ClientReviewsBand reviews={reviews} stats={reviewStats} tone="paper-2" />
      )}
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
