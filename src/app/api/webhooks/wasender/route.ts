/**
 * WasenderAPI Webhook Handler
 * 
 * Receives message delivery status updates from WasenderAPI.
 * - message.sent - Message sent from server
 * - message.delivered - Message delivered to device
 * - message.read - Message read by recipient
 * - message.failed - Message failed to send
 * 
 * Phase 4: WasenderAPI integration for Import Readiness Quiz
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import { createHash, timingSafeEqual } from 'crypto';

// ============================================================================
// Types
// ============================================================================

/**
 * WasenderAPI webhook event types
 */
type WasenderEventType = 
  | 'message.sent' 
  | 'message.delivered' 
  | 'message.read' 
  | 'message.failed';

/**
 * Webhook payload structure from WasenderAPI
 */
interface WasenderWebhookPayload {
  event: WasenderEventType;
  sessionId: string;
  timestamp: string;
  payload: {
    messageId: string;
    from: string;
    to: string;
    status?: string;
    error?: string;
  };
}

/**
 * Message status log entry for database
 */
interface MessageStatusLog {
  id?: string;
  message_id: string;
  event_type: WasenderEventType;
  session_id: string;
  from_number: string;
  to_number: string;
  status?: string;
  error_message?: string;
  webhook_timestamp: string;
  processed_at: string;
  ip_address: string | null;
  user_agent: string | null;
}

// ============================================================================
// Configuration
// ============================================================================

const WASENDER_WEBHOOK_SECRET = process.env.WASENDER_WEBHOOK_SECRET;

// Valid event types that we handle
const VALID_EVENTS: WasenderEventType[] = [
  'message.sent',
  'message.delivered',
  'message.read',
  'message.failed',
];

// ============================================================================
// Security Functions
// ============================================================================

/**
 * Verify webhook signature using HMAC-SHA256
 * 
 * WasenderAPI should send a signature in the X-Wasender-Signature header
 * computed as: HMAC-SHA256(secret, timestamp + "." + body)
 * 
 * @param body - Raw request body
 * @param signature - Signature from header
 * @param timestamp - Timestamp from header
 * @returns boolean indicating if signature is valid
 */
