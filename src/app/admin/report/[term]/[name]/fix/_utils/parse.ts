import { ReportAPIResponse, Report } from '@/app/_api/types/report';

const parseRangeDate = (start: string, end: string) => {
  const [startDate, startTime] = start?.split(' ') ?? ['', ''];
  const [endDate, endTime] = end?.split(' ') ?? ['', ''];
  return { startDate, startTime, endDate, endTime };
};

export const parseReport = (
  activityReportRequests: ReportAPIResponse,
  term: number,
): Report => {
  const {
    startDate: start,
    endDate: end,
    image,
    ...props
  } = activityReportRequests;

  const { startDate, startTime, endDate, endTime } = parseRangeDate(start, end);

  return {
    term,
    image,
    imageId: image?.id,
    date: {
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
    },
    startTime,
    endTime,
    ...props,
  };
};
