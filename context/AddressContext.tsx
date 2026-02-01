// Address Management Context
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "./ToastContext";

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
  type: "home" | "work" | "other";
}

interface AddressContextType {
  addresses: Address[];
  defaultAddress: Address | null;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType>({
  addresses: [],
  defaultAddress: null,
  addAddress: () => {},
  updateAddress: () => {},
  deleteAddress: () => {},
  setDefaultAddress: () => {},
});

export const useAddresses = () => useContext(AddressContext);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { success, error } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("swadika_addresses");
    if (saved) {
      setAddresses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("swadika_addresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0] || null;

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...address,
      id: `ADDR${Date.now()}`,
      isDefault: addresses.length === 0 ? true : (address.isDefault || false),
    };

    if (newAddress.isDefault) {
      setAddresses((prev) =>
        [...prev.map((addr) => ({ ...addr, isDefault: false })), newAddress]
      );
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }

    success("Address added successfully!");
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr))
    );
    success("Address updated!");
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    success("Address deleted");
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    success("Default address updated");
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        defaultAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
