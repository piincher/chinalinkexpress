'use client';

/**
 * A client's public profile, as the website shows it.
 *
 * The page a reviewer's name leads to. Its argument is simple: a testimonial
 * is worth more when you can see the person shipped with us repeatedly, and
 * worth knowing about when they shipped once. So it states volume, modes and
 * their own reviews, and stops there.
 *
 * What it cannot show, because the API never sends it: full name, phone,
 * address, parcels, amounts. And what it deliberately blurs: the exact
 * shipment count. Requests from this site are anonymous, so the API answers
 * with a band — "5+ expéditions" — which is the difference between telling a
 * reader that someone is a regular and handing a competitor a client's volume.
 * These pages are `noindex` for the same reason.
 */

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Plane, Ship } from 'lucide-react';
import { Band, Shell, PageHero } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { RevealGroup } from '@/components/motion';
import { ReviewFigure } from '@/features/reviews/components/ReviewFigure';
import { formatReviewDate } from '@/lib/publicReviewsApi';
import type { PublicClientProfile } from '@/lib/publicProfileApi';

const GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
  gap: 'clamp(1.5rem, 3vw, 2.5rem)',
};

const STAT_GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
  gap: 'var(--space-lg)',
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        paddingTop: 'var(--space-md)',
        borderTop: '2px solid var(--color-ink)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--weight-heading)',
          color: 'var(--color-ink)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-neutral)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

interface PublicProfileViewProps {
  profile: PublicClientProfile;
}

export function PublicProfileView({ profile }: PublicProfileViewProps) {
  const t = useTranslations('reviews');
  const locale = useLocale();

  const { shipments, rating } = profile;
  // Exact only when the API trusted the reader with it; the site never is.
  const shipmentValue = shipments.total !== null ? String(shipments.total) : shipments.band;
  const memberSince = profile.memberSince ? formatReviewDate(profile.memberSince, locale) : '';
  const firstShipment = shipments.firstAt ? formatReviewDate(shipments.firstAt, locale) : '';

  return (
    <>
      <PageHero
        eyebrow={t('profileEyebrow')}
        title={profile.displayName}
        lede={t('profileLede')}
        meta={[
          memberSince ? t('profileMemberSince', { date: memberSince }) : null,
          profile.tier ? profile.tier.label : null,
        ].filter(Boolean)}
      />

      <Band tone="paper-2">
        <Shell>
          <div style={STAT_GRID}>
            <Stat
              value={shipmentValue}
              label={shipmentValue === '1' ? t('profileShipmentsOne') : t('profileShipments')}
            />
            <Stat
              value={rating.average !== null ? `${rating.average} / 5` : '—'}
              label={t('profileRating')}
            />
            <Stat
              value={String(rating.count)}
              label={t('profileReviewsCount', { count: rating.count })}
            />
          </div>

          {shipments.modes.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
                marginTop: 'var(--space-xl)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-neutral)',
                }}
              >
                {t('profileModes')}
              </span>
              {shipments.modes.map((mode) => (
                <span
                  key={mode}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-rule)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {mode === 'AIR' ? (
                    <Plane size={14} aria-hidden />
                  ) : (
                    <Ship size={14} aria-hidden />
                  )}
                  {mode === 'AIR' ? t('modeAir') : t('modeSea')}
                </span>
              ))}
              {firstShipment && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral)',
                  }}
                >
                  {t('profileFirstShipment', { date: firstShipment })}
                </span>
              )}
            </div>
          )}
        </Shell>
      </Band>

      <Band tone="paper">
        <Shell>
          <SectionHead title={t('profileReviews')} />
          <RevealGroup stagger={0.08} style={GRID}>
            {profile.reviews.map((review) => (
              <ReviewFigure
                key={review.id}
                author={profile.displayName}
                text={review.comment}
                silentLabel={t('silentReview')}
                rating={review.rating}
                provenance={t(review.mode === 'AIR' ? 'provenanceAir' : 'provenanceSea')}
                meta={formatReviewDate(review.createdAt, locale)}
                response={review.adminResponse}
                responseLabel={t('responseLabel')}
              />
            ))}
          </RevealGroup>

          <p
            style={{
              marginTop: 'var(--space-2xl)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.5,
              color: 'var(--color-neutral)',
              maxWidth: '48ch',
            }}
          >
            {t('profilePrivacy')}
          </p>

          <div style={{ marginTop: 'var(--space-lg)' }}>
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
              {t('profileBackToReviews')}
            </Link>
          </div>
        </Shell>
      </Band>
    </>
  );
}

export default PublicProfileView;
