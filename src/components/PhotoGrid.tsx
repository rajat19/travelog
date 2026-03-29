'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { withBasePath } from '@/lib/assets';

interface PhotoGridProps {
  images: string[];
  cityName: string;
}

export function PhotoGrid({ images, cityName }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  const prevImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, idx) => (
          <motion.div
            key={src}
            className="image-hover cursor-pointer overflow-hidden rounded-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onClick={() => openLightbox(idx)}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={withBasePath(src)}
                alt={`${cityName} photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
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

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              className="relative h-[80vh] w-[90vw] max-w-4xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
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
            <div className="absolute bottom-4 text-sm text-white/70">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
