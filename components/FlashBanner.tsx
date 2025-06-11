"use client";
import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

export default function FlashBanner() {
  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOpen(!localStorage.getItem("bannerDismiss"));
      if (!open) localStorage.setItem("bannerDismiss", "true");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ y: -120 }}
          animate={{ y: 0 }}
          exit={{ y: -120 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            bgcolor: "warning.main",
            color: "#fff",
            zIndex: 1500,
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>
            TODAY ONLY: ₹50 OFF on Litti-Chokha Combo – use code <strong>LITTI50</strong>
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff", ml: 2 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </AnimatePresence>
  );
}
