import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://70802b2360dcaf5f64b499d1661927ff@o4506946607579136.ingest.us.sentry.io/4506946608693248",
  tracesSampleRate: 1,
  debug: false,
  sendDefaultPii: true,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
