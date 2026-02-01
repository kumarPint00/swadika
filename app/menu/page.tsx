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
  Grid,
} from "@mui/material";
import { Search, FilterList, Star, FavoriteBorder, Favorite } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const MotionCard = motion(Card);

type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  tags: string[];
  spiceLevel: number;
  veg: boolean;
  description: string;
};

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Litti Chokha",
    price: 299,
    image: "/logo.jpeg",
    category: "Main Course",
    rating: 4.8,
    reviews: 234,
    tags: ["Bestseller", "Traditional"],
    spiceLevel: 2,
    veg: true,
    description: "Authentic Bihari roasted wheat balls with mashed potato",
  },
  {
    id: "2",
    name: "Sattu Paratha",
    price: 249,
    image: "/logo.jpeg",
    category: "Breakfast",
    rating: 4.9,
    reviews: 312,
    tags: ["Chef's Choice", "Healthy"],
    spiceLevel: 1,
    veg: true,
    description: "Nutritious stuffed flatbread with roasted gram flour",
  },
  {
    id: "3",
    name: "Dal Baati",
    price: 349,
    image: "/logo.jpeg",
    category: "Main Course",
    rating: 4.7,
    reviews: 198,
    tags: ["New", "Premium"],
    spiceLevel: 2,
    veg: true,
    description: "Rajasthani baked wheat balls with mixed lentils",
  },
  {
    id: "4",
    name: "Thekua",
    price: 149,
    image: "/logo.jpeg",
    category: "Snacks",
    rating: 4.6,
    reviews: 156,
    tags: ["Sweet", "Traditional"],
    spiceLevel: 0,
    veg: true,
    description: "Traditional sweet crispy cookies with jaggery",
  },
  {
    id: "5",
    name: "Champaran Mutton",
    price: 499,
    image: "/logo.jpeg",
    category: "Main Course",
    rating: 4.9,
    reviews: 287,
    tags: ["Signature", "Spicy"],
    spiceLevel: 3,
    veg: false,
    description: "Slow-cooked mutton in traditional Bihar style",
  },
  {
    id: "6",
    name: "Khichdi Kadhi",
    price: 199,
    image: "/logo.jpeg",
    category: "Comfort Food",
    rating: 4.5,
    reviews: 142,
    tags: ["Healthy", "Comfort"],
    spiceLevel: 1,
    veg: true,
    description: "Soothing rice-lentil mix with yogurt curry",
  },
];

const categories = ["All", "Main Course", "Breakfast", "Snacks", "Comfort Food"];

export default function MenuPage() {
  const { add } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Category filter
    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Diet filter
    if (dietFilter === "veg") {
      items = items.filter((item) => item.veg);
    } else if (dietFilter === "nonveg") {
      items = items.filter((item) => !item.veg);
    }

    // Search filter
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "popular") {
      items = items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "priceLow") {
      items = items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      items = items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [searchQuery, selectedCategory, dietFilter, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Our Menu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover authentic home-cooked delicacies
          </Typography>
        </Box>

        {/* Search & Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <ToggleButtonGroup
                value={dietFilter}
                exclusive
                onChange={(e, val) => val && setDietFilter(val)}
                fullWidth
                size="small"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="veg">Veg</ToggleButton>
                <ToggleButton value="nonveg">Non-Veg</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                  <MenuItem value="popular">Most Popular</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Categories */}
          <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: "wrap", gap: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                color={selectedCategory === cat ? "secondary" : "default"}
                variant={selectedCategory === cat ? "filled" : "outlined"}
              />
            ))}
          </Stack>
        </Box>

        {/* Menu Items */}
        <Grid container spacing={4}>
          {filteredItems.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider", position: "relative" }}
              >
                <CardMedia component="img" height="200" image={item.image} alt={item.name} />
                
                {/* Favorite Button */}
                <IconButton
                  onClick={() => toggleFavorite(item.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                  size="small"
                >
                  {favorites.has(item.id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>

                <CardContent>
                  <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
                    {item.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} size="small" color="secondary" />
                    ))}
                  </Box>

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Rating value={item.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({item.reviews})
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" color="primary">
                      ₹{item.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => add({ id: item.id, name: item.name, qty: 1, price: item.price })}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {filteredItems.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No items found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
