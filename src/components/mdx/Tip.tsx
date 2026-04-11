import { Lightbulb } from 'lucide-react';

interface TipProps {
    children: React.ReactNode;
    title?: string;
}

export function Tip({ children, title = 'Insider Tip' }: TipProps) {
    return (
        <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-2 flex items-center gap-2 text-primary">
                <Lightbulb className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wide">{title}</span>
            </div>
            <div className="text-sm leading-relaxed text-base-content/80 [&>p]:mb-0">
                {children}
            </div>
        </div>
    );
}
