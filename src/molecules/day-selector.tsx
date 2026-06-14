import { ICalendar } from '@/typings/common';
import { cn } from '@/utils/className';
import { todayISO } from '@/utils/getWeekDate';

interface IProps {
  days: ICalendar[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

const WEEKDAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/** Compact 7-day selector shown only on phones (md:hidden). */
export default function DaySelector({ days, selectedDate, onSelect }: IProps) {
  return (
    <div className="mb-3 grid grid-cols-7 gap-1.5 md:hidden">
      {days.map(({ date, workouts }) => {
        const d = new Date(date);
        const isSelected = date === selectedDate;
        const isToday = date === todayISO();
        return (
          <button
            key={date}
            type="button"
            onClick={() => onSelect(date)}
            aria-pressed={isSelected}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-0.5 rounded-xl border py-2 transition-all duration-200',
              isSelected
                ? 'border-accent bg-accent text-accentfg shadow-glow'
                : 'border-line bg-panel text-muted hover:border-line2',
            )}
          >
            <span className="font-display text-[11px] font-semibold uppercase tracking-wide">
              {WEEKDAY[d.getDay()]}
            </span>
            <span className="font-display text-lg font-semibold leading-none tabular-nums">
              {d.getDate()}
            </span>
            <span
              className={cn(
                'h-1 w-1 rounded-full',
                workouts.length > 0
                  ? isSelected
                    ? 'bg-accentfg'
                    : 'bg-accent'
                  : 'bg-transparent',
                isToday && !isSelected && 'bg-accent',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
