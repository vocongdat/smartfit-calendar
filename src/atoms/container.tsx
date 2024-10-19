import { cn } from '@/utils/className';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: IProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border bg-white/80 text-neutral-200/15',
        className,
      )}
    >
      {children}
    </div>
  );
}
