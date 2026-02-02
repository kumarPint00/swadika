// src/mui/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF3D71",        // Hot Pink - bold, eye-catching, appetite-stimulating
      light: "#FF6B9D",
      dark: "#C9184A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00D9FF",        // Cyan Blue - fresh, modern, tech-forward
      light: "#5CE1E6",
      dark: "#00A8CC",
      contrastText: "#000000",
    },
    background: {
      default: "#F8F9FA",     // Soft white with hint of warmth
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0A0E27",     // Deep space blue - premium
      secondary: "#64748B",   // Slate gray - modern
    },
    divider: "rgba(100, 116, 139, 0.12)",
    success: {
      main: "#10B981",        // Emerald green - fresh, healthy
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",        // Amber - warm, inviting
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",        // Red - bold, clear
      light: "#F87171",
      dark: "#DC2626",
    },
    info: {
      main: "#3B82F6",        // Blue - trustworthy
      light: "#60A5FA",
      dark: "#2563EB",
    },
  },
  typography: {
    fontFamily: `"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    h1: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "4rem",
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      background: "linear-gradient(135deg, #FF3D71 0%, #00D9FF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "2.25rem",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "1.75rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 500,
      letterSpacing: "0.01em",
      lineHeight: 1.7,
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.01em",
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.03em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.03em",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    "none",
    "0px 2px 8px rgba(255, 61, 113, 0.08)",
    "0px 4px 12px rgba(255, 61, 113, 0.12)",
    "0px 8px 24px rgba(255, 61, 113, 0.16)",
    "0px 12px 32px rgba(255, 61, 113, 0.2)",
    "0px 16px 40px rgba(255, 61, 113, 0.24)",
    "0px 20px 48px rgba(255, 61, 113, 0.28)",
    "0px 24px 56px rgba(255, 61, 113, 0.32)",
    "0px 2px 8px rgba(0, 217, 255, 0.08)",
    "0px 4px 12px rgba(0, 217, 255, 0.12)",
    "0px 8px 24px rgba(0, 217, 255, 0.16)",
    "0px 12px 32px rgba(0, 217, 255, 0.2)",
    "0px 16px 40px rgba(0, 217, 255, 0.24)",
    "0px 20px 48px rgba(0, 217, 255, 0.28)",
    "0px 24px 56px rgba(0, 217, 255, 0.32)",
    "0px 28px 64px rgba(0, 0, 0, 0.15)",
    "0px 32px 72px rgba(0, 0, 0, 0.18)",
    "0px 36px 80px rgba(0, 0, 0, 0.21)",
    "0px 40px 88px rgba(0, 0, 0, 0.24)",
    "0px 44px 96px rgba(0, 0, 0, 0.27)",
    "0px 48px 104px rgba(0, 0, 0, 0.3)",
    "0px 52px 112px rgba(0, 0, 0, 0.33)",
    "0px 56px 120px rgba(0, 0, 0, 0.36)",
    "0px 60px 128px rgba(0, 0, 0, 0.39)",
    "0px 64px 136px rgba(0, 0, 0, 0.42)",
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          border: "1px solid rgba(100, 116, 139, 0.08)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0 24px 48px rgba(255, 61, 113, 0.2), 0 0 0 1px rgba(255, 61, 113, 0.1)",
            border: "1px solid rgba(255, 61, 113, 0.2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "14px 32px",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          textTransform: "none",
        },
        contained: {
          background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
          boxShadow: "0 8px 24px rgba(255, 61, 113, 0.3), 0 0 0 1px rgba(255, 61, 113, 0.1) inset",
          "&:hover": {
            background: "linear-gradient(135deg, #C9184A 0%, #FF3D71 100%)",
            boxShadow: "0 12px 32px rgba(255, 61, 113, 0.4), 0 0 0 1px rgba(255, 61, 113, 0.2) inset",
            transform: "translateY(-3px) scale(1.02)",
          },
          "&:active": {
            transform: "translateY(-1px) scale(0.98)",
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: "rgba(255, 61, 113, 0.5)",
          color: "#FF3D71",
          "&:hover": {
            borderWidth: 2,
            borderColor: "#FF3D71",
            background: "rgba(255, 61, 113, 0.05)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 16,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.95)",
            },
            "&.Mui-focused": {
              background: "#FFFFFF",
              boxShadow: "0 0 0 4px rgba(255, 61, 113, 0.1)",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          padding: "8px 4px",
          backdropFilter: "blur(10px)",
        },
        filled: {
          background: "linear-gradient(135deg, rgba(255, 61, 113, 0.15) 0%, rgba(0, 217, 255, 0.15) 100%)",
          border: "1px solid rgba(255, 61, 113, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});

export default theme;
