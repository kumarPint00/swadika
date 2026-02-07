// Order Tracking System
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "./ToastContext";

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";
  address: Address;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery: Date;
  deliveryPartner?: {
    name: string;
    phone: string;
    vehicle: string;
  };
  timeline: {
    status: string;
    timestamp: Date;
    message: string;
  }[];
}

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  createOrder: (items: OrderItem[], address: Address, paymentMethod: string) => string;
  getOrder: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
  trackOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType>({
  orders: [],
  activeOrder: null,
  createOrder: () => "",
  getOrder: () => undefined,
  cancelOrder: () => {},
  trackOrder: () => {},
});

export const useOrders = () => useContext(OrderContext);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const { success, error } = useToast();

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("swadika_orders");
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      // Convert date strings back to Date objects
      const ordersWithDates = parsed.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        estimatedDelivery: new Date(order.estimatedDelivery),
        timeline: order.timeline.map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp),
        })),
      }));
      setOrders(ordersWithDates);
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("swadika_orders", JSON.stringify(orders));
    }
  }, [orders]);

  const createOrder = (items: OrderItem[], address: Address, paymentMethod: string): string => {
    const orderId = `ORD${Date.now()}`;
    const now = new Date();
    const estimatedDelivery = new Date(now.getTime() + 30 * 60000); // 30 minutes

    const newOrder: Order = {
      id: orderId,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "pending",
      address,
      paymentMethod,
      createdAt: now,
      estimatedDelivery,
      timeline: [
        {
          status: "pending",
          timestamp: now,
          message: "Order placed successfully",
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    success("Order placed successfully! 🎉");

    // Simulate order progression
    setTimeout(() => updateOrderStatus(orderId, "confirmed"), 2000);
    setTimeout(() => updateOrderStatus(orderId, "preparing"), 8000);
    setTimeout(() => updateOrderStatus(orderId, "out-for-delivery"), 15000);

    return orderId;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order["status"],
    deliveryPartner?: Order["deliveryPartner"]
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const messages: Record<Order["status"], string> = {
            pending: "Order placed successfully",
            confirmed: "Order confirmed by restaurant",
            preparing: "Chef is preparing your food with love 👨‍🍳",
            "out-for-delivery": "Order is out for delivery 🏍️",
            delivered: "Order delivered! Enjoy your meal 🍛",
            cancelled: "Order cancelled",
          };

          const updatedOrder = {
            ...order,
            status,
            ...(deliveryPartner && { deliveryPartner }),
            timeline: [
              ...order.timeline,
              {
                status,
                timestamp: new Date(),
                message: messages[status],
              },
            ],
          };

          if (activeOrder?.id === orderId) {
            setActiveOrder(updatedOrder);
          }

          // Show notification
          if (status === "out-for-delivery") {
            success("Your order is out for delivery! 🏍️");
          }

          return updatedOrder;
        }
        return order;
      })
    );

    // Add delivery partner when out for delivery
    if (status === "out-for-delivery" && !deliveryPartner) {
      const partners = [
        { name: "Mukesh Kumar", phone: "+91 9958382202", vehicle: "Royal Enfield Classic 350" },
        { name: "Amit Singh", phone: "+91 98765 43211", vehicle: "Honda Activa" },
        { name: "Priya Sharma", phone: "+91 98765 43212", vehicle: "Hero Splendor" },
      ];
      const partner = partners[Math.floor(Math.random() * partners.length)];
      updateOrderStatus(orderId, status, partner);
    }
  };

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const cancelOrder = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (order && order.status !== "delivered" && order.status !== "cancelled") {
      updateOrderStatus(id, "cancelled");
      error("Order cancelled");
    }
  };

  const trackOrder = (id: string) => {
    const order = getOrder(id);
    if (order) {
      setActiveOrder(order);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        createOrder,
        getOrder,
        cancelOrder,
        trackOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
