// User Profile Page
"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit,
  LocationOn,
  Delete,
  Add,
  Star,
  LocalOffer,
  CardGiftcard,
  Home,
  Work,
  Place,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useAddresses, Address } from "@/context/AddressContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useAddresses();
  const { success } = useToast();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [addressDialog, setAddressDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    type: "home",
  });

  const handleSaveProfile = () => {
    success("Profile updated successfully!");
    setEditMode(false);
  };

  const handleAddAddress = () => {
    addAddress(newAddress);
    setAddressDialog(false);
    setNewAddress({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      type: "home",
    });
  };

  const tierBenefits = {
    Silver: { discount: "5%", freeDelivery: "₹299+", points: "1x" },
    Gold: { discount: "10%", freeDelivery: "₹199+", points: "1.5x" },
    Platinum: { discount: "15%", freeDelivery: "All orders", points: "2x" },
  };

  const currentTier: keyof typeof tierBenefits = (user?.tier && (user.tier in tierBenefits)) 
    ? (user.tier as keyof typeof tierBenefits) 
    : "Silver";

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 50%, #00D9FF 100%)",
          py: 8,
          overflow: "hidden",
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(60px)",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ color: "#fff" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
              <MotionBox
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    fontSize: "3rem",
                    fontWeight: 800,
                    border: "4px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
              </MotionBox>
              <Box>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
                  {user?.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, mb: 1 }}>
                  {user?.email}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={`✨ ${currentTier} Member`}
                    sx={{ 
                      bgcolor: "rgba(255, 255, 255, 0.2)", 
                      color: "#fff",
                      fontWeight: 700,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Chip
                    label={`🎯 ${user?.rewards || 0} Points`}
                    sx={{ 
                      bgcolor: "rgba(255, 255, 255, 0.2)", 
                      color: "#fff",
                      fontWeight: 700,
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <MotionBox
                  whileHover={{ y: -5 }}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    p: 2.5,
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>24</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Total Orders</Typography>
                </MotionBox>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <MotionBox
                  whileHover={{ y: -5 }}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    p: 2.5,
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>₹4.2k</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Total Spent</Typography>
                </MotionBox>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <MotionBox
                  whileHover={{ y: -5 }}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    p: 2.5,
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>₹420</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Saved</Typography>
                </MotionBox>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <MotionBox
                  whileHover={{ y: -5 }}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    p: 2.5,
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>5</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>Favorites</Typography>
                </MotionBox>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>

        <Grid container spacing={4}>
          {/* Personal Information */}
          <Grid size={{ xs: 12, md: 8 }}>
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              elevation={0}
              sx={{ 
                mb: 4, 
                border: "2px solid", 
                borderColor: "divider",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box sx={{ 
                bgcolor: "primary.main", 
                color: "#fff", 
                p: 2,
                background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  👤 Personal Information
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                  <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton 
                      onClick={() => setEditMode(!editMode)}
                      sx={{
                        bgcolor: editMode ? "error.main" : "primary.main",
                        color: "#fff",
                        "&:hover": { bgcolor: editMode ? "error.dark" : "primary.dark" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </MotionBox>
                </Box>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editMode}
                    />
                  </Grid>
                </Grid>

                {editMode && (
                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="contained" 
                        onClick={handleSaveProfile}
                        sx={{
                          background: "linear-gradient(135deg, #00C853 0%, #00E676 100%)",
                          fontWeight: 700,
                        }}
                      >
                        \u2714 Save Changes
                      </Button>
                    </MotionBox>
                    <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outlined" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </MotionBox>
                  </Box>
                )}
              </CardContent>
            </MotionCard>

            {/* Saved Addresses */}
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              elevation={0}
              sx={{ 
                border: "2px solid", 
                borderColor: "divider",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box sx={{ 
                bgcolor: "secondary.main", 
                color: "#fff", 
                p: 2,
                background: "linear-gradient(135deg, #00D9FF 0%, #5CE1E6 100%)",
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  📍 Saved Addresses
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                  <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      startIcon={<Add />}
                      variant="contained"
                      onClick={() => setAddressDialog(true)}
                      sx={{
                        background: "linear-gradient(135deg, #00D9FF 0%, #5CE1E6 100%)",
                        fontWeight: 700,
                      }}
                    >
                      Add Address
                    </Button>
                  </MotionBox>
                </Box>

                <Stack spacing={2}>
                  {addresses.length === 0 ? (
                    <Box sx={{ 
                      textAlign: "center", 
                      py: 6,
                      border: "2px dashed",
                      borderColor: "divider",
                      borderRadius: 3,
                    }}>
                      <LocationOn sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No addresses saved yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add your delivery address to get started
                      </Typography>
                    </Box>
                  ) : (
                    addresses.map((address, idx) => (
                      <MotionBox
                        key={address.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <Box
                          sx={{
                            p: 2.5,
                            border: "2px solid",
                            borderColor: address.isDefault ? "primary.main" : "divider",
                            borderRadius: 3,
                            position: "relative",
                            bgcolor: address.isDefault ? "rgba(255, 61, 113, 0.05)" : "transparent",
                          }}
                        >
                      <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
                        <Box
                          sx={{
                            p: 1,
                            bgcolor: "primary.main",
                            color: "#fff",
                            borderRadius: 1,
                          }}
                        >
                          {address.type === "home" ? <Home /> : address.type === "work" ? <Work /> : <Place />}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {address.name}
                            </Typography>
                            {address.isDefault && (
                              <Chip label="Default" size="small" color="primary" />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                            {address.city}, {address.state} - {address.pincode}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            📞 {address.phone}
                          </Typography>
                        </Box>
                        <Box>
                          {!address.isDefault && (
                            <Button
                              size="small"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteAddress(address.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                        </Box>
                      </MotionBox>
                    ))
                  )}
                </Stack>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Rewards */}
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              elevation={0}
              sx={{
                mb: 3,
                border: "2px solid transparent",
                borderRadius: 4,
                background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
                color: "#fff",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                sx={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                  filter: "blur(30px)",
                }}
              />
              <CardContent sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <MotionBox
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Star sx={{ fontSize: 48 }} />
                  </MotionBox>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      {user?.rewards || 0}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95 }}>Reward Points</Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }} />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {currentTier} Member Benefits:
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Discount:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tierBenefits[currentTier].discount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Free Delivery:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tierBenefits[currentTier].freeDelivery}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Points Multiplier:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tierBenefits[currentTier].points}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </MotionCard>

            {/* Quick Actions */}
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              elevation={0}
              sx={{ 
                border: "2px solid", 
                borderColor: "divider",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <Box sx={{ 
                bgcolor: "primary.main", 
                color: "#fff", 
                p: 2,
                background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  \u26a1 Quick Actions
                </Typography>
              </Box>
              <CardContent sx={{ p: 2.5 }}>
                <Stack spacing={2}>
                  <MotionBox whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<LocalOffer />}
                      sx={{ 
                        justifyContent: "flex-start",
                        py: 1.5,
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": { borderWidth: 2 },
                      }}
                    >
                      View Offers
                    </Button>
                  </MotionBox>
                  <MotionBox whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      startIcon={<CardGiftcard />}
                      sx={{ 
                        justifyContent: "flex-start",
                        py: 1.5,
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": { borderWidth: 2 },
                      }}
                    >
                      Refer & Earn
                    </Button>
                  </MotionBox>
                  <MotionBox whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="error" 
                      onClick={logout}
                      sx={{ 
                        justifyContent: "flex-start",
                        py: 1.5,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
                      }}
                    >
                      \ud83d\udeaa Logout
                    </Button>
                  </MotionBox>
                </Stack>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>

        {/* Add Address Dialog */}
        <Dialog
          open={addressDialog}
          onClose={() => setAddressDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add New Address</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address Line 1"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Address Line 2 (Optional)"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Address Type</InputLabel>
                  <Select
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as "home" | "work" | "other" })}
                    label="Address Type"
                  >
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Landmark (Optional)"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddressDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddAddress}>
              Save Address
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
