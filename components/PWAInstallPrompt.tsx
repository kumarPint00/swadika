"use client";
import { useState, useEffect } from "react";
import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import { Close, GetApp, Apple, Android } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detect Android
    const android = /Android/.test(navigator.userAgent);
    setIsAndroid(android);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Check if dismissed before
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) return;

    // Listen for beforeinstallprompt (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Show iOS prompt after 3 seconds
    if (iOS) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === "accepted") {
        console.log("PWA installed");
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-prompt-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <Box
          component={motion.div}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 24 },
            left: { xs: 16, sm: 24 },
            right: { xs: 16, sm: "auto" },
            zIndex: 1500,
            maxWidth: { xs: "auto", sm: 400 },
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 2.5,
              borderRadius: 3,
              background: "linear-gradient(135deg, #FF6B35 0%, #6A0572 100%)",
              color: "#fff",
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              onClick={handleDismiss}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#fff",
              }}
            >
              <Close fontSize="small" />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Box
                component={motion.div}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isIOS ? (
                  <Apple sx={{ fontSize: 48 }} />
                ) : isAndroid ? (
                  <Android sx={{ fontSize: 48 }} />
                ) : (
                  <GetApp sx={{ fontSize: 48 }} />
                )}
              </Box>

              <Box flex={1}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Install Swadika App
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95, mb: 2 }}>
                  {isIOS
                    ? 'Tap Share → "Add to Home Screen" for faster ordering!'
                    : "Add to your home screen for quick access & offline support"}
                </Typography>

                {!isIOS && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GetApp />}
                    onClick={handleInstall}
                    sx={{
                      bgcolor: "#fff",
                      color: "#FF6B35",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                  >
                    Install Now
                  </Button>
                )}

                {isIOS && (
                  <Box
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      p: 1.5,
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      📱 How to install:
                    </Typography>
                    <Typography variant="caption" display="block">
                      1. Tap the Share button (□↑)
                    </Typography>
                    <Typography variant="caption" display="block">
                      2. Tap "Add to Home Screen"
                    </Typography>
                    <Typography variant="caption" display="block">
                      3. Tap "Add"
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Benefits */}
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                  ⚡
                </Typography>
                <Typography variant="caption">Faster</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                  📱
                </Typography>
                <Typography variant="caption">Offline</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700}>
                  🔔
                </Typography>
                <Typography variant="caption">Alerts</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
}
