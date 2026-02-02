import { NextRequest, NextResponse } from 'next/server';
import { getOrderAPI, updateOrderStatusAPI } from '@/lib/services/orderService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const order = getOrderAPI(orderId);
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const { status, message } = await request.json();

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 });
    }

    const success = updateOrderStatusAPI(orderId, status, message);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const { reason } = await request.json();
    // Cancel order not implemented yet
    const success = false;

    if (!success) {
      return NextResponse.json({ error: 'Cancel order not implemented' }, { status: 501 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
