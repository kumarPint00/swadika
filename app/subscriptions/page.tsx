"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { 
  CheckCircle, 
  Restaurant, 
  LocalOffer,
  TrendingUp,
  Star,
  Speed,
  EmojiEvents,
  Favorite,
  LocalShipping,
  Timer,
  Verified,
  MonetizationOn,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const plans = [
  {
    name: "Weekly Plan",
    price: 1499,
    period: "per week",
    meals: "7 meals",
    save: "₹200",
    icon: <Restaurant sx={{ fontSize: 48 }} />,
    color: "#00D9FF",
    features: [
      "1 meal per day",
      "Choose from daily menu",
      "Free delivery",
      "Cancel anytime",
      "50 reward points per week",
    ],
    popular: false,
  },
  {
    name: "Lunch Special",
    price: 2499,
    period: "per month",
    meals: "22 meals",
    save: "₹800",
    icon: <Star sx={{ fontSize: 48 }} />,
    color: "#FF3D71",
    features: [
      "Lunch delivery Mon-Sat",
      "Fixed time delivery",
      "Premium menu options",
      "Priority support",
      "250 reward points per month",
    ],
    popular: true,
  },
  {
    name: "Full Meal Plan",
    price: 4999,
    period: "per month",
    meals: "60 meals",
    save: "₹1,500",
    icon: <EmojiEvents sx={{ fontSize: 48 }} />,
    color: "#F59E0B",
    features: [
      "Lunch & Dinner daily",
      "Customizable menu",
      "Weekend specials included",
      "VIP support",
      "600 reward points per month",
    ],
    popular: false,
  },
];

const benefits = [
  { 
    icon: <Timer sx={{ fontSize: 48 }} />, 
    title: "Save Time", 
    desc: "No cooking, no cleanup, no grocery shopping",
    color: "#00D9FF",
  },
  { 
    icon: <Verified sx={{ fontSize: 48 }} />, 
    title: "Consistent Quality", 
    desc: "Same delicious taste every single day",
    color: "#00C853",
  },
  { 
    icon: <MonetizationOn sx={{ fontSize: 48 }} />, 
    title: "Save Money", 
    desc: "Up to 30% cheaper than ordering daily",
    color: "#F59E0B",
  },
  { 
    icon: <LocalShipping sx={{ fontSize: 48 }} />, 
    title: "Free Delivery", 
    desc: "Zero delivery charges on all subscriptions",
    color: "#8B5CF6",
  },
];

