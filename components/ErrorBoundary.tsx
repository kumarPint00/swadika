// src/components/ErrorBoundary.tsx
"use client";
import { Component, ErrorInfo, ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";
import { Box, Typography } from "@mui/material";

export default class ErrorBoundary extends Component<{children:ReactNode}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error:Error, info:ErrorInfo) { Sentry.captureException(error); }
  render() {
    if (this.state.hasError)
      return <Box p={4}><Typography>Something went wrong.</Typography></Box>;
    return this.props.children;
  }
}
