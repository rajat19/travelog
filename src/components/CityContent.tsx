import { getCityContent } from '@/lib/content';

interface CityContentProps {
    countrySlug: string;
    citySlug: string;
}

export async function CityContent({ countrySlug, citySlug }: CityContentProps) {
    const content = await getCityContent(countrySlug, citySlug);

    if (!content) {
        return (
            <div className="py-8 text-center text-base-content/50">
                <p>Content coming soon...</p>
            </div>
        );
    }

    return <article className="mdx-content">{content.content}</article>;
}
