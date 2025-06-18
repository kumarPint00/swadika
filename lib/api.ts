export async function fetchMenu() {
  const res = await fetch("/api/menu");
  return res.json();
}

export async function createPayment(amount:number) {
  const res = await fetch("/api/checkout", { method:"POST", body:JSON.stringify({amount}) });
  return res.json();
}

export async function createOrder(order:any) {
  const res = await fetch("/api/orders", { method:"POST", body:JSON.stringify(order) });
  return res.json();
}

export async function getOrderStatus(orderId:string) {
  const res = await fetch(`/api/orders/${orderId}/status`);
  return res.json();
}
