import { Globe, Flag, Sun, FileText, MapPin, CalendarDays } from 'lucide-react';
import type { TravelContentFrontmatter } from '@/lib/content';

interface CountryInfoBarProps {
    frontmatter: TravelContentFrontmatter;
    cityCount: number;
}

interface InfoItem {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export function CountryInfoBar({ frontmatter, cityCount }: CountryInfoBarProps) {
    const items: InfoItem[] = [];

    if (frontmatter.region) {
        items.push({
            icon: <Globe className="h-4 w-4" />,
            label: 'Region',
            value: frontmatter.region,
        });
    }
    if (frontmatter.capital) {
        items.push({
            icon: <Flag className="h-4 w-4" />,
            label: 'Capital',
            value: frontmatter.capital,
        });
    }
    if (frontmatter.bestMonths) {
        items.push({
            icon: <Sun className="h-4 w-4" />,
            label: 'Best Months',
            value: frontmatter.bestMonths,
        });
    }
    if (frontmatter.visaInfo) {
        items.push({
            icon: <FileText className="h-4 w-4" />,
            label: 'Visa',
            value: frontmatter.visaInfo,
        });
    }
    if (frontmatter.tripsCount) {
        items.push({
            icon: <CalendarDays className="h-4 w-4" />,
            label: 'Trips Made',
            value: `${frontmatter.tripsCount} trip${frontmatter.tripsCount > 1 ? 's' : ''}`,
        });
    }
    if (frontmatter.totalDays) {
        items.push({
            icon: <MapPin className="h-4 w-4" />,
            label: 'Days Explored',
            value: `${frontmatter.totalDays} days across ${cityCount} ${cityCount === 1 ? 'city' : 'cities'}`,
        });
    }

    if (items.length === 0) return null;

    return (
        <div className="mx-auto max-w-3xl py-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
