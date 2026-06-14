import { IExerciseList } from '@/typings/common';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IExerciseList {}

function Exercise({ name, exercise }: IProps) {
  const totalVolume = exercise.reduce(
    (sum, set) => sum + set.weight * set.repetition,
    0,
  );

  return (
    <div className="rounded-lg border border-line bg-card2 px-2.5 py-2 transition-colors duration-200 hover:border-line2">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[13px] font-semibold text-content">
          {name}
        </span>
        <span className="shrink-0 rounded-md bg-panel px-1.5 py-0.5 text-xxs font-bold uppercase tracking-wide text-subtle">
          {exercise.length} {exercise.length === 1 ? 'set' : 'sets'}
        </span>
      </div>

      {exercise.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {exercise.map((set, i) => (
            <span
              key={i}
              className="rounded-md bg-panel px-1.5 py-0.5 text-xxs font-medium tabular-nums text-muted"
            >
              {set.weight}
              <span className="text-subtle">lb</span> × {set.repetition}
            </span>
          ))}
        </div>
      )}

      {totalVolume > 0 && (
        <div className="mt-1 text-xxs font-medium text-subtle">
          {totalVolume.toLocaleString()} lb total volume
        </div>
      )}
    </div>
  );
}

export default Exercise;
