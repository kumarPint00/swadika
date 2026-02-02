import { NextRequest, NextResponse } from 'next/server';
import { processChatMessage, parseOrderFromChat, addChatOrderToCart } from '@/lib/services/aiChatService';
import { getCartAPI } from '@/lib/services/cartService';

export async function POST(request: NextRequest) {
  try {
    const { message, action } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get or create session
    let sessionId = request.cookies.get('chat_session')?.value;
    if (!sessionId) {
      sessionId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get current cart for context
    const cartSessionId = request.cookies.get('cart_session')?.value;
    const cart = cartSessionId ? getCartAPI(cartSessionId) : null;

    // Process message
    const response = await processChatMessage(message, sessionId, { cart });

    // If action is to add to cart
    if (action === 'addToCart') {
      const intent = await parseOrderFromChat(message, sessionId);
      
      if (intent.items.length > 0) {
        const cartSession = cartSessionId || 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const success = await addChatOrderToCart(intent, cartSession);
        
        if (success) {
          const responseObj = NextResponse.json({
            response,
            intent,
            cartUpdated: true,
            message: 'Items added to cart successfully!'
          });
          
          responseObj.cookies.set('chat_session', sessionId, { maxAge: 3600 });
          if (!cartSessionId) {
            responseObj.cookies.set('cart_session', cartSession, { maxAge: 7 * 24 * 3600 });
          }
          
          return responseObj;
        }
      }
    }

    // Regular chat response
    const responseObj = NextResponse.json({ response });
    responseObj.cookies.set('chat_session', sessionId, { maxAge: 3600 });
    
    return responseObj;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
