import { StaticImageData } from 'next/image';
import { EditReport, ReportResponse, SubmitReport } from '@/types/report';

export function parseDate(date: string): string {
  const year = date.substring(2, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${year}.${month}.${day}`;
}

export async function getBlobFromImageData(
  imageData: StaticImageData,
): Promise<Blob> {
  const response = await fetch(imageData.src);
  const blob = await response.blob();
  return blob;
}

export function parseImgUrl(url: string): string {
  return url?.slice(0, 8) + url?.slice(9);
}

const parseStringDateToRangeDate = (start: string, end: string) => {
  const [startDate, startTime] = start.split(' ');
  const [endDate, endTime] = end.split(' ');
  return { startDate, startTime, endDate, endTime };
};

export const parseNewReportToReport = (
  term: number,
  report: EditReport,
): SubmitReport => {
  const { date, place, content, participants, startTime, endTime } = report;
  return {
    term,
    startDate: date.startDate ? date.startDate + ' ' + startTime : null,
    endDate: date.startDate ? date.startDate + ' ' + endTime : null,
    place,
    content,
    participants,
  };
};

export const parseReportResponseToEditReport = (
  report: ReportResponse,
  term: number,
): EditReport => {
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
