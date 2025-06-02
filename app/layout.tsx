"use client";

import { ReactNode } from "react";
import Head from "next/head";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../mui/theme";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:700&display=swap"
          rel="stylesheet"
        />
        {/* App Logo */}
        <link
          rel="icon"
          href="/ .ico"
        />
        <title>Swadika GhareluDelights</title>
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
