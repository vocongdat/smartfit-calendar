import WeekWorkout from '@/organisms/week-workout';
import { IActionCalendar, ICalendar } from '@/typings/common';

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

function CalenderTemplate(props: IProps) {
  return <WeekWorkout {...props} />;
}

export default CalenderTemplate;
