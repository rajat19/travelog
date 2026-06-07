'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Parse headings from the main article container
        const article = document.getElementById('main-article-content');
        if (!article) return;

        const elements = article.querySelectorAll('h2, h3');
        const parsed: Heading[] = Array.from(elements)
            .filter((el) => el.id)
            .map((el) => ({
                id: el.id,
                text: el.textContent || '',
                level: el.tagName === 'H2' ? 2 : 3,
            }));

        setHeadings(parsed);

        // Scroll spy via IntersectionObserver
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the first heading currently intersecting
                const intersecting = entries.filter((e) => e.isIntersecting);
                if (intersecting.length > 0) {
                    setActiveId(intersecting[0].target.id);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0.1,
            }
        );

        elements.forEach((el) => {
            if (el.id) observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sticky top-28 hidden xl:block self-start h-fit"
            aria-label="Table of contents"
        >
            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-base-300 pb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-base-content/70">
                        In This Guide
                    </h4>
                </div>
                <ul className="space-y-1.5">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById(heading.id);
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className={`block rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ${
                                    heading.level === 3 ? 'ml-3' : ''
                                } ${
                                    activeId === heading.id
                                        ? 'bg-primary/10 font-medium text-primary'
                                        : 'text-base-content/55 hover:bg-base-300/50 hover:text-base-content/80'
                                }`}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
}
