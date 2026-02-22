/**
 * Application Configuration
 * 
 * Global application configuration and settings.
 */

export const APP_CONFIG = {
  NAME: 'ChinaLink Express',
  SHORT_NAME: 'CLE',
  DESCRIPTION: 'Solutions logistiques complètes pour le sourcing, achat et expédition de la Chine vers l\'Afrique',
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

export const META_CONFIG = {
  TITLE: 'ChinaLink Express | Sourcing & Expédition Chine-Afrique',
  DESCRIPTION: 'ChinaLink Express - Votre partenaire logistique de confiance pour le sourcing, l\'achat et l\'expédition de marchandises de la Chine vers le Mali et l\'Afrique. Devis gratuit.',
  KEYWORDS: [
    'ChinaLink Express',
    'sourcing Chine Afrique',
    'expédition Chine Mali',
    'fret maritime Chine Afrique',
    'fret aérien Chine Bamako',
    'logistique internationale',
    'import export Chine Afrique',
  ],
  URL: 'https://www.chinalinkexpress.com',
  IMAGE: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
  LOCALE: 'fr_FR',
  TWITTER_HANDLE: '@chinalinkexpress',
} as const;

export const CONTACT_CONFIG = {
  EMAIL: 'contact@chinalinkexpress.com',
  PHONE: {
    CHINA: '+86 188 5172 5957',
    MALI_1: '+223 5100 50 42',
    MALI_2: '+223 7669 61 77',
  },
  WHATSAPP: {
    CHINA: '+8618851725957',
    MALI: '+22376696177',
  },
  ADDRESS: {
    STREET: 'Kalaban Coura, près du lycée Birgo',
    CITY: 'Bamako',
    COUNTRY: 'Mali',
  },
  HOURS: {
    WEEKDAYS: { open: '08:00', close: '20:00' },
    SATURDAY: { open: '09:00', close: '17:00' },
    SUNDAY: { open: '10:00', close: '15:00' },
  },
} as const;

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/chinalinkexpress',
  INSTAGRAM: 'https://instagram.com/chinalinkexpress',
  LINKEDIN: 'https://linkedin.com/company/chinalinkexpress',
  TWITTER: 'https://twitter.com/chinalinkexpress',
} as const;
