import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentAPI } from '@/lib/services/paymentService';
import { updateOrderStatusAPI } from '@/lib/services/orderService';

export async function POST(request: NextRequest) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await request.json();

    const isValid = verifyPaymentAPI(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order status to confirmed
    if (orderId) {
      updateOrderStatusAPI(orderId, 'confirmed', 'Payment verified successfully');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
