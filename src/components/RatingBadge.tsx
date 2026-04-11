import { Star } from 'lucide-react';

interface RatingBadgeProps {
    rating?: number;
    vibe?: string;
    budgetLevel?: 'budget-friendly' | 'moderate' | 'splurge';
    idealDuration?: string;
}

const budgetLabels: Record<string, { label: string; color: string }> = {
    'budget-friendly': { label: '💰 Budget', color: 'badge-success' },
    moderate: { label: '💳 Moderate', color: 'badge-info' },
    splurge: { label: '💎 Splurge', color: 'badge-warning' },
};

export function RatingBadge({ rating, vibe, budgetLevel, idealDuration }: RatingBadgeProps) {
    const hasBadges = rating || vibe || budgetLevel || idealDuration;

    if (!hasBadges) return null;

    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            {rating != null && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {rating.toFixed(1)}
                </span>
            )}
            {vibe && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
                    {vibe}
                </span>
            )}
            {budgetLevel && budgetLabels[budgetLevel] && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
                    {budgetLabels[budgetLevel].label}
                </span>
            )}
            {idealDuration && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm text-white/90 backdrop-blur-sm">
                    🗓️ {idealDuration}
                </span>
            )}
        </div>
    );
}
