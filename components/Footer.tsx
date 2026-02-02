// src/components/Footer.tsx
"use client";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export default function Footer() {
  return (
    <Box sx={{ background: "#212121", color: "#bbb", pt: 6, pb: 3 }}>
      <Container>
        <Grid container spacing={4}>
          {/* brand */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h5" sx={{ color: "#fff", mb: 1, display: "flex", alignItems: "center" }}>
              <LocalDiningIcon sx={{ mr: 1 }} /> Swadika
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Authentic home-style cuisine from Uttar Pradesh & Bihar cooked fresh every day.
            </Typography>
            <Typography variant="caption" sx={{ color: "#888" }}>
              FSSAI #22725105001188
            </Typography>
          </Grid>

          {/* quick links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>
              Links
            </Typography>
            <Typography variant="body2"><a href="/" style={{ color: "#bbb", textDecoration: "none" }}>Home</a></Typography>
            <Typography variant="body2"><a href="/menu" style={{ color: "#bbb", textDecoration: "none" }}>Menu</a></Typography>
            <Typography variant="body2"><a href="#faq" style={{ color: "#bbb", textDecoration: "none" }}>FAQ</a></Typography>
          </Grid>

          {/* contact */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2">A-64 Himalaya Enclave, Khora Colony</Typography>
            <Typography variant="body2">Ghaziabad 201001</Typography>
            <Typography variant="body2">+91 98765 43210</Typography>
            <Typography variant="body2">support@ghareluswad.com</Typography>
          </Grid>

          {/* social */}
          <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="subtitle1" sx={{ color: "#fff", mb: 1 }}>
              Follow Us
            </Typography>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#2196F3" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#E1306C" }}>
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://wa.me/919958382202" target="_blank" sx={{ color: "#25D366" }}>
              <WhatsAppIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          variant="caption"
          sx={{ mt: 4, display: "block", textAlign: "center", color: "#666" }}
        >
          © {new Date().getFullYear()} Swadika Delights. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
