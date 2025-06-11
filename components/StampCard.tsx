"use client";
import { Box, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";

export default function StampCard() {
  const [count, setCount] = useState<number>(0);
  useEffect(()=>{
    setCount(parseInt(localStorage.stamps||"0",10));
  },[]);
  const addStamp = () => {
    const next = Math.min(count + 1, 6);
    setCount(next);
    localStorage.stamps = next.toString();
    if (next === 6) alert("Congrats! Free Litti Chokha on next order 🎉");
  };
  return (
    <Box
      sx={{
        position: "fixed",
        right: 16,
        bottom: 16,
        bgcolor: "primary.main",
        color: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: 4,
        zIndex: 1300,
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Loyalty Card</Typography>
      <Box display="flex" gap={0.5}>
        {[...Array(6)].map((_, i) => (
          <StarIcon key={i} color={i < count ? "secondary" : "disabled"} />
        ))}
      </Box>
      <IconButton
        onClick={addStamp}
        sx={{ color: "#fff", mt: 1, fontSize: 12, border: "1px solid #fff" }}
      >
        + stamp
      </IconButton>
    </Box>
  );
}
