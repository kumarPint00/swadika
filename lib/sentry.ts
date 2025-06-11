import * as Sentry from "@sentry/nextjs";
Sentry.init({
  dsn: "https://PUBLIC_KEY@o123456.ingest.sentry.io/PROJECT_ID",
  tracesSampleRate: 0.1,
});
