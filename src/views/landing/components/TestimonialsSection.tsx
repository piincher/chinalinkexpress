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
import Image from 'next/image';
import { ArrowRight, ChevronRight, HelpCircle, Star } from 'lucide-react';
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
import { SECTION_IDS } from '../constants';

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
  const tHome = useTranslations('home');
  const tApp = useTranslations('appPage');
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
            />
          ))}

        </RevealGroup>

        {/* Next steps as two tappable cards (owner 2026-11-24: the underlined
            mono links read as an afterthought). FAQ left the home page on
            2026-11-23, so this card is its one entry point. */}
        <div className="next-links">
          {hasMore && (
            <Link href={`/${locale}/avis`} className="next-link">
              <span className="next-link-icon" aria-hidden><Star size={20} /></span>
              <span className="next-link-text">
                <strong>{tr('seeAll')}</strong>
                <span>{tHome('reviewsSub')}</span>
              </span>
              <ChevronRight size={20} className="next-link-arrow" aria-hidden />
            </Link>
          )}
          <Link href={`/${locale}/faq`} className="next-link">
            <span className="next-link-icon" aria-hidden><HelpCircle size={20} /></span>
            <span className="next-link-text">
              <strong>{tHome('faqCard')}</strong>
              <span>{tHome('faqSub')}</span>
            </span>
            <ChevronRight size={20} className="next-link-arrow" aria-hidden />
          </Link>
        </div>

        {/* App promo (owner 2026-11-24: the plain text link was not appealing).
            Same yellow flyer style as /application; the whole card is the link. */}
        <Link href={`/${locale}/application`} className="app-promo">
          <div className="app-promo-text">
            <span className="app-promo-chip">{tApp('homeLink')}</span>
            <strong className="app-promo-title">{tApp('title')}</strong>
            <span className="app-promo-line">{tApp('features.photos.title')} · {tApp('features.steps.title')}</span>
          </div>
          <span className="app-promo-btn">
            {tHome('appCta')}
            <ArrowRight size={18} aria-hidden />
          </span>
          <div className="app-promo-phone" aria-hidden>
            <Image src="/media/app/colis.webp" alt="" fill sizes="(max-width: 760px) 40vw, 14rem" />
          </div>
        </Link>
      </Shell>
    </Band>
  );
}

export default TestimonialsSection;
