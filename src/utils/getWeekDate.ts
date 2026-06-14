/** Returns the 7 ISO date strings (Mon–Sun) for the week containing `date`. */
export const getDaysOfWeek = (date: Date): string[] => {
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(
    date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1),
  );

  const weekDays: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDays.push(toISODate(day));
  }

  return weekDays;
};

/** Local-safe YYYY-MM-DD (avoids UTC off-by-one from toISOString). */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** Returns a new Date offset by `weeks` from `base`. */
export function addWeeks(base: Date, weeks: number): Date {
  const next = new Date(base);
  next.setDate(base.getDate() + weeks * 7);
  return next;
}

/** "Jun 9 – 15" or "Jun 30 – Jul 6, 2026" style range from a week's dates. */
export function formatWeekRange(days: string[]): string {
  if (days.length === 0) return '';
  const start = new Date(days[0]);
  const end = new Date(days[days.length - 1]);
  const month = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short' });
  const sameMonth = start.getMonth() === end.getMonth();
  const year = end.getFullYear();
  if (sameMonth) {
    return `${month(start)} ${start.getDate()} – ${end.getDate()}, ${year}`;
  }
  return `${month(start)} ${start.getDate()} – ${month(end)} ${end.getDate()}, ${year}`;
}
