/**
 * Contact numbers — single source of truth.
 *
 * Before this file there were five different WhatsApp numbers hard-coded across
 * 32 call sites, including a placeholder (`22300000000`) that was live in
 * production on the personalised-guide page.
 *
 * The numbers below are the two that are demonstrably real and in active use.
 * Everything else was consolidated onto them:
 *
 *   8618851725957  SALES      — 24 existing call sites. The main line.
 *   22376696177    COMMUNITY  — 2 of the 3 community-join CTAs already used it.
 *
 * Reassignments made during consolidation, each one a judgement call that is
 * trivial to reverse here if it is wrong:
 *
 *   22300000000     → SALES      placeholder, was live on the guide page
 *   8616621150801   → COMMUNITY  a third number on a community-join CTA whose
 *                                two siblings both pointed at 22376696177
 *   8617865673053   → SALES      was the footer's "contact us" link. Worth
 *                                knowing: this is the same number credited in
 *                                hscargoservice.com's own footer, so it is very
 *                                unlikely to belong in ChinaLink's.
 *
 * The navbar's WhatsApp button also moved from COMMUNITY to SALES: it sits next
 * to "get a quote" intent, not "join the group".
 */

/** Main sales / support line (China). Digits only — wa.me rejects punctuation. */
export const WHATSAPP_SALES = '8618851725957';

/** Community group line (Mali). */
export const WHATSAPP_COMMUNITY = '22376696177';

/** Display form of the sales number, for rendering rather than linking. */
export const WHATSAPP_SALES_DISPLAY = '+86 188 5172 5957';

/**
 * Build a wa.me link.
 *
 * Note `encodeURIComponent`: several of the previous call sites hand-encoded
 * their prefill text and at least one did not, leaving raw accented characters
 * and an apostrophe in the query string.
 */
export function whatsappUrl(number: string = WHATSAPP_SALES, text?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Convenience for the most common case. */
export const WHATSAPP_URL = whatsappUrl(WHATSAPP_SALES);
