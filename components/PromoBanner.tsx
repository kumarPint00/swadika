"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Container } from "@mui/material";
import { Close, LocalOffer } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PromoBannerProps {
  message?: string;
  code?: string;
  linkTo?: string;
  dismissible?: boolean;
}

export default function PromoBanner({
  message = "🎉 PG Combo: Litti Chokha + Lassi - ₹50 OFF! Use code: PG50",
  code = "PG50",
  linkTo = "/menu?promo=PG50",
  dismissible = true,
}: PromoBannerProps) {
  const [visible, setVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promos = [
    {
      message: "🎉 PG Combo Special - Litti Chokha + Lassi",
      discount: "₹50 OFF",
      code: "PG50",
      link: "/menu?category=Combos",
    },
    {
      message: "🔥 SOC Special - Any 2 Thalis",
      discount: "50% OFF",
      code: "SOC50",
      link: "/menu?category=Thalis",
    },
    {
      message: "🆓 Free Delivery on orders above ₹299",
      discount: "FREE DELIVERY",
      code: "FREEDEL",
      link: "/menu",
    },
    {
      message: "⭐ First Order? Get ₹100 OFF!",
      discount: "₹100 OFF",
      code: "FIRST100",
      link: "/menu",
    },
  ];

  // Auto-rotate promos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const promo = promos[currentPromo];

  return (
    <AnimatePresence mode="wait">
      <Box
        component={motion.div}
        key={currentPromo}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
          color: "#fff",
          py: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 1100,
          boxShadow: "0 4px 12px rgba(255,107,53,0.3)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Icon */}
            <Box
              component={motion.div}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <LocalOffer sx={{ fontSize: 28 }} />
            </Box>

            {/* Message */}
            <Box flex={1}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textAlign: { xs: "left", sm: "center" },
                }}
              >
                {promo.message} •{" "}
                <Box
                  component="span"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.25)",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 800,
                  }}
                >
                  {promo.discount}
                </Box>
              </Typography>
            </Box>

            {/* CTA */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                component={Link}
                href={promo.link}
                variant="contained"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  color: "#FF6B35",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Order Now
              </Button>

              {dismissible && (
                <IconButton
                  size="small"
                  onClick={() => setVisible(false)}
                  sx={{ color: "#fff" }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Promo indicator dots */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 1,
            }}
          >
            {promos.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: currentPromo === index ? "#fff" : "rgba(255,255,255,0.4)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPromo(index)}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </AnimatePresence>
  );
}
