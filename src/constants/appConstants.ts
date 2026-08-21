/**
 * Application Constants
 * 
 * Global constants used throughout the application.
 * All constants should be UPPER_SNAKE_CASE for visibility.
 */

// App Info
export const APP_NAME = 'ChinaLink Express';
export const APP_SHORT_NAME = 'CLEXPRESS';
/**
 * "Votre partenaire logistique Chine-Afrique" said nothing: it is the sentence
 * on every freight forwarder's homepage, and it describes the category rather
 * than this company. The tagline now names the route and the promise.
 */
export const APP_TAGLINE = 'De votre fournisseur en Chine jusqu\'à Bamako';

/**
 * Business figures live in `companyFacts.ts`, where each one carries the
 * production query that produced it and a verification date.
 *
 * What used to be here — `STATS` (12,847 shipments / 1,247 clients / 4.8 rating
 * / $2.4M revenue) and `LEGACY_STATS` (1000+ clients / 89.8% success rate) —
 * was fabricated. Two of those figures contradicted each other on the same page.
 * Do not reintroduce a number in this file; import it from companyFacts.
 */
export {
  FOUNDING_YEAR,
  SHIPMENTS_HANDLED,
  CLIENTS_SERVED,
  CLIENTS_ACTIVE_12M,
  yearsOperating,
} from './companyFacts';

// Shipping Times
export const SHIPPING_TIMES = {
  AIR: {
    MIN_DAYS: 14,
    MAX_DAYS: 21,
    EXPRESS_MIN: 2,
    EXPRESS_MAX: 5,
  },
  SEA: {
    MIN_DAYS: 60,
    MAX_DAYS: 75,
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '#about',
  SERVICES: '#services',
  WHY_US: '#why-us',
  CONTACT: '#contact',
  FAQ: '#faq',
  TRACKING: '/tracking',
  GET_QUOTE: '/quote',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

// Animation Constants
export const ANIMATION = {
  TYPING_SPEED: 150,
  TYPING_DELETE_SPEED: 50,
  TYPING_PAUSE: 1000,
  SCROLL_OFFSET: 80,
  MOBILE_BREAKPOINT: 1024,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'cle_token',
  USER: 'cle_user',
  PREFERENCES: 'cle_preferences',
  CART: 'cle_cart',
  THEME: 'cle_theme',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
  NETWORK: 'Problème de connexion. Vérifiez votre internet.',
  NOT_FOUND: 'Page non trouvée.',
  UNAUTHORIZED: 'Vous devez être connecté pour accéder à cette page.',
  FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires.',
} as const;
