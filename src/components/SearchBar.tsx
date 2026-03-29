'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Globe, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { countries, getAllCities } from '@/data/travel';

interface SearchItem {
    type: 'country' | 'city';
    name: string;
    description: string;
    href: string;
    country?: string;
}

const searchItems: SearchItem[] = [
    ...countries.map((c) => ({
        type: 'country' as const,
        name: c.name,
        description: c.description,
        href: `/country/${c.slug}`,
    })),
    ...getAllCities().map((c) => ({
        type: 'city' as const,
        name: c.name,
        description: c.description,
        href: `/city/${c.countrySlug}/${c.slug}`,
        country: c.country,
    })),
];

const fuse = new Fuse(searchItems, {
    keys: ['name', 'description', 'country'],
    threshold: 0.3,
    includeScore: true,
});

interface SearchBarProps {
    onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setSelectedIndex(-1);
            return;
        }
        const res = fuse.search(query).map((r) => r.item);
        setResults(res);
        setSelectedIndex(-1);
    }, [query]);

    const navigateTo = useCallback(
        (href: string) => {
            router.push(href);
            setQuery('');
            setResults([]);
            onClose?.();
        },
        [router, onClose]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            navigateTo(results[selectedIndex].href);
        } else if (e.key === 'Escape') {
            onClose?.();
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search countries and cities..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input input-bordered w-full pl-10 pr-10"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setResults([]);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <X className="h-4 w-4 text-base-content/40 hover:text-base-content" />
                    </button>
                )}
            </div>

            {/* Results dropdown */}
            {results.length > 0 && (
                <div className="absolute z-50 mt-2 w-full rounded-box border border-base-300 bg-base-100 shadow-xl">
                    <ul className="menu p-2">
                        {results.map((item, idx) => (
                            <li key={item.href}>
                                <button
                                    onClick={() => navigateTo(item.href)}
                                    className={`flex items-center gap-3 ${idx === selectedIndex ? 'active' : ''}`}
                                >
                                    {item.type === 'country' ? (
                                        <Globe className="h-4 w-4 text-primary" />
                                    ) : (
                                        <MapPin className="h-4 w-4 text-secondary" />
                                    )}
                                    <div className="min-w-0 flex-1 text-left">
                                        <p className="truncate font-medium">{item.name}</p>
                                        <p className="truncate text-xs text-base-content/50">
                                            {item.type === 'city' && `${item.country} · `}
                                            {item.description}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {query.trim() !== '' && results.length === 0 && (
                <div className="absolute z-50 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-xl">
                    <p className="text-base-content/50">No destinations found for &ldquo;{query}&rdquo;</p>
                </div>
            )}
        </div>
    );
}
