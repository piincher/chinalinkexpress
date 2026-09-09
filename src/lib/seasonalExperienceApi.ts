/**
 * The seasonal experience payload, as the marketing site consumes it.
 *
 * The same endpoint the app's home screen reads
 * (`GET /api/v2/public/seasonal-experience`), and the same rule as
 * `publicOccasionsApi`: a plain fetch, an abort timeout, and a null result
 * rather than a throw. Out of season — or whenever the payload is partial,
 * malformed, or the API is down — the honest answer is no campaign, and the
 * site renders exactly as it does today rather than not at all.
 *
 * Every colour is revalidated here against `#RRGGBB` before it is allowed
 * anywhere near a stylesheet. The backend is the first gate; this module is
 * the second. Anything that fails validation is dropped field by field, so a
 * single garbage value cannot poison an otherwise usable campaign.
 *
 * Revalidated every five minutes: campaigns turn over by the day, and a page
 * that hits the API on every request is a page that goes down when the API
 * does.
 */

import { API_CONFIG } from '@/config/api';

export type SeasonalEffect = 'NONE' | 'SNOWFALL' | 'LANTERNS' | 'CONFETTI' | 'CRESCENT_STARS';
export type SeasonalDensity = 'SUBTLE' | 'FESTIVE';

export interface SeasonalSkin {
  /** Light-mode primary, validated `#RRGGBB` (`appSkin.light.primary`, else `theme.accentColor`). */
  accent: string | null;
  /** Foreground on the accent (`appSkin.light.onPrimary`, else `theme.accentOnColor`). */
  accentOn: string | null;
  /** Dark-mode primary — used only when the campaign ships a dark palette. */
  darkAccent: string | null;
  darkAccentOn: string | null;
  gradientStart: string | null;
  gradientEnd: string | null;
}

export interface SeasonalExperience {
  /** Validated colour tokens, or null when none survived validation. */
  skin: SeasonalSkin | null;
  effect: SeasonalEffect;
  density: SeasonalDensity;
  /** Resolved accent for tinting decorations — light primary, else top-level accentColor. */
  accent: string | null;
  gradient: { start: string; end: string } | null;
}

const TIMEOUT_MS = 5000;
const REVALIDATE_SECONDS = 300;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const EFFECTS: readonly SeasonalEffect[] = ['NONE', 'SNOWFALL', 'LANTERNS', 'CONFETTI', 'CRESCENT_STARS'];

function validHex(value: unknown): string | null {
  return typeof value === 'string' && HEX_RE.test(value) ? value : null;
}

function validEffect(value: unknown): SeasonalEffect {
  return EFFECTS.includes(value as SeasonalEffect) ? (value as SeasonalEffect) : 'NONE';
}

/**
 * Fetch and normalize the seasonal payload. Returns null when there is
 * nothing to apply — engine off, no live campaign, no usable skin and no
 * decoration — so callers render the ordinary site.
 */
export async function getSeasonalExperience(): Promise<SeasonalExperience | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}/api/v2/public/seasonal-experience`, {
      method: 'GET',
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const data = json?.data;
    if (!data || data.enabled !== true) return null;
    const expiresAt = Date.parse(data.nextRefreshAt);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

    const campaign = data.primaryCampaign;
    if (!campaign || typeof campaign !== 'object') return null;

    const theme = campaign.theme && typeof campaign.theme === 'object' ? campaign.theme : {};
    const light = theme.appSkin?.light && typeof theme.appSkin.light === 'object' ? theme.appSkin.light : {};
    const dark = theme.appSkin?.dark && typeof theme.appSkin.dark === 'object' ? theme.appSkin.dark : {};

    const lightPair = validHex(light.primary) && validHex(light.onPrimary);
    const accentPair = validHex(theme.accentColor) && validHex(theme.accentOnColor);
    const darkPair = validHex(dark.primary) && validHex(dark.onPrimary);
    const gradient = Array.isArray(theme.heroGradient) && theme.heroGradient.length === 2
      ? theme.heroGradient : [];
    const skin: SeasonalSkin = {
      accent: lightPair ? validHex(light.primary) : accentPair ? validHex(theme.accentColor) : null,
      accentOn: lightPair ? validHex(light.onPrimary) : accentPair ? validHex(theme.accentOnColor) : null,
      darkAccent: darkPair ? validHex(dark.primary) : null,
      darkAccentOn: darkPair ? validHex(dark.onPrimary) : null,
      gradientStart: validHex(gradient[0]),
      gradientEnd: validHex(gradient[1]),
    };
    const hasSkin = Object.values(skin).some((v) => v !== null);

    const decorations =
      campaign.decorations && typeof campaign.decorations === 'object' ? campaign.decorations : null;
    const effect =
      decorations && decorations.enabled !== false ? validEffect(decorations.effect) : 'NONE';
    const density: SeasonalDensity = decorations?.density === 'FESTIVE' ? 'FESTIVE' : 'SUBTLE';

    if (!hasSkin && effect === 'NONE') return null;

    return {
      skin: hasSkin ? skin : null,
      effect,
      density,
      accent: skin.accent,
      gradient:
        skin.gradientStart && skin.gradientEnd
          ? { start: skin.gradientStart, end: skin.gradientEnd }
          : null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// ============================================================================
// hex → oklch
//
// Overrides are emitted in oklch so a seasonal accent sits in the same colour
// space as every token in tokens.css and derives (deep/bright variants) stay
// perceptually uniform. Standard sRGB → OKLab → OKLCH; no dependency.
// ============================================================================

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export function hexToOklch(hex: string): Oklch | null {
  if (!HEX_RE.test(hex)) return null;
  const r8 = parseInt(hex.slice(1, 3), 16) / 255;
  const g8 = parseInt(hex.slice(3, 5), 16) / 255;
  const b8 = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const r = toLinear(r8);
  const g = toLinear(g8);
  const b = toLinear(b8);

  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const c = Math.sqrt(a * a + b2 * b2);
  let h = (Math.atan2(b2, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return { l, c, h };
}

export function oklchCss({ l, c, h }: Oklch): string {
  return `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${h.toFixed(1)})`;
}
