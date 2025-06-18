// src/components/FAQSection.tsx
"use client";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  { q: "Do you deliver outside Ghaziabad?", a: "Yes, we cover Noida & Indirapuram via Swiggy/Zomato." },
  { q: "Is everything vegetarian?", a: "Most dishes are veg; check the menu for chicken & mutton items." },
  { q: "How to place bulk orders?", a: "Call/WhatsApp us 24 hrs in advance for 20+ plates." },
  { q: "What are your operating hours?", a: "We're open daily from 11 AM to 10 PM." },
  { q: "Do you take custom orders?", a: "Yes, we can customize orders for special events with advance notice." },
  { q: "What payment methods do you accept?", a: "We accept cash, all major cards, UPI, and online payments." },
  { q: "Do you provide catering services?", a: "Yes, we offer catering for events. Please contact us 3-4 days in advance." },
  { q: "Are your ingredients fresh?", a: "Yes, we source fresh ingredients daily from trusted suppliers." },
  { q: "Do you have any minimum order value?", a: "For delivery, minimum order value varies by location and platform." },
  { q: "Can I modify my order after placing it?", a: "Yes, but please contact us within 10 minutes of placing the order." },
  { q: "Do you offer any discounts for large orders?", a: "Yes, we offer special rates for orders above 50 plates." },
  { q: "Are your dishes spicy?", a: "Spice levels can be adjusted according to your preference." },
  { q: "Do you cater to special dietary requirements?", a: "Yes, we can accommodate most dietary restrictions with advance notice." },
  { q: "How do I provide feedback?", a: "You can rate us on Swiggy/Zomato or contact us directly." },
  { q: "What's your most popular dish?", a: "Our signature Biryani and Special Thali are customer favorites." },
  { q: "Do you offer party packages?", a: "Yes, we have special packages for parties and events." },
  { q: "Is there parking available?", a: "Yes, we have dedicated parking space for our customers." },
  { q: "Do you provide utensils with delivery orders?", a: "Yes, disposable utensils are provided upon request." },
  { q: "Can I schedule an order in advance?", a: "Yes, you can pre-schedule orders up to 7 days in advance." },
  { q: "Do you have any loyalty program?", a: "Yes, regular customers get special benefits and discounts." },
  { q: "What's your refund policy?", a: "We offer refunds for valid quality issues reported within 30 minutes." },
  { q: "Do you serve Jain food?", a: "Yes, we can prepare Jain versions of most dishes." },
  { q: "How do you ensure food quality?", a: "We follow strict FSSAI guidelines and quality control measures." },
  { q: "Do you deliver during bad weather?", a: "Delivery might be affected during severe weather conditions." }
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
