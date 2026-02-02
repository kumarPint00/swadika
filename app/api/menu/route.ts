import { NextRequest, NextResponse } from 'next/server';
import { getMenuAPI, getItemByIdAPI, toggleItemAvailabilityAPI } from '@/lib/services/menuService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const itemId = searchParams.get('id');

    if (itemId) {
      const item = getItemByIdAPI(itemId);
      if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const menu = category ? getMenuAPI().filter(item => item.category === category) : getMenuAPI();
    return NextResponse.json(menu);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { itemId, available } = await request.json();

    if (!itemId || typeof available !== 'boolean') {
      return NextResponse.json(
        { error: 'itemId and available (boolean) are required' },
        { status: 400 }
      );
    }

    const success = toggleItemAvailabilityAPI(itemId, available);
    if (!success) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
