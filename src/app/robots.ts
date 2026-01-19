import type { MetadataRoute } from "next";

// LLM discovery file available at: https://www.arcadian.furniture/llms.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"],
    },
    sitemap: "https://www.arcadian.furniture/sitemap.xml",
  };
}
