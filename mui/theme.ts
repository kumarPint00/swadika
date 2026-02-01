// src/mui/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B35",        // Electric Orange - energetic, appetite-stimulating
      light: "#FF8C61",
      dark: "#E54D1A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6A0572",        // Deep Purple - premium, tech-forward
      light: "#8E3B95",
      dark: "#4A0050",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAFA",     // Clean white
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",     // Deep navy - modern
      secondary: "#555555",   // Medium gray
    },
    divider: "#E8E8E8",
    success: {
      main: "#00C853",        // Bright green - delivery success
    },
    warning: {
      main: "#FFB300",        // Amber - alerts
    },
    error: {
      main: "#D32F2F",        // Red - errors
    },
    info: {
      main: "#0288D1",        // Blue - informational
    },
  },
  typography: {
    fontFamily: `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    h1: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 500,
      letterSpacing: "0.01em",
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.01em",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.03em",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0,0,0,0.05)",
    "0px 4px 8px rgba(0,0,0,0.08)",
    "0px 8px 16px rgba(0,0,0,0.1)",
    "0px 12px 24px rgba(0,0,0,0.12)",
    "0px 16px 32px rgba(0,0,0,0.15)",
    "0px 20px 40px rgba(0,0,0,0.18)",
    "0px 24px 48px rgba(0,0,0,0.2)",
    "0px 2px 4px rgba(0,0,0,0.05)",
    "0px 4px 8px rgba(0,0,0,0.08)",
    "0px 8px 16px rgba(0,0,0,0.1)",
    "0px 12px 24px rgba(0,0,0,0.12)",
    "0px 16px 32px rgba(0,0,0,0.15)",
    "0px 20px 40px rgba(0,0,0,0.18)",
    "0px 24px 48px rgba(0,0,0,0.2)",
    "0px 28px 56px rgba(0,0,0,0.22)",
    "0px 32px 64px rgba(0,0,0,0.24)",
    "0px 36px 72px rgba(0,0,0,0.26)",
    "0px 40px 80px rgba(0,0,0,0.28)",
    "0px 44px 88px rgba(0,0,0,0.3)",
    "0px 48px 96px rgba(0,0,0,0.32)",
    "0px 52px 104px rgba(0,0,0,0.34)",
    "0px 56px 112px rgba(0,0,0,0.36)",
    "0px 60px 120px rgba(0,0,0,0.38)",
    "0px 64px 128px rgba(0,0,0,0.4)",
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          border: "1px solid rgba(0,0,0,0.06)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 20px 40px rgba(255,107,53,0.15)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 28px",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        contained: {
          boxShadow: "0 4px 14px rgba(255,107,53,0.25)",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(255,107,53,0.35)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
