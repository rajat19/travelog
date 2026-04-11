# AGENTS.md — Guidelines for AI Coding Assistants

> This file describes the architecture, conventions, and workflows of the
> **Travelog** repository so that AI assistants (Claude, Copilot, Gemini, etc.)
> can contribute changes accurately and consistently.

---

## 1. Project Overview

Travelog is a **personal travel blog** built as a statically-exported Next.js
site and deployed to **GitHub Pages**. The site features:

- An interactive **3D globe** (react-globe.gl) on the homepage with markers for
  every visited city
- Per-**country** pages listing cities
- Per-**city** pages with MDX narrative content and photo galleries
- A custom **"Golden Hour"** color theme (light/dark) powered by DaisyUI v5
- Fuzzy **search** across all destinations (fuse.js)
- **Framer Motion** page transitions and micro-animations

---

## 2. Tech Stack

| Layer          | Technology                                         |
| -------------- | -------------------------------------------------- |
| Framework      | **Next.js 16** (App Router, `output: 'export'`)    |
| Language       | **TypeScript** (strict)                             |
| Styling        | **Tailwind CSS v4** + **DaisyUI v5**                |
| Content        | **MDX** via `next-mdx-remote/rsc` (server-side)    |
| Globe          | `react-globe.gl` (dynamic import, client-only)     |
| Animations     | `framer-motion`                                    |
| Search         | `fuse.js`                                          |
| Icons          | `lucide-react`                                     |
| Fonts          | Google Fonts — **Inter** (body), **Playfair Display** (headings) |
| Deployment     | GitHub Actions → GitHub Pages (static `out/` dir)  |

---

## 3. Directory Structure

```
travelog/
├── .github/workflows/deploy.yml   # CI: build → deploy to GitHub Pages
├── public/
│   ├── images/                    # Static images: /images/<country>/<city>/
│   └── ne_110m_admin_0_countries.geojson  # Globe country polygons
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout (fonts, ThemeProvider, Header/Footer)
│   │   ├── page.tsx               # Home page (Hero, Globe, Stats, Cards)
│   │   ├── globals.css            # Tailwind imports, DaisyUI themes, MDX prose styles
│   │   ├── country/[slug]/page.tsx
│   │   └── city/[country]/[slug]/page.tsx
│   ├── components/                # React components (see §4)
│   ├── content/                   # Travel narrative content
│   │   └── countries/
│   │       └── <country-slug>/
│   │           ├── index.mdx              # Country-level intro
│   │           └── cities/<city-slug>.mdx  # Per-city narrative
│   ├── data/
│   │   └── travel.ts              # Master data: countries[], cities[], helpers
│   └── lib/
│       ├── assets.ts              # withBasePath() for GitHub Pages prefix
│       └── content.tsx            # MDX loading via next-mdx-remote/rsc
├── mdx-components.tsx             # Required MDX component overrides (Next.js)
├── next.config.ts                 # Static export, MDX, basePath config
├── tsconfig.json
├── .prettierrc
└── eslint.config.mjs
```

---

## 4. Key Components

| Component            | Type           | Purpose                                           |
| -------------------- | -------------- | ------------------------------------------------- |
| `ThemeProvider`       | Client         | React context for light/dark theme; persists to localStorage |
| `ThemeToggle`         | Client         | Sun/Moon toggle button; uses `mounted` guard to avoid hydration mismatch |
| `Header`             | Client         | Sticky nav with mobile hamburger, search toggle, theme toggle |
| `Footer`             | Server(ish)    | Static footer content                             |
| `GlobeVisualization` | Client         | 3D globe with country polygons + city markers; dynamic import for SSR safety |
| `HeroSection`        | Client         | Animated hero with travel taglines                |
| `TravelStats`        | Client         | Animated counters (countries, cities, photos)     |
| `CountryCard`        | Client         | Card with cover image + description for country grid |
| `CityCard`           | Client         | Card with cover image + description for city grid |
| `CityContent`        | **Server**     | Async component that loads + renders city MDX      |
| `CountryContent`     | **Server**     | Async component that loads + renders country MDX   |
| `PhotoGrid`          | Client         | Masonry-style gallery with lightbox                |
| `SearchBar`          | Client         | Fuse.js fuzzy search across all cities             |
| `BrandMark`          | Server         | SVG logo / branding element                        |

### Hydration Safety

Client components that depend on browser state (theme, window size) **must**
use a `mounted` state guard:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <PlaceholderSkeleton />;
```

This prevents the server-rendered HTML from differing from the first client
render (Next.js hydration mismatch errors). `ThemeToggle` is the canonical
example.

---

## 5. Content Architecture

### 5.1 Master Data — `src/data/travel.ts`

This is the **single source of truth** for all country/city metadata:

```ts
export interface Country {
  slug: string;          // URL segment, e.g. "thailand"
  name: string;          // Display name
  code: string;          // ISO 3166-1 alpha-2 (used by globe)
  coordinates: [number, number]; // [lat, lng]
  coverImage: string;    // Path or URL to cover image
  description: string;   // Short blurb
  cities: City[];
}

