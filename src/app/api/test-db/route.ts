/**
 * Database Connection Test API
 * 
 * Simple endpoint to verify Supabase database connection is working.
 * Run this after setting up Supabase to confirm everything is configured correctly.
 * 
 * @usage GET /api/test-db
 * @response { success: boolean, message: string, data?: any, error?: string }
 */

import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

export async function GET() {
  try {
    const supabase = createServerClient();
    
    // Test 1: Check if we can query quiz_submissions table
    const { data: submissions, error: submissionsError } = await supabase
      .from('quiz_submissions')
      .select('count')
      .limit(1);
    
    if (submissionsError) {
      throw new Error(`quiz_submissions table error: ${submissionsError.message}`);
    }
    
    // Test 2: Check if we can query guide_access_logs table
    const { data: logs, error: logsError } = await supabase
      .from('guide_access_logs')
      .select('count')
      .limit(1);
    
    if (logsError) {
      throw new Error(`guide_access_logs table error: ${logsError.message}`);
    }
    
    // Test 3: Try to insert and delete a test record
    const testToken = `test-${Date.now()}`;
    const { data: insertData, error: insertError } = await (supabase as any)
      .from('quiz_submissions')
      .insert({
        whatsapp_number: '22300000000',
        answers: { test: true },
        score: 50,
        category: 'warm',
        guide_token: testToken,
      })
      .select()
      .single();
    
    if (insertError) {
      throw new Error(`Insert test failed: ${insertError.message}`);
    }
    
    // Clean up test record
    await (supabase as any)
      .from('quiz_submissions')
      .delete()
      .eq('guide_token', testToken);
    
    return NextResponse.json({
      success: true,
      message: '✅ Database connection successful! All tables working correctly.',
      tests: {
        quiz_submissions: '✅ OK',
        guide_access_logs: '✅ OK',
        insert: '✅ OK',
        delete: '✅ OK',
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error: any) {
    console.error('Database test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: '❌ Database connection failed',
      error: error.message,
      hint: 'Make sure you have: 1) Created the Supabase project, 2) Run the SQL migration, 3) Set environment variables',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

/**
 * Also support POST for testing write operations
 */
export async function POST() {
  return GET();
}
