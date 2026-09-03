/**
 * Occasion content in the reader's language.
 *
 * The API is a French-first system: it sends `targetDateLabel` already
 * formatted as "1 octobre 2026", a `name` typed in French by an admin, and
 * French goods suggestions. Rendered under an English UI that produced a page
 * reading "Ship before 13 septembre 2026" — the chrome translated, the content
 * did not, which is the worst of both.
 *
 * Three different problems, three different honest answers:
 *
 *  1. **Dates are data, not text.** The payload carries ISO instants
 *     (`targetDate`, `lane.recommendedCutoff`), so the label is reformatted in
 *     the reader's locale and the server's French string is simply unused. No
 *     information is invented and nothing is recomputed — the *instant* still
 *     comes from the server, only its rendering is local.
 *  2. **Occasion names are a closed set.** `key` is a stable slug
 *     ("rentree-scolaire-2026"), so the family maps to a translated name and
 *     the year comes from the key itself. An unknown family falls back to the
 *     server's French name, because a missing translation must degrade to real
 *     content rather than to a slug.
 *  3. **Goods suggestions are open-ended French content.** They are translated
 *     term by term where we know the term and left alone where we do not. A
 *     recognisable French word beats an omission: the reader can still see what
 *     people ship for Ramadan.
 *
 * The real end of this is translated content in the calendar admin. Until then
 * this keeps the page honest in four languages instead of one.
 */

import type { CustomerOccasion, OccasionLane } from '@/lib/publicOccasionsApi';

type Locale = string;

/** Occasion families, keyed by the slug prefix the API mints. */
const OCCASION_NAMES: Record<string, Record<Locale, string>> = {
  ramadan: { en: 'Ramadan', ar: 'رمضان', zh: '斋月' },
  'rentree-scolaire': { en: 'Back to school', ar: 'العودة إلى المدرسة', zh: '开学季' },
  'fetes-fin-annee': { en: 'End-of-year holidays', ar: 'أعياد نهاية العام', zh: '年末假期' },
  'independance-mali': { en: 'Mali Independence Day', ar: 'عيد استقلال مالي', zh: '马里独立日' },
  tabaski: { en: 'Tabaski (Eid al-Adha)', ar: 'عيد الأضحى', zh: '宰牲节' },
  korite: { en: 'Korité (Eid al-Fitr)', ar: 'عيد الفطر', zh: '开斋节' },
};

/** The recurring product words. Unknown terms pass through untouched. */
const GOODS_TERMS: Record<string, Record<Locale, string>> = {
  vêtements: { en: 'clothing', ar: 'ملابس', zh: '服装' },
  chaussures: { en: 'shoes', ar: 'أحذية', zh: '鞋类' },
  'articles de prière': { en: 'prayer items', ar: 'مستلزمات الصلاة', zh: '祈祷用品' },
  'ustensiles de cuisine': { en: 'kitchenware', ar: 'أدوات المطبخ', zh: '厨具' },
  emballages: { en: 'packaging', ar: 'تغليف', zh: '包装' },
  décoration: { en: 'decoration', ar: 'ديكور', zh: '装饰' },
  décorations: { en: 'decorations', ar: 'ديكورات', zh: '装饰品' },
  'produits ménagers': { en: 'household goods', ar: 'مستلزمات منزلية', zh: '家居用品' },
  uniformes: { en: 'uniforms', ar: 'أزياء مدرسية', zh: '校服' },
  cartables: { en: 'school bags', ar: 'حقائب مدرسية', zh: '书包' },
  cahiers: { en: 'notebooks', ar: 'دفاتر', zh: '笔记本' },
  'fournitures scolaires': { en: 'school supplies', ar: 'لوازم مدرسية', zh: '文具' },
  'boîtes à goûter': { en: 'lunch boxes', ar: 'علب الطعام', zh: '午餐盒' },
  'matériel pédagogique': { en: 'teaching materials', ar: 'مواد تعليمية', zh: '教学用品' },
  cadeaux: { en: 'gifts', ar: 'هدايا', zh: '礼品' },
  jouets: { en: 'toys', ar: 'ألعاب', zh: '玩具' },
  'matériel de restauration': { en: 'catering equipment', ar: 'معدات المطاعم', zh: '餐饮设备' },
  'matériel événementiel': { en: 'event equipment', ar: 'معدات الفعاليات', zh: '活动设备' },
  textiles: { en: 'textiles', ar: 'منسوجات', zh: '纺织品' },
  drapeaux: { en: 'flags', ar: 'أعلام', zh: '旗帜' },
  'articles de cérémonie': { en: 'ceremonial items', ar: 'مستلزمات الاحتفال', zh: '典礼用品' },
  sonorisation: { en: 'sound systems', ar: 'أنظمة صوتية', zh: '音响设备' },
};

/** BCP-47 tag for Intl. The API's locales are plain two-letter codes. */
const intlLocale = (locale: Locale): string =>
  ({ fr: 'fr-FR', en: 'en-GB', ar: 'ar', zh: 'zh-CN' })[locale] ?? locale;

/**
 * A date the reader can read, from the instant the server decided.
 *
 * Returns null rather than a broken string when the ISO value is missing or
 * unparseable, so a caller can fall back to the server's own label instead of
 * printing "Invalid Date" on a marketing page.
 */
export const formatOccasionDate = (iso: string | null | undefined, locale: Locale): string | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  try {
    return new Intl.DateTimeFormat(intlLocale(locale), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      // The API's dates are calendar days stamped at UTC midnight; formatting
      // them in the browser's zone would slide them a day west of Greenwich.
      timeZone: 'UTC',
    }).format(date);
  } catch {
    return null;
  }
};

/** "rentree-scolaire-2026" → { family: "rentree-scolaire", year: "2026" } */
const splitKey = (key: string): { family: string; year: string | null } => {
  const match = /^(.*?)-((?:19|20)\d{2})$/.exec(key ?? '');
  return match ? { family: match[1], year: match[2] } : { family: key ?? '', year: null };
};

export const localizeOccasionName = (occasion: CustomerOccasion, locale: Locale): string => {
  if (locale === 'fr') return occasion.name;
  const { family, year } = splitKey(occasion.key);
  const translated = OCCASION_NAMES[family]?.[locale];
  // No translation for this family: the French name is real content and a
  // better answer than a slug or a blank.
  if (!translated) return occasion.name;
  return year ? `${translated} ${year}` : translated;
};

export const localizeGoodsSuggestion = (term: string, locale: Locale): string => {
  if (locale === 'fr') return term;
  return GOODS_TERMS[term.trim().toLowerCase()]?.[locale] ?? term;
};

/** Cutoff label in the reader's locale, falling back to the server's string. */
export const localizeLaneCutoff = (lane: OccasionLane, locale: Locale): string | null =>
  formatOccasionDate(lane.recommendedCutoff, locale) ?? lane.recommendedCutoffLabel;

export const localizeTargetDate = (occasion: CustomerOccasion, locale: Locale): string | null =>
  formatOccasionDate(occasion.targetDate, locale) ?? occasion.targetDateLabel;
