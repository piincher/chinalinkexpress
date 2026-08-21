/**
 * The lanes, as real coordinates.
 *
 * The existing `hero-animation/constants.ts` stores cities as normalised x/y
 * for a flat map, which cannot be projected onto a sphere. These are true
 * lat/lng so the arcs follow real great circles — the geography has to be right
 * or the thing reads as decoration rather than as a network map.
 *
 * ── ⚠ NEEDS BUSINESS CONFIRMATION ─────────────────────────────────────────
 *
 * This file's header used to assert "Only lanes the company actually serves
 * are here". Checked against production (2026-08-22), that is confirmed for
 * Mali and unconfirmed for everywhere else:
 *
 *   Bamako      857 v1 orders + 154 v2 goods — every shipment on record
 *   everywhere   0 shipments on record
 *   else
 *
 * That does not make the other nine lanes false. ChinaLink may well move
 * freight to Dakar, Abidjan or Lagos through partners without those shipments
 * ever entering this system, and the site has service pages targeting all of
 * them. But it does mean nobody can currently verify them, and both the globe
 * and the scrolling ticker state them to every visitor as fact.
 *
 * Each lane now carries a `verified` flag saying which of the two it is. The
 * flag is not yet used to filter anything — that is the owner's call, not a
 * decision to make silently — but it makes the distinction explicit, and
 * `LANES.filter(l => l.verified)` is the one-line change if the answer is that
 * the corridor really is Mali-only.
 *
 * Ordered Mali-first so the ticker opens on the lanes that are certain.
 */

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Origins are Chinese consolidation points; destinations are African delivery cities. */
  kind: 'origin' | 'destination' | 'hub';
  /** Drives marker size and whether the label is worth drawing. 1 = primary. */
  weight: number;
}

export const PLACES: Place[] = [
  // — China: where goods are bought and consolidated
  { id: 'guangzhou', name: 'Guangzhou', lat: 23.13, lng: 113.26, kind: 'origin', weight: 1 },
  { id: 'foshan', name: 'Foshan', lat: 23.02, lng: 113.12, kind: 'origin', weight: 0.8 },
  { id: 'shenzhen', name: 'Shenzhen', lat: 22.54, lng: 114.06, kind: 'origin', weight: 0.7 },
  { id: 'yiwu', name: 'Yiwu', lat: 29.31, lng: 120.07, kind: 'origin', weight: 0.6 },

  // — Transit hubs the air lanes actually route through
  { id: 'dubai', name: 'Dubai', lat: 25.2, lng: 55.27, kind: 'hub', weight: 0.5 },
  { id: 'addis', name: 'Addis Ababa', lat: 9.03, lng: 38.74, kind: 'hub', weight: 0.5 },

  // — West Africa: delivery
  { id: 'bamako', name: 'Bamako', lat: 12.64, lng: -8.0, kind: 'destination', weight: 1 },
  { id: 'dakar', name: 'Dakar', lat: 14.72, lng: -17.47, kind: 'destination', weight: 0.7 },
  { id: 'abidjan', name: 'Abidjan', lat: 5.36, lng: -4.01, kind: 'destination', weight: 0.7 },
  { id: 'conakry', name: 'Conakry', lat: 9.64, lng: -13.58, kind: 'destination', weight: 0.6 },
  { id: 'lome', name: 'Lomé', lat: 6.13, lng: 1.22, kind: 'destination', weight: 0.6 },
  { id: 'cotonou', name: 'Cotonou', lat: 6.37, lng: 2.42, kind: 'destination', weight: 0.6 },
  { id: 'lagos', name: 'Lagos', lat: 6.52, lng: 3.38, kind: 'destination', weight: 0.7 },
  { id: 'accra', name: 'Accra', lat: 5.6, lng: -0.19, kind: 'destination', weight: 0.6 },
  { id: 'niamey', name: 'Niamey', lat: 13.51, lng: 2.11, kind: 'destination', weight: 0.55 },
  { id: 'ouaga', name: 'Ouagadougou', lat: 12.37, lng: -1.52, kind: 'destination', weight: 0.55 },
];

export interface Lane {
  from: string;
  to: string;
  /** Primary lanes draw brighter and carry a travelling pulse. */
  primary?: boolean;
  /**
   * true  — shipments on this lane exist in the production database.
   * false — plausible, advertised on the service pages, but unconfirmed.
   * See the file header before rendering these differently.
   */
  verified: boolean;
}

export const LANES: Lane[] = [
  // Confirmed against production: every shipment on record lands in Bamako.
  { from: 'guangzhou', to: 'bamako', primary: true, verified: true },
  { from: 'foshan', to: 'bamako', primary: true, verified: true },

  // Advertised on the service and route pages; no shipments on record.
  { from: 'guangzhou', to: 'dakar', verified: false },
  { from: 'guangzhou', to: 'abidjan', verified: false },
  { from: 'foshan', to: 'conakry', verified: false },
  { from: 'shenzhen', to: 'lagos', verified: false },
  { from: 'shenzhen', to: 'lome', verified: false },
  { from: 'yiwu', to: 'cotonou', verified: false },
  { from: 'guangzhou', to: 'accra', verified: false },
  { from: 'foshan', to: 'niamey', verified: false },
  { from: 'shenzhen', to: 'ouaga', verified: false },
];

const byId = new Map(PLACES.map((p) => [p.id, p]));
export const getPlace = (id: string) => byId.get(id);

/** Route pairs for the ticker, derived so the two can never disagree. */
export const LANE_LABELS = LANES.map(
  (l) => `${getPlace(l.from)?.name} → ${getPlace(l.to)?.name}`
);
