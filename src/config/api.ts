/**
 * API Configuration
 * 
 * Centralized API configuration for the application.
 * All API-related constants should be defined here.
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.chinalinkexpress.com',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  VERSION: 'v1',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  SHIPMENTS: {
    LIST: '/shipments',
    DETAIL: (id: string) => `/shipments/${id}`,
    TRACK: (trackingNumber: string) => `/shipments/track/${trackingNumber}`,
    CREATE: '/shipments',
    UPDATE: (id: string) => `/shipments/${id}`,
    DELETE: (id: string) => `/shipments/${id}`,
  },
  QUOTES: {
    REQUEST: '/quotes',
    LIST: '/quotes',
    DETAIL: (id: string) => `/quotes/${id}`,
  },
  CONTACT: {
    SEND: '/contact',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    PREFERENCES: '/user/preferences',
  },
} as const;
