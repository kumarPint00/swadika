// Order History & Tracking Page
"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Avatar,
  LinearProgress,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  CheckCircle,
  LocalShipping,
  Restaurant,
  HourglassEmpty,
  Phone,
  DirectionsBike,
  Cancel,
  Replay,
  Download,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const statusConfig = {
  pending: { icon: <HourglassEmpty />, color: "#FFB300", label: "Order Placed" },
  confirmed: { icon: <CheckCircle />, color: "#00C853", label: "Confirmed" },
  preparing: { icon: <Restaurant />, color: "#FF6B35", label: "Preparing" },
  "out-for-delivery": { icon: <LocalShipping />, color: "#6A0572", label: "Out for Delivery" },
  delivered: { icon: <CheckCircle />, color: "#00C853", label: "Delivered" },
  cancelled: { icon: <Cancel />, color: "#D32F2F", label: "Cancelled" },
};

export default function OrdersPage() {
  const { orders, activeOrder, trackOrder, cancelOrder } = useOrders();
  const { add, clear } = useCart();
  const { success } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const reorderItems = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      clear();
      order.items.forEach((item) => add(item));
      success("Items added to cart! 🛒");
    }
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 6, textAlign: "center" }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 800 }}>
            My Orders
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
            Track your orders in real-time
          </Typography>
        </MotionBox>

        {/* Active Order Highlight */}
        {activeOrder && activeOrder.status !== "delivered" && activeOrder.status !== "cancelled" && (
          <MotionCard
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            sx={{
              mb: 4,
              background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
              color: "#fff",
              p: 4,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              🔥 Active Order - {activeOrder.id}
            </Typography>

            {/* Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">
                  {statusConfig[activeOrder.status].label}
                </Typography>
                <Typography variant="body2">
                  ETA: {activeOrder.estimatedDelivery.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={
                  activeOrder.status === "pending"
                    ? 20
                    : activeOrder.status === "confirmed"
                    ? 40
                    : activeOrder.status === "preparing"
                    ? 60
                    : activeOrder.status === "out-for-delivery"
                    ? 80
                    : 100
                }
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "#fff",
                  },
                }}
              />
            </Box>

            {/* Stepper */}
            <Stepper
              activeStep={
                activeOrder.status === "pending"
                  ? 0
                  : activeOrder.status === "confirmed"
                  ? 1
                  : activeOrder.status === "preparing"
                  ? 2
                  : 3
              }
              sx={{
                "& .MuiStepLabel-label": { color: "rgba(255,255,255,0.7)" },
                "& .MuiStepLabel-label.Mui-active": { color: "#fff" },
                "& .MuiStepLabel-label.Mui-completed": { color: "#fff" },
                "& .MuiStepIcon-root": { color: "rgba(255,255,255,0.3)" },
                "& .MuiStepIcon-root.Mui-active": { color: "#fff" },
                "& .MuiStepIcon-root.Mui-completed": { color: "#00C853" },
              }}
            >
              <Step>
                <StepLabel>Confirmed</StepLabel>
              </Step>
              <Step>
                <StepLabel>Preparing</StepLabel>
              </Step>
              <Step>
                <StepLabel>Out for Delivery</StepLabel>
              </Step>
              <Step>
                <StepLabel>Delivered</StepLabel>
              </Step>
            </Stepper>

            {/* Delivery Partner */}
            {activeOrder.deliveryPartner && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.15)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "#fff", color: "#6A0572" }}>
                  <DirectionsBike />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {activeOrder.deliveryPartner.name}
                  </Typography>
                  <Typography variant="caption">
                    {activeOrder.deliveryPartner.vehicle}
                  </Typography>
                </Box>
                <IconButton
                  sx={{ bgcolor: "#fff", color: "#6A0572", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }}
                  href={`tel:${activeOrder.deliveryPartner.phone}`}
                >
                  <Phone />
                </IconButton>
              </Box>
            )}
          </MotionCard>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ textAlign: "center", py: 10 }}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
              No orders yet
            </Typography>
            <Button component={Link} href="/menu" variant="contained" size="large">
              Start Ordering
            </Button>
          </MotionBox>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order, index) => (
              <Grid size={{ xs: 12 }} key={order.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  elevation={0}
                  sx={{ border: "1px solid", borderColor: "divider" }}
                >
                  <CardContent>
                    <Grid container spacing={3}>
                      {/* Order Info */}
                      <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                          <Typography variant="h6">Order #{order.id}</Typography>
                          <Chip
                            icon={statusConfig[order.status].icon}
                            label={statusConfig[order.status].label}
                            size="small"
                            sx={{
                              bgcolor: statusConfig[order.status].color,
                              color: "#fff",
                            }}
                          />
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {order.createdAt.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {/* Items */}
                        <Stack spacing={1}>
                          {order.items.map((item) => (
                            <Box
                              key={item.id}
                              sx={{ display: "flex", justifyContent: "space-between" }}
                            >
                              <Typography variant="body2">
                                {item.qty}x {item.name}
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                ₹{item.price * item.qty}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" sx={{ textAlign: "right" }}>
                          Total: ₹{order.total}
                        </Typography>
                      </Grid>

                      {/* Actions */}
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={2}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Replay />}
                            onClick={() => reorderItems(order.id)}
                          >
                            Reorder
                          </Button>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Download />}
                          >
                            Invoice
                          </Button>
                          {order.status !== "delivered" && order.status !== "cancelled" && (
                            <Button
                              fullWidth
                              variant="outlined"
                              color="error"
                              startIcon={<Cancel />}
                              onClick={() => setSelectedOrder(order.id)}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Cancel Confirmation Dialog */}
        <Dialog
          open={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        >
          <DialogTitle>Cancel Order?</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel this order? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedOrder(null)}>No, Keep Order</Button>
            <Button
              onClick={() => selectedOrder && handleCancelOrder(selectedOrder)}
              color="error"
              variant="contained"
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
