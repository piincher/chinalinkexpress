/**
 * SeasonalStyleOverride — the campaign's colours, mapped onto the site's
 * accent tokens.
 *
 * The seasonal engine recolours the app; this is the same gesture for the
 * marketing site. When a live campaign ships a validated skin, this injects
 * one small `<style>` block that re-points the *accent* variables from
 * tokens.css at the campaign hue: `--color-accent` and its derived
 * deep/bright variants, `--color-focus`, and (when the campaign says so) the
 * foreground that sits on the accent. Every button, link and focus ring that
 * already resolves through those variables — including the legacy
 * `--color-primary` bridge in globals.css — follows without a component
 * change.
 *
 * Scope is deliberately narrow:
 *
 *   · Base surfaces are never touched. `--color-paper` / `--color-ink` /
 *     `--color-void` stay the site's own, in both modes, so the light/dark
 *     toggle keeps working exactly as before.
 *   · The dark palette is only overridden when the campaign ships one
 *     (`appSkin.dark.primary`). The override lives under the same `.dark`
 *     selector tokens.css uses, so it layers with the toggle instead of
 *     fighting it; without a dark palette the site's own dark ramp applies.
 *   · The hero gradient, when present, is a low-alpha tint layered over the
 *     hero band's own void surface — a seasonal wash, not a repaint.
 *
 * Colours arrive as `#RRGGBB`, are revalidated upstream in
 * `seasonalExperienceApi`, and are converted to oklch here so derived
 * variants stay in the site's token space. Nothing else is ever interpolated
 * into the stylesheet, so the block carries no injection surface.
 *
 * Server component. With no live campaign — or nothing valid in it — it
 * renders nothing at all.
 */

import React from 'react';
import {
  getSeasonalExperience,
  hexToOklch,
  oklchCss,
  type Oklch,
  type SeasonalSkin,
} from '@/lib/seasonalExperienceApi';

/** The hero band's anchor, from `src/views/landing/constants.ts` (SECTION_IDS.HERO). */
const HERO_SELECTOR = '#hero';

/** Same hue and chroma, darker — the hover/depressed step of the accent. */
function deepen({ l, c, h }: Oklch): Oklch {
  return { l: l * 0.84, c, h };
}

/** Same hue and chroma, lifted — the variant that reads on the void bands. */
function brighten({ l, c, h }: Oklch): Oklch {
  return { l: Math.min(l + 0.15, 0.92), c, h };
}

function accentDeclarations(accent: Oklch, accentOn: Oklch | null): string {
  const lines = [
    `--color-accent: ${oklchCss(accent)};`,
    `--color-accent-deep: ${oklchCss(deepen(accent))};`,
    `--color-accent-bright: ${oklchCss(brighten(accent))};`,
    `--color-focus: ${oklchCss(accent)};`,
  ];
  if (accentOn) lines.push(`--color-accent-ink: ${oklchCss(accentOn)};`);
  return lines.join('\n  ');
}

function buildCss(skin: SeasonalSkin, gradient: { start: string; end: string } | null): string {
  const blocks: string[] = [];

  const lightAccent = skin.accent ? hexToOklch(skin.accent) : null;
  const lightAccentOn = skin.accentOn ? hexToOklch(skin.accentOn) : null;
  if (lightAccent) {
    blocks.push(`:root {\n  ${accentDeclarations(lightAccent, lightAccentOn)}\n}`);
  }

  const darkAccent = skin.darkAccent ? hexToOklch(skin.darkAccent) : null;
  const darkAccentOn = skin.darkAccentOn ? hexToOklch(skin.darkAccentOn) : null;
  if (darkAccent) {
    blocks.push(`.dark {\n  ${accentDeclarations(darkAccent, darkAccentOn)}\n}`);
  }

  if (gradient) {
    blocks.push(
      `${HERO_SELECTOR} {\n` +
        `  background-image: linear-gradient(180deg,\n` +
        `    color-mix(in oklch, ${gradient.start} 26%, transparent) 0%,\n` +
        `    color-mix(in oklch, ${gradient.end} 36%, transparent) 100%);\n` +
        `}`,
    );
  }

  return blocks.join('\n\n');
}

export async function SeasonalStyleOverride() {
  const seasonal = await getSeasonalExperience();
  if (!seasonal?.skin) return null;

  const css = buildCss(seasonal.skin, seasonal.gradient);
  if (!css) return null;

  return <style id="seasonal-style-override" dangerouslySetInnerHTML={{ __html: css }} />;
}

export default SeasonalStyleOverride;
