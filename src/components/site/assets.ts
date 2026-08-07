/**
 * Real ChinaLink media.
 *
 * Every URL here was already in the codebase or the company's own CDN — none of
 * it is stock. The point of the redesign is that this material now carries the
 * page instead of sitting in an OpenGraph tag: `warehouse view.jpg` was
 * previously referenced *only* as a social-share image and never appeared on
 * the site at all.
 *
 * A note on the photography, because it drives the art direction: these are
 * genuine phone photographs of working warehouses — portrait, flat overhead
 * light, and a large expanse of empty floor across the bottom third. Shown raw
 * and full-bleed they look like snapshots. Shown cropped to the cargo, under
 * the two-stop scrim in `Figure`, and always with type over them, they read as
 * evidence. That is the whole argument for the dark band: it is the treatment
 * that makes real-but-unstyled photography look deliberate.
 */

const AIR = 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping';
const GOODS = 'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods';

export const PHOTOS = {
  /** Guangzhou consolidation floor — forklifts, containers, palletised cargo. */
  warehouseWide: `${AIR}/warehouse%20view.jpg`,
  /** Second warehouse aisle, crates and stacked cartons. */
  warehouseAisle: `${AIR}/view1.jpg`,
  warehouseFloor: `${AIR}/view2.jpg`,
  /** Receiving / storage. */
  depot: `${GOODS}/entrepot.jpg`,
  /** Customs clearance. */
  customs: `${GOODS}/douane.jpg`,
  /** Consignment packed and labelled, ready to load. */
  readyToLoad: `${GOODS}/pret.jpg`,
  loaded: `${GOODS}/ready.jpg`,
  support: `${AIR}/customer-support.png`,
} as const;

export const CATEGORY_PHOTOS = {
  autoParts: `${AIR}/auto%20part.jpg`,
  retail: `${AIR}/retails.jpg`,
  electronics: `${AIR}/tech.jpg`,
} as const;

export const APP_SCREENS = {
  tracking: `${AIR}/app-screen%20(1).jpg`,
  shipments: `${AIR}/app-screen%20(2).jpg`,
} as const;

export interface Carrier {
  name: string;
  src: string;
  /** 'sea' | 'air' — lets a bar show only the relevant half on service pages. */
  mode: 'sea' | 'air';
  /**
   * How the mark is drawn, which decides how it can be flattened for the dark
   * band.
   *
   *   'wordmark' — dark artwork on transparency. `brightness(0) invert(1)`
   *                turns it into a clean white silhouette.
   *   'filled'   — artwork containing a solid coloured shape (Maersk's cyan
   *                tile). The same filter turns that tile into a solid white
   *                block and loses the mark entirely, so these are desaturated
   *                and lifted instead, which keeps their internal structure.
   *
   * Getting this wrong is very visible: a white rectangle where a logo should
   * be reads as a broken image, which is the opposite of what a proof bar is for.
   */
  art?: 'wordmark' | 'filled';
}

/**
 * Carriers ChinaLink books through. These are third-party marks used
 * nominatively to state who moves the freight; they are shown at uniform height
 * and in monochrome, which is also what stops seven different brand palettes
 * from fighting each other.
 */
/*
 * Two carriers are deliberately absent, both for asset reasons rather than
 * commercial ones. Restoring either is a one-line change once the file is
 * replaced on the CDN.
 *
 *   MSC     `msc.png` is the mark of *MSC Cruises*, the passenger line — not
 *           MSC Mediterranean Shipping Company, the container carrier. A cruise
 *           operator on a freight forwarder's proof bar costs exactly the
 *           credibility the bar exists to build.
 *
 *   Maersk  `maersk.png` is a stacked lockup: a filled cyan tile above a
 *           near-black wordmark. On a dark band neither half survives — flatten
 *           it to white and the tile becomes a solid block, leave it alone and
 *           the wordmark disappears. It rendered as an empty grey square.
 *
 * What to upload for both: a horizontal (wordmark-beside-mark) PNG or SVG in
 * white on transparency. That is the form every other logo in this list takes,
 * and it is what the `wordmark` treatment is built for.
 */
export const CARRIERS: Carrier[] = [
  { name: 'CMA CGM', src: `${AIR}/cma-cgm.png`, mode: 'sea', art: 'wordmark' },
  { name: 'Hapag-Lloyd', src: `${AIR}/hapag.png`, mode: 'sea', art: 'wordmark' },
  { name: 'Evergreen', src: `${AIR}/evergreen.png`, mode: 'sea', art: 'wordmark' },
  { name: 'Ethiopian Cargo', src: `${AIR}/ethiopian.png`, mode: 'air', art: 'wordmark' },
  { name: 'Turkish Cargo', src: `${AIR}/turkish.png`, mode: 'air', art: 'wordmark' },
];
