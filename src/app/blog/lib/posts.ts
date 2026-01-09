export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  keywords: string[];
}

// Blog posts data - add new posts here
const posts: BlogPost[] = [
  {
    slug: "kickstarter-board-game-table-guide",
    title: "Kickstarter Board Game Tables: A Backer's Complete Guide",
    excerpt:
      "Everything you need to know before backing a board game table on Kickstarter. From evaluating campaigns to understanding timelines, make informed decisions.",
    category: "Buyer's Guide",
    date: "2025-01-09",
    readingTime: "8 min read",
    author: "Arcadian Team",
    keywords: [
      "kickstarter board game table",
      "crowdfunding gaming table",
      "board game table kickstarter",
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  // Sort by date, newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}
