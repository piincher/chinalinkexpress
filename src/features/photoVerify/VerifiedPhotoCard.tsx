'use client';

/**
 * A photo the API confirmed: our copy of it, and the facts printed on its
 * banner, so the reader can compare the two side by side. Any difference
 * between the photo they were sent and this one means it was altered.
 */

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import type { VerifiedPhoto } from '@/lib/photoVerifyApi';

const KNOWN_STAGES = new Set([
  'RECEIVED_AT_WAREHOUSE',
  'INTAKE',
  'LABELED',
  'ARRIVAL',
  'HANDOVER',
  'PAYMENT_PROOF',
]);

/** Same clock as the banner on the photo: UTC, said so. */
function formatGmt(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  const text = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(date);
  return `${text} GMT`;
}

const ROW: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 'var(--space-md)',
  padding: 'var(--space-sm) 0',
  borderTop: '1px solid var(--color-rule)',
  fontSize: 'var(--text-sm)',
};

const LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral)',
};

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={ROW}>
      <span style={LABEL}>{label}</span>
      <b
        style={{
          color: 'var(--color-ink)',
          textAlign: 'right',
          overflowWrap: 'anywhere',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
        }}
      >
        {value}
      </b>
    </div>
  );
}

export function VerifiedPhotoCard({ photo }: { photo: VerifiedPhoto }) {
  const t = useTranslations('photoVerify');
  const locale = useLocale();
  const stage = photo.stage && KNOWN_STAGES.has(photo.stage) ? t(`stages.${photo.stage}`) : t('stages.other');

  return (
    <section
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-rule)',
        background: 'var(--color-paper)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          alignSelf: 'flex-start',
          padding: '0.4rem 0.9rem',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-positive-soft)',
          color: 'var(--color-positive)',
          fontWeight: 'var(--weight-heading)',
        }}
      >
        <ShieldCheck size={18} aria-hidden />
        {t('validTitle')}
      </div>
      <p style={{ margin: 0, color: 'var(--color-ink-2)' }}>{t('validBody')}</p>

      {photo.imageUrl ? (
        // A signed storage URL that expires in minutes: next/image would cache
        // it under our domain, so a plain img is the right tool here.
        <img
          src={photo.imageUrl}
          alt={t('imageAlt', { code: photo.code })}
          referrerPolicy="no-referrer"
          style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-panel)', border: '1px solid var(--color-rule)' }}
        />
      ) : null}

      <div>
        <Row label={t('code')} value={photo.code} mono />
        {photo.reference ? <Row label={t('reference')} value={photo.reference} mono /> : null}
        <Row label={t('stage')} value={stage} />
        <Row label={t('date')} value={formatGmt(photo.processedAt, locale)} />
      </div>
      <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' }}>{t('compareNote')}</p>
    </section>
  );
}
