"use client";
import { useState } from "react";
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
} from "@mui/material";
import { Chat, Close, Send } from "@mui/icons-material";

type Message = {
  text: string;
  sender: "user" | "bot";
  time: string;
};

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Auto-reply (mock)
    setTimeout(() => {
      const reply: Message = {
        text: "Thank you for your message! Our team will respond shortly.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      {/* Chat FAB */}
      <Fab
        color="secondary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        onClick={() => setOpen(true)}
      >
        <Chat />
      </Fab>

      {/* Chat Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            position: "fixed",
            bottom: 24,
            right: 24,
            m: 0,
            maxHeight: 600,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>S</Avatar>
            <Box>
              <Typography variant="subtitle2">Swadika Support</Typography>
              <Typography variant="caption" color="text.secondary">
                Online
              </Typography>
            </Box>
          </Box>
          <Button size="small" onClick={() => setOpen(false)}>
            <Close />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {/* Messages */}
          <Box sx={{ height: 400, overflowY: "auto", p: 2 }}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    p: 0.5,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      maxWidth: "75%",
                      bgcolor: msg.sender === "user" ? "secondary.main" : "background.default",
                      color: msg.sender === "user" ? "white" : "text.primary",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.5,
                        opacity: 0.7,
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button variant="contained" onClick={handleSend}>
                <Send />
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
