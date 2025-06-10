// src/components/FAQSection.tsx
"use client";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { q: "Do you deliver outside Ghaziabad?", a: "Yes, we cover Noida & Indirapuram via Swiggy/Zomato." },
  { q: "Is everything vegetarian?", a: "Most dishes are veg; check the menu for chicken & mutton items." },
  { q: "How to place bulk orders?", a: "Call/WhatsApp us 24 hrs in advance for 20+ plates." },
];

export default function FAQSection() {
  return (
    <Box py={8}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 4, fontFamily: "Playfair Display, serif" }}
      >
        FAQ
      </Typography>

      {faqs.map((f) => (
        <Accordion key={f.q} sx={{ maxWidth: 700, mx: "auto", mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <Typography>{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
