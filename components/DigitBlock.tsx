"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface DigitBlockProps {
  digit: number;
}

export default function DigitBlock({ digit }: DigitBlockProps) {
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
              backgroundColor: "white",
              borderBottom: "2px solid #000", // the dividing line
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
              sx={{ color: "#fff", fontWeight: 700, lineHeight: 1 }}
            >
              {char}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
