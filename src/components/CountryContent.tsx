import { getCountryContent } from '@/lib/content';

interface CountryContentProps {
    countrySlug: string;
}

export async function CountryContent({ countrySlug }: CountryContentProps) {
    const content = await getCountryContent(countrySlug);

    if (!content) {
        return null;
    }

    return <article className="mdx-content">{content.content}</article>;
}
