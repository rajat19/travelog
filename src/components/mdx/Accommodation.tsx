import { BedDouble } from 'lucide-react';

interface AccommodationProps {
    children: React.ReactNode;
    title?: string;
}

export function Accommodation({ children, title = 'Where I Stayed' }: AccommodationProps) {
    return (
        <div className="my-6 rounded-xl border border-success/20 bg-success/5 p-5">
            <div className="mb-2 flex items-center gap-2 text-success">
                <BedDouble className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wide">{title}</span>
            </div>
            <div className="text-sm leading-relaxed text-base-content/80 [&>p]:mb-0 [&>p>strong]:text-base-content">
                {children}
            </div>
        </div>
    );
}
