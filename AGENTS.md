# Repository Guidelines

## Project Structure & Module Organization
- Core application code lives in `src/` using Next.js App Router conventions.
- Routes and server actions are under `src/app/` (for example `src/app/[locale]/order/page.tsx` and `src/app/actions/`).
- Shared UI and logic are in `src/components/`, `src/lib/`, `src/hooks/`, and `src/i18n/`.
- Static assets (images, video, icons) are in `public/`.
- Database schema and seeds are in `prisma/` (`schema.prisma`, `seed-partner.ts`).
- Translation dictionaries are in `messages/en.json` and `messages/sr.json`.

## Build, Test, and Development Commands
- `npm run dev`: start local development server at `http://localhost:3000`.
- `npm run build`: create production build.
- `npm run start`: run the production build locally.
- `npm run lint`: run Biome checks (lint + formatting validation).
- `npm run format`: apply Biome formatting and import organization.

## Coding Style & Naming Conventions
- Language stack: TypeScript + React 19 + Next.js 16.
- Formatting is enforced by Biome (`biome.json`): 2-space indentation, space-based indents.
- Prefer named exports for shared modules in `src/lib` and `src/components`.
- Use `PascalCase` for React component files (`OrderForm.tsx`), `camelCase` for utilities (`partner-data.ts`), and route naming per Next.js (`page.tsx`, `layout.tsx`, `route.ts`).
- Keep locale-aware content synchronized across `messages/*.json` and localized route content.

## Testing Guidelines
- There is currently no committed test runner (no Jest/Vitest/Playwright config in this repo).
- Minimum validation before PR:
  1. `npm run lint`
  2. `npm run build`
  3. manual smoke-check of changed routes in `npm run dev`
- When adding tests, colocate as `*.test.ts(x)` near source files or in `__tests__/` for larger modules.

## Commit & Pull Request Guidelines
- Follow Conventional Commit style used in history: `feat: ...`, `fix: ...`, `refactor: ...`.
- Keep commit scopes focused; separate refactors from behavior changes.
- PRs should include:
  1. concise summary of user-visible and technical changes
  2. linked issue/task (if available)
  3. screenshots/video for UI updates (desktop + mobile)
  4. notes on config/env or Prisma schema changes

## Security & Configuration Tips
- Keep secrets only in `.env`; never commit credentials or API keys.
- Re-run `npm run build` after changing `next.config.ts`, middleware, auth, analytics, or Prisma schema.
