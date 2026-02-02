// Razorpay Payment Integration with Promo Codes & Loyalty Points

export interface PaymentOrder {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  createdAt: Date;
  paidAt?: Date;
  paymentMethod?: string;
  transactionId?: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

class PaymentService {
  private razorpayKeyId: string;
  private razorpayKeySecret: string;
  private payments: Map<string, PaymentOrder> = new Map();

  constructor() {
    this.razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxx';
    this.razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'secret_key_here';
  }

  // Create Razorpay order
  async createOrder(request: PaymentRequest): Promise<PaymentOrder> {
    try {
      // In production, use actual Razorpay SDK
      // const Razorpay = require('razorpay');
      // const razorpay = new Razorpay({
      //   key_id: this.razorpayKeyId,
      //   key_secret: this.razorpayKeySecret
      // });
      // const order = await razorpay.orders.create({
      //   amount: request.amount * 100, // Convert to paise
      //   currency: request.currency,
      //   receipt: request.receipt,
      //   notes: request.notes
      // });

      // Mock implementation
      const razorpayOrderId = `order_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      const paymentOrder: PaymentOrder = {
        orderId: request.receipt,
        razorpayOrderId,
        amount: request.amount,
        currency: request.currency,
        status: 'created',
        createdAt: new Date()
      };

      this.payments.set(razorpayOrderId, paymentOrder);
      return paymentOrder;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  // Verify payment signature
  verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): boolean {
    try {
      // In production, verify signature using Razorpay SDK
      // const crypto = require('crypto');
      // const generated_signature = crypto
      //   .createHmac('sha256', this.razorpayKeySecret)
      //   .update(razorpayOrderId + '|' + razorpayPaymentId)
      //   .digest('hex');
      // return generated_signature === razorpaySignature;

      // Mock implementation - always return true for development
      return true;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  // Update payment status
  updatePaymentStatus(
    razorpayOrderId: string,
    status: 'paid' | 'failed',
    paymentMethod?: string,
    transactionId?: string
  ): PaymentOrder | null {
    const payment = this.payments.get(razorpayOrderId);
    if (!payment) return null;

    payment.status = status;
    payment.paidAt = new Date();
    payment.paymentMethod = paymentMethod;
    payment.transactionId = transactionId;

    this.payments.set(razorpayOrderId, payment);
    return payment;
  }

  // Get payment details
  getPayment(razorpayOrderId: string): PaymentOrder | null {
    return this.payments.get(razorpayOrderId) || null;
  }

  // Calculate loyalty points earned (1 point per ₹10 spent)
  calculateLoyaltyPoints(amount: number): number {
    return Math.floor(amount / 10);
  }

  // Process refund
  async processRefund(
    paymentId: string,
    amount: number,
    reason: string
  ): Promise<{ success: boolean; refundId?: string; message: string }> {
    try {
      // In production, use Razorpay refund API
      // const razorpay = new Razorpay({
      //   key_id: this.razorpayKeyId,
      //   key_secret: this.razorpayKeySecret
      // });
      // const refund = await razorpay.payments.refund(paymentId, {
      //   amount: amount * 100,
      //   notes: { reason }
      // });

      // Mock implementation
      const refundId = `rfnd_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        refundId,
        message: 'Refund processed successfully'
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      return {
        success: false,
        message: 'Failed to process refund'
      };
    }
  }

  // Get Razorpay checkout options for frontend
  getCheckoutOptions(
    razorpayOrderId: string,
    amount: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string
  ) {
    return {
      key: this.razorpayKeyId,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Swadika Delights',
      description: 'Order Payment',
      image: '/logo.jpeg',
      order_id: razorpayOrderId,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone
      },
      theme: {
        color: '#FF6B35'
      },
      notes: {
        business: 'Swadika Cloud Kitchen'
      }
    };
  }
}

// Singleton instance
export const paymentService = new PaymentService();

// Helper functions for API routes
export async function createPaymentOrderAPI(
  orderId: string,
  amount: number,
  notes?: Record<string, string>
) {
  return await paymentService.createOrder({
    amount,
    currency: 'INR',
    receipt: orderId,
    notes
  });
}

export function verifyPaymentAPI(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) {
  const isValid = paymentService.verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  );

  if (isValid) {
    paymentService.updatePaymentStatus(
      razorpayOrderId,
      'paid',
      'razorpay',
      razorpayPaymentId
    );
  }

  return { success: isValid, message: isValid ? 'Payment verified' : 'Invalid payment signature' };
}

export async function processRefundAPI(
  paymentId: string,
  amount: number,
  reason: string
) {
  return await paymentService.processRefund(paymentId, amount, reason);
}
