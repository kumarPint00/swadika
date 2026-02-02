import { NextRequest, NextResponse } from 'next/server';
import { handleWhatsAppWebhook } from '@/lib/services/whatsappService';

// GET for webhook verification (Meta requirement)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'swadika_webhook_token';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid verification token' }, { status: 403 });
}

// POST for incoming messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Process webhook asynchronously
    handleWhatsAppWebhook(body).catch(error => {
      console.error('Webhook processing error:', error);
    });

    // Return 200 immediately to acknowledge receipt
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
