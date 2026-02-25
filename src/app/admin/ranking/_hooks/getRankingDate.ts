export function getRankingDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const lastMonthDate = new Date(now);
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(now.getMonth() - 1);
  const lastMonthYear = lastMonthDate.getFullYear();
  const lastMonthMonth = lastMonthDate.getMonth() + 1;

  return {
    currentYear,
    currentMonth,
    lastMonthYear,
    lastMonthMonth,
  };
}
