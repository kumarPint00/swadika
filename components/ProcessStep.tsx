// src/components/ProcessSteps.tsx
"use client";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { Kitchen, Restaurant, LocalShipping } from "@mui/icons-material";

const steps = [
  { icon: <Kitchen />, title: "We Prep", desc: "Fresh local ingredients" },
  { icon: <Restaurant />, title: "We Cook", desc: "Authentic family recipes" },
  { icon: <LocalShipping />, title: "We Deliver", desc: "Hot & fast to you" },
];

export default function ProcessSteps() {
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontFamily: "Playfair Display, serif", mb: 6 }}
      >
        How It Works
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {steps.map((s) => (
          <Paper
            key={s.title}
            sx={{ p: 3, textAlign: "center", width: 220, borderRadius: 3 }}
          >
            {s.icon}
            <Typography variant="h6" sx={{ mt: 1, mb: 0.5, fontWeight: 700 }}>
              {s.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {s.desc}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
