"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import CookieConsent from "@/components/CookieConsent";
import LiveChatWidget from "@/components/LiveChatWidget";
import AIChatWidget from "@/components/AIChatWidget";
import PromoBanner from "@/components/PromoBanner";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import PWARegister from "@/components/PWARegister";

// Context Providers
import { CartProvider } from "@/context/CartContext";
import { ColorModeProvider } from "@/context/ColorModeContent";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { OrderProvider } from "@/context/OrderContext";
import { AddressProvider } from "@/context/AddressContext";
import { ReviewProvider } from "@/context/ReviewContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { LocaleProvider } from "@/context/LocaleContext";

// Theme
import theme from "../mui/theme";

// Constants
const META_DATA = {
  title: "Swadika Delights",
  description: "Swadika Delights offers authentic home-cooked meals in Ghaziabad and Noida. Enjoy hygienic, FSSAI certified dishes delivered fast to your doorstep.",
  keywords: "home-cooked meals, Ghaziabad food delivery, Bihari cuisine, Indian food, hygienic meals, FSSAI certified, fast delivery",
  author: "Swadika Delights",
  image: "/images/hero.jpg",
  url: "https://swadikadelights.in"
};

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Swadika Delights",
  "image": "https://swadikadelights.in/images/hero.jpg",
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
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#FF6B35" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Swadika" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/swadikalogo.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/swadikalogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/swadikalogo.png" />
        <link rel="shortcut icon" href="/swadikalogo.png" />
        
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

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
            <LocaleProvider>
              <AuthProvider>
                <CartProvider>
                  <OrderProvider>
                    <AddressProvider>
                      <ReviewProvider>
                        <FavoritesProvider>
                          <ColorModeProvider>
                          <PWARegister />
                          <Header />
                          <PromoBanner />
                          <CookieConsent />
                          <div style={{ paddingBottom: "70px" }}>
                            {children}
                          </div>
                          <Footer />
                          <BottomNav />
                          <LiveChatWidget />
                          <AIChatWidget />
                          <PWAInstallPrompt />
                          </ColorModeProvider>
                        </FavoritesProvider>
                      </ReviewProvider>
                    </AddressProvider>
                  </OrderProvider>
                </CartProvider>
              </AuthProvider>
            </LocaleProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
