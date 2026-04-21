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
          locale: 'fr' | 'en' | 'zh' | 'ar';
          session_id: string | null;
          quiz_version: string;
          attribution: Json | null;
          dimensions: Json | null;
          recommendation: Json | null;
          lead_priority: number | null;
          lead_stage: string;
          ip_address: string | null;
          user_agent: string | null;
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
          locale?: 'fr' | 'en' | 'zh' | 'ar';
          session_id?: string | null;
          quiz_version?: string;
          attribution?: Json | null;
          dimensions?: Json | null;
          recommendation?: Json | null;
          lead_priority?: number | null;
          lead_stage?: string;
          ip_address?: string | null;
          user_agent?: string | null;
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
          locale?: 'fr' | 'en' | 'zh' | 'ar';
          session_id?: string | null;
          quiz_version?: string;
          attribution?: Json | null;
          dimensions?: Json | null;
          recommendation?: Json | null;
          lead_priority?: number | null;
          lead_stage?: string;
          ip_address?: string | null;
          user_agent?: string | null;
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
      quiz_events: {
        Row: {
          id: string;
          session_id: string;
          event_name: string;
          locale: 'fr' | 'en' | 'zh' | 'ar';
          question_id: number | null;
          answer_value: string | null;
          metadata: Json;
          attribution: Json;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          event_name: string;
          locale?: 'fr' | 'en' | 'zh' | 'ar';
          question_id?: number | null;
          answer_value?: string | null;
          metadata?: Json;
          attribution?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
      lead_profiles: {
        Row: {
          id: string;
          submission_id: string;
          whatsapp_number: string;
          score: number;
          category: 'hot' | 'warm' | 'cold';
          lead_priority: number;
          primary_service: string;
          shipping_mode: string;
          next_action: string;
          priority_reason: string;
          status: string;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          whatsapp_number: string;
          score: number;
          category: 'hot' | 'warm' | 'cold';
          lead_priority: number;
          primary_service: string;
          shipping_mode: string;
          next_action: string;
          priority_reason: string;
          status?: string;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          assigned_to?: string | null;
          updated_at?: string;
        };
      };
      message_events: {
        Row: {
          id: string;
          submission_token: string | null;
          message_type: string;
          provider: string;
          status: string;
          recipient: string;
          provider_message_id: string | null;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_token?: string | null;
          message_type: string;
          provider: string;
          status: string;
          recipient: string;
          provider_message_id?: string | null;
          error_message?: string | null;
          created_at?: string;
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

export type QuizEvent = Database['public']['Tables']['quiz_events']['Row'];
export type QuizEventInsert = Database['public']['Tables']['quiz_events']['Insert'];

export type LeadProfile = Database['public']['Tables']['lead_profiles']['Row'];
export type LeadProfileInsert = Database['public']['Tables']['lead_profiles']['Insert'];

export type MessageEvent = Database['public']['Tables']['message_events']['Row'];
export type MessageEventInsert = Database['public']['Tables']['message_events']['Insert'];
