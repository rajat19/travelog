'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

interface MarkerData {
    lat: number;
    lng: number;
    name: string;
    slug: string;
    isCurrent: boolean;
}

interface CityMiniMapProps {
    /** Current city coordinates [lat, lng] */
    center: [number, number];
    /** Current city name */
    cityName: string;
    /** All cities in the country for route display */
    allCities?: {
        name: string;
        slug: string;
        coordinates: [number, number];
        visitDate: string;
    }[];
    /** Current city slug to highlight */
    currentCitySlug?: string;
    /** Country slug for linking */
    countrySlug?: string;
    /** Zoom level (default 12 for city, lower for country) */
    zoom?: number;
}

export function CityMiniMap({
    center,
    cityName,
    allCities,
    currentCitySlug,
    countrySlug,
    zoom,
}: CityMiniMapProps) {
    const [MapComponents, setMapComponents] = useState<{
        MapContainer: React.ComponentType<Record<string, unknown>>;
        TileLayer: React.ComponentType<Record<string, unknown>>;
        Marker: React.ComponentType<Record<string, unknown>>;
        Popup: React.ComponentType<Record<string, unknown>>;
        Polyline: React.ComponentType<Record<string, unknown>>;
        useMap: () => { fitBounds: (bounds: unknown[], options?: Record<string, unknown>) => void };
    } | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Detect theme
    useEffect(() => {
        setMounted(true);
        const html = document.documentElement;
        const checkTheme = () => {
            setIsDark(html.getAttribute('data-theme') === 'golden-hour-dark');
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Dynamic import leaflet
    useEffect(() => {
        Promise.all([
            import('react-leaflet'),
            import('leaflet'),
        ]).then(([rl, L]) => {
            // Fix default marker icons
            delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            });

            setMapComponents({
                MapContainer: rl.MapContainer as unknown as React.ComponentType<Record<string, unknown>>,
                TileLayer: rl.TileLayer as unknown as React.ComponentType<Record<string, unknown>>,
                Marker: rl.Marker as unknown as React.ComponentType<Record<string, unknown>>,
                Popup: rl.Popup as unknown as React.ComponentType<Record<string, unknown>>,
                Polyline: rl.Polyline as unknown as React.ComponentType<Record<string, unknown>>,
                useMap: rl.useMap as () => { fitBounds: (bounds: unknown[], options?: Record<string, unknown>) => void },
            });
        });
    }, []);

    const markers: MarkerData[] = useMemo(() => {
        if (!allCities) {
            return [{
                lat: center[0],
                lng: center[1],
                name: cityName,
                slug: currentCitySlug || '',
                isCurrent: true,
            }];
        }

        return allCities.map((city) => ({
            lat: city.coordinates[0],
            lng: city.coordinates[1],
            name: city.name,
            slug: city.slug,
            isCurrent: city.slug === currentCitySlug,
        }));
    }, [allCities, center, cityName, currentCitySlug]);

    // Sort by visit date for route line
    const routePositions = useMemo(() => {
        if (!allCities || allCities.length < 2) return [];
        const sorted = [...allCities].sort(
            (a, b) => new Date(a.visitDate + '-01').getTime() - new Date(b.visitDate + '-01').getTime()
        );
        return sorted.map((c) => [c.coordinates[0], c.coordinates[1]]);
    }, [allCities]);

    // Calculate auto zoom (zoomed out for better context)
    const autoZoom = useMemo(() => {
        if (zoom) return zoom;
        if (!allCities || allCities.length <= 1) return 7;
        // Calculate bounds span
        const lats = allCities.map((c) => c.coordinates[0]);
        const lngs = allCities.map((c) => c.coordinates[1]);
        const latSpan = Math.max(...lats) - Math.min(...lats);
        const lngSpan = Math.max(...lngs) - Math.min(...lngs);
        const maxSpan = Math.max(latSpan, lngSpan);
        if (maxSpan > 15) return 4;
        if (maxSpan > 8) return 5;
        if (maxSpan > 4) return 6;
        if (maxSpan > 2) return 7;
        return 7;
    }, [allCities, zoom]);

    // Calculate center for multi-city
    const mapCenter = useMemo(() => {
        if (!allCities || allCities.length <= 1) return center;
        const lats = allCities.map((c) => c.coordinates[0]);
        const lngs = allCities.map((c) => c.coordinates[1]);
        return [
            (Math.max(...lats) + Math.min(...lats)) / 2,
            (Math.max(...lngs) + Math.min(...lngs)) / 2,
        ] as [number, number];
    }, [allCities, center]);

    const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    if (!mounted || !MapComponents) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-200/50"
            >
                <div className="flex items-center gap-2 border-b border-base-300 px-5 py-3">
                    <Map className="h-4 w-4 text-primary" />
                    <span className="font-heading text-sm font-bold uppercase tracking-wider text-base-content/70">
                        Location
                    </span>
                </div>
                <div className="flex h-64 items-center justify-center">
                    <span className="loading loading-spinner loading-md text-primary" />
                </div>
            </motion.div>
        );
    }

    const { MapContainer, TileLayer, Marker, Popup, Polyline } = MapComponents;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-base-300 bg-base-200/50 shadow-sm"
        >
            <div className="flex items-center gap-2 border-b border-base-300 px-5 py-3">
                <Map className="h-4 w-4 text-primary" />
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-base-content/70">
                    Location
                </span>
                <span className="ml-auto text-xs text-base-content/40">
                    {center[0].toFixed(2)}°, {center[1].toFixed(2)}°
                </span>
            </div>
            <div className="minimap-container h-72 w-full">
                <MapContainer
                    center={mapCenter}
                    zoom={autoZoom}
                    scrollWheelZoom={false}
                    zoomControl={true}
                    dragging={true}
                    style={{ height: '100%', width: '100%' }}
                    attributionControl={false}
                >
                    <TileLayer url={tileUrl} />

                    {/* Route line */}
                    {routePositions.length >= 2 && (
                        <Polyline
                            positions={routePositions}
                            pathOptions={{
                                color: isDark ? '#F59E0B' : '#D97706',
                                weight: 2,
                                opacity: 0.5,
                                dashArray: '8 6',
                            }}
                        />
                    )}

                    {/* Markers */}
                    {markers.map((marker) => (
                        <Marker
                            key={marker.slug || marker.name}
                            position={[marker.lat, marker.lng]}
                            opacity={marker.isCurrent ? 1 : 0.5}
                        >
                            <Popup>
                                <div className="text-center">
                                    <strong>{marker.name}</strong>
                                    {!marker.isCurrent && countrySlug && (
                                        <div className="mt-1">
                                            <a
                                                href={`/city/${countrySlug}/${marker.slug}`}
                                                className="text-xs text-blue-600 underline"
                                            >
                                                View city →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </motion.div>
    );
}
