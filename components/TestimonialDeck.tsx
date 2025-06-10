// src/components/TestimonialDeck.tsx
"use client";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";

const reviews = [
  { name: "Rohit S.", msg: "Best litti chokha in NCR—tastes like home!" },
  { name: "Ananya P.", msg: "Packaging was neat, food arrived piping hot." },
  { name: "Imran K.", msg: "Finally found authentic Bihari sweets in Ghaziabad." },
];

export default function TestimonialDeck() {
  return (
    <Box py={8} sx={{ backgroundColor: "#FFF8E1" }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontFamily: "Playfair Display, serif", mb: 6 }}
      >
        Customers Love Us💛
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((r) => (
          <Grid size={{ xs: 12, sm: 4 }}key={r.name}>
            <Paper sx={{ p: 4, borderRadius: 3, height: "100%" }}>
              <FormatQuote color="primary" fontSize="large" />
              <Typography variant="body1" sx={{ mb: 2 }}>
                “{r.msg}”
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                — {r.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
