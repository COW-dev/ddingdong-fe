import { Report, ReportAPIRequest } from '@/app/_api/types/report';

export const parseRequest = (
  term: number,
  report: Report,
): ReportAPIRequest => {
  const { date, startTime, endTime, ...props } = report;
  return {
    ...props,
    term,
    startDate: date.startDate
      ? date.startDate.toISOString().split('T')[0] + ' ' + startTime
      : undefined,
    endDate: date.startDate
      ? date.startDate.toISOString().split('T')[0] + ' ' + endTime
      : undefined,
  };
};
