"use client";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from "@mui/material";
import { Star, LocalOffer, CardGiftcard, EmojiEvents } from "@mui/icons-material";
import Link from "next/link";

const rewards = [
  { points: 100, reward: "₹100 Off on next order", icon: <LocalOffer /> },
  { points: 250, reward: "Free Delivery for 1 month", icon: <CardGiftcard /> },
  { points: 500, reward: "Exclusive VIP Menu Access", icon: <EmojiEvents /> },
  { points: 1000, reward: "₹1000 Gift Voucher", icon: <Star /> },
];

const tiers = [
  { name: "Bronze", minPoints: 0, color: "#CD7F32" },
  { name: "Silver", minPoints: 500, color: "#C0C0C0" },
  { name: "Gold", minPoints: 1500, color: "#FFD700" },
];

export default function RewardsPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Join Our Loyalty Program
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign up to start earning rewards on every order
        </Typography>
        <Button component={Link} href="/signup" variant="contained" size="large">
          Create Account
        </Button>
      </Container>
    );
  }

  const currentPoints = user?.rewards || 0;
  const currentTier = tiers.findLast((t) => currentPoints >= t.minPoints) || tiers[0];
  const nextTier = tiers.find((t) => currentPoints < t.minPoints);
  const progressToNext = nextTier
    ? ((currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 6, textAlign: "center" }}>
          Loyalty Rewards
        </Typography>

        <Grid container spacing={4}>
          {/* Points Summary */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Your Points
                </Typography>
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h1" color="secondary.main">
                    {currentPoints}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Total Reward Points
                  </Typography>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">
                      Current Tier: <Chip label={currentTier.name} size="small" />
                    </Typography>
                    {nextTier && (
                      <Typography variant="body2" color="text.secondary">
                        {nextTier.minPoints - currentPoints} pts to {nextTier.name}
                      </Typography>
                    )}
                  </Box>
                  {nextTier && <LinearProgress variant="determinate" value={progressToNext} sx={{ height: 8, borderRadius: 4 }} />}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* How to Earn */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  How to Earn Points
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Every ₹100 spent = 10 points"
                      secondary="Earn on all orders"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="First order bonus: 100 points"
                      secondary="One-time reward"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Refer a friend: 50 points"
                      secondary="When they complete first order"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Birthday bonus: 200 points"
                      secondary="Annual reward"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Redeem Rewards */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Redeem Your Points
            </Typography>
            <Grid container spacing={3}>
              {rewards.map((reward, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                  <Card sx={{ textAlign: "center" }}>
                    <CardContent>
                      <Box sx={{ color: "secondary.main", mb: 2 }}>
                        {reward.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {reward.points} Points
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {reward.reward}
                      </Typography>
                      <Button
                        variant={currentPoints >= reward.points ? "contained" : "outlined"}
                        fullWidth
                        disabled={currentPoints < reward.points}
                      >
                        {currentPoints >= reward.points ? "Redeem" : "Locked"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
