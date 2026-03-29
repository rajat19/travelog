'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { City } from '@/data/travel';

interface CityCardProps {
    city: City;
    index?: number;
}

export function CityCard({ city, index = 0 }: CityCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/city/${city.countrySlug}/${city.slug}`}
                className="card card-compact bg-base-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
                <figure className="relative h-48 overflow-hidden">
                    <Image
                        src={city.coverImage}
                        alt={city.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{city.country}</span>
                    </div>
                </figure>
                <div className="card-body">
                    <h3 className="card-title font-heading text-lg">{city.name}</h3>
                    <p className="line-clamp-2 text-sm text-base-content/70">{city.description}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-base-content/50">
                        <Calendar className="h-3 w-3" />
                        <span>
                            {new Date(city.visitDate + '-01').toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
