"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "flex", alignItems: "center", py: 8 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
              Sign in to your account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                required
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <MuiLink component={Link} href="/forgot-password" variant="body2">
                  Forgot password?
                </MuiLink>
              </Box>

              <Divider sx={{ mb: 3 }}>OR</Divider>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <MuiLink component={Link} href="/signup" fontWeight={600}>
                    Sign Up
                  </MuiLink>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
