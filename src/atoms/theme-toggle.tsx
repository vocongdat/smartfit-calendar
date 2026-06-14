import { MoonIcon, SunIcon } from '@/atoms/icon';
import { Theme } from '@/hooks/useTheme';
import { cn } from '@/utils/className';

interface IProps {
  theme: Theme;
  onToggle: () => void;
}

/** Animated, accessible light/dark switch. */
export default function ThemeToggle({ theme, onToggle }: IProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      className="relative inline-flex h-9 w-[64px] cursor-pointer items-center rounded-full border border-line bg-card2 px-1 shadow-toggle transition-colors duration-300"
    >
      {/* static rail icons */}
      <SunIcon className="absolute left-2 size-4 text-subtle" />
      <MoonIcon className="absolute right-2 size-4 text-subtle" />
      {/* sliding knob */}
      <span
        className={cn(
          'relative z-10 flex size-7 items-center justify-center rounded-full bg-accent text-accentfg shadow-glow transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isDark ? 'translate-x-0' : 'translate-x-[28px]',
        )}
      >
        {isDark ? (
          <MoonIcon className="size-4" />
        ) : (
          <SunIcon className="size-4" />
        )}
      </span>
    </button>
  );
}
