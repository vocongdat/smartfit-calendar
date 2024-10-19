import DayWorkout from '@/molecules/day-workout';
import { IActionCalendar, ICalendar } from '@/typings/common';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface IProps extends IActionCalendar {
  data: ICalendar[];
  onChangeWorkout: (params: {
    idWorkout: string;
    idDaySource: string;
    idDayDestination: string;
    indexDestination: number;
    indexSource: number;
  }) => void;
}

function WeekWorkout({ data, onChangeWorkout, ...props }: IProps) {
  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    onChangeWorkout({
      idDayDestination: destination.droppableId,
      idWorkout: draggableId,
      idDaySource: source.droppableId,
      indexDestination: destination.index,
      indexSource: source.index,
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-[calc(var(--app-height)-(var(--app-padding-phone)*2))] gap-2.5 overflow-hidden pr-[var(--app-padding-phone)] md:h-[calc(100vh-(var(--app-padding)*2))] md:pr-[var(--app-padding)]">
        {data.map(workout => (
          <DayWorkout key={workout.id} {...workout} {...props} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default WeekWorkout;
