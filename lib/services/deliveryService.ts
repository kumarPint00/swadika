// Delivery Integration - Dunzo / Porter / Swiggy Genie APIs

import { Order } from './orderService';

export type DeliveryProvider = 'dunzo' | 'porter' | 'swiggy-genie' | 'self-delivery';

export interface DeliveryRequest {
  orderId: string;
  pickupAddress: {
    lat: number;
    lng: number;
    address: string;
    contactName: string;
    contactPhone: string;
  };
  dropAddress: {
    lat: number;
    lng: number;
    address: string;
    contactName: string;
    contactPhone: string;
  };
  orderValue: number;
  paymentMode: 'prepaid' | 'cod';
  instructions?: string;
}

export interface DeliveryPartner {
  taskId: string;
  provider: DeliveryProvider;
  status: 'assigned' | 'reached_pickup' | 'picked_up' | 'reached_drop' | 'completed' | 'cancelled';
  partnerName?: string;
  partnerPhone?: string;
  trackingUrl?: string;
  estimatedTime?: number; // in minutes
  fare: number;
  createdAt: Date;
  updatedAt: Date;
}

class DeliveryService {
  private deliveries: Map<string, DeliveryPartner> = new Map();
  private cloudKitchenAddress = {
    lat: 28.6192104,
    lng: 77.3586008,
    address: 'A-64, Himalaya Enclave, Khora Colony, Ghaziabad, UP 201309',
    contactName: 'Swadika Kitchen',
    contactPhone: '+919958382202'
  };

  // Auto-select best delivery provider based on distance and availability
  selectBestProvider(distance: number): DeliveryProvider {
    // Dunzo: Best for <8km, fastest
    if (distance < 8) return 'dunzo';
    
    // Porter: Good for 8-15km
    if (distance < 15) return 'porter';
    
    // Swiggy Genie: Backup
    return 'swiggy-genie';
  }

  // Create delivery task
  async createDeliveryTask(
    order: Order,
    provider: DeliveryProvider,
    dropAddress: { lat: number; lng: number; address: string }
  ): Promise<DeliveryPartner> {
    const request: DeliveryRequest = {
      orderId: order.orderId,
      pickupAddress: this.cloudKitchenAddress,
      dropAddress: {
        ...dropAddress,
        contactName: order.customerName,
        contactPhone: order.customerPhone
      },
      orderValue: order.summary.total,
      paymentMode: order.paymentStatus === 'paid' ? 'prepaid' : 'cod',
      instructions: order.orderNotes
    };

    // Call respective provider API
    let deliveryPartner: DeliveryPartner;

    switch (provider) {
      case 'dunzo':
        deliveryPartner = await this.createDunzoTask(request);
        break;
      case 'porter':
        deliveryPartner = await this.createPorterTask(request);
        break;
      case 'swiggy-genie':
        deliveryPartner = await this.createSwiggyGenieTask(request);
        break;
      default:
        deliveryPartner = await this.createSelfDeliveryTask(request);
    }

    this.deliveries.set(order.orderId, deliveryPartner);
    return deliveryPartner;
  }

