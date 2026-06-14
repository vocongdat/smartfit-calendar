import { ICalendar, IExercise, IWorkout } from '@/typings/common';
import {
  addWeeks,
  formatWeekRange,
  getDaysOfWeek,
  todayISO,
} from '@/utils/getWeekDate';
import { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

/** Workouts are stored as a flat map keyed by ISO date, so the plan persists
 *  across weeks. The displayed week is derived from this store. */
type WorkoutStore = Record<string, IWorkout[]>;

const STORAGE_KEY = 'smartfit-calendar-v1';

function seedStore(): WorkoutStore {
  const week = getDaysOfWeek(new Date());
  const make = (
    name: string,
    tag: string,
    exercises: IWorkout['exercises'],
  ): IWorkout => ({ id: uuid(), name, tag, exercises });

  const ex = (name: string, sets: IExercise[]) => ({ id: uuid(), name, exercise: sets });

  const store: WorkoutStore = {};
  // Mon — Push
  store[week[0]] = [
    make('Push Day', 'push', [
      ex('Bench Press', [
        { weight: 60, repetition: 8 },
        { weight: 65, repetition: 6 },
        { weight: 70, repetition: 4 },
      ]),
      ex('Overhead Press', [
        { weight: 35, repetition: 10 },
        { weight: 40, repetition: 8 },
      ]),
    ]),
  ];
  // Tue — Pull
  store[week[1]] = [
    make('Pull Day', 'pull', [
      ex('Deadlift', [
        { weight: 100, repetition: 5 },
        { weight: 110, repetition: 3 },
      ]),
      ex('Barbell Row', [{ weight: 55, repetition: 10 }]),
    ]),
  ];
  // Thu — Legs
  store[week[3]] = [
    make('Leg Day', 'legs', [
      ex('Back Squat', [
        { weight: 90, repetition: 6 },
        { weight: 95, repetition: 5 },
      ]),
      ex('Leg Press', [{ weight: 160, repetition: 12 }]),
      ex('Calf Raise', [{ weight: 80, repetition: 15 }]),
    ]),
  ];
  // Fri — Arms
  store[week[4]] = [
    make('Arm Day', 'arms', [
      ex('Barbell Curl', [{ weight: 30, repetition: 12 }]),
      ex('Tricep Pushdown', [{ weight: 25, repetition: 12 }]),
    ]),
  ];
  // Sat — Cardio
  store[week[5]] = [make('Conditioning', 'cardio', [])];
  return store;
}

function loadStore(): WorkoutStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WorkoutStore;
  } catch {
    /* ignore corrupt/unavailable storage */
  }
  const seeded = seedStore();
  persist(seeded);
  return seeded;
}

function persist(store: WorkoutStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
}

export function useCalendar() {
  const [store, setStore] = useState<WorkoutStore>(loadStore);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>(todayISO());

  const week = useMemo(
    () => getDaysOfWeek(addWeeks(new Date(), weekOffset)),
    [weekOffset],
  );

  const days: ICalendar[] = useMemo(
    () =>
      week.map(date => ({
        id: date,
        date,
        workouts: store[date] ?? [],
      })),
    [week, store],
  );

  const weekLabel = useMemo(() => formatWeekRange(week), [week]);

  const update = useCallback((next: WorkoutStore) => {
    persist(next);
    setStore(next);
  }, []);

  const goPrevWeek = useCallback(() => setWeekOffset(o => o - 1), []);
  const goNextWeek = useCallback(() => setWeekOffset(o => o + 1), []);
  const goToday = useCallback(() => {
    setWeekOffset(0);
    setSelectedDate(todayISO());
  }, []);

  const addWorkout = useCallback(
    (date: string, payload: { name: string; tag: string }) => {
      const workout: IWorkout = {
        id: uuid(),
        name: payload.name,
        tag: payload.tag,
        exercises: [],
      };
      setStore(prev => {
        const next = { ...prev, [date]: [workout, ...(prev[date] ?? [])] };
        persist(next);
        return next;
      });
    },
    [],
  );

  const addExercise = useCallback(
    (
      date: string,
      idWorkout: string,
      payload: { name: string; exercise: IExercise[] },
    ) => {
      setStore(prev => {
        const dayWorkouts = prev[date] ?? [];
        const next = {
          ...prev,
          [date]: dayWorkouts.map(w =>
            w.id === idWorkout
              ? {
                  ...w,
                  exercises: [
                    { id: uuid(), name: payload.name, exercise: payload.exercise },
                    ...w.exercises,
                  ],
                }
              : w,
          ),
        };
        persist(next);
        return next;
      });
    },
    [],
  );

  const deleteWorkout = useCallback((date: string, idWorkout: string) => {
    setStore(prev => {
      const next = {
        ...prev,
        [date]: (prev[date] ?? []).filter(w => w.id !== idWorkout),
      };
      persist(next);
      return next;
    });
  }, []);

  const moveWorkout = useCallback(
    (params: {
      idWorkout: string;
      dateSource: string;
      dateDestination: string;
      indexDestination: number;
    }) => {
      const { idWorkout, dateSource, dateDestination, indexDestination } =
        params;
      setStore(prev => {
        const source = [...(prev[dateSource] ?? [])];
        const idx = source.findIndex(w => w.id === idWorkout);
        if (idx < 0) return prev;
        const [moved] = source.splice(idx, 1);
        const destination =
          dateSource === dateDestination ? source : [...(prev[dateDestination] ?? [])];
        destination.splice(indexDestination, 0, moved);
        const next = {
          ...prev,
          [dateSource]: source,
          [dateDestination]: destination,
        };
        persist(next);
        return next;
      });
    },
    [],
  );

  return {
    days,
    week,
    weekLabel,
    weekOffset,
    selectedDate,
    setSelectedDate,
    goPrevWeek,
    goNextWeek,
    goToday,
    addWorkout,
    addExercise,
    deleteWorkout,
    moveWorkout,
    update,
  };
}
