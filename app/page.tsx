"use client";
import AboutUs from "@/components/AboutUs";
import FAQSection from "@/components/FAQSection";
import FeaturedCarousel from "@/components/FeaturedCorousel";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import MiniContact from "@/components/MiniContact";
import OpeningHours from "@/components/OpeningHours";
import ProcessSteps from "@/components/ProcessStep";
import USPSection from "@/components/USPSection";
import { useTheme } from "@mui/material";


export default function LandingPage() {
  const theme = useTheme();

  return (
    <>
      <Hero />
      <USPSection />
      {/* <FeaturedCarousel /> */}
      <AboutUs />
      <OpeningHours />
      <ProcessSteps />
      <MiniContact />
      <FAQSection />
      <MapSection />
      <Footer />
   
    
    </>
  );
}
