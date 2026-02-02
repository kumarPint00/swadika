// Order Management - Track cooking, dispatch, delivery with WebSocket/polling

import { CartSession, CartSummary } from './cartService';

export type OrderStatus = 
  | 'pending'       // Payment pending
  | 'confirmed'     // Payment received, order confirmed
  | 'preparing'     // Kitchen started cooking
  | 'ready'         // Ready for pickup
  | 'dispatched'    // Out for delivery
  | 'delivered'     // Delivered successfully
  | 'cancelled'     // Order cancelled
  | 'failed';       // Failed to deliver

export interface Order {
  orderId: string;
  userId: string;
  sessionId: string;
  
  // Cart details
  items: CartSession['items'];
  summary: CartSummary;
  
  // Customer details
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  orderNotes?: string;
  
  // Order status
  status: OrderStatus;
  statusHistory: OrderStatusUpdate[];
  
  // Payment details
  paymentId?: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  
  // Delivery details
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  deliveryPartnerId?: string;
  trackingUrl?: string;
  
  // Timing
  createdAt: Date;
  updatedAt: Date;
  
  // Kitchen info
  prepStartTime?: Date;
  prepCompleteTime?: Date;
  estimatedPrepMinutes: number;
  
  // Loyalty & ratings
  loyaltyPointsEarned: number;
  rating?: number;
  review?: string;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  timestamp: Date;
  message: string;
  updatedBy?: string; // admin/system/delivery
}

class OrderService {
  private orders: Map<string, Order> = new Map();
  private statusListeners: Map<string, Set<(order: Order) => void>> = new Map();

  // Create new order
  createOrder(
    session: CartSession,
    summary: CartSummary,
    customerDetails: {
      userId: string;
      name: string;
      phone: string;
      email?: string;
      address: string;
    },
    paymentMethod: string
  ): Order {
    const orderId = this.generateOrderId();
    const estimatedPrepMinutes = this.calculatePrepTime(session.items);

    const order: Order = {
      orderId,
      userId: customerDetails.userId,
      sessionId: session.sessionId,
      
      items: session.items,
      summary,
      
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerEmail: customerDetails.email,
      deliveryAddress: customerDetails.address,
      orderNotes: session.orderNotes,
      
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        timestamp: new Date(),
        message: 'Order placed, awaiting payment'
      }],
      
      paymentMethod,
      paymentStatus: 'pending',
      