  // Dunzo API integration
  private async createDunzoTask(request: DeliveryRequest): Promise<DeliveryPartner> {
    try {
      // In production, use actual Dunzo API
      // const response = await fetch('https://apis.dunzo.in/api/v1/tasks', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'client-id': process.env.DUNZO_CLIENT_ID,
      //     'Authorization': `Bearer ${process.env.DUNZO_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     request_id: request.orderId,
      //     pickup_details: {
      //       lat: request.pickupAddress.lat,
      //       lng: request.pickupAddress.lng,
      //       address: request.pickupAddress.address,
      //       contact_name: request.pickupAddress.contactName,
      //       contact_phone: request.pickupAddress.contactPhone
      //     },
      //     drop_details: [{
      //       lat: request.dropAddress.lat,
      //       lng: request.dropAddress.lng,
      //       address: request.dropAddress.address,
      //       contact_name: request.dropAddress.contactName,
      //       contact_phone: request.dropAddress.contactPhone
      //     }],
      //     task_amount: request.orderValue,
      //     payment_method: request.paymentMode
      //   })
      // });
      // const data = await response.json();

      // Mock implementation
      const taskId = `dunzo_${Date.now()}${Math.random().toString(36).substr(2, 6)}`;
      
      return {
        taskId,
        provider: 'dunzo',
        status: 'assigned',
        partnerName: 'Dunzo Partner',
        partnerPhone: '+919999999999',
        trackingUrl: `https://track.dunzo.in/${taskId}`,
        estimatedTime: 30,
        fare: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating Dunzo task:', error);
      throw new Error('Failed to create Dunzo delivery');
    }
  }

  // Porter API integration
  private async createPorterTask(request: DeliveryRequest): Promise<DeliveryPartner> {
    try {
      // In production, use actual Porter API
      // const response = await fetch('https://api.porter.in/v1/orders/create', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-API-KEY': process.env.PORTER_API_KEY
      //   },
      //   body: JSON.stringify({
      //     request_id: request.orderId,
      //     delivery_type: 'now',
      //     pickup_details: {
      //       lat: request.pickupAddress.lat,
      //       lng: request.pickupAddress.lng,
      //       address: request.pickupAddress.address,
      //       contact_name: request.pickupAddress.contactName,
      //       contact_number: request.pickupAddress.contactPhone
      //     },
      //     drop_details: [{
      //       lat: request.dropAddress.lat,
      //       lng: request.dropAddress.lng,
      //       address: request.dropAddress.address,
      //       contact_name: request.dropAddress.contactName,
      //       contact_number: request.dropAddress.contactPhone
      //     }],
      //     additional_comments: request.instructions
      //   })
      // });
      // const data = await response.json();

      // Mock implementation
      const taskId = `porter_${Date.now()}${Math.random().toString(36).substr(2, 6)}`;
      
      return {
        taskId,
        provider: 'porter',
        status: 'assigned',
        partnerName: 'Porter Partner',
        partnerPhone: '+918888888888',
        trackingUrl: `https://porter.in/track/${taskId}`,
        estimatedTime: 35,
        fare: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating Porter task:', error);
      throw new Error('Failed to create Porter delivery');
    }
  }

  // Swiggy Genie API integration
  private async createSwiggyGenieTask(request: DeliveryRequest): Promise<DeliveryPartner> {
    try {
      // In production, use actual Swiggy Genie API
      // Swiggy Genie typically requires partnership agreement

      // Mock implementation
      const taskId = `genie_${Date.now()}${Math.random().toString(36).substr(2, 6)}`;
      
      return {
        taskId,
        provider: 'swiggy-genie',
        status: 'assigned',
        partnerName: 'Swiggy Partner',
        partnerPhone: '+917777777777',
        trackingUrl: `https://swiggy.com/genie/track/${taskId}`,
        estimatedTime: 40,
        fare: 45,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating Swiggy Genie task:', error);
      throw new Error('Failed to create Swiggy Genie delivery');
    }
  }

  // Self delivery (own delivery staff)
  private async createSelfDeliveryTask(request: DeliveryRequest): Promise<DeliveryPartner> {
    const taskId = `self_${Date.now()}${Math.random().toString(36).substr(2, 6)}`;
    
    return {
      taskId,
      provider: 'self-delivery',
      status: 'assigned',
      partnerName: 'Swadika Delivery',
      partnerPhone: '+919958382202',
      estimatedTime: 30,
      fare: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Get delivery status
  async getDeliveryStatus(orderId: string): Promise<DeliveryPartner | null> {
    return this.deliveries.get(orderId) || null;
  }

  // Update delivery status (webhook handler)
  updateDeliveryStatus(
    orderId: string,
    status: DeliveryPartner['status'],
    partnerDetails?: { name: string; phone: string }
  ): DeliveryPartner | null {
    const delivery = this.deliveries.get(orderId);
    if (!delivery) return null;

    delivery.status = status;
    delivery.updatedAt = new Date();

    if (partnerDetails) {
      delivery.partnerName = partnerDetails.name;
      delivery.partnerPhone = partnerDetails.phone;
    }

    this.deliveries.set(orderId, delivery);
    return delivery;
  }

  // Cancel delivery
  async cancelDelivery(orderId: string, reason: string): Promise<boolean> {
    const delivery = this.deliveries.get(orderId);
    if (!delivery) return false;

    try {
      // Call provider's cancel API
      switch (delivery.provider) {
        case 'dunzo':
          // await cancelDunzoTask(delivery.taskId, reason);
          break;
        case 'porter':
          // await cancelPorterTask(delivery.taskId, reason);
          break;
        case 'swiggy-genie':
          // await cancelSwiggyGenieTask(delivery.taskId, reason);
          break;
      }

      delivery.status = 'cancelled';
      delivery.updatedAt = new Date();
      this.deliveries.set(orderId, delivery);
      
      return true;
    } catch (error) {
      console.error('Error cancelling delivery:', error);
      return false;
    }
  }

  // Calculate delivery fare estimate
  async getDeliveryFareEstimate(
    provider: DeliveryProvider,
    pickupLat: number,
    pickupLng: number,
    dropLat: number,
    dropLng: number
  ): Promise<{ fare: number; estimatedTime: number }> {
    // Calculate distance using Haversine formula
    const distance = this.calculateDistance(pickupLat, pickupLng, dropLat, dropLng);

    // Provider-specific fare calculation
    const fareMap: Record<DeliveryProvider, { basefare: number; perKm: number }> = {
      'dunzo': { basefare: 30, perKm: 10 },
      'porter': { basefare: 40, perKm: 12 },
      'swiggy-genie': { basefare: 35, perKm: 11 },
      'self-delivery': { basefare: 25, perKm: 8 }
    };

    const { basefare, perKm } = fareMap[provider];
    const fare = Math.ceil(basefare + (distance * perKm));
    const estimatedTime = Math.ceil(distance * 3); // 3 mins per km average

    return { fare, estimatedTime };
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Auto-book delivery after order is ready
  async autoBookDelivery(order: Order, dropAddress: { lat: number; lng: number; address: string }): Promise<DeliveryPartner> {
    const distance = this.calculateDistance(
      this.cloudKitchenAddress.lat,
      this.cloudKitchenAddress.lng,
      dropAddress.lat,
      dropAddress.lng
    );

    const provider = this.selectBestProvider(distance);
    return await this.createDeliveryTask(order, provider, dropAddress);
  }
}

// Singleton instance
export const deliveryService = new DeliveryService();

// Helper functions for API routes
export async function createDeliveryAPI(
  order: Order,
  provider: DeliveryProvider,
  dropAddress: { lat: number; lng: number; address: string }
) {
  return await deliveryService.createDeliveryTask(order, provider, dropAddress);
}

export async function getDeliveryStatusAPI(orderId: string) {
  return await deliveryService.getDeliveryStatus(orderId);
}

export async function getFareEstimateAPI(
  provider: DeliveryProvider,
  pickupLat: number,
  pickupLng: number,
  dropLat: number,
  dropLng: number
) {
  return await deliveryService.getDeliveryFareEstimate(provider, pickupLat, pickupLng, dropLat, dropLng);
}

export async function autoBookDeliveryAPI(order: Order, dropAddress: { lat: number; lng: number; address: string }) {
  return await deliveryService.autoBookDelivery(order, dropAddress);
}
