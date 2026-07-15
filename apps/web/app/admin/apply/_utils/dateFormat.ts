export function parseLocalDate(date: string): Date {
  const [yearText, monthText, dayText] = date.split('-');

  if (!yearText || !monthText || !dayText) {
    return new Date(date);
  }

  return new Date(Number(yearText), Number(monthText) - 1, Number(dayText));
}
