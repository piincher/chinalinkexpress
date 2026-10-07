'use client';

/**
 * /verifier — type the code printed under a ChinaLink photo, see our copy.
 *
 * A link may carry the code (?code=7F3A-92CD), in which case it is checked on
 * arrival. The address bar is kept in step with the last code checked so the
 * result can be shared, and nothing else about the visitor is stored.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, PageHero, Cta } from '@/components/site';
import {
  normalizePhotoCode,
  verifyPhotoCode,
  type PhotoVerifyOutcome,
} from '@/lib/photoVerifyApi';
import { VerifiedPhotoCard } from './VerifiedPhotoCard';

type ViewState = PhotoVerifyOutcome | { status: 'idle' } | { status: 'checking' };

const NOTICE_TONE: Record<string, { fg: string; bg: string }> = {
  invalid: { fg: 'var(--color-warning)', bg: 'var(--color-paper-2)' },
  'not-found': { fg: 'var(--color-negative)', bg: 'var(--color-negative-soft)' },
  'rate-limited': { fg: 'var(--color-warning)', bg: 'var(--color-paper-2)' },
  error: { fg: 'var(--color-negative)', bg: 'var(--color-negative-soft)' },
};

const NOTICE_KEY = {
  invalid: 'invalid',
  'not-found': 'notFound',
  'rate-limited': 'rateLimited',
  error: 'error',
} as const;

export function PhotoVerifyView({ initialCode }: { initialCode: string | null }) {
  const t = useTranslations('photoVerify');
  const [input, setInput] = useState(initialCode ?? '');
  const [state, setState] = useState<ViewState>({ status: 'idle' });
  const inFlight = useRef<AbortController | null>(null);

  const check = useCallback(async (raw: string) => {
    const code = normalizePhotoCode(raw);
    if (!code) {
      setState({ status: 'invalid' });
      return;
    }
    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;
    setState({ status: 'checking' });
    setInput(code);
    const outcome = await verifyPhotoCode(code, controller.signal);
    if (controller.signal.aborted) return;
    setState(outcome);
    const url = new URL(window.location.href);
    url.searchParams.set('code', code);
    window.history.replaceState(null, '', url);
  }, []);

  useEffect(() => {
    if (initialCode) void check(initialCode);
    return () => inFlight.current?.abort();
  }, [initialCode, check]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void check(input);
  };

  const checking = state.status === 'checking';
  const notice = state.status in NOTICE_KEY ? NOTICE_KEY[state.status as keyof typeof NOTICE_KEY] : null;

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <Band tone="paper-2">
        <Shell>
          <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <label htmlFor="photo-code" style={{ fontWeight: 'var(--weight-medium)', color: 'var(--color-ink)' }}>
                {t('label')}
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                <input
                  id="photo-code"
                  name="code"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="7F3A-92CD"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={32}
                  inputMode="text"
                  aria-describedby="photo-code-hint"
                  aria-invalid={state.status === 'invalid'}
                  style={{
                    flex: '1 1 12rem',
                    minWidth: 0,
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--color-rule-2)',
                    background: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-lg)',
                    letterSpacing: '0.08em',
                  }}
                />
                <Cta type="submit" state={checking ? 'loading' : 'idle'} disabled={checking}>
                  {checking ? t('checking') : t('submit')}
                </Cta>
              </div>
              <p id="photo-code-hint" style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-neutral)' }}>
                {t('hint')}
              </p>
            </form>

            {notice ? (
              <div
                role="alert"
                style={{
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-panel)',
                  color: NOTICE_TONE[state.status].fg,
                  background: NOTICE_TONE[state.status].bg,
                  fontWeight: 'var(--weight-medium)',
                }}
              >
                {t(notice)}
              </div>
            ) : null}

            {state.status === 'valid' ? <VerifiedPhotoCard photo={state.photo} /> : null}
          </div>
        </Shell>
      </Band>
    </>
  );
}
