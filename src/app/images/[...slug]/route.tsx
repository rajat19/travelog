import { ImageResponse } from 'next/og';
import { countries } from '@/data/travel';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const dynamic = 'force-static';

type Palette = {
    background: string;
    accent: string;
    text: string;
    glow: string;
};

const paletteByCountry: Record<string, Palette> = {
    thailand: {
        background: 'linear-gradient(135deg, #2b1807 0%, #7c3f00 45%, #f59e0b 100%)',
        accent: '#fde68a',
        text: '#fff7ed',
        glow: 'rgba(251, 191, 36, 0.45)',
    },
    vietnam: {
        background: 'linear-gradient(135deg, #042f2e 0%, #0f766e 45%, #5eead4 100%)',
        accent: '#99f6e4',
        text: '#ecfeff',
        glow: 'rgba(45, 212, 191, 0.4)',
    },
    japan: {
        background: 'linear-gradient(135deg, #2b1220 0%, #9f1239 45%, #fb7185 100%)',
        accent: '#fecdd3',
        text: '#fff1f2',
        glow: 'rgba(244, 63, 94, 0.38)',
    },
    usa: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #93c5fd 100%)',
        accent: '#dbeafe',
        text: '#eff6ff',
        glow: 'rgba(96, 165, 250, 0.35)',
    },
};

function toTitleCase(value: string) {
    return value
        .replace(/\.[a-z0-9]+$/i, '')
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function buildImageDescriptor(slugParts: string[]) {
    const [countrySlug, citySlug, imageSlug] = slugParts;
    const country = countries.find((entry) => entry.slug === countrySlug);
    const palette = paletteByCountry[countrySlug] ?? {
        background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 45%, #d1d5db 100%)',
        accent: '#f9fafb',
        text: '#ffffff',
        glow: 'rgba(255, 255, 255, 0.2)',
    };

    if (!country) {
        return {
            palette,
            eyebrow: 'Travelog Sample',
            title: toTitleCase(slugParts.at(-1) ?? 'Image'),
            subtitle: 'Generated placeholder image',
        };
    }

    if (!citySlug) {
        return {
            palette,
            eyebrow: country.code,
            title: country.name,
            subtitle: 'Country cover',
        };
    }

    const city = country.cities.find((entry) => entry.slug === citySlug);

    if (!city) {
        return {
            palette,
            eyebrow: country.name,
            title: toTitleCase(citySlug),
            subtitle: 'Regional sample image',
        };
    }

    if (!imageSlug || imageSlug.startsWith('cover.')) {
        return {
            palette,
            eyebrow: city.country,
            title: city.name,
            subtitle: 'City cover',
        };
    }

    return {
        palette,
        eyebrow: city.name,
        title: toTitleCase(imageSlug),
        subtitle: `${city.name}, ${city.country}`,
    };
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const { palette, eyebrow, title, subtitle } = buildImageDescriptor(slug);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'relative',
                    overflow: 'hidden',
                    background: palette.background,
                    color: palette.text,
                    fontFamily:
                        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: '-10% auto auto -5%',
                        width: 580,
                        height: 580,
                        borderRadius: '9999px',
                        background: palette.glow,
                        filter: 'blur(12px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        right: -80,
                        bottom: -120,
                        width: 520,
                        height: 520,
                        borderRadius: '9999px',
                        border: `2px solid ${palette.accent}55`,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 32,
                        display: 'flex',
                        border: `1px solid ${palette.accent}33`,
                        borderRadius: 28,
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '72px 76px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            fontSize: 28,
                            letterSpacing: 5,
                            textTransform: 'uppercase',
                            color: palette.accent,
                        }}
                    >
                        <div
                            style={{
                                width: 68,
                                height: 2,
                                background: palette.accent,
                            }}
                        />
                        <span>{eyebrow}</span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 18,
                            maxWidth: '72%',
                        }}
                    >
                        <div
                            style={{
                                fontSize: title.length > 18 ? 72 : 88,
                                lineHeight: 1,
                                fontWeight: 800,
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                fontSize: 34,
                                lineHeight: 1.25,
                                color: `${palette.text}cc`,
                            }}
                        >
                            {subtitle}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: 28,
                            color: `${palette.text}b3`,
                        }}
                    >
                        <span>Travelog Gallery Sample</span>
                        <span style={{ color: palette.accent }}>Journey Around the World</span>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1600,
            height: 1000,
        }
    );
}

export function generateStaticParams() {
    const params: { slug: string[] }[] = [];

    // Add a default sample image slug
    params.push({ slug: ['sample.png'] });

    for (const country of countries) {
        if (country.coverImage.startsWith('/images/')) {
            params.push({ slug: country.coverImage.replace(/^\/images\//, '').split('/') });
        }

        for (const city of country.cities) {
            if (city.coverImage.startsWith('/images/')) {
                params.push({ slug: city.coverImage.replace(/^\/images\//, '').split('/') });
            }

            for (const image of city.gallery) {
                if (image.startsWith('/images/')) {
                    params.push({ slug: image.replace(/^\/images\//, '').split('/') });
                }
            }
        }
    }

    return params;
}
