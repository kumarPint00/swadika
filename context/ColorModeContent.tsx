"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";

const ColorModeContext = createContext({ toggle: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(
    (typeof window !== "undefined" && (localStorage.getItem("mode") as PaletteMode)) || "light"
  );
  const value = useMemo(
    () => ({
      toggle: () =>
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("mode", next);
          return next;
        }),
    }),
    []
  );
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#FF3D71",
            light: "#FF6B9D",
            dark: "#C9184A",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: "#00D9FF",
            light: "#5CE1E6",
            dark: "#00A8CC",
            contrastText: mode === "dark" ? "#FFFFFF" : "#000000",
          },
          background: {
            default: mode === "dark" ? "#0A0E27" : "#F8F9FA",
            paper: mode === "dark" ? "#1A1F3A" : "#FFFFFF",
          },
          text: {
            primary: mode === "dark" ? "#F8F9FA" : "#0A0E27",
            secondary: mode === "dark" ? "#B0B8D4" : "#64748B",
          },
          divider: mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(100, 116, 139, 0.12)",
          success: {
            main: "#10B981",
            light: "#34D399",
            dark: "#059669",
          },
          warning: {
            main: "#F59E0B",
            light: "#FBBF24",
            dark: "#D97706",
          },
          error: {
            main: "#EF4444",
            light: "#F87171",
            dark: "#DC2626",
          },
          info: {
            main: "#3B82F6",
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
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 24,
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                border: mode === "dark" 
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(100, 116, 139, 0.08)",
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(26, 31, 58, 0.7) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                  : "0 8px 32px rgba(0, 0, 0, 0.06)",
                "&:hover": {
                  transform: "translateY(-12px) scale(1.02)",
                  boxShadow: mode === "dark"
                    ? "0 24px 48px rgba(255, 61, 113, 0.3), 0 0 0 1px rgba(255, 61, 113, 0.2)"
                    : "0 24px 48px rgba(255, 61, 113, 0.2), 0 0 0 1px rgba(255, 61, 113, 0.1)",
                  border: mode === "dark"
                    ? "1px solid rgba(255, 61, 113, 0.3)"
                    : "1px solid rgba(255, 61, 113, 0.2)",
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
                boxShadow: mode === "dark"
                  ? "0 8px 24px rgba(255, 61, 113, 0.4), 0 0 0 1px rgba(255, 61, 113, 0.15) inset"
                  : "0 8px 24px rgba(255, 61, 113, 0.3), 0 0 0 1px rgba(255, 61, 113, 0.1) inset",
                "&:hover": {
                  background: "linear-gradient(135deg, #C9184A 0%, #FF3D71 100%)",
                  boxShadow: mode === "dark"
                    ? "0 12px 32px rgba(255, 61, 113, 0.5), 0 0 0 1px rgba(255, 61, 113, 0.25) inset"
                    : "0 12px 32px rgba(255, 61, 113, 0.4), 0 0 0 1px rgba(255, 61, 113, 0.2) inset",
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
                  background: mode === "dark"
                    ? "rgba(255, 61, 113, 0.15)"
                    : "rgba(255, 61, 113, 0.05)",
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
                  background: mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(255, 255, 255, 0.95)",
                  },
                  "&.Mui-focused": {
                    background: mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "#FFFFFF",
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
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(255, 61, 113, 0.25) 0%, rgba(0, 217, 255, 0.25) 100%)"
                  : "linear-gradient(135deg, rgba(255, 61, 113, 0.15) 0%, rgba(0, 217, 255, 0.15) 100%)",
                border: mode === "dark"
                  ? "1px solid rgba(255, 61, 113, 0.3)"
                  : "1px solid rgba(255, 61, 113, 0.2)",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: mode === "dark"
                  ? "rgba(26, 31, 58, 0.8)"
                  : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px) saturate(180%)",
                boxShadow: mode === "dark"
                  ? "0 1px 0 0 rgba(255, 255, 255, 0.1)"
                  : "0 1px 0 0 rgba(0, 0, 0, 0.05)",
              },
            },
          },
        },
      }),
    [mode]
  );
  
  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
