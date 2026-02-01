"use client";
import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { 
  Search, 
  FilterList, 
  Star, 
  FavoriteBorder, 
  Favorite, 
  LocalFireDepartment, 
  Restaurant, 
  AccessTime, 
  Close,
  Add 
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { menuData, getAllCategories, type Dish } from "@/lib/menuData";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionChip = motion(Chip);

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const { add } = useCart();
  
  const categories = ["All", ...getAllCategories()];

  const filteredDishes = useMemo(() => {
    let dishes = menuData;

    // Category filter
    if (category !== "All") {
      dishes = dishes.filter((d) => d.category === category);
    }

    // Search filter
    if (search) {
      dishes = dishes.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Veg filter
    if (vegOnly === "veg") {
      dishes = dishes.filter((d) => d.isVeg);
    }

    // Sort
    if (sortBy === "popular") {
      dishes = dishes.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-low") {
      dishes = dishes.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      dishes = dishes.sort((a, b) => b.price - a.price);
    }

    return dishes;
  }, [search, category, vegOnly, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const getSpiceIcon = (level: string) => {
    const icons = {
      'Mild': '🌿',
      'Medium': '🌶️',
      'Hot': '🔥',
      'Very Hot': '🔥🔥'
    };
    return icons[level as keyof typeof icons] || '🌿';
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
          color: "#fff",
          py: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background */}
        <Box
          component={motion.div}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(40px)",
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: "center", mb: 4 }}
          >
            <Typography variant="overline" sx={{ fontSize: "1rem", fontWeight: 700 }}>
              🍛 Authentic UP & Bihar Cuisine
            </Typography>
            <Typography variant="h2" sx={{ mt: 2, mb: 2, fontWeight: 800 }}>
              Our Full Menu
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 700, mx: "auto" }}>
              Every dish tells a story. Explore traditional recipes passed down through generations.
            </Typography>
          </MotionBox>

          {/* Search Bar */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            <TextField
              fullWidth
              placeholder="Search dishes, ingredients, stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#fff" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                },
                "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
              }}
            />
          </MotionBox>
        </Container>
      </Box>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 10 }}>
        <Card sx={{ p: 3, boxShadow: "0 8px 32px rgba(255,107,53,0.12)" }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center">
            {/* Category Pills */}
            <Box sx={{ flex: 1, overflowX: "auto", width: "100%" }}>
              <Stack direction="row" spacing={1} sx={{ minWidth: "max-content", pb: 1 }}>
                {categories.map((cat, index) => (
                  <MotionChip
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    label={cat}
                    onClick={() => setCategory(cat)}
                    color={category === cat ? "primary" : "default"}
                    sx={{
                      cursor: "pointer",
                      fontWeight: category === cat ? 700 : 500,
                      fontSize: "0.9rem",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Veg Toggle */}
            <ToggleButtonGroup
              value={vegOnly}
              exclusive
              onChange={(_, val) => setVegOnly(val)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="veg">🌱 Veg Only</ToggleButton>
            </ToggleButtonGroup>

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Card>
      </Container>

      {/* Dishes Grid */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <AnimatePresence mode="wait">
          <Grid container spacing={3}>
            {filteredDishes.map((dish, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dish.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={() => setSelectedDish(dish)}
                >
                  {/* Image */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <MotionBox
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={dish.image}
                        alt={dish.name}
                      />
                    </MotionBox>

                    {/* Tags */}
                    <Box sx={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 1, flexDirection: "column" }}>
                      {dish.isBestseller && (
                        <Chip
                          icon={<LocalFireDepartment sx={{ fontSize: 16 }} />}
                          label="Bestseller"
                          size="small"
                          sx={{ bgcolor: "#FF6B35", color: "#fff", fontWeight: 700 }}
                        />
                      )}
                      {dish.isNew && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{ bgcolor: "#00C853", color: "#fff", fontWeight: 700 }}
                        />
                      )}
                    </Box>

                    {/* Favorite */}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dish.id);
                      }}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(255,255,255,0.9)",
                        "&:hover": { bgcolor: "#fff" },
                      }}
                      size="small"
                    >
                      {favorites.has(dish.id) ? (
                        <Favorite sx={{ color: "#FF6B35" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>

                    {/* Veg/Non-Veg Indicator */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        width: 20,
                        height: 20,
                        border: "2px solid",
                        borderColor: dish.isVeg ? "#00C853" : "#D32F2F",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fff",
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: dish.isVeg ? "#00C853" : "#D32F2F",
                        }}
                      />
                    </Box>
                  </Box>

                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Name & Rating */}
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
                        {dish.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Rating value={dish.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">
                          {dish.rating}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {dish.description}
                    </Typography>

                    {/* Info Tags */}
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
                      <Chip
                        icon={<AccessTime sx={{ fontSize: 14 }} />}
                        label={dish.prepTime}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`${getSpiceIcon(dish.spiceLevel)} ${dish.spiceLevel}`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    {/* Price & Add to Cart */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        ₹{dish.price}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Add />}
                        onClick={(e) => {
                          e.stopPropagation();
                          add({ id: dish.id, name: dish.name, qty: 1, price: dish.price });
                        }}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>

        {filteredDishes.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ textAlign: "center", py: 10 }}
          >
            <Restaurant sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No dishes found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your filters
            </Typography>
          </MotionBox>
        )}
      </Container>

      {/* Dish Detail Dialog */}
      <Dialog
        open={Boolean(selectedDish)}
        onClose={() => setSelectedDish(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        {selectedDish && (
          <>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="300"
                image={selectedDish.image}
                alt={selectedDish.name}
              />
              <IconButton
                onClick={() => setSelectedDish(null)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
                  {selectedDish.isBestseller && (
                    <Chip icon={<LocalFireDepartment />} label="Bestseller" color="primary" size="small" />
                  )}
                  {selectedDish.isNew && (
                    <Chip label="New" sx={{ bgcolor: "#00C853", color: "#fff" }} size="small" />
                  )}
                  <Chip label={selectedDish.isVeg ? "🌱 Vegetarian" : "🍗 Non-Veg"} size="small" />
                </Stack>

                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                  {selectedDish.name}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Rating value={selectedDish.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {selectedDish.rating} rating
                  </Typography>
                </Stack>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedDish.description}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
                  <Chip icon={<AccessTime />} label={`Prep: ${selectedDish.prepTime}`} />
                  <Chip label={`Serves: ${selectedDish.servings}`} />
                  <Chip label={`${getSpiceIcon(selectedDish.spiceLevel)} ${selectedDish.spiceLevel}`} />
                </Stack>

                <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
                  ₹{selectedDish.price}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Story */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  📖 The Story
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
                  {selectedDish.story}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Ingredients */}
              {selectedDish.ingredients && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    🥘 Ingredients
                  </Typography>
                  <List dense>
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={`• ${ingredient}`}
                          sx={{ "& .MuiListItemText-primary": { fontSize: "0.95rem" } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Instructions */}
              {selectedDish.instructions && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    👨‍🍳 Preparation Method
                  </Typography>
                  <List>
                    {selectedDish.instructions.map((step, index) => (
                      <ListItem key={index} sx={{ alignItems: "flex-start", py: 1 }}>
                        <ListItemText
                          primary={
                          <Box>
                            <Typography component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
                              Step {index + 1}:
                            </Typography>
                            <Typography component="span" sx={{ ml: 1 }}>
                              {step}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Nutrition & Origin */}
              <Grid container spacing={3}>
                {selectedDish.nutrition && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                      🍽️ Nutrition (per serving)
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">Calories: {selectedDish.nutrition.calories} kcal</Typography>
                      <Typography variant="body2">Protein: {selectedDish.nutrition.protein}</Typography>
                      <Typography variant="body2">Carbs: {selectedDish.nutrition.carbs}</Typography>
                      <Typography variant="body2">Fat: {selectedDish.nutrition.fat}</Typography>
                    </Stack>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: selectedDish.nutrition ? 6 : 12 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    🏛️ Regional Info
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <strong>Origin:</strong> {selectedDish.origin}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Traditional Serving:</strong> {selectedDish.traditionalServing}
                    </Typography>
                    {selectedDish.pairing && (
                      <Typography variant="body2">
                        <strong>Pairs well with:</strong> {selectedDish.pairing.join(", ")}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>

              {/* Add to Cart Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => {
                  add({ id: selectedDish.id, name: selectedDish.name, qty: 1, price: selectedDish.price });
                  setSelectedDish(null);
                }}
                sx={{ mt: 4, py: 1.5, fontSize: "1.1rem", fontWeight: 700 }}
              >
                Add to Cart - ₹{selectedDish.price}
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
