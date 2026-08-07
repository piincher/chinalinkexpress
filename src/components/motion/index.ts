/**
 * Motion primitives.
 *
 * The whole site's motion vocabulary is these five gestures:
 *   Reveal / RevealGroup — the one entrance (rise + fade, once)
 *   LineReveal           — masked headline uncovering
 *   Parallax             — scroll-scrubbed depth on photography
 *   Magnetic             — the primary CTA leaning toward the cursor
 *   Counter              — figures counting up on first view
 *
 * Adding a sixth should require an argument. Motion reads as expensive when it
 * is consistent and scarce, and as cheap when every section invents its own.
 */

export { Reveal, RevealGroup } from './Reveal';
export { LineReveal } from './LineReveal';
export { Parallax } from './Parallax';
export { Magnetic } from './Magnetic';
export { Counter } from './Counter';
