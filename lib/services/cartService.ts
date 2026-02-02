// Cart & Checkout Service - Session management, offers, order notes

import { menuService } from './menuService';

export interface CartItem {
  id: string; // Unique cart item ID
  dishId: string;
  dishName: string;
  quantity: number;
  basePrice: number;
  variantId?: string;
  variantName?: string;
  customizations?: Record<string, string[]>;
  itemTotal: number;
  specialInstructions?: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed' | 'delivery';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  description: string;
  applicableOn?: string[]; // Specific dish IDs or categories
}

export interface CartSession {
  sessionId: string;
  userId?: string;
  items: CartItem[];
  appliedPromo?: {
    code: string;
    discount: number;
  };
  loyaltyPointsUsed: number;
  orderNotes?: string;
  deliveryAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  subtotal: number;
  promoDiscount: number;
  loyaltyDiscount: number;
  deliveryFee: number;
  gst: number;
  total: number;
  itemCount: number;
}

class CartService {
  private sessions: Map<string, CartSession> = new Map();
  private promoCodes: Map<string, PromoCode> = new Map();

  constructor() {
    this.initializePromoCodes();
  }

  // Initialize promo codes (PG50, SOC50, etc.)
  private initializePromoCodes(): void {
    const codes: PromoCode[] = [
      {
        code: 'PG50',
        type: 'percentage',
        value: 50,
        minOrder: 299,
        maxDiscount: 150,
        validUntil: new Date('2026-12-31'),
        usedCount: 0,
        description: 'Get 50% off on orders above ₹299 (max ₹150 off)'
      },
      {
        code: 'SOC50',
        type: 'percentage',
        value: 50,
        minOrder: 399,
        maxDiscount: 200,
        validUntil: new Date('2026-12-31'),
        usedCount: 0,
        description: 'Get 50% off on orders above ₹399 (max ₹200 off)'
      },
      {
        code: 'FIRST100',
        type: 'fixed',
        value: 100,
        minOrder: 200,
        validUntil: new Date('2026-12-31'),
        usageLimit: 1,
        usedCount: 0,
        description: 'Flat ₹100 off on first order (min ₹200)'
      },
      {
        code: 'FREEDEL',
        type: 'delivery',
        value: 100,
        minOrder: 299,
        validUntil: new Date('2026-12-31'),
        usedCount: 0,
        description: 'Free delivery on orders above ₹299'
      },
      {
        code: 'LITTI20',
        type: 'percentage',
        value: 20,
        minOrder: 150,
        maxDiscount: 100,
        validUntil: new Date('2026-12-31'),
        usedCount: 0,
        applicableOn: ['litti-chokha-main', 'litti-chokha-snack'],
        description: '20% off on Litti Chokha orders'
      }
    ];

    codes.forEach(code => this.promoCodes.set(code.code.toUpperCase(), code));
  }

  // Create or get cart session
  getOrCreateSession(sessionId: string, userId?: string): CartSession {
    let session = this.sessions.get(sessionId);
    
    if (!session) {
      session = {
        sessionId,
        userId,
        items: [],
        loyaltyPointsUsed: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.sessions.set(sessionId, session);
    }

    return session;
  }

  // Add item to cart
  addToCart(
    sessionId: string,
    dishId: string,
    quantity: number,
    variantId?: string,
    customizations?: Record<string, string[]>,
    specialInstructions?: string
  ): CartSession {
    const session = this.getOrCreateSession(sessionId);
    const dish = menuService.getEnhancedMenu().find(d => d.id === dishId);
    
    if (!dish) {
      throw new Error('Dish not found');
    }

    // Check availability
    const canOrder = menuService.canOrder(dishId, quantity);
    if (!canOrder.canOrder) {
      throw new Error(canOrder.reason || 'Cannot order this item');
    }

    // Calculate price
    const basePrice = dish.price;
    const itemTotal = menuService.calculateItemPrice(dishId, variantId, customizations) * quantity;

    // Get variant name
    let variantName: string | undefined;
    if (variantId && dish.variants) {
      const variant = dish.variants.find(v => v.id === variantId);
      variantName = variant?.name;
    }

    // Check if same item with same config exists
    const existingItemIndex = session.items.findIndex(item =>
      item.dishId === dishId &&
      item.variantId === variantId &&
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      session.items[existingItemIndex].quantity += quantity;
      session.items[existingItemIndex].itemTotal = 
        menuService.calculateItemPrice(dishId, variantId, customizations) * 
        session.items[existingItemIndex].quantity;
    } else {
      // Add new item
      const cartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        dishId,
        dishName: dish.name,
        quantity,
        basePrice,
        variantId,
        variantName,
        customizations,
        itemTotal,
        specialInstructions
      };
      session.items.push(cartItem);
    }

    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    
    return session;
  }

