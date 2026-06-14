import { cn } from '@/utils/className';
import { CSSProperties, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Container({ children, className, style }: IProps) {
  return (
    <div
      style={style}
      className={cn(
        'flex flex-col rounded-xl border border-line bg-card text-content shadow-card',
        className,
      )}
    >
      {children}
    </div>
  );
}
