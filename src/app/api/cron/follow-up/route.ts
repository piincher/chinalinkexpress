/**
 * Follow-Up Cron Job API Route
 *
 * Scheduled endpoint for processing follow-up WhatsApp messages.
 * Called by external cron service (e.g., Vercel Cron, GitHub Actions).
 *
 * Security:
 * - Requires secret key in Authorization header
 * - CRON_SECRET from env var
 *
 * Response: { processed: 10, sent: 8, failed: 2 }
 */

import { NextRequest, NextResponse } from 'next/server';
import { processFollowUps, ProcessStats } from '@/lib/wasender/scheduler';

// Response types
interface CronSuccessResponse {
  success: true;
  processed: number;
  sent: number;
  failed: number;
  timestamp: string;
}

interface CronErrorResponse {
  success: false;
  error: string;
  timestamp: string;
}

type CronResponse = CronSuccessResponse | CronErrorResponse;

/**
 * Verify cron secret from Authorization header
 */
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error('CRON_SECRET environment variable not configured');
    return false;
  }

  if (!authHeader) {
    console.error('Missing Authorization header');
    return false;
  }

  // Expected format: "Bearer {CRON_SECRET}"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    console.error('Invalid Authorization header format');
    return false;
  }

  const providedSecret = parts[1];
  return providedSecret === cronSecret;
}

/**
 * GET handler for cron job
 *
 * Triggered by external scheduler to process follow-up messages.
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<CronResponse>> {
  const timestamp = new Date().toISOString();

  try {
    // 1. Verify cron secret (Authorization header)
    if (!verifyCronSecret(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Invalid or missing CRON_SECRET',
          timestamp,
        },
        { status: 401 }
      );
    }

    // 2. Call processFollowUps()
    const stats = await processFollowUps();

    // 3. Return stats
    return NextResponse.json({
      success: true,
      processed: stats.total,
      sent: stats.sent,
      failed: stats.failed,
      timestamp,
    });
  } catch (error) {
    console.error('Error in follow-up cron job:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        timestamp,
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler (alternative to GET for some cron services)
 *
 * Some cron job services prefer POST requests.
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<CronResponse>> {
  // Reuse GET handler logic
  return GET(request);
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
