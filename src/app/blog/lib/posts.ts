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
  {
    slug: "diy-vs-buying-board-game-table",
    title: "DIY Board Game Table vs Buying: The Real Cost Breakdown",
    excerpt:
      "Building your own gaming table sounds appealing until you add up the tools, materials, and hours. Here's an honest comparison to help you decide.",
    category: "Buyer's Guide",
    date: "2025-01-04",
    readingTime: "8 min read",
    author: "Arcadian Team",
    keywords: [
      "DIY board game table",
      "build your own gaming table",
      "board game table cost",
    ],
  },
  {
    slug: "board-game-table-vs-gaming-table",
    title: "Board Game Table vs Gaming Table: What's the Difference?",
    excerpt:
      "The terms get used interchangeably, but they're not the same thing. Understanding the distinction helps you buy the right table for your needs.",
    category: "Buyer's Guide",
    date: "2025-01-03",
    readingTime: "5 min read",
    author: "Arcadian Team",
    keywords: [
      "board game table vs gaming table",
      "gaming table types",
      "tabletop gaming table",
    ],
  },
  {
    slug: "perfect-game-night-guide",
    title: "Hosting the Perfect Game Night: A Complete Guide",
    excerpt:
      "Great game nights are about more than great games. From setup to snacks to saying goodnight, here's how to host sessions people remember.",
    category: "Lifestyle",
    date: "2025-01-02",
    readingTime: "7 min read",
    author: "Arcadian Team",
    keywords: [
      "game night hosting",
      "board game night tips",
      "how to host game night",
    ],
  },
  {
    slug: "board-game-table-care-guide",
    title: "Caring for Your Board Game Table: A Maintenance Guide",
    excerpt:
      "Your gaming table is an investment. Proper care keeps it looking beautiful and functioning perfectly for decades. Here's how to protect it.",
    category: "Craftsmanship",
    date: "2025-01-01",
    readingTime: "6 min read",
    author: "Arcadian Team",
    keywords: [
      "board game table care",
      "wood table maintenance",
      "gaming table cleaning",
    ],
  },
  {
    slug: "board-gaming-renaissance",
    title: "The Board Gaming Renaissance: Why Premium Tables Are Having a Moment",
    excerpt:
      "Board games are bigger than ever, and so is the demand for dedicated gaming furniture. What's driving the trend and where it's heading.",
    category: "Industry",
    date: "2024-12-31",
    readingTime: "6 min read",
    author: "Arcadian Team",
    keywords: [
      "board game trends",
      "tabletop gaming growth",
      "gaming furniture market",
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
