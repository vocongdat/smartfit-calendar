import { IActionCalendar, IWorkout } from '@/typings/common';
import { Draggable } from 'react-beautiful-dnd';
import Button from './button';
import Container from './container';
import Exercise from './exercise';
import { AddIcon, DotsIcon } from './icon';

interface IProps extends IWorkout, Pick<IActionCalendar, 'onAddExercise'> {
  idDay: string;
  index: number;
}

function Workout({ id, idDay, name, exercises, index, onAddExercise }: IProps) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Container>
            <div className="flex items-center justify-between space-x-2.5 px-[7px]">
              <div className="truncate break-all py-[5px] text-xxs font-bold uppercase leading-[14px] text-secondary-800">
                {name}
              </div>
              <Button icon={<DotsIcon className="h-1 w-3" />} />
            </div>
            <div className="h-full min-h-12 space-y-[5px] px-[3px]">
              {!exercises?.length ? (
                <span className="text-black/65">Empty Exercise</span>
              ) : (
                exercises.map(exercise => (
                  <Exercise key={exercise.id} {...exercise} />
                ))
              )}
            </div>
            <div className="mr-[5px] self-end">
              <Button
                onClick={() => onAddExercise({ idDay, idWorkout: id })}
                icon={<AddIcon className="size-4" />}
              />
            </div>
          </Container>
        </div>
      )}
    </Draggable>
  );
}

export default Workout;
