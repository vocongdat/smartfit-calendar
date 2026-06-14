import { useCalendar } from '@/hooks/useCalendar';
import { useTheme } from '@/hooks/useTheme';
import AddExerciseModal from '@/molecules/add-exercise-modal';
import AddWorkoutModal from '@/molecules/add-workout-modal';
import CalenderTemplate from '@/templates/calendar';
import { useMemo, useState } from 'react';

function Calender() {
  const cal = useCalendar();
  const { theme, toggleTheme } = useTheme();

  const [workoutModal, setWorkoutModal] = useState<{
    open: boolean;
    date: string;
  }>({ open: false, date: '' });

  const [exerciseModal, setExerciseModal] = useState<{
    open: boolean;
    date: string;
    idWorkout: string;
    workoutName?: string;
  }>({ open: false, date: '', idWorkout: '' });

  const workoutDayLabel = useMemo(() => {
    if (!workoutModal.date) return '';
    return new Date(workoutModal.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }, [workoutModal.date]);

  const handleAddWorkout = (date: string) =>
    setWorkoutModal({ open: true, date });

  const handleAddExercise = ({
    idDay,
    idWorkout,
  }: {
    idDay: string;
    idWorkout: string;
  }) => {
    const workout = cal.days
      .find(d => d.id === idDay)
      ?.workouts.find(w => w.id === idWorkout);
    setExerciseModal({
      open: true,
      date: idDay,
      idWorkout,
      workoutName: workout?.name,
    });
  };

  const handleDeleteWorkout = ({
    idDay,
    idWorkout,
  }: {
    idDay: string;
    idWorkout: string;
  }) => cal.deleteWorkout(idDay, idWorkout);

  return (
    <>
      <CalenderTemplate
        data={cal.days}
        weekLabel={cal.weekLabel}
        selectedDate={cal.selectedDate}
        theme={theme}
        onSelectDate={cal.setSelectedDate}
        onToggleTheme={toggleTheme}
        onPrevWeek={cal.goPrevWeek}
        onNextWeek={cal.goNextWeek}
        onToday={cal.goToday}
        onAddWorkout={handleAddWorkout}
        onAddExercise={handleAddExercise}
        onDeleteWorkout={handleDeleteWorkout}
        onChangeWorkout={cal.moveWorkout}
      />

      <AddWorkoutModal
        open={workoutModal.open}
        dayLabel={workoutDayLabel}
        onClose={() => setWorkoutModal(s => ({ ...s, open: false }))}
        onSubmit={payload => {
          cal.addWorkout(workoutModal.date, payload);
          setWorkoutModal(s => ({ ...s, open: false }));
        }}
      />

      <AddExerciseModal
        open={exerciseModal.open}
        workoutName={exerciseModal.workoutName}
        onClose={() => setExerciseModal(s => ({ ...s, open: false }))}
        onSubmit={payload => {
          cal.addExercise(exerciseModal.date, exerciseModal.idWorkout, payload);
          setExerciseModal(s => ({ ...s, open: false }));
        }}
      />
    </>
  );
}

export default Calender;
