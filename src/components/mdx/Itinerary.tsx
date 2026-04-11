import { Route } from 'lucide-react';

interface ItineraryProps {
    children: React.ReactNode;
    title?: string;
}

export function Itinerary({ children, title = 'Suggested Itinerary' }: ItineraryProps) {
    return (
        <div className="my-8 rounded-xl border border-secondary/20 bg-secondary/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-secondary">
                <Route className="h-5 w-5 flex-shrink-0" />
                <span className="font-heading text-lg font-semibold">{title}</span>
            </div>
            <div className="itinerary-content space-y-0 [&>ul]:list-none [&>ul]:space-y-3 [&>ul]:pl-0 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6rem] [&>ul>li]:before:h-2 [&>ul>li]:before:w-2 [&>ul>li]:before:rounded-full [&>ul>li]:before:bg-secondary [&>ul>li]:before:content-[''] [&>ul>li>strong]:text-base-content [&>p]:mb-2">
                {children}
            </div>
        </div>
    );
}
