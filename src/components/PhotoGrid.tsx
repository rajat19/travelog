'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { withBasePath } from '@/lib/assets';

interface PhotoGridProps {
    images: string[];
    cityName: string;
}

// Alternating aspect ratios for masonry feel
const aspectPatterns = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]'];

export function PhotoGrid({ images, cityName }: PhotoGridProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const nextImage = useCallback(
        () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null)),
        [images.length]
    );
    const prevImage = useCallback(
        () =>
            setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + images.length) % images.length : null
            ),
        [images.length]
    );

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll while lightbox is open
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

    return (
        <>
            {/* Masonry-style grid */}
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {images.map((src, idx) => (
                    <motion.div
                        key={src}
                        className="group mb-4 cursor-pointer overflow-hidden rounded-box break-inside-avoid"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        onClick={() => openLightbox(idx)}
                    >
                        <div className={`relative ${aspectPatterns[idx % aspectPatterns.length]} overflow-hidden`}>
                            <Image
                                src={withBasePath(src)}
                                alt={`${cityName} photo ${idx + 1}`}
                                fill
                                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                                <div className="rounded-full bg-white/0 p-3 backdrop-blur-none transition-all duration-300 group-hover:bg-white/20 group-hover:backdrop-blur-sm">
                                    <svg
                                        className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                            {/* Counter pill */}
                            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                {idx + 1}/{images.length}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            className="absolute right-4 top-4 btn btn-ghost btn-circle text-white"
                            onClick={closeLightbox}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Previous */}
                        <button
                            className="absolute left-4 btn btn-ghost btn-circle text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        {/* Image with swipe support */}
                        <motion.div
                            key={lightboxIndex}
                            className="relative h-[80vh] w-[90vw] max-w-5xl"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 80) prevImage();
                                else if (info.offset.x < -80) nextImage();
                            }}
                        >
                            <Image
                                src={withBasePath(images[lightboxIndex])}
                                alt={`${cityName} photo ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                        </motion.div>

                        {/* Next */}
                        <button
                            className="absolute right-4 btn btn-ghost btn-circle text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
                            {lightboxIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
