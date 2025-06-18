import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function CartPage() {
  const { cart, remove, clear } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={() => remove(item.id)} />
      ))}
      <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{total}</Typography>
      <Box mt={4} display="flex" gap={2}>
        <Button variant="outlined" onClick={clear}>Clear Cart</Button>
        <Link href="/checkout" passHref><Button variant="contained">Checkout</Button></Link>
      </Box>
    </Container>
  );
}
