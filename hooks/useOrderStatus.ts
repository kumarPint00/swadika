import { useState, useEffect } from "react";
import { getOrderStatus } from "../lib/api";

export function useOrderStatus(orderId:string) {
  const [status, setStatus] = useState<string>("Preparing");
  useEffect(() => {
    const iv = setInterval(() => {
      getOrderStatus(orderId).then(d=>setStatus(d.status));
    }, 5000);
    return () => clearInterval(iv);
  }, [orderId]);
  return status;
}
