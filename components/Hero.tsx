"use client";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import OfferCountdown from "./OfferCountdown";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorMode } from "../context/ColorModeContent";

export default function Hero() {
const { toggle } = useColorMode();
const theme = useTheme();
const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "80vh", md: "100vh" },
        overflow: "hidden",
      }}
    >
      <IconButton onClick={toggle} sx={{ position:"fixed", top:16, right:16, zIndex:1500 }}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      {/* background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src="/hero.mp4" // put a 5-10 sec looping kitchen clip in /public
      />

      {/* gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
        }}
      />

      {/* heading + CTA */}
      <Box
        component={motion.div}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "common.white",
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 800,
            fontSize: { xs: "2.8rem", md: "4.5rem" },
            mb: 1,
          }}
        >
          Swadika Delights
        </Typography>
        <Typography variant="h6" sx={{ fontStyle: "italic", mb: 3 }}>
          Authentic UP & Bihar home-style flavours
        </Typography>

        <OfferCountdown
          targetDate="2025-06-15T12:00:00"
          label="Next Special Offer In:"
        />

        <Box mt={4} display="flex" gap={2}>
          <Link href="/menu" passHref>
            <Button variant="contained" size="large">
              View Menu
            </Button>
          </Link>
          <Button
            href="https://wa.me/919958382202"
            target="_blank"
            variant="outlined"
            size="large"
            sx={{ 
              color: "common.white", 
              borderColor: "common.white",
              "&:hover": {
                borderColor: "common.white",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }
            }}
          >
            Order on WhatsApp
          </Button>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