  // Update cart item quantity
  updateQuantity(sessionId: string, cartItemId: string, quantity: number): CartSession {
    const session = this.getOrCreateSession(sessionId);
    const itemIndex = session.items.findIndex(item => item.id === cartItemId);

    if (itemIndex < 0) {
      throw new Error('Cart item not found');
    }

    if (quantity <= 0) {
      session.items.splice(itemIndex, 1);
    } else {
      const item = session.items[itemIndex];
      item.quantity = quantity;
      item.itemTotal = menuService.calculateItemPrice(
        item.dishId, 
        item.variantId, 
        item.customizations
      ) * quantity;
    }

    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    
    return session;
  }

  // Remove item from cart
  removeItem(sessionId: string, cartItemId: string): CartSession {
    return this.updateQuantity(sessionId, cartItemId, 0);
  }

  // Clear cart
  clearCart(sessionId: string): CartSession {
    const session = this.getOrCreateSession(sessionId);
    session.items = [];
    session.appliedPromo = undefined;
    session.loyaltyPointsUsed = 0;
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    return session;
  }

  // Apply promo code
  applyPromo(sessionId: string, promoCode: string): { success: boolean; message: string; session: CartSession } {
    const session = this.getOrCreateSession(sessionId);
    const code = this.promoCodes.get(promoCode.toUpperCase());

    if (!code) {
      return { success: false, message: 'Invalid promo code', session };
    }

    if (new Date() > code.validUntil) {
      return { success: false, message: 'Promo code expired', session };
    }

    if (code.usageLimit && code.usedCount >= code.usageLimit) {
      return { success: false, message: 'Promo code usage limit reached', session };
    }

    const summary = this.calculateSummary(sessionId);

    if (summary.subtotal < code.minOrder) {
      return { 
        success: false, 
        message: `Minimum order value ₹${code.minOrder} required`, 
        session 
      };
    }

    // Check if applicable to specific items
    if (code.applicableOn && code.applicableOn.length > 0) {
      const hasApplicableItem = session.items.some(item => 
        code.applicableOn!.includes(item.dishId)
      );
      if (!hasApplicableItem) {
        return { 
          success: false, 
          message: 'Promo code not applicable to cart items', 
          session 
        };
      }
    }

    // Calculate discount
    let discount = 0;
    if (code.type === 'percentage') {
      discount = (summary.subtotal * code.value) / 100;
      if (code.maxDiscount) {
        discount = Math.min(discount, code.maxDiscount);
      }
    } else if (code.type === 'fixed') {
      discount = code.value;
    } else if (code.type === 'delivery') {
      discount = summary.deliveryFee;
    }

    session.appliedPromo = {
      code: promoCode.toUpperCase(),
      discount: Math.round(discount)
    };
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);

