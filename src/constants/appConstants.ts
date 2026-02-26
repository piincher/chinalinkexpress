/**
 * Application Constants
 * 
 * Global constants used throughout the application.
 * All constants should be UPPER_SNAKE_CASE for visibility.
 */

// App Info
export const APP_NAME = 'ChinaLink Express';
export const APP_SHORT_NAME = 'CLEXPRESS';
export const APP_TAGLINE = 'Votre Partenaire Logistique Chine-Afrique';

// Business Info
export const FOUNDING_YEAR = 2019;
export const YEARS_OF_EXPERIENCE = new Date().getFullYear() - FOUNDING_YEAR;

// Stats (numeric values for Counter animation)
export const STATS = {
  SHIPMENTS: { value: 12847, suffix: '+' },
  COUNTRIES: { value: 3, suffix: '+' },
  RATING: { value: 4.9, suffix: '/5', decimals: 1 },
  REVENUE: { value: 2.4, suffix: 'M+', prefix: '$' },
} as const;

// Legacy stats (for backward compatibility)
export const LEGACY_STATS = {
  SATISFIED_CLIENTS: '1000+',
  COUNTRIES_SERVED: '5+',
  SUCCESS_RATE: '89.8%',
  SUPPORT_HOURS: '24/7',
} as const;

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
