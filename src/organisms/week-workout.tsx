import DayWorkout from '@/molecules/day-workout';
import { IActionCalendar, ICalendar } from '@/typings/common';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface IProps extends IActionCalendar {
  data: ICalendar[];
  selectedDate: string;
  onChangeWorkout: (params: {
    idWorkout: string;
    dateSource: string;
    dateDestination: string;
    indexDestination: number;
  }) => void;
}

function WeekWorkout({
  data,
  selectedDate,
  onChangeWorkout,
  ...actions
}: IProps) {
  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    onChangeWorkout({
      idWorkout: draggableId,
      dateSource: source.droppableId,
      dateDestination: destination.droppableId,
      indexDestination: destination.index,
    });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="stagger flex min-h-0 flex-1 gap-3 overflow-x-auto overflow-y-hidden pb-1 md:snap-x md:snap-mandatory">
        {data.map(day => (
          <DayWorkout
            key={day.id}
            {...day}
            {...actions}
            isSelected={day.date === selectedDate}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default WeekWorkout;
