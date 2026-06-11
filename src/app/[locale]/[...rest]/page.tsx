import { notFound } from 'next/navigation';

/**
 * Catch-all for unmatched localized paths.
 *
 * With `localePrefix: 'always'`, deep links into the mobile app (e.g.
 * /en/admin/order/:id, /en/order/:id, /en/goods/:id) have no marketing route and
 * would otherwise fall through to the bare global 404. This catch-all funnels them
 * into the localized `not-found.tsx`, which renders the branded "open in app /
 * download" fallback (for app routes) or a friendly 404 (for genuine typos).
 *
 * Specific routes always take precedence over a catch-all, so existing marketing
 * pages are unaffected.
 */
export default function LocaleCatchAll() {
  notFound();
}
