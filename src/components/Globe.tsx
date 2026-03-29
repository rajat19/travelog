'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { countries, getVisitedCountryCodes } from '@/data/travel';

// We need to dynamically import react-globe.gl since it uses WebGL
let GlobeModule: typeof import('react-globe.gl') | null = null;

interface GlobePoint {
    lat: number;
    lng: number;
    name: string;
    country: string;
    countrySlug: string;
    citySlug: string;
    size: number;
    color: string;
}

export function GlobeVisualization() {
    const globeRef = useRef<{ pointOfView: (coords: { lat: number; lng: number; altitude: number }, ms?: number) => void } | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
    const router = useRouter();

    const visitedCodes = getVisitedCountryCodes();

    // City markers
    const cityPoints: GlobePoint[] = countries.flatMap((country) =>
        country.cities.map((city) => ({
            lat: city.coordinates[0],
            lng: city.coordinates[1],
            name: city.name,
            country: country.name,
            countrySlug: country.slug,
            citySlug: city.slug,
            size: 0.4,
            color: '#F59E0B',
        }))
    );

    // Dynamic import of react-globe.gl
    useEffect(() => {
        import('react-globe.gl').then((mod) => {
            GlobeModule = mod;
            setGlobeComponent(() => mod.default);
        });
    }, []);

    // Auto-resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: Math.min(rect.width, 500),
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (!globeRef.current) return;

        const controls = (globeRef.current as unknown as { controls: () => { autoRotate: boolean; autoRotateSpeed: number } }).controls?.();
        if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.2;
        }
    }, [GlobeComponent]);

    const handlePointClick = useCallback(
        (point: object) => {
            const p = point as GlobePoint;
            router.push(`/city/${p.countrySlug}/${p.citySlug}`);
        },
        [router]
    );

    const getCountryColor = useCallback(
        (feat: { properties?: { ISO_A2?: string } }) => {
            const isoCode = feat.properties?.ISO_A2;
            if (isoCode && visitedCodes.includes(isoCode)) {
                return 'rgba(16, 185, 129, 0.6)'; // Emerald green for visited
            }
            return 'rgba(214, 211, 209, 0.3)'; // Muted gray for unvisited
        },
        [visitedCodes]
    );

    if (!GlobeComponent) {
        return (
            <div
                ref={containerRef}
                className="globe-container flex items-center justify-center"
                style={{ height: '500px' }}
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-primary" />
                    <p className="text-sm text-base-content/50">Loading globe...</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="globe-container">
            <GlobeComponent
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                polygonsData={[]}
                polygonCapColor={getCountryColor}
                polygonSideColor={() => 'rgba(150, 150, 150, 0.1)'}
                polygonStrokeColor={() => 'rgba(200, 200, 200, 0.3)'}
                atmosphereColor="#F59E0B"
                atmosphereAltitude={0.15}
                pointsData={cityPoints}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={() => 0.01}
                pointRadius="size"
                pointColor="color"
                pointLabel={(d: object) => {
                    const point = d as GlobePoint;
                    return `
            <div style="
              background: rgba(0,0,0,0.8);
              padding: 8px 12px;
              border-radius: 8px;
              color: white;
              font-family: Inter, sans-serif;
              font-size: 13px;
              border: 1px solid rgba(245,158,11,0.5);
            ">
              <strong>${point.name}</strong><br/>
              <span style="opacity: 0.7; font-size: 11px;">${point.country}</span>
            </div>
          `;
                }}
                onPointClick={handlePointClick}
                enablePointerInteraction={true}
            />
        </div>
    );
}
