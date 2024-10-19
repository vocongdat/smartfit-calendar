export const getDaysOfWeek = (date: Date) => {
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(
    date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1),
  );

  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDays.push(day.toISOString().split('T')[0]);
  }

  return weekDays;
};
