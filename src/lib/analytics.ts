/**
 * Site analytics: one `track()` for GA4 (when NEXT_PUBLIC_GA_TRACKING_ID is set)
 * and Vercel Web Analytics (custom events need a Vercel plan that includes them;
 * otherwise the call is a no-op). Audit 2026-11-20: until then nothing on the site
 * recorded a WhatsApp click, a quote, a calculator result or a tracking lookup.
 *
 * Never put a name, phone number or parcel code in `props`.
 */

import { track as vercelTrack } from '@vercel/analytics';

export type SiteEvent =
  | 'whatsapp_click'
  | 'phone_click'
  | 'app_store_click'
  | 'calculator_used'
  | 'quote_form_submitted'
  | 'track_lookup';

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: SiteEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', event, props);
    vercelTrack(event, props);
  } catch {
    // Analytics must never break a click.
  }
}

const sent = new Set<string>();

/** Fire an event at most once per page view for a given key (e.g. first calculator result). */
export function trackOnce(key: string, event: SiteEvent, props: Props = {}): void {
  if (sent.has(key)) return;
  sent.add(key);
  track(event, props);
}

/**
 * Append the page the visitor came from to a wa.me message, so the team can see
 * which page each WhatsApp conversation started on without opening a dashboard.
 * Links without a prefilled message get a short greeting first.
 */
export function withSiteRef(href: string, path: string, greeting: string): string {
  try {
    const url = new URL(href);
    const text = url.searchParams.get('text');
    const ref = `(Réf. site : ${path})`;
    if (text?.includes('Réf. site')) return href;
    // encodeURIComponent (%20), like constants/contact.ts: URLSearchParams would write "+" for spaces.
    const message = text ? `${text}\n\n${ref}` : `${greeting}\n\n${ref}`;
    return `${url.origin}${url.pathname}?text=${encodeURIComponent(message)}`;
  } catch {
    return href;
  }
}
