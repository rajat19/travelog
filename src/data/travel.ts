export interface City {
    slug: string;
    name: string;
    country: string;
    countrySlug: string;
    coordinates: [number, number]; // [lat, lng]
    coverImage: string;
    description: string;
    visitDate: string;
    gallery: string[];
}

export interface Country {
    slug: string;
    name: string;
    code: string; // ISO 3166-1 alpha-2
    coordinates: [number, number]; // [lat, lng]
    coverImage: string;
    description: string;
    cities: City[];
}

export const countries: Country[] = [
    {
        slug: 'thailand',
        name: 'Thailand',
        code: 'TH',
        coordinates: [15.87, 100.9925],
        coverImage: '/images/thailand/cover.png',
        description:
            'The Land of Smiles — a tapestry of ancient temples, bustling night markets, tropical beaches, and warm-hearted people.',
        cities: [
            {
                slug: 'bangkok',
                name: 'Bangkok',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [13.7563, 100.5018],
                coverImage: '/images/thailand/bangkok/cover.png',
                description:
                    'A city of contrasts where gilded temples stand beside neon-lit skyscrapers, and street food rivals Michelin-starred dining.',
                visitDate: '2024-12',
                gallery: [
                    '/images/thailand/bangkok/wat-arun.png',
                    '/images/thailand/bangkok/street-food.png',
                    '/images/thailand/bangkok/grand-palace.png',
                ],
            },
            {
                slug: 'chiang-rai',
                name: 'Chiang Rai',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [19.9105, 99.8406],
                coverImage: '/images/thailand/chiang-rai/cover.png',
                description:
                    'A gateway to the Golden Triangle, home to the ethereal White Temple and lush mountain landscapes.',
                visitDate: '2024-12',
                gallery: [
                    '/images/thailand/chiang-rai/white-temple.png',
                    '/images/thailand/chiang-rai/blue-temple.png',
                    '/images/thailand/chiang-rai/mountain-view.png',
                ],
            },
        ],
    },
    {
        slug: 'vietnam',
        name: 'Vietnam',
        code: 'VN',
        coordinates: [14.0583, 108.2772],
        coverImage: '/images/vietnam/cover.png',
        description:
            'A land of staggering natural beauty and rich cultural heritage, where ancient traditions blend with modern energy.',
        cities: [
            {
                slug: 'da-nang',
                name: 'Da Nang',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [16.0471, 108.2068],
                coverImage: '/images/vietnam/da-nang/cover.png',
                description:
                    'A coastal city with pristine beaches, the iconic Dragon Bridge, and a gateway to the ancient town of Hoi An.',
                visitDate: '2024-11',
                gallery: [
                    '/images/vietnam/da-nang/dragon-bridge.png',
                    '/images/vietnam/da-nang/marble-mountains.png',
                    '/images/vietnam/da-nang/my-khe-beach.png',
                ],
            },
            {
                slug: 'ho-chi-minh',
                name: 'Ho Chi Minh City',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [10.8231, 106.6297],
                coverImage: '/images/vietnam/ho-chi-minh/cover.png',
                description:
                    'The bustling heart of southern Vietnam — a city of roaring motorbikes, French colonial architecture, and incredible phở.',
                visitDate: '2024-11',
                gallery: [
                    '/images/vietnam/ho-chi-minh/notre-dame.png',
                    '/images/vietnam/ho-chi-minh/ben-thanh.png',
                    '/images/vietnam/ho-chi-minh/street-scene.png',
                ],
            },
        ],
    },
    {
        slug: 'japan',
        name: 'Japan',
        code: 'JP',
        coordinates: [36.2048, 138.2529],
        coverImage: '/images/japan/cover.png',
        description:
            'Where ancient traditions and cutting-edge modernity coexist — from serene zen gardens to electric cityscapes.',
        cities: [
            {
                slug: 'tokyo',
                name: 'Tokyo',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [35.6762, 139.6503],
                coverImage: '/images/japan/tokyo/cover.png',
                description:
                    'The world\'s largest metropolitan area — a mesmerizing blend of ultra-modern technology and historic temples.',
                visitDate: '2025-03',
                gallery: [
                    '/images/japan/tokyo/shibuya.png',
                    '/images/japan/tokyo/senso-ji.png',
                    '/images/japan/tokyo/tokyo-tower.png',
                ],
            },
            {
                slug: 'osaka',
                name: 'Osaka',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [34.6937, 135.5023],
                coverImage: '/images/japan/osaka/cover.png',
                description:
                    'Japan\'s kitchen — a vibrant city famous for street food, Osaka Castle, and the electric nightlife of Dotonbori.',
                visitDate: '2025-03',
                gallery: [
                    '/images/japan/osaka/dotonbori.png',
                    '/images/japan/osaka/osaka-castle.png',
                    '/images/japan/osaka/street-food.png',
                ],
            },
            {
                slug: 'kyoto',
                name: 'Kyoto',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [35.0116, 135.7681],
                coverImage: '/images/japan/kyoto/cover.png',
                description:
                    'The cultural heart of Japan — a city of ten thousand temples, bamboo groves, and the art of the geisha.',
                visitDate: '2025-03',
                gallery: [
                    '/images/japan/kyoto/fushimi-inari.png',
                    '/images/japan/kyoto/bamboo-grove.png',
                    '/images/japan/kyoto/kinkaku-ji.png',
                ],
            },
        ],
    },
    {
        slug: 'usa',
        name: 'United States',
        code: 'US',
        coordinates: [37.0902, -95.7129],
        coverImage: '/images/usa/cover.png',
        description:
            'A vast land of diversity — from the tech hub of Austin to the glamour of Los Angeles, each city tells a different story.',
        cities: [
            {
                slug: 'austin',
                name: 'Austin',
                country: 'United States',
                countrySlug: 'usa',
                coordinates: [30.2672, -97.7431],
                coverImage: '/images/usa/austin/cover.png',
                description:
                    'The Live Music Capital of the World — a quirky, creative city with incredible food, live music, and tech culture.',
                visitDate: '2024-10',
                gallery: [
                    '/images/usa/austin/congress-bridge.png',
                    '/images/usa/austin/sixth-street.png',
                    '/images/usa/austin/barton-springs.png',
                ],
            },
            {
                slug: 'los-angeles',
                name: 'Los Angeles',
                country: 'United States',
                countrySlug: 'usa',
                coordinates: [34.0522, -118.2437],
                coverImage: '/images/usa/los-angeles/cover.png',
                description:
                    'The City of Angels — where Hollywood glamour meets stunning Pacific coastline and world-class cultural institutions.',
                visitDate: '2024-10',
                gallery: [
                    '/images/usa/los-angeles/hollywood-sign.png',
                    '/images/usa/los-angeles/santa-monica.png',
                    '/images/usa/los-angeles/griffith-observatory.png',
                ],
            },
        ],
    },
];

/** Get all cities across all countries */
export function getAllCities(): City[] {
    return countries.flatMap((country) => country.cities);
}

/** Find a country by slug */
export function getCountryBySlug(slug: string): Country | undefined {
    return countries.find((c) => c.slug === slug);
}

/** Find a city by country slug and city slug */
export function getCityBySlug(countrySlug: string, citySlug: string): City | undefined {
    const country = getCountryBySlug(countrySlug);
    return country?.cities.find((c) => c.slug === citySlug);
}

/** Get all country codes (for globe highlighting) */
export function getVisitedCountryCodes(): string[] {
    return countries.map((c) => c.code);
}

/** Travel stats */
export function getTravelStats() {
    const allCities = getAllCities();
    return {
        countries: countries.length,
        cities: allCities.length,
        photos: allCities.reduce((acc, city) => acc + city.gallery.length, 0),
    };
}
