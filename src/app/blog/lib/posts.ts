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
  {
    slug: "board-game-table-size-guide",
    title: "How to Choose the Right Board Game Table Size",
    excerpt:
      "Room dimensions, player count, and game types all factor into finding your perfect table size. Here's how to measure, plan, and choose with confidence.",
    category: "Buyer's Guide",
    date: "2025-01-08",
    readingTime: "7 min read",
    author: "Arcadian Team",
    keywords: [
      "board game table size",
      "gaming table dimensions",
      "board game table measurements",
    ],
  },
  {
    slug: "board-game-table-features",
    title: "5 Features Every Board Game Table Needs (And 3 You Can Skip)",
    excerpt:
      "Not all gaming table features are created equal. Learn which ones genuinely improve your game nights and which are just marketing fluff.",
    category: "Buyer's Guide",
    date: "2025-01-07",
    readingTime: "6 min read",
    author: "Arcadian Team",
    keywords: [
      "board game table features",
      "gaming table must haves",
      "what to look for gaming table",
    ],
  },
  {
    slug: "convertible-board-game-dining-table",
    title: "Board Game Tables That Double as Dining Tables: A Design Guide",
    excerpt:
      "The convertible gaming table solves the space problem elegantly. Here's how they work, what to look for, and whether one is right for your home.",
    category: "Lifestyle",
    date: "2025-01-06",
    readingTime: "6 min read",
    author: "Arcadian Team",
    keywords: [
      "convertible gaming table",
      "dining gaming table",
      "dual purpose board game table",
    ],
  },
  {
    slug: "board-game-table-wood-guide",
    title: "Board Game Table Wood Types: Oak vs Walnut vs Maple",
    excerpt:
      "The wood you choose affects durability, aesthetics, and price. A deep dive into the most popular hardwoods for gaming furniture.",
    category: "Craftsmanship",
    date: "2025-01-05",
    readingTime: "7 min read",
    author: "Arcadian Team",
    keywords: [
      "board game table wood",
      "oak gaming table",
      "walnut vs oak furniture",
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
