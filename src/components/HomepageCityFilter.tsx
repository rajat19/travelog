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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    cities.forEach((city) => {
      city.frontmatter?.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
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
      const matchTag = selectedTag ? city.frontmatter?.tags?.includes(selectedTag) : true;
      const matchBudget = selectedBudget
        ? city.frontmatter?.budgetLevel === selectedBudget
        : true;
      return matchTag && matchBudget;
    });
  }, [cities, selectedTag, selectedBudget]);

  return (
    <>
      <div className="mb-10 text-center">
        <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl">
          All{' '}
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Destinations
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base-content/60">
          Filter through all the places I&apos;ve visited by vibe, category, or budget.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="mb-10 flex flex-col items-center gap-6">
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`btn btn-sm cursor-pointer rounded-full ${
              selectedTag === null ? 'btn-primary' : 'btn-ghost bg-base-300'
            }`}
          >
            All Vibes
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`btn btn-sm cursor-pointer rounded-full ${
                selectedTag === tag ? 'btn-primary' : 'btn-ghost bg-base-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Budgets */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedBudget(null)}
            className={`btn btn-sm cursor-pointer rounded-full ${
              selectedBudget === null ? 'btn-secondary' : 'btn-ghost bg-base-300'
            }`}
          >
            Any Budget
          </button>
          {allBudgets.map((budget) => (
            <button
              key={budget}
              onClick={() => setSelectedBudget(budget)}
              className={`btn btn-sm cursor-pointer rounded-full ${
                selectedBudget === budget ? 'btn-secondary' : 'btn-ghost bg-base-300'
              }`}
            >
              {formatBudgetLabel(budget)}
            </button>
          ))}
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
              onClick={() => { setSelectedTag(null); setSelectedBudget(null); }}
            >
              Clear filters
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
