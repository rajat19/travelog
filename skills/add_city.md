# Skill: Add a New City to Travelog

## When to Use

Use this skill when the user asks to add a new **city** to the travel blog.
The city may belong to an existing country or to a brand-new country. If the
country does not yet exist, **run the `add_country` skill first** before
proceeding here.

---

## Inputs Required

Ask the user for any of the following they haven't already provided:

| Field               | Required? | Example                      |
| ------------------- | --------- | ---------------------------- |
| City name           | **Yes**   | "Chiang Mai"                 |
| Parent country name | **Yes**   | "Thailand"                   |
| Visit date          | **Yes**   | "2025-01" (YYYY-MM format)   |
| Short description   | Optional  | (Generate if not provided)   |

You should **research and determine** the following yourself:

- **Coordinates** `[lat, lng]` — accurate GPS coordinates for the city center
- **Slug** — lowercase, hyphenated (`chiang-mai`)
- **ISO country code** — for cross-referencing with parent country
- **Cover image description** — what a representative cover photo should depict
- **Gallery image descriptions** — 3 iconic landmarks/scenes for gallery photos

---

## Step 1 — Determine Slugs and Coordinates

### Slug Rules

- Lowercase, hyphenated: `"Ho Chi Minh City"` → `ho-chi-minh`
- Must be unique within the parent country's `cities` array
- Must match the MDX filename: `src/content/countries/<country-slug>/cities/<city-slug>.mdx`

### Coordinate Rules

- Use `[latitude, longitude]` format (decimal degrees)
- Use actual city center coordinates from a reliable source
- **Critical**: The project uses a low-resolution GeoJSON map (`ne_110m_admin_0_countries.geojson`). If the city is on a coastline or at a country's edge, the marker may render outside the country polygon. In that case, **nudge the coordinates slightly inward** (toward the country interior) and leave a comment explaining the adjustment:
  ```ts
  coordinates: [19.076, 73.8777], // Nudged east for the low-res GeoJSON map
  ```

---

## Step 2 — Generate Images

Generate the following images using the `generate_image` tool:

### Cover Image (Required)

- **Prompt pattern**: `"A stunning, high-quality travel photograph of [LANDMARK OR ICONIC SCENE] in [CITY NAME], [COUNTRY NAME]. Golden hour lighting, vibrant colors, professional travel photography style, wide angle, editorial quality."`
- **Dimensions**: Landscape orientation (the site uses `object-cover` for display)
- Save to: `public/images/<country-slug>/<city-slug>/cover.jpg`

### Gallery Images (Minimum 2, ideally 3)

Generate 2–3 images depicting the city's most iconic landmarks or scenes.

- **Prompt pattern**: `"A beautiful travel photograph of [SPECIFIC LANDMARK/SCENE] in [CITY NAME], [COUNTRY NAME]. Vivid colors, natural lighting, professional travel photography, editorial quality."`
- **Naming**: Use descriptive, hyphenated filenames:
  - `public/images/<country-slug>/<city-slug>/temple-of-dawn.jpg`
  - `public/images/<country-slug>/<city-slug>/night-market.jpg`
  - `public/images/<country-slug>/<city-slug>/river-view.jpg`

### Image Path Rules

- Local images go in `public/images/<country-slug>/<city-slug>/`
- Use `.jpg` extension for new images (existing older cities may use `.png`)
- Paths in `travel.ts` are relative to `public/`: `/images/thailand/bangkok/cover.jpg`
- The `withBasePath()` helper in components handles GitHub Pages prefix automatically — **do NOT add basePath manually** to paths in `travel.ts`

---

## Step 3 — Add City Data to `src/data/travel.ts`

Add a new `City` object inside the parent country's `cities` array. Follow this exact shape:

```ts
{
    slug: '<city-slug>',
    name: '<City Display Name>',
    country: '<Country Display Name>',
    countrySlug: '<country-slug>',
    coordinates: [<lat>, <lng>],
    coverImage: '/images/<country-slug>/<city-slug>/cover.jpg',
    description:
        '<One to two compelling sentences describing the city. Write in a travel-editorial voice.>',
    visitDate: '<YYYY-MM>',
    gallery: [
        '/images/<country-slug>/<city-slug>/<landmark-1>.jpg',
        '/images/<country-slug>/<city-slug>/<landmark-2>.jpg',
        '/images/<country-slug>/<city-slug>/<landmark-3>.jpg',
    ],
},
```

### Data Rules

- `country` is the **display name** (e.g., `'United States'`), not the slug
- `countrySlug` must **exactly match** the parent `Country.slug`
- `visitDate` uses `"YYYY-MM"` format (no day)
- `description` should be 1–2 sentences, evocative and travel-editorial in tone
- `gallery` should list 2–3 image paths (local or remote Wikimedia URLs)
- If using remote Wikimedia URLs, ensure `upload.wikimedia.org` is already in `next.config.ts` → `images.remotePatterns` (it is by default)

---

## Step 4 — Create City MDX Content

Create the file: `src/content/countries/<country-slug>/cities/<city-slug>.mdx`

