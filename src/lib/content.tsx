import 'server-only';

import { cache } from 'react';
import fs from 'node:fs/promises';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import {
    Tip,
    Itinerary,
    FoodGuide,
    GettingThere,
    Accommodation,
    Budget,
    Highlight,
} from '@/components/mdx';

/** Custom components available inside MDX files */
const mdxComponents = {
    Tip,
    Itinerary,
    FoodGuide,
    GettingThere,
    Accommodation,
    Budget,
    Highlight,
};

export interface TravelContentFrontmatter {
    title?: string;
    description?: string;

    // ── Trip metadata (scalar values for page layout) ──
    idealDuration?: string;
    lastVisited?: string;
    bestTimeToVisit?: string;
    weather?: string;
    language?: string;
    currency?: string;
    timezone?: string;

    // ── Personal rating ──
    rating?: number;
    vibe?: string;

    // ── Budget (scalar summary for info bar) ──
    budgetLevel?: 'budget-friendly' | 'moderate' | 'splurge';
    dailyBudget?: string;

    // ── Tags ──
    tags?: string[];

    // ── Country-specific ──
    region?: string;
    capital?: string;
    bestMonths?: string;
    visaInfo?: string;
    tripsCount?: number;
    totalDays?: number;
}

interface TravelContentResult {
    content: React.ReactNode;
    frontmatter: TravelContentFrontmatter;
}

const contentRoot = path.join(process.cwd(), 'src', 'content', 'countries');

async function loadMdxFile(filePath: string): Promise<TravelContentResult | null> {
    try {
        const source = await fs.readFile(filePath, 'utf8');
        const { content, frontmatter } = await compileMDX<TravelContentFrontmatter>({
            source,
            components: mdxComponents,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                },
            },
        });

        return { content, frontmatter };
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }

        throw error;
    }
}

export const getCountryContent = cache(async (countrySlug: string) => {
    return loadMdxFile(path.join(contentRoot, countrySlug, 'index.mdx'));
});

export const getCityContent = cache(async (countrySlug: string, citySlug: string) => {
    return loadMdxFile(path.join(contentRoot, countrySlug, 'cities', `${citySlug}.mdx`));
});
