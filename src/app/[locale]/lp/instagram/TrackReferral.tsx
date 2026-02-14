"use client";

import { useEffect } from "react";

export function TrackReferral() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) {
      localStorage.setItem("arcadian_ref", ref);
    }
  }, []);

  return null;
}
