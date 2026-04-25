import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
