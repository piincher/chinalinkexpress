/**
 * Supabase Database Types
 * 
 * TypeScript definitions for all database tables and operations.
 * This ensures type safety across the entire application.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      quiz_submissions: {
        Row: {
          id: string;
          whatsapp_number: string;
          answers: Json;
          score: number;
          category: 'hot' | 'warm' | 'cold';
          guide_token: string;
          guide_opened: boolean;
          guide_opened_at: string | null;
          follow_up_sent: boolean;
          follow_up_sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          whatsapp_number: string;
          answers: Json;
          score: number;
          category: 'hot' | 'warm' | 'cold';
          guide_token: string;
          guide_opened?: boolean;
          guide_opened_at?: string | null;
          follow_up_sent?: boolean;
          follow_up_sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          whatsapp_number?: string;
          answers?: Json;
          score?: number;
          category?: 'hot' | 'warm' | 'cold';
          guide_token?: string;
          guide_opened?: boolean;
          guide_opened_at?: string | null;
          follow_up_sent?: boolean;
          follow_up_sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      guide_access_logs: {
        Row: {
          id: string;
          guide_token: string;
          ip_address: string | null;
          user_agent: string | null;
          accessed_at: string;
        };
        Insert: {
          id?: string;
          guide_token: string;
          ip_address?: string | null;
          user_agent?: string | null;
          accessed_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for common operations
export type QuizSubmission = Database['public']['Tables']['quiz_submissions']['Row'];
export type QuizSubmissionInsert = Database['public']['Tables']['quiz_submissions']['Insert'];
export type QuizSubmissionUpdate = Database['public']['Tables']['quiz_submissions']['Update'];

export type GuideAccessLog = Database['public']['Tables']['guide_access_logs']['Row'];
export type GuideAccessLogInsert = Database['public']['Tables']['guide_access_logs']['Insert'];
