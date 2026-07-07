import { Report } from '@/_api/types/report';

export const validateDate = (report: Report) => {
  const { endTime, startTime, date } = report;

  if (!endTime && !startTime && !date.startDate) return true;
  return Boolean(endTime && startTime && date.startDate);
};
