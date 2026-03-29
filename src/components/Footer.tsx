import { Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-base-300 bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Travelog
                        </span>
                    </Link>

                    {/* Info */}
                    <p className="flex items-center gap-1 text-sm text-base-content/60">
                        Made with <Heart className="h-4 w-4 fill-error text-error" /> for the love of travel
                    </p>

                    {/* Copyright */}
                    <p className="text-sm text-base-content/50">
                        &copy; {new Date().getFullYear()} Travelog. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
