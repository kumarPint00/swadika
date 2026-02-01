"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import LiveChatWidget from "@/components/LiveChatWidget";

// Context Providers
import { CartProvider } from "@/context/CartContext";
import { ColorModeProvider } from "@/context/ColorModeContent";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { OrderProvider } from "@/context/OrderContext";
import { AddressProvider } from "@/context/AddressContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

// Theme
import theme from "../mui/theme";

// Constants
const META_DATA = {
  title: "Swadika GhareluDelights",
  description: "Swadika GhareluDelights offers authentic home-cooked meals in Ghaziabad and Noida. Enjoy hygienic, FSSAI certified dishes delivered fast to your doorstep.",
  keywords: "home-cooked meals, Ghaziabad food delivery, Bihari cuisine, Indian food, hygienic meals, FSSAI certified, fast delivery",
  author: "Swadika GhareluDelights",
  image: "/images/hero.jpg",
  url: "https://yourdomain.com"
};

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Swadika GhareluDelights",
  "image": "https://yourdomain.com/hero.jpg",
  "telephone": "+919958382202",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "A-64 Himalaya Enclave, Khora Colony",
    "addressLocality": "Ghaziabad",
    "addressRegion": "UP",
    "postalCode": "201001",
    "addressCountry": "IN"
  },
  "priceRange": "₹200-₹600",
  "servesCuisine": ["Indian", "Bihari", "North Indian"]
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{META_DATA.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={META_DATA.description} />
        <meta name="keywords" content={META_DATA.keywords} />
        <meta name="author" content={META_DATA.author} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={META_DATA.title} />
        <meta property="og:description" content={META_DATA.description} />
        <meta property="og:image" content={META_DATA.image} />
        <meta property="og:url" content={META_DATA.url} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_DATA.title} />
        
        {/* External Resources */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_DATA) }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>

      <body>
        <SpeedInsights />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <OrderProvider>
                  <AddressProvider>
                    <ReviewProvider>
                      <FavoritesProvider>
                        <ColorModeProvider>
                          <Header />
                          <CookieConsent />
                          {children}
                          <Footer />
                          <LiveChatWidget />
                        </ColorModeProvider>
                      </FavoritesProvider>
                    </ReviewProvider>
                  </AddressProvider>
                </OrderProvider>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