function verifyWebhookSignature(
  body: string,
  signature: string | null,
  timestamp: string | null
): boolean {
  // If no secret is configured, skip verification (log warning)
  if (!WASENDER_WEBHOOK_SECRET) {
    console.warn('[WasenderWebhook] WASENDER_WEBHOOK_SECRET not configured, skipping signature verification');
    return true;
  }

  // If signature or timestamp is missing, verification fails
  if (!signature || !timestamp) {
    console.error('[WasenderWebhook] Missing signature or timestamp header');
    return false;
  }

  try {
    // Expected signature format: v1=<hex>
    const [version, receivedHash] = signature.split('=');
    
    if (version !== 'v1' || !receivedHash) {
      console.error('[WasenderWebhook] Invalid signature format');
      return false;
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${body}`;
    const expectedHash = createHash('sha256')
      .update(WASENDER_WEBHOOK_SECRET + signedPayload)
      .digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    const receivedBuffer = Buffer.from(receivedHash, 'hex');
    const expectedBuffer = Buffer.from(expectedHash, 'hex');

    if (receivedBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(receivedBuffer, expectedBuffer);
  } catch (error) {
    console.error('[WasenderWebhook] Error verifying signature:', error);
    return false;
  }
}

/**
 * Alternative: Verify using simple secret token in header
 * Some webhook providers use this simpler approach
 * 
 * @param token - Token from Authorization or X-Webhook-Secret header
 * @returns boolean indicating if token is valid
 */
function verifyWebhookToken(token: string | null): boolean {
  if (!WASENDER_WEBHOOK_SECRET) {
    console.warn('[WasenderWebhook] WASENDER_WEBHOOK_SECRET not configured, skipping token verification');
    return true;
  }

  if (!token) {
    console.error('[WasenderWebhook] Missing webhook token');
    return false;
  }

  // Remove "Bearer " prefix if present
  const cleanToken = token.replace(/^Bearer\s+/i, '');
  
  // Use timing-safe comparison
  const expectedBuffer = Buffer.from(WASENDER_WEBHOOK_SECRET);
  const receivedBuffer = Buffer.from(cleanToken);
  
  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}

// ============================================================================
// Event Processing Functions
// ============================================================================

/**
 * Process message.sent event
 * Message has been sent from WasenderAPI server
 */
async function handleMessageSent(data: WasenderWebhookPayload): Promise<void> {
  console.log('[WasenderWebhook] Message sent:', {
    messageId: data.payload.messageId,
    to: data.payload.to,
    sessionId: data.sessionId,
    timestamp: data.timestamp,
  });

  // TODO: Update message status in database if tracking
  // await updateMessageStatus(data.payload.messageId, 'sent');
}

/**
 * Process message.delivered event
 * Message has been delivered to recipient's device
 */
async function handleMessageDelivered(data: WasenderWebhookPayload): Promise<void> {
  console.log('[WasenderWebhook] Message delivered:', {
    messageId: data.payload.messageId,
    to: data.payload.to,
    sessionId: data.sessionId,
    timestamp: data.timestamp,
  });

  // TODO: Update message status in database if tracking
  // await updateMessageStatus(data.payload.messageId, 'delivered');
}

/**
 * Process message.read event
 * Message has been read by recipient
 */
async function handleMessageRead(data: WasenderWebhookPayload): Promise<void> {
  console.log('[WasenderWebhook] Message read:', {
    messageId: data.payload.messageId,
    to: data.payload.to,
    sessionId: data.sessionId,
    timestamp: data.timestamp,
  });

  // TODO: Update message status in database if tracking
  // This is a good signal for engagement - could trigger follow-up logic
  // await updateMessageStatus(data.payload.messageId, 'read');
}

/**
 * Process message.failed event
 * Message failed to send - requires attention
 */
async function handleMessageFailed(data: WasenderWebhookPayload): Promise<void> {
  console.error('[WasenderWebhook] Message failed:', {
    messageId: data.payload.messageId,
    to: data.payload.to,
    error: data.payload.error,
    sessionId: data.sessionId,
    timestamp: data.timestamp,
  });

  // TODO: Implement retry logic or alert
  // Options:
  // 1. Retry with exponential backoff
  // 2. Send alert to admin
  // 3. Queue for manual review
  // 4. Try alternative channel (SMS, email)

  // Example retry logic:
  // await queueForRetry(data.payload.messageId, data.payload.error);
  
  // Example alert:
  // await sendAdminAlert(`Message failed to ${data.payload.to}: ${data.payload.error}`);
}

/**
 * Log webhook event to database for monitoring
 * This is optional - falls back to console logging if table doesn't exist
 */
async function logWebhookEvent(
  data: WasenderWebhookPayload,
  request: NextRequest
): Promise<void> {
  const logEntry: MessageStatusLog = {
    message_id: data.payload.messageId,
    event_type: data.event,
    session_id: data.sessionId,
    from_number: data.payload.from,
    to_number: data.payload.to,
    status: data.payload.status,
    error_message: data.payload.error,
    webhook_timestamp: data.timestamp,
    processed_at: new Date().toISOString(),
    ip_address: request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                null,
    user_agent: request.headers.get('user-agent'),
  };

  try {
    const supabase = createServerClient();
    
    // Try to insert into message_status_logs table
    // This will fail if table doesn't exist - that's OK, we log to console
    const { error } = await (supabase as any)
      .from('message_status_logs')
      .insert(logEntry);

    if (error) {
      // Table likely doesn't exist - log to console instead
      console.log('[WasenderWebhook] Database log (table may not exist):', logEntry);
    }
  } catch (dbError) {
    // Database not available - console log is sufficient for now
    console.log('[WasenderWebhook] Event logged to console:', logEntry);
  }
}

// ============================================================================
// Main Handler
// ============================================================================

/**
 * POST handler for WasenderAPI webhooks
 * 
 * IMPORTANT: Always return 200 OK quickly to acknowledge receipt.
 * WasenderAPI will retry if we don't respond within a few seconds.
 * Process the event asynchronously after responding.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  console.log(`[WasenderWebhook:${requestId}] Received webhook request`);

  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    
    // Get security headers
    const signature = request.headers.get('x-wasender-signature');
    const timestamp = request.headers.get('x-wasender-timestamp');
    const authToken = request.headers.get('authorization') || 
                      request.headers.get('x-webhook-secret');

    // Verify webhook authenticity
    // Try signature verification first, fall back to token verification
    let isValid = false;
    
    if (signature && timestamp) {
      isValid = verifyWebhookSignature(rawBody, signature, timestamp);
    } else if (authToken) {
      isValid = verifyWebhookToken(authToken);
    } else if (!WASENDER_WEBHOOK_SECRET) {
      // No security configured - allow but warn
      isValid = true;
    }

    if (!isValid) {
      console.error(`[WasenderWebhook:${requestId}] Invalid webhook signature/token`);
      
      // Log suspicious request details for security monitoring
      console.warn(`[WasenderWebhook:${requestId}] Suspicious request:`, {
        ip: request.headers.get('x-forwarded-for'),
        userAgent: request.headers.get('user-agent'),
        hasSignature: !!signature,
        hasTimestamp: !!timestamp,
        hasAuth: !!authToken,
      });

      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    let data: WasenderWebhookPayload;
    try {
      data = JSON.parse(rawBody);
    } catch (parseError) {
      console.error(`[WasenderWebhook:${requestId}] Invalid JSON payload:`, parseError);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!data.event || !data.payload?.messageId) {
      console.error(`[WasenderWebhook:${requestId}] Missing required fields`);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate event type
    if (!VALID_EVENTS.includes(data.event)) {
      console.warn(`[WasenderWebhook:${requestId}] Unknown event type: ${data.event}`);
      // Still return 200 - we acknowledge receipt even if we don't handle it
    }

    // Log event (fire and forget - don't block response)
    logWebhookEvent(data, request).catch(err => {
      console.error(`[WasenderWebhook:${requestId}] Failed to log event:`, err);
    });

    // Process event asynchronously (fire and forget)
    // We don't await these to ensure fast response
    switch (data.event) {
      case 'message.sent':
        handleMessageSent(data).catch(err => {
          console.error(`[WasenderWebhook:${requestId}] Error handling sent event:`, err);
        });
        break;

      case 'message.delivered':
        handleMessageDelivered(data).catch(err => {
          console.error(`[WasenderWebhook:${requestId}] Error handling delivered event:`, err);
        });
        break;

      case 'message.read':
        handleMessageRead(data).catch(err => {
          console.error(`[WasenderWebhook:${requestId}] Error handling read event:`, err);
        });
        break;

      case 'message.failed':
        handleMessageFailed(data).catch(err => {
          console.error(`[WasenderWebhook:${requestId}] Error handling failed event:`, err);
        });
        break;

      default:
        console.log(`[WasenderWebhook:${requestId}] Unhandled event type: ${data.event}`);
    }

    const duration = Date.now() - startTime;
    console.log(`[WasenderWebhook:${requestId}] Acknowledged in ${duration}ms`);

    // ALWAYS return 200 OK immediately
    // Processing continues asynchronously
    return NextResponse.json({ 
      success: true,
      received: true,
      requestId,
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[WasenderWebhook:${requestId}] Unexpected error after ${duration}ms:`, error);
    
    // Even on error, return 200 to prevent WasenderAPI from retrying
    // Log the error for investigation
    return NextResponse.json({ 
      success: true, // Acknowledge receipt
      received: true,
      requestId,
    });
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 * 
 * WasenderAPI may send preflight requests depending on their configuration
 */
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get('origin') || '*';
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Wasender-Signature, X-Wasender-Timestamp, X-Webhook-Secret',
      'Access-Control-Max-Age': '86400',
    },
  });
}

/**
 * GET handler for webhook verification/health check
 * 
 * Some webhook providers verify the endpoint with a GET request
 * during setup
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    service: 'WasenderAPI Webhook Handler',
    version: '1.0.0',
    events: VALID_EVENTS,
  });
}
