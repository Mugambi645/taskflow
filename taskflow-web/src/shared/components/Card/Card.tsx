import type { ReactNode } from "react";

function cn(...classes: Array<string | false | undefined>) {
    return classes.filter(Boolean).join(" ");
}

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className}: CardProps) {
    return (
        <div className={cn("rounded-lg border p-4", className)}>{children}</div>
    );
}
export function CardHeader({ children }: { children: ReactNode }) {
    return <div className="mb-2 font-semibold">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
return <div className="mt-4 border-t pt-2 text-sm">{children}</div>;
}