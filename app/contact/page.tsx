"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { 
  Email, 
  Phone, 
  LocationOn, 
  Schedule,
  Send,
  Person,
  Message,
  WhatsApp,
  Instagram,
  Facebook,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const contactInfo = [
  { 
    icon: <Phone sx={{ fontSize: 40 }} />, 
    label: "Phone", 
    value: "+91 9958382202",
    action: "tel:+919958382202",
    color: "#FF3D71",
  },
  { 
    icon: <Email sx={{ fontSize: 40 }} />, 
    label: "Email", 
    value: "info@swadika.com",
    action: "mailto:info@swadika.com",
    color: "#00D9FF",
  },
  { 
    icon: <LocationOn sx={{ fontSize: 40 }} />, 
    label: "Address", 
    value: "A-64, Himalaya Enclave, Khora Colony, Ghaziabad, UP 201309",
    action: "https://maps.google.com/?q=A-64+Himalaya+Enclave+Khora+Colony+Ghaziabad",
    color: "#F59E0B",
  },
  { 
    icon: <Schedule sx={{ fontSize: 40 }} />, 
    label: "Hours", 
    value: "Mon-Sun: 10:00 AM - 10:00 PM",
    action: null,
    color: "#8B5CF6",
  },
];

const socialLinks = [
  { icon: <WhatsApp />, label: "WhatsApp", url: "https://wa.me/919958382202", color: "#25D366" },
  { icon: <Instagram />, label: "Instagram", url: "https://instagram.com/swadikadelights", color: "#E1306C" },
  { icon: <Facebook />, label: "Facebook", url: "https://facebook.com/swadikadelights", color: "#1877F2" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section with Gradient */}
      <Box
        sx={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #00D9FF 0%, #6A0572 50%, #FF3D71 100%)",
        }}
      >
        {/* Animated Blobs */}
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(80px)",
          }}
        />
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255, 61, 113, 0.15)",
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
                label="💬 We're Here to Help" 
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
              Get in{" "}
              <Box component="span" sx={{ color: "#FFD700" }}>
                Touch
              </Box>
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                opacity: 0.95, 
                maxWidth: 700, 
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Questions? Feedback? Special requests? We'd love to hear from you!
            </Typography>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>

        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Chip 
                label="Contact Info" 
                size="small"
                sx={{ 
                  mb: 3,
                  background: "linear-gradient(135deg, #00D9FF 0%, #FF3D71 100%)",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 4,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00D9FF 0%, #FF3D71 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Let's Connect
              </Typography>

              {/* Contact Info Cards */}
              {contactInfo.map((info, idx) => {
                const cardContent = (
                  <>
                    {/* Gradient Blob */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${info.color}15 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />

                    <MotionBox
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      sx={{ color: info.color, position: "relative", zIndex: 1 }}
                    >
                      {info.icon}
                    </MotionBox>
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography variant="overline" sx={{ color: info.color, fontWeight: 700, letterSpacing: 1 }}>
                        {info.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {info.value}
                      </Typography>
                    </Box>
                  </>
                );

                const cardStyles = {
                  mb: 3,
                  p: 3,
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid",
                  borderColor: info.color,
                  borderRadius: 4,
                  cursor: info.action ? "pointer" : "default",
                  textDecoration: "none",
                  color: "inherit",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 8px 24px ${info.color}20`,
                  "&:hover": {
                    boxShadow: `0 12px 32px ${info.color}40`,
                  },
                };

                return info.action ? (
                  <MotionBox
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <Box
                      component="a"
                      href={info.action}
                      target={info.action.startsWith("http") ? "_blank" : undefined}
                      sx={cardStyles}
                    >
                      {cardContent}
                    </Box>
                  </MotionBox>
                ) : (
                  <MotionBox
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    sx={cardStyles}
                  >
                    {cardContent}
                  </MotionBox>
                );
              })}

              {/* Social Links */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {socialLinks.map((social, idx) => (
                    <MotionBox
                      key={idx}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        sx={{
                          bgcolor: social.color,
                          color: "#fff",
                          width: 56,
                          height: 56,
                          boxShadow: `0 8px 24px ${social.color}40`,
                          "&:hover": {
                            bgcolor: social.color,
                            boxShadow: `0 12px 32px ${social.color}60`,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </MotionBox>
                  ))}
                </Box>
              </Box>

              {/* Map */}
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                sx={{ mt: 6 }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Find Us Here
                </Typography>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "3px solid",
                    borderColor: "#F59E0B",
                    boxShadow: "0 12px 32px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <iframe
                    title="Swadika Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2598277374967!2d77.3586008!3d28.6192104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50d5f0c0b97%3A0xabcdef1234567890!2sA-64%20Himalaya%20Enclave%20Khora%20Colony!5e0!3m2!1sen!2sin!4v1680000000000"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </Box>
              </MotionBox>
            </MotionBox>
          </Grid>

          {/* Contact Form - Glassmorphic */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              elevation={0}
              sx={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                backdropFilter: "blur(20px)",
                border: "2px solid",
                borderColor: "rgba(255, 61, 113, 0.3)",
                borderRadius: 5,
                boxShadow: "0 20px 48px rgba(255, 61, 113, 0.2)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                {submitted ? (
                  <MotionBox
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    sx={{ textAlign: "center", py: 8 }}
                  >
                    <MotionBox
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle sx={{ fontSize: 100, color: "#00C853", mb: 3 }} />
                    </MotionBox>
                    <Typography variant="h3" sx={{ mb: 2, fontWeight: 800, color: "#00C853" }}>
                      Message Sent! ✅
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      We'll get back to you within 24 hours
                    </Typography>
                  </MotionBox>
                ) : (
                  <>
                    <Chip 
                      label="Send Message" 
                      size="small"
                      sx={{ 
                        mb: 2,
                        background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 100%)",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    />
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 800,
                        background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Drop Us a Line
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      Fill out the form and we'll respond as soon as possible
                    </Typography>

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person sx={{ color: "#FF3D71" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderWidth: 2, borderColor: "rgba(255, 61, 113, 0.3)" },
                                "&:hover fieldset": { borderColor: "#FF3D71" },
                                "&.Mui-focused fieldset": { borderColor: "#FF3D71" },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email sx={{ color: "#00D9FF" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderWidth: 2, borderColor: "rgba(0, 217, 255, 0.3)" },
                                "&:hover fieldset": { borderColor: "#00D9FF" },
                                "&.Mui-focused fieldset": { borderColor: "#00D9FF" },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone sx={{ color: "#8B5CF6" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderWidth: 2, borderColor: "rgba(139, 92, 246, 0.3)" },
                                "&:hover fieldset": { borderColor: "#8B5CF6" },
                                "&.Mui-focused fieldset": { borderColor: "#8B5CF6" },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            fullWidth
                            label="Your Message"
                            multiline
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 2 }}>
                                  <Message sx={{ color: "#F59E0B" }} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderWidth: 2, borderColor: "rgba(245, 158, 11, 0.3)" },
                                "&:hover fieldset": { borderColor: "#F59E0B" },
                                "&.Mui-focused fieldset": { borderColor: "#F59E0B" },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                              variant="contained" 
                              size="large" 
                              type="submit" 
                              fullWidth
                              endIcon={<Send />}
                              sx={{
                                background: "linear-gradient(135deg, #FF3D71 0%, #8B5CF6 100%)",
                                py: 2,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                boxShadow: "0 12px 32px rgba(255, 61, 113, 0.4)",
                                "&:hover": {
                                  boxShadow: "0 16px 40px rgba(255, 61, 113, 0.5)",
                                },
                              }}
                            >
                              Send Message
                            </Button>
                          </MotionBox>
                        </Grid>
                      </Grid>
                    </form>
                  </>
                )}
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
