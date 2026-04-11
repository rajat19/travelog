import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { countries, getCountryBySlug } from '@/data/travel';
import { CityCard } from '@/components/CityCard';
import { CountryContent } from '@/components/CountryContent';
import { CountryInfoBar } from '@/components/CountryInfoBar';
import { RatingBadge } from '@/components/RatingBadge';
import { getCountryContent } from '@/lib/content';
import type { Metadata } from 'next';
import { withBasePath } from '@/lib/assets';

interface CountryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return countries.map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };
  const countryContent = await getCountryContent(slug);
  const description = countryContent?.frontmatter.description ?? country.description;

  return {
    title: `${country.name} — Travelog`,
    description,
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  const countryContent = await getCountryContent(slug);

  if (!country) notFound();

  const description = countryContent?.frontmatter.description ?? country.description;
  const fm = countryContent?.frontmatter;

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={withBasePath(country.coverImage)}
          alt={country.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {country.name}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-white/80">
              <MapPin className="h-5 w-5" />
              <span>
                {country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'} explored
              </span>
            </div>
            {/* Rating & Vibe badges */}
            {fm && (
              <RatingBadge
                rating={fm.rating}
                vibe={fm.vibe}
              />
            )}
          </div>
        </div>
      </section>

      {/* Country Info Bar */}
      {fm && (
        <section className="border-b border-base-300 bg-base-200/30">
          <div className="container mx-auto px-4">
            <CountryInfoBar frontmatter={fm} cityCount={country.cities.length} />
          </div>
        </section>
      )}

      {/* Description & Navigation (Desktop Split) */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
            {/* Sidebar Navigation for Cities (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-base-300 bg-base-200/30 p-6 shadow-sm">
                <h3 className="font-heading mb-4 border-b border-base-300 pb-2 text-lg font-bold">
                  Destinations
                </h3>
                <ul className="space-y-3">
                  {country.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/city/${country.slug}/${city.slug}`}
                        className="group flex items-center gap-3 text-sm text-base-content/70 transition-colors hover:text-primary"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-base-300 transition-colors group-hover:bg-primary" />
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Country MDX Content */}
            <div className="lg:col-span-3">
              <p className="mb-10 max-w-3xl text-lg text-base-content/80 lg:text-left text-center">
                {description}
              </p>
              <div className="mx-auto max-w-3xl lg:mx-0">
                <CountryContent countrySlug={slug} />
              </div>

              {/* Tags (Moved inside the main grid to align properly) */}
              {fm?.tags && fm.tags.length > 0 && (
                <div className="mt-12 flex max-w-3xl flex-wrap items-center gap-2 border-t border-base-300 pt-6">
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/Footer Cities Cards */}
      <section className="border-t border-base-300 bg-base-200/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading mb-8 text-center text-2xl font-bold md:text-3xl lg:hidden">
            Cities in{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {country.name}
            </span>
          </h2>
          <h2 className="font-heading hidden mb-8 text-center text-2xl font-bold md:text-3xl lg:block">
            Keep{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Exploring
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {country.cities.map((city, idx) => (
              <CityCard key={city.slug} city={city} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
