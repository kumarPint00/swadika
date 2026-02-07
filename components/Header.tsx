"use client";
import React, { useState, useEffect } from "react";
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
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
  Chip,
  Container,
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
  Close,
  Home,
  Notifications,
} from "@mui/icons-material";
import { useColorMode } from "@/context/ColorModeContent";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Header() {
  const { toggle } = useColorMode();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const pathname = usePathname();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = muiTheme.palette.mode === "dark";

  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Menu", href: "/menu", icon: <Restaurant /> },
    { label: "Recipes", href: "/blog", icon: <Book /> },
    { label: "Subscriptions", href: "/subscriptions", icon: <LocalOffer /> },
    { label: "About", href: "/about", icon: <Info /> },
    { label: "Contact", href: "/contact", icon: <ContactPage /> },
  ];


  const isActive = (href: string) => pathname === href;

  return (
    <AppBar 
      position="sticky" 
      elevation={scrolled ? 4 : 0}
      sx={{ 
        bgcolor: scrolled ? "rgba(255, 255, 255, 0.95)" : "background.paper",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        color: "text.primary",
        borderBottom: scrolled ? "none" : "1px solid",
        borderColor: "divider",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: scrolled ? "0 4px 20px rgba(255, 61, 113, 0.1)" : "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: { xs: 1, md: 1.5 }, px: 0 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box
                component="img"
                src="/swadikalogo.png"
                alt="Swadika"
                sx={{
                  height: { xs: 35, md: 40 },
                  width: { xs: 35, md: 40 },
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 800, 
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Swadika
                </Typography>
                <Typography 
                  component="div" 
                  sx={{ 
                    fontSize: "0.65rem", 
                    fontWeight: 500,
                    color: "text.secondary",
                    letterSpacing: "0.05em",
                    mt: -0.5,
                  }}
                >
                  Gharelu Delights
                </Typography>
              </Box>
            </MotionBox>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                  <MotionButton
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    startIcon={link.icon}
                    sx={{ 
                      color: isActive(link.href) ? "primary.main" : "text.primary",
                      fontWeight: isActive(link.href) ? 700 : 500,
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      position: "relative",
                      "&:hover": { 
                        color: "primary.main",
                        bgcolor: "rgba(255, 61, 113, 0.05)",
                      },
                      "&::after": isActive(link.href) ? {
                        content: '""',
                        position: "absolute",
                        bottom: 4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60%",
                        height: 3,
                        borderRadius: "3px",
                        bgcolor: "primary.main",
                      } : {},
                    }}
                  >
                    {link.label}
                  </MotionButton>
                </Link>
              ))}
            </Box>
          )}

          {/* Right Actions */}
          <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 }, alignItems: "center" }}>
            {/* Theme Toggle */}
            <MotionBox whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <IconButton 
                onClick={toggle} 
                size="small"
                sx={{
                  bgcolor: "rgba(255, 61, 113, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 61, 113, 0.2)",
                  },
                }}
              >
                {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
            </MotionBox>

            {/* Cart */}
            <Link href="/cart" style={{ textDecoration: "none", color: "inherit" }}>
              <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton 
                  size="small"
                  sx={{
                    bgcolor: cartItemsCount > 0 ? "rgba(255, 61, 113, 0.1)" : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255, 61, 113, 0.2)",
                    },
                  }}
                >
                  <Badge 
                    badgeContent={cartItemsCount} 
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontWeight: 700,
                        fontSize: "0.7rem",
                      },
                    }}
                  >
                    <ShoppingCart fontSize="small" />
                  </Badge>
                </IconButton>
              </MotionBox>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconButton 
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    size="small"
                    sx={{
                      border: "2px solid",
                      borderColor: "primary.main",
                      p: 0.3,
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: "primary.main",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </MotionBox>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 220,
                      borderRadius: 3,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                      border: "1px solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <MenuItem 
                    component={Link} 
                    href="/profile" 
                    onClick={() => setAnchorEl(null)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    href="/orders" 
                    onClick={() => setAnchorEl(null)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon><Restaurant fontSize="small" /></ListItemIcon>
                    <ListItemText>My Orders</ListItemText>
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    href="/rewards" 
                    onClick={() => setAnchorEl(null)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon><LocalOffer fontSize="small" /></ListItemIcon>
                    <ListItemText>
                      Rewards
                      <Chip 
                        label={`${user?.rewards || 0} pts`} 
                        size="small" 
                        color="primary"
                        sx={{ ml: 1, height: 20, fontSize: "0.7rem" }}
                      />
                    </ListItemText>
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    href="/favorites" 
                    onClick={() => setAnchorEl(null)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon><FavoriteBorder fontSize="small" /></ListItemIcon>
                    <ListItemText>Favorites</ListItemText>
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={() => { logout(); setAnchorEl(null); }}
                    sx={{ py: 1.5, color: "error.main" }}
                  >
                    <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    px: 2.5,
                    py: 0.8,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                    boxShadow: "0 4px 12px rgba(255, 61, 113, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(255, 61, 113, 0.4)",
                    },
                  }}
                >
                  Sign In
                </MotionButton>
              </Link>
            )}

            {/* Mobile Menu */}
            {isMobile && (
              <IconButton 
                onClick={() => setMobileOpen(true)}
                sx={{
                  bgcolor: "rgba(255, 61, 113, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 61, 113, 0.2)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Drawer Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src="/swadikalogo.png"
                alt="Swadika"
                sx={{ height: 35, width: 35, borderRadius: "8px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Menu
              </Typography>
            </Box>
            <IconButton onClick={() => setMobileOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>

          {/* User Info (if authenticated) */}
          {isAuthenticated && user && (
            <Box 
              sx={{ 
                mb: 3, 
                p: 2, 
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(255, 61, 113, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                border: "1px solid",
                borderColor: "rgba(255, 61, 113, 0.2)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                  {user?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
              {user?.rewards && (
                <Chip 
                  label={`${user.rewards} Reward Points`} 
                  size="small" 
                  color="primary"
                  icon={<LocalOffer />}
                  sx={{ mt: 1 }}
                />
              )}
            </Box>
          )}

          {/* Navigation Links */}
          <List sx={{ mb: 2 }}>
            <ListItem 
              component={Link}
              href="/"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: pathname === "/" ? "rgba(255, 61, 113, 0.1)" : "transparent",
                "&:hover": { bgcolor: "rgba(255, 61, 113, 0.05)" },
              }}
            >
              <ListItemIcon>
                <Home sx={{ color: pathname === "/" ? "primary.main" : "text.secondary" }} />
              </ListItemIcon>
              <ListItemText 
                primary="Home" 
                primaryTypographyProps={{
                  fontWeight: pathname === "/" ? 700 : 500,
                  color: pathname === "/" ? "primary.main" : "text.primary",
                }}
              />
            </ListItem>
            {navLinks.map((link) => (
              <ListItem 
                key={link.href}
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: isActive(link.href) ? "rgba(255, 61, 113, 0.1)" : "transparent",
                  "&:hover": { bgcolor: "rgba(255, 61, 113, 0.05)" },
                }}
              >
                <ListItemIcon>
                  {React.cloneElement(link.icon, { 
                    sx: { color: isActive(link.href) ? "primary.main" : "text.secondary" } 
                  })}
                </ListItemIcon>
                <ListItemText 
                  primary={link.label} 
                  primaryTypographyProps={{
                    fontWeight: isActive(link.href) ? 700 : 500,
                    color: isActive(link.href) ? "primary.main" : "text.primary",
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* User Actions */}
          {isAuthenticated ? (
            <List>
              <ListItem 
                component={Link}
                href="/profile"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 2, mb: 1, "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}
              >
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem 
                component={Link}
                href="/orders"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 2, mb: 1, "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}
              >
                <ListItemIcon><Restaurant /></ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItem>
              <ListItem 
                component={Link}
                href="/favorites"
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 2, mb: 1, "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}
              >
                <ListItemIcon><FavoriteBorder /></ListItemIcon>
                <ListItemText primary="Favorites" />
              </ListItem>
              <ListItem 
                onClick={() => { logout(); setMobileOpen(false); }}
                sx={{ 
                  borderRadius: 2, 
                  color: "error.main",
                  "&:hover": { bgcolor: "rgba(239, 68, 68, 0.05)" },
                }}
              >
                <ListItemIcon><Logout color="error" /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          ) : (
            <Button
              component={Link}
              href="/login"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
