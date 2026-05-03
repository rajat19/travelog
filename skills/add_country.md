# Skill: Add a New Country to Travelog

## When to Use

Use this skill when the user asks to add a **new country** to the travel blog.
After completing this skill, you will typically also run the `add_city` skill
to add at least one city within the new country.

---

## Inputs Required

Ask the user for any of the following they haven't already provided:

| Field              | Required? | Example                                           |
| ------------------ | --------- | ------------------------------------------------- |
| Country name       | **Yes**   | "South Korea"                                     |
| ISO alpha-2 code   | **Yes**   | "KR" (look up if not provided)                    |
| Short description  | Optional  | (Generate a travel-editorial blurb if not given)   |
| Cities to add      | **Yes**   | At least one city is needed for a country to be meaningful |

You should **research and determine** the following yourself:

- **Coordinates** `[lat, lng]` — geographic center of the country
- **Slug** — lowercase, hyphenated (`south-korea`)
- **Cover image concept** — what the country cover photo should depict
- **Region, capital, best months, visa info** — for the country MDX frontmatter

---

## Step 1 — Determine Slug, Code, and Coordinates

### Slug Rules

- Lowercase, hyphenated: `"United States"` → `usa`, `"South Korea"` → `south-korea`
- Must be unique across all countries in `travel.ts`
- Must match the directory name: `src/content/countries/<country-slug>/`
- Keep slugs short and recognizable (prefer `usa` over `united-states`)

### ISO Code

- Use the **ISO 3166-1 alpha-2** code (2 uppercase letters)
- This is used by the globe visualization to highlight visited countries
- Examples: `US`, `JP`, `TH`, `VN`, `IN`, `SG`, `MY`, `ID`, `TW`, `KR`

### Coordinate Rules

- Use `[latitude, longitude]` format (decimal degrees)
- Use the **geographic center** of the country (not the capital city)
- These coordinates position the country label on the globe

---

## Step 2 — Generate Country Cover Image

Generate a cover image using the `generate_image` tool:

- **Prompt pattern**: `"A stunning, panoramic travel photograph showcasing the iconic landscape or skyline of [COUNTRY NAME]. Featuring [COUNTRY'S MOST RECOGNIZABLE LANDMARK OR SCENE]. Golden hour lighting, vibrant colors, professional travel photography, editorial quality, cinematic composition."`
- Save to: `public/images/<country-slug>/cover.jpg`

### Alternative: Use an Existing City Cover

For city-states (like Singapore) or when a specific city defines the country's identity, you can reuse the primary city's cover image as the country cover:

```ts
coverImage: '/images/singapore/singapore/cover.jpg',
```

### Image Path Rules

- Use `.jpg` for new images
- Path in `travel.ts` is relative to `public/`: `/images/<country-slug>/cover.jpg`
- **Do NOT** add basePath manually — `withBasePath()` handles this in components

---

## Step 3 — Add Country Data to `src/data/travel.ts`

Add a new `Country` object to the `countries` array. Follow this exact shape:

```ts
{
    slug: '<country-slug>',
    name: '<Country Display Name>',
    code: '<XX>',
    coordinates: [<lat>, <lng>],
    coverImage: '/images/<country-slug>/cover.jpg',
    description:
        '<One to two compelling sentences describing the country. Travel-editorial voice.>',
    cities: [
        // Cities will be added here (see add_city skill)
    ],
},
```

### Data Rules

- `name` is the **full display name** (e.g., `'United States'`, `'South Korea'`)
- `code` is the **ISO 3166-1 alpha-2** code in uppercase
- `description` should be 1–2 sentences, evocative and editorial
- `cities` array starts empty — cities are added via the `add_city` skill
- Place the new country object in a logical position in the array (alphabetically by region, or grouped with nearby countries)

---

## Step 4 — Create Country MDX Content

Create the directory and file:

```
src/content/countries/<country-slug>/index.mdx
src/content/countries/<country-slug>/cities/    (empty directory, cities go here)
```

### Required Frontmatter

```yaml
---
title: <Country Name>
description: <Same description as in travel.ts, or a slightly expanded version>
region: "<Geographic Region, e.g., Southeast Asia, East Asia, South Asia, Europe>"
capital: "<Capital City Name>"
bestMonths: "<Month range, e.g., November – February>"
visaInfo: "<Brief visa info for most nationalities>"
tripsCount: <number of trips>
totalDays: <total days spent>
rating: <4.0-5.0>
vibe: "<2-4 word overall country vibe>"
tags:
  - <tag-1>
  - <tag-2>
  - <tag-3>
  - <tag-4>
---
```

### Required Content Sections

Write rich, first-person travel narrative:

