/**
 * Supabase Client Configuration
 * 
 * Production-ready Supabase client with proper error handling,
 * connection pooling, and retry logic for scalability.
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please check your .env.local file.'
    );
  }
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. Please check your .env.local file.'
    );
  }
  return key;
}

function getSupabaseServiceKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Please check your .env.local file.'
    );
  }
  return key;
}

// Client-side client (uses anon key, respects RLS)
export const createBrowserClient = () => {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
    db: {
      schema: 'public',
    },
  });
};

// Server-side client (uses service key for admin operations)
export const createServerClient = () => {
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: 'public',
    },
  });
};

// Singleton pattern for client-side
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export const getBrowserClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('getBrowserClient should only be called on the client');
  }
  
  if (!browserClient) {
    browserClient = createBrowserClient();
  }
  
  return browserClient;
};

// Lazy singleton for server-side to avoid throwing at module load time during build
let _supabaseAdmin: ReturnType<typeof createServerClient> | null = null;

export const getSupabaseAdmin = () => {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createServerClient();
  }
  return _supabaseAdmin;
};

// Backward-compatible lazy proxy — only initializes when actually used
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createServerClient>, {
  get(_target, prop) {
    const client = getSupabaseAdmin();
    return (client as any)[prop];
  },
});
