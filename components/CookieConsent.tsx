"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.ccAccepted) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "background.paper",
        p: 2,
        boxShadow: 6,
        zIndex: 2000,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2">
        We use cookies for analytics & personalisation. By using this site you
        accept our&nbsp;
        <a href="/legal/privacy-policy" style={{ textDecoration: "underline" }}>
          Privacy Policy
        </a>
        .
      </Typography>
      <Button
        size="small"
        variant="contained"
        onClick={() => {
          localStorage.ccAccepted = "true";
          setShow(false);
        }}
      >
        Accept
      </Button>
    </Box>
  );
}
