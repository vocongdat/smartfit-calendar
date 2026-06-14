import { Theme } from '@/hooks/useTheme';
import AppBar from '@/molecules/app-bar';
import DaySelector from '@/molecules/day-selector';
import WeekWorkout from '@/organisms/week-workout';
import { IActionCalendar, ICalendar } from '@/typings/common';

interface IProps extends IActionCalendar {
  data: ICalendar[];
  weekLabel: string;
  selectedDate: string;
  theme: Theme;
  onSelectDate: (date: string) => void;
  onToggleTheme: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onChangeWorkout: (params: {
    idWorkout: string;
    dateSource: string;
    dateDestination: string;
    indexDestination: number;
  }) => void;
}

function CalenderTemplate({
  data,
  weekLabel,
  selectedDate,
  theme,
  onSelectDate,
  onToggleTheme,
  onPrevWeek,
  onNextWeek,
  onToday,
  ...rest
}: IProps) {
  return (
    <div className="flex h-[var(--app-height)] flex-col p-3 sm:p-4 md:p-5">
      <AppBar
        weekLabel={weekLabel}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onPrevWeek={onPrevWeek}
        onNextWeek={onNextWeek}
        onToday={onToday}
      />
      <DaySelector
        days={data}
        selectedDate={selectedDate}
        onSelect={onSelectDate}
      />
      <WeekWorkout data={data} selectedDate={selectedDate} {...rest} />
    </div>
  );
}

export default CalenderTemplate;
