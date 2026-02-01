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
  Grid,
} from "@mui/material";
import { AccessTime, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const blogPosts = [
  {
    id: "1",
    title: "The Art of Making Perfect Litti Chokha",
    excerpt: "Discover the traditional Bihari technique of creating this iconic dish...",
    image: "/logo.jpeg",
    category: "Recipes",
    readTime: "5 min read",
    date: "Jan 15, 2026",
  },
  {
    id: "2",
    title: "Health Benefits of Sattu: The Superfood",
    excerpt: "Learn why sattu has been a staple in Bihar for centuries...",
    image: "/logo.jpeg",
    category: "Health",
    readTime: "4 min read",
    date: "Jan 10, 2026",
  },
  {
    id: "3",
    title: "Regional Delicacies of Eastern UP",
    excerpt: "A culinary journey through the flavors of Purvanchal...",
    image: "/logo.jpeg",
    category: "Culture",
    readTime: "7 min read",
    date: "Jan 5, 2026",
  },
  {
    id: "4",
    title: "Traditional Cooking Methods",
    excerpt: "How authentic techniques preserve nutrition and taste...",
    image: "/logo.jpeg",
    category: "Techniques",
    readTime: "6 min read",
    date: "Dec 28, 2025",
  },
];

export default function BlogPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 10 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Recipes & Stories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover traditional recipes, cooking tips, and culinary heritage
          </Typography>
        </Box>

        {/* Featured Post */}
        <Card sx={{ mb: 6, overflow: "hidden" }}>
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <CardMedia
                component="img"
                height="400"
                image={blogPosts[0].image}
                alt={blogPosts[0].title}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CardContent sx={{ p: 6, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Chip label={blogPosts[0].category} color="secondary" sx={{ mb: 2, width: "fit-content" }} />
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {blogPosts[0].title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {blogPosts[0].excerpt}
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {blogPosts[0].readTime}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {blogPosts[0].date}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  href={`/blog/${blogPosts[0].id}`}
                  variant="outlined"
                  endIcon={<ArrowForward />}
                >
                  Read More
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        {/* All Posts */}
        <Grid container spacing={4}>
          {blogPosts.slice(1).map((post, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <MotionCard
                whileHover={{ y: -8 }}
                elevation={0}
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent>
                  <Chip label={post.category} size="small" color="secondary" sx={{ mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {post.readTime}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  <Button
                    component={Link}
                    href={`/blog/${post.id}`}
                    size="small"
                    endIcon={<ArrowForward />}
                  >
                    Read More
                  </Button>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
