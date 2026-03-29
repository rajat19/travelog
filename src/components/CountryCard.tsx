'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Country } from '@/data/travel';

interface CountryCardProps {
    country: Country;
    index?: number;
}

export function CountryCard({ country, index = 0 }: CountryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/country/${country.slug}`}
                className="group card bg-base-200 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
                <figure className="relative h-56 overflow-hidden">
                    <Image
                        src={country.coverImage}
                        alt={country.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-heading text-2xl font-bold">{country.name}</h3>
                        <div className="mt-1 flex items-center gap-1 text-sm text-white/80">
                            <MapPin className="h-4 w-4" />
                            <span>
                                {country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'} explored
                            </span>
                        </div>
                    </div>
                </figure>
                <div className="card-body">
                    <p className="line-clamp-2 text-sm text-base-content/70">{country.description}</p>
                    <div className="card-actions mt-2">
                        <div className="badge badge-primary badge-outline badge-sm">Explore →</div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
