import { HeroSection } from '@/components/HeroSection';
import { TravelStats } from '@/components/TravelStats';
import { CountryCard } from '@/components/CountryCard';
import { CityCard } from '@/components/CityCard';
import { HomepageCityFilter } from '@/components/HomepageCityFilter';
import { countries, getAllCities } from '@/data/travel';
import { getCityContent } from '@/lib/content';

export default async function HomePage() {
  const allCities = getAllCities();

  // Pre-fetch all frontmatter for the client-side filter
  const citiesWithMeta = await Promise.all(
    allCities.map(async (city) => {
      const content = await getCityContent(city.countrySlug, city.slug);
      return {
        ...city,
        frontmatter: content?.frontmatter || null,
      };
    })
  );

  return (
    <>
      {/* Hero with Globe */}
      <HeroSection />

      {/* Travel Stats */}
      <TravelStats />

      {/* Countries Section */}
      <section id="countries" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl flex items-center justify-center flex-wrap gap-x-2">
              Countries I&apos;ve
              <span className="font-accent bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-5xl md:text-6xl font-normal pb-2 pt-1 pr-4 inline-block -mb-2">
                Explored
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base-content/60">
              Each destination has its own unique story. Click on a country to dive deeper into the
              cities and experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {countries.map((country, idx) => (
              <CountryCard key={country.slug} country={country} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* All Cities Section */}
      <section id="destinations" className="border-t border-base-300 bg-base-200/30 py-16">
        <div className="container mx-auto px-4">
          <HomepageCityFilter cities={citiesWithMeta} />
        </div>
      </section>
    </>
  );
}
