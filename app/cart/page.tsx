"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Chip,
  Grid,
} from "@mui/material";
import { Add, Remove, Delete, ArrowBack, ArrowForward, LocalOffer } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = ["Cart", "Address & Time", "Payment"];

export default function CartPage() {
  const { cart, remove, clear, add } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = deliveryOption === "express" ? 49 : 0;
  const discount = promoCode === "FIRST10" ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleNext = () => {
    if (activeStep === 0 && cart.length === 0) return;
    if (activeStep === 2) {
      // Complete order
      router.push("/order-confirmation");
      clear();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty === 0) {
      remove(id);
    } else {
      const item = cart.find((i) => i.id === id);
      if (item) {
        remove(id);
        add({ ...item, qty: newQty });
      }
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 4 }}>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Step 0: Cart */}
            {activeStep === 0 && (
              <Box>
                {cart.length === 0 ? (
                  <Card>
                    <CardContent sx={{ textAlign: "center", py: 8 }}>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                        Your cart is empty
                      </Typography>
                      <Button component={Link} href="/menu" variant="contained">
                        Browse Menu
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  cart.map((item) => (
                    <Card key={item.id} sx={{ mb: 2 }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{item.price} each
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 6, sm: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                              >
                                <Remove />
                              </IconButton>
                              <Typography>{item.qty}</Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                              >
                                <Add />
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 6, sm: 2 }}>
                            <Typography variant="h6">₹{item.price * item.qty}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 1 }}>
                            <IconButton color="error" onClick={() => remove(item.id)}>
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            )}

            {/* Step 1: Address & Time */}
            {activeStep === 1 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Delivery Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Full Name" defaultValue={user?.name} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Phone" defaultValue={user?.phone} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Delivery Address"
                        multiline
                        rows={3}
                        placeholder="House number, street, landmark..."
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="City" defaultValue="Ghaziabad" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField fullWidth label="Pincode" />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Delivery Speed
                  </Typography>
                  <FormControl>
                    <RadioGroup value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                      <FormControlLabel
                        value="standard"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography>Standard Delivery (40-60 min)</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Free
                            </Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="express"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography>Express Delivery (20-30 min)</Typography>
                            <Typography variant="body2" color="text.secondary">
                              +₹49
                            </Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {activeStep === 2 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    Payment Method
                  </Typography>
                  <FormControl fullWidth>
                    <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Pay Online (UPI / Card / Wallet)"
                      />
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Cash on Delivery"
                      />
                    </RadioGroup>
                  </FormControl>

                  {paymentMethod === "online" && (
                    <Box sx={{ mt: 3, p: 3, bgcolor: "success.light", borderRadius: 2 }}>
                      <Typography variant="body2" color="success.dark">
                        ✓ Get 5% instant discount on online payment
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>₹{subtotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Delivery Fee</Typography>
                  <Typography>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</Typography>
                </Box>
                {discount > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, color: "success.main" }}>
                    <Typography>Discount</Typography>
                    <Typography>-₹{discount.toFixed(2)}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">₹{total.toFixed(2)}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  InputProps={{
                    endAdornment: <LocalOffer color="action" />,
                  }}
                />
                {promoCode === "FIRST10" && (
                  <Chip
                    label="10% discount applied!"
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                {activeStep > 0 && (
                  <Button fullWidth variant="outlined" onClick={handleBack} startIcon={<ArrowBack />}>
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === 0 && cart.length === 0}
                  endIcon={<ArrowForward />}
                >
                  {activeStep === 2 ? "Place Order" : "Continue"}
                </Button>
              </Box>

              {user?.rewards && user.rewards > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: "secondary.light", borderRadius: 2 }}>
                  <Typography variant="body2">
                    You have <strong>{user.rewards}</strong> reward points worth ₹{user.rewards}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

