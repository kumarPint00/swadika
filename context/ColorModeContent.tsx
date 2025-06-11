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
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
