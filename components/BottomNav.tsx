"use client";
import { useState, useEffect } from "react";
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home,
  Restaurant,
  ShoppingCart,
  Person,
  Receipt,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [value, setValue] = useState(0);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Update active tab based on current pathname
  useEffect(() => {
    if (pathname === "/") setValue(0);
    else if (pathname === "/menu") setValue(1);
    else if (pathname === "/orders") setValue(2);
    else if (pathname === "/cart") setValue(3);
    else if (pathname === "/profile") setValue(4);
  }, [pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const routes = ["/", "/menu", "/orders", "/cart", "/profile"];
    router.push(routes[newValue]);
  };

  return (
    <Paper 
      sx={{ 
        position: "fixed", 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1300,
        borderTop: "2px solid",
        borderColor: "rgba(255, 61, 113, 0.2)",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)",
        backdropFilter: "blur(20px)",
        display: { xs: "block", md: "none" },
      }} 
      elevation={8}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          bgcolor: "transparent",
          height: 70,
          "& .MuiBottomNavigationAction-root": {
            minWidth: "auto",
            padding: "8px 12px",
            color: "text.secondary",
            transition: "all 0.3s ease",
            "&.Mui-selected": {
              color: "primary.main",
              transform: "translateY(-4px)",
              "& .MuiSvgIcon-root": {
                fontSize: 28,
              },
            },
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.7rem",
            fontWeight: 600,
            marginTop: "4px",
            "&.Mui-selected": {
              fontSize: "0.75rem",
              fontWeight: 700,
            },
          },
        }}
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<Home />} 
        />
        <BottomNavigationAction 
          label="Menu" 
          icon={<Restaurant />} 
        />
        <BottomNavigationAction 
          label="Orders" 
          icon={<Receipt />} 
        />
        <BottomNavigationAction 
          label="Cart" 
          icon={
            <Badge 
              badgeContent={cartItemsCount} 
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.65rem",
                  height: 18,
                  minWidth: 18,
                  fontWeight: 700,
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          } 
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<Person />} 
        />
      </BottomNavigation>
    </Paper>
  );
}
