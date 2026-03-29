'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'golden-hour-dark';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className="btn btn-ghost btn-circle btn-sm" aria-hidden="true" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5" />}
            </motion.div>
        </button>
    );
}
