// src/mui/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D35400",       // warm orange
      contrastText: "#fff",
    },
    secondary: {
      main: "#A04000",       // darker earthy accent
      contrastText: "#fff",
    },
    background: {
      default: "#FFF8F0",    // light off-white
      paper: "#FFFFFF",
    },
    text: {
      primary: "#4B2E05",    // deep brown
      secondary: "#6B4E16",  // muted brown
    },
  },
  typography: {
    fontFamily: `"Poppins", sans-serif`,
    h1: {
      fontFamily: `"Playfair Display", serif`,
      fontSize: "2.8rem",
      fontWeight: 700,
      color: "#D35400",
    },
    h2: {
      fontFamily: `"Playfair Display", serif`,
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "#A04000",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontStyle: "italic",
      color: "#A85100",
    },
    body1: {
      fontSize: "1rem",
      color: "#4B2E05",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#6B4E16",
      fontStyle: "italic",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
        },
      },
    },
  },
});

export default theme;
