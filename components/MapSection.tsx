// src/components/MapSection.tsx
"use client";
import { Box, Typography, Grid } from "@mui/material";

export default function MapSection() {
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 4, fontFamily: "Playfair Display, serif" }}
      >
        Find Us Here
      </Typography>
      <Grid
        container
        justifyContent="center"
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <Grid
          size={
            { xs: 12, md: 6 } 
          }
          sx={{
        height: { xs: 300, md: 450 },
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 4,
          }}
        >
          <iframe
        title="Swadika Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2598277374967!2d77.3586008!3d28.6192104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50d5f0c0b97%3A0xabcdef1234567890!2sA-64%20Himalaya%20Enclave%20Khora%20Colony!5e0!3m2!1sen!2sin!4v1680000000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
        <Grid
            size={
            { xs: 12, md: 6 } 
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            A-64, Himalaya Enclave, Khora Colony, Ghaziabad, UP 201309
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> +91 99583 82202
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> swadikadelights@gmail.com
          </Typography> 
          <Typography variant="body1">
            <strong>Hours:</strong> Mon-Sun 10:00 AM - 10:00 PM
          </Typography>
          </Grid>
      </Grid>
    </Box>
  );
}
