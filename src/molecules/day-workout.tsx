import { AddIcon } from '@/atoms/icon';
import Workout from '@/atoms/workout';
import { IActionCalendar, ICalendar } from '@/typings/common';
import { cn } from '@/utils/className';
import { Droppable } from 'react-beautiful-dnd';
import Button from '../atoms/button';

interface IProps extends ICalendar, IActionCalendar {}

function DayWorkout({
  id,
  date,
  workouts,
  onAddWorkout,
  onAddExercise,
}: IProps) {
  const day = new Date(date);

  return (
    <div className="flex min-w-[calc(100%/7)] flex-col gap-y-[9px]">
      <span className="font-semibold uppercase leading-[14px] text-neutral-500">
        {day.toString().split(' ')[0]}
      </span>
      <div className="max-h-full flex-1 rounded-md bg-neutral-50 p-2.5">
        <div className="flex items-center justify-between">
          <span
            className={cn('font-semibold text-neutral-700', {
              'text-secondary-800': day.getDate() === new Date().getDate(),
            })}
          >
            {day.getDate()}
          </span>
          <Button
            icon={<AddIcon className="size-4" />}
            onClick={() => onAddWorkout(id)}
          />
        </div>
        <div className="flex h-full flex-1 flex-col overflow-auto">
          <Droppable key={id} droppableId={`${id}`}>
            {provided => (
              <div
                className="flex flex-1 flex-col space-y-[5px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {workouts.map((workout, index) => (
                  <Workout
                    key={index}
                    idDay={id}
                    index={index}
                    {...workout}
                    onAddExercise={onAddExercise}
                  />
                ))}
                <div className="flex-1">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
}

export default DayWorkout;
