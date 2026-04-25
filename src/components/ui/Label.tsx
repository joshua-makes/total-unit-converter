import { cn } from '@/lib/utils';
import { type LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-[rgb(var(--foreground))]', className)}
      {...props}
    >
      {children}
    </label>
  );
}