export default function SubscriptionsPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section with Animated Background */}
      <Box
        sx={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 50%, #00D9FF 100%)",
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
                label="💰 Save Up to 30% with Subscriptions" 
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
              Never Cook Again
              <br />
              <Box component="span" sx={{ color: "#FFD700" }}>
                Subscribe & Save
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
              Fresh, authentic UP & Bihar meals delivered daily. 
              Choose your plan, customize your menu, enjoy hassle-free dining.
            </Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Pricing Plans - Glassmorphic */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ textAlign: "center", mb: 8 }}
        >
          <Chip 
            label="Pricing Plans" 
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
              background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 50%, #00D9FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Choose Your Perfect Plan
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary", maxWidth: 600, mx: "auto" }}>
            Flexible subscriptions with no commitment. Cancel anytime.
          </Typography>
        </MotionBox>

        <Grid container spacing={4}>
          {plans.map((plan, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <MotionCard
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: plan.popular ? -20 : -12, scale: plan.popular ? 1.08 : 1.05 }}
                elevation={0}
                sx={{
                  position: "relative",
                  height: "100%",
                  background: plan.popular 
                    ? `linear-gradient(135deg, ${plan.color}15 0%, ${plan.color}05 100%)`
                    : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "3px solid",
                  borderColor: plan.color,
                  borderRadius: 5,
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: plan.popular 
                    ? `0 20px 48px ${plan.color}40`
                    : `0 12px 32px ${plan.color}20`,
                  "&:hover": {
                    boxShadow: `0 24px 56px ${plan.color}50`,
                  },
                }}
              >
                {/* Background Gradient Blob */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -80,
                    right: -80,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${plan.color}20 0%, transparent 70%)`,
                    filter: "blur(40px)",
                  }}
                />

                {plan.popular && (
                  <MotionBox
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Chip
                      label="⭐ Most Popular"
                      size="medium"
                      sx={{
                        position: "absolute",
                        top: -15,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: plan.color,
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        px: 3,
                        boxShadow: `0 8px 24px ${plan.color}60`,
                      }}
                    />
                  </MotionBox>
                )}

                <CardContent sx={{ p: 4, textAlign: "center", position: "relative", zIndex: 1 }}>
                  {/* Icon */}
                  <MotionBox
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.7 }}
                    sx={{ 
                      color: plan.color,
                      mb: 3,
                    }}
                  >
                    {plan.icon}
                  </MotionBox>

                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 800 }}>
                    {plan.name}
                  </Typography>
                  <Chip 
                    label={plan.meals} 
                    size="small"
                    sx={{ 
                      mb: 3,
                      bgcolor: `${plan.color}20`,
                      color: plan.color,
                      fontWeight: 600,
                    }}
                  />

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, color: plan.color }}>
                      ₹{plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {plan.period}
                    </Typography>
                    <Chip 
                      label={`Save ${plan.save}`}
                      size="small"
                      sx={{ 
                        bgcolor: "#00C853",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: `${plan.color}30` }} />

                  <List sx={{ mb: 3 }}>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle sx={{ color: plan.color, fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{
                            fontSize: "0.95rem",
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      href="/menu"
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      sx={{
                        background: plan.popular 
                          ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`
                          : "transparent",
                        borderColor: plan.color,
                        borderWidth: 2,
                        color: plan.popular ? "#fff" : plan.color,
                        fontWeight: 700,
                        py: 1.5,
                        "&:hover": {
                          borderWidth: 2,
                          borderColor: plan.color,
                          background: plan.popular 
                            ? `linear-gradient(135deg, ${plan.color}dd 0%, ${plan.color} 100%)`
                            : `${plan.color}10`,
                        },
                      }}
                    >
                      {plan.popular ? "Subscribe Now →" : "Choose Plan"}
                    </Button>
                  </MotionBox>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box 
          sx={{ 
            mt: 12,
            position: "relative",
            py: 8,
            px: 4,
            borderRadius: 6,
            background: "linear-gradient(135deg, rgba(255,61,113,0.05) 0%, rgba(0,217,255,0.05) 100%)",
            overflow: "hidden",
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 6 }}
          >
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
              Why Subscribe?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary" }}>
              Four powerful reasons to switch to meal subscriptions
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {benefits.map((benefit, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <MotionCard
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -16, scale: 1.08 }}
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    p: 4,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid",
                    borderColor: benefit.color,
                    borderRadius: 4,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 12px 32px ${benefit.color}20`,
                    "&:hover": {
                      boxShadow: `0 20px 48px ${benefit.color}40`,
                    },
                  }}
                >
                  {/* Gradient Blob */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                  />

                  <MotionBox
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.7 }}
                    sx={{ 
                      color: benefit.color,
                      mb: 3,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {benefit.icon}
                  </MotionBox>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, position: "relative", zIndex: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ position: "relative", zIndex: 1, lineHeight: 1.7 }}>
                    {benefit.desc}
                  </Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{
          position: "relative",
          py: 12,
          background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 50%, #00D9FF 100%)",
          overflow: "hidden",
        }}
      >
        {/* Animated Blob */}
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
              Start Your Subscription Today! 🎉
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, opacity: 0.95, fontWeight: 400, lineHeight: 1.7 }}>
              Join 3,500+ happy customers enjoying hassle-free daily meals
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
                  endIcon={<Favorite />}
                >
                  Subscribe Now
                </Button>
              </MotionBox>
              <MotionBox whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  href="/contact"
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
                >
                  Contact Us
                </Button>
              </MotionBox>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}
