import { NextRequest, NextResponse } from 'next/server';
import { 
  getCartAPI, 
  addToCartAPI, 
  applyPromoAPI,
  validateCartAPI
} from '@/lib/services/cartService';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('cart_session')?.value;
    if (!sessionId) {
      return NextResponse.json({ cart: [], summary: null });
    }

    const cart = getCartAPI(sessionId);
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let sessionId = request.cookies.get('cart_session')?.value;
    
    const { action, ...data } = await request.json();

    // Generate session if doesn't exist
    if (!sessionId) {
      sessionId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    let result;
    switch (action) {
      case 'add':
        result = addToCartAPI(
          sessionId, 
          data.dishId, 
          data.quantity || 1, 
          data.variantId,
          data.customizations,
          data.specialInstructions
        );
        break;
      case 'remove':
        // Not implemented yet
        result = { error: 'Remove not implemented' };
        break;
      case 'clear':
        // Not implemented yet
        result = { error: 'Clear not implemented' };
        break;
      case 'applyPromo':
        result = applyPromoAPI(sessionId, data.promoCode);
        break;
      case 'useLoyalty':
        // Not implemented yet
        result = { error: 'Loyalty points not implemented' };
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const response = NextResponse.json(result);
    response.cookies.set('cart_session', sessionId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
