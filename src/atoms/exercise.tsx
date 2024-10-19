import { IExerciseList } from '@/typings/common';
import Container from './container';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends IExerciseList {}

function Exercise({ name, exercise }: IProps) {
  const exerciseToString = exercise.map(
    ({ weight, repetition }) => `${weight} lb x ${repetition}`,
  );

  return (
    <Container className="drop-shadow-smart-fit border-neutral-300 px-2 py-[5px]">
      <div className="ml-[30px] flex items-center justify-end text-[13px] font-semibold leading-[1.5] text-black">
        <span className="truncate break-all text-left">{name}</span>
      </div>
      <div className="flex items-center justify-between space-x-4 py-[1px] text-xxs leading-[14px]">
        <div className="text-neutral-900">{exercise.length}x</div>
        <div className="text-neutral-800">{exerciseToString.join(', ')}</div>
      </div>
    </Container>
  );
}

export default Exercise;
