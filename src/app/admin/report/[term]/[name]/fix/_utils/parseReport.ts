import { ReportResponse } from '@/app/_api/types/report';
import { EditReport } from '@/types/report';

const parseStringDateToRangeDate = (start: string, end: string) => {
  const [startDate, startTime] = start?.split(' ') ?? ['', ''];
  const [endDate, endTime] = end?.split(' ') ?? ['', ''];
  return { startDate, startTime, endDate, endTime };
};

export const parseReportResponseToEditReport = (
  activityReportRequests: ReportResponse,
  term: number,
): EditReport => {
  const {
    startDate: start,
    endDate: end,
    image,
    ...props
  } = activityReportRequests;

  const { startDate, startTime, endDate, endTime } = parseStringDateToRangeDate(
    start,
    end,
  );

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
