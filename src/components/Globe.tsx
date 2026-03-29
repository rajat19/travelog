'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import {
  countries,
  getCountryBySlug,
  getCityBySlug,
  getVisitedCountryCodes,
} from '@/data/travel';
import { withBasePath } from '@/lib/assets';

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

export function GlobeVisualization() {
  const globeRef = useRef<GlobeHandle | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [countryPolygons, setCountryPolygons] = useState<CountryFeature[]>([]);
  const [selectedCity, setSelectedCity] = useState<GlobeMarker | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<GlobeMarker | null>(null);
  const visitedCodes = getVisitedCountryCodes();

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

  useEffect(() => {
    import('react-globe.gl').then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(withBasePath('/ne_110m_admin_0_countries.geojson'), {
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
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const isMobile = rect.width < 768;
      setDimensions({
        width: rect.width,
        height: isMobile
          ? Math.min(Math.max(rect.width * 1.1, 380), 460)
          : Math.min(rect.width, 500),
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
    const isMobile = dimensions.width < 768;

    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.24;
      controls.enableZoom = true;
      controls.minDistance = isMobile ? 150 : 180;
      controls.maxDistance = 420;
    }

    globeRef.current.pointOfView(
      { lat: 20, lng: 110, altitude: isMobile ? 1.42 : 1.9 },
      0
    );
  }, [GlobeComponent, dimensions.width, dimensions.height]);

  const handleMarkerClick = useCallback(
    (marker: object) => {
      const selected = marker as GlobeMarker;

      if (selected.kind === 'country') {
        setSelectedCity(null);
        setSelectedCountry(selected);
        return;
      }

      if (selected.citySlug) {
        setSelectedCountry(null);
        setSelectedCity(selected);
      }
    },
    []
  );

  const handlePolygonClick = useCallback(
    (feature: object) => {
      const polygon = feature as CountryFeature;
      const isoCode = polygon.properties?.ISO_A2;
      const match = countries.find((country) => country.code === isoCode);

      if (match) {
        setSelectedCity(null);
        setSelectedCountry({
          lat: match.coordinates[0],
          lng: match.coordinates[1],
          name: match.name,
          country: match.name,
          countrySlug: match.slug,
          size: 0.5,
          color: '#67E8F9',
          kind: 'country',
        });
      }
    },
    []
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
    () => 0.001,
    []
  );

  const renderCityPin = useCallback(
    (marker: object) => {
      const city = marker as GlobeMarker;
      const button = document.createElement('button');
      button.type = 'button';
      button.title = `${city.name}, ${city.country}`;
      button.setAttribute('aria-label', `${city.name}, ${city.country}`);
      button.style.width = '18px';
      button.style.height = '18px';
      button.style.border = '2px solid rgba(255, 247, 237, 0.95)';
      button.style.borderRadius = '50% 50% 50% 0';
      button.style.background = 'linear-gradient(135deg, #f59e0b, #f97316)';
      button.style.boxShadow = '0 6px 18px rgba(249, 115, 22, 0.45)';
      button.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
      button.style.cursor = 'pointer';
      button.style.pointerEvents = 'auto';
      button.style.padding = '0';
      button.style.zIndex = '1';

      const centerDot = document.createElement('span');
      centerDot.style.position = 'absolute';
      centerDot.style.top = '50%';
      centerDot.style.left = '50%';
      centerDot.style.width = '5px';
      centerDot.style.height = '5px';
      centerDot.style.borderRadius = '999px';
      centerDot.style.background = 'rgba(255, 255, 255, 0.95)';
      centerDot.style.transform = 'translate(-50%, -50%) rotate(45deg)';

      button.style.position = 'relative';
      button.appendChild(centerDot);
      button.onclick = () => handleMarkerClick(city);

      return button;
    },
    [handleMarkerClick]
  );

  const selectedCityData = selectedCity?.citySlug
    ? getCityBySlug(selectedCity.countrySlug, selectedCity.citySlug)
    : undefined;
  const selectedCountryData = selectedCountry
    ? getCountryBySlug(selectedCountry.countrySlug)
    : undefined;
  const visitedCountryPolygons = countryPolygons.filter((feature) => {
    const isoCode = feature.properties?.ISO_A2;
    return !!isoCode && visitedCodes.includes(isoCode);
  });

  if (!GlobeComponent) {
    return (
      <div
        ref={containerRef}
        className="globe-container flex w-full items-center justify-center"
        style={{ height: 'clamp(380px, 72vw, 500px)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/50">Loading globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="globe-container relative mx-auto w-full max-w-[500px]"
      style={{ height: 'clamp(380px, 72vw, 500px)' }}
    >

      {selectedCity ? (
        <div className="absolute bottom-3 left-1/2 z-[50] w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur md:bottom-4 md:left-4 md:w-[220px] md:translate-x-0">
          {selectedCityData ? (
            <div className="relative mb-3 h-24 overflow-hidden rounded-xl border border-white/10">
              <Image
                src={withBasePath(selectedCityData.coverImage)}
                alt={selectedCityData.name}
                fill
                className="object-cover"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/55">Selected city</div>
              <div className="mt-1 font-heading text-xl font-semibold">{selectedCity.name}</div>
              <div className="text-sm text-white/70">{selectedCity.country}</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn btn-primary btn-circle btn-sm"
                onClick={() => {
                  if (!selectedCity.citySlug) {
                    return;
                  }

                  window.open(
                    `/city/${selectedCity.countrySlug}/${selectedCity.citySlug}`,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                aria-label={`Open ${selectedCity.name} blog in a new tab`}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-xs text-white/70 hover:text-white"
                onClick={() => setSelectedCity(null)}
                aria-label="Close city details"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {selectedCountry ? (
        <div className="absolute bottom-3 left-1/2 z-[50] w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/90 p-3 text-white shadow-2xl backdrop-blur md:bottom-4 md:left-auto md:right-4 md:w-[220px] md:translate-x-0">
          {selectedCountryData ? (
            <div className="relative mb-3 h-24 overflow-hidden rounded-xl border border-white/10">
              <Image
                src={withBasePath(selectedCountryData.coverImage)}
                alt={selectedCountryData.name}
                fill
                className="object-cover"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-white/55">Selected country</div>
              <div className="mt-1 font-heading text-xl font-semibold">{selectedCountry.name}</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn btn-primary btn-circle btn-sm"
                onClick={() => {
                  window.open(`/country/${selectedCountry.countrySlug}`, '_blank', 'noopener,noreferrer');
                }}
                aria-label={`Open ${selectedCountry.name} blog in a new tab`}
              >
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-xs text-white/70 hover:text-white"
                onClick={() => setSelectedCountry(null)}
                aria-label="Close country details"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={countryPolygons}
        polygonAltitude={0.0001}
        polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={(feature: object) => {
          const polygon = feature as CountryFeature;
          const isoCode = polygon.properties?.ISO_A2;

          return isoCode && visitedCodes.includes(isoCode)
            ? 'rgba(255, 237, 213, 0.85)'
            : 'rgba(226, 232, 240, 0.18)';
        }}
        polygonsTransitionDuration={320}
        onPolygonClick={handlePolygonClick}
        hexPolygonsData={visitedCountryPolygons}
        hexPolygonColor={() => 'rgba(249, 115, 22, 0.72)'}
        hexPolygonAltitude={0.0012}
        hexPolygonResolution={4}
        hexPolygonMargin={0.12}
        hexPolygonCurvatureResolution={2}
        onHexPolygonClick={handlePolygonClick}
        atmosphereColor="#F97316"
        atmosphereAltitude={0.16}
        htmlElementsData={cityMarkers}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.03}
        htmlElement={renderCityPin}
        enablePointerInteraction={true}
      />
    </div>
  );
}
