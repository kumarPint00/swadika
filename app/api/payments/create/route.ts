import { NextRequest, NextResponse } from 'next/server';
import { createPaymentOrderAPI } from '@/lib/services/paymentService';

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, userId } = await request.json();

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: 'amount and orderId are required' },
        { status: 400 }
      );
    }

    const paymentOrder = createPaymentOrderAPI(amount, orderId, userId);
    return NextResponse.json(paymentOrder);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
