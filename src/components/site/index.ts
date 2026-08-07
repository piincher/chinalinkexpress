/**
 * Site primitives — the shared grammar of the marketing pages.
 *
 * Band + Shell   page rhythm (paper / paper-2 / void) and the measured column
 * SectionHead    the one heading pattern
 * Cta            the button voice, three weights, eight states
 * Figure         the house photography treatment
 * CarrierBar     the carrier proof line
 *
 * Inner pages should compose these rather than restating colours and spacing,
 * which is how the redesign propagates past the home page.
 */

export { Band, Shell, type BandTone } from './Band';
export { PageHero } from './PageHero';
export { SectionHead } from './SectionHead';
export { Cta } from './Cta';
export { Figure } from './Figure';
export { CarrierBar } from './CarrierBar';
export { PHOTOS, CATEGORY_PHOTOS, APP_SCREENS, CARRIERS, type Carrier } from './assets';
