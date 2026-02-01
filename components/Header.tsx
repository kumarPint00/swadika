"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  ShoppingCart,
  Menu as MenuIcon,
  Person,
  Logout,
  FavoriteBorder,
  LocalOffer,
  Restaurant,
  Book,
  ContactPage,
  Info,
} from "@mui/icons-material";
import { useColorMode } from "@/context/ColorModeContent";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import theme from "@/mui/theme";

export default function Header() {
  const { toggle } = useColorMode();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme.palette.mode === "dark";

  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { label: "Menu", href: "/menu", icon: <Restaurant /> },
    { label: "Subscriptions", href: "/subscriptions", icon: <LocalOffer /> },
    { label: "Recipes", href: "/blog", icon: <Book /> },
    { label: "About", href: "/about", icon: <Info /> },
    { label: "Contact", href: "/contact", icon: <ContactPage /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: "background.paper", 
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Swadika
            <Typography 
              component="span" 
              sx={{ 
                fontSize: "0.75rem", 
                fontWeight: 400,
                color: "secondary.main",
                letterSpacing: "0.1em",
              }}
            >
              GhareluDelights
            </Typography>
          </Typography>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 3 }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Button 
                  sx={{ 
                    color: "text.primary",
                    fontWeight: 500,
                    "&:hover": { color: "secondary.main" },
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>
        )}

        {/* Right Actions */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Theme Toggle */}
          <IconButton onClick={toggle} size="small">
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Cart */}
          <Link href="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton size="small">
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              <IconButton 
                onClick={(e) => setAnchorEl(e.currentTarget)}
                size="small"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem component={Link} href="/profile" onClick={() => setAnchorEl(null)}>
                  <Person sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <MenuItem component={Link} href="/orders" onClick={() => setAnchorEl(null)}>
                  <Restaurant sx={{ mr: 1 }} /> My Orders
                </MenuItem>
                <MenuItem component={Link} href="/rewards" onClick={() => setAnchorEl(null)}>
                  <LocalOffer sx={{ mr: 1 }} /> Rewards ({user?.rewards} pts)
                </MenuItem>
                <MenuItem component={Link} href="/favorites" onClick={() => setAnchorEl(null)}>
                  <FavoriteBorder sx={{ mr: 1 }} /> Favorites
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>
                  <Logout sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="small">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Menu</Typography>
          <List>
            {navLinks.map((link) => (
              <ListItem 
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                <ListItemText primary={link.label} sx={{ ml: 2 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
