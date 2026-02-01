"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import { Restaurant, Verified, LocalShipping, Favorite } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const values = [
  { icon: <LocalShipping sx={{ fontSize: 48 }} />, title: "30-Min Delivery", desc: "Lightning fast, guaranteed on time" },
  { icon: <Verified sx={{ fontSize: 48 }} />, title: "100% Hygienic", desc: "FSSAI certified cloud kitchen" },
  { icon: <Restaurant sx={{ fontSize: 48 }} />, title: "Cooked Fresh", desc: "Made when you order, not before" },
  { icon: <Favorite sx={{ fontSize: 48 }} />, title: "Tech-Enabled", desc: "Live tracking, smart packaging" },
];

const team = [
  { name: "Priya Sharma", role: "Head Chef", image: "/logo.jpeg" },
  { name: "Rajesh Kumar", role: "Kitchen Manager", image: "/logo.jpeg" },
  { name: "Anita Devi", role: "Quality Assurance", image: "/logo.jpeg" },
];

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 12 }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ mb: 3, textAlign: "center", fontWeight: 800 }}>
              Cloud Kitchen, Premium Quality
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 800, mx: "auto", textAlign: "center", opacity: 0.95, fontWeight: 400 }}>
              Bringing authentic UP & Bihar flavors to your doorstep through technology and tradition
            </Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Mission */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                Our Cloud Kitchen
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Swadika is a 100% cloud kitchen - we don't have a dine-in restaurant. 
                Instead, we focus entirely on delivering restaurant-quality, home-style meals 
                straight to your doorstep with maximum efficiency.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Our FSSAI-certified kitchen combines traditional UP & Bihar recipes with 
                modern food safety standards and delivery technology. Every order is tracked 
                in real-time from kitchen to your door.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                Fresh ingredients, traditional methods, smart packaging - delivered hot in 
                30 minutes or less. That's our promise.
              </Typography>
            </MotionBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Box
                component="img"
                src="/logo.jpeg"
                alt="Our Cloud Kitchen"
                sx={{ width: "100%", borderRadius: 4, boxShadow: "0 20px 60px rgba(255,107,53,0.2)" }}
              />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Values */}
      <Box sx={{ bgcolor: "background.paper", py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ mb: 6, textAlign: "center", fontWeight: 700 }}>
            Why Cloud Kitchen?
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <MotionCard 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -12, scale: 1.05 }}
                  elevation={0} 
                  sx={{ textAlign: "center", border: "1px solid", borderColor: "divider", cursor: "pointer" }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <MotionBox 
                      sx={{ color: "primary.main", mb: 2 }}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {value.icon}
                    </MotionBox>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.desc}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" sx={{ mb: 6, textAlign: "center", fontWeight: 700 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, idx) => (
            <Grid size={{ xs: 12, sm: 4, md: 3 }} key={idx}>
              <MotionCard 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.03 }}
                elevation={0} 
                sx={{ textAlign: "center" }}
              >
                <CardContent>
                  <Avatar
                    src={member.image}
                    sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                  />
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
