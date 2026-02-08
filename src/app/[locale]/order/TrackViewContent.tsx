"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export function TrackViewContent() {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: "Order Page",
      content_category: "Board Game Tables",
    });
  }, []);

  return null;
}
