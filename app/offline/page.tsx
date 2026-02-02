"use client";
import { Box, Container, Typography, Button } from "@mui/material";
import { WifiOff, Home, Refresh } from "@mui/icons-material";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 4,
        }}
      >
        <WifiOff sx={{ fontSize: 120, color: "text.secondary", mb: 3 }} />
        
        <Typography variant="h3" fontWeight={700} gutterBottom>
          You're Offline
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
          Oops! Looks like you've lost your internet connection. Don't worry, you can still browse your cart and previous orders.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Home />}
            component={Link}
            href="/"
          >
            Go Home
          </Button>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            💡 Tip: Install Our App
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add Swadika to your home screen for faster access and offline support!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
