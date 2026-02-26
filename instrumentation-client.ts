import posthog from "posthog-js";

const hostname = typeof window !== "undefined" ? window.location.hostname : "";

const isLocalhost =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname.endsWith(".localhost");

const isDashboard =
  typeof window !== "undefined" &&
  (window.location.pathname.startsWith("/dashboard") ||
    hostname === "partner.arcadiantables.com");

if (!isLocalhost && !isDashboard) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2025-11-30",
    capture_exceptions: true,
  });
}
