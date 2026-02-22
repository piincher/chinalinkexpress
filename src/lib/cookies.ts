/**
 * Cookie Utilities
 * 
 * SSR-safe cookie helpers for client and server usage.
 * Part of the lib utilities.
 */

import { isServer } from './utils';

/**
 * Get a cookie value by name (client-side only)
 */
export function getCookie(name: string): string | undefined {
  if (isServer()) return undefined;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  
  return undefined;
}

/**
 * Set a cookie with options
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    sameSite?: 'strict' | 'lax' | 'none';
    secure?: boolean;
  } = {}
): void {
  if (isServer()) return;
  
  const {
    days = 365,
    path = '/',
    sameSite = 'lax',
    secure = window.location.protocol === 'https:',
  } = options;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  let cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path};SameSite=${sameSite}`;
  
  if (secure) {
    cookieString += ';secure';
  }
  
  document.cookie = cookieString;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
  if (isServer()) return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}

/**
 * Parse cookie string into object (useful for server-side)
 */
export function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  
  return cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value !== undefined) {
      acc[name] = decodeURIComponent(value);
    }
    return acc;
  }, {} as Record<string, string>);
}
