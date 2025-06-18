import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorMode } from "@/context/ColorModeContent";
import theme from "@/mui/theme";

export default function Header() {
  const { toggle } = useColorMode();
  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow:1 }}>Swadika GhareluDelights</Typography>
          { /* toggle icon based on theme */ }
           <IconButton onClick={toggle} sx={{ position:"fixed", top:16, right:16, zIndex:1500 }}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      </Toolbar>
    </AppBar>
  );
}
