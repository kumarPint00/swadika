"use client";
import AboutUs from "@/components/AboutUs";
import CookieConsent from "@/components/CookieConsent";
import FAQSection from "@/components/FAQSection";
import FeaturedCarousel from "@/components/FeaturedCorousel";
import FlashBanner from "@/components/FlashBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import MiniContact from "@/components/MiniContact";
import NewsletterModal from "@/components/NewsletterModal";
import OpeningHours from "@/components/OpeningHours";
import ProcessSteps from "@/components/ProcessStep";
import StampCard from "@/components/StampCard";
import USPSection from "@/components/USPSection";
import { useTheme } from "@mui/material";


export default function LandingPage() {
  const theme = useTheme();

  return (
    <>
    <CookieConsent />
      <FlashBanner />
      <Hero />
      <USPSection />
      {/* <FeaturedCarousel /> */}
      <AboutUs />
      <OpeningHours />
      <ProcessSteps />
      <MiniContact />
      <FAQSection />
      <NewsletterModal />
      <MapSection />
      <StampCard />
      <Footer />
    </>
  );
}