      estimatedPrepMinutes,
      loyaltyPointsEarned: Math.floor(summary.total / 10),
      
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.set(orderId, order);
    return order;
  }

  // Generate unique order ID
  private generateOrderId(): string {
    const prefix = 'SWD';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  }

  // Calculate total prep time
  private calculatePrepTime(items: CartSession['items']): number {
    // Base time + time per item
    const baseTime = 15; // Base kitchen setup time
    const itemTime = items.reduce((total, item) => {
      const dishPrepTime = 10; // Average prep time per dish
      return total + (dishPrepTime * item.quantity);
    }, 0);
    
    return Math.min(baseTime + itemTime, 45); // Cap at 45 minutes
  }

  // Update order status
  updateStatus(
    orderId: string,
    newStatus: OrderStatus,
    message: string,
    updatedBy?: string
  ): Order | null {
    const order = this.orders.get(orderId);
    if (!order) return null;

    order.status = newStatus;
    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      message,
      updatedBy
    });
    order.updatedAt = new Date();

    // Update specific timing fields
    if (newStatus === 'preparing' && !order.prepStartTime) {
      order.prepStartTime = new Date();
      order.estimatedDeliveryTime = new Date(
        Date.now() + (order.estimatedPrepMinutes + 30) * 60000 // prep + 30 min delivery
      );
    }

    if (newStatus === 'ready' && !order.prepCompleteTime) {
      order.prepCompleteTime = new Date();
    }

    if (newStatus === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    this.orders.set(orderId, order);
    this.notifyStatusListeners(orderId, order);
    
    return order;
  }

  // Update payment status
  updatePaymentStatus(
    orderId: string,
    paymentStatus: 'paid' | 'failed' | 'refunded',
    paymentId?: string
  ): Order | null {
    const order = this.orders.get(orderId);
    if (!order) return null;

    order.paymentStatus = paymentStatus;
    order.paymentId = paymentId;
    order.updatedAt = new Date();

    if (paymentStatus === 'paid') {
      this.updateStatus(orderId, 'confirmed', 'Payment received, order confirmed', 'system');
    } else if (paymentStatus === 'failed') {
      this.updateStatus(orderId, 'failed', 'Payment failed', 'system');
    }

    this.orders.set(orderId, order);
    return order;
  }

  // Update delivery details
  updateDeliveryDetails(
    orderId: string,
    deliveryPartnerId: string,
    trackingUrl: string
  ): Order | null {
    const order = this.orders.get(orderId);
    if (!order) return null;

    order.deliveryPartnerId = deliveryPartnerId;
    order.trackingUrl = trackingUrl;
    order.updatedAt = new Date();

    this.updateStatus(
      orderId,
      'dispatched',
      `Out for delivery via ${deliveryPartnerId}`,
      'system'
    );

    this.orders.set(orderId, order);
    return order;
  }

  // Get order
  getOrder(orderId: string): Order | null {
    return this.orders.get(orderId) || null;
  }

  // Get user orders
  getUserOrders(userId: string): Order[] {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get orders by status (for admin/kitchen)
  getOrdersByStatus(status: OrderStatus): Order[] {
    return Array.from(this.orders.values())
      .filter(order => order.status === status)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Get active kitchen orders (confirmed + preparing + ready)
  getActiveKitchenOrders(): Order[] {
    return Array.from(this.orders.values())
      .filter(order => 
        ['confirmed', 'preparing', 'ready'].includes(order.status)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Add rating and review
  addReview(orderId: string, rating: number, review?: string): Order | null {
    const order = this.orders.get(orderId);
    if (!order || order.status !== 'delivered') return null;

    order.rating = rating;
    order.review = review;
    order.updatedAt = new Date();

    this.orders.set(orderId, order);
    return order;
  }

  // Cancel order
  cancelOrder(orderId: string, reason: string, cancelledBy: string): Order | null {
    const order = this.orders.get(orderId);
    if (!order) return null;

    // Can only cancel before dispatched
    if (['dispatched', 'delivered', 'cancelled'].includes(order.status)) {
      throw new Error('Cannot cancel order at this stage');
    }

    this.updateStatus(orderId, 'cancelled', `Cancelled: ${reason}`, cancelledBy);
    
    // If payment was made, initiate refund
    if (order.paymentStatus === 'paid') {
      order.paymentStatus = 'refunded';
      this.orders.set(orderId, order);
    }

    return order;
  }

  // WebSocket-like status listeners
  subscribeToOrderUpdates(orderId: string, callback: (order: Order) => void): () => void {
    if (!this.statusListeners.has(orderId)) {
      this.statusListeners.set(orderId, new Set());
    }
    
    this.statusListeners.get(orderId)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.statusListeners.get(orderId);
      if (listeners) {
        listeners.delete(callback);
        if (listeners.size === 0) {
          this.statusListeners.delete(orderId);
        }
      }
    };
  }

  // Notify all listeners of status change
  private notifyStatusListeners(orderId: string, order: Order): void {
    const listeners = this.statusListeners.get(orderId);
    if (listeners) {
      listeners.forEach(callback => callback(order));
    }
  }

  // Get order analytics
  getAnalytics(startDate: Date, endDate: Date) {
    const ordersInRange = Array.from(this.orders.values())
      .filter(order => 
        order.createdAt >= startDate && order.createdAt <= endDate
      );

    const totalOrders = ordersInRange.length;
    const totalRevenue = ordersInRange
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.summary.total, 0);

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = ordersInRange.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<OrderStatus, number>);

    const topDishes = this.getTopDishes(ordersInRange);
    const repeatCustomers = this.getRepeatCustomers(ordersInRange);

    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      ordersByStatus,
      topDishes,
      repeatCustomers,
      successRate: totalOrders > 0 
        ? ((ordersByStatus['delivered'] || 0) / totalOrders) * 100 
        : 0
    };
  }

  // Get top dishes
  private getTopDishes(orders: Order[]): Array<{ dishName: string; quantity: number; revenue: number }> {
    const dishMap = new Map<string, { quantity: number; revenue: number }>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const existing = dishMap.get(item.dishName) || { quantity: 0, revenue: 0 };
        dishMap.set(item.dishName, {
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + item.itemTotal
        });
      });
    });

    return Array.from(dishMap.entries())
      .map(([dishName, data]) => ({ dishName, ...data }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }

  // Get repeat customers
  private getRepeatCustomers(orders: Order[]): number {
    const customerOrderCount = new Map<string, number>();

    orders.forEach(order => {
      const count = customerOrderCount.get(order.userId) || 0;
      customerOrderCount.set(order.userId, count + 1);
    });

    return Array.from(customerOrderCount.values())
      .filter(count => count > 1).length;
  }
}

// Singleton instance
export const orderService = new OrderService();

// Helper functions for API routes
export function createOrderAPI(
  session: CartSession,
  summary: CartSummary,
  customerDetails: {
    userId: string;
    name: string;
    phone: string;
    email?: string;
    address: string;
  },
  paymentMethod: string
) {
  return orderService.createOrder(session, summary, customerDetails, paymentMethod);
}

export function getOrderAPI(orderId: string) {
  return orderService.getOrder(orderId);
}

export function updateOrderStatusAPI(
  orderId: string,
  status: OrderStatus,
  message: string,
  updatedBy?: string
) {
  return orderService.updateStatus(orderId, status, message, updatedBy);
}

export function getUserOrdersAPI(userId: string) {
  return orderService.getUserOrders(userId);
}

export function getActiveKitchenOrdersAPI() {
  return orderService.getActiveKitchenOrders();
}
