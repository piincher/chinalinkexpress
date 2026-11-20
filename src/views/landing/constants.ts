/**
 * Landing Page Constants
 * 
 * Feature-specific constants for the landing page.
 * Keeping constants close to where they are used.
 */

import type { Partner, Testimonial } from '@/types';
import { WHATSAPP_SALES, whatsappUrl } from '@/constants/contact';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr Touré',
    company: 'Docteur',
    text: "Ça me fais plus de deux ans dans le système j'ai jamais travaillé avec une agence aussi organisée que la vôtre ! Continue dans ce sens tout le Mali viendra vers vous ou tout les autres vont vous imité !",
    rating: 5,
    image: 'https://placehold.co/100x100/6366F1/FFFFFF?text=DT',
  },
  {
    id: '2',
    name: 'Ousmane Diallo',
    company: 'AfricaDecor',
    text: "l'achat et l'expédition des colis de la Chine vers le Mali. Le suivi du colis, le temps de l'expédition, l'information. tout est professionnel. Merci",
    rating: 5,
    image: 'https://placehold.co/100x100/EC4899/FFFFFF?text=OD',
  },
  {
    id: '3',
    name: "Maimouna Matel N'Diaye",
    // Employer name removed: it reads as the bank's endorsement. Restore only with her written consent.
    company: '',
    text: 'Ils sont impeccables. Les délais communiqués sont respectes. Bon.courage',
    rating: 5,
    image: 'https://placehold.co/100x100/10B981/FFFFFF?text=MN',
  },
];

export const PARTNERS: Partner[] = [
  { id: 'maersk', name: 'MAERSK', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png' },
  { id: 'cma-cgm', name: 'CMA-CGM', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png' },
  { id: 'hapag-lloyd', name: 'HAPAG-LLOYD', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png' },
  { id: 'evergreen', name: 'EVERGREEN', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/evergreen.png' },
  { id: 'msc', name: 'MSC', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/msc.png' },
  { id: 'ethiopian', name: 'ETHIOPIAN', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png' },
  { id: 'turkish', name: 'TURKISH AIRLINES', logo: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png' },
];

export const HERO_WHATSAPP_URL = whatsappUrl(
  WHATSAPP_SALES,
  "Bonjour ChinaLink Express, j'aimerais avoir des informations pour une expédition depuis la Chine."
);

export const SECTION_IDS = {
  HERO: 'hero',
  STATS: 'stats',
  LIVE_FEED: 'live-feed',
  ABOUT: 'about',
  COMPARISON: 'comparison',
  SERVICES: 'services',
  WHY_US: 'why-us',
  TESTIMONIALS: 'testimonials',
  PARTNERS: 'partners',
  SUCCESS_STORIES: 'success-stories',
  FAQ: 'faq',
  CONTACT: 'contact',
} as const;
