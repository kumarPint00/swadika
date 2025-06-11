// src/components/AboutUs.tsx
"use client";
import Image from "next/image";
import { Box,  Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageOptim from "./ImageOptim";

export default function AboutUs() {
  return (
    <Box py={10}>
      <Grid container spacing={6} alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <ImageOptim
            src="/logo.jpeg"        /* add a kitchen / chef shot in /public */
            alt="About Swadika"
            width={600}
            height={400}
            style={{ width: "100%", borderRadius: 16, objectFit: "cover" }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h3" sx={{ mb: 3, fontFamily: "Playfair Display, serif" }}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Swadika GhareluDelights started as a humble home kitchen in Ghaziabad,
            driven by a single mission—<strong>bring the true taste of
            UP & Bihar to busy urban food-lovers</strong>.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We grind our own masalas, slow-cook dals in clay pots, and bake littis over
            coal, just like our grandmothers did. Freshness is non-negotiable:
            nothing is pre-cooked or frozen.
          </Typography>
          <Typography variant="body1">
            From a handful of orders on WhatsApp we’ve grown into a full-fledged
            FSSAI-certified cloud kitchen—yet our recipes and love for
            home-style food remain exactly the same.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
