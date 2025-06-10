// src/components/MiniContact.tsx
"use client";
import { Box, Typography, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

export default function MiniContact() {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        background: "linear-gradient(90deg,#FFB74D,#FF9800)",
        color: "#fff",
        borderRadius: 3,
        my: 8,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Craving home-style food?
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Call us or WhatsApp your order—fresh to your door in 30 min.
      </Typography>
      <Button
        startIcon={<PhoneIcon />}
        href="tel:+9199583822020"
        sx={{ mr: 2, color: "#fff", borderColor: "#fff" }}
        variant="outlined"
      >
        +91 98765 43210
      </Button>
      <Button
        startIcon={<WhatsAppIcon />}
        href="https://wa.me/9199583822020"
        target="_blank"
        variant="contained"
        sx={{ background: "#25D366", "&:hover": { background: "#1EBE5D" } }}
      >
        WhatsApp Now
      </Button>
    </Box>
  );
}
