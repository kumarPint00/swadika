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
} from "@mui/material";
import { CheckCircle, Restaurant, LocalOffer } from "@mui/icons-material";

const plans = [
  {
    name: "Weekly Plan",
    price: 1499,
    period: "per week",
    meals: "7 meals",
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

export default function SubscriptionsPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 12 }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Meal Subscriptions
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: "auto", opacity: 0.9, fontWeight: 400 }}>
            Never worry about cooking again. Fresh, authentic meals delivered daily
          </Typography>
        </Container>
      </Box>

      {/* Plans */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {plans.map((plan, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Card
                elevation={plan.popular ? 8 : 0}
                sx={{
                  border: plan.popular ? "2px solid" : "1px solid",
                  borderColor: plan.popular ? "secondary.main" : "divider",
                  position: "relative",
                  height: "100%",
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="secondary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {plan.meals}
                  </Typography>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    ₹{plan.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    {plan.period}
                  </Typography>

                  <List>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                  >
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Benefits */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 6 }}>
            Why Subscribe?
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: <Restaurant />, title: "Convenience", desc: "No cooking, no cleanup" },
              { icon: <CheckCircle />, title: "Consistency", desc: "Quality meals every day" },
              { icon: <LocalOffer />, title: "Savings", desc: "Up to 30% cheaper than ordering daily" },
            ].map((benefit, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Box sx={{ color: "secondary.main", mb: 2 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
