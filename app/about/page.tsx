"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { 
  Restaurant, 
  Verified, 
  LocalShipping, 
  Favorite,
  Kitchen,
  Speed,
  Security,
  TrendingUp,
  EmojiEvents,
  LocalFireDepartment,
  Star,
  Rocket,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

const values = [
  { 
    icon: <LocalShipping sx={{ fontSize: 48 }} />, 
    title: "30-Min Delivery", 
    desc: "Lightning fast, guaranteed on time",
    color: "#FF3D71",
  },
  { 
    icon: <Verified sx={{ fontSize: 48 }} />, 
    title: "100% Hygienic", 
    desc: "FSSAI certified cloud kitchen",
    color: "#00C853",
  },
  { 
    icon: <Restaurant sx={{ fontSize: 48 }} />, 
    title: "Cooked Fresh", 
    desc: "Made when you order, not before",
    color: "#F59E0B",
  },
  { 
    icon: <Favorite sx={{ fontSize: 48 }} />, 
    title: "Tech-Enabled", 
    desc: "Live tracking, smart packaging",
    color: "#8B5CF6",
  },
];

const stats = [
  { label: "Orders Delivered", value: "10,000+", icon: <TrendingUp />, color: "#FF3D71" },
  { label: "Happy Customers", value: "3,500+", icon: <Favorite />, color: "#00C853" },
  { label: "Avg Rating", value: "4.8★", icon: <Star />, color: "#FFD700" },
  { label: "Daily Orders", value: "150+", icon: <LocalFireDepartment />, color: "#F59E0B" },
];

const team = [
  { 
    name: "Poonam Devi", 
    role: "Head Chef", 
    image: "/logo.jpeg",
    specialty: "Traditional UP Cuisine",
    color: "#FF3D71",
  },
  { 
    name: "Priyanka Kumari", 
    role: "Kitchen Manager", 
    image: "/logo.jpeg",
    specialty: "Quality & Operations",
    color: "#00D9FF",
  },
  { 
    name: "Mukesh Kumar", 
    role: "Quality Assurance", 
    image: "/logo.jpeg",
    specialty: "Food Safety Expert",
    color: "#00C853",
  },
];

