import CalenderTemplate from '@/templates/calendar';
import { ICalendar, IWorkout } from '@/typings/common';
import { getDaysOfWeek } from '@/utils/getWeekDate';
import { useLayoutEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

function Calender() {
  const week = getDaysOfWeek(new Date());
  const [data, setData] = useState<ICalendar[]>([]);

  useLayoutEffect(() => {
    const initWorkout: ICalendar[] = week.map(date => {
      const workoutsDefault: IWorkout[] = [
        {
          id: uuid(),
          name: 'Chest day - with arm Chest day - with arm Chest day - with arm Chest day - with arm Chest day - with arm Chest day - with arm Chest day - with arm Chest day - with arm',
          exercises: [
            {
              id: uuid(),
              name: 'Bench Press Med Bench Press Med Bench Press Med Bench Press Med Bench Press Med',
              exercise: [
                {
                  weight: 50,
                  repetition: 3,
                },
                {
                  weight: 45,
                  repetition: 7,
                },
              ],
            },
          ],
        },
        {
          id: uuid(),
          name: 'Leg day',
          exercises: [
            {
              id: uuid(),
              name: 'Exercise C',
              exercise: [
                {
                  weight: 30,
                  repetition: 6,
                },
              ],
            },
            {
              id: uuid(),
              name: 'Exercise D',
              exercise: [
                {
                  weight: 40,
                  repetition: 5,
                },
              ],
            },
            {
              id: uuid(),
              name: 'Exercise E',
              exercise: [
                {
                  weight: 50,
                  repetition: 5,
                },
              ],
            },
          ],
        },
        {
          id: uuid(),
          name: 'Arm day',
          exercises: [
            {
              id: uuid(),
              name: 'Exercise F',
              exercise: [
                {
                  weight: 50,
                  repetition: 3,
                },
              ],
            },
          ],
        },
      ];
      return {
        date,
        id: uuid(),
        workouts: JSON.parse(
          JSON.stringify(
            workoutsDefault.slice(
              0,
              Math.floor(Math.random() * workoutsDefault.length),
            ),
          ),
        ),
      };
    });
    setData(initWorkout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddWorkout = (id: string) => {
    const index = data.findIndex(workout => id === workout.id);
    if (index < 0) {
      return;
    }

    const newWorkout = {
      id: uuid(),
      name: 'Arm day',
      exercises: [],
    };
    const newCalendar = [...data];
    newCalendar[index].workouts.unshift(newWorkout);
    setData(newCalendar);
  };

  const handleAddExercise = ({
    idWorkout,
    idDay,
  }: {
    idDay: string;
    idWorkout: string;
  }) => {
    const indexDay = data.findIndex(workout => idDay === workout.id);
    if (indexDay < 0) {
      return;
    }

    const indexWorkout = data[indexDay].workouts.findIndex(
      workout => idWorkout === workout.id,
    );

    if (indexWorkout < 0) {
      return;
    }

    const newExercise = {
      id: uuid(),
      name: `Exercise ${uuid()}`,
      exercise: [
        {
          weight: 50,
          repetition: 3,
        },
        {
          weight: 45,
          repetition: 7,
        },
      ],
    };
    const newCalendar = [...data];
    newCalendar[indexDay].workouts[indexWorkout].exercises.unshift(newExercise);
    setData(newCalendar);
  };

  const handleChangeWorkout = ({
    idWorkout,
    idDaySource,
    idDayDestination,
    indexDestination,
  }: {
    idWorkout: string;
    idDaySource: string;
    idDayDestination: string;
    indexDestination: number;
    indexSource: number;
  }) => {
    const indexDaySource = data.findIndex(
      workouts => idDaySource === workouts.id,
    );
    const indexDayDestination = data.findIndex(
      workouts => idDayDestination === workouts.id,
    );

    const indexWorkout = data[indexDaySource].workouts.findIndex(
      workout => workout.id === idWorkout,
    );

    if (indexDaySource < 0 || indexDayDestination < 0) {
      return;
    }
    const newCalendar = JSON.parse(JSON.stringify(data));

    const workout = newCalendar[indexDaySource].workouts?.splice(
      indexWorkout,
      1,
    );

    newCalendar[indexDayDestination].workouts?.splice(
      indexDestination,
      0,
      workout?.[0],
    );

    setData(newCalendar);
  };

  return (
    <CalenderTemplate
      data={data}
      onAddWorkout={handleAddWorkout}
      onAddExercise={handleAddExercise}
      onChangeWorkout={handleChangeWorkout}
    />
  );
}

export default Calender;
