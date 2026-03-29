'use client';

import { motion } from 'framer-motion';
import { Plane, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const GlobeVisualization = dynamic(
    () => import('./Globe').then((mod) => ({ default: mod.GlobeVisualization })),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-[clamp(380px,72vw,500px)] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        ),
    }
);

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-base-100 to-base-200">
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                    {/* Text */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                                <Plane className="h-4 w-4" />
                                <span>Travel Stories & Adventures</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="font-heading mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            Exploring the{' '}
                            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                                World
                            </span>
                            , One City at a Time
                        </motion.h1>

                        <motion.p
                            className="mb-8 max-w-lg text-lg text-base-content/70 lg:text-xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Join me on a journey through bustling cities, ancient temples, and breathtaking
                            landscapes. Click any marker on the globe to explore.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                        >
                            <a href="#countries" className="btn btn-primary btn-lg gap-2">
                                Explore Destinations
                                <ChevronDown className="h-5 w-5 animate-bounce" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Globe */}
                    <motion.div
                        className="flex w-full min-w-0 flex-1 justify-center"
                        // initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <GlobeVisualization />
                    </motion.div>
                </div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        </section>
    );
}
