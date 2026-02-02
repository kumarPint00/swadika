"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Rating,
  TextField,
  IconButton,
} from "@mui/material";
import { Star, Google, Close } from "@mui/icons-material";
import { motion } from "framer-motion";

interface GoogleReviewCTAProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

export default function GoogleReviewCTA({
  open,
  onClose,
  orderId,
}: GoogleReviewCTAProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleGoogleReview = () => {
    // Swadika Google Maps review link
    const googleMapsUrl =
      "https://www.google.com/maps/place/Swadika+Delights/@28.683,77.419,15z/data=!4m7!3m6!1s0x0:0x0!8m2!3d28.683!4d77.419!16s%2Fg%2F11c0q8qy8v!19sChIJ0_0_0_0_0_0_0_0_0_0";
    window.open(googleMapsUrl, "_blank");
    setSubmitted(true);
  };

  const handleInternalReview = async () => {
    // Submit internal review
    try {
      await fetch(`/api/orders/${orderId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      {!submitted ? (
        <>
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
              color: "#fff",
              p: 3,
              textAlign: "center",
              position: "relative",
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
            >
              <Close />
            </IconButton>

            <Box
              component={motion.div}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              sx={{ display: "inline-block", mb: 2 }}
            >
              <Star sx={{ fontSize: 64, color: "#FFD700" }} />
            </Box>

            <Typography variant="h5" fontWeight={700} gutterBottom>
              How was your meal? 🍛
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Your feedback helps us serve you better!
            </Typography>
          </Box>

          {/* Content */}
          <DialogContent sx={{ p: 3 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Rate your experience:
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ fontSize: "3rem" }}
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Tell us what you loved or how we can improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                bgcolor: "background.default",
                p: 2,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                🎁 Leave a Google review and get{" "}
                <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                  50 loyalty points
                </Box>{" "}
                (₹50 value!)
              </Typography>
            </Box>
          </DialogContent>

          {/* Actions */}
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleInternalReview}
              disabled={!rating}
            >
              Submit Feedback
            </Button>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Google />}
              onClick={handleGoogleReview}
              sx={{
                background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
                color: "#fff",
                fontWeight: 700,
                "&:hover": {
                  background: "linear-gradient(135deg, #3367D6 0%, #2D8E47 100%)",
                },
              }}
            >
              Review on Google
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogContent sx={{ p: 4, textAlign: "center" }}>
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Star sx={{ fontSize: 80, color: "#FFD700", mb: 2 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Thank You! 🙏
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your feedback means the world to us. Enjoy your{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                50 loyalty points!
              </Box>
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button fullWidth variant="contained" size="large" onClick={onClose}>
              Done
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
