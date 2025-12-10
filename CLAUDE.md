# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Arcadian is a landing page for a board game furniture company launching on Kickstarter. It's built with Next.js 16 and showcases premium gaming tables with a conversion-focused design.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run Biome linter (biome check)
npm run format   # Auto-format with Biome (biome format --write)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2
- **Styling**: Tailwind CSS 4 (via @tailwindcss/postcss)
- **Linting/Formatting**: Biome 2.2
- **TypeScript**: Strict mode enabled

## Architecture

### File Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/app/globals.css` - Tailwind imports and custom theme (uses `@theme inline` for CSS variables)
- `public/` - Static assets including photos and logos

### Styling Conventions
- Custom color tokens defined in `globals.css`: `--color-paper`, `--color-ink`, `--color-accent`, `--color-oak`, etc.
- Four font families via next/font: serif (Cormorant Garamond), sans (Manrope), mono (Space Mono), brush (Caveat)
- Font CSS variables: `--font-serif`, `--font-sans`, `--font-mono`, `--font-brush`
- Uses Tailwind's theme colors: `bg-paper`, `text-ink`, `text-accent`, `text-oak`, etc.

### Path Aliases
- `@/*` maps to `./src/*`

### Images
- Uses Next.js Image component
- Remote images allowed from `images.unsplash.com`
- Local images in `/public/photos/`

### Biome Configuration
- 2-space indentation
- Organizes imports automatically
- Next.js and React recommended rules enabled
- `noUnknownAtRules` disabled (for Tailwind CSS @rules)
- `noSvgWithoutTitle` disabled for decorative SVGs