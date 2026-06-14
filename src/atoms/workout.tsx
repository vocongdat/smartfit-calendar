import { groupColor, MUSCLE_GROUP_MAP } from '@/constants/common';
import { IActionCalendar, IWorkout } from '@/typings/common';
import { cn } from '@/utils/className';
import { CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from './button';
import Exercise from './exercise';
import { AddIcon, GripIcon, TrashIcon } from './icon';

interface IProps
  extends IWorkout,
    Pick<IActionCalendar, 'onAddExercise' | 'onDeleteWorkout'> {
  idDay: string;
  index: number;
}

function Workout({
  id,
  idDay,
  name,
  tag,
  exercises,
  index,
  onAddExercise,
  onDeleteWorkout,
}: IProps) {
  const color = groupColor(tag);
  const groupLabel = tag ? MUSCLE_GROUP_MAP[tag]?.label : undefined;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          className={cn('outline-none', snapshot.isDragging && 'z-50')}
        >
          <div
            style={{ '--edge': color } as CSSProperties}
            className={cn(
              'workout-card group/card relative overflow-hidden rounded-xl border border-line bg-card shadow-card',
              snapshot.isDragging && 'rotate-[1.5deg] shadow-lift',
            )}
          >
            {/* colored muscle-group spine */}
            <span
              aria-hidden
              className="workout-edge absolute inset-y-0 left-0 w-1"
              style={{ backgroundColor: color }}
            />

            {/* header */}
            <div className="flex items-start gap-1.5 pl-3 pr-1.5 pt-2">
              <button
                type="button"
                aria-label="Drag workout"
                className="mt-0.5 cursor-grab text-subtle opacity-0 transition-opacity duration-200 hover:text-content group-hover/card:opacity-100 active:cursor-grabbing"
                {...provided.dragHandleProps}
              >
                <GripIcon className="size-3.5" />
              </button>

              <div className="min-w-0 flex-1">
                {groupLabel && (
                  <span className="inline-flex items-center gap-1 text-xxs font-bold uppercase tracking-wider text-muted">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {groupLabel}
                  </span>
                )}
                <h4 className="break-words font-display text-base font-semibold uppercase leading-tight tracking-wide text-content">
                  {name}
                </h4>
              </div>

              <Button
                variant="icon"
                aria-label="Delete workout"
                title="Delete workout"
                onClick={() => onDeleteWorkout({ idDay, idWorkout: id })}
                className="size-7 shrink-0 opacity-0 hover:text-red-400 group-hover/card:opacity-100"
                icon={<TrashIcon className="size-4" />}
              />
            </div>

            {/* exercises */}
            <div className="space-y-1.5 px-3 pb-2 pt-2">
              {!exercises?.length ? (
                <p className="rounded-lg border border-dashed border-line py-2 text-center text-xxs font-medium text-subtle">
                  No exercises yet
                </p>
              ) : (
                exercises.map(exercise => (
                  <Exercise key={exercise.id} {...exercise} />
                ))
              )}

              <button
                type="button"
                onClick={() => onAddExercise({ idDay, idWorkout: id })}
                className="add-affordance flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-line py-1.5 text-xxs font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accentText"
              >
                <span className="add-glyph">
                  <AddIcon className="size-3.5" />
                </span>{' '}
                Exercise
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Workout;
