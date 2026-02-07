// src/components/MiniContact.tsx
"use client";
import { Box, Typography, Button, useTheme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

export default function MiniContact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        background: isDark 
          ? "linear-gradient(90deg, rgba(255, 183, 77, 0.2), rgba(255, 152, 0, 0.2))"
          : "linear-gradient(90deg,#FFB74D,#FF9800)",
        color: isDark ? "text.primary" : "common.white",
        borderRadius: 3,
        my: 8,
        border: isDark ? "1px solid rgba(255, 183, 77, 0.3)" : "none",
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
        href="tel:+919958382202"
        sx={{ 
          mr: 2, 
          color: isDark ? "text.primary" : "common.white", 
          borderColor: isDark ? "text.primary" : "common.white" 
        }}
        variant="outlined"
      >
        +91 99583 82202
      </Button>
      <Button
        startIcon={<WhatsAppIcon />}
        href="https://wa.me/919958382202"
        target="_blank"
        variant="contained"
        sx={{ background: "#25D366", "&:hover": { background: "#1EBE5D" } }}
      >
        WhatsApp Now
      </Button>
    </Box>
  );
}
