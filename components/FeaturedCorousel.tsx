// src/components/FeaturedCarousel.tsx
"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import ImageOptim from "./ImageOptim";

const slides = [
  { src: "/logo.jpeg", caption: "Litti Chokha" },
  { src: "/logo.jpeg", caption: "Thekua" },
  { src: "/logo.jpeg", caption: "Sattu Paratha" },
];

export default function FeaturedCarousel() {
  const theme = useTheme();
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
  };
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ fontFamily: "Playfair Display, serif", mb: 4 }}
      >
        Crowd Favourites
      </Typography>
      <Slider {...settings}>
        {slides.map((s) => (
          <Box key={s.caption} position="relative">
            <ImageOptim
              src={s.src}
              alt={s.caption}
              width={1200}
              height={500}
              style={{ width: "100%", height: "auto", borderRadius: 12 }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 24,
                color: "common.white",
                textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {s.caption}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
