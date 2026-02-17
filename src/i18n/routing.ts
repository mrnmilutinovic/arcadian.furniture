import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      sr: "/o-nama",
    },
    "/faq": {
      en: "/faq",
      sr: "/cesta-pitanja",
    },
    "/terms": {
      en: "/terms",
      sr: "/uslovi",
    },
    "/privacy": {
      en: "/privacy",
      sr: "/privatnost",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/logs": "/logs",
    "/stories/[slug]": "/stories/[slug]",
    "/order": {
      en: "/order",
      sr: "/narucite",
    },
    "/b2b": {
      en: "/b2b",
      sr: "/poslovni-kontakt",
    },
    "/lp/instagram": "/lp/instagram",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
