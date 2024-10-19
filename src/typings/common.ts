export interface IExercise {
  weight: number;
  repetition: number;
}

export interface IExerciseList {
  id: string;
  name: string;
  exercise: IExercise[];
}

export interface IWorkout {
  id: string;
  name: string;
  exercises: IExerciseList[];
}

export interface ICalendar {
  id: string;
  date: string;
  workouts: IWorkout[];
}

export interface IActionCalendar {
  onAddWorkout: (id: string) => void;
  onAddExercise: (params: { idDay: string; idWorkout: string }) => void;
}
