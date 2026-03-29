import 'server-only';

import { cache } from 'react';
import fs from 'node:fs/promises';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export interface TravelContentFrontmatter {
    title?: string;
    description?: string;
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
