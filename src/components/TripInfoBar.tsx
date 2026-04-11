import {
    Clock,
    Sun,
    Banknote,
    Globe,
    Languages,
    CalendarDays,
    Thermometer,
    Wallet,
} from 'lucide-react';
import type { TravelContentFrontmatter } from '@/lib/content';

interface TripInfoBarProps {
    frontmatter: TravelContentFrontmatter;
}

interface InfoItem {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export function TripInfoBar({ frontmatter }: TripInfoBarProps) {
    const items: InfoItem[] = [];

    if (frontmatter.idealDuration) {
        items.push({
            icon: <Clock className="h-4 w-4" />,
            label: 'Ideal Trip',
            value: frontmatter.idealDuration,
        });
    }
    if (frontmatter.lastVisited) {
        items.push({
            icon: <CalendarDays className="h-4 w-4" />,
            label: 'Last Visited',
            value: frontmatter.lastVisited,
        });
    }
    if (frontmatter.weather) {
        items.push({
            icon: <Thermometer className="h-4 w-4" />,
            label: 'Weather',
            value: frontmatter.weather,
        });
    }
    if (frontmatter.bestTimeToVisit) {
        items.push({
            icon: <Sun className="h-4 w-4" />,
            label: 'Best Time',
            value: frontmatter.bestTimeToVisit,
        });
    }
    if (frontmatter.currency) {
        items.push({
            icon: <Banknote className="h-4 w-4" />,
            label: 'Currency',
            value: frontmatter.currency,
        });
    }
    if (frontmatter.language) {
        items.push({
            icon: <Languages className="h-4 w-4" />,
            label: 'Language',
            value: frontmatter.language,
        });
    }
    if (frontmatter.timezone) {
        items.push({
            icon: <Globe className="h-4 w-4" />,
            label: 'Timezone',
            value: frontmatter.timezone,
        });
    }
    if (frontmatter.dailyBudget) {
        items.push({
            icon: <Wallet className="h-4 w-4" />,
            label: 'Daily Budget',
            value: frontmatter.dailyBudget,
        });
    }

    if (items.length === 0) return null;

    return (
        <div className="mx-auto max-w-3xl py-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-start gap-3 rounded-lg border border-base-300 bg-base-200/50 p-3 transition-colors hover:border-primary/30"
                    >
                        <div className="mt-0.5 text-primary">{item.icon}</div>
                        <div className="min-w-0">
                            <div className="text-xs text-base-content/50">{item.label}</div>
                            <div className="text-sm font-medium text-base-content leading-snug">
                                {item.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
