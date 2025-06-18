"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id:string; name:string; qty:number; price:number; };
const CartContext = createContext<{
  cart:CartItem[]; add:(i:CartItem)=>void; remove:(id:string)=>void; clear:()=>void;
}>({ cart:[], add:()=>{}, remove:()=>{}, clear:()=>{} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{
      cart,
      add: (i) => setCart(c=>[...c,i]),
      remove: (id) => setCart(c=>c.filter(x=>x.id!==id)),
      clear: () => setCart([]),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
