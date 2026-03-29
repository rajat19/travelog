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
            {
                slug: 'chiang-mai',
                name: 'Chiang Mai',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [18.7883, 98.9853],
                coverImage: '/images/thailand/chiang-mai/cover.jpg',
                description:
                    'Northern Thailand’s cultural capital, where mountain temples, old city lanes, and café-filled neighborhoods create a slower rhythm.',
                visitDate: '2025-01',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/e/e2/%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/6/68/Chiang_Mai_-_East_gate_of_the_city_wall_-_0001.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/d8/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%81%E0%B8%A7%E0%B8%8A%E0%B8%B4%E0%B8%A3%E0%B8%98%E0%B8%B2%E0%B8%A3_%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%A5%E0%B8%B3%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%8844_%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%99%E0%B8%99%E0%B8%97%E0%B9%8C.jpg',
                ],
            },
            {
                slug: 'phuket',
                name: 'Phuket',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [7.8804, 98.3923],
                coverImage:
                    'https://upload.wikimedia.org/wikipedia/commons/5/56/The_Big_Buddha%2C_Phuket.jpg',
                description:
                    'Thailand’s best-known island escape, mixing dramatic bays, buzzing beach towns, colorful old shophouses, and sea-view temples.',
                visitDate: '2025-01',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/88/Patong_Beach.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/87/Soi_Rommanee%2C_Phuket_Town.jpg',
                ],
            },
            {
                slug: 'pattaya',
                name: 'Pattaya',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [12.9236, 100.8825],
                coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Santuaryoftruth2.jpg',
                description:
                    'A high-energy seaside city where beach sunsets, neon nightlife, and offbeat attractions make for an easy weekend break from Bangkok.',
                visitDate: '2025-01',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Pattaya%2C_Walking_Street_at_night%2C_Thailand.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pattaya_beach_from_view_point.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/7/7f/Nong_Noogh_Garden%281%29.jpg',
                ],
            },
        ],
    },
    {
        slug: 'singapore',
        name: 'Singapore',
        code: 'SG',
        coordinates: [1.3521, 103.8198],
        coverImage: '/images/singapore/singapore/cover.jpg',
        description:
            'A polished island city-state where hawker culture, futuristic architecture, lush gardens, and waterfront skylines all sit within easy reach.',
        cities: [
            {
                slug: 'singapore',
                name: 'Singapore',
                country: 'Singapore',
                countrySlug: 'singapore',
                coordinates: [1.2903, 103.8519],
                coverImage: '/images/singapore/singapore/cover.jpg',
                description:
                    'A sleek tropical metropolis where skyline views, iconic gardens, legendary food courts, and meticulous design shape everyday travel.',
                visitDate: '2025-02',
                gallery: [
                    '/images/singapore/singapore/gardens-by-the-bay.jpg',
                    '/images/singapore/singapore/singapore-flyer.jpg',
                    '/images/singapore/singapore/clarke-quay.jpg',
                ],
            },
        ],
    },
    {
        slug: 'malaysia',
        name: 'Malaysia',
        code: 'MY',
        coordinates: [4.2105, 101.9758],
        coverImage: '/images/malaysia/kuala-lumpur/cover.jpg',
        description:
            'A layered Southeast Asian destination where modern skylines, island escapes, rainforest landscapes, and deeply rooted food culture coexist.',
        cities: [
            {
                slug: 'kuala-lumpur',
                name: 'Kuala Lumpur',
                country: 'Malaysia',
                countrySlug: 'malaysia',
                coordinates: [3.139, 101.6869],
                coverImage: '/images/malaysia/kuala-lumpur/cover.jpg',
                description:
                    'Malaysia’s fast-moving capital, balancing glossy towers, heritage landmarks, late-night food streets, and a deeply multicultural identity.',
                visitDate: '2025-02',
                gallery: [
                    '/images/malaysia/kuala-lumpur/batu-caves.jpg',
                    '/images/malaysia/kuala-lumpur/sultan-abdul-samad.jpg',
                    '/images/malaysia/kuala-lumpur/merdeka-118.jpg',
                ],
            },
            {
                slug: 'langkawi',
                name: 'Langkawi',
                country: 'Malaysia',
                countrySlug: 'malaysia',
                coordinates: [6.3509, 99.7928],
                coverImage: '/images/malaysia/langkawi/cover.jpg',
                description:
                    'An easygoing island destination of cable cars, sea bridges, forested hills, and postcard sunsets over the Andaman Sea.',
                visitDate: '2025-02',
                gallery: [
                    '/images/malaysia/langkawi/eagle-square.jpg',
                    '/images/malaysia/langkawi/cable-car.jpg',
                    '/images/malaysia/langkawi/sky-bridge.jpg',
                ],
            },
        ],
    },
    {
        slug: 'indonesia',
        name: 'Indonesia',
        code: 'ID',
        coordinates: [-0.7893, 113.9213],
        coverImage: '/images/indonesia/bali/cover.jpg',
        description:
            'A vast archipelago of volcanoes, temples, surf towns, and rich regional traditions, with Bali as its most globally recognized island escape.',
        cities: [
            {
                slug: 'bali',
                name: 'Bali',
                country: 'Indonesia',
                countrySlug: 'indonesia',
                coordinates: [-8.4095, 115.1889],
                coverImage: '/images/indonesia/bali/cover.jpg',
                description:
                    'Indonesia’s signature island getaway, known for cliffside temples, rice terraces, beach clubs, and deeply ceremonial Balinese culture.',
                visitDate: '2025-02',
                gallery: [
                    '/images/indonesia/bali/uluwatu-temple.jpg',
                    '/images/indonesia/bali/tirta-empul.jpg',
                    '/images/indonesia/bali/ubud-monkey-forest.jpg',
                ],
            },
        ],
    },
    {
        slug: 'taiwan',
        name: 'Taiwan',
        code: 'TW',
        coordinates: [23.6978, 120.9605],
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Taipei_Skyline_2022.06.29.jpg',
        description:
            'A compact island packed with design-forward cities, night markets, mountain scenery, and a food scene that rewards curiosity at every stop.',
        cities: [
            {
                slug: 'taipei',
                name: 'Taipei',
                country: 'Taiwan',
                countrySlug: 'taiwan',
                coordinates: [25.033, 121.5654],
                coverImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Taipei_Skyline_2022.06.29.jpg',
                description:
                    'A welcoming capital where temple incense, night market snacks, hot springs, and high-rise city views all belong to the same day.',
                visitDate: '2025-03',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/d/d2/Chiang_Kai-shek_memorial_amk.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/87/Bangka_Lungshan_Temple_07.23.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/5/50/2010_07_22230_6939_Xinyi_District%2C_Taipei%2C_Buildings%2C_Taipei_101%2C_Observation%2C_Streets_in_Taipei%2C_Taiwan.JPG',
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
