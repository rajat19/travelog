import { UtensilsCrossed } from 'lucide-react';

interface FoodGuideProps {
    children: React.ReactNode;
    title?: string;
}

export function FoodGuide({ children, title = 'Must-Try Eats' }: FoodGuideProps) {
    return (
        <div className="my-8 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-accent">
                <UtensilsCrossed className="h-5 w-5 flex-shrink-0" />
                <span className="font-heading text-lg font-semibold">{title}</span>
            </div>
            <div className="food-guide-content overflow-x-auto [&>table]:w-full [&>table]:text-sm [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-base-300 [&>table>thead>tr>th]:pb-2 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-base-300/50 [&>table>tbody>tr>td]:py-2.5 [&>table>tbody>tr:last-child>td]:border-b-0 [&>p]:mb-2 [&>ul]:space-y-2">
                {children}
            </div>
        </div>
    );
}
