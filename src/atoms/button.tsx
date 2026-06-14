import { cn } from '@/utils/className';
import { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'soft' | 'icon';

interface IProps
  extends Pick<
    ComponentProps<'button'>,
    | 'children'
    | 'className'
    | 'disabled'
    | 'type'
    | 'form'
    | 'onClick'
    | 'aria-label'
    | 'title'
  > {
  icon?: ReactNode;
  variant?: Variant;
}

const base =
  'inline-flex items-center justify-center gap-1.5 font-semibold cursor-pointer select-none transition-all duration-200 ease-out focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'rounded-lg bg-accent px-4 py-2 text-sm uppercase tracking-wide text-accentfg shadow-glow hover:brightness-105 active:scale-[0.98]',
  soft: 'rounded-lg bg-card2 px-4 py-2 text-sm text-content border border-line hover:border-line2 hover:bg-card active:scale-[0.98]',
  ghost:
    'rounded-lg px-3 py-2 text-sm text-muted hover:text-content hover:bg-card2 active:scale-[0.98]',
  icon: 'rounded-lg size-8 text-muted hover:text-accentText hover:bg-card2 active:scale-90',
};

function Button({
  icon,
  children,
  className,
  variant = 'ghost',
  type = 'button',
  ...rest
}: IProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export default Button;
