/**
 * Price Lock API Route
 * 
 * Locks current pricing for a user for a limited time (e.g., 24 hours).
 * This creates a commitment to the current rates.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';

interface PriceLockRequest {
  prices: {
    express: number;
    standard: number;
    electronics: number;
    phones: number;
    sea: number;
  };
  whatsappNumber?: string;
}

interface PriceLockResponse {
  lockId: string;
  expiresAt: string;
  lockedPrices: PriceLockRequest['prices'];
}

/**
 * POST handler to create a price lock
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: PriceLockRequest = await request.json();
    
    // Validate request
    if (!body.prices) {
      return NextResponse.json(
        { error: 'Prices are required' },
        { status: 400 }
      );
    }

    // Generate lock ID and expiration (24 hours from now)
    const lockId = `lock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // In production, you would save this to a database
    // For now, we just return the lock details
    const response: PriceLockResponse = {
      lockId,
      expiresAt: expiresAt.toISOString(),
      lockedPrices: body.prices,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error creating price lock:', error);
    return NextResponse.json(
      { error: 'Failed to lock price' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
