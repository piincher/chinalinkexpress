/**
 * GSAP + ScrollTrigger + Lenis registration.
 *
 * One place that guarantees:
 *   1. ScrollTrigger is registered exactly once (double registration in React
 *      StrictMode silently doubles every scrub callback),
 *   2. ScrollTrigger reads its scroll position from Lenis rather than from the
 *      native scroll event — without this the two disagree by a frame and every
 *      pinned section jitters,
 *   3. everything is a no-op under `prefers-reduced-motion`.
 *
 * GSAP is imported dynamically so it stays out of the initial bundle; the
 * marketing pages are LCP-sensitive and none of this is needed before paint.
 */

import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { getLenis } from './lenis';

export type Gsap = typeof GsapType;
export type ScrollTriggerClass = typeof ScrollTriggerType;

export interface GsapBundle {
  gsap: Gsap;
  ScrollTrigger: ScrollTriggerClass;
}

let bundlePromise: Promise<GsapBundle> | null = null;
let lenisBridged = false;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Load + register GSAP once. Concurrent callers share the same promise, so a
 * page with twelve animated sections still performs exactly one import.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (bundlePromise) return bundlePromise;

  bundlePromise = (async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);

    gsap.registerPlugin(ScrollTrigger);
    bridgeLenis(gsap, ScrollTrigger);

    return { gsap, ScrollTrigger };
  })();

  return bundlePromise;
}

/**
 * Drive ScrollTrigger from Lenis's RAF loop.
 *
 * Lenis interpolates scroll position, so the browser's real scrollTop lags
 * behind what the user sees. Left alone, ScrollTrigger samples the real value
 * and pinned elements drift against the content by a frame or two — the exact
 * "cheap parallax" feeling. Handing ScrollTrigger the Lenis tick keeps them on
 * the same clock.
 */
function bridgeLenis(gsap: Gsap, ScrollTrigger: ScrollTriggerClass): void {
  if (lenisBridged) return;

  const lenis = getLenis();
  if (!lenis) {
    // SmoothScroll mounts in the layout, but a route can render before its
    // effect runs. Retry on the next frame rather than permanently skipping.
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => bridgeLenis(gsap, ScrollTrigger));
    }
    return;
  }

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  // GSAP's lag smoothing pauses the ticker after a long frame, which desyncs
  // Lenis. Disable it so scroll stays continuous under load.
  gsap.ticker.lagSmoothing(0);

  lenisBridged = true;
}

/**
 * Run a GSAP setup function inside a scoped context and return its cleanup.
 *
 * `gsap.context` scopes every selector to `scope` and reverts every tween and
 * ScrollTrigger it created on cleanup — which is what keeps route changes from
 * leaking triggers that then fire against unmounted DOM.
 *
 * Resolves to a cleanup function in every case, including reduced-motion and
 * unmount-before-load, so callers can return it from useEffect unconditionally.
 */
export function withGsap(
  scope: Element | null,
  setup: (bundle: GsapBundle) => void
): () => void {
  if (!scope || prefersReducedMotion()) return () => {};

  let ctx: { revert: () => void } | null = null;
  let cancelled = false;

  loadGsap().then((bundle) => {
    if (cancelled) return;
    ctx = bundle.gsap.context(() => setup(bundle), scope);
  });

  return () => {
    cancelled = true;
    ctx?.revert();
  };
}
