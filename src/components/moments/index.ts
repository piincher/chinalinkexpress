/**
 * Moments — animations that explain one thing about the service each.
 *
 * Unlike the five gestures in components/motion (which apply everywhere), each
 * of these belongs to one page and earns its place by showing something words
 * explain badly: how groupage fills a container, what a CBM looks like, how
 * long air takes against sea. CSS-first, no new dependency; the performance
 * contract is at the top of moments.css.
 *
 * Import from the component's own file (`@/components/moments/TransitRace`),
 * not from this barrel: measured on the production build, a barrel import
 * pulled every moment into each page that used one.
 */

export { useMomentInView, momentClass, type MomentState } from './useMomentInView';
export { MomentPanel } from './MomentPanel';
export { RouteProgress } from './RouteProgress';
export { RollingFigure } from './RollingFigure';
export { ContainerFill } from './ContainerFill';
export { TransitRace } from './TransitRace';
export { LabelPrint } from './LabelPrint';
export { WhatsAppThread } from './WhatsAppThread';
export { SupplierPayment } from './SupplierPayment';
export { WeighScale } from './WeighScale';
export { CartonCube } from './CartonCube';
export { PhotoProof } from './PhotoProof';
export { ScrollProgress } from './ScrollProgress';
