# Growth Rocket AI — Landing Page

A pixel-perfect, type-safe Next.js 14 (App Router) + Tailwind + Framer Motion landing page.

## Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS (custom design tokens)
- Framer Motion
- lucide-react icons
- clsx + tailwind-merge

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy
Push to a Git provider and import the repo in Vercel — zero config required.

## Structure
- `app/` — App Router entry (layout, page, globals)
- `components/sections/` — One file per landing section
- `components/ui/` — Reusable primitives (Button, Badge, Marquee, Accordion)
- `lib/utils.ts` — `cn` helper

## Design Tokens
Defined in `tailwind.config.ts` under `theme.extend.colors`. Map directly to the
brand palette: `bg-dark-core`, `brand-orange`, `text-light-muted`, etc.
