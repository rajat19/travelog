'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { City } from '@/data/travel';
import { withBasePath } from '@/lib/assets';

interface CityTimelineProps {
    cities: City[];
    countrySlug: string;
}

export function CityTimeline({ cities, countrySlug }: CityTimelineProps) {
    // Sort cities by visit date
    const sorted = [...cities].sort(
        (a, b) => new Date(a.visitDate + '-01').getTime() - new Date(b.visitDate + '-01').getTime()
    );

    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-px" />

            <div className="space-y-12">
                {sorted.map((city, idx) => {
                    const isLeft = idx % 2 === 0;

                    return (
                        <motion.div
                            key={city.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative flex items-start gap-6 md:gap-0 ${
                                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-6 top-8 z-10 -translate-x-1/2 md:left-1/2">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-base-100 shadow-md shadow-primary/20">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                </div>
                            </div>

                            {/* Content card */}
                            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                                <Link
                                    href={`/city/${countrySlug}/${city.slug}`}
                                    className="group block overflow-hidden rounded-2xl border border-base-300 bg-base-200/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                                >
                                    {/* Image */}
                                    <div className="relative h-36 overflow-hidden">
                                        <Image
                                            src={withBasePath(city.coverImage)}
                                            alt={city.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                        {/* Date badge */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(city.visitDate + '-01').toLocaleDateString('en-US', {
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="p-4">
                                        <h3 className="font-heading text-lg font-bold transition-colors group-hover:text-primary">
                                            {city.name}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-sm text-base-content/60">
                                            {city.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
