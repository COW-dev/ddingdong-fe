import { EditReport, ReportResponse, SubmitReport } from '@/types/report';

export function parseDate(date: string): string {
  const year = date.substring(2, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${year}.${month}.${day}`;
}

export function parseImgUrl(url: string): string {
  return url?.slice(0, 8) + url?.slice(9);
}

const parseStringDateToRangeDate = (start: string, end: string) => {
  const [startDate, startTime] = start?.split(' ') ?? ['', ''];
  const [endDate, endTime] = end?.split(' ') ?? ['', ''];
  return { startDate, startTime, endDate, endTime };
};

export const parseNewReportToReport = (
  term: number,
  report: EditReport,
): SubmitReport => {
  const { date, place, content, participants, startTime, endTime, imageKey } =
    report;
  return {
    term,
    startDate: date.startDate ? date.startDate + ' ' + startTime : '',
    endDate: date.startDate ? date.startDate + ' ' + endTime : '',
    place,
    content,
    participants,
    imageKey,
  };
};

export const parseReportResponseToEditReport = (
  activityReportRequests: ReportResponse,
  term: number,
): EditReport => {
  const {
    place,
    content,
    participants,
    imageUrl,
    startDate: start,
    endDate: end,
  } = activityReportRequests;

  const { startDate, startTime, endDate, endTime } = parseStringDateToRangeDate(
    start,
    end,
  );

  return {
    term,
    place,
    content,
    date: { startDate, endDate },
    startTime,
    endTime,
    participants,
    imageUrl,
    imageKey: imageUrl.originUrl,
  };
};
