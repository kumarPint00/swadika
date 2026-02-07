"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import { 
  AccessTime, 
  Search, 
  ExpandMore, 
  Restaurant, 
  MenuBook,
  LocalFireDepartment,
  Star,
  Share,
  Favorite,
  FavoriteBorder,
  TrendingUp,
} from "@mui/icons-material";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { menuData } from "@/lib/menuData";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionChip = motion(Chip);

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Filter dishes that have complete recipe information
  const recipeDishes = useMemo(() => 
    menuData.filter(d => d.story && d.ingredients && d.instructions), 
    []
  );
  
  // Use sorted array to ensure consistent order on server and client
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(recipeDishes.map(d => d.category))).sort();
    return ["All", ...uniqueCategories];
  }, [recipeDishes]);
  
  const filteredDishes = useMemo(() => {
    let filtered = recipeDishes;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.story?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [recipeDishes, selectedCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const getSpiceIcon = (level: string) => {
    const icons = { 'Mild': '🌿', 'Medium': '🌶️', 'Spicy': '🔥', 'Extra Spicy': '🌋' };
    return icons[level as keyof typeof icons] || '🌶️';
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section with Gradient */}
      <Box
        sx={{
          position: "relative",
          minHeight: "55vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 50%, #00D9FF 100%)",
        }}
      >
        {/* Animated Background Blobs */}
        <MotionBox
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            top: "-15%",
            right: "-8%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.12)",
            filter: "blur(80px)",
          }}
        />
        <MotionBox
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            bottom: "-15%",
            left: "-8%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(0, 217, 255, 0.15)",
            filter: "blur(80px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: "center", color: "#fff" }}
          >
            {/* Animated Icon */}
            <MotionBox
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 110,
                  height: 110,
                  borderRadius: "28px",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.3)",
                  mb: 3,
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <MenuBook sx={{ fontSize: 60, color: "#fff" }} />
              </Box>
            </MotionBox>
            
            <MotionBox
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Chip 
                label="📚 Recipe Collection" 
                size="medium"
                sx={{ 
                  mb: 3, 
                  bgcolor: "rgba(255, 255, 255, 0.25)", 
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backdropFilter: "blur(10px)",
                  px: 3,
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </MotionBox>
            
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                fontWeight: 900,
                textShadow: "0 8px 32px rgba(0,0,0,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              Traditional{" "}
              <Box component="span" sx={{ 
                background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Recipes
              </Box>
              {" "}& Stories
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 5, 
                opacity: 0.95, 
                maxWidth: 800, 
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              Discover {recipeDishes.length}+ authentic Bihar & UP recipes with complete 
              cooking instructions and cultural stories
            </Typography>

            {/* Stats Row */}
            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {recipeDishes.length}+
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  Total Recipes
                </Typography>
              </MotionBox>
              {favorites.length > 0 && (
                <MotionBox
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: "16px",
                    background: "rgba(255, 61, 113, 0.3)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                    ❤️ {favorites.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.95 }}>
                    Your Favorites
                  </Typography>
                </MotionBox>
              )}
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Search & Filter Section */}
      <Box 
        sx={{ 
          position: "relative",
          py: 6,
          background: "linear-gradient(180deg, rgba(255, 61, 113, 0.03) 0%, rgba(0, 217, 255, 0.03) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          > 
            {/* Search Bar - Enhanced */}
            <TextField 
              fullWidth 
              placeholder="Search recipes by name, ingredients, or story..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              sx={{ 
                maxWidth: 700, 
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid",
                  borderColor: "rgba(255, 61, 113, 0.2)",
                  fontSize: "1.05rem",
                  py: 0.5,
                  transition: "all 0.3s ease",
                  "& fieldset": { border: "none" },
                  "&:hover": {
                    background: "#fff",
                    borderColor: "#FF3D71",
                    boxShadow: "0 12px 32px rgba(255, 61, 113, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  "&.Mui-focused": {
                    background: "#fff",
                    borderColor: "#FF3D71",
                    boxShadow: "0 16px 40px rgba(255, 61, 113, 0.3)",
                  },
                },
              }} 
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#FF3D71", fontSize: 28 }} />
                  </InputAdornment>
                ) 
              }} 
            />
            
            {/* Category Filters - Enhanced */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              {categories.map((c, index) => (
                <MotionChip 
                  key={c}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  label={c} 
                  onClick={() => setSelectedCategory(c)} 
                  sx={{ 
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "1rem",
                    px: 3,
                    py: 3,
                    borderRadius: "16px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    ...(selectedCategory === c ? {
                      background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                      color: "#fff",
                      boxShadow: "0 8px 24px rgba(255, 61, 113, 0.5)",
                      border: "none",
                    } : {
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "2px solid",
                      borderColor: "rgba(255, 61, 113, 0.25)",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "#FF3D71",
                        background: "rgba(255, 61, 113, 0.08)",
                        boxShadow: "0 4px 16px rgba(255, 61, 113, 0.2)",
                      },
                    }),
                  }} 
                />
              ))}
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Recipe Cards Section */}
      <Box sx={{ bgcolor: "background.default", py: 6 }}>
        <Container maxWidth="lg">
          {/* Results Count */}
          <MotionBox 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ 
              mb: 5, 
              display: "flex", 
              gap: 2, 
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 2,
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255, 61, 113, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)",
                border: "2px solid",
                borderColor: "rgba(255, 61, 113, 0.25)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                📖 {filteredDishes.length} recipes found
              </Typography>
            </Box>
          </MotionBox>
          <Grid container spacing={4}>
            <AnimatePresence mode="wait">
              {filteredDishes.map((dish, idx) => (
                <Grid size={{ xs: 12, md: 6 }}>
                  <MotionCard
                key={dish.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100,
                }} 
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 24px 48px rgba(255, 61, 113, 0.2)",
                }}
                elevation={0} 
                sx={{ 
                  border: "2px solid",
                  borderColor: "rgba(255, 61, 113, 0.1)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {/* Image Section */}
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    sx={{ 
                      width: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      image={dish.image}
                      alt={dish.name}
                      sx={{ 
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    
                    {/* Favorite Button Overlay */}
                    <IconButton
                      onClick={() => toggleFavorite(dish.id)}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        "&:hover": {
                          background: "#fff",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {favorites.includes(dish.id) ? (
                        <Favorite sx={{ color: "#FF3D71" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>

                    {/* Bestseller Badge */}
                    {dish.isBestseller && (
                      <MotionBox
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 0,
                          px: 2,
                          py: 1,
                          background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          borderRadius: "0 8px 8px 0",
                          boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <TrendingUp sx={{ fontSize: 16 }} />
                        BESTSELLER
                      </MotionBox>
                    )}

                    {/* Rating Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        px: 2,
                        py: 1,
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Star sx={{ color: "#FFD700", fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700 }}>
                        {dish.rating}
                      </Typography>
                    </Box>
                  </MotionBox>
                  
                  {/* Content Section */}
                  <Box sx={{ width: "100%" }}>
                    <CardContent sx={{ p: 3 }}>
                      {/* Header Info */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                          <MotionChip 
                            whileHover={{ scale: 1.1 }}
                            label={dish.category} 
                            size="small" 
                            sx={{
                              background: "linear-gradient(135deg, #00D9FF 0%, #5CE1E6 100%)",
                              color: "#fff",
                              fontWeight: 600,
                              boxShadow: "0 4px 12px rgba(0, 217, 255, 0.3)",
                            }}
                          />
                          <Chip 
                            label={dish.isVeg ? "🌱 Veg" : "🍖 Non-Veg"} 
                            size="small" 
                            sx={{
                              fontWeight: 600,
                              ...(dish.isVeg ? {
                                background: "linear-gradient(135deg, #00C853 0%, #34D399 100%)",
                                color: "#fff",
                              } : {
                                background: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
                                color: "#fff",
                              }),
                            }}
                          />
                          <Chip 
                            label={`${getSpiceIcon(dish.spiceLevel)} ${dish.spiceLevel}`} 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip 
                            label={dish.prepTime} 
                            icon={<AccessTime />} 
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: 1.5, 
                            fontWeight: 800,
                            background: "linear-gradient(135deg, #FF3D71 0%, #00D9FF 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {dish.name}
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                          {dish.description}
                        </Typography>
                        
                        <Box sx={{ 
                          display: "flex", 
                          gap: 3, 
                          flexWrap: "wrap",
                          p: 2,
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, rgba(255, 61, 113, 0.05) 0%, rgba(0, 217, 255, 0.05) 100%)",
                        }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                              Servings
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              🍽️ {dish.servings}
                            </Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                              Price
                            </Typography>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 800,
                                background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                              }}
                            >
                              ₹{dish.price}
                            </Typography>
                          </Box>
                          {dish.nutrition && (
                            <>
                              <Divider orientation="vertical" flexItem />
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                  Calories
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  🔥 {dish.nutrition.calories}
                                </Typography>
                              </Box>
                            </>
                          )}
                        </Box>
                      </Box>
                      
                      {/* Expandable Recipe Sections */}
                      <Box>
                        {/* Story Section */}
                        {dish.story && (
                          <Accordion 
                            elevation={0} 
                            sx={{ 
                              border: "2px solid",
                              borderColor: "rgba(255, 61, 113, 0.15)",
                              borderRadius: "16px !important",
                              mb: 2,
                              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
                              backdropFilter: "blur(10px)",
                              "&:before": { display: "none" },
                              overflow: "hidden",
                            }}
                          >
                            <AccordionSummary 
                              expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
                              sx={{
                                "&:hover": {
                                  background: "rgba(255, 61, 113, 0.05)",
                                },
                              }}
                            >
                              <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                                📖 Story & Origin
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                                {dish.story}
                              </Typography>
                              {dish.origin && (
                                <Box sx={{ 
                                  p: 2, 
                                  borderRadius: "12px", 
                                  background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 217, 255, 0.05) 100%)",
                                  mb: 1,
                                }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    📍 Origin: <span style={{ fontWeight: 400 }}>{dish.origin}</span>
                                  </Typography>
                                </Box>
                              )}
                              {dish.traditionalServing && (
                                <Box sx={{ 
                                  p: 2, 
                                  borderRadius: "12px", 
                                  background: "linear-gradient(135deg, rgba(255, 61, 113, 0.1) 0%, rgba(255, 61, 113, 0.05) 100%)",
                                }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    🍽️ Traditional Serving: <span style={{ fontWeight: 400 }}>{dish.traditionalServing}</span>
                                  </Typography>
                                </Box>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Ingredients Section */}
                        {dish.ingredients && dish.ingredients.length > 0 && (
                          <Accordion 
                            elevation={0} 
                            sx={{ 
                              border: "2px solid",
                              borderColor: "rgba(0, 217, 255, 0.15)",
                              borderRadius: "16px !important",
                              mb: 2,
                              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
                              backdropFilter: "blur(10px)",
                              "&:before": { display: "none" },
                            }}
                          >
                            <AccordionSummary 
                              expandIcon={<ExpandMore sx={{ color: "secondary.main" }} />}
                              sx={{
                                "&:hover": {
                                  background: "rgba(0, 217, 255, 0.05)",
                                },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  🥘 Ingredients
                                </Typography>
                                <Chip 
                                  label={dish.ingredients.length} 
                                  size="small" 
                                  sx={{ 
                                    background: "linear-gradient(135deg, #00D9FF 0%, #5CE1E6 100%)",
                                    color: "#fff",
                                    fontWeight: 700,
                                  }}
                                />
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box sx={{ 
                                display: "grid", 
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                gap: 1.5,
                              }}>
                                {dish.ingredients.map((ing, i) => (
                                  <MotionBox
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    sx={{
                                      p: 1.5,
                                      borderRadius: "8px",
                                      background: "rgba(0, 217, 255, 0.05)",
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Box sx={{ 
                                      width: 8, 
                                      height: 8, 
                                      borderRadius: "50%", 
                                      background: "linear-gradient(135deg, #00D9FF 0%, #5CE1E6 100%)",
                                    }} />
                                    <Typography variant="body2">{ing}</Typography>
                                  </MotionBox>
                                ))}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Instructions Section */}
                        {dish.instructions && dish.instructions.length > 0 && (
                          <Accordion 
                            elevation={0} 
                            sx={{ 
                              border: "2px solid",
                              borderColor: "rgba(255, 193, 7, 0.3)",
                              borderRadius: "16px !important",
                              mb: 2,
                              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
                              backdropFilter: "blur(10px)",
                              "&:before": { display: "none" },
                            }}
                          >
                            <AccordionSummary 
                              expandIcon={<ExpandMore sx={{ color: "#F59E0B" }} />}
                              sx={{
                                "&:hover": {
                                  background: "rgba(255, 193, 7, 0.05)",
                                },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  👨‍🍳 Cooking Steps
                                </Typography>
                                <Chip 
                                  label={`${dish.instructions.length} steps`} 
                                  size="small" 
                                  sx={{ 
                                    background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                                    color: "#000",
                                    fontWeight: 700,
                                  }}
                                />
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {dish.instructions.map((inst, i) => (
                                  <MotionBox
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    sx={{
                                      display: "flex",
                                      gap: 2,
                                      p: 2,
                                      borderRadius: "12px",
                                      background: i % 2 === 0 
                                        ? "rgba(255, 193, 7, 0.05)" 
                                        : "rgba(255, 61, 113, 0.05)",
                                      border: "1px solid",
                                      borderColor: i % 2 === 0 
                                        ? "rgba(255, 193, 7, 0.2)" 
                                        : "rgba(255, 61, 113, 0.2)",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 36,
                                        height: 36,
                                        background: i % 2 === 0 
                                          ? "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                                          : "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                                        fontWeight: 800,
                                        fontSize: "0.9rem",
                                      }}
                                    >
                                      {i + 1}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                                        {inst}
                                      </Typography>
                                    </Box>
                                  </MotionBox>
                                ))}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Nutrition & Pairings in one row */}
                        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}>
                          {/* Nutrition Section */}
                          {dish.nutrition && (
                            <Accordion 
                              elevation={0} 
                              sx={{ 
                                flex: 1,
                                border: "2px solid",
                                borderColor: "rgba(16, 185, 129, 0.3)",
                                borderRadius: "16px !important",
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
                                backdropFilter: "blur(10px)",
                                "&:before": { display: "none" },
                              }}
                            >
                              <AccordionSummary 
                                expandIcon={<ExpandMore sx={{ color: "#10B981" }} />}
                                sx={{
                                  "&:hover": {
                                    background: "rgba(16, 185, 129, 0.05)",
                                  },
                                }}
                              >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  📊 Nutrition
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
                                  {Object.entries(dish.nutrition).map(([key, value]) => (
                                    <MotionBox
                                      key={key}
                                      whileHover={{ scale: 1.05 }}
                                      sx={{
                                        p: 2,
                                        borderRadius: "12px",
                                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)",
                                        textAlign: "center",
                                      }}
                                    >
                                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                                        {key}
                                      </Typography>
                                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {value}
                                      </Typography>
                                    </MotionBox>
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          )}
                          
                          {/* Pairings Section */}
                          {dish.pairing && dish.pairing.length > 0 && (
                            <Accordion 
                              elevation={0} 
                              sx={{ 
                                flex: 1,
                                border: "2px solid",
                                borderColor: "rgba(139, 92, 246, 0.3)",
                                borderRadius: "16px !important",
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
                                backdropFilter: "blur(10px)",
                                "&:before": { display: "none" },
                              }}
                            >
                              <AccordionSummary 
                                expandIcon={<ExpandMore sx={{ color: "#8B5CF6" }} />}
                                sx={{
                                  "&:hover": {
                                    background: "rgba(139, 92, 246, 0.05)",
                                  },
                                }}
                              >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  🍽️ Pairings
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                  {dish.pairing.map((pair, i) => (
                                    <MotionChip
                                      key={i}
                                      whileHover={{ scale: 1.1, y: -2 }}
                                      label={pair}
                                      size="medium"
                                      sx={{
                                        background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                                      }}
                                    />
                                  ))}
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </Box>
                      </Box>
                      
                      {/* Action Buttons */}
                      <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
                        <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            component={Link} 
                            href="/menu" 
                            variant="contained" 
                            size="large"
                            startIcon={<Restaurant />}
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: "12px",
                              background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                              boxShadow: "0 8px 24px rgba(255, 61, 113, 0.4)",
                              fontWeight: 700,
                              fontSize: "1rem",
                              "&:hover": {
                                boxShadow: "0 12px 32px rgba(255, 61, 113, 0.5)",
                              },
                            }}
                          >
                            Order Now - ₹{dish.price}
                          </Button>
                        </MotionBox>
                        <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            variant="outlined" 
                            size="large"
                            startIcon={<Share />}
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({ 
                                  title: dish.name, 
                                  text: dish.description 
                                });
                              }
                            }}
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: "12px",
                              borderWidth: 2,
                              borderColor: "primary.main",
                              fontWeight: 700,
                              "&:hover": {
                                borderWidth: 2,
                                background: "rgba(255, 61, 113, 0.1)",
                              },
                            }}
                          >
                            Share Recipe
                          </Button>
                        </MotionBox>
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
                </MotionCard>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
        
        {/* No Results State */}
        {filteredDishes.length === 0 && (
          <MotionBox 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              textAlign: "center", 
              py: 10,
              px: 4,
            }}
          >
            <MotionBox
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(255, 61, 113, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%)",
                  mb: 3,
                }}
              >
                <Restaurant sx={{ fontSize: 60, color: "text.disabled" }} />
              </Box>
            </MotionBox>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              No recipes found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your filters or search terms
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Clear Filters
            </Button>
          </MotionBox>
        )}
      </Container>
    </Box>
    </Box>
  );
}