### Required Frontmatter

```yaml
---
title: <City Name>
description: <Same description as in travel.ts, or a slightly expanded version>
idealDuration: "<N days>"
lastVisited: "<Month YYYY>"
bestTimeToVisit: "<Month range>"
weather: "<Brief weather description, e.g., Hot & humid, 30°C>"
language: "<Primary language(s)>"
currency: "<Currency Name (CODE)>"
timezone: "<UTC offset>"
rating: <4.0-5.0>
vibe: "<2-4 word vibe description>"
budgetLevel: "<budget-friendly | moderate | splurge>"
dailyBudget: "$<low>–<high>"
tags:
  - <tag-1>
  - <tag-2>
  - <tag-3>
---
```

### Required Content Sections

Write rich, first-person travel narrative using these sections and custom MDX components:

```mdx
## First Impressions

> A memorable opening quote about arriving in the city.

A 2–3 paragraph narrative about the city's character and what makes it special.

<Highlight>
- **Experience 1**: Brief description
- **Experience 2**: Brief description
- **Experience 3**: Brief description
</Highlight>

<Tip title="Getting Around">
Practical transit advice for the city.
</Tip>

## [Thematic Section — e.g., "Temples & History", "The Old Quarter", etc.]

2–3 paragraphs about a major aspect of the city.

<Tip title="[Relevant Tip]">
A helpful insider tip.
</Tip>

## The Food Scene

A paragraph about the city's food culture.

<FoodGuide>
| Dish | Where to Try | Price |
|------|--------------|-------|
| **Dish 1** | Venue (Area) | ~$X |
| **Dish 2** | Venue (Area) | ~$X |
| **Dish 3** | Venue (Area) | ~$X |
| **Dish 4** | Venue (Area) | ~$X |
</FoodGuide>

## Day-by-Day

<Itinerary>
- **Day 1: [Theme]** — Attraction → Attraction → Attraction → evening activity.
- **Day 2: [Theme]** — Attraction → Attraction → Attraction.
- **Day 3: [Theme]** — Attraction → Attraction → evening activity.
</Itinerary>

## Logistics

<GettingThere>
How to arrive: airport name (IATA code), best transit from the airport to the city center, cost estimate.
</GettingThere>

<Accommodation title="Where I Stayed">
Neighborhood recommendations with brief explanations of why each is good.
</Accommodation>

<Budget>
| Category | Est. Daily Spend |
|----------|-----------------|
| **Accommodation** (type) | $X–Y |
| **Food** (type) | $X–Y |
| **Transport** (type) | $X–Y |
| **Attractions** | $X–Y |
</Budget>
```

### Content Guidelines

- Write in **first-person travel editorial** voice — personal, vivid, opinionated
- Use **specific place names** and practical details (prices, transit lines, neighborhoods)
- Include **local language terms** where relevant (with translations)
- Keep paragraphs to 2–4 sentences for readability
- Use the custom MDX components (`<Tip>`, `<Highlight>`, `<FoodGuide>`, `<Itinerary>`, `<GettingThere>`, `<Accommodation>`, `<Budget>`) — these are pre-registered and rendered with styled UI
- **Do NOT import or use** any React components directly in MDX — only the pre-registered custom components above
- Tags should be lowercase, hyphenated: `street-food`, `beach-town`, `nightlife`

---

## Step 5 — Verify

After all files are created:

1. **Run `npm run dev`** and check:
   - The city appears on the home page globe as a marker at the correct coordinates
   - The country page (`/country/<country-slug>/`) lists the new city card
   - The city page (`/city/<country-slug>/<city-slug>/`) loads with:
     - Hero image
     - TripInfoBar with all frontmatter metadata
     - RatingBadge with rating, vibe, budget level
     - Full MDX content with styled custom components
     - Photo gallery
   - No hydration errors in the browser console

2. **Run `npm run build`** to confirm static export succeeds (the city route must be generated by `generateStaticParams`)

---

## Checklist

- [ ] City coordinates are accurate (nudged if coastal/edge)
- [ ] Cover image generated and saved to `public/images/<country-slug>/<city-slug>/cover.jpg`
- [ ] 2–3 gallery images generated and saved with descriptive filenames
- [ ] City object added to parent country's `cities` array in `src/data/travel.ts`
- [ ] `countrySlug` matches parent `Country.slug` exactly
- [ ] `visitDate` is in `YYYY-MM` format
- [ ] MDX file created at `src/content/countries/<country-slug>/cities/<city-slug>.mdx`
- [ ] Frontmatter includes all fields: title, description, idealDuration, lastVisited, bestTimeToVisit, weather, language, currency, timezone, rating, vibe, budgetLevel, dailyBudget, tags
- [ ] MDX content uses custom components: Highlight, Tip, FoodGuide, Itinerary, GettingThere, Accommodation, Budget
- [ ] Content is rich, detailed, and written in first-person travel-editorial voice
- [ ] `npm run dev` shows the city correctly
- [ ] `npm run build` completes without errors
