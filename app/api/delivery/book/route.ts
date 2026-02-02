import { NextRequest, NextResponse } from 'next/server';
import { autoBookDeliveryAPI } from '@/lib/services/deliveryService';
import { getOrderAPI } from '@/lib/services/orderService';

export async function POST(request: NextRequest) {
  try {
    const { orderId, customerAddress } = await request.json();

    if (!orderId || !customerAddress) {
      return NextResponse.json(
        { error: 'orderId and customerAddress are required' },
        { status: 400 }
      );
    }

    // Get order details
    const order = getOrderAPI(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Auto-book delivery (selects best provider)
    const delivery = await autoBookDeliveryAPI(order, customerAddress);

    if (!delivery) {
      return NextResponse.json({ error: 'Failed to book delivery' }, { status: 500 });
    }

    return NextResponse.json(delivery);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
