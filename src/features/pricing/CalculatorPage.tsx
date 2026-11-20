/**
 * Calculator Page
 *
 * Main calculator page with interactive freight calculators.
 * Part of the pricing feature.
 *
 * The calculator comes straight after the title: on a phone its first field used
 * to sit 4 859 px down, behind two marketing blocks (audit 2026-11-20). Those
 * blocks, a damage "guarantee" and a "pay on delivery, zero risk" banner were
 * removed — they promised door delivery, refunds and live location sharing that
 * the CGV and operations do not offer.
 */

'use client';

import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/site';
import { CalculatorCard } from './components/CalculatorCard';
import { NavigationButton } from './components/NavigationButton';
import { ProhibitedItems } from './components/ProhibitedItems';
import { PricingFAQ } from './components/PricingFAQ';
import { WeightPolicy } from './components/WeightPolicy';
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

      <CalculatorCard />

      {/* Rounding + the 5% handling coefficient, stated right under the
          estimate. Disclosure only — the estimate itself is unchanged. */}
      <WeightPolicy />

      {/* Real reviews from GET /api/v2/public/reviews; nothing renders if the API is down. */}
      {reviewStats && (
        <ClientReviewsBand reviews={reviews} stats={reviewStats} tone="paper-2" />
      )}
      <VideoTestimonialsSection />

      <div className="py-8">
        <NavigationButton variant="calculator-to-pricing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProhibitedItems />
        <PricingFAQ />
      </div>
    </main>
  );
}
