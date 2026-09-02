'use client';

/**
 * /avis — every review clients have written, in one place.
 *
 * The home page shows three of them beside the WhatsApp quotes; this page is
 * where "voir tous les avis" actually lands. Before this it pointed at
 * `#contact`, which is the kind of link that teaches a reader the social proof
 * is decoration.
 *
 * Two sections, kept apart on purpose. Reviews written in the app were left by
 * a signed-in client against a delivered shipment and answered by the team;
 * the WhatsApp quotes are messages the owner received. Both are real, they are
 * not the same kind of evidence, and a reader can tell which is which.
 *
 * The rating is stated once, at the top, from `stats` — every ACTIVE review,
 * including the ones left as a bare rating. When the collection is empty this
 * page says so rather than showing a zero.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell, PageHero } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { ReviewFigure } from './components/ReviewFigure';
import { RatingSummary } from './components/RatingSummary';
import {
  formatReviewDate,
  type PublicReview,
  type PublicReviewStats,
} from '@/lib/publicReviewsApi';
import { TESTIMONIALS } from '@/views/landing/constants';

const GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};

interface ReviewsPageProps {
  reviews: PublicReview[];
  stats: PublicReviewStats;
}

export function ReviewsPage({ reviews, stats }: ReviewsPageProps) {
  const t = useTranslations('reviews');
  const locale = useLocale();

  return (
    <>
      <PageHero
        eyebrow={t('pageEyebrow')}
        title={t('pageTitle')}
        lede={t('pageLede')}
      />

      {stats.totalReviews > 0 && (
        <Band tone="paper-2">
          <Shell>
            <RatingSummary
              averageRating={stats.averageRating}
              totalReviews={stats.totalReviews}
              countLabel={t('countLabel', { count: stats.totalReviews })}
            />
          </Shell>
        </Band>
      )}

      <Band tone="paper">
        <Shell>
          <SectionHead title={t('appSectionTitle')} lede={t('howTo')} />

          {reviews.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--color-ink-2)',
                margin: 0,
              }}
            >
              {t('pageEmpty')}
            </p>
          ) : (
            <RevealGroup stagger={0.08} style={GRID}>
              {reviews.map((review) => (
                <ReviewFigure
                  key={review.id}
                  author={review.author}
                  text={review.comment}
                  rating={review.rating}
                  provenance={t(review.mode === 'AIR' ? 'provenanceAir' : 'provenanceSea')}
                  meta={formatReviewDate(review.createdAt, locale)}
                  response={review.adminResponse}
                  responseLabel={t('responseLabel')}
                />
              ))}
            </RevealGroup>
          )}
        </Shell>
      </Band>

      <Band tone="paper-2">
        <Shell>
          <SectionHead title={t('whatsappSectionTitle')} />
          <RevealGroup stagger={0.08} style={GRID}>
            {TESTIMONIALS.map((testimonial) => (
              <ReviewFigure
                key={testimonial.id}
                author={testimonial.name}
                text={testimonial.text}
                meta={testimonial.company}
                provenance={t('provenanceWhatsapp')}
              />
            ))}
          </RevealGroup>
        </Shell>
      </Band>
    </>
  );
}

export default ReviewsPage;
