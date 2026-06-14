import Button from '@/atoms/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DumbbellIcon,
} from '@/atoms/icon';
import ThemeToggle from '@/atoms/theme-toggle';
import { Theme } from '@/hooks/useTheme';

interface IProps {
  weekLabel: string;
  theme: Theme;
  onToggleTheme: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export default function AppBar({
  weekLabel,
  theme,
  onToggleTheme,
  onPrevWeek,
  onNextWeek,
  onToday,
}: IProps) {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between gap-3 rounded-2xl border border-line glass px-3 py-2.5 sm:px-4">
      {/* brand */}
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accentfg shadow-glow">
          <DumbbellIcon className="size-5" />
        </span>
        <div className="leading-none">
          <h1 className="font-display text-xl font-bold uppercase tracking-wide text-content">
            Smart<span className="text-accentText">Fit</span>
          </h1>
          <p className="hidden text-xxs font-medium uppercase tracking-[0.2em] text-subtle sm:block">
            Training Week
          </p>
        </div>
      </div>

      {/* week nav */}
      <div className="flex items-center gap-1 rounded-xl border border-line bg-card2 p-1">
        <Button
          variant="icon"
          aria-label="Previous week"
          onClick={onPrevWeek}
          icon={<ChevronLeftIcon className="size-5" />}
        />
        <button
          type="button"
          onClick={onToday}
          title="Jump to current week"
          className="min-w-[7.5rem] cursor-pointer rounded-lg px-2 py-1 text-center font-display text-sm font-semibold uppercase tracking-wide text-content transition-colors duration-200 hover:text-accentText sm:min-w-[10rem]"
        >
          {weekLabel}
        </button>
        <Button
          variant="icon"
          aria-label="Next week"
          onClick={onNextWeek}
          icon={<ChevronRightIcon className="size-5" />}
        />
      </div>

      {/* actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="soft"
          onClick={onToday}
          className="hidden sm:inline-flex"
        >
          Today
        </Button>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
