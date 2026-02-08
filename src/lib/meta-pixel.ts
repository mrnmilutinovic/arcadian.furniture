type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "AddToCart"
  | "Purchase"
  | "InitiateCheckout";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq: (
      action: "track" | "init" | "trackCustom",
      event: string,
      params?: EventParams,
    ) => void;
  }
}

export function trackEvent(event: StandardEvent, params?: EventParams) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}
