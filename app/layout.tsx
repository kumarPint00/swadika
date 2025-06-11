"use client";

import { ReactNode } from "react";
import Head from "next/head";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../mui/theme";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ColorModeProvider } from "@/context/ColorModeContent";
import Script from "next/script";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="slick-carousel/slick/slick.css" />
        <link rel="stylesheet" href="slick-carousel/slick/slick-theme.css" />
        <link rel="stylesheet" href="slick-carousel/slick/slick.css" />
        <link rel="stylesheet" href="slick-carousel/slick/slick-theme.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="icon"
          href="/favicon.ico"
        />
        import Script from "next/script";

<Script id="ga4" strategy="afterInteractive">
{`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','G-XXXX');`}
</Script>

<Script id="hotjar" strategy="afterInteractive">
{`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[])
.push(arguments)};h._hjSettings={hjid:1234567,hjsv:6};
a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;
r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
</Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `,
          }}
        ></script>

        
        <meta
          name="description"
          content="Swadika GhareluDelights offers authentic home-cooked meals in Ghaziabad and Noida. Enjoy hygienic, FSSAI certified dishes delivered fast to your doorstep."
        />
        <meta
          name="keywords"
          content="home-cooked meals, Ghaziabad food delivery, Bihari cuisine, Indian food, hygienic meals, FSSAI certified, fast delivery"
        />
        <meta name="author" content="Swadika GhareluDelights" />
        <meta property="og:title" content="Swadika GhareluDelights" />
        <meta
          property="og:description"
          content="Authentic home-cooked meals delivered fast in Ghaziabad and Noida. Enjoy hygienic, FSSAI certified dishes from Swadika GhareluDelights."
        />
        <meta property="og:image" content="/images/hero.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Swadika GhareluDelights" />

        <title>Swadika GhareluDelights</title>
      </Head>
      <body>
        <SpeedInsights />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ColorModeProvider>
            {children}
          </ColorModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
