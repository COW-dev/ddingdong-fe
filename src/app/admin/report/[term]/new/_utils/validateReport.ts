import { EditReport } from '@/types/report';

export const validateDate = (report: EditReport) => {
  const { endTime, startTime, date } = report;

  if (!endTime && !startTime && !date.startDate) return true;
  return endTime && startTime && date.startDate;
};
