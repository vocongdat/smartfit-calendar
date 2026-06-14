import { AddIcon, DumbbellIcon } from '@/atoms/icon';
import { StrictModeDroppable } from '@/atoms/strict-mode-droppable';
import Workout from '@/atoms/workout';
import { IActionCalendar, ICalendar } from '@/typings/common';
import { cn } from '@/utils/className';
import { todayISO } from '@/utils/getWeekDate';

interface IProps extends ICalendar, IActionCalendar {
  /** Phone shows only the selected day full-width; md+ shows every day. */
  isSelected?: boolean;
}

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DayWorkout({
  id,
  date,
  workouts,
  isSelected,
  onAddWorkout,
  onAddExercise,
  onDeleteWorkout,
}: IProps) {
  const day = new Date(date);
  const isToday = date === todayISO();
  const weekdayLabel = WEEKDAY[day.getDay()];

  return (
    <div
      className={cn(
        'min-w-0 flex-col xl:flex-1',
        // phone: only the selected day; md+: equal columns in the scroll row
        isSelected ? 'flex w-full' : 'hidden md:flex',
        'md:w-[clamp(220px,22vw,300px)]',
      )}
    >
      {/* day header */}
      <div className="mb-2 flex items-center justify-between px-0.5">
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-display text-xs font-semibold uppercase tracking-[0.18em]',
              isToday ? 'text-accentText' : 'text-subtle',
            )}
          >
            {weekdayLabel}
          </span>
          <span
            className={cn(
              'font-display text-2xl font-semibold leading-none tabular-nums',
              isToday ? 'text-content' : 'text-muted',
            )}
          >
            {day.getDate()}
          </span>
          {isToday && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accentfg">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accentfg/70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accentfg" />
              </span>
              Today
            </span>
          )}
        </div>
        {workouts.length > 0 && (
          <span className="rounded-full bg-card2 px-2 py-0.5 text-xxs font-bold tabular-nums text-muted">
            {workouts.length}
          </span>
        )}
      </div>

      {/* column body */}
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col rounded-2xl border bg-panel p-2 transition-colors duration-200',
          isToday ? 'border-accent/40' : 'border-line',
        )}
      >
        <button
          type="button"
          onClick={() => onAddWorkout(id)}
          className="add-affordance mb-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-line py-2 text-xs font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accentText"
        >
          <span className="add-glyph">
            <AddIcon className="size-4" />
          </span>{' '}
          Add workout
        </button>

        <StrictModeDroppable droppableId={`${id}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                'flex flex-1 flex-col gap-2 overflow-y-auto rounded-xl p-0.5 transition-colors duration-200',
                snapshot.isDraggingOver && 'bg-accent/5 ring-1 ring-inset ring-accent/30',
              )}
            >
              {workouts.length === 0 && !snapshot.isDraggingOver ? (
                <div className="rest-zone flex flex-1 flex-col items-center justify-center gap-2 py-6 text-center">
                  <span className="flex size-9 items-center justify-center rounded-full border border-line text-subtle/70">
                    <DumbbellIcon className="size-4" />
                  </span>
                  <span className="font-display text-sm font-semibold uppercase tracking-wide text-subtle">
                    Rest day
                  </span>
                  <span className="text-xxs text-subtle/80">
                    Drop a workout here
                  </span>
                </div>
              ) : (
                workouts.map((workout, index) => (
                  <Workout
                    key={workout.id}
                    idDay={id}
                    index={index}
                    {...workout}
                    onAddExercise={onAddExercise}
                    onDeleteWorkout={onDeleteWorkout}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </div>
  );
}

export default DayWorkout;
