"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/meta-pixel";

export function TrackLandingView() {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: "Instagram Landing Page",
      content_category: "Board Game Tables",
    });
  }, []);

  return null;
}
