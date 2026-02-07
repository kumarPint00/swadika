// src/components/NewsletterModal.tsx
"use client";
import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, useTheme } from "@mui/material";

export default function NewsletterModal() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          mx: "auto",
          mt: "15vh",
          borderRadius: 2,
          width: 320,
          boxShadow: 6,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Get deals in your inbox
        </Typography>
        <TextField fullWidth size="small" label="Email" sx={{ mb: 2 }} />
        <Button fullWidth variant="contained" onClick={() => setOpen(false)}>
          Subscribe
        </Button>
      </Box>
    </Modal>
  );
}
