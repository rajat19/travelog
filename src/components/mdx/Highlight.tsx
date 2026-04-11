import { Star } from 'lucide-react';

interface HighlightProps {
    children: React.ReactNode;
    title?: string;
}

export function Highlight({ children, title = 'Highlights' }: HighlightProps) {
    return (
        <div className="my-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
                <Star className="h-5 w-5 flex-shrink-0" />
                <span className="font-heading text-lg font-semibold">{title}</span>
            </div>
            <div className="highlight-content text-sm leading-relaxed text-base-content/80 [&>ul]:list-none [&>ul]:space-y-2 [&>ul]:pl-0 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:content-['✦'] [&>ul>li]:before:text-primary [&>ul>li>strong]:text-base-content [&>p]:mb-2">
                {children}
            </div>
        </div>
    );
}
