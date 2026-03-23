export function isPastStartDate(startDate: string | undefined): boolean {
  if (!startDate) return false;
  return new Date(startDate) < new Date();
}
