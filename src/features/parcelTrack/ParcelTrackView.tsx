'use client';

/**
 * /suivi — parcel code + last 4 phone digits → where the parcel is.
 * Nothing about the visitor is stored; the digits never go in the URL.
 */

import React, { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { useLocale, useTranslations } from 'next-intl';
import { Band, Shell, PageHero, Cta } from '@/components/site';
import { trackParcel, type ParcelTrackOutcome } from '@/lib/parcelTrackApi';

type ViewState = ParcelTrackOutcome | { status: 'idle' } | { status: 'checking' };

const STEPS = ['RECEIVED_AT_WAREHOUSE', 'PACKED', 'ASSIGNED_TO_CONTAINER', 'LOADED_IN_CONTAINER', 'IN_TRANSIT', 'ARRIVED_DESTINATION', 'READY_FOR_PICKUP', 'DELIVERED'];

const NOTICE_KEY = { invalid: 'invalid', 'not-found': 'notFound', 'rate-limited': 'rateLimited', error: 'error' } as const;

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: 'var(--radius-input)',
  border: '1px solid var(--color-rule-2)',
  background: 'var(--color-paper)',
  color: 'var(--color-ink)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-lg)',
  letterSpacing: '0.06em',
};

export function ParcelTrackView() {
  const t = useTranslations('parcelTrack');
  const locale = useLocale();
  const [code, setCode] = useState('');
  const [last4, setLast4] = useState('');
  const [state, setState] = useState<ViewState>({ status: 'idle' });
  const inFlight = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);

  // /suivi?code=G-2609-0069 (links in messages, receipts) fills the code; the phone digits stay required.
  useEffect(() => {
    const fromLink = new URLSearchParams(window.location.search).get('code');
    if (fromLink) setCode(fromLink.trim().slice(0, 40));
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;
    setState({ status: 'checking' });
    const outcome = await trackParcel(code, last4, controller.signal);
    if (!controller.signal.aborted) {
      setState(outcome);
      track('track_lookup', { result: outcome.status });
    }
  };

  const checking = state.status === 'checking';
  const notice = state.status in NOTICE_KEY ? NOTICE_KEY[state.status as keyof typeof NOTICE_KEY] : null;
  const parcel = state.status === 'found' ? state.parcel : null;
  const current = parcel ? STEPS.indexOf(parcel.status) : -1;
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });

  // On a phone the result lands below the fold; bring it into view.
  useEffect(() => {
    if (parcel) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [parcel]);

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />
      <Band tone="paper-2">
        <Shell>
          <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--color-ink)' }}>
                {t('codeLabel')}
                <input name="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="G-2609-0069" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={40} style={inputStyle} />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', fontWeight: 'var(--weight-medium)', color: 'var(--color-ink)' }}>
                {t('phoneLabel')}
                <input name="phoneLast4" value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="1234" inputMode="numeric" autoComplete="off" maxLength={4} style={{ ...inputStyle, maxWidth: '9rem' }} />
              </label>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' }}>{t('hint')}</p>
              <div>
                <Cta type="submit" state={checking ? 'loading' : 'idle'} disabled={checking}>
                  {checking ? t('checking') : t('submit')}
                </Cta>
              </div>
            </form>

            {notice ? (
              <div role="alert" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-panel)', background: 'var(--color-paper)', color: 'var(--color-ink)', fontWeight: 'var(--weight-medium)', border: '1px solid var(--color-rule-2)' }}>
                {t(notice)}
              </div>
            ) : null}

            {parcel ? (
              <section ref={resultRef} aria-live="polite" className="ptrack" style={{ scrollMarginTop: '6rem' }}>
                <div className="ptrack-head">
                  <div className="ptrack-meta">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{parcel.code}</span>
                    {parcel.mode ? <span className="ptrack-chip">{t(parcel.mode === 'AIR' ? 'modeAir' : 'modeSea')}</span> : null}
                  </div>
                  <h2 className="ptrack-status">{t.has(`stages.${parcel.status}`) ? t(`stages.${parcel.status}`) : t('stages.other')}</h2>
                  {current >= 0 ? (
                    <div className="ptrack-bar" aria-hidden="true">
                      <span style={{ width: `${((current + 1) / STEPS.length) * 100}%` }} />
                    </div>
                  ) : null}
                </div>
                {parcel.estimatedArrival ? (
                  <p className="ptrack-eta">
                    {t('eta', { date: new Date(parcel.estimatedArrival).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) })}
                  </p>
                ) : null}
                {current >= 0 ? (
                  <ol className="ptrack-steps">
                    {STEPS.map((step, i) => {
                      // Only dates of reached stages: a status bounce can leave a later stamp behind.
                      const when = i <= current ? parcel.dates[step] : undefined;
                      const expected = step === 'ARRIVED_DESTINATION' && i > current ? parcel.estimatedArrival : null;
                      return (
                        <li key={step} aria-current={i === current ? 'step' : undefined} data-state={i < current ? 'done' : i === current ? 'now' : 'next'}>
                          <span className="ptrack-dot" aria-hidden="true">{i < current ? '✓' : null}</span>
                          <span className="ptrack-label">
                            {t(`stages.${step}`)}
                            {when ? <time dateTime={when}>{fmtDate(when)}</time> : null}
                            {expected ? <time dateTime={expected}>{t('expected', { date: fmtDate(expected) })}</time> : null}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' }}>{t('moreInApp')}</p>
              </section>
            ) : null}
          </div>
        </Shell>
      </Band>
    </>
  );
}
