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

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

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

  const currentTier = user?.tier || "Silver";

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ mb: 6 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
              <Chip
                label={`${currentTier} Member`}
                size="small"
                sx={{ mt: 1, bgcolor: "secondary.main", color: "#fff" }}
              />
            </Box>
          </Box>
        </MotionBox>

        <Grid container spacing={4}>
          {/* Personal Information */}
          <Grid size={{ xs: 12, md: 8 }}>
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              elevation={0}
              sx={{ mb: 4, border: "1px solid", borderColor: "divider" }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <IconButton onClick={() => setEditMode(!editMode)}>
                    <Edit />
                  </IconButton>
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
                    <Button variant="contained" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                    <Button variant="outlined" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
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
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Saved Addresses
                  </Typography>
                  <Button
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={() => setAddressDialog(true)}
                  >
                    Add Address
                  </Button>
                </Box>

                <Stack spacing={2}>
                  {addresses.map((address) => (
                    <Box
                      key={address.id}
                      sx={{
                        p: 2,
                        border: "1px solid",
                        borderColor: address.isDefault ? "primary.main" : "divider",
                        borderRadius: 2,
                        position: "relative",
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
                  ))}
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
                border: "1px solid",
                borderColor: "divider",
                background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
                color: "#fff",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Star sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                      {user?.rewards}
                    </Typography>
                    <Typography variant="body2">Reward Points</Typography>
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
                      {tierBenefits[currentTier as keyof typeof tierBenefits].discount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Free Delivery:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tierBenefits[currentTier as keyof typeof tierBenefits].freeDelivery}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption">Points Multiplier:</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {tierBenefits[currentTier as keyof typeof tierBenefits].points}
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
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button fullWidth variant="outlined" startIcon={<LocalOffer />}>
                    View Offers
                  </Button>
                  <Button fullWidth variant="outlined" startIcon={<CardGiftcard />}>
                    Refer & Earn
                  </Button>
                  <Button fullWidth variant="outlined" color="error" onClick={logout}>
                    Logout
                  </Button>
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
