"use client";
import { Box, Container, Typography, Button, Card, CardContent, CardMedia, Chip, Stack, Grid } from "@mui/material";
import { Restaurant, Verified, LocalShipping, Star, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { getBestsellers } from "@/lib/menuData";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { t } = useLocale();
  const featuredDishes = getBestsellers().slice(0, 3);

  const benefits = [
    { icon: <LocalShipping />, title: t("home.deliveryGuarantee"), desc: t("home.deliveryDesc") },
    { icon: <Verified />, title: t("home.liveTracking"), desc: t("home.liveTrackingDesc") },
    { icon: <Restaurant />, title: t("home.cloudKitchen"), desc: t("home.cloudKitchenDesc") },
    { icon: <Star />, title: t("home.alwaysFresh"), desc: t("home.alwaysFreshDesc") },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
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
            background: "rgba(255,255,255,0.1)",
            filter: "blur(60px)",
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
            background: "rgba(255,255,255,0.08)",
            filter: "blur(60px)",
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <MotionBox
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Chip 
                    label={`⚡ ${t("home.deliveryGuarantee")} ${t("home.deliveryDesc")}`} 
                    size="medium"
                    sx={{ 
                      mb: 3, 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </MotionBox>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: "#fff",
                    mb: 3,
                    fontSize: { xs: "2.8rem", md: "4rem" },
                    fontWeight: 800,
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {t("home.heroTitle")}
                  <br />
                  <Box component="span" sx={{ color: "#FFD700" }}>{t("home.heroSubtitle")}</Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ color: "rgba(255,255,255,0.95)", mb: 4, fontWeight: 400, lineHeight: 1.6 }}
                >
                  {t("home.heroDescription")}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <MotionBox
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
                        color: "#FF6B35",
                        px: 5,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 800,
                        borderRadius: 3,
                        boxShadow: "0 8px 24px rgba(255, 255, 255, 0.3)",
                        "&:hover": { 
                          bgcolor: "rgba(255,255,255,0.95)",
                          boxShadow: "0 12px 32px rgba(255, 255, 255, 0.4)",
                          transform: "translateY(-2px)",
                        },
                      }}
                      endIcon={<ArrowForward />}
                    >
                      {t("home.orderNow")}
                    </Button>
                  </MotionBox>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      component={Link}
                      href="/menu"
                      variant="outlined" 
                      size="large"
                      sx={{ 
                        borderColor: "#fff",
                        color: "#fff",
                        px: 4,
                        py: 1.5,
                        borderWidth: 2,
                        "&:hover": { 
                          borderColor: "#fff", 
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderWidth: 2,
                        },
                      }}
                    >
                      {t("trackOrder")}
                    </Button>
                  </MotionBox>
                </Stack>
              </MotionBox>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <MotionBox
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      maxWidth: 400,
                      mx: "auto",
                    }}
                  >
                    <Box
                      component="img"
                      src="/logo.jpeg"
                      alt="Swadika Cloud Kitchen"
                      sx={{
                        width: "100%",
                        borderRadius: 6,
                        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                        border: "8px solid rgba(255,255,255,0.2)",
                      }}
                    />
                    {/* Floating delivery badge */}
                    <MotionBox
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        bgcolor: "#00C853",
                        color: "#fff",
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        boxShadow: "0 8px 24px rgba(0,200,83,0.4)",
                      }}
                    >
                      <LocalShipping sx={{ mr: 1, fontSize: 20 }} />
                      Live Tracking
                    </MotionBox>
                  </Box>
                </MotionBox>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.05 }}
                elevation={0}
                sx={{ 
                  textAlign: "center", 
                  p: 4,
                  border: "2px solid",
                  borderColor: "divider",
                  cursor: "pointer",
                }}
              >
                <MotionBox
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  sx={{ color: "primary.main", mb: 2, fontSize: 48 }}
                >
                  {benefit.icon}
                </MotionBox>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.desc}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Dishes */}
      <Box sx={{ bgcolor: "background.default", py: 10 }}>
        <Container maxWidth="lg">
          <MotionBox 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography variant="overline" color="primary" sx={{ fontSize: "1rem", fontWeight: 700 }}>
              🔥 {t("home.hotReady")}
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
              {t("home.orderInSeconds")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              {t("home.deliveredHot")}
            </Typography>
          </MotionBox>
          
          <Grid container spacing={4}>
            {featuredDishes.map((dish, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <MotionCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -16, scale: 1.03 }}
                  elevation={0}
                  sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden" }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <MotionBox
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CardMedia
                        component="img"
                        height="240"
                        image={dish.image}
                        alt={dish.name}
                      />
                    </MotionBox>
                    <Chip 
                      label={dish.isBestseller ? t("menu.bestseller") : t("menu.popular")} 
                      size="small" 
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Chip label={dish.category} size="small" color="secondary" />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Star sx={{ fontSize: 16, color: "#FFC107" }} />
                        <Typography variant="body2">{dish.rating}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {dish.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {dish.description.slice(0, 60)}...
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" color="primary">
                        ₹{dish.price}
                      </Typography>
                      <Button size="small" variant="outlined" component={Link} href="/menu">
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button 
              component={Link}
              href="/menu"
              variant="outlined" 
              size="large"
              endIcon={<ArrowForward />}
            >
              {t("home.viewFullMenu")}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          sx={{
            background: "linear-gradient(135deg, #6A0572 0%, #FF6B35 100%)",
            borderRadius: 4,
            p: { xs: 6, md: 10 },
            textAlign: "center",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background circles */}
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
          
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
              {t("home.firstOrderOffer")} 🎉
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 400 }}>
              {t("home.joinToday")}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  component={Link}
                  href="/signup"
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: "#fff",
                    color: "#6A0572",
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                  }}
                >
                  {t("home.signUpNow")}
                </Button>
              </MotionBox>
              <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  component={Link}
                  href="/menu"
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: "#fff",
                    color: "#fff",
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderWidth: 2,
                    "&:hover": { 
                      borderColor: "#fff", 
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderWidth: 2,
                    },
                  }}
                >
                  {t("browseMenu")}
                </Button>
              </MotionBox>
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
