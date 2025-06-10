"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlipUnit from "./FlipUnit";

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export default function OfferCountdown({
  targetDate,
  label = "Offer starts in:",
}: {
  targetDate: string | Date;
  label?: string;
}) {
  const theme = useTheme();
  const calc = (): TimeLeft => {
    const diff = new Date(targetDate).getTime() - Date.now();
    return {
      days: Math.max(Math.floor(diff / 86400000), 0),
      hours: Math.max(Math.floor((diff % 86400000) / 3600000), 0),
      minutes: Math.max(Math.floor((diff % 3600000) / 60000), 0),
      seconds: Math.max(Math.floor((diff % 60000) / 1000), 0),
    };
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calc());
  const [prevLeft, setPrevLeft] = useState<TimeLeft>(timeLeft);

  useEffect(() => {
    const iv = setInterval(() => {
      setTimeLeft((prev) => {
        const next = calc();
        setPrevLeft(prev);
        return next;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [targetDate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        borderRadius: 2,
        mx: { xs: 2, md: 0 },
      }}
    >
      <Typography variant="h5" gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <FlipUnit unit="Days" digit={timeLeft.days} prevDigit={prevLeft.days} />
        <FlipUnit unit="Hrs"  digit={timeLeft.hours} prevDigit={prevLeft.hours} />
        <FlipUnit unit="Min" digit={timeLeft.minutes} prevDigit={prevLeft.minutes} />
        <FlipUnit unit="Sec" digit={timeLeft.seconds} prevDigit={prevLeft.seconds} />
      </Box>
    </Box>
    
  );
}
