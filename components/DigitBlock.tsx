"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface DigitBlockProps {
  digit: number;
}

export default function DigitBlock({ digit }: DigitBlockProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const display = String(digit).padStart(2, "0");
  // We render each character separately so '04' → two blocks '0' and '4'
  return (
    <Box display="flex" gap={1}>
      {display.split("").map((char, i) => (
        <Box
          key={i}
          sx={{
            width: 60,
            height: 80,
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: 2,
            backgroundColor: "transparent",
          }}
        >
          {/* Top half blank */}
          <Box
            sx={{
              height: "50%",
              backgroundColor: isDark ? "background.paper" : "white",
              borderBottom: isDark ? "2px solid rgba(255,255,255,0.2)" : "2px solid #000",
            }}
          />
          {/* Bottom half teal with digit */}
          <Box
            sx={{
              height: "50%",
              backgroundColor: "#00b2b2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "common.white", fontWeight: 700, lineHeight: 1 }}
            >
              {char}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
