import type { MetadataRoute } from "next";
import { getAllPosts } from "./[locale]/blog/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.arcadiantables.com";

  // Get all blog posts for dynamic sitemap entries
  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    // Homepage - bilingual
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          sr: `${baseUrl}/sr`,
        },
      },
    },
    // About - bilingual
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          sr: `${baseUrl}/sr/o-nama`,
        },
      },
    },
    // FAQ - bilingual
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/faq`,
          sr: `${baseUrl}/sr/cesta-pitanja`,
        },
      },
    },
    // Privacy - bilingual
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy`,
          sr: `${baseUrl}/sr/privatnost`,
        },
      },
    },
    // Terms - bilingual
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/terms`,
          sr: `${baseUrl}/sr/uslovi`,
        },
      },
    },
    // Blog - English only for now
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    // Stories - English only for now
    {
      url: `${baseUrl}/stories/forest-of-radgost-collaboration`,
      lastModified: new Date("2025-12-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/stories/boris-jovanovic-photoshoot`,
      lastModified: new Date("2025-09-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Logs
    {
      url: `${baseUrl}/logs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
