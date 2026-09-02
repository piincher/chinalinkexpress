'use client';

/**
 * Testimonials — the real ones, now including the ones clients wrote in the app.
 *
 * What was here before the 2026-08 pass: three cards for "Amadou Diallo, Diallo
 * Electronics", "Fatou Coulibaly, Mode Africaine" and "Oumar Touré, Touré
 * Import-Export", each with a warehouse photograph cropped into a circle as
 * their face, under a banner claiming "Plus de 100 entreprises". None of those
 * three people appear anywhere in this codebase's data. They were replaced by
 * TESTIMONIALS from ../constants.ts — three WhatsApp messages that are
 * obviously real, used verbatim, imperfect French included.
 *
 * What changes now: the `reviews` collection has clients writing reviews inside
 * the app, each already answered by the team, and none of it reached the site.
 * They render here first, above the WhatsApp quotes, with the rating stated
 * once beside the heading. Every one of them is a row in production, anonymised
 * server-side to a first name and an initial before it leaves the API.
 *
 * Two rules this section is under, both learned the expensive way:
 *
 *   · The rating comes from `stats`, over every ACTIVE review — including
 *     ratings left with no comment. Never recompute it from the cards shown.
 *   · No `aggregateRating` / `Review` JSON-LD is emitted from any of this.
 *     Reviews a business collects about itself are not eligible for review
 *     rich results, and inventing eligibility is what earns a manual action.
 *     The reviews are for readers, not for a star in the SERP.
 */

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { ReviewFigure } from '@/features/reviews/components/ReviewFigure';
import { publicProfilePath } from '@/lib/publicProfileApi';
import { RatingSummary } from '@/features/reviews/components/RatingSummary';
import {
  formatReviewDate,
  type PublicReview,
  type PublicReviewStats,
} from '@/lib/publicReviewsApi';
import { TESTIMONIALS, SECTION_IDS } from '../constants';

interface TestimonialsSectionProps {
  /** Real app reviews, newest first. Empty when the API is unreachable. */
  appReviews?: PublicReview[];
  stats?: PublicReviewStats;
  /** How many app reviews to show here; the rest live on /avis. */
  max?: number;
}

export function TestimonialsSection({
  appReviews = [],
  stats,
  max = 3,
}: TestimonialsSectionProps) {
  const t = useTranslations('testimonials');
  const tr = useTranslations('reviews');
  const locale = useLocale();

  /*
   * Reviews with words first.
   *
   * Silent ratings are real and are shown everywhere they are counted — but
   * the home page has three slots and a sentence is what persuades a stranger.
   * Sorting rather than filtering keeps them reachable on /avis and on their
   * author's profile.
   */
  const shown = [...appReviews]
    .sort((a, b) => Number(Boolean(b.comment)) - Number(Boolean(a.comment)))
    .slice(0, max);
  const hasMore = appReviews.length > shown.length;

  return (
    <Band id={SECTION_IDS.TESTIMONIALS} tone="paper">
      <Shell>
        <SectionHead
          label={t('sectionLabel')}
          title={t('title')}
          aside={
            stats && stats.totalReviews > 0 ? (
              <RatingSummary
                averageRating={stats.averageRating}
                totalReviews={stats.totalReviews}
                countLabel={tr('countLabel', { count: stats.totalReviews })}
              />
            ) : undefined
          }
        />

        <RevealGroup
          stagger={0.1}
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
              authorHref={
                review.authorHandle ? publicProfilePath(locale, review.authorHandle) : null
              }
              text={review.comment}
              silentLabel={tr('silentReview')}
              rating={review.rating}
              provenance={tr(review.mode === 'AIR' ? 'provenanceAir' : 'provenanceSea')}
              meta={formatReviewDate(review.createdAt, locale)}
              response={review.adminResponse}
              responseLabel={tr('responseLabel')}
            />
          ))}

          {TESTIMONIALS.map((testimonial) => (
            <ReviewFigure
              key={testimonial.id}
              author={testimonial.name}
              text={testimonial.text}
              meta={testimonial.company}
              provenance={tr('provenanceWhatsapp')}
            />
          ))}
        </RevealGroup>

        {hasMore && (
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
              {tr('seeAll')}
            </Link>
          </div>
        )}
      </Shell>
    </Band>
  );
}

export default TestimonialsSection;
