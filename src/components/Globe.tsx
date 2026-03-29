'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { countries, getVisitedCountryCodes } from '@/data/travel';

type GlobeControls = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom?: boolean;
  minDistance?: number;
  maxDistance?: number;
};

type GlobeHandle = {
  controls: () => GlobeControls;
  pointOfView: (coords: { lat: number; lng: number; altitude: number }, ms?: number) => void;
};

type CountryFeature = {
  type: 'Feature';
  properties?: {
    ISO_A2?: string;
    NAME?: string;
    NAME_LONG?: string;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
};

type GlobeMarker = {
  lat: number;
  lng: number;
  name: string;
  country: string;
  countrySlug: string;
  citySlug?: string;
  size: number;
  color: string;
  kind: 'country' | 'city';
};

type RingMarker = {
  lat: number;
  lng: number;
  color: string;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
};

export function GlobeVisualization() {
  const globeRef = useRef<GlobeHandle | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [countryPolygons, setCountryPolygons] = useState<CountryFeature[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const visitedCodes = getVisitedCountryCodes();
  const basePath = pathname?.startsWith('/travelog') ? '/travelog' : '';

  const countryMarkers: GlobeMarker[] = countries.map((country) => ({
    lat: country.coordinates[0],
    lng: country.coordinates[1],
    name: country.name,
    country: country.name,
    countrySlug: country.slug,
    size: 0.5,
    color: '#67E8F9',
    kind: 'country',
  }));

  const cityMarkers: GlobeMarker[] = countries.flatMap((country) =>
    country.cities.map((city) => ({
      lat: city.coordinates[0],
      lng: city.coordinates[1],
      name: city.name,
      country: country.name,
      countrySlug: country.slug,
      citySlug: city.slug,
      size: 0.85,
      color: '#F59E0B',
      kind: 'city',
    }))
  );

  const allMarkers = [...countryMarkers, ...cityMarkers];

  const cityRings: RingMarker[] = cityMarkers.map((city) => ({
    lat: city.lat,
    lng: city.lng,
    color: 'rgba(245, 158, 11, 0.55)',
    maxR: 3.8,
    propagationSpeed: 2.2,
    repeatPeriod: 900,
  }));

  useEffect(() => {
    import('react-globe.gl').then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${basePath}/ne_110m_admin_0_countries.geojson`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: { features?: CountryFeature[] }) => {
        setCountryPolygons(data.features ?? []);
      })
      .catch((error: unknown) => {
        if ((error as { name?: string }).name !== 'AbortError') {
          console.error('Failed to load country polygons', error);
        }
      });

    return () => controller.abort();
  }, [basePath]);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: Math.min(rect.width, 500),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!globeRef.current) {
      return;
    }

    const controls = globeRef.current.controls?.();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.24;
      controls.enableZoom = true;
      controls.minDistance = 180;
      controls.maxDistance = 420;
    }

    globeRef.current.pointOfView({ lat: 20, lng: 110, altitude: 1.75 }, 0);
  }, [GlobeComponent, dimensions.width, dimensions.height]);

  const handleMarkerClick = useCallback(
    (marker: object) => {
      const selected = marker as GlobeMarker;

      if (selected.kind === 'country') {
        router.push(`/country/${selected.countrySlug}`);
        return;
      }

      if (selected.citySlug) {
        router.push(`/city/${selected.countrySlug}/${selected.citySlug}`);
      }
    },
    [router]
  );

  const handlePolygonClick = useCallback(
    (feature: object) => {
      const polygon = feature as CountryFeature;
      const isoCode = polygon.properties?.ISO_A2;
      const match = countries.find((country) => country.code === isoCode);

      if (match) {
        router.push(`/country/${match.slug}`);
      }
    },
    [router]
  );

  const getCountryCapColor = useCallback(
    (feature: object) => {
      const polygon = feature as CountryFeature;
      const isoCode = polygon.properties?.ISO_A2;

      if (isoCode && visitedCodes.includes(isoCode)) {
        return 'rgba(249, 115, 22, 0.72)';
      }

      return 'rgba(148, 163, 184, 0.12)';
    },
    [visitedCodes]
  );

  const getCountryAltitude = useCallback(
    (feature: object) => {
      const polygon = feature as CountryFeature;
      const isoCode = polygon.properties?.ISO_A2;
      return isoCode && visitedCodes.includes(isoCode) ? 0.055 : 0.008;
    },
    [visitedCodes]
  );

  const getMarkerLabel = useCallback((item: object) => {
    const marker = item as GlobeMarker;
    const accent = marker.kind === 'city' ? 'rgba(245, 158, 11, 0.55)' : 'rgba(103, 232, 249, 0.5)';
    const eyebrow = marker.kind === 'city' ? 'Visited city' : 'Visited country';

    return `
      <div style="
        background: rgba(2, 6, 23, 0.9);
        padding: 10px 12px;
        border-radius: 10px;
        color: white;
        font-family: Inter, sans-serif;
        font-size: 13px;
        border: 1px solid ${accent};
        box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);
      ">
        <div style="font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.68;">
          ${eyebrow}
        </div>
        <strong>${marker.name}</strong><br/>
        <span style="opacity: 0.78; font-size: 11px;">${marker.country}</span>
      </div>
    `;
  }, []);

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
    <div ref={containerRef} className="globe-container relative">
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-xs text-white/80 shadow-2xl backdrop-blur">
        <div className="mb-2 font-semibold text-white">Explore the map</div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span>Country anchor</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-amber-200 bg-amber-500" />
          <span>Visited city</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-2.5 w-6 rounded-full bg-orange-500/80" />
          <span>Highlighted country</span>
        </div>
      </div>

      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={countryPolygons}
        polygonAltitude={getCountryAltitude}
        polygonCapColor={getCountryCapColor}
        polygonSideColor={(feature: object) => {
          const polygon = feature as CountryFeature;
          const isoCode = polygon.properties?.ISO_A2;

          return isoCode && visitedCodes.includes(isoCode)
            ? 'rgba(249, 115, 22, 0.18)'
            : 'rgba(148, 163, 184, 0.04)';
        }}
        polygonStrokeColor={(feature: object) => {
          const polygon = feature as CountryFeature;
          const isoCode = polygon.properties?.ISO_A2;

          return isoCode && visitedCodes.includes(isoCode)
            ? 'rgba(255, 237, 213, 0.85)'
            : 'rgba(226, 232, 240, 0.18)';
        }}
        polygonsTransitionDuration={320}
        onPolygonClick={handlePolygonClick}
        atmosphereColor="#F97316"
        atmosphereAltitude={0.16}
        pointsData={allMarkers}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={(marker: object) => {
          const item = marker as GlobeMarker;
          return item.kind === 'city' ? 0.1 : 0.035;
        }}
        pointRadius={(marker: object) => {
          const item = marker as GlobeMarker;
          return item.kind === 'city' ? item.size : item.size * 0.75;
        }}
        pointColor="color"
        pointResolution={18}
        pointLabel={getMarkerLabel}
        onPointClick={handleMarkerClick}
        ringsData={cityRings}
        ringLat="lat"
        ringLng="lng"
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        ringResolution={48}
        enablePointerInteraction={true}
      />
    </div>
  );
}
