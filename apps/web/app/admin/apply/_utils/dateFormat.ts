export function parseLocalDate(date: string): Date {
  const [yearText, monthText, dayText] = date.split('-');

  if (!yearText || !monthText || !dayText) {
    return new Date(date);
  }

  return new Date(Number(yearText), Number(monthText) - 1, Number(dayText));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '';

  const localDate = date instanceof Date ? date : parseLocalDate(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
