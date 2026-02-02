"use client";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Divider, Avatar } from "@mui/material";
import { Dashboard, Restaurant, ShoppingCart, People, Timeline, LocalOffer, Settings, ExitToApp } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", icon: <Dashboard />, href: "/admin" },
  { title: "Orders", icon: <ShoppingCart />, href: "/admin/orders" },
  { title: "Menu", icon: <Restaurant />, href: "/admin/menu" },
  { title: "Analytics", icon: <Timeline />, href: "/admin/analytics" },
  { title: "Promo Codes", icon: <LocalOffer />, href: "/admin/discounts" },
  { title: "Customers", icon: <People />, href: "/admin/customers" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
          Swadika Admin
        </Typography>
      </Box>

      <Divider />

      {/* Admin Profile */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Admin User
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Kitchen Manager
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Bottom Actions */}
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/" sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Exit Admin" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
