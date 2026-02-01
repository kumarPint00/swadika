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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Link from "next/link";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    
    setLoading(true);
    try {
      await signup(name, email, password);
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
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
              Join Swadika and earn rewards on every order
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3 }}
                required
              />
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
                helperText="At least 8 characters"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <MuiLink href="/terms" target="_blank">
                      Terms & Conditions
                    </MuiLink>{" "}
                    and{" "}
                    <MuiLink href="/privacy" target="_blank">
                      Privacy Policy
                    </MuiLink>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading || !agreedToTerms}
                sx={{ mb: 2 }}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <Divider sx={{ mb: 3 }}>OR</Divider>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <MuiLink component={Link} href="/login" fontWeight={600}>
                    Sign In
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