```mdx
## Why [Country Name]?

2–3 paragraphs explaining what makes this country special as a travel
destination. Personal, opinionated, vivid prose. Cover sensory details,
cultural highlights, and what kind of traveler it appeals to.

## The Rhythm

1–2 paragraphs about what day-to-day travel in this country feels like.
Regional differences, pace of life, how the culture manifests in everyday
experiences.

<Tip title="[Practical Tip Title]">
A broadly useful travel tip for navigating the country (apps, transit, cultural
norms, money, etc.).
</Tip>

<Tip title="[Another Practical Tip]">
Another useful tip — aim for 2 tips in a country page.
</Tip>

## What Surprised Me

1–2 paragraphs about unexpected discoveries — things that defied expectations
or stood out as uniquely memorable.

## Planning Notes

1–2 paragraphs with practical planning advice: best seasons, internal
transport, connectivity, how to structure an itinerary.

<Highlight title="[Country Name] Essentials">
- **Cultural Note 1**: Brief practical advice about local customs or etiquette.
- **Cultural Note 2**: Another important cultural or practical tip.
- **Useful Apps/Services**: Must-have apps or services for traveling in this country.
</Highlight>
```

### Content Guidelines

- Write in **first-person travel editorial** voice — warm, personal, informed
- Be **specific and opinionated** — avoid generic travel-guide language
- Include **local terms** where relevant (with context/translation)
- Each section should be 1–3 paragraphs (keep it scannable)
- Use the custom MDX components (`<Tip>`, `<Highlight>`) — these are pre-registered
- **Do NOT import** any React components in MDX
- Tags should be lowercase, hyphenated

---

## Step 5 — Handle Remote Images (If Applicable)

If you're using any remote image URLs (e.g., Wikimedia Commons) for the country
cover or city images:

1. Check `next.config.ts` → `images.remotePatterns`
2. If the hostname is not already listed, add it:

```ts
images: {
    unoptimized: true,
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
        },
        {
            protocol: 'https',
            hostname: '<new-hostname>',  // Add new remote host here
        },
    ],
},
```

> **Note**: `upload.wikimedia.org` is already allowlisted by default.

---

## Step 6 — Add Cities

After the country is set up, use the **`add_city` skill** to add at least one
city. A country with zero cities will render as an empty page with no city cards.

---

## Step 7 — Verify

After the country and at least one city are created:

1. **Run `npm run dev`** and check:
   - The country appears on the home page globe (polygon highlighted via ISO code)
   - The country card appears in the home page grid
   - The country page (`/country/<country-slug>/`) loads with:
     - Hero banner with cover image
     - CountryInfoBar with all frontmatter metadata
     - RatingBadge
     - Full MDX content with styled custom components
     - Sidebar navigation listing cities
     - City cards grid
   - No hydration errors in the browser console

2. **Run `npm run build`** to confirm static export succeeds (the country route must be generated by `generateStaticParams`)

---

## Checklist

- [ ] Country slug is unique and matches the content directory name
- [ ] ISO 3166-1 alpha-2 code is correct
- [ ] Country coordinates are the geographic center
- [ ] Cover image generated and saved to `public/images/<country-slug>/cover.jpg`
- [ ] Country object added to `countries` array in `src/data/travel.ts`
- [ ] Content directory created: `src/content/countries/<country-slug>/`
- [ ] Cities subdirectory created: `src/content/countries/<country-slug>/cities/`
- [ ] Country MDX file created: `src/content/countries/<country-slug>/index.mdx`
- [ ] Frontmatter includes all fields: title, description, region, capital, bestMonths, visaInfo, tripsCount, totalDays, rating, vibe, tags
- [ ] MDX content uses custom components: Tip, Highlight
- [ ] Content is rich, detailed, and written in first-person travel-editorial voice
- [ ] Remote image hostnames (if any) are added to `next.config.ts`
- [ ] At least one city added via the `add_city` skill
- [ ] `npm run dev` shows the country correctly
- [ ] `npm run build` completes without errors

---

## Complete File Tree After Adding a Country

```
src/
├── data/
│   └── travel.ts                          # ← Country + Cities added here
├── content/
│   └── countries/
│       └── <country-slug>/
│           ├── index.mdx                  # ← Country narrative
│           └── cities/
│               ├── <city-1-slug>.mdx      # ← City 1 narrative
│               └── <city-2-slug>.mdx      # ← City 2 narrative
public/
└── images/
    └── <country-slug>/
        ├── cover.jpg                      # ← Country cover image
        ├── <city-1-slug>/
        │   ├── cover.jpg                  # ← City 1 cover
        │   ├── <landmark-1>.jpg           # ← City 1 gallery
        │   └── <landmark-2>.jpg
        └── <city-2-slug>/
            ├── cover.jpg                  # ← City 2 cover
            ├── <landmark-1>.jpg           # ← City 2 gallery
            └── <landmark-2>.jpg
```
