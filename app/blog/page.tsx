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
} from "@mui/material";
import { AccessTime, Search, ExpandMore, Restaurant, MenuBook } from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { menuData } from "@/lib/menuData";

const MotionCard = motion(Card);

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
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

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <MenuBook sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Traditional Recipes & Stories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover {recipeDishes.length} authentic Bihar & UP recipes with full cooking instructions
          </Typography>
          
          {/* Search Bar */}
          <TextField 
            fullWidth 
            placeholder="Search recipes by name, ingredients, or story..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            sx={{ maxWidth: 600, mb: 3 }} 
            InputProps={{ 
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ) 
            }} 
          />
          
          {/* Category Filters */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
            {categories.map(c => (
              <Chip 
                key={c} 
                label={c} 
                onClick={() => setSelectedCategory(c)} 
                color={selectedCategory === c ? "primary" : "default"} 
                sx={{ cursor: "pointer" }} 
              />
            ))}
          </Box>
        </Box>
        
        {/* Results Count */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Showing {filteredDishes.length} recipes
        </Typography>
        
        {/* Recipe Cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {filteredDishes.map((dish, idx) => (
            <Box sx={{ width: "100%" }} key={dish.id}>
              <MotionCard 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }} 
                elevation={0} 
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <Box>
                  {/* Image Section */}
                  <Box sx={{ width: { xs: "100%", md: "33.33%" } }}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={dish.image}
                      alt={dish.name}
                      sx={{ minHeight: 300, objectFit: "cover" }}
                    />
                  </Box>
                  
                  {/* Content Section */}
                  <Box sx={{ width: { xs: "100%", md: "66.67%" } }}>
                    <CardContent sx={{ p: 4 }}>
                      {/* Header Info */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                          <Chip label={dish.category} color="secondary" size="small" />
                          <Chip 
                            label={dish.isVeg ? "Veg" : "Non-Veg"} 
                            size="small" 
                            color={dish.isVeg ? "success" : "error"} 
                          />
                          <Chip label={dish.spiceLevel} size="small" />
                          <Chip label={dish.prepTime} icon={<AccessTime />} size="small" />
                          {dish.isBestseller && <Chip label="Bestseller" color="primary" size="small" />}
                        </Box>
                        
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                          {dish.name}
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                          {dish.description}
                        </Typography>
                        
                        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Servings:</strong> {dish.servings}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Rating:</strong> ⭐ {dish.rating}
                          </Typography>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                            ₹{dish.price}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Expandable Recipe Sections */}
                      <Box>
                        {/* Story Section */}
                        {dish.story && (
                          <Accordion 
                            elevation={0} 
                            sx={{ border: "1px solid", borderColor: "divider", mb: 1 }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                📖 Story & Origin
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {dish.story}
                              </Typography>
                              {dish.origin && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: "italic" }}>
                                  <strong>Origin:</strong> {dish.origin}
                                </Typography>
                              )}
                              {dish.traditionalServing && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: "italic" }}>
                                  <strong>Traditional Serving:</strong> {dish.traditionalServing}
                                </Typography>
                              )}
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Ingredients Section */}
                        {dish.ingredients && dish.ingredients.length > 0 && (
                          <Accordion 
                            elevation={0} 
                            sx={{ border: "1px solid", borderColor: "divider", mb: 1 }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                🥘 Ingredients ({dish.ingredients.length})
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List dense>
                                {dish.ingredients.map((ing, i) => (
                                  <ListItem key={i}>
                                    <ListItemText primary={`• ${ing}`} />
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Instructions Section */}
                        {dish.instructions && dish.instructions.length > 0 && (
                          <Accordion 
                            elevation={0} 
                            sx={{ border: "1px solid", borderColor: "divider", mb: 1 }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                👨‍🍳 Cooking Instructions ({dish.instructions.length} steps)
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List>
                                {dish.instructions.map((inst, i) => (
                                  <Box key={i}>
                                    <ListItem>
                                      <ListItemText 
                                        primary={
                                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            Step {i + 1}
                                          </Typography>
                                        } 
                                        secondary={
                                          <Typography variant="body2" color="text.secondary">
                                            {inst}
                                          </Typography>
                                        } 
                                      />
                                    </ListItem>
                                    {i < (dish.instructions?.length || 0) - 1 && <Divider />}
                                  </Box>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Nutrition Section */}
                        {dish.nutrition && (
                          <Accordion 
                            elevation={0} 
                            sx={{ border: "1px solid", borderColor: "divider", mb: 1 }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                📊 Nutrition Information
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ width: { xs: "50%", sm: "25%" }, p: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Calories:</strong>
                                  </Typography>
                                  <Typography variant="h6">{dish.nutrition.calories}</Typography>
                                </Box>
                                <Box sx={{ width: { xs: "50%", sm: "25%" }, p: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Protein:</strong>
                                  </Typography>
                                  <Typography variant="h6">{dish.nutrition.protein}</Typography>
                                </Box>
                                <Box sx={{ width: { xs: "50%", sm: "25%" }, p: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Carbs:</strong>
                                  </Typography>
                                  <Typography variant="h6">{dish.nutrition.carbs}</Typography>
                                </Box>
                                <Box sx={{ width: { xs: "50%", sm: "25%" }, p: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    <strong>Fat:</strong>
                                  </Typography>
                                  <Typography variant="h6">{dish.nutrition.fat}</Typography>
                                </Box>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        )}
                        
                        {/* Pairings Section */}
                        {dish.pairing && dish.pairing.length > 0 && (
                          <Accordion 
                            elevation={0} 
                            sx={{ border: "1px solid", borderColor: "divider", mb: 1 }}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                🍽️ Perfect Pairings
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {dish.pairing.map((pair, i) => (
                                  <Chip key={i} label={pair} size="small" />
                                ))}
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </Box>
                      
                      {/* Action Buttons */}
                      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
                        <Button 
                          component={Link} 
                          href="/menu" 
                          variant="contained" 
                          startIcon={<Restaurant />}
                        >
                          Order Now - ₹{dish.price}
                        </Button>
                        <Button 
                          variant="outlined" 
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({ 
                                title: dish.name, 
                                text: dish.description 
                              });
                            }
                          }}
                        >
                          Share Recipe
                        </Button>
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
              </MotionCard>
            </Box>
          ))}
        </Box>
        
        {/* No Results State */}
        {filteredDishes.length === 0 && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Restaurant sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
            <Typography variant="h5" color="text.secondary">
              No recipes found matching your search
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your filters or search terms
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
