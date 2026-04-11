import { Wallet } from 'lucide-react';

interface BudgetProps {
    children: React.ReactNode;
    title?: string;
}

export function Budget({ children, title = 'Budget Breakdown' }: BudgetProps) {
    return (
        <div className="my-8 rounded-xl border border-warning/20 bg-warning/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-warning">
                <Wallet className="h-5 w-5 flex-shrink-0" />
                <span className="font-heading text-lg font-semibold">{title}</span>
            </div>
            <div className="budget-content text-sm leading-relaxed text-base-content/80 [&>table]:w-full [&>table>thead>tr>th]:border-b [&>table>thead>tr>th]:border-base-300 [&>table>thead>tr>th]:pb-2 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold [&>table>tbody>tr>td]:border-b [&>table>tbody>tr>td]:border-base-300/50 [&>table>tbody>tr>td]:py-2.5 [&>table>tbody>tr:last-child>td]:border-b-0 [&>ul]:space-y-1 [&>p]:mb-2">
                {children}
            </div>
        </div>
    );
}
