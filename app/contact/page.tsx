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
  Grid,
} from "@mui/material";
import { Email, Phone, LocationOn, Schedule } from "@mui/icons-material";

const contactInfo = [
  { icon: <Phone />, label: "Phone", value: "+91 9958382202" },
  { icon: <Email />, label: "Email", value: "info@swadika.com" },
  { icon: <LocationOn />, label: "Address", value: "A-64, Himalaya Enclave, Khora Colony, Ghaziabad, UP 201309" },
  { icon: <Schedule />, label: "Hours", value: "Mon-Sun: 10:00 AM - 10:00 PM" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement form submission
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 2, textAlign: "center" }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: "center" }}>
          We'd love to hear from you
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Contact Information
            </Typography>
            {contactInfo.map((info, idx) => (
              <Box key={idx} sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Box sx={{ color: "secondary.main" }}>{info.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {info.label}
                  </Typography>
                  <Typography variant="body1">{info.value}</Typography>
                </Box>
              </Box>
            ))}

            {/* Map */}
            <Box sx={{ mt: 6 }}>
              <iframe
                title="Swadika Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2598277374967!2d77.3586008!3d28.6192104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50d5f0c0b97%3A0xabcdef1234567890!2sA-64%20Himalaya%20Enclave%20Khora%20Colony!5e0!3m2!1sen!2sin!4v1680000000000"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 12 }}
                loading="lazy"
              />
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Send us a Message
                </Typography>
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
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button variant="contained" size="large" type="submit" fullWidth>
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
