"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createPayment, createOrder } from "../lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { cart, clear } = useCart();
  const [info, setInfo] = useState({ name:"", address:"", phone:"" });
  const router = useRouter();
  const total = cart.reduce((sum,i)=>sum+i.price*i.qty,0);

  const handleSubmit = async () => {
    // 1. create payment intent
    const { clientSecret } = await createPayment(total*100);
    // 2. collect card details via Stripe Elements (omitted for brevity)
    // 3. confirm payment, then
    const { orderId } = await createOrder({ info, cart, total });
    clear();
    router.push(`/order/${orderId}`);
  };

  return (
    <Box sx={{ maxWidth:400, mx:"auto", py:6 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      {["name","address","phone"].map((k) => (
        <TextField
          key={k}
          label={k.charAt(0).toUpperCase()+k.slice(1)}
          fullWidth
          value={(info as any)[k]}
          onChange={e=>setInfo(i=>({...i,[k]:e.target.value}))}
          sx={{ mb:2 }}
        />
      ))}
      <Typography variant="h6">Total: ₹{total}</Typography>
      <Button variant="contained" fullWidth sx={{mt:2}} onClick={handleSubmit}>
        Pay & Place Order
      </Button>
    </Box>
  );
}
