import Button from '@/atoms/button';
import { AddIcon, TrashIcon } from '@/atoms/icon';
import Modal from '@/atoms/modal';
import { IExercise } from '@/typings/common';
import { FormEvent, useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  workoutName?: string;
  onClose: () => void;
  onSubmit: (payload: { name: string; exercise: IExercise[] }) => void;
}

const emptySet = (): IExercise => ({ weight: 20, repetition: 10 });

export default function AddExerciseModal({
  open,
  workoutName,
  onClose,
  onSubmit,
}: IProps) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState<IExercise[]>([emptySet()]);

  useEffect(() => {
    if (open) {
      setName('');
      setSets([emptySet()]);
    }
  }, [open]);

  const updateSet = (index: number, key: keyof IExercise, value: number) => {
    setSets(prev =>
      prev.map((s, i) =>
        i === index ? { ...s, [key]: Math.max(0, value || 0) } : s,
      ),
    );
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim() || 'New Exercise',
      exercise: sets,
    });
  };

  const inputCls =
    'w-full rounded-lg border border-line bg-card px-3 py-2 text-content tabular-nums placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30';

  return (
    <Modal
      open={open}
      title="Add Exercise"
      subtitle={workoutName ? `to ${workoutName}` : undefined}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-exercise-form">
            Add exercise
          </Button>
        </>
      }
    >
      <form id="add-exercise-form" onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Exercise name
          </span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Bench Press"
            className={inputCls}
          />
        </label>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Sets
            </span>
            <div className="flex w-[8.5rem] justify-between pr-9 text-xxs font-semibold uppercase tracking-wide text-subtle">
              <span>Weight</span>
              <span>Reps</span>
            </div>
          </div>

          <div className="space-y-2">
            {sets.map((set, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-card2 text-xxs font-bold text-muted">
                  {i + 1}
                </span>
                <div className="relative flex-1">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={set.weight}
                    onChange={e =>
                      updateSet(i, 'weight', e.target.valueAsNumber)
                    }
                    className={inputCls}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xxs text-subtle">
                    lb
                  </span>
                </div>
                <span className="text-subtle">×</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={set.repetition}
                  onChange={e =>
                    updateSet(i, 'repetition', e.target.valueAsNumber)
                  }
                  className={`${inputCls} flex-1`}
                />
                <Button
                  variant="icon"
                  aria-label={`Remove set ${i + 1}`}
                  disabled={sets.length === 1}
                  onClick={() =>
                    setSets(prev => prev.filter((_, idx) => idx !== i))
                  }
                  icon={<TrashIcon className="size-4" />}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSets(prev => [...prev, emptySet()])}
            className="add-affordance mt-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-dashed border-line py-2 text-xs font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accentText"
          >
            <span className="add-glyph">
              <AddIcon className="size-4" />
            </span>{' '}
            Add set
          </button>
        </div>
      </form>
    </Modal>
  );
}
