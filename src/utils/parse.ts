import { NewReport, ReportDetail } from '@/types/report';

export function parseDateToString(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseImgUrl(url: string): string {
  return url?.slice(0, 8) + url?.slice(9);
}

const parseStringDateToRangeDate = (start: string, end: string) => {
  const [startDate, startTime] = start.split(' ');
  const [endDate, endTime] = end.split(' ');
  return { startDate, startTime, endDate, endTime };
};

export const parseReportDetailToEditReport = (
  report: ReportDetail,
  term: number,
): NewReport => {
  const {
    place,
    content,
    participants,
    imageUrls,
    startDate: start,
    endDate: end,
  } = report;

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
    imageUrls,
    endTime,
    participants,
  };
};