export interface City {
  slug: string;          // URL segment, e.g. "bangkok"
  name: string;
  country: string;       // Display name of parent country
  countrySlug: string;   // Must match parent country.slug
  coordinates: [number, number];
  coverImage: string;
  description: string;
  visitDate: string;     // "YYYY-MM" format
  gallery: string[];     // Array of image paths/URLs
}
```

Helper functions are also exported: `getAllCities()`, `getCountryBySlug()`,
`getCityBySlug()`, `getVisitedCountryCodes()`, `getTravelStats()`.

### 5.2 MDX Content — `src/content/countries/`

Narrative travel writing lives in `.mdx` files:

```
src/content/countries/
├── thailand/
│   ├── index.mdx                  # Country overview
│   └── cities/
│       ├── bangkok.mdx
│       ├── chiang-rai.mdx
│       ├── chiang-mai.mdx
│       ├── phuket.mdx
│       └── pattaya.mdx
├── vietnam/
│   ├── index.mdx
│   └── cities/
│       ├── da-nang.mdx
│       └── ho-chi-minh.mdx
└── ...
```

**Each MDX file** uses an enriched set of YAML frontmatter for the `TripInfoBar` and `RatingBadge` UI components:

```mdx
---
title: Bangkok
description: A city of contrasts where gilded temples stand beside neon-lit skyscrapers.
idealDuration: "3-5 days"
lastVisited: "February 2025"
rating: 4.8
vibe: "Chaotic & Electric"
budgetLevel: "budget-friendly"
tags:
  - temples
  - street-food
---

## The City of Angels

Bangkok, or Krung Thep Maha Nakhon, ...

<Tip title="Transit Secret">
Use the BTS Skytrain instead of taxis!
</Tip>
```

MDX is loaded at build time via `next-mdx-remote/rsc` (in `src/lib/content.tsx`),
**not** via `@next/mdx` page routes. The compile pipeline uses:

1. `remark-gfm` (tables, strikethrough, etc.)
2. `rehype-slug` (heading IDs)
3. `rehype-autolink-headings` (clickable heading anchors)

**Custom MDX Components** are injected so they can be securely used directly inside Markdown:
- `<Tip title="...">`
- `<Highlight title="...">`
- `<Itinerary>`
- `<FoodGuide>`
- `<GettingThere>`
- `<Accommodation title="...">`
- `<Budget>`

MDX content is rendered inside the `.mdx-content` CSS class, which provides
typography styling (see `globals.css`).

### 5.3 Images

Images can be:

1. **Local** — placed in `public/images/<country>/<city>/` and referenced as
   `/images/thailand/bangkok/cover.png`
2. **Remote** — full URLs (e.g. Wikimedia Commons). Remote hosts must be
   allowlisted in `next.config.ts` → `images.remotePatterns`.

All image paths in code must go through `withBasePath()` (from `src/lib/assets.ts`)
to prepend the GitHub Pages base path at build time.

---

## 6. How to Add a New Country / City

### Step 1 — Data entry in `src/data/travel.ts`

Add a new `Country` object (or a new `City` inside an existing country) to the
`countries` array. Follow the existing shape exactly. The `slug` values become
URL segments and must match the content directory names.

### Step 2 — MDX content

Create the corresponding files:

```
src/content/countries/<country-slug>/index.mdx
src/content/countries/<country-slug>/cities/<city-slug>.mdx
```

Include the full travelog frontmatter (e.g., `title`, `description`, `lastVisited`, `idealDuration`, `rating`, `vibe`, `budgetLevel`, `tags`) and utilize the custom MDX components (like `<Tip>` or `<FoodGuide>`) to structure the content.

### Step 3 — Images

Add images under `public/images/<country-slug>/<city-slug>/`. At minimum, each
city needs a `cover.{jpg,png}` and 2–3 gallery images. Update the `coverImage`
and `gallery` arrays in `travel.ts` to point to the correct paths.

### Step 4 — Verify

- Run `npm run dev` and check the new pages.
- Run `npm run build` to confirm static export succeeds (all dynamic routes
  must be generated by `generateStaticParams`).

---

## 7. Theming

### DaisyUI v5 Themes (Tailwind v4 Plugin Syntax)

Two custom themes are defined in `globals.css` using the `@plugin "daisyui/theme"` directive:

- **`golden-hour-light`** — warm cream/amber palette (default)
- **`golden-hour-dark`** — rich charcoal with amber accents

The active theme is stored in `localStorage` as `travelog-theme` and applied
via `data-theme` attribute on `<html>`.

### Adding a New Theme

1. Add a new `@plugin "daisyui/theme" { name: "my-new-theme"; ... }` block in
   `globals.css`, following the existing pattern.
2. Update the `Theme` type union in `ThemeProvider.tsx`.
3. Update `ThemeToggle.tsx` if switching logic needs to cycle through more than
   two themes.

### Styling Conventions

- Use **DaisyUI semantic classes** (`btn`, `card`, `badge`, etc.) for UI
  components.
- Use DaisyUI **color tokens** (`text-base-content`, `bg-base-200`,
  `text-primary`, etc.) — never hardcode hex colors in component markup.
- Use Tailwind utilities for spacing, layout, and responsive breakpoints.
- The `font-heading` and `font-body` CSS custom properties map to Playfair
  Display and Inter respectively.

---

## 8. Static Export & GitHub Pages

The site is configured for **fully static output**:

```ts
// next.config.ts
output: 'export',
trailingSlash: true,
basePath: isGitHubPages ? '/travelog' : '',
```

### Critical Rules

1. **No server-side features**: No API routes, no `getServerSideProps`, no
   middleware, no ISR. Everything must resolve at build time.
2. **`generateStaticParams`** is **required** on every dynamic route
   (`[slug]`, `[country]/[slug]`). If you add a new dynamic segment, you must
   export this function.
3. **Images must be `unoptimized: true`** — Next.js image optimization
   requires a running server, which GitHub Pages doesn't provide.
4. **`withBasePath()`** — All asset URLs (images, GeoJSON, icons) must use
   this helper so they resolve correctly under the `/travelog/` prefix on
   GitHub Pages.
5. **Build output** goes to `out/` — this is what the deploy workflow uploads.

### Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`:
`checkout → npm ci → npm run build → upload out/ → deploy to Pages`.

