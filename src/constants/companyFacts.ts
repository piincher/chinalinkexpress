/**
 * Verified company facts — the only place the marketing site takes a number from.
 *
 * Every figure below was recomputed directly from the production database on
 * 2026-08-22 and each one carries the query that produced it. Nothing here is
 * rounded up, extrapolated, or "industry standard".
 *
 * Why this file exists: the site was shipping fabricated social proof. The
 * landing page rendered `1,247 clients` and `12,847 expéditions` from hard-coded
 * constants, a `4.8` average "basé sur 312 avis clients vérifiés", and the
 * LocalBusiness JSON-LD declared an `aggregateRating` of 4.8 from 127 reviews —
 * while the `reviews` collection holds **two** documents, total. Four invented
 * customer reviews (Amadou Diallo, Fatou Keita, Moussa Traore, Aisha Cissé,
 * with invented dates and an invented €5,000 scam story) sat in the review
 * schema generator as its default payload.
 *
 * Invented review markup is not a style problem. It is a Google structured-data
 * policy violation that carries a manual action, and it is the one thing that
 * would cost this brand more than a plain page ever could. It is all gone.
 *
 * The real numbers turn out to be the better argument anyway: 890 shipments and
 * 253 clients from a company that opened its Bamako office in 2019 is a
 * believable, checkable operation. 12,847 is a number nobody believes.
 *
 * ── HOW TO REFRESH ─────────────────────────────────────────────────────────
 * Run the queries in the comments against production (read-only), then update
 * both the value and `VERIFIED_ON`. Do not update one without the other.
 */

/** The date every figure below was last recomputed from production. */
export const VERIFIED_ON = '2026-08-22';

/**
 * Shipments handled end to end, deduplicated across the v1 and v2 schemas.
 *
 *   db.orders.countDocuments({})                                    →  857
 *   db.goods.countDocuments({ orderId: {$in: [null]} , ...absent }) →   33
 *   ────────────────────────────────────────────────────────────────────────
 *                                                                      890
 *
 * The dedup matters: 121 of the 154 `goods` documents carry an `orderId`, and
 * all 81 distinct values resolve to a real `orders` document — so adding the two
 * collections naively would double-count 121 shipments. Only the 33 goods with
 * no order link are new shipments.
 */
export const SHIPMENTS_HANDLED = 890;

/**
 * Distinct clients who have had at least one shipment move through the system
 * and who still exist as a user record.
 *
 *   union(db.orders.distinct('userId'), db.goods.distinct('clientId'))  → 262
 *   …of which still resolve to a users document                        → 253
 *
 * 253, not 262: nine ids belong to records that have since been removed, and a
 * client we cannot point at is not a client we get to count.
 */
export const CLIENTS_SERVED = 253;

/**
 * Clients who shipped in the last twelve months.
 *
 *   db.orders.distinct('userId', { createdAt: { $gte: now - 365d } }) → 97
 *
 * The honest activity figure, and a far more useful one than a lifetime total:
 * it says the operation is running now, not that it once ran.
 */
export const CLIENTS_ACTIVE_12M = 97;

/**
 * Year the Bamako operation was founded. Carried over from the existing site
 * configuration — it predates the platform (the oldest order in the database is
 * 2024-05-31) and is therefore a business claim, not a database fact.
 */
export const FOUNDING_YEAR = 2019;

/** Whole years of operation, derived so it can never go stale. */
export const yearsOperating = (): number => new Date().getFullYear() - FOUNDING_YEAR;

/**
 * The two Chinese warehouses, from `db.warehouseaddresses` — both `active`.
 *
 * These are the addresses clients' suppliers actually deliver to, one per
 * shipping mode. They are the most specific true thing this company can say
 * about itself, and until now the site said neither: the About section named
 * "Foshan Lishui" and the journey copy named "Guangzhou", each half right.
 *
 * The street lines are deliberately NOT published here. They are operational
 * data given to registered clients with their warehouse code; the city and the
 * mode are what a prospect needs to know.
 */
export const WAREHOUSES = [
  { mode: 'AIR', city: 'Guangzhou', district: 'Zengcheng', province: 'Guangdong' },
  { mode: 'SEA', city: 'Foshan', district: 'Nanhai', province: 'Guangdong' },
] as const;

/** Transit windows, unchanged — these are the figures quoted to clients. */
export const TRANSIT_DAYS = {
  AIR: { min: 14, max: 21 },
  SEA: { min: 60, max: 75 },
} as const;

/**
 * Free storage window at the Bamako warehouse, and what is charged after it.
 *
 * Unlike everything above, this is a policy rather than a measurement — but it
 * lives here for the same reason: it is a number the site states publicly, and
 * a customer will hold the company to whatever this page says.
 *
 * The authority is the API's `DEFAULT_PICKUP_POLICY`
 * (`src/v2/services/paymentDueService.js`), which is what the app's reminder
 * messages, the WhatsApp chase templates and the overdue calculations all read.
 * These values mirror it exactly. **If the policy changes there, change it
 * here in the same commit** — the site quoting 72h while the app bills from 48h
 * is the kind of contradiction a client screenshots.
 *
 * Note `feePerDayScope`: the fee applies per day AND per shipment, not per
 * client. A customer leaving three shipments uncollected accrues three times
 * the daily fee, and the FAQ says so rather than letting them discover it on
 * an invoice.
 */
export const PICKUP_POLICY = {
  freeHours: 72,
  feePerDay: 3000,
  currency: 'FCFA',
  feePerDayScope: 'PER_SHIPMENT',
} as const;

/**
 * Reviews collected in-app. Verified against prod 2026-09-01:
 *
 *   db.reviews.countDocuments({ status: 'ACTIVE' })                → 4
 *   avg(rating)                                                    → 4.75
 *   with a written comment                                         → 2
 *
 * This constant is now a floor for copy, not a data source. The reviews
 * themselves — and the average — are fetched live from
 * `GET /api/v2/public/reviews` (see `lib/publicReviewsApi.ts`) and rendered on
 * the home page, /calculateur and /avis. Nothing on the site hardcodes a
 * rating.
 *
 * The rule it was written for still stands and is the reason no page emits
 * `aggregateRating` markup: four ratings is not a defensible average to hand a
 * search engine, and reviews a business collects about itself are not eligible
 * for review rich results in the first place. Display them to readers; do not
 * claim a star in the SERP for them.
 */
export const REVIEWS_COLLECTED = 4;
