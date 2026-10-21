// Single source of truth for brand guidelines — used by the public /brand
// page and the partner dashboard asset pages.

export const brandColors = [
  { name: "Paper", hex: "#f3f1ea", usage: "Primary background" },
  { name: "Ink", hex: "#1a1918", usage: "Text and dark surfaces" },
  { name: "Accent", hex: "#cd4631", usage: "Calls to action, highlights" },
  { name: "Oak", hex: "#5d4e3c", usage: "Secondary text, warm details" },
  { name: "Wood Light", hex: "#d4c4a8", usage: "Borders, muted UI on dark" },
  { name: "Wood Dark", hex: "#5c4033", usage: "Deep wood tones" },
  { name: "Clay", hex: "#e3e0d6", usage: "Cards and soft panels" },
];

export const logoColors = [
  { name: "Logo Mint", hex: "#d4f7d2", usage: "Logo mark only" },
];

export const brandFonts = [
  {
    role: "Headlines",
    name: "Cormorant Garamond",
    className: "font-serif",
    description: "Elegant serif for headlines and display text",
    url: "https://fonts.google.com/specimen/Cormorant+Garamond",
  },
  {
    role: "Body",
    name: "Manrope",
    className: "font-sans",
    description: "Clean geometric sans-serif for body copy",
    url: "https://fonts.google.com/specimen/Manrope",
  },
  {
    role: "Labels",
    name: "Space Mono",
    className: "font-mono",
    description: "Monospace for small caps labels, specs and metadata",
    url: "https://fonts.google.com/specimen/Space+Mono",
  },
  {
    role: "Accent",
    name: "Caveat",
    className: "font-brush",
    description: "Handwritten brush for personality touches",
    url: "https://fonts.google.com/specimen/Caveat",
  },
  {
    role: "Logo",
    name: "Staatliches",
    className: "font-staatliches-baskerville",
    description: "Strong display font for logo lockups and brand marks",
    url: "https://fonts.google.com/specimen/Staatliches",
  },
];

export const voiceTraits = [
  {
    trait: "Warm & Inviting",
    description:
      "Speak like a host welcoming friends to game night — approachable, genuine, never stuffy.",
    do: "Pull up a chair and roll the dice.",
    dont: "Please be seated at our premium gaming station.",
  },
  {
    trait: "Confident, Not Boastful",
    description:
      "Let the craftsmanship speak for itself. State facts; avoid superlatives.",
    do: "Hand-finished European oak, built to last decades.",
    dont: "The absolute best table ever made!!!",
  },
  {
    trait: "Playful with Purpose",
    description:
      "Board gaming is fun — our tone should reflect that while staying grounded in quality.",
    do: "Your next campaign deserves a worthy battleground.",
    dont: "OMG this table is SO epic you guys!!!",
  },
  {
    trait: "Community-First",
    description:
      "We're building something together with our backers and partners, not selling at them.",
    do: "Join the first 500 backers shaping the Arcadian experience.",
    dont: "Buy now before it's too late!",
  },
];

export const talkingPoints = [
  "Arcadian tables are designed for board gamers who want premium furniture that enhances their gaming experience.",
  "Each table features a recessed playing surface, integrated accessories, and a convertible dining top.",
  "Made with sustainably sourced hardwood and hand-finished details.",
  "Launching on Kickstarter — early supporters get exclusive pricing.",
  "Available in multiple wood finishes to match any room aesthetic.",
];

export const boilerplate =
  "Arcadian makes premium board game tables that transform from an elegant dining table into an immersive gaming surface in seconds. Handcrafted in Serbia from solid European oak, each table features a recessed play vault, a magnetic rail system for modular accessories, and solid oak dining toppers finished with a plant-based, 0% VOC hardwax oil. Arcadian is designed for families who play — for game nights that run late and campaigns that span months.";

export const BLOB_LOGO_PREFIX = "branding/logo/";
export const BLOB_PHOTO_PREFIX = "branding/photography/";
export const BLOB_PHOTO_THUMBS_PREFIX = "branding/photography/thumbs/";
