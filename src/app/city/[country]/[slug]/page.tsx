import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { countries, getCityBySlug, getCountryBySlug } from '@/data/travel';
import { CityContent } from '@/components/CityContent';
import { PhotoGrid } from '@/components/PhotoGrid';
import { CityCard } from '@/components/CityCard';
import { TripInfoBar } from '@/components/TripInfoBar';
import { RatingBadge } from '@/components/RatingBadge';
import { getCityContent } from '@/lib/content';
import type { Metadata } from 'next';
import { withBasePath } from '@/lib/assets';

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
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[350px]">
        <Image
          src={withBasePath(city.coverImage)}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              href={`/country/${countrySlug}`}
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {country.name}
            </Link>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {city.name}
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
          </div>
        </div>
      </section>

      {/* Trip Info Bar */}
      {fm && (
        <section className="border-b border-base-300 bg-base-200/30">
          <div className="container mx-auto px-4">
            <TripInfoBar frontmatter={fm} />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-lg leading-relaxed text-base-content/80">{description}</p>
            <CityContent countrySlug={countrySlug} citySlug={slug} />
          </div>
        </div>
      </section>

      {/* Tags */}
      {fm?.tags && fm.tags.length > 0 && (
        <section className="border-t border-base-300 py-6">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-base-content/40">
                Tags
              </span>
              {fm.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-base-200 px-3 py-1 text-xs text-base-content/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      <section className="border-t border-base-300 bg-base-200/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading mb-8 text-center text-2xl font-bold md:text-3xl">
            Photo{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <PhotoGrid images={city.gallery} cityName={city.name} />
        </div>
      </section>

      {/* Related Cities */}
      {relatedCities.length > 0 && (
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
      )}
    </div>
  );
}
