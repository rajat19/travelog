import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { countries, getCityBySlug, getCountryBySlug } from '@/data/travel';
import { CityContent } from '@/components/CityContent';
import { PhotoGrid } from '@/components/PhotoGrid';
import { CityCard } from '@/components/CityCard';
import { TripInfoBar } from '@/components/TripInfoBar';
import { RatingBadge } from '@/components/RatingBadge';
import { ParallaxHero } from '@/components/ParallaxHero';
import { ReadingProgress } from '@/components/ReadingProgress';
import { AnimatedSection } from '@/components/AnimatedSection';
import { TableOfContents } from '@/components/TableOfContents';
import { BackToTop } from '@/components/BackToTop';
import { CityMiniMap } from '@/components/CityMiniMap';
import { getCityContent } from '@/lib/content';
import type { Metadata } from 'next';

interface CityPageProps {
  params: Promise<{ country: string; slug: string }>;
}

export async function generateStaticParams() {
  return countries.flatMap((country) =>
    country.cities.map((city) => ({
      country: country.slug,
      slug: city.slug,
    }))
  );
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country: countrySlug, slug } = await params;
  const city = getCityBySlug(countrySlug, slug);
  if (!city) return { title: 'City Not Found' };
  const cityContent = await getCityContent(countrySlug, slug);
  const description = cityContent?.frontmatter.description ?? city.description;

  return {
    title: `${city.name}, ${city.country} — Travelog`,
    description,
  };
}

// Tag emoji mapping for known categories
const tagEmojis: Record<string, string> = {
  temples: '🛕',
  'street-food': '🍜',
  nightlife: '🌃',
  beaches: '🏖️',
  bustling: '⚡',
  nature: '🌿',
  mountains: '⛰️',
  culture: '🎭',
  history: '🏛️',
  shopping: '🛍️',
  architecture: '🏗️',
  'budget-friendly': '💸',
  scenic: '🌅',
  modern: '🏙️',
  food: '🍽️',
  adventure: '🧗',
  spiritual: '🕉️',
  romantic: '💕',
  'french-quarter': '🇫🇷',
  colonial: '🏰',
  tech: '💻',
  music: '🎵',
  art: '🎨',
  coffee: '☕',
  backpacking: '🎒',
  islands: '🏝️',
  diving: '🤿',
  surfing: '🏄',
  hiking: '🥾',
  gardens: '🌺',
  'southeast-asia': '🌏',
};

export default async function CityPage({ params }: CityPageProps) {
  const { country: countrySlug, slug } = await params;
  const city = getCityBySlug(countrySlug, slug);
  const country = getCountryBySlug(countrySlug);
  const cityContent = await getCityContent(countrySlug, slug);

  if (!city || !country) notFound();

  const relatedCities = country.cities.filter((c) => c.slug !== slug);
  const description = cityContent?.frontmatter.description ?? city.description;
  const fm = cityContent?.frontmatter;

  return (
    <div>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Parallax Hero Banner */}
      <ParallaxHero imageSrc={city.coverImage} imageAlt={city.name} height="60vh">
        <Link
          href={`/country/${countrySlug}`}
          className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {country.name}
        </Link>
        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl flex flex-wrap items-baseline gap-3">
          {city.name}
          {city.nativeName && city.nativeName !== city.name && (
            <span className="text-2xl md:text-3xl lg:text-4xl font-normal opacity-80">{city.nativeName}</span>
          )}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-white/80">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{city.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(city.visitDate + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        {/* Rating & Vibe badges */}
        {fm && (
          <RatingBadge
            rating={fm.rating}
            vibe={fm.vibe}
            budgetLevel={fm.budgetLevel}
            idealDuration={fm.idealDuration}
          />
        )}
      </ParallaxHero>

      {/* Trip Info Bar */}
      {fm && (
        <AnimatedSection direction="up" delay={0.1}>
          <section className="border-b border-base-300 bg-base-200/30">
            <div className="container mx-auto px-4">
              <TripInfoBar frontmatter={fm} />
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Content + TOC Layout */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[240px_1fr]">
            {/* Table of Contents Sidebar (Left) */}
            <TableOfContents />

            {/* Main Content */}
            <div id="main-article-content" className="mx-auto w-full max-w-3xl xl:mx-0 xl:max-w-none">
              <AnimatedSection direction="fade" delay={0.15}>
                <p className="mb-8 text-lg leading-relaxed text-base-content/80">{description}</p>
              </AnimatedSection>
              <CityContent countrySlug={countrySlug} citySlug={slug} />

              {/* Tags */}
              {fm?.tags && fm.tags.length > 0 && (
                <AnimatedSection direction="up" delay={0.05}>
                  <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-base-300 pt-8">
                    <span className="text-xs font-medium uppercase tracking-wider text-base-content/40">
                      Tags
                    </span>
                    {fm.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-chip cursor-default rounded-full bg-base-200 px-3 py-1 text-xs text-base-content/70 hover:bg-primary/10 hover:text-primary"
                      >
                        {tagEmojis[tag] ? `${tagEmojis[tag]} ` : '#'}
                        {tag}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Mini Map */}
              <AnimatedSection direction="up" delay={0.1}>
                <div className="mt-12 border-t border-base-300 pt-8">
                  <h2 id="location" className="font-heading mb-6 text-2xl font-bold md:text-3xl scroll-mt-32">
                    Location
                  </h2>
                  <CityMiniMap
                    center={city.coordinates}
                    cityName={city.name}
                    currentCitySlug={city.slug}
                    countrySlug={countrySlug}
                    allCities={country.cities.map((c) => ({
                      name: c.name,
                      slug: c.slug,
                      coordinates: c.coordinates,
                      visitDate: c.visitDate,
                    }))}
                  />
                </div>
              </AnimatedSection>

              {/* Photo Gallery */}
              <AnimatedSection direction="up">
                <div className="mt-12 border-t border-base-300 pt-8">
                  <h2 id="gallery" className="font-heading mb-6 text-2xl font-bold md:text-3xl scroll-mt-32">
                    Photo Gallery
                  </h2>
                  <PhotoGrid images={city.gallery} cityName={city.name} />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cities */}
      {relatedCities.length > 0 && (
        <AnimatedSection direction="up" delay={0.1}>
          <section className="border-t border-base-300 py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-heading mb-8 text-center text-2xl font-bold md:text-3xl">
                More from{' '}
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  {country.name}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedCities.map((c, idx) => (
                  <CityCard key={c.slug} city={c} index={idx} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
