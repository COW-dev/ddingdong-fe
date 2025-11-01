import { Report } from '@/app/_api/types/report';

export const validateDate = (report: Report) => {
  const { endTime, startTime, date } = report;

  if (!endTime && !startTime && !date.startDate) return true;
  return endTime && startTime && date.startDate;
};
