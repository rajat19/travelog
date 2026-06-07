'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { withBasePath } from '@/lib/assets';

interface ParallaxHeroProps {
    imageSrc: string;
    imageAlt: string;
    height?: string;
    children: React.ReactNode;
}

export function ParallaxHero({
    imageSrc,
    imageAlt,
    height = '60vh',
    children,
}: ParallaxHeroProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden"
            style={{ height, minHeight: '380px' }}
        >
            {/* Parallax image layer */}
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                <Image
                    src={withBasePath(imageSrc)}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            {/* Gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-base-100 via-black/40 to-black/10"
                style={{ opacity }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="container mx-auto">
                    {children}
                </div>
            </div>
        </section>
    );
}
