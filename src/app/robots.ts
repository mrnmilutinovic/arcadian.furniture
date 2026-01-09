import type { MetadataRoute } from "next";

// LLM discovery file available at: https://arcadian.furniture/llms.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://arcadian.furniture/sitemap.xml",
  };
}
