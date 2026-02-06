# Programmatic SEO Strategy - Arcadian

> Saved from conversation on 2026-02-06. Ready to implement when prioritized.

## Overview

**Goal:** Drive pre-orders for 2026 batch through game + table pairing content
**Primary Market:** Serbia (blue ocean - no competitors)
**Secondary Market:** EU (competitors: Wyrmwood, Geeknson, Rathskellers)
**Unique Asset:** 140-game collection to photograph on table

---

## Strategy: Bilingual Game Pages

### URL Structure
```
arcadian.furniture/            → Serbian (default)
arcadian.furniture/en/         → English

arcadian.furniture/igre/[slug]      → Serbian game page
arcadian.furniture/en/games/[slug]  → English game page
```

Each pair linked via hreflang tags.

### Why This Works
1. **140 unique pages** with proprietary photos
2. **Zero competition** in Serbia for "sto za društvene igre"
3. **High intent** - people searching game + table are buyers
4. **Scalable** - template-based, add games as photographed

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Translate core site pages to Serbian (home, about, FAQ, terms, privacy)
- [ ] Set up Next.js i18n routing (Serbian default, English at `/en/`)
- [ ] Implement hreflang tags across all pages
- [ ] Update sitemap for bilingual structure

### Phase 2: Game Page Template
- [ ] Create `/igre/[slug]` dynamic route
- [ ] Create `/en/games/[slug]` dynamic route
- [ ] Design page template with:
  - Hero image (game on table)
  - Game metadata (players, time, BGG rating)
  - Table fit analysis (Standard vs Grand)
  - Photo gallery
  - Setup tips / component storage
  - Related games
  - Pre-order CTA
- [ ] Set up data structure for game entries (JSON/MDX)

### Phase 3: Content Creation
- [ ] Photograph 10-20 "hero games" first
- [ ] Write bilingual content for each
- [ ] Gradually expand to full 140-game collection

---

## Priority Games to Photograph First

### Table Hogs (justify Grand size)
- Gloomhaven
- Twilight Imperium
- Ark Nova
- Spirit Island (with expansions)

### Visual Stunners (marketing photos)
- Everdell
- Wingspan
- Root
- Scythe

### Popular/High Search Volume
- Catan
- Ticket to Ride
- Azul
- 7 Wonders

### Miniature Games (show vault depth)
- Blood Rage
- Rising Sun
- Nemesis

### Party/Social (show versatility)
- Codenames
- Dixit
- Wavelength

---

## Serbian Keywords to Target

| Keyword | Intent |
|---------|--------|
| sto za društvene igre | Primary - board game table |
| gejmerski sto za board game | Emerging term |
| [naziv igre] sto za igranje | Game-specific |
| nameštaj za igre | Gaming furniture |
| sto za gloomhaven | Game-specific long-tail |

---

## European Competitors (for later comparison pages)

| Competitor | Base | Price | Notes |
|------------|------|-------|-------|
| Wyrmwood | US | $5,000+ | Premium, EU Kickstarter 2024 |
| Geeknson | UK/Poland | €2,000+ | 5-6 month lead time |
| Rathskellers | Greece | €1,500+ | SunnyGeeks line |

Future comparison page opportunities:
- `/en/compare/arcadian-vs-wyrmwood`
- `/en/compare/arcadian-vs-geeknson`
- `/en/compare/best-gaming-tables-europe`

---

## Technical Requirements

### Next.js i18n Setup
- Use `next-intl` or built-in i18n routing
- Serbian (sr) as default locale
- English (en) as secondary
- Middleware for locale detection

### Data Structure for Games
```typescript
interface GamePage {
  slug: string;
  title: { sr: string; en: string };
  description: { sr: string; en: string };
  bggId?: number;
  players: { min: number; max: number };
  playtime: { min: number; max: number };
  recommendedTable: 'standard' | 'grand' | 'both';
  images: string[];
  tableFitNotes: { sr: string; en: string };
  setupTips: { sr: string; en: string };
  relatedGames: string[];
}
```

### SEO Checklist Per Page
- [ ] Unique title with game name + "Arcadian sto/table"
- [ ] Meta description mentioning table size fit
- [ ] Open Graph images (game on table)
- [ ] Schema.org Product markup
- [ ] hreflang to alternate language version
- [ ] Internal links to related games
- [ ] Breadcrumbs

---

## Resources

- [BoardGameGeek API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) - for game metadata
- [Programmatic SEO Guide](https://seomatic.ai/blog/programmatic-seo-keyword-research)
- [Table Size Discussion](https://boardgamegeek.com/thread/1774835/table-size)

---

## Notes

- Serbia has almost no competition for board game table searches
- Geeknson (Poland/UK) has 5-6 month lead time and €1000+ shipping
- Your photos are proprietary data - this is your competitive moat
- Start with hero games, scale gradually
- Don't sacrifice quality for quantity - better 20 great pages than 100 thin ones
