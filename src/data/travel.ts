export interface City {
    slug: string;
    name: string;
    nativeName?: string;
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
    nativeName?: string;
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
        nativeName: 'ประเทศไทย',
        code: 'TH',
        coordinates: [15.87, 100.9925],
        coverImage: '/images/thailand/cover.png',
        description:
            'The Land of Smiles — a tapestry of ancient temples, bustling night markets, tropical beaches, and warm-hearted people.',
        cities: [
            {
                slug: 'bangkok',
                name: 'Bangkok',
                nativeName: 'กรุงเทพมหานคร',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [13.7563, 100.5018],
                coverImage: '/images/thailand/bangkok/cover.png',
                description:
                    'A city of contrasts where gilded temples stand beside neon-lit skyscrapers, and street food rivals Michelin-starred dining.',
                visitDate: '2026-02',
                gallery: [
                    '/images/thailand/bangkok/wat-arun.png',
                    '/images/thailand/bangkok/street-food.png',
                    '/images/thailand/bangkok/grand-palace.png',
                ],
            },
            {
                slug: 'chiang-rai',
                name: 'Chiang Rai',
                nativeName: 'เชียงราย',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [19.9105, 99.8406],
                coverImage: '/images/thailand/chiang-rai/cover.png',
                description:
                    'A gateway to the Golden Triangle, home to the ethereal White Temple and lush mountain landscapes.',
                visitDate: '2026-02',
                gallery: [
                    '/images/thailand/chiang-rai/white-temple.png',
                    '/images/thailand/chiang-rai/blue-temple.png',
                    '/images/thailand/chiang-rai/mountain-view.png',
                ],
            },
            {
                slug: 'chiang-mai',
                name: 'Chiang Mai',
                nativeName: 'เชียงใหม่',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [18.7883, 98.9853],
                coverImage: '/images/thailand/chiang-mai/cover.jpg',
                description:
                    'Northern Thailand’s cultural capital, where mountain temples, old city lanes, and café-filled neighborhoods create a slower rhythm.',
                visitDate: '2026-02',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/e/e2/%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/6/68/Chiang_Mai_-_East_gate_of_the_city_wall_-_0001.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/d8/%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%95%E0%B8%81%E0%B8%A7%E0%B8%8A%E0%B8%B4%E0%B8%A3%E0%B8%98%E0%B8%B2%E0%B8%A3_%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%A5%E0%B8%B3%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B5%E0%B9%8844_%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%99%E0%B8%99%E0%B8%97%E0%B9%8C.jpg',
                ],
            },
            {
                slug: 'phuket',
                name: 'Phuket',
                nativeName: 'ภูเก็ต',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [7.8804, 98.3923],
                coverImage:
                    'https://upload.wikimedia.org/wikipedia/commons/5/56/The_Big_Buddha%2C_Phuket.jpg',
                description:
                    'Thailand’s best-known island escape, mixing dramatic bays, buzzing beach towns, colorful old shophouses, and sea-view temples.',
                visitDate: '2023-03',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/3/3e/Dramatic_karst_landscape_of_Phang_Nga_Bay%2C_Thailand.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/88/Patong_Beach.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/87/Soi_Rommanee%2C_Phuket_Town.jpg',
                ],
            },
            {
                slug: 'pattaya',
                name: 'Pattaya',
                nativeName: 'พัทยา',
                country: 'Thailand',
                countrySlug: 'thailand',
                coordinates: [12.9236, 100.8825],
                coverImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Santuaryoftruth2.jpg',
                description:
                    'A high-energy seaside city where beach sunsets, neon nightlife, and offbeat attractions make for an easy weekend break from Bangkok.',
                visitDate: '2024-12',
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
        nativeName: '新加坡',
        code: 'SG',
        coordinates: [1.3521, 103.8198],
        coverImage: '/images/singapore/singapore/cover.jpg',
        description:
            'A polished island city-state where hawker culture, futuristic architecture, lush gardens, and waterfront skylines all sit within easy reach.',
        cities: [
            {
                slug: 'singapore',
                name: 'Singapore',
                nativeName: '新加坡',
                country: 'Singapore',
                countrySlug: 'singapore',
                coordinates: [1.2903, 103.8519],
                coverImage: '/images/singapore/singapore/cover.jpg',
                description:
                    'A sleek tropical metropolis where skyline views, iconic gardens, legendary food courts, and meticulous design shape everyday travel.',
                visitDate: '2024-06',
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
        nativeName: 'مليسيا',
        code: 'MY',
        coordinates: [4.2105, 101.9758],
        coverImage: '/images/malaysia/kuala-lumpur/cover.jpg',
        description:
            'A layered Southeast Asian destination where modern skylines, island escapes, rainforest landscapes, and deeply rooted food culture coexist.',
        cities: [
            {
                slug: 'kuala-lumpur',
                name: 'Kuala Lumpur',
                nativeName: 'كوالالمڤور',
                country: 'Malaysia',
                countrySlug: 'malaysia',
                coordinates: [3.139, 101.6869],
                coverImage: '/images/malaysia/kuala-lumpur/cover.jpg',
                description:
                    'Malaysia’s fast-moving capital, balancing glossy towers, heritage landmarks, late-night food streets, and a deeply multicultural identity.',
                visitDate: '2025-05',
                gallery: [
                    '/images/malaysia/kuala-lumpur/batu-caves.jpg',
                    '/images/malaysia/kuala-lumpur/sultan-abdul-samad.jpg',
                    '/images/malaysia/kuala-lumpur/merdeka-118.jpg',
                ],
            },
            {
                slug: 'langkawi',
                name: 'Langkawi',
                nativeName: 'لڠكاوي',
                country: 'Malaysia',
                countrySlug: 'malaysia',
                coordinates: [6.3509, 99.7928],
                coverImage: '/images/malaysia/langkawi/cover.jpg',
                description:
                    'An easygoing island destination of cable cars, sea bridges, forested hills, and postcard sunsets over the Andaman Sea.',
                visitDate: '2024-06',
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
        nativeName: 'Indonesia',
        code: 'ID',
        coordinates: [-0.7893, 113.9213],
        coverImage: '/images/indonesia/bali/cover.jpg',
        description:
            'A vast archipelago of volcanoes, temples, surf towns, and rich regional traditions, with Bali as its most globally recognized island escape.',
        cities: [
            {
                slug: 'bali',
                name: 'Bali',
                nativeName: 'ᬩᬮᬶ',
                country: 'Indonesia',
                countrySlug: 'indonesia',
                coordinates: [-8.4095, 115.1889],
                coverImage: '/images/indonesia/bali/cover.jpg',
                description:
                    'Indonesia’s signature island getaway, known for cliffside temples, rice terraces, beach clubs, and deeply ceremonial Balinese culture.',
                visitDate: '2025-05',
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
        nativeName: '台灣',
        code: 'TW',
        coordinates: [23.6978, 120.9605],
        coverImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Taipei_Skyline_2022.06.29.jpg',
        description:
            'A compact island packed with design-forward cities, night markets, mountain scenery, and a food scene that rewards curiosity at every stop.',
        cities: [
            {
                slug: 'taipei',
                name: 'Taipei',
                nativeName: '臺北',
                country: 'Taiwan',
                countrySlug: 'taiwan',
                coordinates: [25.033, 121.5654],
                coverImage: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Taipei_Skyline_2022.06.29.jpg',
                description:
                    'A welcoming capital where temple incense, night market snacks, hot springs, and high-rise city views all belong to the same day.',
                visitDate: '2026-02',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/d/d2/Chiang_Kai-shek_memorial_amk.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/8/87/Bangka_Lungshan_Temple_07.23.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/5/50/2010_07_22230_6939_Xinyi_District%2C_Taipei%2C_Buildings%2C_Taipei_101%2C_Observation%2C_Streets_in_Taipei%2C_Taiwan.JPG',
                ],
            },
        ],
    },
    {
        slug: 'australia',
        name: 'Australia',
        code: 'AU',
        coordinates: [-25.2744, 133.7751],
        coverImage:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/1280px-Sydney_Australia._%2821339175489%29.jpg',
        description:
            'A continent-sized country of coastal cities, surf culture, vast landscapes, and an easy outdoor rhythm shaped by sun, coffee, and long horizons.',
        cities: [
            {
                slug: 'sydney',
                name: 'Sydney',
                country: 'Australia',
                countrySlug: 'australia',
                coordinates: [-33.8688, 151.2093],
                coverImage:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/1280px-Sydney_Australia._%2821339175489%29.jpg',
                description:
                    'Australia’s harbor icon, where ferries, surf beaches, sandstone walks, and a glittering skyline make the city feel constantly outdoors.',
                visitDate: '2026-05',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/1280px-Sydney_Australia._%2821339175489%29.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Sydney_Harbour_Bridge_from_Circular_Quay.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/7/79/Bondi_from_above.jpg',
                ],
            },
            {
                slug: 'melbourne',
                name: 'Melbourne',
                country: 'Australia',
                countrySlug: 'australia',
                coordinates: [-37.8136, 144.9631],
                coverImage:
                    'https://upload.wikimedia.org/wikipedia/commons/7/74/Melbourne_skyline_sor.jpg',
                description:
                    'A creative southern capital of laneways, coffee rituals, trams, galleries, sport, and moody weather that rewards slow wandering.',
                visitDate: '2026-05',
                gallery: [
                    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Flinders_Street_Station_Melbourne_March_2021.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/b/b0/Melbourne_Skyline_and_Princes_Bridge_-_Dec_2008_%28cropped%29.jpg',
                    'https://upload.wikimedia.org/wikipedia/commons/6/62/Hosier_Lane_from_Flinders_Street_Melbourne.jpg',
                ],
            },
        ],
    },
    {
        slug: 'vietnam',
        name: 'Vietnam',
        nativeName: 'Việt Nam',
        code: 'VN',
        coordinates: [14.0583, 108.2772],
        coverImage: '/images/vietnam/cover.png',
        description:
            'A land of staggering natural beauty and rich cultural heritage, where ancient traditions blend with modern energy.',
        cities: [
            {
                slug: 'da-nang',
                name: 'Da Nang',
                nativeName: 'Đà Nẵng',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [16.0471, 108.2068],
                coverImage: '/images/vietnam/da-nang/cover.png',
                description:
                    'A coastal city with pristine beaches, the iconic Dragon Bridge, and a gateway to the ancient town of Hoi An.',
                visitDate: '2025-12',
                gallery: [
                    '/images/vietnam/da-nang/dragon-bridge.png',
                    '/images/vietnam/da-nang/marble-mountains.png',
                    '/images/vietnam/da-nang/my-khe-beach.png',
                ],
            },
            {
                slug: 'ho-chi-minh',
                name: 'Ho Chi Minh City',
                nativeName: 'Thành phố Hồ Chí Minh',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [10.8231, 106.6297],
                coverImage: '/images/vietnam/ho-chi-minh/cover.png',
                description:
                    'The bustling heart of southern Vietnam — a city of roaring motorbikes, French colonial architecture, and incredible phở.',
                visitDate: '2025-12',
                gallery: [
                    '/images/vietnam/ho-chi-minh/notre-dame.png',
                    '/images/vietnam/ho-chi-minh/ben-thanh.png',
                    '/images/vietnam/ho-chi-minh/street-scene.png',
                ],
            },
            {
                slug: 'hanoi',
                name: 'Hanoi',
                nativeName: 'Hà Nội',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [21.0285, 105.8542],
                coverImage: '/images/vietnam/hanoi/cover.jpg',
                description:
                    'Vietnam\'s ancient capital — a thousand-year-old city of tree-lined boulevards, misty lakes, crumbling French villas, and the best street food in Southeast Asia.',
                visitDate: '2023-10',
                gallery: [
                    '/images/vietnam/hanoi/temple-of-literature.jpg',
                    '/images/vietnam/hanoi/old-quarter.jpg',
                    '/images/vietnam/hanoi/ho-chi-minh-mausoleum.jpg',
                ],
            },
            {
                slug: 'sapa',
                name: 'Sapa',
                nativeName: 'Sa Pa',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [22.3353, 103.8443],
                coverImage: '/images/vietnam/sapa/cover.jpg',
                description:
                    'A mist-shrouded mountain town in northern Vietnam, famous for its cascading rice terraces, dramatic peaks, and diverse ethnic minority villages.',
                visitDate: '2023-10',
                gallery: [
                    '/images/vietnam/sapa/fansipan.jpg',
                    '/images/vietnam/sapa/village.jpg',
                ],
            },
            {
                slug: 'haiphong',
                name: 'Hai Phong',
                nativeName: 'Hải Phòng',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [20.8449, 106.6881],
                coverImage: '/images/vietnam/haiphong/cover.jpg',
                description:
                    'A bustling port city known for its colonial architecture, incredible street food, and as the gateway to the stunning Lan Ha Bay.',
                visitDate: '2023-10',
                gallery: [
                    '/images/vietnam/haiphong/lanha.jpg',
                    '/images/vietnam/haiphong/street.jpg',
                ],
            },
            {
                slug: 'ninh-binh',
                name: 'Ninh Binh',
                nativeName: 'Ninh Bình',
                country: 'Vietnam',
                countrySlug: 'vietnam',
                coordinates: [20.2539, 105.9750],
                coverImage: '/images/vietnam/ninh-binh/cover.jpg',
                description:
                    'Often called "Halong Bay on land," this spectacular region features winding rivers carving through towering limestone karst mountains and endless green rice paddies.',
                visitDate: '2023-10',
                gallery: [
                    '/images/vietnam/ninh-binh/river.jpg',
                    '/images/vietnam/ninh-binh/viewpoint.jpg',
                ],
            },
        ],
    },
    {
        slug: 'japan',
        name: 'Japan',
        nativeName: '日本',
        code: 'JP',
        coordinates: [36.2048, 138.2529],
        coverImage: '/images/japan/cover.png',
        description:
            'Where ancient traditions and cutting-edge modernity coexist — from serene zen gardens to electric cityscapes.',
        cities: [
            {
                slug: 'tokyo',
                name: 'Tokyo',
                nativeName: '東京',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [35.6762, 139.6503],
                coverImage: '/images/japan/tokyo/cover.png',
                description:
                    'The world\'s largest metropolitan area — a mesmerizing blend of ultra-modern technology and historic temples.',
                visitDate: '2025-10',
                gallery: [
                    '/images/japan/tokyo/shibuya.png',
                    '/images/japan/tokyo/senso-ji.png',
                    '/images/japan/tokyo/tokyo-tower.png',
                ],
            },
            {
                slug: 'osaka',
                name: 'Osaka',
                nativeName: '大阪',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [34.6937, 135.5023],
                coverImage: '/images/japan/osaka/cover.png',
                description:
                    'Japan\'s kitchen — a vibrant city famous for street food, Osaka Castle, and the electric nightlife of Dotonbori.',
                visitDate: '2025-10',
                gallery: [
                    '/images/japan/osaka/dotonbori.png',
                    '/images/japan/osaka/osaka-castle.png',
                    '/images/japan/osaka/street-food.png',
                ],
            },
            {
                slug: 'kyoto',
                name: 'Kyoto',
                nativeName: '京都',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [35.0116, 135.7681],
                coverImage: '/images/japan/kyoto/cover.png',
                description:
                    'The cultural heart of Japan — a city of ten thousand temples, bamboo groves, and the art of the geisha.',
                visitDate: '2025-10',
                gallery: [
                    '/images/japan/kyoto/fushimi-inari.png',
                    '/images/japan/kyoto/bamboo-grove.png',
                    '/images/japan/kyoto/kinkaku-ji.png',
                ],
            },
            {
                slug: 'nara',
                name: 'Nara',
                nativeName: '奈良',
                country: 'Japan',
                countrySlug: 'japan',
                coordinates: [34.6851, 135.8048],
                coverImage: '/images/japan/nara/cover.jpg',
                description:
                    'Japan\'s first permanent capital, where magnificent wooden temples and friendly, free-roaming deer create a deeply spiritual and magical atmosphere.',
                visitDate: '2025-10',
                gallery: [
                    '/images/japan/nara/deer.jpg',
                    '/images/japan/nara/shrine.jpg',
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
                visitDate: '2025-02',
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
                visitDate: '2025-02',
                gallery: [
                    '/images/usa/los-angeles/hollywood-sign.png',
                    '/images/usa/los-angeles/santa-monica.png',
                    '/images/usa/los-angeles/griffith-observatory.png',
                ],
            },
        ],
    },
    {
        slug: 'india',
        name: 'India',
        nativeName: 'भारत',
        code: 'IN',
        coordinates: [20.5937, 78.9629],
        coverImage: '/images/india/cover.jpg',
        description: 'A monumental subcontinent that defies description. A collision of extreme beauty, immense history, vibrant chaos, and unparalleled warmth.',
        cities: [
            {
                slug: 'delhi',
                name: 'New Delhi',
                nativeName: 'नई दिल्ली',
                country: 'India',
                countrySlug: 'india',
                coordinates: [28.6139, 77.209],
                coverImage: '/images/india/delhi/cover.jpg',
                description: 'The beating heart of India, where sprawling Mughal history sits side-by-side with modern infrastructure.',
                visitDate: '2026-05',
                gallery: ['/images/india/delhi/1.jpg', '/images/india/delhi/2.jpg', '/images/india/delhi/3.jpg'],
            },
            {
                slug: 'cochi',
                name: 'Kochi (Cochin)',
                nativeName: 'കൊച്ചി',
                country: 'India',
                countrySlug: 'india',
                coordinates: [10.2, 76.8], // Nudged east & north for the low-res GeoJSON map
                coverImage: '/images/india/cochi/cover.jpg',
                description: 'The historic port city of Kerala, defined by its massive Chinese fishing nets and slow, tropical backwaters.',
                visitDate: '2022-12',
                gallery: ['/images/india/cochi/1.jpg', '/images/india/cochi/2.jpg'],
            },
            {
                slug: 'shimla',
                name: 'Shimla',
                nativeName: 'शिमला',
                country: 'India',
                countrySlug: 'india',
                coordinates: [31.1048, 77.1734],
                coverImage: '/images/india/shimla/cover.jpg',
                description: 'The stunning former summer capital of British India, draped across a Himalayan ridge.',
                visitDate: '2010-05',
                gallery: ['/images/india/shimla/1.jpg', '/images/india/shimla/2.jpg'],
            },
            {
                slug: 'manali',
                name: 'Manali',
                nativeName: 'मनाली',
                country: 'India',
                countrySlug: 'india',
                coordinates: [31.5, 77.1887], // Nudged south for the low-res GeoJSON map
                coverImage: '/images/india/manali/cover.jpg',
                description: 'A high-altitude Himalayan resort town known as a backpacking center and honeymoon destination.',
                visitDate: '2010-05',
                gallery: ['/images/india/manali/1.jpg', '/images/india/manali/2.jpg'],
            },
            {
                slug: 'jaipur',
                name: 'Jaipur',
                nativeName: 'जयपुर',
                country: 'India',
                countrySlug: 'india',
                coordinates: [26.9124, 75.7873],
                coverImage: '/images/india/jaipur/cover.jpg',
                description: 'The Pink City of Rajasthan, radiating royal heritage with its majestic palaces and forts.',
                visitDate: '2021-03',
                gallery: ['/images/india/jaipur/1.jpg', '/images/india/jaipur/2.jpg'],
            },
            {
                slug: 'lucknow',
                name: 'Lucknow',
                nativeName: 'लखनऊ',
                country: 'India',
                countrySlug: 'india',
                coordinates: [26.8467, 80.9462],
                coverImage: '/images/india/lucknow/cover.jpg',
                description: 'The City of Nawabs, deeply proud of its refined culture, intricate architecture, and legendary Awadhi cuisine.',
                visitDate: '2026-06',
                gallery: ['/images/india/lucknow/1.jpg', '/images/india/lucknow/2.jpg'],
            },
            {
                slug: 'kanpur',
                name: 'Kanpur',
                nativeName: 'कानपुर',
                country: 'India',
                countrySlug: 'india',
                coordinates: [26.4499, 80.3319],
                coverImage: '/images/india/kanpur/cover.jpg',
                description: 'An industrial powerhouse on the banks of the Ganges, holding a rugged historic charm.',
                visitDate: '2026-04',
                gallery: ['/images/india/kanpur/1.jpg', '/images/india/kanpur/2.jpg'],
            },
            {
                slug: 'chandigarh',
                name: 'Chandigarh',
                nativeName: 'चंडीगढ़',
                country: 'India',
                countrySlug: 'india',
                coordinates: [30.7333, 76.7794],
                coverImage: '/images/india/chandigarh/cover.jpg',
                description: 'The meticulously planned "City Beautiful", famous for its Le Corbusier architecture and grid system.',
                visitDate: '2017-12',
                gallery: ['/images/india/chandigarh/1.jpg', '/images/india/chandigarh/2.jpg'],
            },
            {
                slug: 'mumbai',
                name: 'Mumbai',
                nativeName: 'मुंबई',
                country: 'India',
                countrySlug: 'india',
                coordinates: [19.076, 73.8777], // Nudged east for the low-res GeoJSON map
                coverImage: '/images/india/mumbai/cover.jpg',
                description: 'The City of Dreams—a relentless, high-energy metropolis of colonial architecture, Bollywood, and the sea.',
                visitDate: '2025-07',
                gallery: ['/images/india/mumbai/1.jpg', '/images/india/mumbai/2.jpg'],
            },
            {
                slug: 'hyderabad',
                name: 'Hyderabad',
                nativeName: 'హైదరాబాద్',
                country: 'India',
                countrySlug: 'india',
                coordinates: [17.385, 78.4867],
                coverImage: '/images/india/hyderabad/cover.jpg',
                description: 'Where Islamic architectural heritage and world-famous Biryani meet the global tech industry.',
                visitDate: '2025-10',
                gallery: ['/images/india/hyderabad/1.jpg', '/images/india/hyderabad/2.jpg'],
            },
            {
                slug: 'pondicherry',
                name: 'Pondicherry',
                nativeName: 'புதுச்சேரி',
                country: 'India',
                countrySlug: 'india',
                coordinates: [11.9416, 79.1], // Nudged west for the low-res GeoJSON map
                coverImage: '/images/india/pondicherry/cover.jpg',
                description: 'A slice of French colonial history on the east coast, characterized by yellow villas and spiritual ashrams.',
                visitDate: '2023-08',
                gallery: ['/images/india/pondicherry/1.jpg', '/images/india/pondicherry/2.jpg'],
            },
            {
                slug: 'bangalore',
                name: 'Bangalore',
                nativeName: 'ಬೆಂಗಳೂರು',
                country: 'India',
                countrySlug: 'india',
                coordinates: [12.9716, 77.5946],
                coverImage: '/images/india/bangalore/cover.jpg',
                description: 'The Silicon Valley of India, celebrated for its gardens, microbreweries, and endless tech startups.',
                visitDate: '2026-05',
                gallery: ['/images/india/bangalore/1.jpg', '/images/india/bangalore/2.jpg'],
            },
        ],
    },
    {
        slug: 'kazakhstan',
        name: 'Kazakhstan',
        nativeName: 'Қазақстан',
        code: 'KZ',
        coordinates: [48.0196, 66.9237],
        coverImage: '/images/kazakhstan/cover.jpg',
        description:
            'The vast heart of Central Asia — where snow-capped peaks, endless steppe, Silk Road heritage, and a bold modern identity converge beneath enormous skies.',
        cities: [
            {
                slug: 'almaty',
                name: 'Almaty',
                nativeName: 'Алматы',
                country: 'Kazakhstan',
                countrySlug: 'kazakhstan',
                coordinates: [43.222, 76.8512],
                coverImage: '/images/kazakhstan/almaty/cover.jpg',
                description:
                    'Kazakhstan\'s cultural capital, a leafy, mountain-backed metropolis where Soviet-era grandeur, buzzing bazaars, and alpine adventures collide.',
                visitDate: '2026-04',
                gallery: [
                    '/images/kazakhstan/almaty/zenkov-cathedral.jpg',
                    '/images/kazakhstan/almaty/green-bazaar.jpg',
                    '/images/kazakhstan/almaty/medeu-rink.jpg',
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
