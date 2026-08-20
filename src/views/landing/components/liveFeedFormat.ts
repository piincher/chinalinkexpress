/**
 * formatRelativeTime — "il y a 2 h" in whichever locale the page renders.
 *
 * Lives next to the live-feed components rather than in shared/lib because it
 * is the only consumer of Intl.RelativeTimeFormat on the site; promoting it to
 * a shared helper before a second caller exists would be guessing at its API.
 *
 * Invalid or unparseable timestamps return an empty string — the row that
 * calls this renders the rest of the event without a time rather than showing
 * "NaN years ago".
 */

const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.345, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

export function formatRelativeTime(iso: string, locale: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  let duration = Math.round((then - Date.now()) / 1000);

  for (const { amount, unit } of DIVISIONS) {
    if (Math.abs(duration) < amount) {
      return rtf.format(Math.round(duration), unit);
    }
    duration /= amount;
  }
  return '';
}
