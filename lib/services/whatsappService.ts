// WhatsApp Business API Integration - Direct orders & notifications

import { Order } from './orderService';

export interface WhatsAppMessage {
  to: string; // Phone number with country code
  type: 'text' | 'template' | 'interactive';
  content: string | WhatsAppTemplate;
}

export interface WhatsAppTemplate {
  name: string;
  language: string;
  components: Array<{
    type: 'header' | 'body' | 'footer' | 'button';
    parameters?: Array<{ type: 'text'; text: string }>;
  }>;
}

class WhatsAppService {
  private apiUrl: string;
  private accessToken: string;
  private phoneNumberId: string;
  private businessNumber: string = '+919958382202';

  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || 'YOUR_PHONE_NUMBER_ID';
  }

  // Send text message
  async sendTextMessage(to: string, message: string): Promise<boolean> {
    try {
      // In production, use actual WhatsApp Business API
      // const response = await fetch(
      //   `${this.apiUrl}/${this.phoneNumberId}/messages`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${this.accessToken}`
      //     },
      //     body: JSON.stringify({
      //       messaging_product: 'whatsapp',
      //       to: to.replace('+', ''),
      //       type: 'text',
      //       text: { body: message }
      //     })
      //   }
      // );

      // Mock implementation
      console.log(`[WhatsApp] Sending to ${to}: ${message}`);
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  // Send order confirmation with payment link
  async sendOrderConfirmation(
    customerPhone: string,
    order: Order,
    paymentLink?: string
  ): Promise<boolean> {
    const message = `
🎉 *Order Confirmed - ${order.orderId}*

Thank you for your order from Swadika Delights!

📦 *Order Details:*
${order.items.map(item => `• ${item.dishName} x${item.quantity} - ₹${item.itemTotal}`).join('\n')}

💰 *Total: ₹${order.summary.total}*
${order.summary.promoDiscount > 0 ? `💸 Discount Applied: -₹${order.summary.promoDiscount}` : ''}

📍 *Delivery Address:*
${order.deliveryAddress}

⏱️ *Estimated Delivery:* ${order.estimatedPrepMinutes + 30} minutes

${paymentLink ? `\n💳 *Complete Payment:*\n${paymentLink}\n` : ''}

📞 Need help? Call us at ${this.businessNumber}

Thank you! 🙏
    `.trim();

    return await this.sendTextMessage(customerPhone, message);
  }

  // Send order status update
  async sendStatusUpdate(
    customerPhone: string,
    orderId: string,
    status: string,
    message: string
  ): Promise<boolean> {
    const statusEmojis: Record<string, string> = {
      'confirmed': '✅',
      'preparing': '👨‍🍳',
      'ready': '📦',
      'dispatched': '🚴',
      'delivered': '🎉',
      'cancelled': '❌'
    };

    const emoji = statusEmojis[status] || 'ℹ️';

    const whatsappMessage = `
${emoji} *Order Update - ${orderId}*

*Status:* ${status.toUpperCase()}
${message}

Track your order: https://swadika.com/track/${orderId}

Questions? Reply to this message or call ${this.businessNumber}
    `.trim();

    return await this.sendTextMessage(customerPhone, whatsappMessage);
  }

  // Send delivery partner details
  async sendDeliveryPartnerDetails(
    customerPhone: string,
    orderId: string,
    partnerName: string,
    partnerPhone: string,
    trackingUrl?: string
  ): Promise<boolean> {
    const message = `
🚴 *Your Order is Out for Delivery!*

*Order ID:* ${orderId}

*Delivery Partner:* ${partnerName}
*Contact:* ${partnerPhone}

${trackingUrl ? `📍 *Track Live:* ${trackingUrl}\n` : ''}

Your delicious meal will arrive soon! 😊
    `.trim();

    return await this.sendTextMessage(customerPhone, message);
  }

  // Send promotional message
  async sendPromotion(
    customerPhone: string,
    promoCode: string,
    discount: string,
    validUntil: string
  ): Promise<boolean> {
    const message = `
🎁 *Special Offer Just for You!*

Get *${discount}* off on your next order!

*Promo Code:* ${promoCode}
*Valid Until:* ${validUntil}

Order now: https://swadika.com/menu

Enjoy authentic Bihar & UP flavors! 🍛
    `.trim();

    return await this.sendTextMessage(customerPhone, message);
  }

  // Handle incoming WhatsApp order
  async handleIncomingOrder(from: string, message: string): Promise<string> {
    // Parse menu-based ordering
    // Example: "I want 2 Litti Chokha and 1 Sattu Paratha"
    
    // Simple keyword matching (in production, use NLP)
    const menuKeywords = [
      'litti', 'chokha', 'paratha', 'thali', 'biryani', 
      'samosa', 'chai', 'lassi'
    ];

    const foundItems = menuKeywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (foundItems.length > 0) {
      // Create payment link and send menu
      const paymentLink = `https://swadika.com/quick-order?items=${foundItems.join(',')}`;
      
      return `
Great choice! 😋

We found these items:
${foundItems.map(item => `• ${item.charAt(0).toUpperCase() + item.slice(1)}`).join('\n')}

📱 *Complete your order here:*
${paymentLink}

Or call us at ${this.businessNumber} to place your order!
      `.trim();
    }

    // Default response - send menu
    return `
👋 Hello! Welcome to Swadika Delights!

🍛 *Popular Items:*
• Litti Chokha - ₹80
• Veg Thali - ₹120
• Chicken Biryani - ₹180
• Sattu Paratha - ₹60
• Samosa (2 pcs) - ₹40

📱 *Order Online:* https://swadika.com/menu
📞 *Call Us:* ${this.businessNumber}

What would you like to order today?
    `.trim();
  }

  // Send welcome message for new customers
  async sendWelcomeMessage(customerPhone: string, customerName?: string): Promise<boolean> {
    const greeting = customerName ? `Hi ${customerName}!` : 'Hello!';
    
    const message = `
${greeting} 👋

Welcome to *Swadika Delights*! 🍛

We bring authentic Bihar & UP home-style flavors right to your doorstep.

🎁 *First Order Offer:*
Use code *FIRST100* for ₹100 off on orders above ₹200!

🚀 *Quick Links:*
• Browse Menu: https://swadika.com/menu
• Track Orders: https://swadika.com/orders
• Call Us: ${this.businessNumber}

Ready to experience traditional flavors? Let's get started! 😊
    `.trim();

    return await this.sendTextMessage(customerPhone, message);
  }

  // Send order feedback request
  async sendFeedbackRequest(
    customerPhone: string,
    orderId: string,
    customerName?: string
  ): Promise<boolean> {
    const greeting = customerName ? customerName : 'valued customer';
    
    const message = `
Hi ${greeting}! 👋

Thank you for ordering from Swadika Delights!

We hope you enjoyed your meal! 😊

⭐ *Rate your experience:*
https://swadika.com/review/${orderId}

Your feedback helps us serve you better! 🙏

P.S. Don't forget to share your food pics with #SwadikaDelights
    `.trim();

    return await this.sendTextMessage(customerPhone, message);
  }

  // Send daily specials
  async broadcastDailySpecials(
    phoneNumbers: string[],
    specialDish: string,
    price: number,
    discount?: number
  ): Promise<number> {
    const finalPrice = discount ? price - discount : price;
    const message = `
🌟 *Today's Special at Swadika!*

${specialDish}
${discount ? `~~₹${price}~~ ₹${finalPrice}` : `₹${finalPrice}`}

Fresh, homemade, and delivered hot! 🔥

Order now: https://swadika.com/menu

Limited quantity - order fast! ⚡
    `.trim();

    let successCount = 0;
    for (const phone of phoneNumbers) {
      const sent = await this.sendTextMessage(phone, message);
      if (sent) successCount++;
      
      // Rate limiting - wait 1 second between messages
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return successCount;
  }

  // Webhook handler for incoming messages
  async handleWebhook(webhookData: any): Promise<void> {
    // In production, verify webhook signature
    try {
      const message = webhookData.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      
      if (!message) return;

      const from = message.from;
      const text = message.text?.body;
      const messageType = message.type;

      if (messageType === 'text' && text) {
        const response = await this.handleIncomingOrder(from, text);
        await this.sendTextMessage(from, response);
      }
    } catch (error) {
      console.error('Error handling WhatsApp webhook:', error);
    }
  }
}

// Singleton instance
export const whatsappService = new WhatsAppService();

// Helper functions for API routes
export async function sendOrderConfirmationWhatsApp(
  customerPhone: string,
  order: Order,
  paymentLink?: string
) {
  return await whatsappService.sendOrderConfirmation(customerPhone, order, paymentLink);
}

export async function sendStatusUpdateWhatsApp(
  customerPhone: string,
  orderId: string,
  status: string,
  message: string
) {
  return await whatsappService.sendStatusUpdate(customerPhone, orderId, status, message);
}

export async function sendDeliveryDetailsWhatsApp(
  customerPhone: string,
  orderId: string,
  partnerName: string,
  partnerPhone: string,
  trackingUrl?: string
) {
  return await whatsappService.sendDeliveryPartnerDetails(
    customerPhone,
    orderId,
    partnerName,
    partnerPhone,
    trackingUrl
  );
}

export async function handleWhatsAppWebhook(webhookData: any) {
  return await whatsappService.handleWebhook(webhookData);
}
