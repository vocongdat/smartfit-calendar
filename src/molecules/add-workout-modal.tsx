import Button from '@/atoms/button';
import Modal from '@/atoms/modal';
import { MUSCLE_GROUPS } from '@/constants/common';
import { cn } from '@/utils/className';
import { FormEvent, useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  dayLabel: string;
  onClose: () => void;
  onSubmit: (payload: { name: string; tag: string }) => void;
}

export default function AddWorkoutModal({
  open,
  dayLabel,
  onClose,
  onSubmit,
}: IProps) {
  const [name, setName] = useState('');
  const [tag, setTag] = useState(MUSCLE_GROUPS[0].id);

  // reset whenever the dialog opens
  useEffect(() => {
    if (open) {
      setName('');
      setTag(MUSCLE_GROUPS[0].id);
    }
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    onSubmit({ name: trimmed || MUSCLE_GROUPS.find(g => g.id === tag)!.label + ' Day', tag });
  };

  return (
    <Modal
      open={open}
      title="New Workout"
      subtitle={dayLabel}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-workout-form">
            Add workout
          </Button>
        </>
      }
    >
      <form id="add-workout-form" onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Workout name
          </span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Push Day"
            className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-content placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </label>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
            Focus
          </span>
          <div className="flex flex-wrap gap-2">
            {MUSCLE_GROUPS.map(group => {
              const active = group.id === tag;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setTag(group.id)}
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-semibold transition-all duration-200',
                    active
                      ? 'border-transparent text-accentfg'
                      : 'border-line bg-card text-muted hover:border-line2',
                  )}
                  style={
                    active ? { backgroundColor: group.color } : undefined
                  }
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: active ? 'currentColor' : group.color }}
                  />
                  {group.label}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
}
