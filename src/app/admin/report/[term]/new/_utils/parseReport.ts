import { EditReport, SubmitReport } from '@/types/report';

export const parseNewReportToReport = (
  term: number,
  report: EditReport,
): SubmitReport => {
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
