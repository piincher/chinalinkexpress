'use client';

/**
 * An illustrative shipment timeline, built in markup rather than mocked up in
 * an image editor.
 *
 * The reason it exists: the page's central claim is that you stop guessing
 * where your goods are. Saying "suivi professionnel" asserts that. Rendering
 * the actual sequence of statuses, with times and a volume, demonstrates it —
 * and demonstrating is the whole point of the exercise. It is also the one
 * thing on this page a competitor with a brochure site cannot answer.
 *
 * Three deliberate constraints:
 *
 *   · The statuses are not invented. They are the real ones the operation
 *     writes to a shipment — RECEIVED_AT_WAREHOUSE, PACKED,
 *     LOADED_IN_CONTAINER, IN_TRANSIT — read from the same `liveFeed.status`
 *     message keys the live activity board below uses, so the label a visitor
 *     sees here is exactly the label a client sees in the app.
 *
 *   · The reference and the times are obviously synthetic and the panel says so
 *     twice: a caption above and a note below. A fabricated shipment presented
 *     as a customer's would be the same dishonesty as a fabricated testimonial,
 *     in a more technical costume.
 *
 *   · No real client data is fetched. Nothing here touches an API, so there is
 *     nothing to leak.
 *
 * It is markup and not a screenshot because a screenshot is a raster that goes
 * stale, cannot be read by a screen reader, ships 400 KB, and blurs on a
 * high-density phone. This scales, translates, and re-themes with the page.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

/**
 * The illustrative sequence. `time` values are plain strings rather than dates
 * so nothing here can be mistaken for a live feed, and so the panel renders
 * identically on the server and the client — a `new Date()` in this component
 * would produce a hydration mismatch on every load.
 */
const STEPS = [
  { statusKey: 'RECEIVED_AT_WAREHOUSE', time: '14:32', done: true },
  { statusKey: 'PACKED', time: '15:07', done: true },
  { statusKey: 'LOADED_IN_CONTAINER', time: '18:20', done: true },
  { statusKey: 'IN_TRANSIT', time: '—', done: false },
] as const;

export function TrackingPreview() {
  const t = useTranslations();

  return (
    <figure
      style={{
        margin: 0,
        minWidth: 0,
        borderRadius: 'var(--radius-panel)',
        border: '1px solid var(--color-void-rule)',
        backgroundColor: 'var(--color-void-2)',
        overflow: 'hidden',
      }}
    >
      {/* ── caption: says what this is before anything else is read ──────── */}
      <figcaption
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
          padding: 'var(--space-md) var(--space-lg)',
          borderBottom: '1px solid var(--color-void-rule)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--color-void-ink-2)',
        }}
      >
        <span>{t('appSection.demoLabel')}</span>
        <span aria-hidden style={{ color: 'var(--color-void-ink-2)' }}>
          GS-•••••
        </span>
      </figcaption>

      <div style={{ padding: 'var(--space-lg)' }}>
        {/* ── the two figures a client checks first ─────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
            gap: 'var(--space-lg)',
            paddingBottom: 'var(--space-lg)',
            marginBottom: 'var(--space-lg)',
            borderBottom: '1px solid var(--color-void-rule)',
          }}
        >
          {[
            { label: 'Volume', value: '0,42 CBM' },
            { label: 'Mode', value: t('liveFeed.modes.sea') },
          ].map((field) => (
            <div key={field.label} style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--color-void-ink-2)',
                  marginBottom: 'var(--space-2xs)',
                }}
              >
                {field.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--weight-heading)',
                  color: 'var(--color-void-ink)',
                }}
              >
                {field.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── the sequence ─────────────────────────────────────────────── */}
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <li
                key={step.statusKey}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  paddingBottom: isLast ? 0 : 'var(--space-lg)',
                  position: 'relative',
                }}
              >
                {/* Marker, and the rail joining it to the next one. */}
                <span
                  aria-hidden
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1.25rem',
                    height: '1.25rem',
                    flexShrink: 0,
                    borderRadius: '50%',
                    backgroundColor: step.done
                      ? 'var(--color-accent-bright)'
                      : 'transparent',
                    border: step.done
                      ? 'none'
                      : '1px dashed var(--color-void-ink-2)',
                  }}
                >
                  {step.done && (
                    <Check size={12} strokeWidth={3} style={{ color: 'var(--color-accent-ink)' }} />
                  )}
                  {!isLast && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        width: 1,
                        height: 'var(--space-lg)',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--color-void-rule)',
                      }}
                    />
                  )}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: step.done ? 'var(--color-void-ink)' : 'var(--color-void-ink-2)',
                    minWidth: 0,
                  }}
                >
                  {t(`liveFeed.status.${step.statusKey}`)}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-void-ink-2)',
                    flexShrink: 0,
                  }}
                >
                  {step.time}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── and again, in plain words, at the bottom ─────────────────────── */}
      <p
        style={{
          margin: 0,
          padding: 'var(--space-md) var(--space-lg)',
          borderTop: '1px solid var(--color-void-rule)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          lineHeight: 'var(--leading-body)',
          color: 'var(--color-void-ink-2)',
        }}
      >
        {t('appSection.demoNote')}
      </p>
    </figure>
  );
}

export default TrackingPreview;
