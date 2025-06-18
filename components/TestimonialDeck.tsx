"use client";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import dynamic from "next/dynamic";

const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"), { ssr: false });
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
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
              “Your feedback means the world to us! Share your experience and
              help us serve you better.”
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              — GhareluDelights Team
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box
        component="img"
        src="/images/testimonials.jpg"
        alt="Happy customers enjoying food"
        sx={{
          width: "100%",
          height: "auto",
          mt: 6,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <InstagramFeed />
    </Box>
  );
}
