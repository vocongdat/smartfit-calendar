export const WEEKDAY_LABELS = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export interface MuscleGroup {
  id: string;
  label: string;
  /** Accent color used for the tag chip + card edge. */
  color: string;
}

/**
 * Muscle-group tags. Each maps to an accent color so a training week is
 * scannable at a glance. The first is the brand lime.
 */
export const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: 'push', label: 'Push', color: '#C6F432' },
  { id: 'pull', label: 'Pull', color: '#38E1FF' },
  { id: 'legs', label: 'Legs', color: '#FF8A3D' },
  { id: 'arms', label: 'Arms', color: '#A78BFA' },
  { id: 'core', label: 'Core', color: '#FF5C8A' },
  { id: 'cardio', label: 'Cardio', color: '#34D399' },
  { id: 'full', label: 'Full Body', color: '#F4C430' },
];

export const MUSCLE_GROUP_MAP: Record<string, MuscleGroup> =
  MUSCLE_GROUPS.reduce(
    (acc, group) => {
      acc[group.id] = group;
      return acc;
    },
    {} as Record<string, MuscleGroup>,
  );

export function groupColor(tag?: string): string {
  return (tag && MUSCLE_GROUP_MAP[tag]?.color) || '#C6F432';
}
