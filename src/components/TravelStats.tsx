'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Globe, MapPin, Camera } from 'lucide-react';
import { getTravelStats } from '@/data/travel';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}</span>;
}

export function TravelStats() {
    const stats = getTravelStats();

    const items = [
        {
            icon: Globe,
            label: 'Countries',
            value: stats.countries,
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            icon: MapPin,
            label: 'Cities',
            value: stats.cities,
            color: 'text-secondary',
            bgColor: 'bg-secondary/10',
        },
        {
            icon: Camera,
            label: 'Photos',
            value: stats.photos,
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
    ];

    return (
        <section className="border-y border-base-300 bg-base-200/50 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            className="flex items-center gap-4 rounded-box bg-base-100 p-6 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            <div className={`rounded-btn p-3 ${stat.bgColor}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="font-heading text-3xl font-bold">
                                    <AnimatedCounter target={stat.value} />
                                </p>
                                <p className="text-sm text-base-content/60">{stat.label} Explored</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
