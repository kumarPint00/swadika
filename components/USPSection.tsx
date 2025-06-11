// src/components/USPSection.tsx
"use client";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { LocalDining, Verified, DeliveryDining } from "@mui/icons-material";
import { motion } from "framer-motion";
import LottieIcon from "./LottieIcon";

const usps = [
  {
    icon: <LocalDining fontSize="large" color="primary" />,
    title: "100 % Home-Cooked",
    desc: "Every dish is prepared fresh in a hygienic home kitchen.",
  },
  {
    icon: <Verified fontSize="large" color="primary" />,
    title: "FSSAI Certified",
    desc: "Licensed (#22725105001188) & compliant with food-safety norms.",
  },
  {
    icon: <DeliveryDining fontSize="large" color="primary" />,
    title: "30-min Delivery",
    desc: "Piping hot meals delivered fast across Ghaziabad & Noida.",
  },
];

export default function USPSection() {
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 6, fontFamily: "Playfair Display, serif" }}
      >
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        {usps.map((u, i) => (
          <Grid size={{ xs: 12, sm: 4 }} key={u.title}>
            <Paper
              component={motion.div}
              whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 200 }}
              sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
            >
              {u.icon}
              <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
                {u.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {u.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <LottieIcon json="/lotties/cooking.json" />

    </Box>
  );
}
