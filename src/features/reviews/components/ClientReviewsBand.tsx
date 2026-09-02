'use client';

/**
 * A compact band of real client reviews, for pages that are not the home page.
 *
 * This is what the note on the calculator page was waiting for. That page used
 * to mount `VerifiedReviewsSection`: a 4.8 average "basé sur 312 avis clients
 * vérifiés", Google/Trustpilot source badges and a carousel of twelve invented
 * reviews. It was unmounted, the fabricated data file is now deleted, and this
 * takes its place — same slot, same argument, real rows.
 *
 * Renders nothing when there are no reviews. An empty band is better than a
 * heading with nothing under it, and far better than filler.
 */

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { ReviewFigure } from './ReviewFigure';
import { RatingSummary } from './RatingSummary';
import {
  formatReviewDate,
  type PublicReview,
  type PublicReviewStats,
} from '@/lib/publicReviewsApi';
import type { BandTone } from '@/components/site';

interface ClientReviewsBandProps {
  reviews: PublicReview[];
  stats: PublicReviewStats;
  max?: number;
  tone?: BandTone;
}

export function ClientReviewsBand({
  reviews,
  stats,
  max = 3,
  tone = 'paper',
}: ClientReviewsBandProps) {
  const t = useTranslations('reviews');
  const locale = useLocale();

  if (reviews.length === 0) return null;

  const shown = reviews.slice(0, max);

  return (
    <Band tone={tone}>
      <Shell>
        <SectionHead
          label={t('pageEyebrow')}
          title={t('pageTitle')}
          aside={
            stats.totalReviews > 0 ? (
              <RatingSummary
                averageRating={stats.averageRating}
                totalReviews={stats.totalReviews}
                countLabel={t('countLabel', { count: stats.totalReviews })}
              />
            ) : undefined
          }
        />

        <RevealGroup
          stagger={0.08}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {shown.map((review) => (
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

        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <Link
            href={`/${locale}/avis`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent)',
              paddingBottom: '0.15rem',
            }}
          >
            {t('seeAll')}
          </Link>
        </div>
      </Shell>
    </Band>
  );
}

export default ClientReviewsBand;
