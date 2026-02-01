// Enhanced Cart & Checkout Page
"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  IconButton,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Stack,
} from "@mui/material";
import {
  Delete,
  Add,
  Remove,
  LocalOffer,
  CreditCard,
  AccountBalanceWallet,
  Payment,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAddresses } from "@/context/AddressContext";
import { useOrders } from "@/context/OrderContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function CartPage() {
  const { cart, remove, clear } = useCart();
  const { isAuthenticated } = useAuth();
  const { defaultAddress, addresses } = useAddresses();
  const { createOrder } = useOrders();
  const { success, error } = useToast();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const steps = ["Cart", "Address", "Payment"];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal >= 299 ? 0 : 40;
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = () => {
    const promoCodes: { [key: string]: number } = {
      FIRST20: 0.2,
      SAVE10: 0.1,
      WELCOME15: 0.15,
    };

    if (promoCodes[promoCode]) {
      const discountAmount = subtotal * promoCodes[promoCode];
      setDiscount(discountAmount);
      success(`Promo code applied! You saved ₹${discountAmount}`);
    } else {
      error("Invalid promo code");
    }
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      error("Please login to place order");
      router.push("/login");
      return;
    }

    if (!selectedAddress) {
      error("Please select a delivery address");
      return;
    }

    const address = addresses.find((a) => a.id === selectedAddress);
    if (!address) return;

    const orderId = createOrder(cart, address, paymentMethod);
    clear();
    success("Order placed successfully! 🎉");
    router.push(`/orders`);
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 10 }}>
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            sx={{ textAlign: "center" }}
          >
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 800 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Add some delicious items to get started!
            </Typography>
            <Button component={Link} href="/menu" variant="contained" size="large">
              Browse Menu
            </Button>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 6 }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 800 }}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </MotionBox>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Step 1: Cart Items */}
            {activeStep === 0 && (
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Cart Items ({cart.length})
                  </Typography>

                  <Stack spacing={2}>
                    {cart.map((item, index) => (
                      <MotionBox
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{item.price} each
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton size="small">
                              <Remove />
                            </IconButton>
                            <Typography sx={{ minWidth: 30, textAlign: "center" }}>
                              {item.qty}
                            </Typography>
                            <IconButton size="small">
                              <Add />
                            </IconButton>
                          </Box>

                          <Typography variant="h6" sx={{ minWidth: 80, textAlign: "right" }}>
                            ₹{item.price * item.qty}
                          </Typography>

                          <IconButton color="error" onClick={() => remove(item.id)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </MotionBox>
                    ))}
                  </Stack>

                  <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={clear}>
                      Clear Cart
                    </Button>
                    <Button variant="contained" onClick={() => setActiveStep(1)}>
                      Proceed to Address
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            )}

            {/* Step 2: Address Selection */}
            {activeStep === 1 && (
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Delivery Address
                    </Typography>
                    <Button
                      component={Link}
                      href="/profile"
                      variant="outlined"
                      size="small"
                    >
                      Add New
                    </Button>
                  </Box>

                  {addresses.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        No saved addresses
                      </Typography>
                      <Button component={Link} href="/profile" variant="contained">
                        Add Address
                      </Button>
                    </Box>
                  ) : (
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      >
                        {addresses.map((address) => (
                          <Box
                            key={address.id}
                            sx={{
                              p: 2,
                              mb: 2,
                              border: "2px solid",
                              borderColor:
                                selectedAddress === address.id ? "primary.main" : "divider",
                              borderRadius: 2,
                              cursor: "pointer",
                            }}
                            onClick={() => setSelectedAddress(address.id)}
                          >
                            <FormControlLabel
                              value={address.id}
                              control={<Radio />}
                              label={
                                <Box>
                                  <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {address.name}
                                    </Typography>
                                    {address.isDefault && (
                                      <Chip label="Default" size="small" color="primary" />
                                    )}
                                  </Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {address.addressLine1}, {address.city}, {address.state} -{" "}
                                    {address.pincode}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    📞 {address.phone}
                                  </Typography>
                                </Box>
                              }
                            />
                          </Box>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}

                  <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={() => setActiveStep(0)}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(2)}
                      disabled={!selectedAddress}
                    >
                      Proceed to Payment
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            )}

            {/* Step 3: Payment */}
            {activeStep === 2 && (
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Payment Method
                  </Typography>

                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <Box
                        sx={{
                          p: 3,
                          mb: 2,
                          border: "2px solid",
                          borderColor: paymentMethod === "cod" ? "primary.main" : "divider",
                          borderRadius: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Payment sx={{ fontSize: 32, color: "primary.main" }} />
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  Cash on Delivery
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Pay when you receive
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          p: 3,
                          mb: 2,
                          border: "2px solid",
                          borderColor: paymentMethod === "card" ? "primary.main" : "divider",
                          borderRadius: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <CreditCard sx={{ fontSize: 32, color: "primary.main" }} />
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  Credit/Debit Card
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Visa, Mastercard, RuPay
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          p: 3,
                          border: "2px solid",
                          borderColor: paymentMethod === "upi" ? "primary.main" : "divider",
                          borderRadius: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <FormControlLabel
                          value="upi"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <AccountBalanceWallet sx={{ fontSize: 32, color: "primary.main" }} />
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  UPI
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Google Pay, PhonePe, Paytm
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>

                  <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={() => setActiveStep(1)}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<CheckCircle />}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            )}
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              elevation={0}
              sx={{
                position: "sticky",
                top: 100,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Order Summary
                </Typography>

                {/* Promo Code */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    InputProps={{
                      endAdornment: (
                        <Button size="small" onClick={handleApplyPromo}>
                          Apply
                        </Button>
                      ),
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label="FIRST20"
                      size="small"
                      onClick={() => setPromoCode("FIRST20")}
                      clickable
                    />
                    <Chip
                      label="SAVE10"
                      size="small"
                      onClick={() => setPromoCode("SAVE10")}
                      clickable
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Price Breakdown */}
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">₹{subtotal}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">Delivery Fee</Typography>
                    <Typography variant="body2" color={deliveryFee === 0 ? "success.main" : "text.primary"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </Typography>
                  </Box>
                  {discount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="success.main">
                        Discount
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -₹{discount}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                    ₹{total}
                  </Typography>
                </Box>

                {subtotal < 299 && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "info.main",
                      color: "#fff",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2">
                      Add ₹{299 - subtotal} more for FREE delivery! 🎉
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

