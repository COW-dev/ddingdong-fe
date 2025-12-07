import { Report, ReportAPIRequest } from '@/app/_api/types/report';

const parseDate = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

export const parseRequest = (
  term: number,
  report: Report,
): ReportAPIRequest => {
  const { date, startTime, endTime, ...props } = report;

  return {
    ...props,
    term,
    startDate: date.startDate
      ? parseDate(date.startDate) + ' ' + startTime
      : undefined,
    endDate: date.startDate
      ? parseDate(date.startDate) + ' ' + endTime
      : undefined,
  };
};
