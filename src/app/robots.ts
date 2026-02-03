import type { MetadataRoute } from "next";

// LLM discovery file available at: https://www.arcadiantables.com/llms.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"],
    },
    sitemap: "https://www.arcadiantables.com/sitemap.xml",
  };
}
