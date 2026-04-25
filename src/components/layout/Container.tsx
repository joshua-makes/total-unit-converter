import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  );
}
