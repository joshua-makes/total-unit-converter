import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