    return { 
      success: true, 
      message: `Promo code applied! You saved ₹${Math.round(discount)}`, 
      session 
    };
  }

  // Remove promo code
  removePromo(sessionId: string): CartSession {
    const session = this.getOrCreateSession(sessionId);
    session.appliedPromo = undefined;
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    return session;
  }

  // Use loyalty points (1 point = ₹1)
  useLoyaltyPoints(sessionId: string, points: number, userAvailablePoints: number): CartSession {
    const session = this.getOrCreateSession(sessionId);
    
    if (points > userAvailablePoints) {
      throw new Error('Insufficient loyalty points');
    }

    const summary = this.calculateSummary(sessionId);
    const maxPointsUsable = Math.min(points, Math.floor(summary.subtotal * 0.5)); // Max 50% of subtotal

    session.loyaltyPointsUsed = maxPointsUsable;
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    
    return session;
  }

  // Add order notes
  addOrderNotes(sessionId: string, notes: string): CartSession {
    const session = this.getOrCreateSession(sessionId);
    session.orderNotes = notes;
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    return session;
  }

  // Set delivery address
  setDeliveryAddress(sessionId: string, address: string): CartSession {
    const session = this.getOrCreateSession(sessionId);
    session.deliveryAddress = address;
    session.updatedAt = new Date();
    this.sessions.set(sessionId, session);
    return session;
  }

  // Calculate cart summary
  calculateSummary(sessionId: string): CartSummary {
    const session = this.getOrCreateSession(sessionId);
    
    const subtotal = session.items.reduce((sum, item) => sum + item.itemTotal, 0);
    const promoDiscount = session.appliedPromo?.discount || 0;
    const loyaltyDiscount = session.loyaltyPointsUsed;
    
    // Calculate delivery fee (free above ₹299 or with FREEDEL code)
    let deliveryFee = subtotal >= 299 ? 0 : 40;
    if (session.appliedPromo?.code === 'FREEDEL') {
      deliveryFee = 0;
    }

    const discountedSubtotal = subtotal - promoDiscount - loyaltyDiscount;
    const gst = Math.round(discountedSubtotal * 0.05); // 5% GST
    const total = Math.max(0, discountedSubtotal + deliveryFee + gst);

    return {
      subtotal,
      promoDiscount,
      loyaltyDiscount,
      deliveryFee,
      gst,
      total,
      itemCount: session.items.reduce((sum, item) => sum + item.quantity, 0)
    };
  }

  // Get cart with summary
  getCartWithSummary(sessionId: string): { session: CartSession; summary: CartSummary } {
    const session = this.getOrCreateSession(sessionId);
    const summary = this.calculateSummary(sessionId);
    return { session, summary };
  }

  // Validate cart before checkout
  validateCart(sessionId: string): { valid: boolean; errors: string[] } {
    const session = this.getOrCreateSession(sessionId);
    const errors: string[] = [];

    if (session.items.length === 0) {
      errors.push('Cart is empty');
    }

    // Check availability of all items
    session.items.forEach(item => {
      const canOrder = menuService.canOrder(item.dishId, item.quantity);
      if (!canOrder.canOrder) {
        errors.push(`${item.dishName}: ${canOrder.reason}`);
      }
    });

    if (!session.deliveryAddress) {
      errors.push('Delivery address not set');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Increment promo code usage (called after successful order)
  incrementPromoUsage(promoCode: string): void {
    const code = this.promoCodes.get(promoCode.toUpperCase());
    if (code) {
      code.usedCount++;
      this.promoCodes.set(promoCode.toUpperCase(), code);
    }
  }

  // Get all active promo codes (for display)
  getActivePromoCodes(): PromoCode[] {
    const now = new Date();
    return Array.from(this.promoCodes.values())
      .filter(code => code.validUntil > now && (!code.usageLimit || code.usedCount < code.usageLimit));
  }

  // Admin: Create new promo code
  createPromoCode(code: PromoCode): void {
    this.promoCodes.set(code.code.toUpperCase(), code);
  }

  // Admin: Delete promo code
  deletePromoCode(code: string): void {
    this.promoCodes.delete(code.toUpperCase());
  }
}

// Singleton instance
export const cartService = new CartService();

// Helper functions for API routes
export function getCartAPI(sessionId: string) {
  return cartService.getCartWithSummary(sessionId);
}

export function addToCartAPI(
  sessionId: string,
  dishId: string,
  quantity: number,
  variantId?: string,
  customizations?: Record<string, string[]>,
  specialInstructions?: string
) {
  return cartService.addToCart(sessionId, dishId, quantity, variantId, customizations, specialInstructions);
}

export function applyPromoAPI(sessionId: string, promoCode: string) {
  return cartService.applyPromo(sessionId, promoCode);
}

export function validateCartAPI(sessionId: string) {
  return cartService.validateCart(sessionId);
}
