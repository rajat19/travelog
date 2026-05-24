'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CityCard } from '@/components/CityCard';
import type { City } from '@/data/travel';
import type { TravelContentFrontmatter } from '@/lib/content';

interface CityWithMeta extends City {
  frontmatter: TravelContentFrontmatter | null;
}

interface HomepageCityFilterProps {
  cities: CityWithMeta[];
}

export function HomepageCityFilter({ cities }: HomepageCityFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  // Extract all unique countries
  const allCountries = useMemo(() => {
    const countries = new Set<string>();
    cities.forEach((city) => {
      countries.add(city.country);
    });
    return Array.from(countries).sort();
  }, [cities]);

  // Extract all unique budgets
  const allBudgets = useMemo(() => {
    const budgets = new Set<string>();
    cities.forEach((city) => {
      if (city.frontmatter?.budgetLevel) {
        budgets.add(city.frontmatter.budgetLevel);
      }
    });
    // Order budgets naturally
    const ordering = ['budget-friendly', 'moderate', 'splurge'];
    return Array.from(budgets).sort((a, b) => ordering.indexOf(a) - ordering.indexOf(b));
  }, [cities]);

  const formatBudgetLabel = (budget: string) => {
    if (budget === 'budget-friendly') return '💸 Budget-Friendly';
    if (budget === 'moderate') return '💰 Moderate';
    if (budget === 'splurge') return '💎 Splurge';
    return budget;
  };

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || city.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCountry = selectedCountry ? city.country === selectedCountry : true;
      const matchBudget = selectedBudget
        ? city.frontmatter?.budgetLevel === selectedBudget
        : true;
      return matchSearch && matchCountry && matchBudget;
    });
  }, [cities, searchQuery, selectedCountry, selectedBudget]);

  return (
    <>
      <div className="mb-10 text-center">
        <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl flex items-center justify-center flex-wrap gap-x-3">
          All
          <span className="font-accent bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent text-5xl md:text-6xl font-normal pb-2 pt-1 pr-4 inline-block -mb-2">
            Destinations
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base-content/60">
          Filter through all the places I&apos;ve visited by vibe, category, or budget.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-12 flex flex-col items-center gap-6 overflow-visible px-4 md:px-0">
        
        {/* Search */}
        <div className="w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search by city or country name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full rounded-full bg-base-100 shadow-sm"
          />
        </div>

        {/* Countries */}
        <div className="relative w-full -mx-4 md:mx-0">
          <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto py-2 px-4 md:justify-center md:px-0">
            <button
              onClick={() => setSelectedCountry(null)}
              className={`btn btn-sm snap-start shrink-0 cursor-pointer rounded-full border-none px-5 transition-all ${
                selectedCountry === null
                  ? 'btn-primary shadow-md'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-300 hover:text-base-content'
              }`}
            >
              All Countries
            </button>
            {allCountries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry((prev) => (prev === country ? null : country))}
                className={`btn btn-sm snap-start shrink-0 cursor-pointer rounded-full border-none px-5 transition-all ${
                  selectedCountry === country
                    ? 'btn-primary shadow-md'
                    : 'bg-base-200/60 text-base-content/70 hover:bg-base-300 hover:text-base-content'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Budgets */}
        <div className="relative mt-2 -mx-4 md:mx-0">
          <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto py-2 px-4 md:justify-center md:px-0">
            <button
              onClick={() => setSelectedBudget(null)}
              className={`btn btn-sm snap-start shrink-0 cursor-pointer rounded-full border-none px-5 transition-all ${
                selectedBudget === null
                  ? 'btn-secondary shadow-md'
                  : 'bg-base-200/60 text-base-content/70 hover:bg-base-300 hover:text-base-content'
              }`}
            >
              Any Budget
            </button>
            {allBudgets.map((budget) => (
              <button
                key={budget}
                onClick={() => setSelectedBudget((prev) => (prev === budget ? null : budget))}
                className={`btn btn-sm snap-start shrink-0 cursor-pointer rounded-full border-none px-5 transition-all ${
                  selectedBudget === budget
                    ? 'btn-secondary shadow-md'
                    : 'bg-base-200/60 text-base-content/70 hover:bg-base-300 hover:text-base-content'
                }`}
              >
                {formatBudgetLabel(budget)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredCities.map((city, idx) => (
            <motion.div
              layout
              key={`${city.countrySlug}-${city.slug}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CityCard city={city} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredCities.length === 0 && (
          <div className="col-span-full py-12 text-center text-base-content/50">
            <p>No destinations match your selected filters.</p>
            <button 
              className="btn btn-link mt-2 text-primary"
              onClick={() => { setSearchQuery(''); setSelectedCountry(null); setSelectedBudget(null); }}
            >
              Clear filters
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
