/**
 * Current Pricing API Route
 * 
 * Returns current shipping rates for display in the guide.
 * In production, this could fetch from a database or external API.
 */

import { NextRequest, NextResponse } from 'next/server';

interface PricingData {
  express: number;
  standard: number;
  electronics: number;
  phones: number;
  sea: number;
  seaUnit: 'CBM';
  lastUpdated: string;
}

/**
 * GET handler for current pricing
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    // Current pricing data (in FCFA)
    // In production, this could be fetched from a database
    const pricingData: PricingData = {
      express: 16000,      // 16,000 FCFA/kg
      standard: 10000,     // 10,000 FCFA/kg
      electronics: 12000,  // 12,000 FCFA/kg
      phones: 12000,       // 12,000 FCFA/piece
      sea: 300000,         // 300,000 FCFA/CBM
      seaUnit: 'CBM',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(pricingData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
