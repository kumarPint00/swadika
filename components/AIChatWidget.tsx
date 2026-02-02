"use client";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Fab,
  Badge,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import {
  Chat,
  Close,
  Send,
  SmartToy,
  ShoppingCart,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Swadika's AI assistant. Try saying:\n• 'I want 2 Litti Chokha'\n• 'Show me thali options'\n• 'Get me Chicken Biryani'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, action: "addToCart" }),
      });

      const data = await response.json();

      if (data.cartUpdated) {
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: input,
            timestamp: new Date(),
          },
          {
            role: "assistant",
            content: `✅ ${data.message}\n\n${data.response}`,
            timestamp: new Date(),
          },
        ]);
        setInput("");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    "2 Litti Chokha plates",
    "Show thali options",
    "Chicken Biryani",
    "Special offers",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1400,
        }}
        onClick={() => setOpen(!open)}
      >
        <Badge badgeContent="AI" color="secondary">
          {open ? <Close /> : <Chat />}
        </Badge>
      </Fab>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: "fixed",
              bottom: 100,
              right: 24,
              width: { xs: "calc(100vw - 48px)", sm: 400 },
              maxWidth: 400,
              height: 600,
              zIndex: 1400,
            }}
          >
            <Paper
              elevation={8}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "#fff",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <SmartToy />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight={600}>
                    AI Order Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Powered by OpenAI • Natural language ordering
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: "#fff" }} onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 2,
                  bgcolor: "background.default",
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "75%",
                        bgcolor: msg.role === "user" ? "primary.main" : "background.paper",
                        color: msg.role === "user" ? "#fff" : "text.primary",
                        p: 1.5,
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        {msg.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          mt: 0.5,
                          display: "block",
                          fontSize: "0.65rem",
                        }}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                {loading && (
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: "0s",
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: "0.2s",
                      }}
                    />
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: "0.4s",
                      }}
                    />
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* Quick Actions */}
              <Box sx={{ p: 2, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}>
                <Typography variant="caption" sx={{ mb: 1, display: "block", opacity: 0.7 }}>
                  Quick suggestions:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {quickActions.map((action, index) => (
                    <Chip
                      key={index}
                      label={action}
                      size="small"
                      onClick={() => setInput(action)}
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Input */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type your order..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    disabled={loading}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={loading || !input.trim()}
                    title="Add to Cart"
                  >
                    <ShoppingCart />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                  >
                    <Send />
                  </IconButton>
                </Box>
              </Box>
            </Paper>

            <style>{`
              @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
              }
            `}</style>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