---

## 9. Code Style & Formatting

| Rule              | Setting                      |
| ----------------- | ---------------------------- |
| Semicolons        | Yes                          |
| Quotes            | Single                       |
| Trailing commas   | ES5                          |
| Print width       | 100                          |
| Tab width         | 2 (but existing code uses 4 in some files — match surrounding code) |
| Arrow parens      | Always                       |
| Line endings      | LF                           |

Run `npx prettier --write .` to format. ESLint is configured with
`eslint-config-next` (core-web-vitals + TypeScript).

---

## 10. Common Pitfalls & Known Issues

### Hydration Mismatches

Client components that read `localStorage`, `window`, or render different
content on server vs. client **will** cause React hydration errors. Always use
the `mounted` guard pattern (see §4). The `ThemeToggle` component is the main
example.

### Globe SSR

`react-globe.gl` depends on `three.js` and WebGL, which don't exist on the
server. The Globe component uses a dynamic import inside `useEffect`:

```tsx
useEffect(() => {
  import('react-globe.gl').then((mod) => setGlobeComponent(() => mod.default));
}, []);
```

Never try to import `react-globe.gl` at the top level of a module.

### MDX Loading

MDX is loaded via `next-mdx-remote/rsc` (`src/lib/content.tsx`), **not** via
`@next/mdx` page-based routing. The `@next/mdx` package is still in
`package.json` and `next.config.ts` for potential future use, but actual content
compilation flows through `compileMDX()` from `next-mdx-remote`.

If you encounter Turbopack serialization errors with `@next/mdx`, they are
related to the remark/rehype plugin options not being serializable. The
`next-mdx-remote/rsc` path avoids this issue entirely.

### Image Paths

- Local images in `public/` are `.png` (Thailand, Vietnam, Japan, USA original
  cities) or `.jpg` (newer countries like Singapore, Malaysia, Indonesia).
- Always check the actual file extension in `public/images/` — mismatches cause
  404s.
- Remote images (Wikimedia URLs) must have their hostname in
  `next.config.ts` → `images.remotePatterns`.

### Date Formatting

City `visitDate` is stored as `"YYYY-MM"`. When displaying, append `-01` to
create a valid date: `new Date(city.visitDate + '-01')`. This avoids timezone
ambiguity.

---

## 11. Quick Reference Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Static export to out/
npm run start        # Serve built output locally
npm run lint         # ESLint check
npx prettier --write . # Format all files
```

---

## 12. Contributing Checklist

When making changes, verify:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes (static export, all routes generated)
- [ ] No hydration warnings in browser console
- [ ] Theme toggle works in both light and dark modes
- [ ] New routes have `generateStaticParams` if they use dynamic segments
- [ ] Image paths exist and use correct extensions
- [ ] `withBasePath()` is used for all asset references
- [ ] MDX files include extended frontmatter (`title`, `description`, `lastVisited`, `idealDuration`, etc.)
- [ ] Code follows existing patterns (component naming, file structure)