const milestones = [
  { year: "2024", title: "Founded", desc: "Started with a vision to bring authentic flavors" },
  { year: "2025", title: "10K Orders", desc: "Reached 10,000+ satisfied customers" },
  { year: "2026", title: "Award Winner", desc: "Best Cloud Kitchen in Ghaziabad" },
];

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section with Animated Background */}
      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #FF3D71 0%, #6A0572 50%, #00D9FF 100%)",
        }}
      >
        {/* Animated Background Blobs */}
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(80px)",
          }}
        />
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
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
            <MotionBox
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Chip 
                label="🔥 India's Fastest Cloud Kitchen" 
                size="medium"
                sx={{ 
                  mb: 3, 
                  bgcolor: "rgba(255, 255, 255, 0.2)", 
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backdropFilter: "blur(10px)",
                  px: 2,
                }}
              />
            </MotionBox>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              From Our Cloud Kitchen
              <br />
              To Your{" "}
              <Box component="span" sx={{ color: "#FFD700" }}>
                Doorstep
              </Box>
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 5, 
                opacity: 0.95, 
                maxWidth: 700, 
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Authentic UP & Bihar flavors, hygienic preparation, 
              30-minute delivery. We're revolutionizing home-cooked meals.
            </Typography>

            {/* Stats Row */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              {stats.map((stat, index) => (
                <Grid size={{ xs: 6, sm: 3 }} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <MotionPaper
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 4,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <Box sx={{ color: stat.color, mb: 1, fontSize: 40 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                        {stat.label}
                      </Typography>
                    </MotionPaper>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                href="/menu"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#fff",
                  color: "#FF3D71",
                  px: 5,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 4,
                  boxShadow: "0 8px 32px rgba(255,255,255,0.3)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                }}
                endIcon={<Rocket />}
              >
                Order Now
              </Button>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>

      {/* Mission Section - Glassmorphic */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Chip 
                label="Our Story" 
                size="small"
                sx={{ 
                  mb: 2,
                  background: "linear-gradient(135deg, #FF3D71 0%, #00D9FF 100%)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #FF3D71 0%, #6A0572 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Cloud Kitchen Revolution
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.9, mb: 3 }}>
                Swadika is a <strong>100% cloud kitchen</strong> - we don't have a dine-in restaurant. 
                Instead, we focus entirely on delivering restaurant-quality, home-style meals 
                straight to your doorstep with <strong>maximum efficiency</strong>.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.9, mb: 3 }}>
                Our <strong>FSSAI-certified kitchen</strong> combines traditional UP & Bihar recipes with 
                modern technology. Every order is <strong>cooked fresh when you order</strong> - 
                not reheated, not pre-made. Just authentic flavors, prepared with care.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.9 }}>
                With <strong>live tracking, 30-minute delivery</strong>, and cloud kitchen efficiency, 
                we're redefining what home-cooked meals can be. 🚀
              </Typography>
              <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    component={Link}
                    href="/menu"
                    variant="contained" 
                    size="large"
                    sx={{
                      background: "linear-gradient(135deg, #FF3D71 0%, #FF6B9D 100%)",
                      boxShadow: "0 8px 24px rgba(255, 61, 113, 0.3)",
                    }}
                    endIcon={<Kitchen />}
                  >
                    View Menu
                  </Button>
                </MotionBox>
                <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    component={Link}
                    href="/contact"
                    variant="outlined" 
                    size="large"
                    sx={{ borderWidth: 2 }}
                  >
                    Contact Us
                  </Button>
                </MotionBox>
              </Box>
            </MotionBox>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 6,
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(255, 61, 113, 0.25)",
                  border: "3px solid",
                  borderColor: "rgba(255, 61, 113, 0.2)",
                }}
              >
                <Box
                  component="img"
                  src="/logo.jpeg"
                  alt="Cloud Kitchen"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                {/* Overlay Badge */}
                <MotionBox
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    bgcolor: "#00C853",
                    color: "#fff",
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 800,
                    boxShadow: "0 8px 24px rgba(0, 200, 83, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Verified sx={{ fontSize: 24 }} />
                  FSSAI Certified
                </MotionBox>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section - Color Coded */}
      <Box 
        sx={{ 
          position: "relative",
          py: 10,
          background: "linear-gradient(180deg, rgba(255,61,113,0.03) 0%, rgba(0,217,255,0.03) 100%)",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <Chip 
              label="Our Values" 
              size="small"
              sx={{ 
                mb: 2,
                background: "linear-gradient(135deg, #FF3D71 0%, #00D9FF 100%)",
                color: "#fff",
                fontWeight: 700,
              }}
            />
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                background: "linear-gradient(135deg, #FF3D71 0%, #00D9FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Why Cloud Kitchen Works
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary", maxWidth: 600, mx: "auto" }}>
              Four pillars that make us different from traditional restaurants
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {values.map((value, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <MotionCard 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -16, scale: 1.05 }}
                  elevation={0} 
                  sx={{ 
                    textAlign: "center",
                    p: 4,
                    background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
                    backdropFilter: "blur(20px)",
                    border: "2px solid",
                    borderColor: value.color,
                    borderRadius: 4,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 12px 32px ${value.color}20`,
                    "&:hover": {
                      boxShadow: `0 20px 48px ${value.color}40`,
                    },
                  }}
                >
                  {/* Gradient Background Blob */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${value.color}15 0%, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                  />
                  
                  <MotionBox 
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.7 }}
                    sx={{ 
                      color: value.color,
                      mb: 3,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {value.icon}
                  </MotionBox>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, position: "relative", zIndex: 1 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                    {value.desc}
                  </Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section - Enhanced */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Chip 
            label="The Team" 
            size="small"
            sx={{ 
              mb: 2,
              background: "linear-gradient(135deg, #6A0572 0%, #FF3D71 100%)",
              color: "#fff",
              fontWeight: 700,
            }}
          />
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: "linear-gradient(135deg, #6A0572 0%, #FF3D71 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Meet Our Kitchen Heroes
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            The passionate people behind every delicious meal
          </Typography>
        </MotionBox>

        <Grid container spacing={5} justifyContent="center">
          {team.map((member, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <MotionCard 
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -12, scale: 1.05 }}
                elevation={0} 
                sx={{ 
                  textAlign: "center",
                  p: 4,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid",
                  borderColor: member.color,
                  borderRadius: 5,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 12px 32px ${member.color}20`,
                  "&:hover": {
                    boxShadow: `0 24px 48px ${member.color}40`,
                  },
                }}
              >
                {/* Background Gradient */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 120,
                    background: `linear-gradient(135deg, ${member.color}15 0%, ${member.color}05 100%)`,
                    borderRadius: "20px 20px 0 0",
                  }}
                />
                
                <MotionBox
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Avatar
                    src={member.image}
                    sx={{ 
                      width: 140, 
                      height: 140, 
                      mx: "auto", 
                      mb: 3,
                      border: "4px solid",
                      borderColor: member.color,
                      boxShadow: `0 12px 32px ${member.color}40`,
                    }}
                  />
                </MotionBox>
                
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, position: "relative", zIndex: 1 }}>
                  {member.name}
                </Typography>
                <Chip 
                  label={member.role} 
                  size="small"
                  sx={{ 
                    mb: 2,
                    bgcolor: member.color,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ position: "relative", zIndex: 1, fontStyle: "italic" }}>
                  {member.specialty}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{
          position: "relative",
          py: 12,
          background: "linear-gradient(135deg, #6A0572 0%, #FF3D71 50%, #00D9FF 100%)",
          overflow: "hidden",
        }}
      >
        {/* Animated Blobs */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: "blur(60px)",
          }}
        />
        
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", color: "#fff" }}
          >
            <Typography variant="h2" sx={{ mb: 3, fontWeight: 800 }}>
              Ready to Experience Our Cloud Kitchen?
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, opacity: 0.95, fontWeight: 400, lineHeight: 1.7 }}>
              Order authentic home-cooked meals delivered hot to your door in 30 minutes
            </Typography>
            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <MotionBox whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  href="/menu"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#fff",
                    color: "#FF3D71",
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    boxShadow: "0 12px 32px rgba(255,255,255,0.3)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                  }}
                  endIcon={<EmojiEvents />}
                >
                  Order Now
                </Button>
              </MotionBox>
              <MotionBox whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  href="/subscriptions"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#fff",
                    color: "#fff",
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    borderWidth: 2,
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderWidth: 2,
                    },
                  }}
                  endIcon={<Speed />}
                >
                  View Plans
                </Button>
              </MotionBox>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
