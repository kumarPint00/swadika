import { NextRequest, NextResponse } from 'next/server';
import { createOrderAPI, getUserOrdersAPI, getActiveKitchenOrdersAPI } from '@/lib/services/orderService';
import { getUserBySessionAPI } from '@/lib/services/authService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'user' or 'kitchen'

    if (type === 'kitchen') {
      const orders = getActiveKitchenOrdersAPI();
      return NextResponse.json(orders);
    }

    // Get user orders
    const sessionId = request.cookies.get('session_id')?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = getUserBySessionAPI(sessionId);
    if (!user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const orders = getUserOrdersAPI(user.id);
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartSession, summary, customerDetails, paymentMethod } = body;

    if (!cartSession || !summary || !customerDetails || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order = createOrderAPI(cartSession, summary, customerDetails, paymentMethod);
    
    if (!order) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
