import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-xxs'],
    },
  },
});

/**
 *
 * @cn is a combines both twMerge and clsx
 * There are two problems @cn solves
 * 1. Class conflicts
 * 2. Conditional classes
 *
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
