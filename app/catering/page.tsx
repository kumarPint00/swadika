"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { CheckCircle, People, Restaurant, Event } from "@mui/icons-material";

const packages = [
  {
    title: "Small Gathering",
    guests: "10-20 people",
    price: "₹5,000+",
    features: ["3 Main courses", "2 Sides", "1 Dessert", "Disposable plates & cutlery"],
  },
  {
    title: "Medium Event",
    guests: "20-50 people",
    price: "₹12,000+",
    features: ["5 Main courses", "3 Sides", "2 Desserts", "Setup assistance", "Serving staff"],
  },
  {
    title: "Large Celebration",
    guests: "50+ people",
    price: "₹25,000+",
    features: ["Custom menu", "Full service", "Dedicated team", "Decor consultation", "Live stations"],
  },
];

export default function CateringPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    event: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Catering inquiry:", formData);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 12 }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Catering Services
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: "auto", opacity: 0.9, fontWeight: 400 }}>
            Make your celebrations special with authentic home-cooked flavors
          </Typography>
        </Container>
      </Box>

      {/* Packages */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ mb: 6, textAlign: "center" }}>
          Catering Packages
        </Typography>
        <Grid container spacing={4}>
          {packages.map((pkg, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {pkg.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <People fontSize="small" color="secondary" />
                    <Typography variant="body2" color="text.secondary">
                      {pkg.guests}
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="secondary.main" sx={{ mb: 3 }}>
                    {pkg.price}
                  </Typography>

                  <List>
                    {pkg.features.map((feature, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Inquiry Form */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ mb: 6, textAlign: "center" }}>
            Get a Quote
          </Typography>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Event Date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Number of Guests"
                          type="number"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Event Type"
                          value={formData.event}
                          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                          placeholder="e.g., Birthday, Wedding, Corporate Event"
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Special Requirements"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Button variant="contained" size="large" type="submit" fullWidth>
                          Request Quote
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Why Choose Our Catering?
                </Typography>
                <List>
                  {[
                    "Authentic home-style cooking",
                    "Fresh ingredients, no preservatives",
                    "FSSAI certified kitchen",
                    "Customizable menus",
                    "Professional service staff",
                    "Flexible packages for all budgets",
                    "On-time delivery guaranteed",
                  ].map((point, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
